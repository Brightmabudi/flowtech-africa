import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@backend/services/db'
import type { ApplyBody } from '@backend/services/application-types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FILL_TIME_MS = 2500

type ApplyRequestBody = Partial<ApplyBody> & {
  website?:    string // honeypot
  renderedAt?: number // time-trap
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidCvUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validate(body: ApplyRequestBody): string | null {
  const firstName = body.firstName?.trim() ?? ''
  const lastName  = body.lastName?.trim() ?? ''
  const email     = body.email?.trim() ?? ''
  const phone     = body.phone?.trim() ?? ''
  const location  = body.location?.trim() ?? ''
  const cvUrl     = body.cvUrl?.trim() ?? ''

  if (!firstName || firstName.length > 80) return 'Please enter a valid first name.'
  if (!lastName || lastName.length > 80) return 'Please enter a valid last name.'
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return 'Please enter a valid email address.'
  if (phone && phone.length > 30) return 'Please enter a valid phone number.'
  if (location && location.length > 120) return 'Please enter a valid location.'
  if (!cvUrl) return 'Please provide a link to your CV/resume.'
  if (cvUrl.length > 2048 || !isValidCvUrl(cvUrl)) return 'Please provide a valid CV link (starting with http:// or https://).'
  if (body.coverLetter && body.coverLetter.length > 5000) return 'Cover letter is too long (max 5000 characters).'

  return null
}

// ── POST /api/vacancies/[id]/apply ───────────────────────────────────────────
// Public. Applies to a single active vacancy. No candidate account required.
// `status` is never accepted from the request body — always server-assigned.

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const vacancyId = Number(params.id)
  if (!Number.isInteger(vacancyId) || vacancyId < 1) {
    return NextResponse.json({ success: false, error: 'Invalid vacancy.' }, { status: 400 })
  }

  let body: ApplyRequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: silently pretend success so bots don't learn they were caught.
  if (body.website) {
    return NextResponse.json({ success: true })
  }

  // Time-trap: bots typically submit near-instantly after the page loads.
  if (typeof body.renderedAt === 'number' && Date.now() - body.renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ success: true })
  }

  const validationError = validate(body)
  if (validationError) {
    return NextResponse.json({ success: false, error: validationError }, { status: 400 })
  }

  const vacancy = await prisma.jobVacancy.findUnique({ where: { id: vacancyId } })
  if (!vacancy || !vacancy.isActive) {
    return NextResponse.json({ success: false, error: 'This vacancy is no longer accepting applications.' }, { status: 404 })
  }

  const firstName = body.firstName!.trim()
  const lastName  = body.lastName!.trim()
  const email     = body.email!.trim().toLowerCase()
  const phone     = body.phone?.trim() || null
  const location  = body.location?.trim() || null
  const coverLetter = body.coverLetter?.trim() || null
  const cvUrl     = body.cvUrl!.trim()

  const existing = await prisma.jobApplication.findUnique({
    where: { vacancyId_email: { vacancyId, email } },
    select: { id: true },
  })
  if (existing) {
    return NextResponse.json({ success: false, error: 'You have already applied to this vacancy.' }, { status: 409 })
  }

  let application
  try {
    application = await prisma.jobApplication.create({
      data: { vacancyId, firstName, lastName, email, phone, location, coverLetter, cvUrl },
      // status is intentionally omitted — always uses the schema default ("NEW")
    })
  } catch (error: unknown) {
    // Defense-in-depth: DB-level unique constraint catches a race between the check above and this insert.
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'P2002') {
      return NextResponse.json({ success: false, error: 'You have already applied to this vacancy.' }, { status: 409 })
    }
    console.error('[vacancy-apply] Failed to create application record')
    return NextResponse.json({ success: false, error: 'Failed to submit your application. Please try again.' }, { status: 500 })
  }

  // Best-effort notification email — application is already persisted regardless of send outcome.
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const from = process.env.EMAIL_FROM
  const to = vacancy.contactEmail

  if (smtpUser && smtpPass && from && to) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: { user: smtpUser, pass: smtpPass },
      })
      await transporter.sendMail({
        from: `"FlowTech Africa Careers" <${from}>`,
        to,
        replyTo: email,
        subject: `New Application: ${vacancy.title} - ${firstName} ${lastName}`,
        html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">'
          + `<h2 style="color:#2D1580">New application for ${escapeHtml(vacancy.title)}</h2>`
          + `<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>`
          + `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`
          + (phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : '')
          + (location ? `<p><strong>Location:</strong> ${escapeHtml(location)}</p>` : '')
          + `<p><strong>CV:</strong> <a href="${escapeHtml(cvUrl)}">${escapeHtml(cvUrl)}</a></p>`
          + (coverLetter ? `<p><strong>Cover letter:</strong><br/>${escapeHtml(coverLetter).replace(/\n/g, '<br/>')}</p>` : '')
          + '</div>',
      })
    } catch (error) {
      console.error('[vacancy-apply] Notification email send failed (application was still saved)')
    }
  }

  return NextResponse.json({ success: true, data: { id: application.id } }, { status: 201 })
}

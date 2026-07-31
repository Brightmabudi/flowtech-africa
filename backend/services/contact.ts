import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@backend/services/db'

const VALID_COMPANY_SIZES = ['1 - 50 employees', '51 - 200 employees', '201 - 1000 employees', '1000+ employees']
const VALID_SERVICES = [
  'Cloud Infrastructure', 'Cybersecurity / SOC', 'Managed IT Services', 'Network & Connectivity',
  'Data & Analytics', 'Digital Transformation', 'Software Development', 'Consulting Services',
  'Training Services', 'Support',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FILL_TIME_MS = 2500

type ContactPayload = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  companySize?: string
  service?: string
  message?: string
  website?: string
  renderedAt?: number
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function validate(body: ContactPayload): string | null {
  const firstName = body.firstName?.trim() ?? ''
  const lastName = body.lastName?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const phone = body.phone?.trim() ?? ''
  const companySize = body.companySize?.trim() ?? ''
  const service = body.service?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  if (!firstName || firstName.length > 80) return 'Please enter a valid first name.'
  if (!lastName || lastName.length > 80) return 'Please enter a valid last name.'
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return 'Please enter a valid email address.'
  if (phone && phone.length > 30) return 'Please enter a valid phone number.'
  if (!VALID_COMPANY_SIZES.includes(companySize)) return 'Please select a valid company size.'
  if (!VALID_SERVICES.includes(service)) return 'Please select a valid service.'
  if (!message || message.length < 10) return 'Please enter a message of at least 10 characters.'
  if (message.length > 5000) return 'Message is too long (max 5000 characters).'

  return null
}

export async function POST(req: NextRequest) {
  let body: ContactPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: a hidden field real visitors never fill in. If it's populated, silently
  // pretend success so bots don't learn they were caught and keep retrying.
  if (body.website) {
    return NextResponse.json({ success: true })
  }

  // Time-trap: bots typically submit near-instantly after the page loads.
  if (typeof body.renderedAt === 'number' && Date.now() - body.renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ success: true })
  }

  // ── 1. Validate ─────────────────────────────────────────────────────────
  const validationError = validate(body)
  if (validationError) {
    return NextResponse.json({ success: false, error: validationError }, { status: 400 })
  }

  const firstName = body.firstName!.trim()
  const lastName = body.lastName!.trim()
  const email = body.email!.trim().toLowerCase()
  const phone = body.phone?.trim() || null
  const companySize = body.companySize!.trim()
  const service = body.service!.trim()
  const message = body.message!.trim()

  // ── 2. Save to database (must succeed before we report success) ────────
  let enquiry
  try {
    enquiry = await prisma.contactEnquiry.create({
      data: { firstName, lastName, email, phone, companySize, serviceInterest: service, message },
    })
  } catch (error) {
    console.error('[contact] Failed to save enquiry to database:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit your enquiry. Please try again.' }, { status: 500 })
  }

  // ── 3. Send email notification (best-effort — enquiry is already saved) ─
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const from = process.env.EMAIL_FROM
  const to = process.env.EMAIL_TO?.split(',').map(a => a.trim()).filter(Boolean)

  if (!smtpUser || !smtpPass || !from || !to?.length) {
    console.error('[contact] Missing SMTP_USER, SMTP_PASS, EMAIL_FROM or EMAIL_TO environment variables')
    return NextResponse.json({
      success: true,
      data: { id: enquiry.id },
      warning: 'Your enquiry was received, but our notification email is temporarily unavailable. Our team will still see it.',
    })
  }

  const safeFirstName = escapeHtml(firstName)
  const safeLastName = escapeHtml(lastName)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone ?? '')
  const safeCompanySize = escapeHtml(companySize)
  const safeService = escapeHtml(service)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

  const html = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F0EDF8;padding:32px 16px">'
    + '<div style="background:linear-gradient(135deg,#08050F,#1A0A38);border-radius:20px 20px 0 0;padding:36px 40px;text-align:center">'
    + '<img src="https://www.flowtech.africa/wp-content/uploads/2022/05/FlowTech-Africa-Logo-1024x234.png" alt="FlowTech Africa" style="height:55px;width:auto;display:block;margin:0 auto 20px" />'
    + '<h1 style="color:white;margin:0;font-size:22px;font-weight:700">New Website Enquiry</h1>'
    + '<p style="color:rgba(255,255,255,0.5);margin:8px 0 0;font-size:13px">Submitted via FlowTech Africa website</p>'
    + '</div>'
    + '<div style="background:white;padding:36px 40px;border:1px solid rgba(91,53,213,0.1)">'
    + '<h2 style="color:#2D1580;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 20px;padding-bottom:10px;border-bottom:2px solid #F0EDF8">Client Details</h2>'
    + '<table style="width:100%;border-collapse:collapse;margin-bottom:28px">'
    + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700;width:130px">Full Name</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#0D0720;font-size:14px;font-weight:600">' + safeFirstName + ' ' + safeLastName + '</td></tr>'
    + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700">Email</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;font-size:14px"><a href="mailto:' + safeEmail + '" style="color:#5B35D5;text-decoration:none;font-weight:600">' + safeEmail + '</a></td></tr>'
    + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700">Phone</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;font-size:14px"><a href="tel:' + safePhone + '" style="color:#5B35D5;text-decoration:none">' + (safePhone || 'Not provided') + '</a></td></tr>'
    + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700">Company Size</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#0D0720;font-size:14px">' + safeCompanySize + '</td></tr>'
    + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700">Service</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;font-size:14px"><span style="background:rgba(91,53,213,0.08);color:#5B35D5;padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700">' + safeService + '</span></td></tr>'
    + '</table>'
    + '<h2 style="color:#2D1580;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 14px;padding-bottom:10px;border-bottom:2px solid #F0EDF8">Message</h2>'
    + '<div style="background:#F8F5FF;border-left:3px solid #5B35D5;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:28px">'
    + '<p style="margin:0;color:#2D1A4A;font-size:14px;line-height:1.8">' + safeMessage + '</p>'
    + '</div>'
    + '<div style="text-align:center;margin-bottom:28px">'
    + '<a href="mailto:' + safeEmail + '?subject=Re: Your FlowTech Africa Enquiry" style="display:inline-block;background:linear-gradient(135deg,#2D1580,#5B35D5);color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:700">Reply to ' + safeFirstName + ' &rarr;</a>'
    + '</div>'
    + '</div>'
    + '<div style="background:#08050F;border-radius:0 0 20px 20px;padding:28px 40px">'
    + '<p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.1em;font-weight:700">FlowTech Africa Contact Details</p>'
    + '<p style="color:rgba(255,255,255,0.55);font-size:12px;margin:6px 0">Unit 3, Boardwalk office park, 107 Boardwalk Blvd, Faerie Glen, Pretoria, 0034</p>'
    + '<p style="font-size:12px;margin:6px 0"><a href="tel:0128811930" style="color:#5B35D5;text-decoration:none">012 881 1930</a></p>'
    + '<p style="font-size:12px;margin:6px 0"><a href="mailto:michellef@flowtech.africa" style="color:#E8401A;text-decoration:none">michellef@flowtech.africa</a></p>'
    + '<p style="color:rgba(255,255,255,0.55);font-size:12px;margin:6px 0">www.flowtech.africa</p>'
    + '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:20px 0"/>'
    + '<p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0">' + new Date().getFullYear() + ' FlowTech Africa (Pty) Ltd. All rights reserved. | ISO 27001 | B-BBEE L1 | COBIT 5</p>'
    + '</div>'
    + '<p style="text-align:center;color:rgba(0,0,0,0.3);font-size:11px;margin-top:20px">This email was automatically generated from the FlowTech Africa website contact form.</p>'
    + '</div>'

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: `"FlowTech Africa Website" <${from}>`,
      to,
      replyTo: email,
      subject: `New Enquiry from ${firstName} ${lastName} - ${service}`,
      html,
    })

    // ── 4. Return success ──────────────────────────────────────────────
    return NextResponse.json({ success: true, data: { id: enquiry.id } })
  } catch (error) {
    // Enquiry is already safely stored — the email failure does not lose it.
    console.error('[contact] SMTP send failed (enquiry was still saved):', error)
    return NextResponse.json({
      success: true,
      data: { id: enquiry.id },
      warning: 'Your enquiry was received, but we could not send the notification email. Our team can still see it on the dashboard.',
    })
  }
}

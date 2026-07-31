import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FILL_TIME_MS = 1500

type NewsletterPayload = {
  email?: string
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

export async function POST(req: NextRequest) {
  let body: NewsletterPayload
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

  const email = body.email?.trim() ?? ''
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const from = process.env.EMAIL_FROM
  const to = process.env.EMAIL_TO?.split(',').map(a => a.trim()).filter(Boolean)

  if (!smtpUser || !smtpPass || !from || !to?.length) {
    console.error('[newsletter] Missing SMTP_USER, SMTP_PASS, EMAIL_FROM or EMAIL_TO environment variables')
    return NextResponse.json({ success: false, error: 'Something went wrong on our end. Please try again later.' }, { status: 500 })
  }

  const safeEmail = escapeHtml(email)

  const html = '<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#F0EDF8;padding:32px 16px">'
    + '<div style="background:linear-gradient(135deg,#08050F,#1A0A38);border-radius:20px 20px 0 0;padding:32px 36px;text-align:center">'
    + '<h1 style="color:white;margin:0;font-size:20px;font-weight:700">New Newsletter Signup</h1>'
    + '<p style="color:rgba(255,255,255,0.5);margin:8px 0 0;font-size:13px">Submitted via FlowTech Africa website</p>'
    + '</div>'
    + '<div style="background:white;padding:32px 36px;border:1px solid rgba(91,53,213,0.1);border-radius:0 0 20px 20px">'
    + '<p style="margin:0 0 8px;color:#6B5F8A;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Email Address</p>'
    + '<p style="margin:0;color:#0D0720;font-size:16px;font-weight:600"><a href="mailto:' + safeEmail + '" style="color:#5B35D5;text-decoration:none">' + safeEmail + '</a></p>'
    + '</div>'
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
      subject: 'New Newsletter Signup — FlowTech Africa',
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[newsletter] SMTP send failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to subscribe. Please try again later.' }, { status: 502 })
  }
}

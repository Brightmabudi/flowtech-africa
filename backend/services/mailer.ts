import nodemailer from 'nodemailer'
import { cleanEnv } from '@backend/services/env-clean'

// Sends notification emails. Uses Resend's HTTPS API when RESEND_API_KEY is set (works from any
// host, no mailbox sign-in restrictions); otherwise falls back to SMTP (Microsoft 365 by default).

export interface MailInput {
  fromName: string
  from: string
  to: string[]
  replyTo?: string
  subject: string
  html: string
  attachments?: { filename: string; content: Buffer }[]
}

export function mailConfigured(): boolean {
  if (cleanEnv('RESEND_API_KEY')) return !!(cleanEnv('EMAIL_FROM') && cleanEnv('EMAIL_TO'))
  return !!(cleanEnv('SMTP_USER') && cleanEnv('SMTP_PASS') && cleanEnv('EMAIL_FROM') && cleanEnv('EMAIL_TO'))
}

export function missingMailConfig(): string[] {
  const names = cleanEnv('RESEND_API_KEY') ? ['EMAIL_FROM', 'EMAIL_TO'] : ['SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM', 'EMAIL_TO']
  return names.filter(n => !cleanEnv(n))
}

export async function sendMail(mail: MailInput): Promise<void> {
  const apiKey = cleanEnv('RESEND_API_KEY')

  if (apiKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${mail.fromName} <${mail.from}>`,
        to: mail.to,
        reply_to: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
        attachments: mail.attachments?.map(a => ({ filename: a.filename, content: a.content.toString('base64') })),
      }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      const err = new Error(`Resend ${res.status}: ${body.slice(0, 200)}`) as Error & { code?: string; responseCode?: number }
      err.code = 'RESEND'
      err.responseCode = res.status
      throw err
    }
    return
  }

  const port = Number(cleanEnv('SMTP_PORT')) || 587
  const transporter = nodemailer.createTransport({
    host: cleanEnv('SMTP_HOST') || 'smtp.office365.com',
    port,
    secure: port === 465, // 587 uses STARTTLS
    auth: { user: cleanEnv('SMTP_USER'), pass: cleanEnv('SMTP_PASS') },
  })
  await transporter.sendMail({
    from: `"${mail.fromName}" <${mail.from}>`,
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    html: mail.html,
    attachments: mail.attachments,
  })
}

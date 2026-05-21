import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, companySize, service, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const html = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F0EDF8;padding:32px 16px">'
      + '<div style="background:linear-gradient(135deg,#08050F,#1A0A38);border-radius:20px 20px 0 0;padding:36px 40px;text-align:center">'
      + '<img src="https://www.flowtech.africa/wp-content/uploads/2022/05/FlowTech-Africa-Logo-1024x234.png" alt="FlowTech Africa" style="height:55px;width:auto;display:block;margin:0 auto 20px" />'
      + '<h1 style="color:white;margin:0;font-size:22px;font-weight:700">New Website Enquiry</h1>'
      + '<p style="color:rgba(255,255,255,0.5);margin:8px 0 0;font-size:13px">Submitted via FlowTech Africa website</p>'
      + '</div>'
      + '<div style="background:white;padding:36px 40px;border:1px solid rgba(91,53,213,0.1)">'
      + '<h2 style="color:#2D1580;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 20px;padding-bottom:10px;border-bottom:2px solid #F0EDF8">Client Details</h2>'
      + '<table style="width:100%;border-collapse:collapse;margin-bottom:28px">'
      + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700;width:130px">Full Name</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#0D0720;font-size:14px;font-weight:600">' + firstName + ' ' + lastName + '</td></tr>'
      + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700">Email</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;font-size:14px"><a href="mailto:' + email + '" style="color:#5B35D5;text-decoration:none;font-weight:600">' + email + '</a></td></tr>'
      + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700">Phone</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;font-size:14px"><a href="tel:' + phone + '" style="color:#5B35D5;text-decoration:none">' + (phone || 'Not provided') + '</a></td></tr>'
      + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700">Company Size</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#0D0720;font-size:14px">' + companySize + '</td></tr>'
      + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;color:#6B5F8A;font-size:13px;font-weight:700">Service</td><td style="padding:12px 0;border-bottom:1px solid #F0EDF8;font-size:14px"><span style="background:rgba(91,53,213,0.08);color:#5B35D5;padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700">' + service + '</span></td></tr>'
      + '</table>'
      + '<h2 style="color:#2D1580;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 14px;padding-bottom:10px;border-bottom:2px solid #F0EDF8">Message</h2>'
      + '<div style="background:#F8F5FF;border-left:3px solid #5B35D5;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:28px">'
      + '<p style="margin:0;color:#2D1A4A;font-size:14px;line-height:1.8">' + message + '</p>'
      + '</div>'
      + '<div style="text-align:center;margin-bottom:28px">'
      + '<a href="mailto:' + email + '?subject=Re: Your FlowTech Africa Enquiry" style="display:inline-block;background:linear-gradient(135deg,#2D1580,#5B35D5);color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:700">Reply to ' + firstName + ' &rarr;</a>'
      + '</div>'
      + '</div>'
      + '<div style="background:#08050F;border-radius:0 0 20px 20px;padding:28px 40px">'
      + '<p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.1em;font-weight:700">FlowTech Africa Contact Details</p>'
      + '<p style="color:rgba(255,255,255,0.55);font-size:12px;margin:6px 0">Boardwalk Lakeside Suites, Phase 02, Block G, Suite G01, 107 Haymeadow Street, Faerie Glen, 0043</p>'
      + '<p style="font-size:12px;margin:6px 0"><a href="tel:0128811930" style="color:#5B35D5;text-decoration:none">012 881 1930</a></p>'
      + '<p style="font-size:12px;margin:6px 0"><a href="mailto:michellef@flowtech.africa" style="color:#E8401A;text-decoration:none">michellef@flowtech.africa</a></p>'
      + '<p style="color:rgba(255,255,255,0.55);font-size:12px;margin:6px 0">www.flowtech.africa</p>'
      + '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:20px 0"/>'
      + '<p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0">2025 FlowTech Africa (Pty) Ltd. All rights reserved. | ISO 27001 | B-BBEE L1 | COBIT 5</p>'
      + '</div>'
      + '<p style="text-align:center;color:rgba(0,0,0,0.3);font-size:11px;margin-top:20px">This email was automatically generated from the FlowTech Africa website contact form.</p>'
      + '</div>'

    const info = await transporter.sendMail({
      from: '"FlowTech Africa Website" <' + process.env.EMAIL_USER + '>',
      to: 'brightsibiya1@gmail.com',
      replyTo: email,
      subject: 'New Enquiry from ' + firstName + ' ' + lastName + ' - ' + service,
      html: html,
    })

    console.log('Email sent:', info.messageId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
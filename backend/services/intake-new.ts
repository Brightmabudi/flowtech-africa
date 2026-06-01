import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { VALID_REQUEST_TYPES, VALID_CURRENCIES } from '@backend/services/intake-types'
import type { ValidRequestType, ValidCurrency, IntakeNewBody, IntakeNewResult } from '@backend/services/intake-types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(body: Partial<IntakeNewBody>): Record<string, string> {
  const e: Record<string, string> = {}
  if (!body.clientName?.trim())
    e.clientName = 'Full name is required.'
  else if (body.clientName.trim().length < 2)
    e.clientName = 'Name must be at least 2 characters.'
  if (!body.clientEmail?.trim())
    e.clientEmail = 'Email address is required.'
  else if (!EMAIL_RE.test(body.clientEmail.trim()))
    e.clientEmail = 'Please enter a valid email address.'
  if (!body.organizationName?.trim())
    e.organizationName = 'Organisation name is required.'
  else if (body.organizationName.trim().length < 2)
    e.organizationName = 'Organisation name must be at least 2 characters.'
  if (!body.requestType?.trim())
    e.requestType = 'Please select a request type.'
  else if (!VALID_REQUEST_TYPES.includes(body.requestType as ValidRequestType))
    e.requestType = 'Invalid request type.'
  if (body.amountCents === undefined || body.amountCents === null)
    e.amountCents = 'Service amount is required.'
  else if (!Number.isInteger(body.amountCents) || body.amountCents < 0)
    e.amountCents = 'Amount must be a non-negative integer in cents.'
  if (body.currency && !VALID_CURRENCIES.includes(body.currency as ValidCurrency))
    e.currency = 'Unsupported currency code.'
  return e
}

async function generateTrackingNumber(): Promise<string> {
  const year = new Date().getFullYear()
  for (let attempt = 0; attempt < 5; attempt++) {
    const suffix    = Math.floor(1000 + Math.random() * 9000)
    const candidate = `FT-${year}-${suffix}`
    const collision = await prisma.registrationRequest.findUnique({ where: { trackingNumber: candidate }, select: { id: true } })
    if (!collision) return candidate
  }
  return `FT-${year}-T${String(Date.now()).slice(-6)}`
}

export async function POST(req: NextRequest) {
  try {
    const body: Partial<IntakeNewBody> = await req.json()

    const errors = validate(body)
    if (Object.keys(errors).length > 0)
      return NextResponse.json({ success: false, errors }, { status: 422 })

    const { clientName, clientEmail, organizationName, requestType, amountCents, currency = 'ZAR' } = body as IntakeNewBody
    const trackingNumber = await generateTrackingNumber()

    const result = await prisma.$transaction(async (tx) => {
      const clientProfile = await tx.clientProfile.upsert({
        where:  { email: clientEmail.trim().toLowerCase() },
        update: { name: clientName.trim(), organizationName: organizationName.trim() },
        create: { email: clientEmail.trim().toLowerCase(), name: clientName.trim(), organizationName: organizationName.trim() },
      })
      const registrationRequest = await tx.registrationRequest.create({
        data: { type: requestType, status: 'Pending', trackingNumber, clientProfileId: clientProfile.id },
      })
      const billingRecord = await tx.billingRecord.create({
        data: { amount: amountCents, currency: currency.toUpperCase(), invoiceStatus: 'Draft', registrationRequestId: registrationRequest.id },
      })
      return { clientProfile, registrationRequest, billingRecord }
    })

    const payload: IntakeNewResult = {
      clientProfileId:       result.clientProfile.id,
      registrationRequestId: result.registrationRequest.id,
      billingRecordId:       result.billingRecord.id,
      trackingNumber:        result.registrationRequest.trackingNumber,
    }

    return NextResponse.json({ success: true, data: payload }, { status: 201 })
  } catch (error) {
    console.error('[dashboard/intake/new] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to create intake submission. Please try again.' }, { status: 500 })
  }
}

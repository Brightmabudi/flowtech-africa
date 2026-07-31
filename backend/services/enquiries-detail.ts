import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'
import { VALID_ENQUIRY_STATUSES } from '@backend/services/enquiry-types'

function toEnquiryJson(r: {
  id: number; firstName: string; lastName: string; email: string; phone: string | null
  companySize: string; serviceInterest: string; message: string; status: string
  createdAt: Date; updatedAt: Date
}) {
  return {
    id: r.id, firstName: r.firstName, lastName: r.lastName, email: r.email, phone: r.phone,
    companySize: r.companySize, serviceInterest: r.serviceInterest, message: r.message, status: r.status,
    createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString(),
  }
}

// ── GET /api/dashboard/enquiries/[id] ────────────────────────────────────────
// Admin only.

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  const id = Number(params.id)
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'Invalid enquiry ID.' }, { status: 400 })
  }

  try {
    const enquiry = await prisma.contactEnquiry.findUnique({ where: { id } })
    if (!enquiry) {
      return NextResponse.json({ success: false, error: 'Enquiry not found.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: toEnquiryJson(enquiry) })
  } catch (error) {
    console.error('[dashboard/enquiries/[id]] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load enquiry.' }, { status: 500 })
  }
}

// ── PATCH /api/dashboard/enquiries/[id] ──────────────────────────────────────
// Admin only. Status updates only.

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  const id = Number(params.id)
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'Invalid enquiry ID.' }, { status: 400 })
  }

  let body: { status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const status = body.status
  if (!status || !(VALID_ENQUIRY_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ success: false, error: 'Invalid status value.' }, { status: 400 })
  }

  try {
    const existing = await prisma.contactEnquiry.findUnique({ where: { id }, select: { id: true } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Enquiry not found.' }, { status: 404 })
    }

    const updated = await prisma.contactEnquiry.update({ where: { id }, data: { status } })
    return NextResponse.json({ success: true, data: toEnquiryJson(updated) })
  } catch (error) {
    console.error('[dashboard/enquiries/[id]] PATCH failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to update enquiry.' }, { status: 500 })
  }
}

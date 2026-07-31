import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@backend/services/db'
import { requireAdmin } from '@backend/middleware/require-auth'
import { VALID_ENQUIRY_STATUSES } from '@backend/services/enquiry-types'
import type { EnquiryListPayload } from '@backend/services/enquiry-types'

// ── GET /api/dashboard/enquiries ─────────────────────────────────────────────
// Admin only. Newest first. Filters: ?status=, ?q= (name/email/message search)

export async function GET(req: NextRequest) {
  const authCheck = requireAdmin()
  if (authCheck instanceof NextResponse) return authCheck

  try {
    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get('status')
    const q = searchParams.get('q')?.trim()

    const where: Prisma.ContactEnquiryWhereInput = {}

    if (statusParam && (VALID_ENQUIRY_STATUSES as readonly string[]).includes(statusParam)) {
      where.status = statusParam
    }

    if (q) {
      where.OR = [
        { firstName: { contains: q, mode: 'insensitive' } },
        { lastName:  { contains: q, mode: 'insensitive' } },
        { email:     { contains: q, mode: 'insensitive' } },
        { message:   { contains: q, mode: 'insensitive' } },
      ]
    }

    const rows = await prisma.contactEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    const enquiries = rows.map((r) => ({
      id: r.id, firstName: r.firstName, lastName: r.lastName, email: r.email, phone: r.phone,
      companySize: r.companySize, serviceInterest: r.serviceInterest, message: r.message, status: r.status,
      createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString(),
    }))

    const payload: EnquiryListPayload = { enquiries, total: enquiries.length }
    return NextResponse.json({ success: true, data: payload })
  } catch (error) {
    console.error('[dashboard/enquiries] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load enquiries.' }, { status: 500 })
  }
}

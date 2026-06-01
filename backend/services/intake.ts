import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import type { IntakeSubmission, IntakePayload } from '@backend/services/intake-types'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const statusFilter = searchParams.get('status')?.trim() || null
    const searchQuery  = searchParams.get('q')?.trim()      || null

    const rows = await prisma.registrationRequest.findMany({
      where: {
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(searchQuery
          ? {
              OR: [
                { trackingNumber: { contains: searchQuery } },
                { clientProfile:  { name:             { contains: searchQuery } } },
                { clientProfile:  { email:            { contains: searchQuery } } },
                { clientProfile:  { organizationName: { contains: searchQuery } } },
              ],
            }
          : {}),
      },
      include: {
        clientProfile:  { select: { id: true, name: true, email: true, organizationName: true } },
        billingRecords: { select: { amount: true, currency: true, invoiceStatus: true }, orderBy: { issuedAt: 'desc' }, take: 1 },
      },
      orderBy: { submittedAt: 'desc' },
    })

    const statusGroups = await prisma.registrationRequest.groupBy({ by: ['status'], _count: { id: true } })
    const countMap: Record<string, number> = {}
    for (const g of statusGroups) countMap[g.status] = g._count.id

    const submissions: IntakeSubmission[] = rows.map((row) => {
      const bill = row.billingRecords[0] ?? null
      return {
        id: row.id, trackingNumber: row.trackingNumber, type: row.type,
        status: row.status, submittedAt: row.submittedAt.toISOString(),
        client: {
          id: row.clientProfile.id, name: row.clientProfile.name,
          email: row.clientProfile.email, organizationName: row.clientProfile.organizationName,
        },
        billing: bill ? { amountCents: bill.amount, currency: bill.currency, invoiceStatus: bill.invoiceStatus } : null,
      }
    })

    const payload: IntakePayload = {
      submissions, total: submissions.length,
      counts: {
        pending:     countMap['Pending']      ?? 0,
        underReview: countMap['Under Review'] ?? 0,
        processed:   countMap['Processed']    ?? 0,
        rejected:    countMap['Rejected']     ?? 0,
      },
    }

    return NextResponse.json({ success: true, data: payload })
  } catch (error) {
    console.error('[dashboard/intake] query failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load intake submissions.' }, { status: 500 })
  }
}

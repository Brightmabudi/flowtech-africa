import { NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'

export async function GET() {
  try {
    const [totalClients, requestStatusGroups, billingRows] = await Promise.all([
      prisma.clientProfile.count(),
      prisma.registrationRequest.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.billingRecord.findMany({ select: { amount: true, currency: true, invoiceStatus: true } }),
    ])

    const requestCounts: Record<string, number> = {}
    for (const group of requestStatusGroups) requestCounts[group.status] = group._count.id

    const totalRequests     = Object.values(requestCounts).reduce((s, n) => s + n, 0)
    const pendingRequests   = requestCounts['Pending']      ?? 0
    const reviewRequests    = requestCounts['Under Review'] ?? 0
    const processedRequests = requestCounts['Processed']    ?? 0
    const rejectedRequests  = requestCounts['Rejected']     ?? 0

    let totalBillingCents = 0, paidCents = 0, outstandingCents = 0

    for (const row of billingRows) {
      totalBillingCents += row.amount
      if (row.invoiceStatus === 'Paid')
        paidCents += row.amount
      else if (row.invoiceStatus === 'Issued' || row.invoiceStatus === 'Overdue')
        outstandingCents += row.amount
    }

    return NextResponse.json({
      success: true,
      data: {
        clients:  { total: totalClients },
        requests: {
          total: totalRequests, pending: pendingRequests,
          underReview: reviewRequests, processed: processedRequests, rejected: rejectedRequests,
        },
        billing: {
          totalCents: totalBillingCents, paidCents, outstandingCents,
          totalDisplay:       (totalBillingCents / 100).toFixed(2),
          paidDisplay:        (paidCents         / 100).toFixed(2),
          outstandingDisplay: (outstandingCents   / 100).toFixed(2),
          currency:    billingRows[0]?.currency ?? 'ZAR',
          recordCount: billingRows.length,
        },
      },
    })
  } catch (error) {
    console.error('[dashboard/stats] query failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load dashboard statistics.' }, { status: 500 })
  }
}

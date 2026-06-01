import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@backend/services/db'
import type { BillingLedgerEntry, BillingCounts, BillingPayload } from '@backend/services/billing-types'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const statusFilter = searchParams.get('status')?.trim() || null
    const searchQuery  = searchParams.get('q')?.trim()      || null

    const rows = await prisma.billingRecord.findMany({
      where: {
        ...(statusFilter ? { invoiceStatus: statusFilter } : {}),
        ...(searchQuery
          ? {
              OR: [
                { registrationRequest: { clientProfile: { name:             { contains: searchQuery } } } },
                { registrationRequest: { clientProfile: { organizationName: { contains: searchQuery } } } },
                { registrationRequest: { clientProfile: { email:            { contains: searchQuery } } } },
                { registrationRequest: { trackingNumber:                    { contains: searchQuery } } },
              ],
            }
          : {}),
      },
      include: {
        registrationRequest: {
          select: {
            id: true, type: true, trackingNumber: true,
            clientProfile: { select: { id: true, name: true, email: true, organizationName: true } },
          },
        },
      },
      orderBy: { issuedAt: 'desc' },
    })

    const allRows = await prisma.billingRecord.findMany({
      select: { amount: true, invoiceStatus: true, currency: true },
    })

    let totalBilledCents = 0, paidCents = 0, outstandingCents = 0, draftCents = 0
    const counts: BillingCounts = { paid: 0, issued: 0, draft: 0, overdue: 0, cancelled: 0 }

    for (const r of allRows) {
      totalBilledCents += r.amount
      switch (r.invoiceStatus) {
        case 'Paid':      paidCents        += r.amount; counts.paid++;      break
        case 'Issued':    outstandingCents += r.amount; counts.issued++;    break
        case 'Overdue':   outstandingCents += r.amount; counts.overdue++;   break
        case 'Draft':     draftCents       += r.amount; counts.draft++;     break
        case 'Cancelled': counts.cancelled++;                               break
      }
    }

    const ledger: BillingLedgerEntry[] = rows.map((r) => ({
      id:            r.id,
      invoiceNumber: `INV-${String(r.id).padStart(5, '0')}`,
      amountCents:   r.amount,
      currency:      r.currency,
      invoiceStatus: r.invoiceStatus,
      issuedAt:      r.issuedAt.toISOString(),
      request: {
        id:             r.registrationRequest.id,
        type:           r.registrationRequest.type,
        trackingNumber: r.registrationRequest.trackingNumber,
      },
      client: {
        id:               r.registrationRequest.clientProfile.id,
        name:             r.registrationRequest.clientProfile.name,
        email:            r.registrationRequest.clientProfile.email,
        organizationName: r.registrationRequest.clientProfile.organizationName,
      },
    }))

    const payload: BillingPayload = {
      ledger,
      total: ledger.length,
      summary: {
        totalBilledCents, paidCents, outstandingCents, draftCents,
        currency:     allRows[0]?.currency ?? 'ZAR',
        invoiceCount: allRows.length,
        counts,
      },
    }

    return NextResponse.json({ success: true, data: payload })
  } catch (error) {
    console.error('[dashboard/billing] query failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load billing records.' }, { status: 500 })
  }
}

// ── Billing domain types ──────────────────────────────────────────────────────
// Imported by both the billing API route and the billing page.
// Nothing here is a Next.js route export — safe for any consumer.

export interface BillingLedgerEntry {
  id:            number
  invoiceNumber: string
  amountCents:   number
  currency:      string
  invoiceStatus: string
  issuedAt:      string
  request: {
    id:             number
    type:           string
    trackingNumber: string
  }
  client: {
    id:               number
    name:             string
    email:            string
    organizationName: string
  }
}

export interface BillingCounts {
  paid:      number
  issued:    number
  draft:     number
  overdue:   number
  cancelled: number
}

export interface BillingSummary {
  totalBilledCents:  number
  paidCents:         number
  outstandingCents:  number
  draftCents:        number
  currency:          string
  invoiceCount:      number
  counts:            BillingCounts
}

export interface BillingPayload {
  ledger:  BillingLedgerEntry[]
  total:   number
  summary: BillingSummary
}

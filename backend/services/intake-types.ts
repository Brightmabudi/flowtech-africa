// ── Shared intake domain types & constants ────────────────────────────────────
// Imported by both API route handlers and client pages.
// Nothing in this file is a Next.js route export — safe for any consumer.

// ── Domain value lists ────────────────────────────────────────────────────────

export const VALID_REQUEST_TYPES = [
  'Company Registration',
  'Tax Setup',
  'BBEE Certification',
  'Compliance Filing',
  'Business Licensing',
] as const

export const VALID_CURRENCIES = ['ZAR', 'USD', 'KES', 'GHS', 'NGN'] as const

export type ValidRequestType = (typeof VALID_REQUEST_TYPES)[number]
export type ValidCurrency    = (typeof VALID_CURRENCIES)[number]

// ── GET /api/dashboard/intake ─────────────────────────────────────────────────

export interface BillingInfo {
  amountCents:   number
  currency:      string
  invoiceStatus: string
}

export interface IntakeSubmission {
  id:             number
  trackingNumber: string
  type:           string
  status:         string
  submittedAt:    string
  client: {
    id:               number
    name:             string
    email:            string
    organizationName: string
  }
  billing: BillingInfo | null
}

export interface IntakePayload {
  submissions: IntakeSubmission[]
  total:       number
  counts: {
    pending:     number
    underReview: number
    processed:   number
    rejected:    number
  }
}

// ── POST /api/dashboard/intake/new ────────────────────────────────────────────

export interface IntakeNewBody {
  clientName:       string
  clientEmail:      string
  organizationName: string
  requestType:      string
  amountCents:      number
  currency:         string
}

export interface IntakeNewResult {
  clientProfileId:       number
  registrationRequestId: number
  billingRecordId:       number
  trackingNumber:        string
}

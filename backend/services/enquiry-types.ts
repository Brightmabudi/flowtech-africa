// ── Contact enquiry domain types ────────────────────────────────────────────
// Imported by the admin enquiries API and the admin enquiries dashboard page.

export const VALID_ENQUIRY_STATUSES = ['NEW', 'READ', 'RESPONDED', 'ARCHIVED'] as const

export type ValidEnquiryStatus = (typeof VALID_ENQUIRY_STATUSES)[number]

export interface ContactEnquiryRecord {
  id:              number
  firstName:       string
  lastName:        string
  email:           string
  phone:           string | null
  companySize:     string
  serviceInterest: string
  message:         string
  status:          string
  createdAt:       string
  updatedAt:       string
}

export interface EnquiryListPayload {
  enquiries: ContactEnquiryRecord[]
  total:     number
}

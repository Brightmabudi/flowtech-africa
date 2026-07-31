// ── Job application domain types ────────────────────────────────────────────
// Imported by the public apply route, the admin applications API, and the
// admin applications dashboard page.

export const VALID_STATUSES = [
  'NEW',
  'REVIEWED',
  'SHORTLISTED',
  'REJECTED',
  'ARCHIVED',
] as const

export type ValidStatus = (typeof VALID_STATUSES)[number]

export interface JobApplicationRecord {
  id:          number
  vacancyId:   number
  firstName:   string
  lastName:    string
  email:       string
  phone:       string | null
  location:    string | null
  coverLetter: string | null
  cvUrl:       string
  status:      string
  createdAt:   string
  updatedAt:   string
  vacancy?: {
    id:    number
    title: string
  }
}

export interface ApplicationListPayload {
  applications: JobApplicationRecord[]
  total:        number
}

export interface ApplyBody {
  firstName:   string
  lastName:    string
  email:       string
  phone?:      string
  location?:   string
  coverLetter?: string
  cvUrl:       string
}

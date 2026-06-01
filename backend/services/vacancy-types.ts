// ── Vacancy domain types ──────────────────────────────────────────────────────
// Imported by the vacancies API route, admin form page, and public careers page.

export const VALID_DEPARTMENTS = [
  'Engineering',
  'Security',
  'Sales',
  'Operations',
  'Finance',
  'Human Resources',
  'Marketing',
] as const

export const VALID_JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
] as const

export type ValidDepartment = (typeof VALID_DEPARTMENTS)[number]
export type ValidJobType    = (typeof VALID_JOB_TYPES)[number]

export interface Vacancy {
  id:           number
  title:        string
  department:   string
  location:     string
  type:         string
  description:  string
  requirements: string[]   // parsed from newline-separated DB string
  contactEmail: string
  isActive:     boolean
  closingDate:  string | null
  createdAt:    string
}

export interface VacancyPayload {
  vacancies: Vacancy[]
  total:     number
}

export interface VacancyNewBody {
  title:        string
  department:   string
  location:     string
  type:         string
  description:  string
  requirements: string   // newline-separated, stored as-is
  contactEmail: string
  closingDate:  string   // ISO date string e.g. "2026-09-30"
}

export interface VacancyNewResult {
  id:    number
  title: string
}

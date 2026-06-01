export const VALID_DOCUMENT_TYPES = [
  'CIPC Company Registration',
  'SARS Tax Clearance',
  'B-BBEE Affidavit',
  'Compliance Filing',
] as const

export type DocumentType = (typeof VALID_DOCUMENT_TYPES)[number]

export interface DocumentRecord {
  id:              number
  fileName:        string
  fileType:        string
  fileUrl:         string
  uploadedAt:      string
  clientProfileId: number
}

export interface DocumentUploadBody {
  fileName:        string
  fileType:        string
  clientProfileId: number
}

export interface DocumentUploadResult {
  id:         number
  fileName:   string
  fileType:   string
  fileUrl:    string
  uploadedAt: string
}

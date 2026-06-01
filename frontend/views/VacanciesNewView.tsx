'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@frontend/components/DashboardLayout'
import { VALID_DEPARTMENTS, VALID_JOB_TYPES } from '@backend/services/vacancy-types'
import type { VacancyNewBody, VacancyNewResult } from '@backend/services/vacancy-types'
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Briefcase,
  Send,
  ChevronRight,
  MapPin,
  Mail,
  AlignLeft,
  List,
  CalendarDays,
} from 'lucide-react'

// ── Form state ────────────────────────────────────────────────────────────────

interface FormFields {
  title:        string
  department:   string
  location:     string
  type:         string
  description:  string
  requirements: string
  contactEmail: string
  closingDate:  string
}

const EMPTY: FormFields = {
  title:        '',
  department:   '',
  location:     '',
  type:         'Full-time',
  description:  '',
  requirements: '',
  contactEmail: '',
  closingDate:  '',
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

// ── Validation ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f: FormFields): FieldErrors {
  const e: FieldErrors = {}
  if (!f.title.trim())          e.title        = 'Job title is required.'
  else if (f.title.trim().length < 3) e.title  = 'At least 3 characters required.'
  if (!f.department)            e.department   = 'Please select a department.'
  if (!f.location.trim())       e.location     = 'Location is required.'
  if (!f.type)                  e.type         = 'Please select a job type.'
  if (!f.description.trim())    e.description  = 'Description is required.'
  else if (f.description.trim().length < 20) e.description = 'At least 20 characters required.'
  if (!f.requirements.trim())   e.requirements = 'At least one requirement is required.'
  if (!f.contactEmail.trim())   e.contactEmail = 'Contact email is required.'
  else if (!EMAIL_RE.test(f.contactEmail.trim())) e.contactEmail = 'Enter a valid email address.'
  if (!f.closingDate)           e.closingDate  = 'Closing date is required.'
  else if (new Date(f.closingDate) <= new Date()) e.closingDate  = 'Closing date must be in the future.'
  return e
}

// ── UI primitives ─────────────────────────────────────────────────────────────

interface FieldProps {
  label:     string
  error?:    string
  required?: boolean
  hint?:     string
  children:  React.ReactNode
}

function Field({ label, error, required, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#475569]">
        {label}
        {required && <span className="text-[#FF5C3A]">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-[#94A3B8]">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-[#B91C1C] font-medium">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls = (error?: string) =>
  [
    'w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#0F172A] bg-white',
    'placeholder:text-[#CBD5E1] transition-all duration-200 focus:outline-none focus:ring-2',
    error
      ? 'border-[rgba(239,68,68,0.5)] focus:ring-[rgba(239,68,68,0.15)] focus:border-[rgba(239,68,68,0.6)]'
      : 'border-[rgba(15,23,42,0.1)] focus:ring-[rgba(59,31,168,0.15)] focus:border-[rgba(59,31,168,0.35)]',
  ].join(' ')

// ── Overlays ──────────────────────────────────────────────────────────────────

function SubmittingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-[rgba(59,31,168,0.1)] border-t-[#3B1FA8] animate-spin" />
          <Send className="absolute inset-0 m-auto w-5 h-5 text-[#3B1FA8]" />
        </div>
        <p className="text-sm font-semibold text-[#0F172A]">Publishing vacancy…</p>
        <p className="text-xs text-[#94A3B8]">Saving to database</p>
      </div>
    </div>
  )
}

function SuccessOverlay({ title }: { title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
        </div>
        <div>
          <p className="text-xl font-black text-[#0F172A]">Vacancy Published</p>
          <p className="text-sm text-[#475569] mt-1 max-w-xs">{title}</p>
          <p className="text-xs text-[#94A3B8] mt-2">Now live on the public Careers page</p>
        </div>
        <p className="text-xs text-[#CBD5E1]">Redirecting…</p>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function VacancyNewPage() {
  const router = useRouter()

  const [fields,     setFields]     = useState<FormFields>(EMPTY)
  const [errors,     setErrors]     = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError,   setApiError]   = useState<string | null>(null)
  const [result,     setResult]     = useState<VacancyNewResult | null>(null)

  const update = useCallback((key: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const handleSubmit = useCallback(async () => {
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    setApiError(null)

    const body: VacancyNewBody = {
      title:        fields.title.trim(),
      department:   fields.department,
      location:     fields.location.trim(),
      type:         fields.type,
      description:  fields.description.trim(),
      requirements: fields.requirements.trim(),
      contactEmail: fields.contactEmail.trim().toLowerCase(),
      closingDate:  fields.closingDate,
    }

    try {
      const res  = await fetch('/api/dashboard/vacancies', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        const msg = data.errors
          ? Object.values(data.errors as Record<string, string>).join(' · ')
          : (data.error ?? `Server error ${res.status}`)
        throw new Error(msg)
      }

      setResult(data.data as VacancyNewResult)
      setTimeout(() => router.push('/dashboard/vacancies'), 2000)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Unexpected error. Please try again.')
      setSubmitting(false)
    }
  }, [fields, router])

  return (
    <DashboardLayout>
      {submitting && !result && <SubmittingOverlay />}
      {result && <SuccessOverlay title={result.title} />}

      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div>
          <button
            onClick={() => router.push('/dashboard/vacancies')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Vacancies
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[rgba(59,31,168,0.08)] flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-4 h-4 text-[#3B1FA8]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">Post a Vacancy</h1>
              <p className="text-sm text-[#475569] mt-0.5">New listing will appear live on the public Careers page immediately</p>
            </div>
          </div>
        </div>

        {/* ── API error banner ─────────────────────────────────────────────── */}
        {apiError && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.04)]">
            <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0F172A]">Failed to publish vacancy</p>
              <p className="text-xs text-[#475569] mt-0.5">{apiError}</p>
            </div>
            <button onClick={() => setApiError(null)} className="text-[#94A3B8] hover:text-[#475569] text-xs font-semibold flex-shrink-0">
              Dismiss
            </button>
          </div>
        )}

        {/* ── Form card ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm overflow-hidden">

          {/* ── Section: Role identity ─────────────────────────────────────── */}
          <div className="p-6 sm:p-8 border-b border-[rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-2 mb-5">
              <Briefcase className="w-4 h-4 text-[#3B1FA8]" />
              <h2 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Role Details</h2>
            </div>
            <div className="space-y-5">
              <Field label="Job Title" error={errors.title} required>
                <input
                  type="text"
                  placeholder="e.g. Senior Cloud Infrastructure Engineer"
                  value={fields.title}
                  onChange={(e) => update('title', e.target.value)}
                  className={inputCls(errors.title)}
                  autoFocus
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Department" error={errors.department} required>
                  <div className="relative">
                    <select
                      value={fields.department}
                      onChange={(e) => update('department', e.target.value)}
                      className={[inputCls(errors.department), 'appearance-none pr-10 cursor-pointer', !fields.department ? 'text-[#CBD5E1]' : ''].join(' ')}
                    >
                      <option value="" disabled>Select department…</option>
                      {VALID_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] rotate-90" />
                  </div>
                </Field>

                <Field label="Job Type" error={errors.type} required>
                  <div className="relative">
                    <select
                      value={fields.type}
                      onChange={(e) => update('type', e.target.value)}
                      className={[inputCls(errors.type), 'appearance-none pr-10 cursor-pointer'].join(' ')}
                    >
                      {VALID_JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] rotate-90" />
                  </div>
                </Field>
              </div>

              <Field label="Location" error={errors.location} required>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Pretoria, Gauteng"
                    value={fields.location}
                    onChange={(e) => update('location', e.target.value)}
                    className={[inputCls(errors.location), 'pl-9'].join(' ')}
                  />
                </div>
              </Field>

              <Field
                label="Closing Date"
                error={errors.closingDate}
                required
                hint="Applications will be visually marked as closed after this date."
              >
                <div className="relative">
                  <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
                  <input
                    type="date"
                    value={fields.closingDate}
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    onChange={(e) => update('closingDate', e.target.value)}
                    className={[inputCls(errors.closingDate), 'pl-9'].join(' ')}
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* ── Section: Content ───────────────────────────────────────────── */}
          <div className="p-6 sm:p-8 border-b border-[rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-2 mb-5">
              <AlignLeft className="w-4 h-4 text-[#3B1FA8]" />
              <h2 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Job Content</h2>
            </div>
            <div className="space-y-5">
              <Field label="Job Description" error={errors.description} required hint="Describe the role, responsibilities, and what the candidate will be doing day-to-day.">
                <textarea
                  rows={5}
                  placeholder="Write a compelling description of the role and its impact…"
                  value={fields.description}
                  onChange={(e) => update('description', e.target.value)}
                  className={[inputCls(errors.description), 'resize-y min-h-[100px]'].join(' ')}
                />
              </Field>

              <Field
                label="Requirements"
                error={errors.requirements}
                required
                hint="Enter each requirement on a new line. Each line becomes a separate bullet point on the Careers page."
              >
                <div className="relative">
                  <List className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
                  <textarea
                    rows={6}
                    placeholder={"5+ years cloud experience (AWS/Azure/GCP)\nTerraform or Pulumi proficiency\nStrong Linux systems knowledge"}
                    value={fields.requirements}
                    onChange={(e) => update('requirements', e.target.value)}
                    className={[inputCls(errors.requirements), 'resize-y min-h-[120px] pl-9 font-mono text-[13px]'].join(' ')}
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* ── Section: Contact ───────────────────────────────────────────── */}
          <div className="p-6 sm:p-8 border-b border-[rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-2 mb-5">
              <Mail className="w-4 h-4 text-[#3B1FA8]" />
              <h2 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Application Contact</h2>
            </div>
            <Field
              label="Contact Email"
              error={errors.contactEmail}
              required
              hint="Applicants' 'Apply Now' mailto links will pre-address this email."
            >
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
                <input
                  type="email"
                  placeholder="e.g. hr@flowtech.africa"
                  value={fields.contactEmail}
                  onChange={(e) => update('contactEmail', e.target.value)}
                  className={[inputCls(errors.contactEmail), 'pl-9'].join(' ')}
                />
              </div>
            </Field>
          </div>

          {/* ── Footer ─────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-4 bg-[#FAFAFA]">
            <button
              onClick={() => router.push('/dashboard/vacancies')}
              disabled={submitting}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#475569] bg-white border border-[rgba(15,23,42,0.1)] hover:border-[rgba(59,31,168,0.2)] hover:text-[#3B1FA8] transition-all disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#3B1FA8] to-[#FF5C3A] hover:opacity-90 shadow-md shadow-[rgba(59,31,168,0.35)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? <><Loader2 className="w-4 h-4 animate-spin" />Publishing…</>
                : <><Send className="w-4 h-4" />Publish Vacancy</>
              }
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

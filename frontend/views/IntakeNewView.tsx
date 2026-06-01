'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@frontend/components/DashboardLayout'
import { VALID_REQUEST_TYPES, VALID_CURRENCIES } from '@backend/services/intake-types'
import type { IntakeNewBody, IntakeNewResult } from '@backend/services/intake-types'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Building2,
  ClipboardList,
  FileText,
  Banknote,
  Send,
  ChevronRight,
} from 'lucide-react'

// ── Form state ────────────────────────────────────────────────────────────────

interface FormFields {
  clientName:       string
  clientEmail:      string
  organizationName: string
  requestType:      string
  amountDisplay:    string   // ZAR decimal string entered by user
  currency:         string
}

const EMPTY_FORM: FormFields = {
  clientName:       '',
  clientEmail:      '',
  organizationName: '',
  requestType:      '',
  amountDisplay:    '',
  currency:         'ZAR',
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

// ── Validation ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateStep1(f: FormFields): FieldErrors {
  const e: FieldErrors = {}
  if (!f.clientName.trim())
    e.clientName = 'Full name is required.'
  else if (f.clientName.trim().length < 2)
    e.clientName = 'At least 2 characters required.'

  if (!f.clientEmail.trim())
    e.clientEmail = 'Email address is required.'
  else if (!EMAIL_RE.test(f.clientEmail.trim()))
    e.clientEmail = 'Please enter a valid email address.'
  return e
}

function validateStep2(f: FormFields): FieldErrors {
  const e: FieldErrors = {}
  if (!f.organizationName.trim())
    e.organizationName = 'Organisation name is required.'
  else if (f.organizationName.trim().length < 2)
    e.organizationName = 'At least 2 characters required.'

  if (!f.requestType)
    e.requestType = 'Please select a request type.'

  if (!f.amountDisplay.trim())
    e.amountDisplay = 'Service amount is required.'
  else {
    const n = parseFloat(f.amountDisplay)
    if (isNaN(n) || n < 0)
      e.amountDisplay = 'Enter a valid non-negative amount.'
  }
  return e
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseCents(display: string): number {
  return Math.round(parseFloat(display) * 100)
}

function formatZAR(cents: number, currency = 'ZAR'): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency', currency,
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

// ── Reusable input primitives ─────────────────────────────────────────────────

interface FieldProps {
  label:       string
  error?:      string
  required?:   boolean
  hint?:       string
  children:    React.ReactNode
}

function Field({ label, error, required, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#475569]">
        {label}
        {required && <span className="text-[#FF5C3A]">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] text-[#94A3B8]">{hint}</p>
      )}
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
    'placeholder:text-[#CBD5E1] transition-all duration-200',
    'focus:outline-none focus:ring-2',
    error
      ? 'border-[rgba(239,68,68,0.5)] focus:ring-[rgba(239,68,68,0.15)] focus:border-[rgba(239,68,68,0.6)]'
      : 'border-[rgba(15,23,42,0.1)] focus:ring-[rgba(59,31,168,0.15)] focus:border-[rgba(59,31,168,0.35)]',
  ].join(' ')

// ── Step progress indicator ───────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: 'Client Details',  icon: User        },
  { n: 2, label: 'Request Details', icon: Building2   },
  { n: 3, label: 'Review',          icon: ClipboardList },
]

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between w-full">
      {STEPS.map((step, idx) => {
        const done    = currentStep > step.n
        const active  = currentStep === step.n
        const Icon    = step.icon

        return (
          <div key={step.n} className="flex items-center flex-1 last:flex-none">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={[
                'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-sm font-black',
                done
                  ? 'bg-[#3B1FA8] border-[#3B1FA8] text-white'
                  : active
                  ? 'bg-white border-[#3B1FA8] text-[#3B1FA8]'
                  : 'bg-white border-[rgba(15,23,42,0.12)] text-[#94A3B8]',
              ].join(' ')}>
                {done
                  ? <CheckCircle2 className="w-4 h-4" />
                  : active
                  ? <Icon className="w-4 h-4" />
                  : <span>{step.n}</span>
                }
              </div>
              <span className={[
                'text-[10px] font-bold uppercase tracking-wide whitespace-nowrap hidden sm:block',
                active ? 'text-[#3B1FA8]' : done ? 'text-[#475569]' : 'text-[#CBD5E1]',
              ].join(' ')}>
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {idx < STEPS.length - 1 && (
              <div className="flex-1 mx-2 mb-5">
                <div className={[
                  'h-0.5 rounded-full transition-all duration-500',
                  done ? 'bg-[#3B1FA8]' : 'bg-[rgba(15,23,42,0.08)]',
                ].join(' ')} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Step 1 — Client Details ────────────────────────────────────────────────────

function Step1({
  fields, errors, onChange,
}: { fields: FormFields; errors: FieldErrors; onChange: (k: keyof FormFields, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-[rgba(15,23,42,0.06)]">
        <div className="w-9 h-9 rounded-xl bg-[rgba(59,31,168,0.08)] flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-[#3B1FA8]" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#0F172A] leading-tight">Client Details</h2>
          <p className="text-xs text-[#94A3B8]">Primary contact information for the client</p>
        </div>
      </div>

      <Field label="Full Name" error={errors.clientName} required>
        <input
          type="text"
          placeholder="e.g. Amara Dlamini"
          value={fields.clientName}
          onChange={(e) => onChange('clientName', e.target.value)}
          className={inputCls(errors.clientName)}
          autoFocus
        />
      </Field>

      <Field
        label="Email Address"
        error={errors.clientEmail}
        required
        hint="Used as the unique identifier — an existing profile will be updated if found."
      >
        <input
          type="email"
          placeholder="e.g. amara@company.co.za"
          value={fields.clientEmail}
          onChange={(e) => onChange('clientEmail', e.target.value)}
          className={inputCls(errors.clientEmail)}
        />
      </Field>
    </div>
  )
}

// ── Step 2 — Organisation & Request ──────────────────────────────────────────

function Step2({
  fields, errors, onChange,
}: { fields: FormFields; errors: FieldErrors; onChange: (k: keyof FormFields, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-[rgba(15,23,42,0.06)]">
        <div className="w-9 h-9 rounded-xl bg-[rgba(59,31,168,0.08)] flex items-center justify-center flex-shrink-0">
          <Building2 className="w-4 h-4 text-[#3B1FA8]" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#0F172A] leading-tight">Organisation &amp; Request</h2>
          <p className="text-xs text-[#94A3B8]">Service request and initial billing configuration</p>
        </div>
      </div>

      <Field label="Organisation / Company Name" error={errors.organizationName} required>
        <input
          type="text"
          placeholder="e.g. Horizon Ventures (Pty) Ltd"
          value={fields.organizationName}
          onChange={(e) => onChange('organizationName', e.target.value)}
          className={inputCls(errors.organizationName)}
          autoFocus
        />
      </Field>

      <Field label="Request Type" error={errors.requestType} required>
        <div className="relative">
          <select
            value={fields.requestType}
            onChange={(e) => onChange('requestType', e.target.value)}
            className={[
              inputCls(errors.requestType),
              'appearance-none pr-10 cursor-pointer',
              !fields.requestType ? 'text-[#CBD5E1]' : '',
            ].join(' ')}
          >
            <option value="" disabled>Select a service type…</option>
            {VALID_REQUEST_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] rotate-90" />
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Service Amount"
          error={errors.amountDisplay}
          required
          hint="Enter in major currency units (e.g. 2500.00)"
        >
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#94A3B8] select-none">
              {fields.currency}
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={fields.amountDisplay}
              onChange={(e) => onChange('amountDisplay', e.target.value)}
              className={[inputCls(errors.amountDisplay), 'pl-12 tabular-nums'].join(' ')}
            />
          </div>
        </Field>

        <Field label="Currency">
          <div className="relative">
            <select
              value={fields.currency}
              onChange={(e) => onChange('currency', e.target.value)}
              className={[inputCls(), 'appearance-none pr-10 cursor-pointer'].join(' ')}
            >
              {VALID_CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] rotate-90" />
          </div>
        </Field>
      </div>
    </div>
  )
}

// ── Step 3 — Review & Confirmation ────────────────────────────────────────────

function ReviewRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-[rgba(15,23,42,0.05)] last:border-0">
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mt-0.5 flex-shrink-0">{label}</span>
      <span className={['text-sm font-semibold text-[#0F172A] text-right', mono ? 'font-mono' : ''].join(' ')}>
        {value}
      </span>
    </div>
  )
}

function Step3({ fields }: { fields: FormFields }) {
  const cents = parseCents(fields.amountDisplay)

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-[rgba(15,23,42,0.06)]">
        <div className="w-9 h-9 rounded-xl bg-[rgba(59,31,168,0.08)] flex items-center justify-center flex-shrink-0">
          <ClipboardList className="w-4 h-4 text-[#3B1FA8]" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#0F172A] leading-tight">Review &amp; Confirm</h2>
          <p className="text-xs text-[#94A3B8]">Verify all details before submitting</p>
        </div>
      </div>

      {/* Client section */}
      <div className="rounded-xl border border-[rgba(15,23,42,0.08)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F9FAFB] border-b border-[rgba(15,23,42,0.05)]">
          <User className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Client</span>
        </div>
        <div className="px-4">
          <ReviewRow label="Name"  value={fields.clientName} />
          <ReviewRow label="Email" value={fields.clientEmail} mono />
        </div>
      </div>

      {/* Organisation & request section */}
      <div className="rounded-xl border border-[rgba(15,23,42,0.08)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F9FAFB] border-b border-[rgba(15,23,42,0.05)]">
          <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Organisation &amp; Request</span>
        </div>
        <div className="px-4">
          <ReviewRow label="Organisation" value={fields.organizationName} />
          <ReviewRow label="Request Type" value={fields.requestType} />
        </div>
      </div>

      {/* Billing section */}
      <div className="rounded-xl border border-[rgba(15,23,42,0.08)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F9FAFB] border-b border-[rgba(15,23,42,0.05)]">
          <Banknote className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Initial Billing</span>
        </div>
        <div className="px-4">
          <ReviewRow label="Amount"   value={isNaN(cents) ? '—' : formatZAR(cents, fields.currency)} />
          <ReviewRow label="Currency" value={fields.currency} mono />
          <ReviewRow label="Status"   value="Draft (auto-assigned)" />
        </div>
      </div>

      {/* Info notice */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[rgba(59,31,168,0.04)] border border-[rgba(59,31,168,0.1)]">
        <FileText className="w-4 h-4 text-[#3B1FA8] flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#475569] leading-relaxed">
          A unique tracking number (<span className="font-mono font-bold">FT-{new Date().getFullYear()}-XXXX</span>) will be
          generated automatically on submit. The request will enter a{' '}
          <span className="font-bold text-[#B45309]">Pending</span> status with a{' '}
          <span className="font-bold text-[#475569]">Draft</span> invoice.
        </p>
      </div>
    </div>
  )
}

// ── Success overlay ───────────────────────────────────────────────────────────

function SuccessOverlay({ trackingNumber }: { trackingNumber: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
        </div>
        <div>
          <p className="text-xl font-black text-[#0F172A]">Submission Created</p>
          <p className="text-sm text-[#475569] mt-1">Tracking number assigned</p>
          <p className="font-mono text-lg font-bold text-[#3B1FA8] mt-2">{trackingNumber}</p>
        </div>
        <p className="text-xs text-[#94A3B8]">Redirecting to intake submissions…</p>
      </div>
    </div>
  )
}

// ── Submitting overlay ────────────────────────────────────────────────────────

function SubmittingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-[rgba(59,31,168,0.1)] border-t-[#3B1FA8] animate-spin" />
          <Send className="absolute inset-0 m-auto w-5 h-5 text-[#3B1FA8]" />
        </div>
        <p className="text-sm font-semibold text-[#0F172A]">Submitting intake…</p>
        <p className="text-xs text-[#94A3B8]">Creating records in the database</p>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function IntakeNewPage() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [fields,      setFields]      = useState<FormFields>(EMPTY_FORM)
  const [errors,      setErrors]      = useState<FieldErrors>({})
  const [submitting,  setSubmitting]  = useState(false)
  const [apiError,    setApiError]    = useState<string | null>(null)
  const [result,      setResult]      = useState<IntakeNewResult | null>(null)

  const update = useCallback((key: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    // Clear the error for this field as the user types
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const goNext = useCallback(() => {
    const validationErrors = currentStep === 1 ? validateStep1(fields) : validateStep2(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setCurrentStep((s) => s + 1)
  }, [currentStep, fields])

  const goBack = useCallback(() => {
    setErrors({})
    setCurrentStep((s) => s - 1)
  }, [])

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    setApiError(null)

    const body: IntakeNewBody = {
      clientName:       fields.clientName.trim(),
      clientEmail:      fields.clientEmail.trim().toLowerCase(),
      organizationName: fields.organizationName.trim(),
      requestType:      fields.requestType,
      amountCents:      parseCents(fields.amountDisplay),
      currency:         fields.currency,
    }

    try {
      const res  = await fetch('/api/dashboard/intake/new', {
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

      setResult(data.data as IntakeNewResult)
      setTimeout(() => router.push('/dashboard/intake'), 2000)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Unexpected error. Please try again.')
      setSubmitting(false)
    }
  }, [fields, router])

  return (
    <DashboardLayout>
      {/* Overlays */}
      {submitting && !result && <SubmittingOverlay />}
      {result      && <SuccessOverlay trackingNumber={result.trackingNumber} />}

      <div className="max-w-2xl mx-auto space-y-6">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div>
          <button
            onClick={() => router.push('/dashboard/intake')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Intake Submissions
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[rgba(59,31,168,0.08)] flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-4 h-4 text-[#3B1FA8]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">
                New Intake Submission
              </h1>
              <p className="text-sm text-[#475569] mt-0.5">
                Register a new client and attach a service request
              </p>
            </div>
          </div>
        </div>

        {/* ── Step progress ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm px-6 py-5">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* ── API error banner ─────────────────────────────────────────────── */}
        {apiError && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.04)]">
            <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0F172A]">Submission failed</p>
              <p className="text-xs text-[#475569] mt-0.5">{apiError}</p>
            </div>
            <button
              onClick={() => setApiError(null)}
              className="text-[#94A3B8] hover:text-[#475569] text-xs font-semibold flex-shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Form card ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            {currentStep === 1 && <Step1 fields={fields} errors={errors} onChange={update} />}
            {currentStep === 2 && <Step2 fields={fields} errors={errors} onChange={update} />}
            {currentStep === 3 && <Step3 fields={fields} />}
          </div>

          {/* ── Navigation footer ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-4 bg-[#FAFAFA] border-t border-[rgba(15,23,42,0.06)]">
            {/* Step counter */}
            <span className="text-[11px] font-bold text-[#CBD5E1] uppercase tracking-widest">
              Step {currentStep} of {STEPS.length}
            </span>

            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  onClick={goBack}
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-[#475569] bg-white border border-[rgba(15,23,42,0.1)] hover:border-[rgba(59,31,168,0.2)] hover:text-[#3B1FA8] transition-all disabled:opacity-40"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              )}

              {currentStep < STEPS.length ? (
                <button
                  onClick={goNext}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[#3B1FA8] hover:bg-[#2D1580] shadow-md shadow-[rgba(59,31,168,0.3)] hover:shadow-lg hover:shadow-[rgba(59,31,168,0.4)] transition-all duration-200"
                >
                  Continue
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#3B1FA8] to-[#FF5C3A] hover:opacity-90 shadow-md shadow-[rgba(59,31,168,0.35)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</>
                    : <><Send className="w-4 h-4" />Submit Intake</>
                  }
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

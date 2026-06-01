'use client'

import { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '@frontend/components/DashboardLayout'
import { VALID_DOCUMENT_TYPES } from '@backend/services/document-types'
import type { DocumentUploadResult } from '@backend/services/document-types'
import type { AdminDocument } from '@backend/services/documents-admin'
import {
  FolderLock, CheckCircle2, AlertCircle, Loader2, ChevronRight,
  Upload, FileText, User, Building2, Tag, RefreshCw, Trash2, X,
  ShieldOff, Plus,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ClientOption {
  id:               number
  name:             string
  email:            string
  organizationName: string
}

interface FormState {
  fileName:        string
  fileType:        string
  clientProfileId: string
}

const EMPTY_FORM: FormState = { fileName: '', fileType: '', clientProfileId: '' }

type FieldErrors = Partial<Record<keyof FormState, string>>

// ── Colour maps ───────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  'CIPC Company Registration': { bg: 'bg-[rgba(59,31,168,0.07)]',  text: 'text-[#3B1FA8]',  ring: 'ring-[rgba(59,31,168,0.18)]'  },
  'SARS Tax Clearance':        { bg: 'bg-[rgba(16,185,129,0.07)]', text: 'text-[#047857]',  ring: 'ring-[rgba(16,185,129,0.18)]' },
  'B-BBEE Affidavit':          { bg: 'bg-[rgba(245,158,11,0.07)]', text: 'text-[#B45309]',  ring: 'ring-[rgba(245,158,11,0.18)]' },
  'Compliance Filing':         { bg: 'bg-[rgba(59,130,246,0.07)]', text: 'text-[#1D4ED8]',  ring: 'ring-[rgba(59,130,246,0.18)]' },
}

const AVATAR_GRADIENTS = [
  'from-[#3B1FA8] to-[#6D4AE8]',
  'from-[#FF5C3A] to-[#F59E0B]',
  'from-[#10B981] to-[#3B82F6]',
  'from-[#6D28D9] to-[#3B1FA8]',
]
const avatarGrad = (id: number) => AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: string }) {
  const cfg = TYPE_COLORS[type] ?? { bg: 'bg-[#F1F5F9]', text: 'text-[#64748B]', ring: 'ring-[#E2E8F0]' }
  return (
    <span className={['inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ring-1 whitespace-nowrap', cfg.bg, cfg.text, cfg.ring].join(' ')}>
      <Tag className="w-3 h-3 flex-shrink-0" />{type}
    </span>
  )
}

const inputCls = (err?: string) =>
  ['w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#0F172A] bg-white placeholder:text-[#CBD5E1] transition-all duration-200 focus:outline-none focus:ring-2',
    err ? 'border-[rgba(239,68,68,0.5)] focus:ring-[rgba(239,68,68,0.15)] focus:border-[rgba(239,68,68,0.5)]'
        : 'border-[rgba(15,23,42,0.1)] focus:ring-[rgba(59,31,168,0.15)] focus:border-[rgba(59,31,168,0.35)]',
  ].join(' ')

function Field({ label, error, hint, required, children }: { label: string; error?: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#475569]">
        {label}{required && <span className="text-[#FF5C3A]">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-[#94A3B8]">{hint}</p>}
      {error && <p className="flex items-center gap-1 text-[11px] text-[#B91C1C] font-medium"><AlertCircle className="w-3 h-3 flex-shrink-0" />{error}</p>}
    </div>
  )
}

// ── Publish success overlay ───────────────────────────────────────────────────

function SuccessOverlay({ doc, onClose }: { doc: DocumentUploadResult; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.1)] shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
        </div>
        <div>
          <p className="text-xl font-black text-[#0F172A]">Document Published</p>
          <p className="text-sm text-[#475569] mt-1">The file has been assigned to the client vault.</p>
        </div>
        <div className="w-full rounded-xl border border-[rgba(15,23,42,0.08)] overflow-hidden text-left">
          <div className="px-4 py-3 bg-[#F9FAFB] border-b border-[rgba(15,23,42,0.06)]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Published Document</p>
          </div>
          <div className="px-4 py-3 space-y-2">
            <p className="text-sm font-semibold text-[#0F172A]">{doc.fileName}</p>
            <TypeBadge type={doc.fileType} />
            <p className="text-[11px] font-mono text-[#94A3B8] break-all">{doc.fileUrl}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-[#3B1FA8] text-white text-sm font-bold hover:bg-[#2D1580] transition-colors">
          Publish Another Document
        </button>
      </div>
    </div>
  )
}

// ── Document row (admin list) ─────────────────────────────────────────────────

interface DocRowProps {
  doc:            AdminDocument
  confirming:     boolean
  deleting:       boolean
  onRevoke:       (id: number) => void
  onConfirm:      (id: number) => void
  onCancel:       () => void
}

function DocRow({ doc, confirming, deleting, onRevoke, onConfirm, onCancel }: DocRowProps) {
  return (
    <div className={['border-b border-[rgba(15,23,42,0.05)] last:border-0 transition-colors duration-150', confirming ? 'bg-[rgba(239,68,68,0.02)]' : 'hover:bg-[#FAFBFF]', deleting ? 'opacity-40' : ''].join(' ')}>
      {/* Main row */}
      <div className="flex items-center gap-4 px-4 py-3.5 min-w-0">

        {/* File icon */}
        <div className="w-8 h-8 rounded-lg bg-[rgba(59,31,168,0.06)] flex items-center justify-center flex-shrink-0">
          <FileText className="w-4 h-4 text-[#3B1FA8]" />
        </div>

        {/* File name */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#0F172A] truncate leading-tight">{doc.fileName}</p>
          <p className="text-[11px] font-mono text-[#CBD5E1] truncate mt-0.5">{doc.fileUrl}</p>
        </div>

        {/* Type badge */}
        <div className="hidden md:block flex-shrink-0">
          <TypeBadge type={doc.fileType} />
        </div>

        {/* Client avatar + name */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 w-44 min-w-0">
          <div className={['w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 text-white text-[9px] font-black', avatarGrad(doc.client.id)].join(' ')}>
            {doc.client.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-[#0F172A] truncate leading-tight">{doc.client.organizationName}</p>
            <p className="text-[10px] text-[#94A3B8] truncate">{doc.client.name}</p>
          </div>
        </div>

        {/* Date */}
        <p className="text-[11px] text-[#94A3B8] whitespace-nowrap flex-shrink-0 hidden sm:block">{fmtDate(doc.uploadedAt)}</p>

        {/* Revoke / delete trigger */}
        {!confirming ? (
          <button onClick={() => onRevoke(doc.id)} disabled={deleting}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#94A3B8] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] border border-transparent hover:border-[rgba(239,68,68,0.15)] transition-all flex-shrink-0">
            <ShieldOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Revoke</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button onClick={onCancel}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#475569] bg-white border border-[rgba(15,23,42,0.1)] hover:border-[rgba(15,23,42,0.2)] transition-all">
              <X className="w-3 h-3" />Cancel
            </button>
            <button onClick={() => onConfirm(doc.id)} disabled={deleting}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] disabled:opacity-50 transition-all">
              {deleting ? <><Loader2 className="w-3 h-3 animate-spin" />Revoking…</> : <><Trash2 className="w-3 h-3" />Confirm</>}
            </button>
          </div>
        )}
      </div>

      {/* Confirming sub-banner */}
      {confirming && (
        <div className="px-4 py-2 bg-[rgba(239,68,68,0.04)] border-t border-[rgba(239,68,68,0.08)]">
          <p className="text-[11px] text-[#B91C1C] font-semibold">
            This will permanently remove <span className="font-black">{doc.fileName}</span> from the client portal. This cannot be undone.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Row skeleton ──────────────────────────────────────────────────────────────

function RowSkeleton() {
  function Sk({ w }: { w: string }) { return <div className={['h-3.5 rounded animate-pulse bg-[#F1F5F9]', w].join(' ')} /> }
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 border-b border-[rgba(15,23,42,0.05)] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-1.5 min-w-0"><Sk w="w-48" /><Sk w="w-32" /></div>
      <Sk w="w-28 hidden md:block" />
      <Sk w="w-32 hidden lg:block" />
      <Sk w="w-16 hidden sm:block" />
      <Sk w="w-14" />
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DocumentsPage() {
  // ── Published documents list ──────────────────────────────────────────────
  const [docs,       setDocs]       = useState<AdminDocument[]>([])
  const [docsLoading,setDocsLoading]= useState(true)
  const [docsError,  setDocsError]  = useState<string | null>(null)

  const [confirmingId,setConfirmingId] = useState<number | null>(null)
  const [deletingId,  setDeletingId]   = useState<number | null>(null)
  const [revokeError, setRevokeError]  = useState<string | null>(null)
  const [revokeToast, setRevokeToast]  = useState<string | null>(null)

  // ── Publish form ──────────────────────────────────────────────────────────
  const [showForm,    setShowForm]    = useState(false)
  const [clients,     setClients]     = useState<ClientOption[]>([])
  const [clientsErr,  setClientsErr]  = useState(false)
  const [loadingClts, setLoadingClts] = useState(true)
  const [form,        setForm]        = useState<FormState>(EMPTY_FORM)
  const [errors,      setErrors]      = useState<FieldErrors>({})
  const [submitting,  setSubmitting]  = useState(false)
  const [apiError,    setApiError]    = useState<string | null>(null)
  const [result,      setResult]      = useState<DocumentUploadResult | null>(null)

  // ── Fetch published docs ─────────────────────────────────────────────────
  const loadDocs = useCallback(async () => {
    setDocsLoading(true)
    setDocsError(null)
    try {
      const res  = await fetch('/api/dashboard/documents', { cache: 'no-store' })
      const body = await res.json()
      if (!res.ok || !body.success) throw new Error(body.error ?? 'Failed to load')
      setDocs(body.data as AdminDocument[])
    } catch (err) {
      setDocsError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setDocsLoading(false)
    }
  }, [])

  // ── Fetch clients for form ────────────────────────────────────────────────
  const loadClients = useCallback(async () => {
    setLoadingClts(true)
    setClientsErr(false)
    try {
      const res  = await fetch('/api/dashboard/clients', { cache: 'no-store' })
      const body = await res.json()
      if (body.success) setClients(body.data)
      else setClientsErr(true)
    } catch { setClientsErr(true) }
    finally  { setLoadingClts(false) }
  }, [])

  useEffect(() => { loadDocs() }, [loadDocs])
  useEffect(() => { if (showForm) loadClients() }, [showForm, loadClients])

  // ── Revoke / delete ───────────────────────────────────────────────────────
  const handleRevoke  = (id: number) => { setConfirmingId(id); setRevokeError(null) }
  const handleCancel  = ()           => setConfirmingId(null)

  const handleConfirmRevoke = useCallback(async (id: number) => {
    setDeletingId(id)
    setRevokeError(null)
    try {
      const res  = await fetch('/api/dashboard/documents', {
        method:  'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id }),
      })
      const body = await res.json()
      if (!res.ok || !body.success) throw new Error(body.error ?? `Server error ${res.status}`)
      setDocs((prev) => prev.filter((d) => d.id !== id))
      setConfirmingId(null)
      setRevokeToast(`"${body.data.fileName}" revoked successfully.`)
    } catch (err) {
      setRevokeError(err instanceof Error ? err.message : 'Failed to revoke document.')
    } finally {
      setDeletingId(null)
    }
  }, [])

  // ── Form helpers ──────────────────────────────────────────────────────────
  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => { if (!prev[key]) return prev; const n = { ...prev }; delete n[key]; return n })
  }

  function validateForm(): FieldErrors {
    const e: FieldErrors = {}
    if (!form.fileName.trim())        e.fileName        = 'File name is required.'
    else if (form.fileName.trim().length < 3) e.fileName = 'At least 3 characters required.'
    if (!form.fileType)               e.fileType        = 'Please select a document type.'
    if (!form.clientProfileId)        e.clientProfileId = 'Please select a target client.'
    return e
  }

  async function handlePublish() {
    const ve = validateForm()
    if (Object.keys(ve).length > 0) { setErrors(ve); return }
    setErrors({})
    setSubmitting(true)
    setApiError(null)
    try {
      const res  = await fetch('/api/dashboard/documents/upload', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ fileName: form.fileName.trim(), fileType: form.fileType, clientProfileId: Number(form.clientProfileId) }),
      })
      const body = await res.json()
      if (!res.ok || !body.success) {
        const msg = body.errors
          ? Object.values(body.errors as Record<string, string>).join(' · ')
          : (body.error ?? `Server error ${res.status}`)
        throw new Error(msg)
      }
      setResult(body.data as DocumentUploadResult)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Unexpected error.')
    } finally {
      setSubmitting(false)
    }
  }

  function resetForm() {
    setForm(EMPTY_FORM); setErrors({}); setApiError(null); setResult(null)
    loadDocs()  // refresh list after publishing
  }

  const selectedClient = clients.find((c) => String(c.id) === form.clientProfileId)

  // ── Toast ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!revokeToast) return
    const t = setTimeout(() => setRevokeToast(null), 3500)
    return () => clearTimeout(t)
  }, [revokeToast])

  return (
    <DashboardLayout>
      {result && <SuccessOverlay doc={result} onClose={resetForm} />}

      {submitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-[rgba(59,31,168,0.1)] border-t-[#3B1FA8] animate-spin" />
              <Upload className="absolute inset-0 m-auto w-5 h-5 text-[#3B1FA8]" />
            </div>
            <p className="text-sm font-semibold text-[#0F172A]">Publishing document…</p>
          </div>
        </div>
      )}

      {/* Toast */}
      {revokeToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />{revokeToast}
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Page header ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[rgba(59,31,168,0.08)] flex items-center justify-center flex-shrink-0">
              <FolderLock className="w-4 h-4 text-[#3B1FA8]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">Document Vault</h1>
              <p className="text-sm text-[#475569] mt-0.5">Manage compliance documents assigned to client accounts</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={loadDocs} disabled={docsLoading}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] disabled:opacity-40 px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.08)] bg-white hover:border-[rgba(59,31,168,0.2)] shadow-sm transition-colors">
              <RefreshCw className={['w-3.5 h-3.5', docsLoading ? 'animate-spin' : ''].join(' ')} />Refresh
            </button>
            <button onClick={() => setShowForm((p) => !p)}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#3B1FA8] hover:bg-[#2D1580] px-4 py-2 rounded-lg shadow-md shadow-[rgba(59,31,168,0.3)] transition-all">
              <Plus className="w-3.5 h-3.5" />Publish Document
            </button>
          </div>
        </div>

        {/* ── Publish form (collapsible) ──────────────────────────────────── */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-[rgba(59,31,168,0.15)] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-[rgba(59,31,168,0.03)] border-b border-[rgba(59,31,168,0.1)]">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#3B1FA8]" />
                <h2 className="text-sm font-black text-[#0F172A]">Publish New Document</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="text-[#94A3B8] hover:text-[#475569] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* API error */}
            {apiError && (
              <div className="mx-6 mt-4 flex items-start gap-3 p-3 rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.04)]">
                <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#0F172A] flex-1">{apiError}</p>
                <button onClick={() => setApiError(null)} className="text-[#94A3B8] hover:text-[#475569]"><X className="w-3 h-3" /></button>
              </div>
            )}

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left: document info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[rgba(15,23,42,0.06)]">
                  <FileText className="w-4 h-4 text-[#3B1FA8]" />
                  <h3 className="text-sm font-black text-[#0F172A]">Document Info</h3>
                </div>

                <Field label="File Name" error={errors.fileName} required hint="e.g. Horizon Ventures — CIPC Certificate 2025">
                  <input type="text" placeholder="Enter the document display name…" value={form.fileName}
                    onChange={(e) => update('fileName', e.target.value)} className={inputCls(errors.fileName)} autoFocus />
                </Field>

                <Field label="Document Type" error={errors.fileType} required>
                  <div className="relative">
                    <select value={form.fileType} onChange={(e) => update('fileType', e.target.value)}
                      className={[inputCls(errors.fileType), 'appearance-none pr-10 cursor-pointer', !form.fileType ? 'text-[#CBD5E1]' : ''].join(' ')}>
                      <option value="" disabled>Select a document category…</option>
                      {VALID_DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] rotate-90" />
                  </div>
                  {form.fileType && <div className="mt-1"><TypeBadge type={form.fileType} /></div>}
                </Field>

                <Field label="File Attachment" hint="Select a PDF (preview only — binary upload not in scope)">
                  <label className={[inputCls(), 'flex items-center gap-3 cursor-pointer hover:border-[rgba(59,31,168,0.35)] group'].join(' ')}>
                    <div className="w-8 h-8 rounded-lg bg-[rgba(59,31,168,0.07)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(59,31,168,0.12)] transition-colors">
                      <Upload className="w-4 h-4 text-[#3B1FA8]" />
                    </div>
                    <span className="text-sm text-[#94A3B8] group-hover:text-[#3B1FA8] transition-colors">Click to select PDF…</span>
                    <input type="file" accept=".pdf" className="hidden" />
                  </label>
                </Field>
              </div>

              {/* Right: client assignment */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(15,23,42,0.06)]">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#3B1FA8]" />
                    <h3 className="text-sm font-black text-[#0F172A]">Client Assignment</h3>
                  </div>
                  {clientsErr && (
                    <button onClick={loadClients} className="flex items-center gap-1 text-[11px] font-semibold text-[#FF5C3A] hover:text-[#3B1FA8] transition-colors">
                      <RefreshCw className="w-3 h-3" />Retry
                    </button>
                  )}
                </div>

                <Field label="Target Client" error={errors.clientProfileId} required hint="Document will appear in this client's portal vault immediately.">
                  <div className="relative">
                    {loadingClts ? (
                      <div className={[inputCls(), 'flex items-center gap-2 text-[#94A3B8]'].join(' ')}>
                        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" /><span className="text-sm">Loading clients…</span>
                      </div>
                    ) : clientsErr ? (
                      <div className={[inputCls(), 'flex items-center gap-2 text-[#FF5C3A]'].join(' ')}>
                        <AlertCircle className="w-4 h-4 flex-shrink-0" /><span className="text-sm">Failed to load clients</span>
                      </div>
                    ) : (
                      <>
                        <select value={form.clientProfileId} onChange={(e) => update('clientProfileId', e.target.value)}
                          className={[inputCls(errors.clientProfileId), 'appearance-none pr-10 cursor-pointer', !form.clientProfileId ? 'text-[#CBD5E1]' : ''].join(' ')} disabled={loadingClts}>
                          <option value="" disabled>Select a client company…</option>
                          {clients.map((c) => <option key={c.id} value={String(c.id)}>{c.organizationName} — {c.name}</option>)}
                        </select>
                        <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] rotate-90" />
                      </>
                    )}
                  </div>
                </Field>

                {selectedClient && (
                  <div className="rounded-xl border border-[rgba(59,31,168,0.12)] bg-[rgba(59,31,168,0.03)] p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B1FA8] to-[#FF5C3A] flex items-center justify-center flex-shrink-0 text-white text-[11px] font-black shadow-sm">
                      {selectedClient.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#0F172A] truncate">{selectedClient.organizationName}</p>
                      <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">{selectedClient.name} · {selectedClient.email}</p>
                    </div>
                    <User className="w-4 h-4 text-[#3B1FA8] flex-shrink-0 ml-auto" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-6 py-4 bg-[#FAFAFA] border-t border-[rgba(15,23,42,0.06)]">
              <p className="text-[11px] text-[#94A3B8]">Document will be available immediately in the client portal.</p>
              <button onClick={handlePublish} disabled={submitting || loadingClts || clientsErr}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#3B1FA8] to-[#FF5C3A] hover:opacity-90 shadow-md shadow-[rgba(59,31,168,0.3)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Publishing…</> : <><Upload className="w-4 h-4" />Publish Document</>}
              </button>
            </div>
          </div>
        )}

        {/* ── Published documents table ───────────────────────────────────── */}
        <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white shadow-sm overflow-hidden">

          {/* Table header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAFA] border-b border-[rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-2">
              <FolderLock className="w-3.5 h-3.5 text-[#3B1FA8]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">Published Documents</span>
              {!docsLoading && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[rgba(59,31,168,0.08)] text-[#3B1FA8]">{docs.length}</span>
              )}
            </div>
          </div>

          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-[rgba(15,23,42,0.05)] bg-[#FAFAFA]">
            {['Document', 'Category', 'Client', 'Uploaded', 'Action'].map((h) => (
              <span key={h} className="text-[10px] font-bold uppercase tracking-widest text-[#CBD5E1]">{h}</span>
            ))}
          </div>

          {/* Revoke error */}
          {revokeError && (
            <div className="mx-4 mt-3 flex items-center gap-3 p-3 rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.04)]">
              <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
              <p className="text-xs text-[#0F172A] flex-1">{revokeError}</p>
              <button onClick={() => setRevokeError(null)} className="text-[#94A3B8] hover:text-[#475569]"><X className="w-3 h-3" /></button>
            </div>
          )}

          {/* Rows */}
          {docsLoading && Array.from({ length: 4 }).map((_, i) => <RowSkeleton key={i} />)}

          {docsError && (
            <div className="flex flex-col items-center gap-3 py-14 text-center px-6">
              <AlertCircle className="w-8 h-8 text-[#FF5C3A]" />
              <p className="text-sm font-semibold text-[#0F172A]">Failed to load documents</p>
              <p className="text-xs text-[#94A3B8]">{docsError}</p>
              <button onClick={loadDocs} className="flex items-center gap-1.5 text-xs font-semibold text-[#3B1FA8] hover:text-[#FF5C3A] transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />Try again
              </button>
            </div>
          )}

          {!docsLoading && !docsError && docs.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center px-6">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(59,31,168,0.06)] flex items-center justify-center">
                <FolderLock className="w-5 h-5 text-[#3B1FA8]" />
              </div>
              <p className="text-sm font-semibold text-[#0F172A]">No documents published yet</p>
              <p className="text-xs text-[#94A3B8] max-w-xs">Use the Publish Document button above to assign compliance files to client accounts.</p>
            </div>
          )}

          {!docsLoading && !docsError && docs.map((doc) => (
            <DocRow
              key={doc.id}
              doc={doc}
              confirming={confirmingId === doc.id}
              deleting={deletingId === doc.id}
              onRevoke={handleRevoke}
              onConfirm={handleConfirmRevoke}
              onCancel={handleCancel}
            />
          ))}

          {/* Footer */}
          {!docsLoading && !docsError && docs.length > 0 && (
            <div className="px-4 py-2.5 bg-[#FAFAFA] border-t border-[rgba(15,23,42,0.05)]">
              <p className="text-[11px] text-[#94A3B8]">
                {docs.length} document{docs.length !== 1 ? 's' : ''} across {new Set(docs.map((d) => d.client.id)).size} client{new Set(docs.map((d) => d.client.id)).size !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}

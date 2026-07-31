'use client'

import { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '@frontend/components/DashboardLayout'
import type { ContactEnquiryRecord, EnquiryListPayload, ValidEnquiryStatus } from '@backend/services/enquiry-types'
import { VALID_ENQUIRY_STATUSES } from '@backend/services/enquiry-types'
import {
  Mail, RefreshCw, AlertCircle, Search, Phone, Building2, Calendar,
  ChevronDown, ChevronUp, CheckCircle2, Loader2,
} from 'lucide-react'

const SAST = 'Africa/Johannesburg'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { timeZone: SAST, day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  NEW:       { bg: 'rgba(59,130,246,0.08)',  text: '#1D4ED8', border: 'rgba(59,130,246,0.2)' },
  READ:      { bg: 'rgba(148,163,184,0.1)',  text: '#475569', border: 'rgba(148,163,184,0.25)' },
  RESPONDED: { bg: 'rgba(16,185,129,0.08)',  text: '#047857', border: 'rgba(16,185,129,0.2)' },
  ARCHIVED:  { bg: 'rgba(15,23,42,0.05)',    text: '#475569', border: 'rgba(15,23,42,0.12)' },
}

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? STATUS_COLORS.NEW
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap">
      {status.replace('_', ' ')}
    </span>
  )
}

function Sk({ className }: { className?: string }) {
  return <div className={['rounded animate-pulse bg-[#F1F5F9]', className].join(' ')} />
}

function RowSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <Sk className="h-5 w-48" />
        <Sk className="h-6 w-20 rounded-full" />
      </div>
      <Sk className="h-4 w-64" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[rgba(59,31,168,0.06)] flex items-center justify-center mb-4">
        <Mail className="w-6 h-6 text-[#3B1FA8]" />
      </div>
      <p className="text-sm font-semibold text-[#0F172A] mb-1">No enquiries found</p>
      <p className="text-xs text-[#94A3B8] max-w-xs">Submissions from the public contact form will appear here.</p>
    </div>
  )
}

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500)
    return () => clearTimeout(t)
  }, [onDismiss])
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold">
      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
      {message}
    </div>
  )
}

interface EnquiryCardProps {
  enquiry: ContactEnquiryRecord
  expanded: boolean
  onToggleExpand: () => void
  onStatusChange: (id: number, status: ValidEnquiryStatus) => void
  updating: boolean
}

function EnquiryCard({ enquiry: e, expanded, onToggleExpand, onStatusChange, updating }: EnquiryCardProps) {
  const preview = e.message.length > 120 ? `${e.message.slice(0, 120)}…` : e.message
  return (
    <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-black text-[#0F172A] leading-tight truncate">{e.firstName} {e.lastName}</h3>
            <p className="text-[12px] text-[#3B1FA8] font-semibold mt-0.5">{e.serviceInterest}</p>
          </div>
          <StatusBadge status={e.status} />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] text-[#94A3B8]">
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{e.email}</span>
          {e.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{e.phone}</span>}
          <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{e.companySize}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(e.createdAt)}</span>
        </div>

        <p className="text-[13px] text-[#475569] leading-relaxed mb-3">{preview}</p>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={e.status}
              disabled={updating}
              onChange={(ev) => onStatusChange(e.id, ev.target.value as ValidEnquiryStatus)}
              className="appearance-none text-[12px] font-semibold text-[#0F172A] bg-white border border-[rgba(15,23,42,0.1)] hover:border-[rgba(59,31,168,0.3)] rounded-lg pl-3 pr-7 py-1.5 cursor-pointer disabled:opacity-50 transition-colors"
            >
              {VALID_ENQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
            {updating
              ? <Loader2 className="w-3 h-3 animate-spin absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
              : <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />}
          </div>

          <button
            onClick={onToggleExpand}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#475569] hover:text-[#0F172A] px-3 py-1.5 rounded-lg border border-[rgba(15,23,42,0.08)] hover:border-[rgba(15,23,42,0.16)] transition-colors ml-auto"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? 'Hide full message' : 'View full message'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-5 py-4 bg-[#F9FAFB] border-t border-[rgba(15,23,42,0.06)] space-y-2">
          <p className="text-[13px] font-semibold text-[#0F172A] mb-1">Full message</p>
          <p className="text-[13px] text-[#475569] leading-relaxed whitespace-pre-wrap">{e.message}</p>
          {e.updatedAt !== e.createdAt && (
            <p className="text-[12px] text-[#94A3B8] pt-2">Last updated: {formatDate(e.updatedAt)}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function EnquiriesView() {
  const [payload, setPayload] = useState<EnquiryListPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  const fetchEnquiries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      if (search.trim()) params.set('q', search.trim())

      const res = await fetch(`/api/dashboard/enquiries?${params.toString()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const body = await res.json()
      if (!body.success) throw new Error(body.error ?? 'Unknown API error')
      setPayload(body.data as EnquiryListPayload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => { fetchEnquiries() }, [fetchEnquiries])

  const handleStatusChange = useCallback(async (id: number, status: ValidEnquiryStatus) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/dashboard/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const body = await res.json()
      if (!res.ok || !body.success) throw new Error(body.error ?? `Server error ${res.status}`)

      setPayload((prev) => prev
        ? { ...prev, enquiries: prev.enquiries.map((e) => e.id === id ? { ...e, status, updatedAt: body.data.updatedAt } : e) }
        : prev
      )
      setToast(`Status updated to ${status.replace('_', ' ')}.`)
    } catch (err) {
      setToast(err instanceof Error ? err.message : 'Failed to update status.')
    } finally {
      setUpdatingId(null)
    }
  }, [])

  return (
    <DashboardLayout>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto space-y-5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[rgba(59,31,168,0.08)] flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-[#3B1FA8]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Website</p>
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">Contact Enquiries</h1>
            <p className="text-sm text-[#475569] mt-0.5">Submissions from the public contact form</p>
          </div>
          <button onClick={fetchEnquiries} disabled={loading}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] disabled:opacity-40 px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.08)] bg-white hover:border-[rgba(59,31,168,0.2)] shadow-sm transition-colors flex-shrink-0">
            <RefreshCw className={['w-3.5 h-3.5', loading ? 'animate-spin' : ''].join(' ')} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm p-4 space-y-3">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="Search name, email, or message…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-[13px] pl-8 pr-3 py-2 rounded-lg border border-[rgba(15,23,42,0.1)] focus:border-[rgba(59,31,168,0.3)] outline-none"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[13px] px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.1)] focus:border-[rgba(59,31,168,0.3)] outline-none bg-white">
              <option value="">All statuses</option>
              {VALID_ENQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-[rgba(255,92,58,0.2)] bg-[rgba(255,92,58,0.04)] p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#FF5C3A] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0F172A]">Failed to load enquiries</p>
              <p className="text-xs text-[#475569] mt-0.5">{error}</p>
            </div>
            <button onClick={fetchEnquiries} className="flex items-center gap-1.5 text-xs font-semibold text-[#3B1FA8] hover:text-[#FF5C3A] transition-colors flex-shrink-0">
              <RefreshCw className="w-3.5 h-3.5" />Retry
            </button>
          </div>
        )}

        {!loading && payload && (
          <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
            <span className="font-bold text-[#475569]">{payload.total}</span>
            {payload.total === 1 ? 'enquiry' : 'enquiries'}
          </div>
        )}

        <div className="space-y-4">
          {loading && Array.from({ length: 3 }).map((_, i) => <RowSkeleton key={i} />)}
          {!loading && !error && payload?.total === 0 && <EmptyState />}
          {!loading && payload?.enquiries.map((e) => (
            <EnquiryCard
              key={e.id}
              enquiry={e}
              expanded={expandedId === e.id}
              onToggleExpand={() => setExpandedId((cur) => cur === e.id ? null : e.id)}
              onStatusChange={handleStatusChange}
              updating={updatingId === e.id}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import DashboardLayout from '@frontend/components/DashboardLayout'
import type { JobApplicationRecord, ApplicationListPayload, ValidStatus } from '@backend/services/application-types'
import { VALID_STATUSES } from '@backend/services/application-types'
import type { VacancyPayload } from '@backend/services/vacancy-types'
import {
  Users, RefreshCw, AlertCircle, Search, Mail, Phone, Calendar,
  ExternalLink, ChevronDown, ChevronUp, CheckCircle2, Loader2,
} from 'lucide-react'

const SAST = 'Africa/Johannesburg'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { timeZone: SAST, day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  NEW:         { bg: 'rgba(59,130,246,0.08)',  text: '#1D4ED8', border: 'rgba(59,130,246,0.2)' },
  REVIEWED:    { bg: 'rgba(245,158,11,0.08)',  text: '#B45309', border: 'rgba(245,158,11,0.2)' },
  SHORTLISTED: { bg: 'rgba(16,185,129,0.08)',  text: '#047857', border: 'rgba(16,185,129,0.2)' },
  REJECTED:    { bg: 'rgba(239,68,68,0.08)',   text: '#DC2626', border: 'rgba(239,68,68,0.2)'  },
  ARCHIVED:    { bg: 'rgba(15,23,42,0.05)',    text: '#475569', border: 'rgba(15,23,42,0.12)' },
}

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? STATUS_COLORS.NEW
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap">
      {status}
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
        <Sk className="h-6 w-24 rounded-full" />
      </div>
      <Sk className="h-4 w-64" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[rgba(59,31,168,0.06)] flex items-center justify-center mb-4">
        <Users className="w-6 h-6 text-[#3B1FA8]" />
      </div>
      <p className="text-sm font-semibold text-[#0F172A] mb-1">No applications found</p>
      <p className="text-xs text-[#94A3B8] max-w-xs">Applications submitted from the public careers page will appear here.</p>
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

interface ApplicationCardProps {
  application: JobApplicationRecord
  expanded: boolean
  onToggleExpand: () => void
  onStatusChange: (id: number, status: ValidStatus) => void
  updating: boolean
}

function ApplicationCard({ application: a, expanded, onToggleExpand, onStatusChange, updating }: ApplicationCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-black text-[#0F172A] leading-tight truncate">{a.firstName} {a.lastName}</h3>
            <p className="text-[12px] text-[#3B1FA8] font-semibold mt-0.5">{a.vacancy?.title ?? `Vacancy #${a.vacancyId}`}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={a.status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] text-[#94A3B8]">
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{a.email}</span>
          {a.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{a.phone}</span>}
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(a.createdAt)}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a href={a.cvUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3B1FA8] hover:text-[#2D1580] px-3 py-1.5 rounded-lg border border-[rgba(59,31,168,0.15)] hover:border-[rgba(59,31,168,0.3)] transition-colors">
            <ExternalLink className="w-3 h-3" />View CV
          </a>

          <div className="relative">
            <select
              value={a.status}
              disabled={updating}
              onChange={(e) => onStatusChange(a.id, e.target.value as ValidStatus)}
              className="appearance-none text-[12px] font-semibold text-[#0F172A] bg-white border border-[rgba(15,23,42,0.1)] hover:border-[rgba(59,31,168,0.3)] rounded-lg pl-3 pr-7 py-1.5 cursor-pointer disabled:opacity-50 transition-colors"
            >
              {VALID_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
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
            {expanded ? 'Hide details' : 'View details'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-5 py-4 bg-[#F9FAFB] border-t border-[rgba(15,23,42,0.06)] space-y-2">
          {a.location && <p className="text-[13px] text-[#475569]"><span className="font-semibold text-[#0F172A]">Location:</span> {a.location}</p>}
          <p className="text-[13px] text-[#475569]"><span className="font-semibold text-[#0F172A]">Applied:</span> {formatDate(a.createdAt)}</p>
          {a.updatedAt !== a.createdAt && (
            <p className="text-[13px] text-[#475569]"><span className="font-semibold text-[#0F172A]">Last updated:</span> {formatDate(a.updatedAt)}</p>
          )}
          <div>
            <p className="text-[13px] font-semibold text-[#0F172A] mb-1">Cover letter</p>
            <p className="text-[13px] text-[#475569] leading-relaxed whitespace-pre-wrap">
              {a.coverLetter || <span className="text-[#94A3B8] italic">Not provided</span>}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ApplicationsView() {
  const [payload, setPayload] = useState<ApplicationListPayload | null>(null)
  const [vacancies, setVacancies] = useState<VacancyPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const [vacancyFilter, setVacancyFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [fromFilter, setFromFilter] = useState('')
  const [toFilter, setToFilter] = useState('')
  const [search, setSearch] = useState('')

  const fetchApplications = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (vacancyFilter) params.set('vacancyId', vacancyFilter)
      if (statusFilter) params.set('status', statusFilter)
      if (fromFilter) params.set('from', fromFilter)
      if (toFilter) params.set('to', toFilter)
      if (search.trim()) params.set('q', search.trim())

      const res = await fetch(`/api/dashboard/applications?${params.toString()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const body = await res.json()
      if (!body.success) throw new Error(body.error ?? 'Unknown API error')
      setPayload(body.data as ApplicationListPayload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }, [vacancyFilter, statusFilter, fromFilter, toFilter, search])

  useEffect(() => { fetchApplications() }, [fetchApplications])

  useEffect(() => {
    fetch('/api/dashboard/vacancies?all=1')
      .then((r) => r.json())
      .then((body) => { if (body.success) setVacancies(body.data as VacancyPayload) })
      .catch(() => {})
  }, [])

  const handleStatusChange = useCallback(async (id: number, status: ValidStatus) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/dashboard/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const body = await res.json()
      if (!res.ok || !body.success) throw new Error(body.error ?? `Server error ${res.status}`)

      setPayload((prev) => prev
        ? { ...prev, applications: prev.applications.map((a) => a.id === id ? { ...a, status, updatedAt: body.data.updatedAt } : a) }
        : prev
      )
      setToast(`Status updated to ${status}.`)
    } catch (err) {
      setToast(err instanceof Error ? err.message : 'Failed to update status.')
    } finally {
      setUpdatingId(null)
    }
  }, [])

  const activeFilterCount = useMemo(() => [vacancyFilter, statusFilter, fromFilter, toFilter, search].filter(Boolean).length, [vacancyFilter, statusFilter, fromFilter, toFilter, search])

  const clearFilters = () => { setVacancyFilter(''); setStatusFilter(''); setFromFilter(''); setToFilter(''); setSearch('') }

  return (
    <DashboardLayout>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto space-y-5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[rgba(59,31,168,0.08)] flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-[#3B1FA8]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Careers</p>
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">Applications</h1>
            <p className="text-sm text-[#475569] mt-0.5">Candidates who applied via the public careers page</p>
          </div>
          <button onClick={fetchApplications} disabled={loading}
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
                placeholder="Search name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-[13px] pl-8 pr-3 py-2 rounded-lg border border-[rgba(15,23,42,0.1)] focus:border-[rgba(59,31,168,0.3)] outline-none"
              />
            </div>
            <select value={vacancyFilter} onChange={(e) => setVacancyFilter(e.target.value)}
              className="text-[13px] px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.1)] focus:border-[rgba(59,31,168,0.3)] outline-none bg-white">
              <option value="">All vacancies</option>
              {vacancies?.vacancies.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[13px] px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.1)] focus:border-[rgba(59,31,168,0.3)] outline-none bg-white">
              <option value="">All statuses</option>
              {VALID_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input type="date" value={fromFilter} onChange={(e) => setFromFilter(e.target.value)}
              className="text-[13px] px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.1)] focus:border-[rgba(59,31,168,0.3)] outline-none" />
            <input type="date" value={toFilter} onChange={(e) => setToFilter(e.target.value)}
              className="text-[13px] px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.1)] focus:border-[rgba(59,31,168,0.3)] outline-none" />
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-[12px] font-semibold text-[#3B1FA8] hover:text-[#2D1580] px-2">
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-[rgba(255,92,58,0.2)] bg-[rgba(255,92,58,0.04)] p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#FF5C3A] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0F172A]">Failed to load applications</p>
              <p className="text-xs text-[#475569] mt-0.5">{error}</p>
            </div>
            <button onClick={fetchApplications} className="flex items-center gap-1.5 text-xs font-semibold text-[#3B1FA8] hover:text-[#FF5C3A] transition-colors flex-shrink-0">
              <RefreshCw className="w-3.5 h-3.5" />Retry
            </button>
          </div>
        )}

        {!loading && payload && (
          <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
            <span className="font-bold text-[#475569]">{payload.total}</span>
            {payload.total === 1 ? 'application' : 'applications'}
          </div>
        )}

        <div className="space-y-4">
          {loading && Array.from({ length: 3 }).map((_, i) => <RowSkeleton key={i} />)}
          {!loading && !error && payload?.total === 0 && <EmptyState />}
          {!loading && payload?.applications.map((a) => (
            <ApplicationCard
              key={a.id}
              application={a}
              expanded={expandedId === a.id}
              onToggleExpand={() => setExpandedId((cur) => cur === a.id ? null : a.id)}
              onStatusChange={handleStatusChange}
              updating={updatingId === a.id}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

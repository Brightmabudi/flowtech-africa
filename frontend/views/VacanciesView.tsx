'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import DashboardLayout from '@frontend/components/DashboardLayout'
import type { Vacancy, VacancyPayload } from '@backend/services/vacancy-types'
import {
  Briefcase, Plus, RefreshCw, AlertCircle,
  MapPin, Mail, Clock, Trash2, Loader2, X, CheckCircle2,
} from 'lucide-react'

const SAST = 'Africa/Johannesburg'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    timeZone: SAST, day: '2-digit', month: 'short', year: 'numeric',
  })
}

const DEPT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Engineering:      { bg: 'rgba(59,31,168,0.08)',  text: '#3B1FA8', border: 'rgba(59,31,168,0.2)'  },
  Security:         { bg: 'rgba(255,92,58,0.08)',   text: '#C2410C', border: 'rgba(255,92,58,0.2)'  },
  Sales:            { bg: 'rgba(16,185,129,0.08)',  text: '#047857', border: 'rgba(16,185,129,0.2)' },
  Operations:       { bg: 'rgba(59,130,246,0.08)',  text: '#1D4ED8', border: 'rgba(59,130,246,0.2)' },
  Finance:          { bg: 'rgba(245,158,11,0.08)',  text: '#B45309', border: 'rgba(245,158,11,0.2)' },
  'Human Resources':{ bg: 'rgba(139,92,246,0.08)', text: '#6D28D9', border: 'rgba(139,92,246,0.2)' },
  Marketing:        { bg: 'rgba(236,72,153,0.08)',  text: '#BE185D', border: 'rgba(236,72,153,0.2)' },
}

function DeptBadge({ dept }: { dept: string }) {
  const c = DEPT_COLORS[dept] ?? { bg: 'rgba(15,23,42,0.04)', text: '#475569', border: 'rgba(15,23,42,0.1)' }
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap">
      {dept}
    </span>
  )
}

function Sk({ className }: { className?: string }) {
  return <div className={['rounded animate-pulse bg-[#F1F5F9]', className].join(' ')} />
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <Sk className="h-5 w-64" />
        <Sk className="h-6 w-24 rounded-full" />
      </div>
      <div className="flex gap-2"><Sk className="h-5 w-20 rounded-full" /><Sk className="h-5 w-32 rounded-full" /></div>
      <Sk className="h-4 w-full" /><Sk className="h-4 w-3/4" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[rgba(59,31,168,0.06)] flex items-center justify-center mb-4">
        <Briefcase className="w-6 h-6 text-[#3B1FA8]" />
      </div>
      <p className="text-sm font-semibold text-[#0F172A] mb-1">No active vacancies</p>
      <p className="text-xs text-[#94A3B8] mb-5 max-w-xs">Post your first vacancy and it will appear instantly on the public Careers page.</p>
      <Link href="/dashboard/vacancies/new"
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#3B1FA8] hover:bg-[#2D1580] shadow-md shadow-[rgba(59,31,168,0.3)] transition-all">
        <Plus className="w-4 h-4" />Post First Vacancy
      </Link>
    </div>
  )
}

// ── Vacancy card ──────────────────────────────────────────────────────────────

interface VacancyCardProps {
  vacancy:          Vacancy
  confirming:       boolean
  deleting:         boolean
  onRequestDelete:  (id: number) => void
  onConfirmDelete:  (id: number) => void
  onCancelDelete:   () => void
}

function VacancyCard({ vacancy, confirming, deleting, onRequestDelete, onConfirmDelete, onCancelDelete }: VacancyCardProps) {
  return (
    <div className={[
      'bg-white rounded-2xl border shadow-sm transition-all duration-200 overflow-hidden',
      confirming
        ? 'border-[rgba(239,68,68,0.3)] shadow-[rgba(239,68,68,0.08)] shadow-md'
        : 'border-[rgba(15,23,42,0.08)] hover:border-[rgba(59,31,168,0.2)] hover:shadow-md',
      deleting ? 'opacity-50 pointer-events-none' : '',
    ].join(' ')}>

      {/* Main card body */}
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-black text-[#0F172A] leading-tight truncate">{vacancy.title}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <DeptBadge dept={vacancy.department} />
            {/* Delete trigger */}
            {!confirming && (
              <button
                onClick={() => onRequestDelete(vacancy.id)}
                disabled={deleting}
                title="Delete vacancy"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all duration-150 flex-shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] text-[#94A3B8]">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vacancy.location}</span>
          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{vacancy.type}</span>
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{vacancy.contactEmail}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(vacancy.createdAt)}</span>
        </div>

        <p className="text-[13px] text-[#475569] leading-relaxed line-clamp-2 mb-3">{vacancy.description}</p>

        {vacancy.requirements.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {vacancy.requirements.slice(0, 3).map((req, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[11px] text-[#475569] bg-[rgba(15,23,42,0.03)] border border-[rgba(15,23,42,0.07)] rounded-lg px-2.5 py-1">
                <span className="text-[#3B1FA8] text-[9px]">✦</span>{req}
              </span>
            ))}
            {vacancy.requirements.length > 3 && (
              <span className="text-[11px] text-[#94A3B8] px-2 py-1">+{vacancy.requirements.length - 3} more</span>
            )}
          </div>
        )}
      </div>

      {/* Inline confirm-delete footer */}
      {confirming && (
        <div className="flex items-center justify-between gap-3 px-5 py-3 bg-[rgba(239,68,68,0.04)] border-t border-[rgba(239,68,68,0.12)]">
          <div className="flex items-center gap-2 min-w-0">
            <Trash2 className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
            <p className="text-[12px] font-semibold text-[#0F172A] truncate">
              Delete <span className="text-[#EF4444]">{vacancy.title}</span>? This cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onCancelDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#475569] bg-white border border-[rgba(15,23,42,0.1)] hover:border-[rgba(15,23,42,0.2)] transition-all"
            >
              <X className="w-3 h-3" />Cancel
            </button>
            <button
              onClick={() => onConfirmDelete(vacancy.id)}
              disabled={deleting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] disabled:opacity-50 transition-all"
            >
              {deleting
                ? <><Loader2 className="w-3 h-3 animate-spin" />Deleting…</>
                : <><Trash2 className="w-3 h-3" />Delete</>}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Toast notification ────────────────────────────────────────────────────────

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold animate-in slide-in-from-bottom-2">
      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
      {message}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function VacanciesPage() {
  const [payload,      setPayload]      = useState<VacancyPayload | null>(null)
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState<string | null>(null)
  const [lastFetched,  setLastFetched]  = useState<Date | null>(null)

  const [confirmingId, setConfirmingId] = useState<number | null>(null)
  const [deletingId,   setDeletingId]   = useState<number | null>(null)
  const [deleteError,  setDeleteError]  = useState<string | null>(null)
  const [toast,        setToast]        = useState<string | null>(null)

  const fetchVacancies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch('/api/dashboard/vacancies', { cache: 'no-store' })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const body = await res.json()
      if (!body.success) throw new Error(body.error ?? 'Unknown API error')
      setPayload(body.data as VacancyPayload)
      setLastFetched(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchVacancies() }, [fetchVacancies])

  // ── Delete flow ───────────────────────────────────────────────────────────
  const handleRequestDelete  = (id: number) => { setConfirmingId(id); setDeleteError(null) }
  const handleCancelDelete   = ()            => { setConfirmingId(null) }

  const handleConfirmDelete = useCallback(async (id: number) => {
    setDeletingId(id)
    setDeleteError(null)
    try {
      const res  = await fetch('/api/dashboard/vacancies', {
        method:  'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id }),
      })
      const body = await res.json()
      if (!res.ok || !body.success) throw new Error(body.error ?? `Server error ${res.status}`)

      // Optimistically remove from list
      setPayload((prev) => prev
        ? { ...prev, vacancies: prev.vacancies.filter((v) => v.id !== id), total: prev.total - 1 }
        : prev
      )
      setConfirmingId(null)
      setToast(`"${body.data.title}" deleted successfully.`)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete.')
    } finally {
      setDeletingId(null)
    }
  }, [])

  return (
    <DashboardLayout>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto space-y-5">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[rgba(59,31,168,0.08)] flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5 text-[#3B1FA8]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Careers</p>
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">Job Vacancies</h1>
            <p className="text-sm text-[#475569] mt-0.5">Active listings published on the public Careers page</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {lastFetched && !loading && (
              <span className="text-[11px] text-[#94A3B8] hidden sm:block">
                {lastFetched.toLocaleTimeString('en-ZA', { timeZone: SAST, hour: '2-digit', minute: '2-digit', hour12: false })} SAST
              </span>
            )}
            <button onClick={fetchVacancies} disabled={loading}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] disabled:opacity-40 px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.08)] bg-white hover:border-[rgba(59,31,168,0.2)] shadow-sm transition-colors">
              <RefreshCw className={['w-3.5 h-3.5', loading ? 'animate-spin' : ''].join(' ')} />
              Refresh
            </button>
            <Link href="/dashboard/vacancies/new"
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#3B1FA8] hover:bg-[#2D1580] px-4 py-2 rounded-lg shadow-md shadow-[rgba(59,31,168,0.3)] transition-all">
              <Plus className="w-3.5 h-3.5" />Post Vacancy
            </Link>
          </div>
        </div>

        {/* ── Load error ─────────────────────────────────────────────────── */}
        {error && (
          <div className="rounded-xl border border-[rgba(255,92,58,0.2)] bg-[rgba(255,92,58,0.04)] p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#FF5C3A] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0F172A]">Failed to load vacancies</p>
              <p className="text-xs text-[#475569] mt-0.5">{error}</p>
            </div>
            <button onClick={fetchVacancies} className="flex items-center gap-1.5 text-xs font-semibold text-[#3B1FA8] hover:text-[#FF5C3A] transition-colors flex-shrink-0">
              <RefreshCw className="w-3.5 h-3.5" />Retry
            </button>
          </div>
        )}

        {/* ── Delete error banner ─────────────────────────────────────────── */}
        {deleteError && (
          <div className="rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.04)] p-3 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
            <p className="text-xs text-[#0F172A] flex-1">{deleteError}</p>
            <button onClick={() => setDeleteError(null)} className="text-[#94A3B8] hover:text-[#475569]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── Count strip ─────────────────────────────────────────────────── */}
        {!loading && payload && payload.total > 0 && (
          <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
            <span className="font-bold text-[#475569]">{payload.total}</span>
            active {payload.total === 1 ? 'vacancy' : 'vacancies'} live on{' '}
            <a href="/careers" target="_blank" rel="noreferrer" className="text-[#3B1FA8] font-semibold hover:underline">/careers ↗</a>
          </div>
        )}

        {/* ── Cards ──────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {loading && Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
          {!loading && !error && payload?.total === 0 && <EmptyState />}
          {!loading && payload?.vacancies.map((v) => (
            <VacancyCard
              key={v.id}
              vacancy={v}
              confirming={confirmingId === v.id}
              deleting={deletingId === v.id}
              onRequestDelete={handleRequestDelete}
              onConfirmDelete={handleConfirmDelete}
              onCancelDelete={handleCancelDelete}
            />
          ))}
        </div>

      </div>
    </DashboardLayout>
  )
}

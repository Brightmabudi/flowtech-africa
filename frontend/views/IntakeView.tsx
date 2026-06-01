'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import DashboardLayout from '@frontend/components/DashboardLayout'
import type { IntakeSubmission, IntakePayload } from '@backend/services/intake-types'
import {
  RefreshCw,
  AlertCircle,
  Search,
  X,
  Users,
  Clock,
  CheckCircle2,
  Filter,
  ArrowUpDown,
  ClipboardList,
} from 'lucide-react'

// ── Constants ─────────────────────────────────────────────────────────────────

const SAST = 'Africa/Johannesburg'

const STATUS_CONFIG: Record<
  string,
  { bg: string; text: string; ring: string; dot: string; label: string }
> = {
  Pending: {
    bg:    'bg-[rgba(245,158,11,0.08)]',
    text:  'text-[#B45309]',
    ring:  'ring-[rgba(245,158,11,0.2)]',
    dot:   'bg-[#F59E0B]',
    label: 'Pending',
  },
  'Under Review': {
    bg:    'bg-[rgba(59,130,246,0.08)]',
    text:  'text-[#1D4ED8]',
    ring:  'ring-[rgba(59,130,246,0.2)]',
    dot:   'bg-[#3B82F6]',
    label: 'Under Review',
  },
  Processed: {
    bg:    'bg-[rgba(16,185,129,0.08)]',
    text:  'text-[#047857]',
    ring:  'ring-[rgba(16,185,129,0.2)]',
    dot:   'bg-[#10B981]',
    label: 'Processed',
  },
  Rejected: {
    bg:    'bg-[rgba(239,68,68,0.08)]',
    text:  'text-[#B91C1C]',
    ring:  'ring-[rgba(239,68,68,0.2)]',
    dot:   'bg-[#EF4444]',
    label: 'Rejected',
  },
}

const TYPE_CONFIG: Record<string, { bg: string; text: string }> = {
  'Company Registration': { bg: 'bg-[rgba(59,31,168,0.07)]',  text: 'text-[#3B1FA8]' },
  'Tax Setup':            { bg: 'bg-[rgba(245,158,11,0.07)]', text: 'text-[#B45309]' },
  'BBEE Certification':   { bg: 'bg-[rgba(16,185,129,0.07)]', text: 'text-[#047857]' },
  'Compliance Filing':    { bg: 'bg-[rgba(59,130,246,0.07)]', text: 'text-[#1D4ED8]' },
  'Business Licensing':   { bg: 'bg-[rgba(139,92,246,0.07)]', text: 'text-[#6D28D9]' },
}

const FILTER_TABS = [
  { key: null,           label: 'All',          countKey: 'total'       },
  { key: 'Pending',      label: 'Pending',       countKey: 'pending'     },
  { key: 'Under Review', label: 'Under Review',  countKey: 'underReview' },
  { key: 'Processed',    label: 'Processed',     countKey: 'processed'   },
] as const

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatZAR(cents: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style:                 'currency',
    currency:              'ZAR',
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    timeZone: SAST,
    day:      '2-digit',
    month:    'short',
    year:     'numeric',
  })
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

// Avatar background cycles through accent palette deterministically
const AVATAR_GRADIENTS = [
  'from-[#3B1FA8] to-[#6D4AE8]',
  'from-[#FF5C3A] to-[#F59E0B]',
  'from-[#10B981] to-[#3B82F6]',
  'from-[#6D28D9] to-[#3B1FA8]',
]
function avatarGradient(id: number): string {
  return AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length]
}

// ── Skeleton primitives ───────────────────────────────────────────────────────

function Sk({ className }: { className?: string }) {
  return (
    <div
      className={['rounded animate-pulse bg-[#F1F5F9]', className].join(' ')}
    />
  )
}

function TableRowSkeleton() {
  return (
    <tr className="border-b border-[rgba(15,23,42,0.05)]">
      {/* Client */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <Sk className="w-9 h-9 rounded-full flex-shrink-0" />
          <div className="space-y-1.5 flex-1 min-w-0">
            <Sk className="h-3.5 w-32" />
            <Sk className="h-3 w-44" />
          </div>
        </div>
      </td>
      {/* Tracking */}
      <td className="px-4 py-3.5 hidden sm:table-cell"><Sk className="h-6 w-28 rounded-full" /></td>
      {/* Type */}
      <td className="px-4 py-3.5 hidden md:table-cell"><Sk className="h-6 w-36 rounded-full" /></td>
      {/* Status */}
      <td className="px-4 py-3.5"><Sk className="h-6 w-24 rounded-full" /></td>
      {/* Amount */}
      <td className="px-4 py-3.5 text-right hidden lg:table-cell"><Sk className="h-4 w-20 ml-auto" /></td>
      {/* Date */}
      <td className="px-4 py-3.5 hidden xl:table-cell"><Sk className="h-3.5 w-24" /></td>
    </tr>
  )
}

// ── Badge components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? {
    bg: 'bg-[#F1F5F9]', text: 'text-[#64748B]', ring: 'ring-[#E2E8F0]', dot: 'bg-[#94A3B8]', label: status,
  }
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ring-1',
        cfg.bg, cfg.text, cfg.ring,
      ].join(' ')}
    >
      <span className={['w-1.5 h-1.5 rounded-full flex-shrink-0', cfg.dot].join(' ')} />
      {cfg.label}
    </span>
  )
}

function TypeBadge({ type }: { type: string }) {
  const cfg = TYPE_CONFIG[type] ?? { bg: 'bg-[#F1F5F9]', text: 'text-[#475569]' }
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold',
        cfg.bg, cfg.text,
      ].join(' ')}
    >
      {type}
    </span>
  )
}

function TrackingBadge({ number }: { number: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-[rgba(15,23,42,0.04)] text-[#3B1FA8] ring-1 ring-[rgba(59,31,168,0.12)] tracking-wide whitespace-nowrap">
      {number}
    </span>
  )
}

// ── Stat tab pill ─────────────────────────────────────────────────────────────

function TabPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap',
        active
          ? 'bg-[#3B1FA8] text-white shadow-md shadow-[rgba(59,31,168,0.25)]'
          : 'bg-white text-[#475569] border border-[rgba(15,23,42,0.08)] hover:border-[rgba(59,31,168,0.2)] hover:text-[#3B1FA8]',
      ].join(' ')}
    >
      {label}
      <span
        className={[
          'text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center tabular-nums',
          active ? 'bg-white/20 text-white' : 'bg-[#F1F5F9] text-[#475569]',
        ].join(' ')}
      >
        {count}
      </span>
    </button>
  )
}

// ── Error state ───────────────────────────────────────────────────────────────

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-[rgba(255,92,58,0.2)] bg-[rgba(255,92,58,0.04)] p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-[#FF5C3A] flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0F172A]">Failed to load submissions</p>
        <p className="text-xs text-[#475569] mt-0.5 font-mono">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 text-xs font-semibold text-[#3B1FA8] hover:text-[#FF5C3A] transition-colors flex-shrink-0"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </button>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <tr>
      <td colSpan={6}>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[rgba(59,31,168,0.06)] flex items-center justify-center mb-4">
            <ClipboardList className="w-6 h-6 text-[#3B1FA8]" />
          </div>
          <p className="text-sm font-semibold text-[#0F172A] mb-1">
            {filtered ? 'No matching submissions' : 'No submissions yet'}
          </p>
          <p className="text-xs text-[#94A3B8] max-w-xs">
            {filtered
              ? 'Try adjusting your search or status filter.'
              : 'Intake submissions will appear here once clients begin registering.'}
          </p>
        </div>
      </td>
    </tr>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function IntakePage() {
  const [payload,     setPayload]     = useState<IntakePayload | null>(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState<string | null>(null)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)

  // Client-side filter state (no round-trip needed for these)
  const [activeStatus, setActiveStatus] = useState<string | null>(null)
  const [searchQuery,  setSearchQuery]  = useState('')

  const fetchIntake = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/dashboard/intake', { cache: 'no-store' })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const body = await res.json()
      if (!body.success) throw new Error(body.error ?? 'Unknown API error')
      setPayload(body.data)
      setLastFetched(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchIntake() }, [fetchIntake])

  // ── Client-side filtering ─────────────────────────────────────────────────
  const filteredRows = useMemo<IntakeSubmission[]>(() => {
    if (!payload) return []
    const q = searchQuery.trim().toLowerCase()
    return payload.submissions.filter((s) => {
      const statusMatch = !activeStatus || s.status === activeStatus
      const searchMatch =
        !q ||
        s.client.name.toLowerCase().includes(q)            ||
        s.client.organizationName.toLowerCase().includes(q) ||
        s.trackingNumber.toLowerCase().includes(q)          ||
        s.type.toLowerCase().includes(q)
      return statusMatch && searchMatch
    })
  }, [payload, activeStatus, searchQuery])

  // ── Tab counts ────────────────────────────────────────────────────────────
  const tabCounts = {
    total:       payload?.total       ?? 0,
    pending:     payload?.counts.pending     ?? 0,
    underReview: payload?.counts.underReview ?? 0,
    processed:   payload?.counts.processed   ?? 0,
  }

  const isFiltered = !!activeStatus || !!searchQuery.trim()

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-5">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[rgba(59,31,168,0.08)] flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-[#3B1FA8]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                Client Intake
              </p>
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">
              Intake Submissions
            </h1>
            <p className="text-sm text-[#475569] mt-0.5">
              All client registrations and their associated service requests
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {lastFetched && !loading && (
              <span className="text-[11px] text-[#94A3B8] hidden sm:block">
                {lastFetched.toLocaleTimeString('en-ZA', {
                  timeZone: SAST, hour: '2-digit', minute: '2-digit', hour12: false,
                })} SAST
              </span>
            )}
            <button
              onClick={fetchIntake}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] transition-colors disabled:opacity-40 px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.08)] bg-white hover:border-[rgba(59,31,168,0.2)] shadow-sm"
            >
              <RefreshCw className={['w-3.5 h-3.5', loading ? 'animate-spin' : ''].join(' ')} />
              Refresh
            </button>
          </div>
        </div>

        {/* ── Error banner ─────────────────────────────────────────────────── */}
        {error && <ErrorBanner message={error} onRetry={fetchIntake} />}

        {/* ── Toolbar: tabs + search ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 flex-1">
            <Filter className="w-3.5 h-3.5 text-[#CBD5E1] flex-shrink-0" />
            {FILTER_TABS.map((tab) => (
              <TabPill
                key={tab.label}
                label={tab.label}
                count={tabCounts[tab.countKey as keyof typeof tabCounts]}
                active={activeStatus === tab.key}
                onClick={() => setActiveStatus(tab.key)}
              />
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0 w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              placeholder="Search client or tracking…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-[rgba(15,23,42,0.08)] bg-white text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[rgba(59,31,168,0.15)] focus:border-[rgba(59,31,168,0.3)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Data table ───────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white shadow-sm overflow-hidden">

          {/* Result count bar */}
          {!loading && payload && (
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(15,23,42,0.05)] bg-[#FAFAFA]">
              <span className="text-[11px] text-[#94A3B8]">
                Showing <span className="font-bold text-[#475569]">{filteredRows.length}</span>
                {filteredRows.length !== payload.total && (
                  <> of <span className="font-bold text-[#475569]">{payload.total}</span></>
                )}{' '}
                {filteredRows.length === 1 ? 'submission' : 'submissions'}
              </span>
              {isFiltered && (
                <button
                  onClick={() => { setActiveStatus(null); setSearchQuery('') }}
                  className="text-[11px] font-semibold text-[#FF5C3A] hover:text-[#3B1FA8] transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">

              {/* Table head */}
              <thead>
                <tr className="border-b border-[rgba(15,23,42,0.08)] bg-[#FAFAFA]">
                  {[
                    { label: 'Client',          cls: 'w-64'              },
                    { label: 'Tracking #',      cls: 'w-36 hidden sm:table-cell' },
                    { label: 'Request Type',    cls: 'w-44 hidden md:table-cell' },
                    { label: 'Status',          cls: 'w-32'              },
                    { label: 'Amount (ZAR)',    cls: 'w-32 text-right hidden lg:table-cell' },
                    { label: 'Submitted',       cls: 'w-28 hidden xl:table-cell' },
                  ].map(({ label, cls }) => (
                    <th
                      key={label}
                      className={[
                        'px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]',
                        cls,
                      ].join(' ')}
                    >
                      <span className="flex items-center gap-1">
                        {label}
                        {(label === 'Client' || label === 'Submitted') && (
                          <ArrowUpDown className="w-3 h-3 opacity-40" />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table body */}
              <tbody className="divide-y divide-[rgba(15,23,42,0.05)]">

                {/* Loading skeletons */}
                {loading && Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}

                {/* Empty state */}
                {!loading && !error && filteredRows.length === 0 && (
                  <EmptyState filtered={isFiltered} />
                )}

                {/* Data rows */}
                {!loading && filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="group hover:bg-[#FAFBFF] transition-colors duration-150"
                  >
                    {/* Client */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={[
                            'w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 text-white text-[11px] font-black shadow-sm',
                            avatarGradient(row.client.id),
                          ].join(' ')}
                        >
                          {getInitials(row.client.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0F172A] truncate leading-tight">
                            {row.client.name}
                          </p>
                          <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">
                            {row.client.organizationName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Tracking */}
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <TrackingBadge number={row.trackingNumber} />
                    </td>

                    {/* Request Type */}
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <TypeBadge type={row.type} />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <StatusBadge status={row.status} />
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3.5 text-right hidden lg:table-cell">
                      {row.billing ? (
                        <div>
                          <p className="text-[13px] font-bold text-[#0F172A] tabular-nums">
                            {formatZAR(row.billing.amountCents)}
                          </p>
                          <p className="text-[10px] text-[#94A3B8] mt-0.5">
                            {row.billing.invoiceStatus}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#CBD5E1]">—</span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 hidden xl:table-cell">
                      <p className="text-[12px] text-[#475569] whitespace-nowrap">
                        {formatDate(row.submittedAt)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {!loading && payload && filteredRows.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(15,23,42,0.06)] bg-[#FAFAFA]">
              <div className="flex items-center gap-4 text-[11px] text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {payload.counts.pending} pending
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                  {payload.counts.processed} processed
                </span>
              </div>
              <span className="text-[11px] text-[#CBD5E1]">
                {filteredRows.length} record{filteredRows.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}

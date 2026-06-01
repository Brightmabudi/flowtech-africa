'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import DashboardLayout from '@frontend/components/DashboardLayout'
import type { BillingLedgerEntry, BillingPayload } from '@backend/services/billing-types'
import {
  RefreshCw,
  AlertCircle,
  Search,
  X,
  Receipt,
  TrendingUp,
  CircleDollarSign,
  FileText,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Clock,
} from 'lucide-react'

// ── Constants ─────────────────────────────────────────────────────────────────

const SAST = 'Africa/Johannesburg'

const INVOICE_STATUS_CONFIG: Record<
  string,
  { bg: string; text: string; ring: string; dot: string; icon: typeof CheckCircle2 }
> = {
  Paid: {
    bg:   'bg-[rgba(16,185,129,0.08)]',
    text: 'text-[#047857]',
    ring: 'ring-[rgba(16,185,129,0.2)]',
    dot:  'bg-[#10B981]',
    icon: CheckCircle2,
  },
  Issued: {
    bg:   'bg-[rgba(59,130,246,0.08)]',
    text: 'text-[#1D4ED8]',
    ring: 'ring-[rgba(59,130,246,0.2)]',
    dot:  'bg-[#3B82F6]',
    icon: FileText,
  },
  Draft: {
    bg:   'bg-[rgba(245,158,11,0.08)]',
    text: 'text-[#B45309]',
    ring: 'ring-[rgba(245,158,11,0.2)]',
    dot:  'bg-[#F59E0B]',
    icon: Clock,
  },
  Overdue: {
    bg:   'bg-[rgba(239,68,68,0.08)]',
    text: 'text-[#B91C1C]',
    ring: 'ring-[rgba(239,68,68,0.2)]',
    dot:  'bg-[#EF4444]',
    icon: AlertCircle,
  },
  Cancelled: {
    bg:   'bg-[rgba(100,116,139,0.08)]',
    text: 'text-[#475569]',
    ring: 'ring-[rgba(100,116,139,0.15)]',
    dot:  'bg-[#94A3B8]',
    icon: X,
  },
}

const STATUS_FILTER_TABS = [
  { key: null,        label: 'All',       countKey: 'total'     },
  { key: 'Paid',      label: 'Paid',      countKey: 'paid'      },
  { key: 'Issued',    label: 'Issued',    countKey: 'issued'    },
  { key: 'Draft',     label: 'Draft',     countKey: 'draft'     },
  { key: 'Overdue',   label: 'Overdue',   countKey: 'overdue'   },
] as const

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatZAR(cents: number, compact = false): string {
  if (compact && cents >= 100_000_00) {
    return new Intl.NumberFormat('en-ZA', {
      style:                 'currency',
      currency:              'ZAR',
      notation:              'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(cents / 100)
  }
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
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

const AVATAR_GRADIENTS = [
  'from-[#3B1FA8] to-[#6D4AE8]',
  'from-[#FF5C3A] to-[#F59E0B]',
  'from-[#10B981] to-[#3B82F6]',
  'from-[#6D28D9] to-[#3B1FA8]',
]
const avatarGradient = (id: number) => AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length]

// ── Skeleton ──────────────────────────────────────────────────────────────────

function Sk({ className }: { className?: string }) {
  return <div className={['rounded animate-pulse bg-[#F1F5F9]', className].join(' ')} />
}

function KpiSkeleton() {
  return (
    <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-sm flex items-center gap-4">
      <Sk className="w-11 h-11 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Sk className="h-3 w-24" />
        <Sk className="h-6 w-32" />
        <Sk className="h-3 w-16" />
      </div>
    </div>
  )
}

function LedgerRowSkeleton() {
  return (
    <tr className="border-b border-[rgba(15,23,42,0.05)]">
      <td className="px-4 py-4">
        <Sk className="h-5 w-28 rounded-full" />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Sk className="w-9 h-9 rounded-full flex-shrink-0" />
          <div className="space-y-1.5 flex-1 min-w-0">
            <Sk className="h-3.5 w-28" />
            <Sk className="h-3 w-40" />
          </div>
        </div>
      </td>
      <td className="px-4 py-4 hidden md:table-cell"><Sk className="h-3.5 w-20" /></td>
      <td className="px-4 py-4"><Sk className="h-6 w-20 rounded-full" /></td>
      <td className="px-4 py-4 text-right hidden sm:table-cell">
        <Sk className="h-4 w-24 ml-auto" />
      </td>
      <td className="px-4 py-4 hidden lg:table-cell"><Sk className="h-3.5 w-28 rounded-full" /></td>
    </tr>
  )
}

// ── KPI mini-badge ────────────────────────────────────────────────────────────

interface KpiCardProps {
  icon:          React.ComponentType<{ className?: string }>
  label:         string
  value:         string
  sub:           string
  iconBg:        string
  iconColor:     string
  accentBorder:  string
}

function KpiCard({ icon: Icon, label, value, sub, iconBg, iconColor, accentBorder }: KpiCardProps) {
  return (
    <div className={['relative rounded-2xl border bg-white p-5 shadow-sm overflow-hidden border-[rgba(15,23,42,0.08)]'].join(' ')}>
      <div className={['absolute inset-x-0 top-0 h-0.5', accentBorder].join(' ')} />
      <div className="flex items-start gap-4">
        <div className={['w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', iconBg].join(' ')}>
          <Icon className={['w-5 h-5', iconColor].join(' ')} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1">{label}</p>
          <p className="text-2xl font-black text-[#0F172A] leading-none tabular-nums truncate">{value}</p>
          <p className="text-[11px] text-[#94A3B8] mt-1.5">{sub}</p>
        </div>
      </div>
    </div>
  )
}

// ── Invoice status badge ──────────────────────────────────────────────────────

function InvoiceBadge({ status }: { status: string }) {
  const cfg = INVOICE_STATUS_CONFIG[status] ?? {
    bg: 'bg-[#F1F5F9]', text: 'text-[#64748B]', ring: 'ring-[#E2E8F0]',
    dot: 'bg-[#94A3B8]', icon: FileText,
  }
  const Icon = cfg.icon
  return (
    <span className={[
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ring-1 whitespace-nowrap',
      cfg.bg, cfg.text, cfg.ring,
    ].join(' ')}>
      <Icon className="w-3 h-3 flex-shrink-0" />
      {status}
    </span>
  )
}

// ── Tab pill ──────────────────────────────────────────────────────────────────

function TabPill({ label, count, active, onClick }: {
  label: string; count: number; active: boolean; onClick: () => void
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
      <span className={[
        'text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center tabular-nums',
        active ? 'bg-white/20 text-white' : 'bg-[#F1F5F9] text-[#475569]',
      ].join(' ')}>
        {count}
      </span>
    </button>
  )
}

// ── Error banner ──────────────────────────────────────────────────────────────

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-[rgba(255,92,58,0.2)] bg-[rgba(255,92,58,0.04)] p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-[#FF5C3A] flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0F172A]">Failed to load billing records</p>
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
            <Receipt className="w-6 h-6 text-[#3B1FA8]" />
          </div>
          <p className="text-sm font-semibold text-[#0F172A] mb-1">
            {filtered ? 'No matching invoices' : 'No billing records yet'}
          </p>
          <p className="text-xs text-[#94A3B8] max-w-xs">
            {filtered
              ? 'Try adjusting your search term or status filter.'
              : 'Billing records will appear here once invoices are generated.'}
          </p>
        </div>
      </td>
    </tr>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function BillingPage() {
  const [payload,     setPayload]     = useState<BillingPayload | null>(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState<string | null>(null)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)

  const [activeStatus, setActiveStatus] = useState<string | null>(null)
  const [searchQuery,  setSearchQuery]  = useState('')

  const fetchBilling = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/dashboard/billing', { cache: 'no-store' })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const body = await res.json()
      if (!body.success) throw new Error(body.error ?? 'Unknown API error')
      setPayload(body.data as BillingPayload)
      setLastFetched(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBilling() }, [fetchBilling])

  // ── Client-side filtering via useMemo ─────────────────────────────────────
  const filteredLedger = useMemo<BillingLedgerEntry[]>(() => {
    if (!payload) return []
    const q = searchQuery.trim().toLowerCase()
    return payload.ledger.filter((entry) => {
      const statusMatch = !activeStatus || entry.invoiceStatus === activeStatus
      const searchMatch =
        !q ||
        entry.client.name.toLowerCase().includes(q)            ||
        entry.client.organizationName.toLowerCase().includes(q) ||
        entry.client.email.toLowerCase().includes(q)            ||
        entry.invoiceNumber.toLowerCase().includes(q)           ||
        entry.request.trackingNumber.toLowerCase().includes(q)
      return statusMatch && searchMatch
    })
  }, [payload, activeStatus, searchQuery])

  // ── Derived tab counts ────────────────────────────────────────────────────
  const tabCounts = {
    total:   payload?.total                  ?? 0,
    paid:    payload?.summary.counts.paid    ?? 0,
    issued:  payload?.summary.counts.issued  ?? 0,
    draft:   payload?.summary.counts.draft   ?? 0,
    overdue: payload?.summary.counts.overdue ?? 0,
  }

  const s           = payload?.summary
  const isFiltered  = !!activeStatus || !!searchQuery.trim()
  const currency    = s?.currency ?? 'ZAR'

  // ── Filtered-view aggregate (for footer totals) ───────────────────────────
  const filteredTotalCents = useMemo(
    () => filteredLedger.reduce((acc, e) => acc + e.amountCents, 0),
    [filteredLedger],
  )

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-5">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[rgba(16,185,129,0.08)] flex items-center justify-center">
                <Receipt className="w-3.5 h-3.5 text-[#047857]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                Finance
              </p>
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">
              Billing &amp; Invoices
            </h1>
            <p className="text-sm text-[#475569] mt-0.5">
              Full ledger of all client invoices and revenue metrics
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
              onClick={fetchBilling}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] disabled:opacity-40 px-3 py-2 rounded-lg border border-[rgba(15,23,42,0.08)] bg-white hover:border-[rgba(59,31,168,0.2)] shadow-sm transition-colors"
            >
              <RefreshCw className={['w-3.5 h-3.5', loading ? 'animate-spin' : ''].join(' ')} />
              Refresh
            </button>
          </div>
        </div>

        {/* ── Error banner ─────────────────────────────────────────────────── */}
        {error && <ErrorBanner message={error} onRetry={fetchBilling} />}

        {/* ── KPI mini-badges ───────────────────────────────────────────────── */}
        <section aria-label="Financial summary">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {loading ? (
              <><KpiSkeleton /><KpiSkeleton /><KpiSkeleton /></>
            ) : (
              <>
                <KpiCard
                  icon={TrendingUp}
                  label="Total Revenue Collected"
                  value={s ? formatZAR(s.paidCents) : '—'}
                  sub={`${s?.counts.paid ?? 0} paid invoice${(s?.counts.paid ?? 0) !== 1 ? 's' : ''}`}
                  iconBg="bg-[rgba(16,185,129,0.08)]"
                  iconColor="text-[#047857]"
                  accentBorder="bg-gradient-to-r from-[#10B981] to-[#3B82F6]"
                />
                <KpiCard
                  icon={CircleDollarSign}
                  label="Total Revenue Outstanding"
                  value={s ? formatZAR(s.outstandingCents) : '—'}
                  sub={`${(s?.counts.issued ?? 0) + (s?.counts.overdue ?? 0)} invoice${((s?.counts.issued ?? 0) + (s?.counts.overdue ?? 0)) !== 1 ? 's' : ''} awaiting payment`}
                  iconBg="bg-[rgba(255,92,58,0.08)]"
                  iconColor="text-[#FF5C3A]"
                  accentBorder="bg-gradient-to-r from-[#FF5C3A] to-[#F59E0B]"
                />
                <KpiCard
                  icon={FileText}
                  label="Invoice Count"
                  value={String(s?.invoiceCount ?? 0)}
                  sub={`${currency} ${formatZAR(s?.totalBilledCents ?? 0)} total billed`}
                  iconBg="bg-[rgba(59,31,168,0.08)]"
                  iconColor="text-[#3B1FA8]"
                  accentBorder="bg-gradient-to-r from-[#3B1FA8] to-[#6D4AE8]"
                />
              </>
            )}
          </div>
        </section>

        {/* ── Toolbar: tabs + search ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 flex-1">
            <Filter className="w-3.5 h-3.5 text-[#CBD5E1] flex-shrink-0" />
            {STATUS_FILTER_TABS.map((tab) => (
              <TabPill
                key={tab.label}
                label={tab.label}
                count={tabCounts[tab.countKey as keyof typeof tabCounts]}
                active={activeStatus === tab.key}
                onClick={() => setActiveStatus(tab.key)}
              />
            ))}
          </div>

          <div className="relative flex-shrink-0 w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              placeholder="Search client or invoice…"
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

        {/* ── Ledger table ──────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white shadow-sm overflow-hidden">

          {/* Result count bar */}
          {!loading && payload && (
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(15,23,42,0.05)] bg-[#FAFAFA]">
              <span className="text-[11px] text-[#94A3B8]">
                Showing{' '}
                <span className="font-bold text-[#475569]">{filteredLedger.length}</span>
                {filteredLedger.length !== payload.total && (
                  <> of <span className="font-bold text-[#475569]">{payload.total}</span></>
                )}{' '}
                {filteredLedger.length === 1 ? 'invoice' : 'invoices'}
                {isFiltered && filteredLedger.length > 0 && (
                  <span className="ml-1.5 text-[#3B1FA8] font-semibold">
                    · {formatZAR(filteredTotalCents)} total
                  </span>
                )}
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
              <thead>
                <tr className="border-b border-[rgba(15,23,42,0.08)] bg-[#FAFAFA]">
                  {[
                    { label: 'Invoice #',         cls: 'w-36'                       },
                    { label: 'Client',             cls: 'w-60'                       },
                    { label: 'Issue Date',         cls: 'w-32 hidden md:table-cell'  },
                    { label: 'Status',             cls: 'w-32'                       },
                    { label: 'Amount (ZAR)',       cls: 'w-36 text-right hidden sm:table-cell' },
                    { label: 'Request Ref',        cls: 'w-36 hidden lg:table-cell'  },
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
                        {(label === 'Invoice #' || label === 'Issue Date' || label === 'Amount (ZAR)') && (
                          <ArrowUpDown className="w-3 h-3 opacity-30" />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[rgba(15,23,42,0.05)]">

                {/* Loading skeletons */}
                {loading && Array.from({ length: 5 }).map((_, i) => (
                  <LedgerRowSkeleton key={i} />
                ))}

                {/* Empty state */}
                {!loading && !error && filteredLedger.length === 0 && (
                  <EmptyState filtered={isFiltered} />
                )}

                {/* Data rows */}
                {!loading && filteredLedger.map((entry) => (
                  <tr
                    key={entry.id}
                    className="group hover:bg-[#FAFBFF] transition-colors duration-150"
                  >
                    {/* Invoice number */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold text-[#3B1FA8] bg-[rgba(59,31,168,0.05)] px-2.5 py-1 rounded-lg ring-1 ring-[rgba(59,31,168,0.1)] whitespace-nowrap">
                        <CircleDollarSign className="w-3 h-3 opacity-60" />
                        {entry.invoiceNumber}
                      </span>
                    </td>

                    {/* Client */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={[
                          'w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 text-white text-[11px] font-black shadow-sm',
                          avatarGradient(entry.client.id),
                        ].join(' ')}>
                          {getInitials(entry.client.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0F172A] truncate leading-tight">
                            {entry.client.name}
                          </p>
                          <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">
                            {entry.client.organizationName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Issue Date */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <p className="text-[12px] text-[#475569] whitespace-nowrap">
                        {formatDate(entry.issuedAt)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <InvoiceBadge status={entry.invoiceStatus} />
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4 text-right hidden sm:table-cell">
                      <p className="text-[13px] font-black text-[#0F172A] tabular-nums whitespace-nowrap">
                        {formatZAR(entry.amountCents)}
                      </p>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">{entry.currency}</p>
                    </td>

                    {/* Request ref */}
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="inline-flex items-center font-mono text-[10px] font-semibold text-[#475569] bg-[rgba(15,23,42,0.04)] px-2 py-1 rounded ring-1 ring-[rgba(15,23,42,0.06)] whitespace-nowrap">
                        {entry.request.trackingNumber}
                      </span>
                      <p className="text-[10px] text-[#94A3B8] mt-1 truncate max-w-[130px]">
                        {entry.request.type}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {!loading && payload && filteredLedger.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-3 border-t border-[rgba(15,23,42,0.06)] bg-[#FAFAFA]">
              <div className="flex items-center gap-4 text-[11px] text-[#94A3B8] flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  {s?.counts.paid ?? 0} paid
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  {s?.counts.issued ?? 0} issued
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  {s?.counts.draft ?? 0} draft
                </span>
                {(s?.counts.overdue ?? 0) > 0 && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    {s?.counts.overdue} overdue
                  </span>
                )}
              </div>
              <p className="text-[11px] font-bold text-[#0F172A] tabular-nums">
                {isFiltered
                  ? `${formatZAR(filteredTotalCents)} shown`
                  : `${formatZAR(s?.totalBilledCents ?? 0)} total`
                }
              </p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}

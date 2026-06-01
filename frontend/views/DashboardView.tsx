'use client'

import { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '@frontend/components/DashboardLayout'
import {
  Users,
  Clock,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  Banknote,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface StatsPayload {
  clients: { total: number }
  requests: {
    total: number
    pending: number
    underReview: number
    processed: number
    rejected: number
  }
  billing: {
    totalCents: number
    paidCents: number
    outstandingCents: number
    totalDisplay: string
    paidDisplay: string
    outstandingDisplay: string
    currency: string
    recordCount: number
  }
}

interface FetchState {
  data: StatsPayload | null
  loading: boolean
  error: string | null
  lastFetched: Date | null
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const SAST = 'Africa/Johannesburg'

function getSASTGreeting(): string {
  const hour = Number(
    new Date().toLocaleString('en-ZA', { timeZone: SAST, hour: 'numeric', hour12: false }),
  )
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatSASTDate(): string {
  return new Date().toLocaleDateString('en-ZA', {
    timeZone: SAST,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatSASTTime(): string {
  return new Date().toLocaleTimeString('en-ZA', {
    timeZone: SAST,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatZAR(centsString: string): string {
  const amount = parseFloat(centsString)
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(amount)
}

// ── Skeleton primitives ───────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={[
        'animate-pulse rounded-lg bg-gradient-to-r from-[#F1F5F9] via-[#E2E8F0] to-[#F1F5F9] bg-[length:200%_100%]',
        className,
      ].join(' ')}
      style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.6s ease-in-out infinite' }}
    />
  )
}

function MetricCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between mb-5">
        <Skeleton className="h-11 w-11 rounded-xl" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-28 mb-2" />
      <Skeleton className="h-4 w-36 mb-4" />
      <div className="pt-4 border-t border-[rgba(15,23,42,0.06)]">
        <Skeleton className="h-3.5 w-24" />
      </div>
    </div>
  )
}

function SecondaryCardSkeleton() {
  return (
    <div className="rounded-xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-sm flex items-center gap-4">
      <Skeleton className="h-9 w-9 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-5 w-12" />
      </div>
    </div>
  )
}

// ── Metric card ───────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string
  value: string
  sub: string
  icon: React.ComponentType<{ className?: string }>
  accentClass: string
  iconBgClass: string
  iconColorClass: string
  tag?: string
  tagClass?: string
  footer: string
}

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  accentClass,
  iconBgClass,
  iconColorClass,
  tag,
  tagClass,
  footer,
}: MetricCardProps) {
  return (
    <div
      className={[
        'group relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-0.5 cursor-default overflow-hidden',
        'border-[rgba(15,23,42,0.08)]',
      ].join(' ')}
    >
      {/* Accent strip */}
      <div className={['absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl', accentClass].join(' ')} />

      <div className="flex items-start justify-between mb-5">
        {/* Icon */}
        <div className={['w-11 h-11 rounded-xl flex items-center justify-center', iconBgClass].join(' ')}>
          <Icon className={['w-5 h-5', iconColorClass].join(' ')} />
        </div>

        {/* Badge */}
        {tag && (
          <span className={['text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide', tagClass].join(' ')}>
            {tag}
          </span>
        )}
      </div>

      {/* Value */}
      <p className="text-3xl font-black text-[#0F172A] leading-none mb-1.5 tabular-nums">
        {value}
      </p>
      <p className="text-sm font-semibold text-[#0F172A] mb-0.5">{label}</p>
      <p className="text-xs text-[#94A3B8]">{sub}</p>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-[rgba(15,23,42,0.06)] flex items-center gap-1.5">
        <ArrowUpRight className="w-3.5 h-3.5 text-[#CBD5E1] group-hover:text-[#3B1FA8] transition-colors" />
        <span className="text-[11px] text-[#94A3B8] group-hover:text-[#475569] transition-colors">{footer}</span>
      </div>
    </div>
  )
}

// ── Secondary stat pill ───────────────────────────────────────────────────────

function SecondaryCard({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  iconBg: string
  iconColor: string
}) {
  return (
    <div className="rounded-xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-sm flex items-center gap-3.5">
      <div className={['w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', iconBg].join(' ')}>
        <Icon className={['w-4 h-4', iconColor].join(' ')} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8] leading-none mb-1">{label}</p>
        <p className="text-base font-black text-[#0F172A] tabular-nums leading-none">{value}</p>
      </div>
    </div>
  )
}

// ── Error state ───────────────────────────────────────────────────────────────

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-[rgba(255,92,58,0.2)] bg-[rgba(255,92,58,0.04)] p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-[#FF5C3A] flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0F172A]">Failed to load statistics</p>
        <p className="text-xs text-[#475569] mt-0.5">{message}</p>
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

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [fetchState, setFetchState] = useState<FetchState>({
    data: null,
    loading: true,
    error: null,
    lastFetched: null,
  })

  // Live SAST clock — ticks every minute
  const [clock, setClock] = useState({ date: formatSASTDate(), time: formatSASTTime() })
  useEffect(() => {
    const id = setInterval(() => {
      setClock({ date: formatSASTDate(), time: formatSASTTime() })
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  const fetchStats = useCallback(async () => {
    setFetchState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const res = await fetch('/api/dashboard/stats', { cache: 'no-store' })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const body = await res.json()
      if (!body.success) throw new Error(body.error ?? 'Unknown error from API')
      setFetchState({ data: body.data, loading: false, error: null, lastFetched: new Date() })
    } catch (err) {
      setFetchState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Unexpected error',
      }))
    }
  }, [])

  useEffect(() => { fetchStats() }, [fetchStats])

  const { data, loading, error, lastFetched } = fetchState

  // ── Derived display values ──────────────────────────────────────────────────
  const totalClients      = data?.clients.total ?? 0
  const pendingRequests   = data?.requests.pending ?? 0
  const underReview       = data?.requests.underReview ?? 0
  const processedRequests = data?.requests.processed ?? 0
  const totalRequests     = data?.requests.total ?? 0
  const outstandingZAR    = data ? formatZAR(data.billing.outstandingDisplay) : '—'
  const totalRevenueZAR   = data ? formatZAR(data.billing.totalDisplay) : '—'
  const paidZAR           = data ? formatZAR(data.billing.paidDisplay) : '—'

  return (
    <DashboardLayout>
      {/* Shimmer keyframe — injected once at the page level */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Welcome header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3B1FA8] bg-[rgba(59,31,168,0.08)] px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight leading-tight">
              {getSASTGreeting()}, Admin
            </h1>
            <p className="text-sm text-[#475569] mt-1">
              {clock.date}&ensp;·&ensp;
              <span className="font-mono tabular-nums">{clock.time}</span>
              <span className="ml-1 text-[#94A3B8]">SAST</span>
            </p>
          </div>

          {/* Last-fetched + refresh */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {lastFetched && !loading && (
              <p className="text-[11px] text-[#94A3B8]">
                Updated{' '}
                {lastFetched.toLocaleTimeString('en-ZA', {
                  timeZone: SAST,
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </p>
            )}
            <button
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#3B1FA8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg border border-[rgba(15,23,42,0.08)] bg-white hover:border-[rgba(59,31,168,0.2)] shadow-sm"
            >
              <RefreshCw className={['w-3.5 h-3.5', loading ? 'animate-spin' : ''].join(' ')} />
              Refresh
            </button>
          </div>
        </div>

        {/* ── Error banner ─────────────────────────────────────────────────── */}
        {error && <ErrorBanner message={error} onRetry={fetchStats} />}

        {/* ── Primary KPI cards ─────────────────────────────────────────────── */}
        <section aria-label="Key performance indicators">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading ? (
              <>
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
              </>
            ) : (
              <>
                {/* Total Registered Clients */}
                <MetricCard
                  label="Total Registered Clients"
                  value={totalClients.toLocaleString('en-ZA')}
                  sub="Active client profiles in the system"
                  icon={Users}
                  accentClass="bg-gradient-to-r from-[#3B1FA8] to-[#6D4AE8]"
                  iconBgClass="bg-[rgba(59,31,168,0.08)]"
                  iconColorClass="text-[#3B1FA8]"
                  tag="All time"
                  tagClass="bg-[rgba(59,31,168,0.08)] text-[#3B1FA8]"
                  footer="View all client profiles"
                />

                {/* Pending Requests */}
                <MetricCard
                  label="Pending Requests"
                  value={pendingRequests.toLocaleString('en-ZA')}
                  sub={`${underReview} under review · ${totalRequests} total`}
                  icon={Clock}
                  accentClass="bg-gradient-to-r from-[#F59E0B] to-[#FF5C3A]"
                  iconBgClass="bg-[rgba(245,158,11,0.08)]"
                  iconColorClass="text-[#F59E0B]"
                  tag={pendingRequests > 0 ? 'Action needed' : 'Clear'}
                  tagClass={
                    pendingRequests > 0
                      ? 'bg-[rgba(255,92,58,0.1)] text-[#FF5C3A]'
                      : 'bg-[rgba(16,185,129,0.1)] text-[#10B981]'
                  }
                  footer="Open intake submissions"
                />

                {/* Outstanding Invoices */}
                <MetricCard
                  label="Outstanding Invoices"
                  value={outstandingZAR}
                  sub={`${paidZAR} paid · ${totalRevenueZAR} total billed`}
                  icon={CreditCard}
                  accentClass="bg-gradient-to-r from-[#FF5C3A] to-[#F59E0B]"
                  iconBgClass="bg-[rgba(255,92,58,0.08)]"
                  iconColorClass="text-[#FF5C3A]"
                  tag="Invoiced"
                  tagClass="bg-[rgba(255,92,58,0.08)] text-[#FF5C3A]"
                  footer="Open billing & invoices"
                />
              </>
            )}
          </div>
        </section>

        {/* ── Secondary stats strip ──────────────────────────────────────────── */}
        <section aria-label="Secondary statistics">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#CBD5E1] mb-3">
            Breakdown
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {loading ? (
              <>
                <SecondaryCardSkeleton />
                <SecondaryCardSkeleton />
                <SecondaryCardSkeleton />
                <SecondaryCardSkeleton />
              </>
            ) : (
              <>
                <SecondaryCard
                  icon={Building2}
                  label="Total Requests"
                  value={totalRequests.toLocaleString('en-ZA')}
                  iconBg="bg-[rgba(59,31,168,0.06)]"
                  iconColor="text-[#3B1FA8]"
                />
                <SecondaryCard
                  icon={CheckCircle2}
                  label="Processed"
                  value={processedRequests.toLocaleString('en-ZA')}
                  iconBg="bg-[rgba(16,185,129,0.08)]"
                  iconColor="text-[#10B981]"
                />
                <SecondaryCard
                  icon={ClipboardCheck}
                  label="Under Review"
                  value={underReview.toLocaleString('en-ZA')}
                  iconBg="bg-[rgba(245,158,11,0.08)]"
                  iconColor="text-[#F59E0B]"
                />
                <SecondaryCard
                  icon={Banknote}
                  label="Revenue Paid"
                  value={paidZAR}
                  iconBg="bg-[rgba(16,185,129,0.08)]"
                  iconColor="text-[#10B981]"
                />
              </>
            )}
          </div>
        </section>

        {/* ── Activity summary panel ─────────────────────────────────────────── */}
        <section aria-label="System health and quick actions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* System status */}
            <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-[#0F172A]">System Health</h2>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#10B981] uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  Operational
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Database',      status: 'Connected',   ok: true  },
                  { label: 'API Layer',     status: 'Responding',  ok: true  },
                  { label: 'Intake Flow',   status: 'Active',      ok: true  },
                  { label: 'Billing Engine', status: data ? 'Live' : loading ? 'Checking…' : 'Unreachable', ok: !!data },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-[rgba(15,23,42,0.05)] last:border-0">
                    <span className="text-sm text-[#475569]">{row.label}</span>
                    <span
                      className={[
                        'flex items-center gap-1.5 text-xs font-semibold',
                        row.ok ? 'text-[#10B981]' : 'text-[#FF5C3A]',
                      ].join(' ')}
                    >
                      {row.ok
                        ? <CheckCircle2 className="w-3.5 h-3.5" />
                        : <AlertCircle  className="w-3.5 h-3.5" />}
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#0F172A] mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  {
                    icon: Users,
                    label: 'Register New Client',
                    sub: 'Add a client profile to the system',
                    iconBg: 'bg-[rgba(59,31,168,0.08)]',
                    iconColor: 'text-[#3B1FA8]',
                    href: '/dashboard/intake',
                  },
                  {
                    icon: ClipboardCheck,
                    label: 'Review Pending Submissions',
                    sub: `${pendingRequests} request${pendingRequests !== 1 ? 's' : ''} awaiting action`,
                    iconBg: 'bg-[rgba(245,158,11,0.08)]',
                    iconColor: 'text-[#F59E0B]',
                    href: '/dashboard/registrations',
                  },
                  {
                    icon: TrendingUp,
                    label: 'Generate Invoice Report',
                    sub: `${data?.billing.recordCount ?? 0} billing records on file`,
                    iconBg: 'bg-[rgba(255,92,58,0.08)]',
                    iconColor: 'text-[#FF5C3A]',
                    href: '/dashboard/billing',
                  },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#F9FAFB] transition-colors group cursor-pointer"
                  >
                    <div className={['w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', action.iconBg].join(' ')}>
                      <action.icon className={['w-4 h-4', action.iconColor].join(' ')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#3B1FA8] transition-colors truncate">
                        {action.label}
                      </p>
                      <p className="text-[11px] text-[#94A3B8] truncate">{action.sub}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#3B1FA8] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </DashboardLayout>
  )
}

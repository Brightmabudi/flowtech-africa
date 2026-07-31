'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Mail,
  Menu,
  X,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  Loader2,
  TrendingUp,
} from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

// ── Navigation definition ─────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Enquiries', href: '/dashboard/enquiries', icon: Mail },
  { label: 'Job Vacancies', href: '/dashboard/vacancies', icon: Briefcase },
  { label: 'Applications', href: '/dashboard/applications', icon: Users },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SidebarNavItem({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={[
        'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
        active
          ? 'bg-[#3B1FA8] text-white shadow-md shadow-[rgba(59,31,168,0.35)]'
          : 'text-[#475569] hover:bg-[#F9FAFB] hover:text-[#0F172A]',
      ].join(' ')}
    >
      <Icon
        className={[
          'w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110',
          active ? 'text-white' : 'text-[#94A3B8]',
        ].join(' ')}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge != null && item.badge > 0 && (
        <span
          className={[
            'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
            active ? 'bg-white/20 text-white' : 'bg-[#FF5C3A]/10 text-[#FF5C3A]',
          ].join(' ')}
        >
          {item.badge}
        </span>
      )}
      {active && <ChevronRight className="w-3 h-3 text-white/60 flex-shrink-0" />}
    </Link>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false) }, [pathname])

  const currentPage = NAV_ITEMS.find((n) => n.href === pathname)?.label ?? 'Dashboard'

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      router.push('/login')
    }
  }

  // ── Sidebar content (shared between mobile overlay and desktop) ─────────────
  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex h-full flex-col">

      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B1FA8] to-[#FF5C3A] flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[13px] font-black text-[#0F172A] leading-none">FlowTech</p>
            <p className="text-[10px] text-[#94A3B8] mt-0.5 leading-none">Admin Portal</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-[#F9FAFB] text-[#94A3B8] hover:text-[#0F172A] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem key={item.href} item={item} active={pathname === item.href} onClick={onClose} />
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-[rgba(15,23,42,0.06)] px-3 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B1FA8] to-[#FF5C3A] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[11px] font-black">FT</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-[#0F172A] truncate">Admin User</p>
          <p className="text-[10px] text-[#94A3B8] truncate">admin@flowtech.africa</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded-lg hover:bg-[#F9FAFB] text-[#94A3B8] hover:text-[#0F172A] transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="p-1.5 rounded-lg hover:bg-[rgba(255,92,58,0.08)] text-[#94A3B8] hover:text-[#FF5C3A] transition-colors disabled:opacity-50"
            aria-label="Sign out"
          >
            {loggingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">

      {/* ── Desktop sidebar ────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col bg-white border-r border-[rgba(15,23,42,0.08)] shadow-sm">
        <SidebarContent />
      </aside>

      {/* ── Mobile sidebar overlay ─────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col">
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Main area ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">

        {/* Top header */}
        <header className="flex-shrink-0 h-14 bg-white border-b border-[rgba(15,23,42,0.08)] flex items-center px-4 gap-4 shadow-sm">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F9FAFB] text-[#475569] hover:text-[#0F172A] transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#94A3B8] hidden sm:inline">Dashboard</span>
            {pathname !== '/dashboard' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] hidden sm:block" />
                <span className="font-semibold text-[#0F172A]">{currentPage}</span>
              </>
            )}
            {pathname === '/dashboard' && (
              <span className="font-semibold text-[#0F172A] sm:hidden">Overview</span>
            )}
          </div>

          <div className="flex-1" />

          {/* Header actions */}
          <div className="flex items-center gap-1.5">
            <button
              className="relative p-2 rounded-lg hover:bg-[#F9FAFB] text-[#475569] hover:text-[#0F172A] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {/* Notification dot */}
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5C3A]" />
            </button>

            <button
              className="p-2 rounded-lg hover:bg-[#F9FAFB] text-[#475569] hover:text-[#0F172A] transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-2 rounded-lg hover:bg-[rgba(255,92,58,0.08)] text-[#475569] hover:text-[#FF5C3A] transition-colors disabled:opacity-50"
              aria-label="Sign out"
            >
              {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            </button>

            <div className="w-px h-6 bg-[rgba(15,23,42,0.08)] mx-1 hidden sm:block" />

            {/* Admin name + avatar */}
            <div className="flex items-center gap-2 pl-0.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B1FA8] to-[#FF5C3A] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-black">FT</span>
              </div>
              <span className="text-[13px] font-semibold text-[#0F172A] hidden sm:inline">Admin User</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

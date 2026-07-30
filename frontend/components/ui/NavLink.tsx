import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@frontend/lib/cn'

interface NavLinkProps {
  href: string
  children: ReactNode
  variant?: 'nav' | 'footer'
  active?: boolean
  className?: string
  onClick?: () => void
}

const base = 'rounded-control transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'

export default function NavLink({ href, children, variant = 'nav', active, className, onClick }: NavLinkProps) {
  const styles = variant === 'nav'
    ? cn(base, 'px-1 py-1 text-sm font-medium', active ? 'text-brand-600' : 'text-ink-950 hover:text-brand-600')
    : cn(base, 'px-1 py-0.5 text-sm text-white/50 hover:text-white')

  if (href.startsWith('#')) {
    return <a href={href} onClick={onClick} className={cn(styles, className)}>{children}</a>
  }
  return <Link href={href} onClick={onClick} className={cn(styles, className)}>{children}</Link>
}

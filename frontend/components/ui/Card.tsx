import { type ReactNode } from 'react'
import { cn } from '@frontend/lib/cn'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'dark' | 'glass'
  hoverLift?: boolean
  topAccent?: boolean
  className?: string
  as?: 'div' | 'article'
}

const variants = {
  default: 'bg-ink-50 border border-brand-600/10',
  elevated: 'bg-white border border-brand-600/10 shadow-brand-sm',
  dark: 'bg-white/[0.03] border border-white/10',
  glass: 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-brand-sm',
}

export default function Card({ children, variant = 'default', hoverLift = true, topAccent = false, className, as = 'div' }: CardProps) {
  const Tag = as
  return (
    <Tag className={cn(
      'group relative overflow-hidden rounded-card p-7 transition-all duration-300',
      variants[variant],
      hoverLift && 'hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-brand-md',
      className,
    )}>
      {topAccent && (
        <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-accent-500 transition-transform duration-300 group-hover:scale-x-100" />
      )}
      {children}
    </Tag>
  )
}

import { type ReactNode } from 'react'
import { cn } from '@frontend/lib/cn'

interface BadgeProps {
  children: ReactNode
  color?: string
  size?: 'sm' | 'md'
  icon?: ReactNode
  className?: string
}

export default function Badge({ children, color = '#5B35D5', size = 'md', icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono font-semibold uppercase tracking-wide',
        size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-xs',
        className,
      )}
      style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}
    >
      {icon && <span aria-hidden="true" className="inline-flex">{icon}</span>}
      {children}
    </span>
  )
}

import { type ReactNode } from 'react'
import { cn } from '@frontend/lib/cn'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>
}

export function Section({
  children, id, bg = 'light', className,
}: {
  children: ReactNode
  id?: string
  bg?: 'light' | 'tint' | 'dark'
  className?: string
}) {
  const bgClass = bg === 'dark' ? 'bg-gradient-to-br from-[#08050F] to-[#1A0A38]' : bg === 'tint' ? 'bg-ink-100' : 'bg-white'
  return (
    <section id={id} className={cn('relative z-[2] px-6 py-16 sm:px-10 sm:py-20 lg:px-24 lg:py-28', bgClass, className)}>
      {children}
    </section>
  )
}

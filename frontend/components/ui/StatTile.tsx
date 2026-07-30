'use client'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@frontend/lib/cn'

interface StatTileProps {
  value: number
  suffix?: string
  label: string
  sub?: string
  icon?: ReactNode
  dark?: boolean
  className?: string
}

export default function StatTile({ value, suffix = '', label, sub, icon, dark = false, className }: StatTileProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(value); return }
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !started) setStarted(true) }, { threshold: 0.5 })
    obs.observe(node)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 25)
    return () => clearInterval(timer)
  }, [started, value])

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-start gap-3 rounded-card border p-6 transition-transform duration-300 hover:-translate-y-1',
        dark ? 'border-white/10 bg-white/[0.06] backdrop-blur-xl' : 'border-brand-600/10 bg-white shadow-brand-sm',
        className,
      )}
    >
      {icon && (
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-control', dark ? 'bg-white/10 text-white' : 'bg-brand-50 text-brand-600')} aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="bg-gradient-to-br from-brand-600 to-accent-500 bg-clip-text font-display text-[2.4rem] font-bold leading-none text-transparent">
        {count}{suffix}
      </div>
      <div>
        <div className={cn('font-display text-sm font-bold', dark ? 'text-white' : 'text-ink-950')}>{label}</div>
        {sub && <div className={cn('mt-1 text-xs', dark ? 'text-white/55' : 'text-ink-400')}>{sub}</div>}
      </div>
    </div>
  )
}

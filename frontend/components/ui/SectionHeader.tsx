'use client'
import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@frontend/lib/cn'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left', dark = false, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-12 md:mb-16', align === 'center' && 'mx-auto text-center', className)}
    >
      <span className={cn(
        'mb-4 inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em]',
        dark ? 'text-accent-400' : 'text-accent-600',
      )}>
        <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-gradient-to-r from-accent-500 to-brand-600" />
        {eyebrow}
      </span>
      <h2 className={cn(
        'font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-tight',
        dark ? 'text-white' : 'text-ink-950',
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 max-w-xl text-base leading-relaxed', dark ? 'text-white/50' : 'text-ink-500', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

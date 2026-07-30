'use client'
import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'
import { useStaggeredReveal } from '@frontend/hooks/useStaggeredReveal'
import { cn } from '@frontend/lib/cn'

export interface ServiceCardItem {
  icon: ReactNode
  color: string
  title: string
  desc: string
  tags?: string[]
  learnMoreHref?: string
}

interface ServiceCardGridProps {
  items: ServiceCardItem[]
  staggerMs?: number
  showProgress?: boolean
  className?: string
}

export default function ServiceCardGrid({ items, staggerMs = 120, showProgress = false, className }: ServiceCardGridProps) {
  const { ref, visibleCount } = useStaggeredReveal({ count: items.length, staggerMs })
  const allVisible = visibleCount >= items.length

  return (
    <>
      {showProgress && visibleCount > 0 && !allVisible && (
        <div className="mb-8 flex items-center gap-3">
          <div
            role="progressbar"
            aria-label="Services loading"
            aria-valuenow={visibleCount}
            aria-valuemin={0}
            aria-valuemax={items.length}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-brand-600/10"
          >
            <motion.div
              animate={{ width: `${(visibleCount / items.length) * 100}%` }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500"
            />
          </div>
          <span className="whitespace-nowrap font-mono text-[11px] text-ink-400">{visibleCount} / {items.length}</span>
        </div>
      )}
      <div ref={ref} className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4', className)}>
        {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          animate={i < visibleCount ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card topAccent className="h-full">
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-control"
              style={{ background: `${item.color}14`, border: `1px solid ${item.color}33`, color: item.color }}
              aria-hidden="true"
            >
              {item.icon}
            </div>
            <h3 className="mb-2 font-display text-base font-bold text-ink-950">{item.title}</h3>
            <p className="text-sm leading-relaxed text-ink-500">{item.desc}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <Badge key={tag} color={item.color} size="sm">{tag}</Badge>
                ))}
              </div>
            )}
            {item.learnMoreHref && (
              <a
                href={item.learnMoreHref}
                className="mt-4 inline-flex items-center gap-1.5 rounded-control text-xs font-bold text-brand-600 transition-colors hover:text-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Learn more <ArrowRight size={12} aria-hidden="true" />
              </a>
            )}
          </Card>
        </motion.div>
        ))}
      </div>
    </>
  )
}

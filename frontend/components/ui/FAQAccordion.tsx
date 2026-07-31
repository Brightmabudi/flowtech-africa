'use client'
import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@frontend/lib/cn'

export interface FAQItem { q: string; a: string }

export default function FAQAccordion({ items, className }: { items: FAQItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const idPrefix = useId()
  const reducedMotion = useReducedMotion()

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const panelId = `${idPrefix}-panel-${i}`
        const buttonId = `${idPrefix}-button-${i}`
        return (
          <div key={item.q} className="overflow-hidden rounded-card border border-brand-600/10 bg-white">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
              >
                <span className="font-display text-sm font-bold text-ink-950">{item.q}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={cn('flex-shrink-0 text-brand-600 transition-transform duration-300', isOpen && 'rotate-180')}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-ink-500">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

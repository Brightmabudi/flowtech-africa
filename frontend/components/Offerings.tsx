'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Brain, Cloud, LayoutGrid, ShieldCheck, Network, Server, KeyRound, Briefcase, Check } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import { OFFERINGS } from '@frontend/data/offerings'
import { cn } from '@frontend/lib/cn'

const ICONS: Record<string, typeof Brain> = { Brain, Cloud, LayoutGrid, ShieldCheck, Network, Server, KeyRound, Briefcase }

export default function Offerings() {
  const [active, setActive] = useState(0)
  const category = OFFERINGS[active]
  const Icon = ICONS[category.icon] ?? Brain

  return (
    <Section id="offerings">
      <Container>
        <SectionHeader
          eyebrow="Our Offerings"
          title={<>From AI to Zero-Trust.{' '}<span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Licence-Free.</span></>}
          subtitle="The world's best technology solutions, tailored, licence-free, and supported right here in South Africa."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-10">
          <div role="tablist" aria-label="Offering categories" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {OFFERINGS.map((o, i) => {
              const TabIcon = ICONS[o.icon] ?? Brain
              const selected = i === active
              return (
                <button
                  key={o.title}
                  role="tab"
                  type="button"
                  id={`offering-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="offering-panel"
                  onClick={() => setActive(i)}
                  className={cn(
                    'flex flex-shrink-0 items-center gap-3 rounded-control border px-4 py-3 text-left text-sm font-semibold transition-all',
                    selected ? 'border-transparent text-white shadow-brand-lg' : 'border-brand-600/15 bg-white text-ink-700 hover:border-brand-600/40',
                  )}
                  style={selected ? { background: o.color } : undefined}
                >
                  <TabIcon size={18} aria-hidden="true" className="flex-shrink-0" style={selected ? undefined : { color: o.color }} />
                  <span>{o.title}</span>
                </button>
              )
            })}
          </div>

          <motion.div
            key={category.title}
            role="tabpanel"
            id="offering-panel"
            aria-labelledby={`offering-tab-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative rounded-panel border border-brand-600/10 bg-ink-100 p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-control"
                style={{ background: `${category.color}20`, border: `1px solid ${category.color}40`, color: category.color }}
                aria-hidden="true"
              >
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl font-bold text-ink-950 sm:text-2xl">{category.title}</h3>
              {category.image && (
                <Image
                  src={category.image}
                  alt=""
                  width={640}
                  height={640}
                  sizes="120px"
                  className="ml-auto hidden h-24 w-auto max-w-[140px] flex-shrink-0 object-contain drop-shadow-xl sm:block"
                />
              )}
            </div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {category.items.map(item => (
                <li key={item.name} className="flex items-start gap-3 rounded-card border border-brand-600/10 bg-white p-4">
                  <Check size={16} aria-hidden="true" className="mt-1 flex-shrink-0" style={{ color: category.color }} />
                  <div>
                    <h4 className="text-sm font-bold leading-snug text-ink-950">{item.name}</h4>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

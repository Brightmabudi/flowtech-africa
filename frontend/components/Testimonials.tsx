'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'

const TESTIMONIALS = [
  { quote: 'FlowTech migrated our entire on-premise stack to a hybrid cloud in 28 days with zero production downtime. Their engineers understood our mining operational constraints better than any other vendor we had engaged.', name: 'Sipho Nkosi', role: 'CTO, Kumba Mining Group', initials: 'SN', rating: 5, tag: 'Cloud Migration', color: '#5B35D5', metric: { num: '28 days', label: 'Migration Time' } },
  { quote: 'We switched to FlowTech managed SOC after a ransomware incident. In 18 months they blocked over 2,400 threats and reduced our mean time to respond from 4 hours to under 10 minutes.', name: 'Adaeze Okonkwo', role: 'Head of IT Security, First Continental Bank', initials: 'AO', rating: 5, tag: 'Cybersecurity', color: '#E8401A', metric: { num: '2,400+', label: 'Threats Blocked' } },
  { quote: 'The SD-WAN rollout across our 340 retail stores in South Africa, Botswana, and Namibia was flawless. Connectivity issues that used to cost us R1.2M monthly have essentially disappeared.', name: 'Gareth van der Berg', role: 'IT Director, Retail Group Africa', initials: 'GV', rating: 5, tag: 'Network', color: '#0EA5E9', metric: { num: 'R1.2M', label: 'Monthly Savings' } },
]

export default function Testimonials() {
  const reducedMotion = useReducedMotion()
  const [active, setActive]       = useState(0)
  const [paused, setPaused]       = useState(false)
  const [direction, setDirection] = useState(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const total = TESTIMONIALS.length

  useEffect(() => {
    if (paused || reducedMotion) return
    const t = setInterval(() => { setDirection(1); setActive(p => (p + 1) % total) }, 5000)
    return () => clearInterval(t)
  }, [paused, reducedMotion, total])

  function goTo(idx: number) {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }

  const t = TESTIMONIALS[active]

  return (
    <Section bg="tint">
      <Container className="max-w-4xl">

        <SectionHeader
          align="center"
          eyebrow="Client Stories"
          title="Trusted by Africa Leaders"
          subtitle="Real outcomes from real enterprises across the continent."
          className="mx-auto"
        />

        <div
          ref={sectionRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span className="sr-only" aria-live="polite">
            {`Showing testimonial ${active + 1} of ${total}: ${t.name}, ${t.role}`}
          </span>

          <div className="relative min-h-[360px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: reducedMotion ? 0 : direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reducedMotion ? 0 : direction * -80 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[24px] border border-brand-600/10 bg-white p-7 shadow-brand-md sm:p-12"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-[24px]" style={{ background: `linear-gradient(90deg,${t.color},transparent)` }} />
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: t.color, background: `${t.color}15`, border: `1px solid ${t.color}30` }}
                  >
                    {t.tag}
                  </span>
                  <Quote size={28} style={{ color: t.color }} className="opacity-25" aria-hidden="true" />
                </div>
                <div className="mb-5 flex gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {Array(t.rating).fill(0).map((_, i) => (
                    <span key={i} aria-hidden="true" className="text-lg text-[#F5C842]">★</span>
                  ))}
                </div>
                <p className="mb-8 text-[clamp(1rem,1.8vw,1.15rem)] italic leading-relaxed text-ink-950">{t.quote}</p>
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-600/10 pt-6">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                      style={{ background: `linear-gradient(135deg,${t.color},#E8401A)` }}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-display text-[15px] font-bold text-ink-950">{t.name}</div>
                      <div className="mt-0.5 text-xs text-ink-400">{t.role}</div>
                    </div>
                  </div>
                  <div className="rounded-control px-6 py-3 text-center" style={{ background: `${t.color}08`, border: `1px solid ${t.color}20` }}>
                    <div className="font-display text-2xl font-bold leading-none" style={{ color: t.color }}>{t.metric.num}</div>
                    <div className="mt-1 text-[11px] text-ink-400">{t.metric.label}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-9 flex items-center justify-center gap-5">
            <button
              onClick={() => goTo((active - 1 + total) % total)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-600/15 bg-white text-brand-800 shadow-brand-sm transition-colors hover:bg-brand-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2.5">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1} of ${total}: ${item.name}`}
                  aria-current={i === active}
                  className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  <div className={`relative h-2 overflow-hidden rounded-full transition-all duration-400 ${i === active ? 'w-8 bg-brand-600' : 'w-2 bg-brand-600/20'}`}>
                    {i === active && !paused && !reducedMotion && (
                      <motion.div
                        key={active}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        className="absolute inset-y-0 left-0 rounded-full bg-white/50"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => goTo((active + 1) % total)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-600/15 bg-white text-brand-800 shadow-brand-sm transition-colors hover:bg-brand-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

      </Container>
    </Section>
  )
}

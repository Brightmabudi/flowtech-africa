'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { KeyRound, Puzzle, Plug, Globe2, Compass, ArrowRight } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, delay: i * 0.08 },
})

const tile = 'group relative overflow-hidden rounded-panel border p-7 transition-all duration-300 hover:-translate-y-1'

export default function Differentiators() {
  return (
    <Section id="why-flowtech">
      <Container>
        <SectionHeader
          eyebrow="The FlowTech Difference"
          title={<>We start with <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">you</span>, not a catalogue.</>}
          subtitle="Off-the-shelf catalogues overwhelm without insight. We map your challenges first, then build technology that adapts, scales and stays yours."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
          {/* Hero tile: licence-free */}
          <motion.div {...reveal(0)} className={`${tile} md:col-span-4 border-white/10 bg-gradient-to-br from-[#08050F] via-[#11091E] to-brand-800 text-white`}>
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brand-600/40 blur-[80px]" />
            <div className="relative grid items-center gap-6 sm:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-control border border-white/15 bg-white/10 text-accent-400" aria-hidden="true"><KeyRound size={20} /></div>
                <h3 className="mb-3 font-display text-2xl font-bold leading-tight sm:text-3xl">Own your technology. Outright.</h3>
                <p className="mb-5 text-sm leading-relaxed text-white/65">No recurring licence fees, ever. Our digital business platforms are built for you and owned by you, supported locally from Pretoria.</p>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-400 transition-colors hover:text-white">
                  Ask about licence-free platforms <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
              <Image src="/images/cloud.webp" alt="" width={900} height={571} sizes="320px" className="w-full animate-[floatBadge_6s_ease-in-out_infinite] drop-shadow-[0_20px_30px_rgba(0,0,0,.5)]" />
            </div>
          </motion.div>

          <motion.div {...reveal(1)} className={`${tile} md:col-span-2 border-brand-600/15 bg-ink-100`}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-control bg-brand-600/10 text-brand-600" aria-hidden="true"><Puzzle size={20} /></div>
            <h3 className="mb-2 font-display text-lg font-bold text-ink-950">Truly custom</h3>
            <p className="text-sm leading-relaxed text-ink-500">Solutions shaped around your exact workflows, from mining operations to government service delivery.</p>
            <Image src="/images/ai-chip.webp" alt="" width={640} height={712} sizes="140px" className="absolute -bottom-6 -right-4 w-[120px] opacity-90 transition-transform duration-500 group-hover:scale-110" />
          </motion.div>

          <motion.div {...reveal(2)} className={`${tile} md:col-span-2 border-brand-600/15 bg-white shadow-brand-lg`}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-control bg-accent-500/10 text-accent-600" aria-hidden="true"><Plug size={20} /></div>
            <h3 className="mb-2 font-display text-lg font-bold text-ink-950">Plugs into what you run</h3>
            <p className="text-sm leading-relaxed text-ink-500">Seamless integration with your existing tools and processes. No rip-and-replace.</p>
          </motion.div>

          <motion.div {...reveal(3)} className={`${tile} md:col-span-2 border-brand-600/15 bg-white shadow-brand-lg`}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-control bg-brand-600/10 text-brand-600" aria-hidden="true"><Globe2 size={20} /></div>
            <h3 className="mb-2 font-display text-lg font-bold text-ink-950">Local roots, global partners</h3>
            <p className="text-sm leading-relaxed text-ink-500">Pretoria-based experts backed by partnerships with Microsoft, Cisco, Dell, HPE and more.</p>
          </motion.div>

          <motion.div {...reveal(4)} className={`${tile} md:col-span-2 border-transparent bg-gradient-to-br from-brand-600 to-accent-500 text-white`}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-control bg-white/20" aria-hidden="true"><Compass size={20} /></div>
            <h3 className="mb-2 font-display text-lg font-bold">Start with a Discovery Workshop</h3>
            <p className="mb-4 text-sm leading-relaxed text-white/85">A half-day session to map your needs and priorities, before a single rand is spent.</p>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-white underline-offset-4 hover:underline">
              Book yours <ArrowRight size={14} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

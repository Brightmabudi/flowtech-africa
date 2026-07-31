'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'

const BULLETS = [
  'Level 1 B-BBEE certified SME committed to transformation',
  'Over 20 years of proven ICT experience across Africa',
  'Own cutting-edge Digital Business Systems with no licensing fees',
  'Trusted Partner to leading software OEMs globally',
  'Secure global delivery platform for advanced digital technologies',
  'Client-first approach — we understand your business before building',
]

export default function About() {
  return (
    <section id="about" className="bg-white">

      <div className="relative h-[clamp(280px,35vw,440px)] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1400&q=80&auto=format"
          alt="Digital transformation"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08050F]/85 via-brand-800/70 to-accent-500/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-16">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-400">About FlowTech Africa</span>
            <h2 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-tight text-white">Digital Business Transformation</h2>
            <p className="mx-auto max-w-[680px] text-[clamp(.95rem,1.5vw,1.1rem)] italic leading-relaxed text-white/70">
              Every valley shall be exalted, and every mountain and hill shall be made low: and the crooked shall be made straight, and the rough places plain.
            </p>
            <p className="mt-2 font-mono text-[13px] text-white/50">Isaiah 40:4</p>
          </motion.div>
        </div>
      </div>

      <Section>
        <Container>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">Who We Are</span>
              <h3 className="mb-5 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-ink-950">
                A specialist development company with over 20 years of ICT experience
              </h3>
              <p className="mb-3.5 text-[15px] leading-relaxed text-ink-500">
                Flowtech Africa is a specialist development company with over 20 years of ICT experience. As a Level 1 B-BBEE certified SME, we focus on delivering innovative solutions and sustainable value, while building long-term relationships with our clients.
              </p>
              <p className="mb-6 text-[15px] leading-relaxed text-ink-500">
                We deliver advanced digital technologies globally through our secure platform. As a trusted Partner to leading software OEMs, we also provide our own Digital Business Systems Platforms, designed to be cost-effective, cutting-edge, and completely free from restrictive licensing fees.
              </p>
              <div className="mb-7 flex flex-col gap-3">
                {BULLETS.map(b => (
                  <div key={b} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-brand-600" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-ink-700">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: 0.1 }}>
              <div className="relative mb-4 overflow-hidden rounded-panel shadow-brand-lg">
                <Image
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format"
                  alt="Data centre"
                  width={800}
                  height={280}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-[280px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-800/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-control border border-white/10 bg-[#08050F]/80 px-4 py-2.5 backdrop-blur-md">
                  <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                  <div>
                    <span className="block text-xs font-bold text-white">Secure Global Platform</span>
                    <small className="text-[10px] text-white/60">99.9% uptime guaranteed</small>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </Container>
      </Section>
    </section>
  )
}

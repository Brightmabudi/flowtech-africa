'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, ShieldCheck, TrendingUp, HeartHandshake } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'

const VALUES = [
  { icon: <ShieldCheck size={20} />,    color: '#5B35D5', title: 'Integrity',              desc: 'We deliver what we promise, always.' },
  { icon: <TrendingUp size={20} />,     color: '#0EA5E9', title: 'Continuous Improvement', desc: 'We evolve with technology and your needs.' },
  { icon: <HeartHandshake size={20} />, color: '#E8401A', title: 'Profit with Purpose',    desc: 'Growth that benefits your business and our communities.' },
]

export default function CEOStatement() {
  return (
    <Section bg="tint" id="ceo-statement">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.figure
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">CEO Statement</span>
            <Quote size={36} aria-hidden="true" className="mb-4 text-brand-600" />
            <blockquote className="font-display text-[clamp(1.1rem,2vw,1.45rem)] font-medium leading-relaxed text-ink-950">
              I am very focused and sometimes too optimistic. I believe that experience and knowledge needs to be transferred and one of my key objectives is to transfer what I know onto the next generation. Change is what will save us as South Africa and as individuals and we need to do this in a structured manner.
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <Image src="/images/ceo.webp" alt="Michelle Fanoe, CEO of FlowTech Africa" width={600} height={548} sizes="64px" className="h-16 w-16 rounded-full object-cover ring-2 ring-brand-600/30" />
              <div>
              <span className="block font-display text-base font-bold text-ink-950">Michelle Fanoe</span>
              <span className="text-sm text-ink-500">CEO of FlowTech Africa</span>
              </div>
            </figcaption>
          </motion.figure>

          <div>
            <SectionHeader eyebrow="Our Core Values" title="What we stand for" className="!mb-8 md:!mb-8" />
            <ul className="flex flex-col gap-4">
              {VALUES.map(({ icon, color, title, desc }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 rounded-card border border-brand-600/10 bg-white p-5"
                >
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-control"
                    style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink-950">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

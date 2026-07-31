'use client'
import { motion } from 'framer-motion'
import { Heart, Target, Flame, Star, CheckCircle } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Card from '@frontend/components/ui/Card'

const PILLARS = [
  { icon: <Target size={24} />, color: '#5B35D5', title: 'Our Purpose', desc: 'The purpose of FlowTech Africa is to glorify God in everything we do and to serve with integrity, treat you with respect, and put your interest before our bottom line. We believe these values set FlowTech Africa apart from others.' },
  { icon: <Star size={24} />,   color: '#E8401A', title: 'Our Mission', desc: 'FlowTech Africa will continuously improve and grow to be the preferred software development and software solution provider globally.' },
  { icon: <Flame size={24} />,  color: '#0EA5E9', title: 'Our Passion', desc: 'FlowTech Africa is passionate about technology and how it can be used to enrich our clients businesses and internal processes. We believe in digitalisation across entire value chain processes and using digital technology to manage, track and monitor every aspect of business activities.' },
  { icon: <Heart size={24} />,  color: '#10B981', title: 'Our Experience', desc: 'We use the latest and best technology platforms for our clients, and we use our years of experience to apply these technology platforms to our clients environment to optimise every business process and the way they will interact with these technology platforms.' },
]

const COMMITMENTS = [
  'Serving with integrity',
  'Treating every client with respect',
  'Putting your interests before our bottom line',
]

export default function Purpose() {
  return (
    <Section id="purpose">
      <Container>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mb-16 lg:mb-20">
          <div className="relative overflow-hidden rounded-panel bg-gradient-to-br from-[#08050F] to-brand-800">
            <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(91,53,213,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(91,53,213,.07) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            <div aria-hidden="true" className="pointer-events-none absolute left-[20%] top-[10%] h-[240px] w-[240px] rounded-full bg-brand-600/15 blur-[80px]" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-[10%] right-[20%] h-[180px] w-[180px] rounded-full bg-accent-500/10 blur-[60px]" />

            <div className="relative z-[1] mx-auto max-w-[640px] p-8 text-center sm:p-14">
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-400">
                Let Us Be Your Partners
              </span>
              <h2 className="mb-5 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-white">
                Let Us Be Your{' '}
                <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">Software Solution Partners</span>
              </h2>
              <p className="mb-7 text-[15px] leading-relaxed text-white/70">
                At FlowTech Africa, our purpose is to glorify God in everything we do. We believe nothing is possible without God&apos;s blessing. That is why we create an environment where our staff can use their God-given gifts and talents to provide innovative solutions that meet your needs.
              </p>
              <div className="mx-auto flex max-w-fit flex-col items-start gap-3.5">
                {COMMITMENTS.map(c => (
                  <div key={c} className="flex items-center gap-3">
                    <CheckCircle size={16} className="flex-shrink-0 text-emerald-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-white/85">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <SectionHeader
          align="center"
          eyebrow="Our Foundation"
          title={<>Purpose, Mission, Passion{' '}<span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">&amp; Experience</span></>}
          subtitle="The values and beliefs that drive everything we do at FlowTech Africa."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon, color, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Card topAccent className="h-full">
                <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-control" style={{ background: `${color}15`, border: `1px solid ${color}25`, color }} aria-hidden="true">
                  {icon}
                </div>
                <h3 className="mb-3 font-display text-base font-bold text-ink-950">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-500">{desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  )
}

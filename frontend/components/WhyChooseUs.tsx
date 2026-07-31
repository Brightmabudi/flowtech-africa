'use client'
import { motion } from 'framer-motion'
import {
  Clock, Award, Cloud, Code2, Cpu, ShieldCheck, LayoutGrid, Network, Headphones, TrendingUp, ArrowRight,
} from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Button from '@frontend/components/ui/Button'

const REASONS = [
  { icon: <Clock size={22} />,       color: '#5B35D5', title: '20+ Years of ICT Experience',              desc: 'Two decades of proven expertise delivering enterprise technology solutions across Africa and beyond.' },
  { icon: <Award size={22} />,       color: '#E8401A', title: 'Level 1 B-BBEE Certified',                  desc: 'Proudly South African and fully transformation-compliant — a trusted partner for your business.' },
  { icon: <Cloud size={22} />,       color: '#0EA5E9', title: 'Cloud & Infrastructure Solutions',          desc: 'Secure, scalable cloud and infrastructure environments engineered for performance and reliability.' },
  { icon: <Code2 size={22} />,       color: '#10B981', title: 'Custom Software Development',               desc: 'Tailor-made applications built around your exact business processes, not the other way around.' },
  { icon: <Cpu size={22} />,         color: '#8B5CF6', title: 'AI & Automation Solutions',                 desc: 'Intelligent automation that eliminates manual work and unlocks new efficiency across your operations.' },
  { icon: <ShieldCheck size={22} />, color: '#EF4444', title: 'Cybersecurity Services',                    desc: 'Zero-trust security architecture protecting your business from evolving digital threats, by design.' },
  { icon: <LayoutGrid size={22} />,  color: '#F59E0B', title: 'Digital Business Platforms',                desc: 'License-free, fully owned digital platforms designed to grow with your business, not against it.' },
  { icon: <Network size={22} />,     color: '#06B6D4', title: 'Enterprise Systems Integration',             desc: 'Seamlessly connect your existing systems into one unified, efficient technology ecosystem.' },
  { icon: <Headphones size={22} />,  color: '#EC4899', title: 'Dedicated Technical Support',                desc: 'Real engineers on call around the clock, ready to keep your systems running smoothly.' },
  { icon: <TrendingUp size={22} />,  color: '#22C55E', title: 'Scalable Solutions for Growing Businesses',  desc: 'Flexible technology architecture that scales effortlessly as your business expands into new markets.' },
]

export default function WhyChooseUs() {
  return (
    <Section bg="dark" className="relative overflow-hidden">
      {/* Subtle animated gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [animation:heroGradientDrift_20s_ease-in-out_infinite] bg-[length:160%_160%]"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 15% 10%,rgba(91,53,213,.35) 0%,transparent 55%), radial-gradient(ellipse 60% 50% at 85% 30%,rgba(232,64,26,.14) 0%,transparent 50%), radial-gradient(ellipse 55% 45% at 30% 90%,rgba(14,165,233,.12) 0%,transparent 50%)' }}
      />
      {/* Faint grid overlay, consistent with the site's other dark panels */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(91,53,213,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(91,53,213,.05) 1px,transparent 1px)', backgroundSize: '44px 44px' }}
      />

      <Container className="relative z-[1]">
        <SectionHeader
          align="center"
          dark
          eyebrow="Why FlowTech Africa"
          title={<>Why Choose{' '}<span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">FlowTech Africa</span></>}
          subtitle="Everything you need from a technology partner, in one place — proven experience, modern capability, and support that never sleeps."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {REASONS.map(({ icon, color, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              className="group relative overflow-hidden rounded-card border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.08]"
              style={{ boxShadow: '0 0 0 rgba(0,0,0,0)' }}
            >
              {/* Soft glow on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: color }}
              />
              <div
                className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-control transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="relative mb-2 font-display text-[15px] font-bold leading-snug text-white">{title}</h3>
              <p className="relative text-[13px] leading-relaxed text-white/55">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-14 text-center lg:mt-20 lg:pt-16"
        >
          <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
            Let&apos;s Build Your{' '}
            <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">Digital Future</span>
          </h3>
          <Button href="#contact" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
            Talk to Our Experts
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}

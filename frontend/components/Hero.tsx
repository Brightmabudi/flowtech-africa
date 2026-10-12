'use client'
import Image from 'next/image'
import { ArrowRight, CalendarCheck, Users, Workflow, Cpu, LineChart, Target, Brain, Cloud, ShieldCheck, Network, Clock, Award, Banknote, LayoutGrid } from 'lucide-react'
import Button from '@frontend/components/ui/Button'

const CHIPS = [
  { icon: <Brain size={18} />,       label: 'AI',       color: '#8B5CF6' },
  { icon: <Cloud size={18} />,       label: 'Cloud',    color: '#0EA5E9' },
  { icon: <ShieldCheck size={18} />, label: 'Security', color: '#E8401A' },
  { icon: <Network size={18} />,     label: 'Network',  color: '#10B981' },
]

const PILLARS = [
  { icon: <Users size={28} />,    title: 'People',     sub: 'Focused'   },
  { icon: <Workflow size={28} />, title: 'Process',    sub: 'Driven'    },
  { icon: <Cpu size={28} />,      title: 'Technology', sub: 'Enabled'   },
  { icon: <LineChart size={28} />, title: 'Insight',   sub: 'Led'       },
  { icon: <Target size={28} />,   title: 'Results',    sub: 'Delivered' },
]

const STATS = [
  { icon: <Clock size={24} />,      value: '20+', label: 'Years in ICT' },
  { icon: <Award size={24} />,      value: 'L1',  label: 'B-BBEE Contributor' },
  { icon: <Banknote size={24} />,   value: '0%',  label: 'Licence Fees' },
  { icon: <LayoutGrid size={24} />, value: '8',   label: 'Offering Categories' },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white px-6 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-brand-100/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
        <div className="animate-[fadeUp_.8s_both]">
          <span className="mb-5 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
            Your Business Solutions Partner
          </span>
          <h1 className="mb-6 font-display text-[clamp(2.6rem,5.6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink-950">
            Technology that{' '}
            <span className="text-brand-600">flows.</span>
            <br />
            Solutions that{' '}
            <span className="text-accent-500">grow.</span>
          </h1>
          <p className="mb-9 max-w-[480px] text-base leading-relaxed text-ink-500 sm:text-lg">
            From artificial intelligence to zero-trust security, we deliver tailored, licence-free technology solutions that drive efficiency and growth, supported right here in South Africa.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button href="#offerings" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
              Explore Our Offerings
            </Button>
            <Button href="#contact" variant="ghost" size="lg" icon={<CalendarCheck size={16} />}>
              Book a Discovery Workshop
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[640px] animate-[fadeUp_1s_.15s_both]">
          <div className="relative overflow-hidden rounded-[28px] rounded-tl-[120px] shadow-brand-lg lg:rounded-tl-[180px]">
            <Image
              src="/images/workplace.webp"
              alt="FlowTech Africa engineer working with cloud and digital tools"
              width={852}
              height={568}
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-700/30 via-transparent to-transparent" />
          </div>

          <div className="absolute -top-5 left-6 right-6 hidden justify-between gap-2 sm:flex lg:left-16">
            {CHIPS.map((c, i) => (
              <div
                key={c.label}
                aria-hidden="true"
                className="flex flex-col items-center gap-1 rounded-card border border-brand-600/10 bg-white px-3.5 py-2.5 shadow-brand-sm"
                style={{ animation: `floatBadge ${4 + i * 0.6}s ease-in-out infinite` }}
              >
                <span style={{ color: c.color }}>{c.icon}</span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink-500">{c.label}</span>
              </div>
            ))}
          </div>

          <Image src="/images/ai-chip.webp" alt="" aria-hidden="true" width={640} height={712} sizes="150px" className="absolute -bottom-8 -right-4 hidden w-[130px] animate-[floatBadge_5s_ease-in-out_infinite] drop-shadow-[0_20px_30px_rgba(91,53,213,.35)] sm:block lg:-right-8" />
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl">
        <ul className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {PILLARS.map(p => (
            <li key={p.title} className="flex items-center gap-3 lg:justify-center">
              <span className="text-brand-600" aria-hidden="true">{p.icon}</span>
              <span className="font-display text-sm font-bold leading-tight text-ink-950">
                {p.title}<br /><span className="font-medium text-ink-500">{p.sub}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-panel bg-white/10 bg-gradient-to-r from-[#2D1580] via-brand-700 to-[#4A2AB0] lg:grid-cols-4">
          {STATS.map(s => (
            <div key={s.label} className="flex items-center gap-4 bg-transparent px-6 py-6 lg:px-8">
              <span className="text-brand-300" aria-hidden="true">{s.icon}</span>
              <div>
                <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/55">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight, Cloud } from 'lucide-react'
import Button from '@frontend/components/ui/Button'
import TechCanvas from '@frontend/components/TechCanvas'

const TRUST_BADGES = ['ISO 27001', 'ISO 9001', 'COBIT 5', 'B-BBEE L1', 'Microsoft Gold']

const WORDS = ['Cloud Infrastructure', 'Cybersecurity', 'Managed IT Services', 'Digital Transformation']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [fade, setFade]           = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setWordIndex(p => (p + 1) % WORDS.length)
        setFade(true)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#08050F] via-[#11091E] to-[#1A0A38] px-6 pb-20 pt-32 text-center sm:px-16 sm:pt-36"
    >
      <TechCanvas />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [animation:heroGradientDrift_16s_ease-in-out_infinite] bg-[length:160%_160%]"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% -10%,rgba(91,53,213,.55) 0%,transparent 60%), radial-gradient(ellipse 60% 50% at 20% 60%,rgba(91,53,213,.2) 0%,transparent 50%), radial-gradient(ellipse 50% 40% at 80% 70%,rgba(232,64,26,.12) 0%,transparent 50%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(91,53,213,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(91,53,213,.06) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 80%)',
        }}
      />

      <div aria-hidden="true" className="orbit orbit1"><div className="orbit-dot" /></div>
      <div aria-hidden="true" className="orbit orbit2"><div className="orbit-dot" /></div>
      <div aria-hidden="true" className="orbit orbit3" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[30%] left-[7%] hidden animate-[floatBadge_4s_ease-in-out_infinite] items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold text-white/85 backdrop-blur sm:inline-flex"
        style={{ background: 'rgba(14,165,233,.14)', borderColor: 'rgba(14,165,233,.35)' }}
      >
        <Cloud size={13} className="text-sky-400" />
        Multi-Cloud Ready
      </div>

      <div className="relative z-[1] flex max-w-[900px] flex-col items-center">
        <h1 className="mb-6 animate-[fadeUp_.9s_.08s_both] font-display text-[clamp(2.8rem,6.5vw,6rem)] font-bold leading-[.95] tracking-[-0.04em] text-white">
          Powering Africa
          <span className="block bg-gradient-to-r from-accent-500 via-[#F5C842] to-accent-500 bg-[length:200%_100%] bg-clip-text text-transparent [animation:gradShift_4s_ease_infinite]">
            Digital Future
          </span>
        </h1>

        <div className="mb-5 flex animate-[fadeUp_.9s_.12s_both] items-center gap-2.5">
          <span className="font-mono text-[13px] text-white/50">Delivering</span>
          <span
            className="rounded-full border border-brand-600/25 bg-brand-600/15 px-3.5 py-1 font-display text-sm font-bold text-brand-400 backdrop-blur-md transition-opacity duration-400"
            style={{ opacity: fade ? 1 : 0 }}
          >
            {WORDS[wordIndex]}
          </span>
        </div>

        <p className="mx-auto mb-11 max-w-[560px] animate-[fadeUp_.9s_.16s_both] text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-white/60">
          FlowTech Africa delivers enterprise-grade cloud, cybersecurity, and managed IT services
          to organisations across Sub-Saharan Africa — from agile SMEs to large corporates.
        </p>

        <div className="flex animate-[fadeUp_.9s_.24s_both] flex-wrap justify-center gap-3.5">
          <Button href="#solutions" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
            Explore Solutions
          </Button>
          <Button href="#contact" variant="secondary" size="lg" icon={<ChevronRight size={16} />}>
            Talk to an Expert
          </Button>
        </div>

        <div className="mt-[72px] flex animate-[fadeUp_.9s_.4s_both] flex-wrap justify-center gap-3">
          {TRUST_BADGES.map(b => (
            <span key={b} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-wide text-white/60">
              {b}
            </span>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 animate-[fadeUp_1s_1.2s_both] flex-col items-center gap-1.5">
        <span className="font-mono text-[9px] tracking-[.14em] text-white/40">SCROLL</span>
        <div className="h-9 w-px animate-[floatBadge_1.6s_ease-in-out_infinite] bg-gradient-to-b from-brand-600 to-transparent" />
      </div>
    </section>
  )
}

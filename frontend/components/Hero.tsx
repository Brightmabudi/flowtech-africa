'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronRight, Cloud, ShieldCheck } from 'lucide-react'
import Button from '@frontend/components/ui/Button'
import TechCanvas from '@frontend/components/TechCanvas'

const TRUST_BADGES = ['ISO 27001', 'ISO 9001', 'COBIT 5', 'B-BBEE L1', 'Microsoft Gold']

const WORDS = ['AI & Analytics', 'Cloud Platforms', 'Zero-Trust Security', 'Modern Workplace']

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
        className="pointer-events-none absolute bottom-[30%] left-[7%] hidden animate-[floatBadge_4s_ease-in-out_infinite] items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold text-white/85 backdrop-blur sm:inline-flex lg:hidden"
        style={{ background: 'rgba(14,165,233,.14)', borderColor: 'rgba(14,165,233,.35)' }}
      >
        <Cloud size={13} className="text-sky-400" />
        Multi-Cloud Ready
      </div>

      <div className="relative z-[1] mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-8">
      <div className="flex flex-col items-center lg:items-start lg:text-left">
        <h1 className="mb-6 animate-[fadeUp_.9s_.08s_both] font-display text-[clamp(2.8rem,6.5vw,6rem)] font-bold leading-[.95] tracking-[-0.04em] text-white">
          Technology built
          <span className="block bg-gradient-to-r from-accent-500 via-[#F5C842] to-accent-500 bg-[length:200%_100%] bg-clip-text text-transparent [animation:gradShift_4s_ease_infinite]">
            around you.
          </span>
        </h1>

        <div className="mb-5 flex animate-[fadeUp_.9s_.12s_both] items-center gap-2.5">
          <span className="font-mono text-[13px] text-white/50">Your solutions partner for</span>
          <span
            className="rounded-full border border-brand-600/25 bg-brand-600/15 px-3.5 py-1 font-display text-sm font-bold text-brand-400 backdrop-blur-md transition-opacity duration-400"
            style={{ opacity: fade ? 1 : 0 }}
          >
            {WORDS[wordIndex]}
          </span>
        </div>

        <p className="mb-11 max-w-[560px] lg:mx-0 animate-[fadeUp_.9s_.16s_both] text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-white/60">
          From artificial intelligence to zero-trust security, we deliver tailored, licence-free
          technology solutions that drive efficiency and growth, supported right here in South Africa.
        </p>

        <div className="flex animate-[fadeUp_.9s_.24s_both] flex-wrap justify-center gap-3.5 lg:justify-start">
          <Button href="#offerings" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
            Explore Our Offerings
          </Button>
          <Button href="#contact" variant="secondary" size="lg" icon={<ChevronRight size={16} />}>
            Book a Discovery Workshop
          </Button>
        </div>

        <div className="mt-14 flex animate-[fadeUp_.9s_.4s_both] flex-wrap justify-center gap-3 lg:justify-start">
          {TRUST_BADGES.map(b => (
            <span key={b} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-wide text-white/60">
              {b}
            </span>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-[520px] animate-[fadeUp_1s_.3s_both] lg:block">
        <div className="absolute inset-6 rounded-full bg-brand-600/30 blur-[90px]" />
        <div className="relative overflow-hidden rounded-panel border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.5)]">
          <Image src="/images/workplace.webp" alt="" width={852} height={568} priority sizes="520px" className="h-[360px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08050F]/70 via-transparent to-brand-600/10" />
        </div>
        <Image src="/images/ai-chip.webp" alt="" width={640} height={712} sizes="180px" className="absolute -right-6 -top-14 w-[170px] animate-[floatBadge_5s_ease-in-out_infinite] drop-shadow-[0_20px_30px_rgba(91,53,213,.45)]" />
        <Image src="/images/cloud.webp" alt="" width={900} height={571} sizes="200px" className="absolute -bottom-12 -left-10 w-[210px] animate-[floatBadge_6s_ease-in-out_infinite_.8s] drop-shadow-[0_20px_30px_rgba(0,0,0,.45)]" />
        <div className="absolute -bottom-5 right-4 flex items-center gap-2.5 rounded-control border border-white/15 bg-white/[0.08] px-4 py-2.5 backdrop-blur-xl">
          <ShieldCheck size={16} className="text-emerald-400" />
          <div>
            <span className="block text-xs font-bold text-white">Zero-Trust Security</span>
            <small className="text-[10px] text-white/60">Licence-free, locally supported</small>
          </div>
        </div>
      </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 animate-[fadeUp_1s_1.2s_both] flex-col items-center gap-1.5">
        <span className="font-mono text-[9px] tracking-[.14em] text-white/40">SCROLL</span>
        <div className="h-9 w-px animate-[floatBadge_1.6s_ease-in-out_infinite] bg-gradient-to-b from-brand-600 to-transparent" />
      </div>
    </section>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight, Cloud } from 'lucide-react'

const STATS = [
  { num: '20+',  label: 'Years in ICT'       },
  { num: 'L1',   label: 'B-BBEE Certified'   },
  { num: '0%',   label: 'Licensing Fees'     },
  { num: '100+', label: 'Systems Delivered'  },
]

const BADGES = [
  { cls: 'bf3', icon: 'Cloud', color: '#0EA5E9', text: 'Multi-Cloud Ready' },
]

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

  const badgeIcons: Record<string, React.ReactNode> = {
    Cloud: <Cloud size={13} />,
  }

  const badgePositions: Record<string, React.CSSProperties> = {
    bf3: { bottom: '30%', left: '7%' },
  }

  return (
    <section
      id="home"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px clamp(24px,8vw,160px) 80px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#08050F 0%,#11091E 50%,#1A0A38 100%)' }}
    >
      {/* Mesh bg */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 100% 80% at 50% -10%,rgba(59,31,168,.55) 0%,transparent 60%), radial-gradient(ellipse 60% 50% at 20% 60%,rgba(91,53,213,.2) 0%,transparent 50%), radial-gradient(ellipse 50% 40% at 80% 70%,rgba(232,64,26,.12) 0%,transparent 50%)' }} />

      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(91,53,213,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(91,53,213,.06) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 80%)' }} />

      {/* Orbit rings */}
      <div className="orbit orbit1"><div className="orbit-dot" /></div>
      <div className="orbit orbit2"><div className="orbit-dot" /></div>
      <div className="orbit orbit3" />

      {/* Floating badges */}
      {BADGES.map((b, i) => (
        <div
          key={b.cls}
          style={{
            position: 'absolute',
            ...badgePositions[b.cls],
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px', borderRadius: 100,
            fontSize: 12, fontWeight: 600,
            background: b.color + '18',
            border: '1px solid ' + b.color + '40',
            color: 'rgba(255,255,255,.85)',
            backdropFilter: 'blur(8px)',
            animation: 'floatBadge ' + (4 + i * 0.5) + 's ease-in-out infinite',
            animationDelay: (i * 0.8) + 's',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: b.color }}>{badgeIcons[b.icon]}</span>
          {b.text}
        </div>
      ))}

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 900 }}>

        {/* Headline */}
        <h1 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2.8rem,6.5vw,6rem)', fontWeight: 900, lineHeight: .95, letterSpacing: '-.04em', color: 'white', marginBottom: 24, animation: 'fadeUp .9s .08s both' }}>
          Powering Africa
          <span style={{ display: 'block', background: 'linear-gradient(90deg,#E8401A,#F5C842,#E8401A)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'gradShift 4s ease infinite' }}>
            Digital Future
          </span>
        </h1>

        {/* Rotating label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, animation: 'fadeUp .9s .12s both' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', fontFamily: 'JetBrains Mono, monospace' }}>Delivering</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#5B35D5', fontFamily: 'Cabinet Grotesk, sans-serif', transition: 'opacity .4s', opacity: fade ? 1 : 0, background: 'rgba(91,53,213,.12)', border: '1px solid rgba(91,53,213,.25)', padding: '4px 14px', borderRadius: 100 }}>
            {WORDS[wordIndex]}
          </span>
        </div>

        {/* Sub */}
        <p style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)', color: 'rgba(255,255,255,.5)', maxWidth: 560, margin: '0 auto 44px', lineHeight: 1.8, animation: 'fadeUp .9s .16s both' }}>
          FlowTech Africa delivers enterprise-grade cloud, cybersecurity, and managed IT services
          to organisations across Sub-Saharan Africa - from agile SMEs to large corporates.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp .9s .24s both' }}>
          <a href="#solutions"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 12, fontSize: 15, fontWeight: 700, background: 'linear-gradient(135deg,#2D1580,#5B35D5)', color: 'white', textDecoration: 'none', boxShadow: '0 0 40px rgba(91,53,213,.4)', fontFamily: 'Cabinet Grotesk, sans-serif', transition: 'transform .2s, box-shadow .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(91,53,213,.6)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(91,53,213,.4)'; }}
          >
            Explore Solutions <ArrowRight size={16} />
          </a>
          <a href="#contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', borderRadius: 12, fontSize: 15, fontWeight: 500, background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.12)', textDecoration: 'none', backdropFilter: 'blur(8px)', fontFamily: 'Cabinet Grotesk, sans-serif', transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.09)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.8)'; }}
          >
            <ChevronRight size={16} /> Talk to an Expert
          </a>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 72, maxWidth: 680, width: '100%', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, background: 'rgba(255,255,255,.03)', backdropFilter: 'blur(12px)', overflow: 'hidden', animation: 'fadeUp .9s .4s both' }}>
          {STATS.map(({ num, label }, i) => (
            <div
              key={label}
              style={{ flex: 1, padding: '20px', textAlign: 'center', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none', transition: 'background .2s', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '2rem', fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {num}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 4, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp .9s .5s both' }}>
          {['ISO 27001', 'ISO 9001', 'COBIT 5', 'B-BBEE L1', 'Microsoft Gold'].map(b => (
            <span key={b} style={{ fontSize: 10, padding: '4px 12px', border: '1px solid rgba(255,255,255,.1)', borderRadius: 100, color: 'rgba(255,255,255,.35)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.06em' }}>
              {b}
            </span>
          ))}
        </div>

      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: 'fadeUp 1s 1.2s both' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,.2)', letterSpacing: '.14em' }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,#5B35D5,transparent)', animation: 'floatBadge 1.6s ease-in-out infinite' }} />
      </div>

    </section>
  )
}

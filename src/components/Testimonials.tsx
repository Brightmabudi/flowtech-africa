'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: 'FlowTech migrated our entire on-premise stack to a hybrid cloud in 28 days with zero production downtime. Their engineers understood our mining operational constraints better than any other vendor we had engaged.',
    name: 'Sipho Nkosi',
    role: 'CTO, Kumba Mining Group',
    initials: 'SN',
    rating: 5,
    tag: 'Cloud Migration',
    color: '#5B35D5',
    metric: { num: '28 days', label: 'Migration Time' },
  },
  {
    quote: 'We switched to FlowTech managed SOC after a ransomware incident. In 18 months they blocked over 2,400 threats and reduced our mean time to respond from 4 hours to under 10 minutes.',
    name: 'Adaeze Okonkwo',
    role: 'Head of IT Security, First Continental Bank',
    initials: 'AO',
    rating: 5,
    tag: 'Cybersecurity',
    color: '#E8401A',
    metric: { num: '2,400+', label: 'Threats Blocked' },
  },
  {
    quote: 'The SD-WAN rollout across our 340 retail stores in South Africa, Botswana, and Namibia was flawless. Connectivity issues that used to cost us R1.2M monthly have essentially disappeared.',
    name: 'Gareth van der Berg',
    role: 'IT Director, Retail Group Africa',
    initials: 'GV',
    rating: 5,
    tag: 'Network',
    color: '#0EA5E9',
    metric: { num: 'R1.2M', label: 'Monthly Savings' },
  },
]

export default function Testimonials() {
  const [active, setActive]         = useState(0)
  const [paused, setPaused]         = useState(false)
  const [direction, setDirection]   = useState(1)
  const [inView, setInView]         = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [allVisible, setAllVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const timersRef   = useRef<ReturnType<typeof setTimeout>[]>([])
  const total = TESTIMONIALS.length

  function startReveal() {
    setVisibleCount(0)
    setAllVisible(false)
    setActive(0)
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    TESTIMONIALS.forEach((_, i) => {
      const t = setTimeout(() => {
        setActive(i)
        setVisibleCount(i + 1)
        if (i === total - 1) {
          const t2 = setTimeout(() => setAllVisible(true), 800)
          timersRef.current.push(t2)
        }
      }, i * 2000)
      timersRef.current.push(t)
    })
  }

  function resetReveal() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setVisibleCount(0)
    setAllVisible(false)
    setActive(0)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          startReveal()
        } else {
          setInView(false)
          resetReveal()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => {
      obs.disconnect()
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  // Auto-rotate after all revealed
  useEffect(() => {
    if (!allVisible || paused) return
    const t = setInterval(() => {
      setDirection(1)
      setActive(p => (p + 1) % total)
    }, 5000)
    return () => clearInterval(t)
  }, [allVisible, paused, total])

  function goTo(idx: number) {
    if (!allVisible) return
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  const t = TESTIMONIALS[active]

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F0EDF8', padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
            // Client Stories
          </span>
          <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-.035em', color: '#0D0720', marginBottom: 14 }}>
            Trusted by Africa Leaders
          </h2>
          <p style={{ fontSize: '1rem', color: '#4A3F6B', maxWidth: 460, margin: '0 auto', lineHeight: 1.8 }}>
            Real outcomes from real enterprises across the continent.
          </p>
        </motion.div>

        {/* Intro sequence label */}
        {inView && !allVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', marginBottom: 24 }}
          >
            <span style={{ fontSize: 11, color: '#6B5F8A', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.1em' }}>
              Showing story {visibleCount} of {total}...
            </span>
          </motion.div>
        )}

        {/* Progress bar — shown during intro */}
        {inView && !allVisible && visibleCount > 0 && (
          <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 3, background: 'rgba(91,53,213,0.1)', borderRadius: 100, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: (visibleCount / total * 100) + '%' }}
                transition={{ duration: 0.4 }}
                style={{ height: '100%', background: 'linear-gradient(90deg,#5B35D5,#E8401A)', borderRadius: 100 }}
              />
            </div>
          </div>
        )}

        {/* Main card */}
        <div style={{ position: 'relative', minHeight: 360 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: allVisible ? direction * 80 : 0, y: allVisible ? 0 : 32, scale: allVisible ? 1 : 0.96 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: allVisible ? direction * -80 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#ffffff', border: '1px solid rgba(91,53,213,0.1)', borderRadius: 24, padding: 'clamp(28px,4vw,48px)', boxShadow: '0 8px 40px rgba(91,53,213,0.1)', position: 'relative', overflow: 'hidden' }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,' + t.color + ',transparent)', borderRadius: '24px 24px 0 0' }} />

              {/* Tag + icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: t.color, fontFamily: 'JetBrains Mono, monospace', background: t.color + '15', padding: '5px 14px', borderRadius: 100, border: '1px solid ' + t.color + '30' }}>
                  {t.tag}
                </span>
                <Quote size={28} style={{ color: t.color, opacity: 0.25 }} />
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {Array(t.rating).fill(0).map((_, i) => (
                  <span key={i} style={{ color: '#F5C842', fontSize: 18 }}>*</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)', color: '#1A0A38', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 32 }}>
                {t.quote}
              </p>

              {/* Author + metric */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, paddingTop: 24, borderTop: '1px solid rgba(91,53,213,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,' + t.color + ',#E8401A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, fontSize: 15, color: 'white', flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0D0720', fontFamily: 'Cabinet Grotesk, sans-serif' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#6B5F8A', marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px 24px', background: t.color + '08', border: '1px solid ' + t.color + '20', borderRadius: 14 }}>
                  <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 900, color: t.color, lineHeight: 1 }}>{t.metric.num}</div>
                  <div style={{ fontSize: 11, color: '#6B5F8A', marginTop: 4 }}>{t.metric.label}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls — only show after all revealed */}
        {allVisible && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 36 }}
          >
            <button
              onClick={() => goTo((active - 1 + total) % total)}
              style={{ width: 44, height: 44, borderRadius: '50%', background: '#ffffff', border: '1px solid rgba(91,53,213,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2D1580', boxShadow: '0 2px 12px rgba(91,53,213,0.08)', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5B35D5'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#ffffff'; (e.currentTarget as HTMLElement).style.color = '#2D1580'; }}
            >
              <ChevronLeft size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <div style={{ width: i === active ? 32 : 8, height: 8, borderRadius: 100, background: i === active ? '#5B35D5' : 'rgba(91,53,213,0.2)', transition: 'all .4s cubic-bezier(.22,1,.36,1)', overflow: 'hidden', position: 'relative' }}>
                    {i === active && !paused && (
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'rgba(255,255,255,0.5)', borderRadius: 100 }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => goTo((active + 1) % total)}
              style={{ width: 44, height: 44, borderRadius: '50%', background: '#ffffff', border: '1px solid rgba(91,53,213,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2D1580', boxShadow: '0 2px 12px rgba(91,53,213,0.08)', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5B35D5'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#ffffff'; (e.currentTarget as HTMLElement).style.color = '#2D1580'; }}
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{ marginTop: 48, background: '#ffffff', border: '1px solid rgba(91,53,213,0.1)', borderRadius: 16, padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, boxShadow: '0 2px 16px rgba(91,53,213,0.06)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex' }}>
              {['SN','AO','GV','TM','KD'].map((init, idx) => (
                <div key={init} style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#5B35D5,#E8401A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: 'white', border: '2px solid white', marginLeft: idx > 0 ? -8 : 0 }}>
                  {init}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0D0720', fontFamily: 'Cabinet Grotesk, sans-serif' }}>500+ Enterprise Clients</div>
              <div style={{ fontSize: 12, color: '#6B5F8A' }}>Across 14 African countries</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[{ num: '4.9/5', label: 'Client Rating' },{ num: '98%', label: 'Retention Rate' },{ num: '28 days', label: 'Avg. Go-Live' }].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: '#2D1580' }}>{num}</div>
                <div style={{ fontSize: 11, color: '#6B5F8A', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
          <a href="#contact" style={{ padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(135deg,#2D1580,#5B35D5)', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: 14, fontFamily: 'Cabinet Grotesk, sans-serif', boxShadow: '0 4px 16px rgba(91,53,213,0.3)' }}>
            Read Case Studies
          </a>
        </motion.div>

      </div>
    </section>
  )
}
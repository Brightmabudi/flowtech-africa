'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart, Target, Flame, Star, CheckCircle, Users, Globe, Award, TrendingUp } from 'lucide-react'

const PILLARS = [
  {
    icon: <Target size={24} />,
    color: '#5B35D5',
    title: 'Our Purpose',
    desc: 'The purpose of FlowTech Africa is to glorify God in everything we do and to serve with integrity, treat you with respect, and put your interest before our bottom line. We believe these values set FlowTech Africa apart from others.',
  },
  {
    icon: <Star size={24} />,
    color: '#E8401A',
    title: 'Our Mission',
    desc: 'FlowTech Africa will continuously improve and grow to be the preferred software development and software solution provider globally.',
  },
  {
    icon: <Flame size={24} />,
    color: '#0EA5E9',
    title: 'Our Passion',
    desc: 'FlowTech Africa is passionate about technology and how it can be used to enrich our clients businesses and internal processes. We believe in digitalisation across entire value chain processes and using digital technology to manage, track and monitor every aspect of business activities.',
  },
  {
    icon: <Heart size={24} />,
    color: '#10B981',
    title: 'Our Experience',
    desc: 'We use the latest and best technology platforms for our clients, and we use our years of experience to apply these technology platforms to our clients environment to optimise every business process and the way they will interact with these technology platforms.',
  },
]

const COMMITMENTS = [
  'Serving with integrity',
  'Treating every client with respect',
  'Putting your interests before our bottom line',
]

const RIGHT_STATS = [
  { icon: <Users size={20} />,    color: '#5B35D5', num: '100+', label: 'Systems Delivered',    sub: 'Across Africa and globally'    },
  { icon: <Globe size={20} />,    color: '#E8401A', num: '20+',  label: 'Years of Experience',  sub: 'Proven ICT expertise'          },
  { icon: <Award size={20} />,    color: '#0EA5E9', num: 'L1',   label: 'B-BBEE Certified',     sub: 'Proudly South African'         },
  { icon: <TrendingUp size={20} />, color: '#10B981', num: '0%', label: 'Licensing Fees',       sub: 'No restrictive costs ever'     },
]

export default function Purpose() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [allVisible, setAllVisible]     = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([])

  function startReveal() {
    setVisibleCount(0)
    setAllVisible(false)
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    PILLARS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === PILLARS.length - 1) {
          const t2 = setTimeout(() => setAllVisible(true), 1000)
          timersRef.current.push(t2)
        }
      }, i * 800)
      timersRef.current.push(t)
    })
  }

  function resetReveal() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setVisibleCount(0)
    setAllVisible(false)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startReveal()
        else resetReveal()
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => {
      obs.disconnect()
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#ffffff', padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Top banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ background: 'linear-gradient(135deg,#08050F,#1A0A38)', borderRadius: 28, overflow: 'hidden', position: 'relative' }}>

            {/* Grid bg */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(91,53,213,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(91,53,213,.07) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Glow orbs */}
            <div style={{ position: 'absolute', top: '10%', left: '20%', width: 240, height: 240, borderRadius: '50%', background: 'rgba(91,53,213,.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 180, height: 180, borderRadius: '50%', background: 'rgba(232,64,26,.1)', filter: 'blur(60px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>

              {/* Left - main message */}
              <div style={{ padding: 'clamp(36px,5vw,64px)', borderRight: '1px solid rgba(255,255,255,.06)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 16, fontFamily: 'JetBrains Mono, monospace' }}>
                  Let Us Be Your Partners
                </span>
                <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, letterSpacing: '-.035em', color: 'white', marginBottom: 20, lineHeight: 1.1 }}>
                  Let Us Be Your{' '}
                  <span style={{ background: 'linear-gradient(90deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Software Solution Partners
                  </span>
                </h2>
                <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.85, marginBottom: 28 }}>
                  At FlowTech Africa, our purpose is to glorify God in everything we do. We believe nothing is possible without God's blessing. That is why we create an environment where our staff can use their God-given gifts and talents to provide innovative solutions that meet your needs.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {COMMITMENTS.map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,.75)', fontWeight: 500 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - stats grid */}
              <div style={{ padding: 'clamp(36px,5vw,64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 4 }}>
                  // Why choose us
                </div>
                {RIGHT_STATS.map(({ icon, color, num, label, sub }) => (
                  <div
                    key={label}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: '16px 20px', transition: 'border-color .3s', cursor: 'default' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(91,53,213,.35)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)')}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '18', border: '1px solid ' + color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 900, background: 'linear-gradient(135deg,' + color + ',#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{num}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'white', marginTop: 3, fontFamily: 'Cabinet Grotesk, sans-serif' }}>{label}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
            Our Foundation
          </span>
          <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-.035em', color: '#0D0720', marginBottom: 14 }}>
            Purpose, Mission, Passion{' '}
            <span style={{ background: 'linear-gradient(90deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              & Experience
            </span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#4A3F6B', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            The values and beliefs that drive everything we do at FlowTech Africa.
          </p>
        </motion.div>

        {/* Progress bar */}
        {visibleCount > 0 && !allVisible && (
          <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 3, background: 'rgba(91,53,213,0.1)', borderRadius: 100, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: (visibleCount / PILLARS.length * 100) + '%' }}
                transition={{ duration: 0.6 }}
                style={{ height: '100%', background: 'linear-gradient(90deg,#5B35D5,#E8401A)', borderRadius: 100 }}
              />
            </div>
            <span style={{ fontSize: 11, color: '#6B5F8A', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap' }}>
              {visibleCount} / {PILLARS.length}
            </span>
          </div>
        )}

        {/* Pillar cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
          {PILLARS.map(({ icon, color, title, desc }, i) => (
            <motion.div
              key={title}
              animate={
                i < visibleCount
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 48, scale: 0.94 }
              }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#F8F5FF', border: '1px solid rgba(91,53,213,.12)', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', cursor: 'default' }}
              whileHover={allVisible ? { y: -6, boxShadow: '0 20px 48px rgba(91,53,213,.12)' } : {}}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,' + color + ',transparent)', borderRadius: '20px 20px 0 0' }} />
              <div style={{ width: 52, height: 52, borderRadius: 16, background: color + '15', border: '1px solid ' + color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 18 }}>
                {icon}
              </div>
              <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#0D0720', marginBottom: 12, letterSpacing: '-.01em' }}>
                {title}
              </div>
              <div style={{ fontSize: '.9rem', color: '#4A3F6B', lineHeight: 1.8 }}>
                {desc}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Award, DollarSign, Monitor } from 'lucide-react'

const STATS = [
  { icon: <Clock size={28} />,      num: 20,  suffix: '+',  label: 'Years in ICT Industry',  sub: 'Proven experience since 2004'         },
  { icon: <Award size={28} />,      num: 1,   suffix: '',   label: 'B-BBEE Certified',        sub: 'Level 1 certified SME'                },
  { icon: <DollarSign size={28} />, num: 0,   suffix: '%',  label: 'Licensing Fees',          sub: 'No restrictive licensing costs ever'  },
  { icon: <Monitor size={28} />,    num: 100, suffix: '+',  label: 'Systems Delivered',       sub: 'Across Africa and globally'           },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount]     = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 25)
    return () => clearInterval(timer)
  }, [started, target])

  return <div ref={ref}>{count}{suffix}</div>
}

export default function Stats() {
  return (
    <section style={{ background: '#F8F5FF', borderTop: '1px solid rgba(91,53,213,.08)', borderBottom: '1px solid rgba(91,53,213,.08)', padding: 'clamp(48px,6vw,80px) clamp(24px,6vw,100px)' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
          {STATS.map(({ icon, num, suffix, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{ background: '#ffffff', border: '1px solid rgba(91,53,213,.1)', borderRadius: 20, padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, boxShadow: '0 2px 16px rgba(91,53,213,.06)', cursor: 'default' }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(91,53,213,.12)' }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(91,53,213,.08)', border: '1px solid rgba(91,53,213,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B35D5' }}>
                {icon}
              </div>
              <div>
                <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '2.8rem', fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <Counter target={num} suffix={suffix} />
                </div>
                <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, color: '#0D0720', fontSize: '1rem', marginTop: 8 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#6B5F8A', marginTop: 4, lineHeight: 1.5 }}>{sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

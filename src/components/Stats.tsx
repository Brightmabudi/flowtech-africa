'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, Wifi, HeadphonesIcon } from 'lucide-react'

const STATS = [
  { icon: <Users size={28} />,          num: 500,  suffix: '+',   label: 'Enterprise Clients',   sub: 'Across 14 African countries'  },
  { icon: <Clock size={28} />,          num: 15,   suffix: '+',   label: 'Years of Excellence',  sub: 'Trusted since 2009'           },
  { icon: <Wifi size={28} />,           num: 99.9, suffix: '%',   label: 'Network Uptime SLA',   sub: 'Guaranteed availability'      },
  { icon: <HeadphonesIcon size={28} />, num: 24,   suffix: '/7',  label: 'Expert Support',       sub: '< 15 min avg response time'   },
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
    const isDecimal = target % 1 !== 0
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current))
    }, 25)
    return () => clearInterval(timer)
  }, [started, target])

  return <div ref={ref}>{count}{suffix}</div>
}

export default function Stats() {
  return (
    <section style={{ background: '#f8f7ff', borderTop: '1px solid rgba(59,31,168,.08)', borderBottom: '1px solid rgba(59,31,168,.08)', padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 24 }}>
          {STATS.map(({ icon, num, suffix, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(59,31,168,.08)',
                borderRadius: 'var(--rl)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 16,
                boxShadow: '0 2px 16px rgba(59,31,168,.06)',
                transition: 'border-color .3s, transform .25s',
              }}
              whileHover={{ y: -4 }}
            >
              <div style={{ color: 'var(--violet)', opacity: .85 }}>{icon}</div>
              <div>
                <div style={{
                  fontFamily: 'Cabinet Grotesk, sans-serif',
                  fontSize: '2.6rem', fontWeight: 900, lineHeight: 1,
                  background: 'linear-gradient(135deg,var(--violet),var(--coral))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  <Counter target={num} suffix={suffix} />
                </div>
                <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, color: '#0D0720', fontSize: '1rem', marginTop: 6 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#6B5F8A', marginTop: 3 }}>{sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

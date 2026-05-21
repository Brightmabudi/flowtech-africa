'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code, HeadphonesIcon, Lightbulb, Settings, ArrowRight } from 'lucide-react'

const SERVICES = [
  { icon: <Code size={24} />,           color: '#5B35D5', title: 'Software Development & Business Solutions', desc: 'Delivering secure, adaptable, and tailor-made software solutions designed to streamline operations, automate workflows, and drive innovation.',           tags: ['Custom Software', 'Automation', 'Integration', 'Secure Design'] },
  { icon: <Lightbulb size={24} />,      color: '#E8401A', title: 'Consulting Services',                       desc: 'Guiding businesses with over 20 years of expertise in process design, change management, and strategic consulting to unlock growth and efficiency.',    tags: ['Process Design', 'Change Management', 'Strategy', 'Growth']      },
  { icon: <Settings size={24} />,       color: '#0EA5E9', title: 'Training Services',                         desc: 'Empowering teams through customized training programs that blend theory with practice, enabling staff to work smarter, faster, and more effectively.', tags: ['Team Training', 'Theory & Practice', 'Upskilling', 'Enablement']  },
  { icon: <HeadphonesIcon size={24} />, color: '#10B981', title: 'Support',                                    desc: 'Providing proactive IT support and ongoing assistance to ensure business continuity, minimize downtime, and keep systems running at peak performance.',  tags: ['Proactive Support', 'Business Continuity', 'Uptime', 'Assistance'] },
]

export default function ValueProp() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [allVisible, setAllVisible]     = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([])

  function startReveal() {
    setVisibleCount(0)
    setAllVisible(false)
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    SERVICES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === SERVICES.length - 1) {
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
    return () => { obs.disconnect(); timersRef.current.forEach(clearTimeout) }
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#F0EDF8', padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
            Our Value Proposition
          </span>
          <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-.035em', color: '#0D0720', marginBottom: 16 }}>
            Built Around{' '}
            <span style={{ background: 'linear-gradient(90deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Your Business</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#4A3F6B', maxWidth: 620, margin: '0 auto 48px', lineHeight: 1.8 }}>
            FlowTech offers custom software developed to suit a company goals, needs, and requirements. We emphasize adaptability, secure design, ease of integration and automation, and ongoing support.
          </p>
        </motion.div>

        {visibleCount > 0 && !allVisible && (
          <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 3, background: 'rgba(91,53,213,0.1)', borderRadius: 100, overflow: 'hidden' }}>
              <motion.div animate={{ width: (visibleCount / SERVICES.length * 100) + '%' }} transition={{ duration: 0.6 }} style={{ height: '100%', background: 'linear-gradient(90deg,#5B35D5,#E8401A)', borderRadius: 100 }} />
            </div>
            <span style={{ fontSize: 11, color: '#6B5F8A', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap' }}>{visibleCount} / {SERVICES.length}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginBottom: 48 }}>
          {SERVICES.map(({ icon, color, title, desc, tags }, i) => (
            <motion.div key={title}
              animate={ i < visibleCount ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.94 } }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#ffffff', border: '1px solid rgba(91,53,213,.1)', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', boxShadow: '0 2px 16px rgba(91,53,213,.06)', cursor: 'default' }}
              whileHover={allVisible ? { y: -6, boxShadow: '0 20px 48px rgba(91,53,213,.12)' } : {}}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,' + color + ',transparent)', borderRadius: '20px 20px 0 0' }} />
              <div style={{ width: 52, height: 52, borderRadius: 16, background: color + '15', border: '1px solid ' + color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 18 }}>{icon}</div>
              <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.05rem', fontWeight: 800, color: '#0D0720', marginBottom: 10, letterSpacing: '-.01em', lineHeight: 1.3 }}>{title}</div>
              <div style={{ fontSize: '.88rem', color: '#4A3F6B', lineHeight: 1.75, marginBottom: 18 }}>{desc}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
                {tags.map(t => (
                  <span key={t} style={{ fontSize: 10, padding: '3px 10px', background: color + '10', border: '1px solid ' + color + '22', borderRadius: 100, color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#5B35D5', fontWeight: 700, textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.gap = '9px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '5px')}
              >
                Learn more <ArrowRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>

        {allVisible && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: 'linear-gradient(135deg,#2D1580,#5B35D5)', borderRadius: 20, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, boxShadow: '0 8px 32px rgba(91,53,213,.3)' }}>
            <div>
              <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.2rem', fontWeight: 900, color: 'white', marginBottom: 6, letterSpacing: '-.02em' }}>We have structured our company to provide both business-solutions and services-solutions</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>From strategy through deployment - one trusted partner for your entire digital journey.</div>
            </div>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'white', color: '#2D1580', textDecoration: 'none', fontWeight: 700, fontSize: 14, fontFamily: 'Cabinet Grotesk, sans-serif', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Talk to Us <ArrowRight size={14} />
            </a>
          </motion.div>
        )}

      </div>
    </section>
  )
}
'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Lightbulb, Code, HeadphonesIcon, ArrowRight } from 'lucide-react'

const SOLUTIONS = [
  { icon: <Code size={24} />,           color: '#5B35D5', title: 'Software Development & Business Solutions', desc: 'Delivering secure, adaptable, and tailor-made software solutions designed to streamline operations, automate workflows, and drive innovation.', tags: ['Custom Software', 'Automation', 'Integration', 'Secure Design'] },
  { icon: <Lightbulb size={24} />,      color: '#E8401A', title: 'Consulting Services',                       desc: 'Guiding businesses with over 20 years of expertise in process design, change management, and strategic consulting to unlock growth and efficiency.', tags: ['Process Design', 'Change Management', 'Strategy', 'Growth'] },
  { icon: <GraduationCap size={24} />,  color: '#0EA5E9', title: 'Training Services',                         desc: 'Empowering teams through customized training programs that blend theory with practice, enabling staff to work smarter, faster, and more effectively.', tags: ['Team Training', 'Theory & Practice', 'Upskilling', 'Enablement'] },
  { icon: <HeadphonesIcon size={24} />, color: '#10B981', title: 'Support',                                    desc: 'Providing proactive IT support and ongoing assistance to ensure business continuity, minimize downtime, and keep systems running at peak performance.', tags: ['Proactive Support', 'Business Continuity', 'Uptime', 'Assistance'] },
]

export default function SolutionsDriven() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [allVisible, setAllVisible]     = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([])

  function startReveal() {
    setVisibleCount(0)
    setAllVisible(false)
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    SOLUTIONS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === SOLUTIONS.length - 1) {
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
    <section ref={sectionRef} style={{ background: '#F0EDF8', padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center', marginBottom: 64 }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
              A Solutions Driven Company
            </span>
            <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-.035em', color: '#0D0720', marginBottom: 16, lineHeight: 1.05 }}>
              Understanding You{' '}
              <span style={{ background: 'linear-gradient(90deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Before We Build
              </span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#4A3F6B', lineHeight: 1.85 }}>
              FlowTech Africa is a solutions driven company. We believe in understanding our client requirements first, which only then, we propose a suitable solution. We have structured our company in such a way, that we provide various product-solutions as well as services-solutions.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '01', label: 'Understand your requirements', color: '#5B35D5' },
              { step: '02', label: 'Propose a suitable solution',  color: '#E8401A' },
              { step: '03', label: 'Deliver and support long-term', color: '#10B981' },
            ].map(({ step, label, color }, i) => (
              <motion.div key={step} initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.7, delay: i * 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#ffffff', border: '1px solid rgba(91,53,213,.1)', borderRadius: 14, padding: '18px 22px', boxShadow: '0 2px 12px rgba(91,53,213,.06)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: color + '15', border: '1px solid ' + color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700, color, flexShrink: 0 }}>{step}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0D0720', fontFamily: 'Cabinet Grotesk, sans-serif' }}>{label}</div>
                <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: color }} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {visibleCount > 0 && !allVisible && (
          <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 3, background: 'rgba(91,53,213,0.1)', borderRadius: 100, overflow: 'hidden' }}>
              <motion.div animate={{ width: (visibleCount / SOLUTIONS.length * 100) + '%' }} transition={{ duration: 0.6 }} style={{ height: '100%', background: 'linear-gradient(90deg,#5B35D5,#E8401A)', borderRadius: 100 }} />
            </div>
            <span style={{ fontSize: 11, color: '#6B5F8A', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap' }}>{visibleCount} / {SOLUTIONS.length}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {SOLUTIONS.map(({ icon, color, title, desc, tags }, i) => (
            <motion.div key={title}
              animate={ i < visibleCount ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.94 } }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#ffffff', border: '1px solid rgba(91,53,213,.1)', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', cursor: 'default', boxShadow: '0 2px 16px rgba(91,53,213,.06)' }}
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
            style={{ marginTop: 48, background: 'linear-gradient(135deg,#2D1580,#5B35D5)', borderRadius: 20, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, boxShadow: '0 8px 32px rgba(91,53,213,.3)' }}>
            <div>
              <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.2rem', fontWeight: 900, color: 'white', marginBottom: 6, letterSpacing: '-.02em' }}>Ready to find the right solution for your business?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>Let us understand your requirements first - then we will propose what fits best.</div>
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
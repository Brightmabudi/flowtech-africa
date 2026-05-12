'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Shield, Settings, Network, BarChart3, Lightbulb, ArrowRight } from 'lucide-react'

const SERVICES = [
  { num: '01', icon: 'Cloud',     color: '#5B35D5', title: 'Cloud Infrastructure',        desc: 'Scalable, resilient cloud environments built for African bandwidth realities - hybrid, multi-cloud, or full-cloud migration.',                                                          tags: ['AWS', 'Azure', 'GCP', 'Private Cloud']         },
  { num: '02', icon: 'Shield',    color: '#E8401A', title: 'Cybersecurity',                desc: 'Enterprise-grade protection: SOC-as-a-Service, threat intelligence, zero-trust architecture, and 24/7 incident response.',                                                            tags: ['SOC', 'Zero Trust', 'SIEM', 'Pen Testing']     },
  { num: '03', icon: 'Settings',  color: '#0EA5E9', title: 'Managed IT Services',          desc: 'Full-stack IT operations management - monitoring, patching, helpdesk, and lifecycle management so your team can focus on growth.',                                                     tags: ['NOC', 'Remote Support', 'ITSM', 'Monitoring']  },
  { num: '04', icon: 'Network',   color: '#10B981', title: 'Network & Connectivity',       desc: 'High-performance SD-WAN, MPLS, and fibre connectivity across 14 African countries with guaranteed SLAs.',                                                                             tags: ['SD-WAN', 'MPLS', 'Fibre', '5G Ready']          },
  { num: '05', icon: 'BarChart3', color: '#F5C842', title: 'Data & Analytics',             desc: 'Turn raw data into strategic decisions. BI dashboards, data lakes, real-time analytics, and AI-powered insights.',                                                                     tags: ['Power BI', 'Databricks', 'SQL', 'AI/ML']       },
  { num: '06', icon: 'Lightbulb', color: '#5B35D5', title: 'Digital Transformation',       desc: 'End-to-end enablement - from process automation and ERP modernisation to mobile-first workforce solutions.',                                                                          tags: ['RPA', 'ERP', 'Low-Code', 'Change Mgmt']        },
]

const ICONS: Record<string, React.ReactNode> = {
  Cloud:     <Cloud size={28} />,
  Shield:    <Shield size={28} />,
  Settings:  <Settings size={28} />,
  Network:   <Network size={28} />,
  BarChart3: <BarChart3 size={28} />,
  Lightbulb: <Lightbulb size={28} />,
}

export default function Services() {
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
    return () => {
      obs.disconnect()
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <section id="services" ref={sectionRef} style={{ background: '#ffffff', padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }} style={{ marginBottom: 56 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
            // What We Do
          </span>
          <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-.035em', color: '#0D0720', marginBottom: 14 }}>
            Enterprise Services.{' '}
            <span style={{ background: 'linear-gradient(90deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>African Scale.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#4A3F6B', maxWidth: 520, lineHeight: 1.8 }}>
            Six core pillars covering every dimension of modern ICT - delivered with local expertise and global standards.
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
          {SERVICES.map(({ num, icon, color, title, desc, tags }, i) => (
            <motion.div
              key={num}
              animate={ i < visibleCount ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.94 } }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#F8F5FF', border: '1px solid rgba(91,53,213,0.12)', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', cursor: 'default' }}
              whileHover={allVisible ? { y: -6, boxShadow: '0 20px 48px rgba(91,53,213,0.14)' } : {}}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,' + color + ',transparent)', borderRadius: '20px 20px 0 0' }} />
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(91,53,213,0.3)', letterSpacing: '.1em', marginBottom: 18 }}>{num} -</div>
              <div style={{ color, marginBottom: 14 }}>{ICONS[icon]}</div>
              <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.05rem', fontWeight: 800, color: '#0D0720', marginBottom: 10, letterSpacing: '-.01em' }}>{title}</div>
              <div style={{ fontSize: '.88rem', color: '#4A3F6B', lineHeight: 1.7, marginBottom: 16 }}>{desc}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
                {tags.map(t => (
                  <span key={t} style={{ fontSize: 10, padding: '3px 10px', background: color + '12', border: '1px solid ' + color + '25', borderRadius: 100, color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#5B35D5', fontWeight: 700, textDecoration: 'none' }}>
                Learn more <ArrowRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>

        {allVisible && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ marginTop: 48, textAlign: 'center' }}>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 12, background: 'linear-gradient(135deg,#2D1580,#5B35D5)', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: 15, fontFamily: 'Cabinet Grotesk, sans-serif', boxShadow: '0 4px 20px rgba(91,53,213,0.3)' }}>
              Explore All Services <ArrowRight size={16} />
            </a>
          </motion.div>
        )}

      </div>
    </section>
  )
}
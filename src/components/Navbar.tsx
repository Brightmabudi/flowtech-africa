'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Services',  href: '#services'  },
  { label: 'About',     href: '#about'     },
  { label: 'Contact',   href: '#contact'   },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500, background: '#ffffff', borderBottom: '1px solid rgba(91,53,213,0.1)', boxShadow: scrolled ? '0 4px 24px rgba(91,53,213,0.08)' : 'none', transition: 'box-shadow .3s' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between" style={{ height: scrolled ? '64px' : '72px', transition: 'height .3s' }}>

        {/* Logo */}
        <a href="#" className="flex items-center group" style={{ textDecoration: 'none' }}>
          <Image src="/logo.png" alt="FlowTech Africa" width={160} height={48} style={{ objectFit: 'contain', height: '38px', width: 'auto' }} priority />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center" style={{ gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
          {LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href}
                style={{ fontSize: 14, fontWeight: 600, color: '#1A0A38', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#5B35D5')}
                onMouseLeave={e => (e.currentTarget.style.color = '#1A0A38')}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center" style={{ gap: 12 }}>
          <a href="#contact"
            style={{ fontSize: 13, fontWeight: 500, color: '#4A3F6B', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#5B35D5')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4A3F6B')}>
            Talk to us
          </a>
          <a href="#contact"
            style={{ fontSize: 13, fontWeight: 700, padding: '10px 22px', background: 'linear-gradient(135deg,#2D1580,#5B35D5)', color: 'white', borderRadius: 10, textDecoration: 'none', boxShadow: '0 4px 16px rgba(91,53,213,0.3)', transition: 'opacity .2s, transform .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '.9'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(v => !v)}
          style={{ background: 'none', border: 'none', color: '#1A0A38', cursor: 'pointer', padding: 8 }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', borderTop: '1px solid rgba(91,53,213,0.1)', background: '#ffffff', boxShadow: '0 8px 32px rgba(91,53,213,0.08)' }}
            className="lg:hidden"
          >
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {LINKS.map(l => (
                <a key={l.label} href={l.href}
                   onClick={() => setMobileOpen(false)}
                   style={{ color: '#1A0A38', textDecoration: 'none', fontWeight: 600, fontSize: 15, padding: '12px 0', borderBottom: '1px solid rgba(91,53,213,.08)' }}>
                  {l.label}
                </a>
              ))}
              <a href="#contact"
                style={{ textAlign: 'center', marginTop: 12, padding: '12px 24px', background: 'linear-gradient(135deg,#2D1580,#5B35D5)', color: 'white', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}
                onClick={() => setMobileOpen(false)}>
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Award } from 'lucide-react'

const INFO = [
  {
    icon: <MapPin size={15} />,
    title: 'HEAD OFFICE',
    body: 'Boardwalk Lakeside Suites, Phase 02, Block G, Suite G01\n107 Haymeadow Street, Faerie Glen, 0043',
  },
  {
    icon: <Phone size={15} />,
    title: 'PHONE',
    body: '012 881 1930',
  },
  {
    icon: <Mail size={15} />,
    title: 'EMAIL',
    body: 'michellef@flowtech.africa',
  },
  {
    icon: <Clock size={15} />,
    title: 'SUPPORT',
    body: '24/7 NOC & Helpdesk\nRound-the-clock human support',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" style={{ background: '#F0EDF8', padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
            // Get In Touch
          </span>
          <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-.035em', color: '#0D0720', marginBottom: 14 }}>
            Let us Build Something{' '}
            <span style={{ background: 'linear-gradient(90deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Extraordinary
            </span>
          </h2>

          {/* Company intro */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 12, background: 'rgba(91,53,213,.08)', border: '1px solid rgba(91,53,213,.15)', marginTop: 8 }}>
            <Award size={16} style={{ color: '#5B35D5', flexShrink: 0 }} />
            <p style={{ fontSize: 14, color: '#2D1580', fontWeight: 600, lineHeight: 1.5 }}>
              FlowTech Africa is a proudly South African company and has been in the ICT Industry for over 20 years.
            </p>
          </div>
        </motion.div>

        <div className="contact-layout">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: '.95rem', color: '#4A3F6B', lineHeight: 1.8, marginBottom: 28 }}>
              Whether you need a quick quote, a full solution design, or just want to understand what is possible
              for your organisation — our team is here and ready to help.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {INFO.map(({ icon, title, body }) => (
                <div
                  key={title}
                  style={{ background: '#ffffff', border: '1px solid rgba(91,53,213,.1)', borderRadius: 14, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: '0 2px 12px rgba(91,53,213,.06)', transition: 'border-color .3s, transform .25s', cursor: 'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,53,213,.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,53,213,.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg,rgba(45,21,128,.12),rgba(232,64,26,.08))', border: '1px solid rgba(91,53,213,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B35D5' }}>
                    {icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 10, fontWeight: 700, color: '#E8401A', marginBottom: 5, letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
                      {title}
                    </h4>
                    <p style={{ fontSize: 13, color: '#2D1A4A', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{ marginTop: 20, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(91,53,213,.1)', height: 160, background: 'linear-gradient(135deg,#F0EDF8,#E8E4F4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <MapPin size={20} style={{ color: '#5B35D5' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0D0720', fontFamily: 'Cabinet Grotesk, sans-serif' }}>Faerie Glen, Pretoria</div>
                <div style={{ fontSize: 11, color: '#6B5F8A' }}>Boardwalk Lakeside Suites, Suite G01</div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{ background: '#ffffff', border: '1px solid rgba(91,53,213,.1)', borderRadius: 20, padding: 'clamp(28px,4vw,48px)', boxShadow: '0 4px 24px rgba(91,53,213,.08)' }}>
              <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 900, color: '#0D0720', marginBottom: 28, letterSpacing: '-.02em' }}>
                Send us a message
              </div>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(13,7,32,.4)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>First Name</label>
                    <input type="text" placeholder="Sipho" required style={{ padding: '12px 16px', border: '1px solid rgba(91,53,213,.15)', borderRadius: 10, fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', color: '#0D0720', background: '#F8F5FF', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(13,7,32,.4)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>Last Name</label>
                    <input type="text" placeholder="Nkosi" required style={{ padding: '12px 16px', border: '1px solid rgba(91,53,213,.15)', borderRadius: 10, fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', color: '#0D0720', background: '#F8F5FF', outline: 'none' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(13,7,32,.4)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>Work Email</label>
                  <input type="email" placeholder="sipho@company.co.za" required style={{ padding: '12px 16px', border: '1px solid rgba(91,53,213,.15)', borderRadius: 10, fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', color: '#0D0720', background: '#F8F5FF', outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(13,7,32,.4)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>Company Size</label>
                    <select style={{ padding: '12px 16px', border: '1px solid rgba(91,53,213,.15)', borderRadius: 10, fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', color: '#4A3F6B', background: '#F8F5FF', outline: 'none' }}>
                      <option>1 - 50 employees</option>
                      <option>51 - 200 employees</option>
                      <option>201 - 1000 employees</option>
                      <option>1000+ employees</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(13,7,32,.4)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>Service Interest</label>
                    <select style={{ padding: '12px 16px', border: '1px solid rgba(91,53,213,.15)', borderRadius: 10, fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', color: '#4A3F6B', background: '#F8F5FF', outline: 'none' }}>
                      <option>Cloud Infrastructure</option>
                      <option>Cybersecurity / SOC</option>
                      <option>Managed IT Services</option>
                      <option>Network & Connectivity</option>
                      <option>Data & Analytics</option>
                      <option>Digital Transformation</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(13,7,32,.4)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>Message</label>
                  <textarea placeholder="Tell us about your challenge or project..." style={{ padding: '12px 16px', border: '1px solid rgba(91,53,213,.15)', borderRadius: 10, fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', color: '#0D0720', background: '#F8F5FF', outline: 'none', resize: 'vertical', minHeight: 120 }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg,#2D1580,#5B35D5)', color: 'white', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cabinet Grotesk, sans-serif', boxShadow: '0 4px 20px rgba(91,53,213,.3)', transition: 'opacity .2s, transform .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '.9'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  Send Message
                </button>
                {sent && (
                  <div style={{ display: 'block', padding: 14, marginTop: 14, background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.25)', borderRadius: 10, color: '#10B981', fontSize: 13, fontWeight: 500, textAlign: 'center' }}>
                    Message sent! A FlowTech consultant will reach out within one business day.
                  </div>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
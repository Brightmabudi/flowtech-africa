'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Award, Loader2 } from 'lucide-react'

const INFO = [
  { icon: <MapPin size={15} />, title: 'HEAD OFFICE', body: 'Unit 3, Boardwalk office park\n107 Boardwalk Blvd, Faerie Glen, Pretoria, 0034' },
  { icon: <Phone size={15} />, title: 'PHONE',        body: '012 881 1930' },
  { icon: <Mail size={15} />,  title: 'EMAIL',         body: 'michellef@flowtech.africa' },
  { icon: <Clock size={15} />, title: 'SUPPORT',       body: '24/7 NOC & Helpdesk\nRound-the-clock human support' },
]

const inputStyle: React.CSSProperties = { padding: '12px 16px', border: '1px solid rgba(91,53,213,.15)', borderRadius: 10, fontSize: 14, fontFamily: 'Instrument Sans, sans-serif', color: '#0D0720', background: '#F8F5FF', outline: 'none', width: '100%', boxSizing: 'border-box' }
const labelStyle: React.CSSProperties = { fontSize: 10, fontWeight: 700, color: 'rgba(13,7,32,.4)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }
const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', companySize: '1 - 50 employees', service: 'Cloud Infrastructure', message: '' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) setSent(true)
      else setError('Failed to send. Please email us directly at michellef@flowtech.africa')
    } catch {
      setError('Failed to send. Please email us directly at michellef@flowtech.africa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" style={{ background: '#F0EDF8', padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.55 }} style={{ marginBottom: 56 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
            Get In Touch
          </span>
          <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-.035em', color: '#0D0720', marginBottom: 14 }}>
            Let us Build Something{' '}
            <span style={{ background: 'linear-gradient(90deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Extraordinary</span>
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 12, background: 'rgba(91,53,213,.08)', border: '1px solid rgba(91,53,213,.15)', marginTop: 8 }}>
            <Award size={16} style={{ color: '#5B35D5', flexShrink: 0 }} />
            <p style={{ fontSize: 14, color: '#2D1580', fontWeight: 600, lineHeight: 1.5 }}>
              FlowTech Africa is a proudly South African company with over 20 years in the ICT Industry.
            </p>
          </div>
        </motion.div>

        <div className="contact-layout">

          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: '.95rem', color: '#4A3F6B', lineHeight: 1.8, marginBottom: 28 }}>
              Whether you need a quick quote, a full solution design, or just want to understand what is possible for your organisation - our team is here.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {INFO.map(({ icon, title, body }) => (
                <div key={title}
                  style={{ background: '#ffffff', border: '1px solid rgba(91,53,213,.1)', borderRadius: 14, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: '0 2px 12px rgba(91,53,213,.06)', transition: 'border-color .3s, transform .25s', cursor: 'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,53,213,.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,53,213,.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg,rgba(45,21,128,.12),rgba(232,64,26,.08))', border: '1px solid rgba(91,53,213,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B35D5' }}>
                    {icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 10, fontWeight: 700, color: '#E8401A', marginBottom: 5, letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>{title}</h4>
                    <p style={{ fontSize: 13, color: '#2D1A4A', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(91,53,213,.15)', boxShadow: '0 4px 20px rgba(91,53,213,.08)' }}>
              <iframe
                title="FlowTech Africa office location"
                src="https://maps.google.com/maps?q=Unit+3+Boardwalk+Office+Park+107+Boardwalk+Blvd+Faerie+Glen+Pretoria+0034+South+Africa&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{ display: 'block', border: 'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com/maps?q=Unit+3+Boardwalk+Office+Park+107+Boardwalk+Blvd+Faerie+Glen+Pretoria+0034+South+Africa"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#ffffff', borderTop: '1px solid rgba(91,53,213,.1)', textDecoration: 'none', transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(91,53,213,.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
              >
                <MapPin size={14} style={{ color: '#5B35D5', flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#5B35D5' }}>Get Directions</span>
                <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>Unit 3, Boardwalk office park · Faerie Glen, Pretoria</span>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ background: '#ffffff', border: '1px solid rgba(91,53,213,.1)', borderRadius: 20, padding: 'clamp(28px,4vw,48px)', boxShadow: '0 4px 24px rgba(91,53,213,.08)' }}>
              <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 900, color: '#0D0720', marginBottom: 28, letterSpacing: '-.02em' }}>
                Send us a message
              </div>

              {sent ? (
                <div style={{ padding: 32, textAlign: 'center', background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.2)', borderRadius: 14 }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: '#0D0720', marginBottom: 8 }}>Message Sent!</div>
                  <p style={{ fontSize: 14, color: '#4A3F6B', lineHeight: 1.7 }}>A FlowTech consultant will contact you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>First Name</label>
                      <input type="text" placeholder="Sipho" required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Last Name</label>
                      <input type="text" placeholder="Nkosi" required value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} style={inputStyle} />
                    </div>
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Work Email</label>
                    <input type="email" placeholder="sipho@company.co.za" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Cell Phone Number</label>
                    <input type="tel" placeholder="+27 xx xxx xxxx" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Company Size</label>
                      <select value={form.companySize} onChange={e => setForm({ ...form, companySize: e.target.value })} style={{ ...inputStyle, color: '#4A3F6B' }}>
                        <option>1 - 50 employees</option>
                        <option>51 - 200 employees</option>
                        <option>201 - 1000 employees</option>
                        <option>1000+ employees</option>
                      </select>
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Service Interest</label>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle, color: '#4A3F6B' }}>
                        <option>Cloud Infrastructure</option>
                        <option>Cybersecurity / SOC</option>
                        <option>Managed IT Services</option>
                        <option>Network & Connectivity</option>
                        <option>Data & Analytics</option>
                        <option>Digital Transformation</option>
                        <option>Software Development</option>
                        <option>Consulting Services</option>
                        <option>Training Services</option>
                        <option>Support</option>
                      </select>
                    </div>
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Message</label>
                    <textarea placeholder="Tell us about your challenge or project..." required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }} />
                  </div>
                  {error && (
                    <div style={{ padding: 14, marginBottom: 14, background: 'rgba(232,64,26,.08)', border: '1px solid rgba(232,64,26,.2)', borderRadius: 10, color: '#E8401A', fontSize: 13 }}>
                      {error}
                    </div>
                  )}
                  <button type="submit" disabled={loading}
                    style={{ width: '100%', padding: 14, background: loading ? 'rgba(91,53,213,.5)' : 'linear-gradient(135deg,#2D1580,#5B35D5)', color: 'white', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Cabinet Grotesk, sans-serif', boxShadow: '0 4px 20px rgba(91,53,213,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.opacity = '.9'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
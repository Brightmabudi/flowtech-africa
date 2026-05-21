'use client'
import Image from 'next/image'

const COLS = [
  {
    heading: 'Solutions',
    links: ['Cloud Infrastructure','Cybersecurity','Managed Services','Network & Connectivity','Data & Analytics','Digital Transformation'],
  },
  {
    heading: 'Company',
    links: ['About Us','Leadership','Careers','News & Insights','Partners','Certifications'],
  },
  {
    heading: 'Support',
    links: ['Client Portal','Documentation','Status Page','Contact Support','SLA Overview','Training'],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#08050F', borderTop: '1px solid rgba(255,255,255,.06)', padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,100px) clamp(24px,3vw,40px)', overflowX: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(28px,4vw,56px)', marginBottom: 'clamp(32px,4vw,56px)' }}>

          {/* Brand */}
          <div>
            <Image src="/logo.png" alt="FlowTech Africa" width={140} height={42} style={{ objectFit: 'contain', height: '38px', width: 'auto', marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', lineHeight: 1.8, marginBottom: 16 }}>
              A proudly South African ICT company with over 20 years of experience — powering enterprise digital transformation across Africa.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', lineHeight: 1.6 }}>
                Boardwalk Lakeside Suites, Phase 02, Block G, Suite G01, 107 Haymeadow Street, Faerie Glen, 0043
              </span>
              <a href="tel:0128811930" style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#5B35D5')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.35)')}>
                012 881 1930
              </a>
              <a href="mailto:michellef@flowtech.africa" style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8401A')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.35)')}>
                michellef@flowtech.africa
              </a>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['ISO 27001','COBIT 5','B-BBEE L1'].map(b => (
                <span key={b} style={{ fontSize: 10, padding: '3px 10px', border: '1px solid rgba(255,255,255,.1)', borderRadius: 100, color: 'rgba(255,255,255,.3)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h5 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#E8401A', marginBottom: 16, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>
                {heading}
              </h5>
              {links.map(l => (
                <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.35)')}>
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 24, flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.2)', fontFamily: 'JetBrains Mono, monospace' }}>
            2025 FlowTech Africa (Pty) Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {['Privacy Policy','Terms of Service','POPIA Notice'].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,.2)', textDecoration: 'none', transition: 'color .2s', fontFamily: 'JetBrains Mono, monospace' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8401A')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.2)')}>
                {l}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
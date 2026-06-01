'use client'
import Image from 'next/image'
import Link from 'next/link'

const COLS = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Cloud Infrastructure',    href: '#' },
      { label: 'Cybersecurity',           href: '#' },
      { label: 'Managed Services',        href: '#' },
      { label: 'Network & Connectivity',  href: '#' },
      { label: 'Data & Analytics',        href: '#' },
      { label: 'Digital Transformation',  href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',        href: '#'        },
      { label: 'Leadership',      href: '#'        },
      { label: 'Careers',         href: '/careers' },
      { label: 'News & Insights', href: '#'        },
      { label: 'Partners',        href: '#'        },
      { label: 'Certifications',  href: '#'        },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Client Portal',    href: '/portal' },
      { label: 'Documentation',    href: '#' },
      { label: 'Status Page',      href: '#' },
      { label: 'Contact Support',  href: '#' },
      { label: 'SLA Overview',     href: '#' },
      { label: 'Training',         href: '#' },
    ],
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
                Unit 3, Boardwalk office park, 107 Boardwalk Blvd, Faerie Glen, Pretoria, 0034
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
              {links.map(({ label, href }) =>
                href.startsWith('/') ? (
                  <Link key={label} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.35)')}>
                    {label}
                  </Link>
                ) : (
                  <a key={label} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.35)')}>
                    {label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 24, flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.2)', fontFamily: 'JetBrains Mono, monospace' }}>
            {new Date().getFullYear()} FlowTech Africa (Pty) Ltd. All rights reserved.
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
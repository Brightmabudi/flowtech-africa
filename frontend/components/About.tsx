'use client'
import { motion } from 'framer-motion'
import { CheckCircle, Award, Globe, Zap, Heart, Shield, Cloud, Database, Cpu, Network, Lock, BarChart3 } from 'lucide-react'

const BULLETS = [
  'Level 1 B-BBEE certified SME committed to transformation',
  'Over 20 years of proven ICT experience across Africa',
  'Own cutting-edge Digital Business Systems with no licensing fees',
  'Trusted Partner to leading software OEMs globally',
  'Secure global delivery platform for advanced digital technologies',
  'Client-first approach - we understand your business before building',
]

const STATS = [
  { n: '20+', l: 'Years Experience'   },
  { n: 'L1',  l: 'B-BBEE Certified'  },
  { n: '100+',l: 'Systems Delivered' },
  { n: '0',   l: 'Licensing Fees'    },
]

const VALUES = [
  { icon: <Heart size={22} />,  color: '#E8401A', title: 'Client-First',      desc: 'We spend time understanding your business and challenges before proposing any solution.' },
  { icon: <Zap size={22} />,    color: '#5B35D5', title: 'Innovation',        desc: 'Cutting-edge Digital Business Systems that are flexible, scalable, and license-free.' },
  { icon: <Globe size={22} />,  color: '#0EA5E9', title: 'Global Reach',      desc: 'We deliver advanced digital technologies globally through our secure platform.' },
  { icon: <Award size={22} />,  color: '#10B981', title: 'Proven Excellence', desc: 'Over two decades of measurable impact and long-term value for our clients.' },
]

const TECH_ICONS = [
  { icon: <Cloud size={22} />,     color: '#5B35D5', label: 'Cloud',      top: '12%',   left: '8%'   },
  { icon: <Shield size={22} />,    color: '#E8401A', label: 'Security',   top: '25%',   right: '6%'  },
  { icon: <Database size={22} />,  color: '#0EA5E9', label: 'Data',       bottom: '30%',left: '5%'   },
  { icon: <Cpu size={22} />,       color: '#10B981', label: 'AI',         top: '55%',   right: '8%'  },
  { icon: <Network size={22} />,   color: '#F5C842', label: 'Network',    bottom: '15%',right: '5%'  },
  { icon: <Lock size={22} />,      color: '#5B35D5', label: 'Zero Trust', top: '70%',   left: '7%'   },
  { icon: <BarChart3 size={22} />, color: '#E8401A', label: 'Analytics',  top: '40%',   left: '3%'   },
]

export default function About() {
  return (
    <section id="about" style={{ background: '#ffffff' }}>

      {/* Hero Banner */}
      <div style={{ position: 'relative', height: 'clamp(280px,35vw,440px)', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1400&q=80&auto=format" alt="Digital transformation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(8,5,15,.85) 0%,rgba(45,21,128,.7) 50%,rgba(232,64,26,.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 clamp(24px,6vw,100px)' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 16, fontFamily: 'JetBrains Mono, monospace' }}>About FlowTech Africa</span>
            <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'white', marginBottom: 16, lineHeight: 1 }}>Digital Business Transformation</h2>
            <p style={{ fontSize: 'clamp(.95rem,1.5vw,1.1rem)', color: 'rgba(255,255,255,.65)', maxWidth: 680, margin: '0 auto', lineHeight: 1.8, fontStyle: 'italic' }}>
              Every valley shall be exalted, and every mountain and hill shall be made low: and the crooked shall be made straight, and the rough places plain.
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginTop: 8, fontFamily: 'JetBrains Mono, monospace' }}>Isaiah 40:4</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: 'clamp(64px,8vw,112px) clamp(24px,6vw,100px)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Two col intro */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center', marginBottom: 'clamp(64px,8vw,100px)' }}>
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.65 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 16, fontFamily: 'JetBrains Mono, monospace' }}>Who We Are</span>
              <h3 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 900, letterSpacing: '-.03em', color: '#0D0720', marginBottom: 20, lineHeight: 1.1 }}>A specialist development company with over 20 years of ICT experience</h3>
              <p style={{ fontSize: '.95rem', color: '#4A3F6B', lineHeight: 1.85, marginBottom: 14 }}>Flowtech Africa is a specialist development company with over 20 years of ICT experience. As a Level 1 B-BBEE certified SME, we focus on delivering innovative solutions and sustainable value, while building long-term relationships with our clients.</p>
              <p style={{ fontSize: '.95rem', color: '#4A3F6B', lineHeight: 1.85, marginBottom: 24 }}>We deliver advanced digital technologies globally through our secure platform. As a trusted Partner to leading software OEMs, we also provide our own Digital Business Systems Platforms, designed to be cost-effective, cutting-edge, and completely free from restrictive licensing fees.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {BULLETS.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckCircle size={16} style={{ color: '#5B35D5', marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#2D1A4A', lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Level 1 B-BBEE','ISO 27001','ISO 9001','COBIT 5','ITIL v4'].map(c => (
                  <span key={c} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', background: '#F0EDF8', border: '1px solid rgba(91,53,213,.15)', borderRadius: 100, fontSize: 11, fontWeight: 700, color: '#5B35D5' }}>
                    <Award size={10} /> {c}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.65, delay: 0.1 }}>
              <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 60px rgba(91,53,213,.15)', marginBottom: 16, position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format" alt="Data centre" style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(45,21,128,.4),transparent)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(8,5,15,.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '10px 16px' }}>
                  <div style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%', boxShadow: '0 0 8px #10B981', animation: 'pulse 2s infinite' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'white' }}>Secure Global Platform</span>
                    <small style={{ fontSize: 10, color: 'rgba(255,255,255,.45)' }}>99.9% uptime guaranteed</small>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {STATS.map(({ n, l }) => (
                  <div key={l}
                    style={{ background: '#F8F5FF', border: '1px solid rgba(91,53,213,.12)', borderRadius: 16, padding: '20px', textAlign: 'center', transition: 'transform .25s, border-color .3s', cursor: 'default' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,53,213,.3)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,53,213,.12)'; }}
                  >
                    <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 11, color: '#6B5F8A', marginTop: 5, letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Being Connected */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} style={{ marginBottom: 'clamp(64px,8vw,100px)' }}>
            <div style={{ background: 'linear-gradient(135deg,#08050F,#1A0A38)', borderRadius: 28, overflow: 'hidden', position: 'relative', minHeight: 420 }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(91,53,213,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(91,53,213,.06) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
              {TECH_ICONS.map(({ icon, color, label, ...pos }, i) => (
                <div key={label} style={{ position: 'absolute', ...pos, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: 'floatBadge ' + (4 + i * 0.7) + 's ease-in-out infinite', animationDelay: (i * 0.5) + 's', pointerEvents: 'none' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: color + '18', border: '1px solid ' + color + '35', display: 'flex', alignItems: 'center', justifyContent: 'center', color, backdropFilter: 'blur(8px)' }}>{icon}</div>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,.3)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.08em', whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              ))}
              <div style={{ position: 'absolute', top: '20%', left: '30%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(91,53,213,.15)', filter: 'blur(60px)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '20%', right: '25%', width: 160, height: 160, borderRadius: '50%', background: 'rgba(232,64,26,.1)', filter: 'blur(50px)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(36px,5vw,64px)', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 16, fontFamily: 'JetBrains Mono, monospace' }}>Business Outcome</span>
                <h3 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 900, letterSpacing: '-.03em', color: 'white', marginBottom: 28, lineHeight: 1.1 }}>
                  Being <span style={{ background: 'linear-gradient(90deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Connected</span>
                </h3>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.85, marginBottom: 20 }}>FlowTech Africa is a proudly South African ICT solutions provider with more than 20 years of proven experience. As a Level 1 B-BBEE certified SME, we are committed to delivering innovative technology solutions that transform the way businesses operate.</p>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.85, marginBottom: 20 }}>Our passion lies in placing clients at the center of everything we do. We take time to understand your business, its challenges, and its goals so that we can design solutions that are not only effective but also sustainable.</p>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.85, marginBottom: 36 }}>At FlowTech Africa, we believe that technology should adapt to your business - not the other way around. That is why our platforms are flexible, scalable, and license-free, making digital transformation accessible for organizations of all sizes.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 0, border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, background: 'rgba(255,255,255,.03)', overflow: 'hidden', maxWidth: 560, margin: '0 auto' }}>
                  {[{ n: '20+', l: 'Years' },{ n: 'L1', l: 'B-BBEE' },{ n: '0%', l: 'License Fees' },{ n: '14', l: 'Countries' }].map(({ n, l }, i, arr) => (
                    <div key={l} style={{ flex: 1, padding: '20px 12px', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
                      <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 900, background: 'linear-gradient(135deg,#5B35D5,#E8401A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.06em', textTransform: 'uppercase' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} style={{ marginBottom: 'clamp(64px,8vw,100px)' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#E8401A', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>Our Approach</span>
              <h3 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 900, letterSpacing: '-.03em', color: '#0D0720' }}>Technology that adapts to your business</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
              {VALUES.map(({ icon, color, title, desc }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ background: '#F8F5FF', border: '1px solid rgba(91,53,213,.12)', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', cursor: 'default' }}
                  whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(91,53,213,.12)' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,' + color + ',transparent)', borderRadius: '20px 20px 0 0' }} />
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: color + '15', border: '1px solid ' + color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 16 }}>{icon}</div>
                  <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1rem', fontWeight: 800, color: '#0D0720', marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: '.88rem', color: '#4A3F6B', lineHeight: 1.7 }}>{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Image Strip */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              {[
                { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format', label: 'BI Dashboards',    sub: 'Real-time analytics'      },
                { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80&auto=format', label: 'Cybersecurity',   sub: 'Zero-trust architecture' },
                { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format', label: 'AI & Automation', sub: 'Intelligent workflows'   },
              ].map(({ url, label, sub }) => (
                <div key={label} style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: 200, boxShadow: '0 8px 32px rgba(91,53,213,.1)', cursor: 'default' }}>
                  <img src={url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,5,15,.8),transparent)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white', fontFamily: 'Cabinet Grotesk, sans-serif' }}>{label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
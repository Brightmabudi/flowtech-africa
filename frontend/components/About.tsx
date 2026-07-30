'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle, Award, Globe, Zap, Heart, Cloud, Shield, Database, Cpu, Network, Lock, BarChart3 } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import SectionHeader from '@frontend/components/ui/SectionHeader'
import Card from '@frontend/components/ui/Card'

const BULLETS = [
  'Level 1 B-BBEE certified SME committed to transformation',
  'Over 20 years of proven ICT experience across Africa',
  'Own cutting-edge Digital Business Systems with no licensing fees',
  'Trusted Partner to leading software OEMs globally',
  'Secure global delivery platform for advanced digital technologies',
  'Client-first approach — we understand your business before building',
]

const CREDENTIALS = ['Level 1 B-BBEE', 'ISO 27001', 'ISO 9001', 'COBIT 5', 'ITIL v4']

const INTRO_STATS = [
  { n: '20+',  l: 'Years Experience'  },
  { n: 'L1',   l: 'B-BBEE Certified'  },
  { n: '100+', l: 'Systems Delivered' },
  { n: '0',    l: 'Licensing Fees'    },
]

const OUTCOME_STATS = [
  { n: '20+', l: 'Years'         },
  { n: 'L1',  l: 'B-BBEE'        },
  { n: '0%',  l: 'License Fees'  },
  { n: '14',  l: 'Countries'     },
]

const VALUES = [
  { icon: <Heart size={22} />,  color: '#E8401A', title: 'Client-First',      desc: 'We spend time understanding your business and challenges before proposing any solution.' },
  { icon: <Zap size={22} />,    color: '#5B35D5', title: 'Innovation',        desc: 'Cutting-edge Digital Business Systems that are flexible, scalable, and license-free.' },
  { icon: <Globe size={22} />,  color: '#0EA5E9', title: 'Global Reach',      desc: 'We deliver advanced digital technologies globally through our secure platform.' },
  { icon: <Award size={22} />,  color: '#10B981', title: 'Proven Excellence', desc: 'Over two decades of measurable impact and long-term value for our clients.' },
]

const TECH_ICONS = [
  { icon: <Cloud size={20} />,     color: '#5B35D5', label: 'Cloud',      pos: 'top-[12%] left-[8%]'    },
  { icon: <Shield size={20} />,    color: '#E8401A', label: 'Security',   pos: 'top-[25%] right-[6%]'   },
  { icon: <Database size={20} />,  color: '#0EA5E9', label: 'Data',       pos: 'bottom-[30%] left-[5%]' },
  { icon: <Cpu size={20} />,       color: '#10B981', label: 'AI',         pos: 'top-[55%] right-[8%]'   },
  { icon: <Network size={20} />,   color: '#F5C842', label: 'Network',    pos: 'bottom-[15%] right-[5%]' },
  { icon: <Lock size={20} />,      color: '#5B35D5', label: 'Zero Trust', pos: 'top-[70%] left-[7%]'    },
]

const TECH_STRIP = [
  { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format', label: 'BI Dashboards',    sub: 'Real-time analytics'     },
  { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80&auto=format', label: 'Cybersecurity',   sub: 'Zero-trust architecture' },
  { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format', label: 'AI & Automation', sub: 'Intelligent workflows'   },
]

export default function About() {
  return (
    <section id="about" className="bg-white">

      <div className="relative h-[clamp(280px,35vw,440px)] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1400&q=80&auto=format"
          alt="Digital transformation"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08050F]/85 via-brand-800/70 to-accent-500/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-16">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-400">About FlowTech Africa</span>
            <h2 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-tight text-white">Digital Business Transformation</h2>
            <p className="mx-auto max-w-[680px] text-[clamp(.95rem,1.5vw,1.1rem)] italic leading-relaxed text-white/70">
              Every valley shall be exalted, and every mountain and hill shall be made low: and the crooked shall be made straight, and the rough places plain.
            </p>
            <p className="mt-2 font-mono text-[13px] text-white/50">Isaiah 40:4</p>
          </motion.div>
        </div>
      </div>

      <Section>
        <Container>

          <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:mb-24 lg:grid-cols-2 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">Who We Are</span>
              <h3 className="mb-5 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-ink-950">
                A specialist development company with over 20 years of ICT experience
              </h3>
              <p className="mb-3.5 text-[15px] leading-relaxed text-ink-500">
                Flowtech Africa is a specialist development company with over 20 years of ICT experience. As a Level 1 B-BBEE certified SME, we focus on delivering innovative solutions and sustainable value, while building long-term relationships with our clients.
              </p>
              <p className="mb-6 text-[15px] leading-relaxed text-ink-500">
                We deliver advanced digital technologies globally through our secure platform. As a trusted Partner to leading software OEMs, we also provide our own Digital Business Systems Platforms, designed to be cost-effective, cutting-edge, and completely free from restrictive licensing fees.
              </p>
              <div className="mb-7 flex flex-col gap-3">
                {BULLETS.map(b => (
                  <div key={b} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-brand-600" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-ink-700">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {CREDENTIALS.map(c => (
                  <span key={c} className="flex items-center gap-1.5 rounded-full border border-brand-600/15 bg-ink-100 px-3 py-1.5 text-[11px] font-bold text-brand-600">
                    <Award size={10} aria-hidden="true" /> {c}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: 0.1 }}>
              <div className="relative mb-4 overflow-hidden rounded-panel shadow-brand-lg">
                <Image
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format"
                  alt="Data centre"
                  width={800}
                  height={280}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-[280px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-800/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-control border border-white/10 bg-[#08050F]/80 px-4 py-2.5 backdrop-blur-md">
                  <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                  <div>
                    <span className="block text-xs font-bold text-white">Secure Global Platform</span>
                    <small className="text-[10px] text-white/60">99.9% uptime guaranteed</small>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INTRO_STATS.map(({ n, l }) => (
                  <div key={l} className="rounded-card border border-brand-600/10 bg-ink-50 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/30">
                    <div className="bg-gradient-to-br from-brand-600 to-accent-500 bg-clip-text font-display text-2xl font-bold leading-none text-transparent">{n}</div>
                    <div className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-400">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="mb-16 lg:mb-24">
            <div className="relative overflow-hidden rounded-panel bg-gradient-to-br from-[#08050F] to-brand-800">
              <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(91,53,213,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(91,53,213,.06) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

              {TECH_ICONS.map(({ icon, color, label, pos }, i) => (
                <div
                  key={label}
                  aria-hidden="true"
                  className={`pointer-events-none absolute hidden flex-col items-center gap-1.5 sm:flex ${pos}`}
                  style={{ animation: `floatBadge ${4 + i * 0.7}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-control backdrop-blur" style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}>{icon}</div>
                  <span className="whitespace-nowrap font-mono text-[9px] tracking-wide text-white/50">{label}</span>
                </div>
              ))}

              <div aria-hidden="true" className="pointer-events-none absolute left-[30%] top-[20%] h-[200px] w-[200px] rounded-full bg-brand-600/15 blur-[60px]" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-[20%] right-[25%] h-[160px] w-[160px] rounded-full bg-accent-500/10 blur-[50px]" />

              <div className="relative z-[1] mx-auto max-w-[720px] px-6 py-14 text-center sm:px-10 sm:py-16">
                <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-400">Business Outcome</span>
                <h3 className="mb-7 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
                  Being <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">Connected</span>
                </h3>
                <p className="mb-5 text-base leading-relaxed text-white/70">FlowTech Africa is a proudly South African ICT solutions provider with more than 20 years of proven experience. As a Level 1 B-BBEE certified SME, we are committed to delivering innovative technology solutions that transform the way businesses operate.</p>
                <p className="mb-5 text-base leading-relaxed text-white/70">Our passion lies in placing clients at the center of everything we do. We take time to understand your business, its challenges, and its goals so that we can design solutions that are not only effective but also sustainable.</p>
                <p className="mb-9 text-base leading-relaxed text-white/70">At FlowTech Africa, we believe that technology should adapt to your business — not the other way around. That is why our platforms are flexible, scalable, and license-free, making digital transformation accessible for organizations of all sizes.</p>
                <div className="mx-auto flex max-w-[560px] flex-wrap justify-center overflow-hidden rounded-card border border-white/10 bg-white/[0.03]">
                  {OUTCOME_STATS.map(({ n, l }, i) => (
                    <div key={l} className={`flex-1 basis-1/2 px-3 py-5 text-center sm:basis-auto ${i < OUTCOME_STATS.length - 1 ? 'border-b border-r border-white/10 sm:border-b-0' : ''}`}>
                      <div className="bg-gradient-to-br from-brand-400 to-accent-400 bg-clip-text font-display text-2xl font-bold leading-none text-transparent">{n}</div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-white/50">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mb-16 lg:mb-24">
            <SectionHeader align="center" eyebrow="Our Approach" title="Technology that adapts to your business" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map(({ icon, color, title, desc }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Card topAccent className="h-full">
                    <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-control" style={{ background: `${color}15`, border: `1px solid ${color}25`, color }} aria-hidden="true">{icon}</div>
                    <h3 className="mb-2 font-display text-base font-bold text-ink-950">{title}</h3>
                    <p className="text-sm leading-relaxed text-ink-500">{desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {TECH_STRIP.map(({ url, label, sub }) => (
                <div key={label} className="group relative h-[200px] overflow-hidden rounded-card shadow-brand-sm">
                  <Image src={url} alt={label} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#08050F]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="font-display text-sm font-bold text-white">{label}</div>
                    <div className="mt-0.5 text-xs text-white/70">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </Container>
      </Section>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'
import { Cloud, Lock, Settings, Wifi, Database, Sparkles, TrendingUp } from 'lucide-react'

const CARDS = [
  {
    cls: 'bc1', tag: 'FLAGSHIP',
    icon: <Cloud size={36} />, color: 'var(--violet)',
    title: 'Hybrid Cloud & Infrastructure',
    sub: 'Seamlessly blend on-premise, private, and public cloud to build an elastic, cost-optimised environment purpose-built for African enterprise.',
    num: '1,247', numLabel: 'active cloud nodes',
  },
  {
    cls: 'bc2', tag: 'SECURITY',
    icon: <Lock size={28} />, color: 'var(--coral)',
    title: 'Security Operations',
    sub: '24/7 SOC monitoring, threat hunting, and incident response managed by certified analysts.',
    num: '0', numLabel: 'unresolved threats',
  },
  {
    cls: 'bc3', tag: 'MANAGED',
    icon: <Settings size={24} />, color: '#38BDF8',
    title: 'Managed Services',
    sub: 'NOC, helpdesk, and lifecycle management at scale.',
    num: '15min', numLabel: 'avg response SLA',
  },
  {
    cls: 'bc4', tag: 'NETWORK',
    icon: <Wifi size={24} />, color: '#10B981',
    title: 'Connectivity',
    sub: 'SD-WAN and MPLS across 14 countries.',
    num: '14', numLabel: 'countries connected',
  },
  {
    cls: 'bc5', tag: 'DATA',
    icon: <Database size={24} />, color: '#F5C842',
    title: 'Data & Analytics',
    sub: 'From raw ingestion to boardroom-ready dashboards.',
    num: '2PB+', numLabel: 'data managed',
  },
  {
    cls: 'bc6', tag: 'INNOVATION',
    icon: <Sparkles size={28} />, color: 'var(--violet)',
    title: 'AI & Intelligent Automation',
    sub: 'Deploy AI-driven workflows, predictive maintenance, and intelligent document processing to unlock operational efficiency across your entire stack.',
    num: '40%', numLabel: 'avg cost reduction',
  },
  {
    cls: 'bc7', tag: 'GROWTH',
    icon: <TrendingUp size={28} />, color: 'var(--coral)',
    title: 'Digital Transformation Consulting',
    sub: 'From strategy to execution — we align your technology roadmap with business outcomes, regulatory requirements, and African market realities.',
    num: '100%', numLabel: 'project delivery rate',
  },
]

export default function Solutions() {
  return (
    <section id="solutions" className="sec sec-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="sec-head center"
        >
          <span className="eyebrow">Our Solutions</span>
          <h2 className="sec-title">Built for Africa.<br />
            <span style={{ background: 'linear-gradient(90deg,var(--violet),var(--coral))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Trusted Globally.
            </span>
          </h2>
          <p className="sec-sub">A complete portfolio spanning cloud, security, connectivity, and intelligence — all under one SLA.</p>
        </motion.div>

        <div className="bento">
          {CARDS.map(({ cls, tag, icon, color, title, sub, num, numLabel }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.2 }}
              className={`bcard ${cls}`}
            >
              <div className="bcard-tag" style={{ color }}>{tag}</div>
              <span className="bcard-ico" style={{ color }}>{icon}</span>
              <div className="bcard-title">{title}</div>
              <div className="bcard-sub">{sub}</div>
              {num && (
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                  <div className="bcard-num">{num}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', paddingBottom: 6, fontFamily: 'JetBrains Mono, monospace' }}>{numLabel}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

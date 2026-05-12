'use client'
import { motion } from 'framer-motion'
import { MapPin, Zap, Lock, Headphones } from 'lucide-react'

const WHY = [
  {
    icon: '🌍', lucide: <MapPin size={24} />, color: 'var(--coral)',
    title: 'African-First Approach',
    sub: 'We design solutions for African infrastructure realities — load-shedding resilience, bandwidth constraints, multi-currency, and local compliance built in by default.',
  },
  {
    icon: '⚡', lucide: <Zap size={24} />, color: 'var(--violet)',
    title: 'Speed to Value',
    sub: 'From contract signature to live environment in under 30 days. Our proven deployment frameworks eliminate the lengthy timelines typical of large integrators.',
  },
  {
    icon: '🔒', lucide: <Lock size={24} />, color: '#38BDF8',
    title: 'Security by Design',
    sub: 'Every solution we deliver is architected with zero-trust principles from day one. Security is not an add-on — it is baked into every layer of our stack.',
  },
  {
    icon: '🎧', lucide: <Headphones size={24} />, color: '#10B981',
    title: '24/7 Human Support',
    sub: 'Real engineers, not bots. Our NOC and helpdesk teams operate around the clock from Johannesburg and Cape Town, with an average first response of under 15 minutes.',
  },
]

export default function WhyUs() {
  return (
    <section className="sec sec-darker">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="sec-head center"
        >
          <span className="eyebrow">Why FlowTech Africa</span>
          <h2 className="sec-title">The FlowTech Difference</h2>
          <p className="sec-sub">Four reasons 500+ organisations across Africa choose us as their ICT partner.</p>
        </motion.div>

        <div className="why-grid">
          {WHY.map(({ icon, title, sub }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="wcard"
            >
              <div className="wico" style={{ fontSize: 28 }}>{icon}</div>
              <div className="wtitle">{title}</div>
              <div className="wsub">{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

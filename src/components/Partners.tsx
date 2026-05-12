'use client'
import { motion } from 'framer-motion'

const PARTNERS = [
  'Microsoft', 'Amazon Web Services', 'Cisco', 'Dell Technologies',
  'Fortinet', 'Oracle', 'VMware', 'Huawei', 'HPE', 'NetApp',
  'Palo Alto Networks', 'CrowdStrike', 'Veeam', 'Nutanix', 'Lenovo',
]

export default function Partners() {
  const doubled = [...PARTNERS, ...PARTNERS]

  return (
    <section id="partners" style={{ padding: '64px 0', borderTop: '1px solid rgba(59,31,168,.08)', borderBottom: '1px solid rgba(59,31,168,.08)', background: '#ffffff' }}>
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 36, padding: '0 24px' }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>
          // Technology Partners
        </span>
        <p style={{ fontSize: 13, color: '#6B5F8A', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.04em' }}>
          Powered by the world&apos;s leading technology vendors
        </p>
      </motion.div>

      <div style={{ overflow: 'hidden', padding: '20px 0' }}>
        <div style={{ display: 'flex', animation: 'tick 22s linear infinite' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 56, padding: '0 28px', flexShrink: 0 }}>
            {doubled.map((name, i) => (
              <div key={i} style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'rgba(13,7,32,.25)', letterSpacing: '-.01em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 4, height: 4, background: 'var(--violet)', borderRadius: '50%', flexShrink: 0 }} />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

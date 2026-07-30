'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'

const PARTNERS = [
  'Microsoft', 'Amazon Web Services', 'Cisco', 'Dell Technologies',
  'Fortinet', 'Oracle', 'VMware', 'Huawei', 'HPE', 'NetApp',
  'Palo Alto Networks', 'CrowdStrike', 'Veeam', 'Nutanix', 'Lenovo',
]

export default function Partners() {
  const doubled = [...PARTNERS, ...PARTNERS]
  const [animate, setAnimate]     = useState(true)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    setAnimate(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const playing = animate && !userPaused

  return (
    <section
      id="partners"
      role="region"
      aria-label="Technology partners"
      className="border-y border-brand-600/10 bg-white py-16"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-9 px-6 text-center"
      >
        <span className="mb-2 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-600">
          {'// Technology Partners'}
        </span>
        <p className="font-mono text-[13px] tracking-wide text-ink-400">
          Powered by the world&apos;s leading technology vendors
        </p>
        {animate && (
          <button
            type="button"
            onClick={() => setUserPaused(v => !v)}
            aria-label={playing ? 'Pause partner logo scroll' : 'Resume partner logo scroll'}
            className="mx-auto mt-3 flex items-center justify-center rounded-full border border-brand-600/20 p-1.5 text-ink-400 transition-colors hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {playing ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
          </button>
        )}
      </motion.div>

      <div className="group overflow-hidden py-5">
        <div
          className={playing ? 'flex [animation:tick_22s_linear_infinite] group-hover:[animation-play-state:paused]' : 'flex'}
        >
          <div className="flex flex-shrink-0 items-center gap-14 px-7">
            {PARTNERS.map((name, i) => (
              <div key={i} className="flex items-center gap-2.5 whitespace-nowrap font-display text-base font-bold text-ink-950/68">
                <span aria-hidden="true" className="h-1 w-1 flex-shrink-0 rounded-full bg-brand-600" />
                {name}
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="flex flex-shrink-0 items-center gap-14 px-7">
            {doubled.slice(PARTNERS.length).map((name, i) => (
              <div key={i} className="flex items-center gap-2.5 whitespace-nowrap font-display text-base font-bold text-ink-950/68">
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-brand-600" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

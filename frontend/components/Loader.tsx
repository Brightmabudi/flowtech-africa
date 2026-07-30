'use client'
import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

export default function Loader() {
  const [out, setOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOut(true), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      id="loader"
      role="status"
      aria-live="polite"
      className={out ? 'out' : ''}
    >
      <span className="sr-only">Loading FlowTech Africa</span>
      <div
        aria-hidden="true"
        className="flex h-[52px] w-[52px] animate-[logoPulse_1.5s_ease-in-out_infinite] items-center justify-center rounded-[14px] bg-gradient-to-br from-brand-600 to-accent-500 shadow-[0_0_40px_rgba(91,53,213,.5)]"
      >
        <Zap size={24} color="white" />
      </div>
      <div aria-hidden="true" className="h-0.5 w-[220px] overflow-hidden rounded-full bg-brand-600/10">
        <div className="h-full animate-[loadBar_2s_cubic-bezier(.4,0,.2,1)_forwards] rounded-full bg-gradient-to-r from-brand-600 to-accent-500" />
      </div>
      <span aria-hidden="true" className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-400">
        FlowTech Africa // Initialising
      </span>
    </div>
  )
}

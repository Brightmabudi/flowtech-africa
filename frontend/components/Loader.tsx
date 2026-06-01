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
    <div id="loader" className={out ? 'out' : ''}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: 'linear-gradient(135deg, var(--violet), var(--coral))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 40px rgba(109,74,232,.5)',
        animation: 'logoPulse 1.5s ease-in-out infinite',
      }}>
        <Zap size={24} color="white" />
      </div>
      <div className="loader-track">
        <div className="loader-bar" />
      </div>
      <span className="loader-label">FlowTech Africa // Initialising</span>
    </div>
  )
}

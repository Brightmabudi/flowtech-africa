'use client'
import { useEffect, useState } from 'react'

const SYMBOLS = [
  '☁️','🛡️','⚡','💻','🌐','📡','🔒','⚙️','🖥️','📊',
  '🔌','💾','📱','🔐','🗄️','📶','🖧','🔑',
  'AWS','API','5G','AI','IoT','SQL','VPN','SSH','.NET','DevOps','Cloud','Zero Trust',
]

interface FloatingIcon { id: number; symbol: string; left: string; duration: string; delay: string; size: string }

export default function TechCanvas() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    setIcons(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        left: `${Math.random() * 100}%`,
        duration: `${10 + Math.random() * 14}s`,
        delay: `${Math.random() * 12}s`,
        size: `${14 + Math.random() * 12}px`,
      }))
    )
  }, [])

  return (
    <div id="tech-canvas" aria-hidden="true">
      {icons.map(({ id, symbol, left, duration, delay, size }) => (
        <span
          key={id}
          className="tech-icon"
          style={{ left, animationDuration: duration, animationDelay: delay, fontSize: size }}
        >
          {symbol}
        </span>
      ))}
    </div>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'

// ── Floating text labels (CSS-animated, existing layer) ───────────────────────
const TECH_LABELS = [
  'AWS', 'Azure', 'GCP', 'K8s', 'Docker', 'CI/CD', 'DevOps', 'Terraform',
  'Linux', 'Nginx', 'Node.js', 'Python', 'TypeScript', 'React', 'GraphQL',
  'REST', 'OAuth2', 'JWT', 'SSL/TLS', 'ZTNA', 'SASE', 'SOC', 'SIEM',
  'TCP/IP', 'DNS', 'IPv6', 'SD-WAN', '5G', 'VPN', 'AI/ML', 'IoT',
  'Redis', 'Kafka', 'JSON', 'bash', 'git', 'ssh', '</>', '{ }', '=>',
]

interface FloatingLabel {
  id: number; symbol: string; left: string
  duration: string; delay: string; size: string
}

// ── Canvas particle type ───────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number
  r: number; color: string; phase: number
}

interface Pulse {
  i: number; j: number; t: number; speed: number; color: string
}

const NODE_COLORS = ['#5B35D5', '#6D4AE8', '#E8401A', '#0EA5E9', '#7C5CFC', '#3B1FA8', '#F5C842']
const MAX_DIST    = 170
const NODE_COUNT  = 75

export default function TechCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [labels, setLabels] = useState<FloatingLabel[]>([])

  // ── Spawn CSS-floating labels once on client ────────────────────────────────
  useEffect(() => {
    setLabels(
      TECH_LABELS.map((symbol, id) => ({
        id,
        symbol,
        left:     `${Math.random() * 100}%`,
        duration: `${12 + Math.random() * 16}s`,
        delay:    `${Math.random() * 14}s`,
        size:     `${11 + Math.random() * 10}px`,
      }))
    )
  }, [])

  // ── Canvas network animation ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    let animId: number
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    // Spawn nodes
    const nodes: Particle[] = Array.from({ length: NODE_COUNT }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.38,
      vy:    (Math.random() - 0.5) * 0.38,
      r:     1.5 + Math.random() * 1.8,
      color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
      phase: Math.random() * Math.PI * 2,
    }))

    // Spawn a handful of larger "hub" nodes
    for (let i = 0; i < 8; i++) {
      nodes.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * 0.18,
        vy:    (Math.random() - 0.5) * 0.18,
        r:     4 + Math.random() * 3,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      })
    }

    const pulses: Pulse[] = []
    let frame = 0

    function hex(n: number) { return n.toString(16).padStart(2, '0') }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      frame++

      // ── Spawn data pulses every ~40 frames ───────────────────────────────
      if (frame % 40 === 0 && pulses.length < 25) {
        const i = Math.floor(Math.random() * nodes.length)
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          if (Math.sqrt(dx * dx + dy * dy) < MAX_DIST) {
            pulses.push({
              i, j, t: 0,
              speed: 0.01 + Math.random() * 0.014,
              color: nodes[i].color,
            })
            break
          }
        }
      }

      // ── Draw edges ────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(91,53,213,${alpha.toFixed(2)})`
            ctx.lineWidth   = 0.7
            ctx.stroke()
          }
        }
      }

      // ── Animate data pulses ───────────────────────────────────────────────
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]
        p.t += p.speed
        if (p.t >= 1) { pulses.splice(k, 1); continue }

        const px = nodes[p.i].x + (nodes[p.j].x - nodes[p.i].x) * p.t
        const py = nodes[p.i].y + (nodes[p.j].y - nodes[p.i].y) * p.t

        // Glow halo
        const g = ctx.createRadialGradient(px, py, 0, px, py, 12)
        g.addColorStop(0, p.color + '99')
        g.addColorStop(1, p.color + '00')
        ctx.beginPath()
        ctx.arc(px, py, 12, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        // Bright core
        ctx.beginPath()
        ctx.arc(px, py, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = p.color + 'ee'
        ctx.fill()
      }

      // ── Update + draw nodes ───────────────────────────────────────────────
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.phase += 0.016
        if (n.x < 0) n.x = W
        if (n.x > W) n.x = 0
        if (n.y < 0) n.y = H
        if (n.y > H) n.y = 0

        const glow = 0.45 + 0.35 * Math.sin(n.phase)

        // Outer glow
        const rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6)
        rg.addColorStop(0, n.color + hex(Math.round(glow * 55)))
        rg.addColorStop(1, n.color + '00')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2)
        ctx.fillStyle = rg
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.color + hex(Math.round(glow * 220))
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    function onResize() {
      W = window.innerWidth
      H = window.innerHeight
      if (canvasRef.current) {
        canvasRef.current.width  = W
        canvasRef.current.height = H
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div id="tech-canvas" aria-hidden="true">
      {/* Network graph canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />

      {/* Floating tech text labels (CSS animated) */}
      {labels.map(({ id, symbol, left, duration, delay, size }) => (
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

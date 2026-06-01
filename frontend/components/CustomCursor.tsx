'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rx = 0, ry = 0

    const move = (e: MouseEvent) => {
      dot.style.left  = e.clientX + 'px'
      dot.style.top   = e.clientY + 'px'
      rx += (e.clientX - rx) * 0.18
      ry += (e.clientY - ry) * 0.18
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
    }

    let raf: number
    const smooth = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => move(e))
    }

    window.addEventListener('mousemove', smooth)
    return () => { window.removeEventListener('mousemove', smooth); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 8000, mixBlendMode: 'difference' }}>
        <div className="cur-dot" />
      </div>
      <div ref={ringRef} className="cur" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 7999, mixBlendMode: 'difference' }}>
        <div className="cur-ring" />
      </div>
    </>
  )
}

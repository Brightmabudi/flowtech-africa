'use client'
import { useEffect, useRef, useState } from 'react'

interface UseStaggeredRevealOptions {
  count: number
  staggerMs?: number
  maxDelayMs?: number
  threshold?: number
}

export function useStaggeredReveal({ count, staggerMs = 120, maxDelayMs = 800, threshold = 0.15 }: UseStaggeredRevealOptions) {
  const [visibleCount, setVisibleCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || count === 0) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) { setVisibleCount(count); return }

    const timers: ReturnType<typeof setTimeout>[] = []
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          for (let i = 0; i < count; i++) {
            const delay = Math.min(i * staggerMs, maxDelayMs)
            timers.push(setTimeout(() => setVisibleCount(v => Math.max(v, i + 1)), delay))
          }
        }
      },
      { threshold }
    )
    obs.observe(node)
    return () => { obs.disconnect(); timers.forEach(clearTimeout) }
  }, [count, staggerMs, maxDelayMs, threshold])

  return { ref, visibleCount }
}

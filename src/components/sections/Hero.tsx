'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, ChevronRight, Shield, Zap, Cloud, Globe } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────── */

type EaseTuple = [number, number, number, number]

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION CONSTANTS
   EASE mirrors the CSS cubic-bezier used throughout the design system.
   Typed explicitly as a tuple so framer-motion's BezierDefinition is satisfied.
───────────────────────────────────────────────────────────────────────── */

const EASE: EaseTuple = [0.22, 1, 0.36, 1]

/** Parent container — orchestrates stagger across all direct children */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

/**
 * Builds a per-element fade-up variant.
 * `yOffset` lets each element travel a slightly different distance
 * (eyebrow least, headline most) for a natural depth feel.
 */
function buildItemVariant(yOffset: number): Variants {
  return {
    hidden: { opacity: 0, y: yOffset },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: EASE },
    },
  }
}

const eyebrowVariant  = buildItemVariant(16)
const headlineVariant = buildItemVariant(36)
const subtextVariant  = buildItemVariant(24)
const ctaVariant      = buildItemVariant(20)
const statsVariant    = buildItemVariant(16)

/* ─────────────────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────────────────── */

const STATS = [
  { num: '500+',  label: 'Enterprise Clients' },
  { num: '15+',   label: 'Years Experience'   },
  { num: '99.9%', label: 'Uptime SLA'         },
  { num: '24/7',  label: 'Human Support'      },
] satisfies { num: string; label: string }[]

const BADGES = [
  { cls: 'bf1', color: '#6D4AE8', Icon: Shield, label: 'Zero-Trust Architecture' },
  { cls: 'bf2', color: '#FF5C3A', Icon: Zap,    label: '847 Mbps Avg Throughput' },
  { cls: 'bf3', color: '#38BDF8', Icon: Cloud,  label: 'Multi-Cloud Ready'       },
  { cls: 'bf4', color: '#F5C842', Icon: Globe,  label: '14 African Countries'    },
]

/* ─────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────── */

/**
 * One of the three concentric orbit rings behind the hero content.
 * Purely decorative — uses the `orbitSpin` CSS keyframe defined in globals.css.
 * `dot` renders the glowing travel indicator on orbit1 and orbit2.
 */
function OrbitRing({ ring, dot = false }: { ring: 1 | 2 | 3; dot?: boolean }) {
  return (
    <div aria-hidden="true" className={`orbit orbit${ring}`}>
      {dot && <div className="orbit-dot" />}
    </div>
  )
}

/**
 * One cell in the stats bar.
 * Derives its border classes from position in the 2-col (mobile) / 4-col (lg) grid.
 *
 *  Mobile layout (2 × 2):
 *    [0]        | [1] border-l
 *    ───────────────────────── border-b on row above
 *    [2]        | [3] border-l
 *
 *  Desktop layout (1 × 4):
 *    [0] | [1] border-l | [2] border-l | [3] border-l
 */
function StatCell({
  num,
  label,
  index,
}: {
  num: string
  label: string
  index: number
}) {
  const isOdd    = index % 2 === 1   // right column on mobile
  const isTopRow = index < 2         // first row on mobile

  const borderClasses = [
    /* Mobile vertical divider */
    isOdd    ? 'border-l border-white/[0.08]'                : '',
    /* Mobile horizontal divider — removed at lg breakpoint */
    isTopRow ? 'border-b border-white/[0.08] lg:border-b-0' : '',
    /* Desktop vertical dividers — all cells after the first */
    index > 0 ? 'lg:border-l lg:border-white/[0.08]'        : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={`flex flex-col items-center justify-center py-5 px-4 text-center transition-colors hover:bg-white/[0.04] ${borderClasses}`}
    >
      {/* Gradient number — Cabinet Grotesk 900 */}
      <span
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: '2rem',
          fontWeight: 900,
          lineHeight: 1,
          background: 'linear-gradient(135deg, var(--violet), var(--coral))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {num}
      </span>

      {/* Label — JetBrains Mono uppercase */}
      <span
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,.35)',
          marginTop: 4,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────── */

export default function Hero() {
  /**
   * Respect OS-level "reduce motion" setting.
   * When true we skip y-transforms and render the final state immediately.
   */
  const prefersReduced = useReducedMotion()

  return (
    <section id="home" className="hero sec-dark">

      {/* ── Mesh gradient background ───────────────────────────────── */}
      <div className="hero-bg"   aria-hidden="true" />

      {/* ── Dot-grid overlay (CSS mask-image fade) ─────────────────── */}
      <div className="hero-grid" aria-hidden="true" />

      {/* ── Concentric orbit rings — CSS orbitSpin keyframe ────────── */}
      <OrbitRing ring={1} dot />
      <OrbitRing ring={2} dot />
      <OrbitRing ring={3}     />

      {/* ── Floating tech badges (hidden on tablet & mobile via CSS) ── */}
      {BADGES.map(({ cls, color, Icon, label }) => (
        <div key={cls} className={`badge-float ${cls}`} aria-hidden="true">
          <Icon
            size={11}
            style={{ color, filter: `drop-shadow(0 0 5px ${color})` }}
          />
          {label}
        </div>
      ))}

      {/* ── Staggered content block ─────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial={prefersReduced ? 'show' : 'hidden'}
        animate="show"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 860,
        }}
      >

        {/* Eyebrow pill — JetBrains Mono, animated first */}
        <motion.div variants={eyebrowVariant} className="hero-eyebrow">
          <span className="pulse" aria-hidden="true" />
          Africa&apos;s Premier ICT Partner
        </motion.div>

        {/* ── H1 headline — Cabinet Grotesk 900 ───────────────────── */}
        {/*
          Three visual lines:
            1. "Powering Africa's"       — white
            2. " Digital Future"          — .line-coral  → gradShift animation
            3. " — Built for Africa."     — .line-dim    → muted white
        */}
        <motion.h1 variants={headlineVariant} className="hero-h1">
          Powering Africa&apos;s
          <span className="line-coral"> Digital Future</span>
          <span
            className="line-dim"
            style={{ display: 'block', fontSize: '0.68em', fontWeight: 700, marginTop: 6 }}
          >
            Built for Africa.
          </span>
        </motion.h1>

        {/* Sub-headline — Instrument Sans 400, fades up after H1 */}
        <motion.p variants={subtextVariant} className="hero-sub">
          Enterprise-grade cloud infrastructure, cybersecurity, and managed IT services
          delivered to organisations across Sub-Saharan Africa — with 99.9% SLA uptime
          and round-the-clock human support.
        </motion.p>

        {/* ── CTA row ─────────────────────────────────────────────── */}
        <motion.div variants={ctaVariant} className="hero-actions">
          <a href="#solutions" className="btn-hero-primary">
            Explore Solutions
            <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </a>
          <a href="#contact" className="btn-hero-secondary">
            <ChevronRight size={15} strokeWidth={2.5} aria-hidden="true" />
            Talk to an Expert
          </a>
        </motion.div>

        {/* ── Stats bar ────────────────────────────────────────────── */}
        {/*
          Responsive grid:
            - Mobile  : 2 columns (2 × 2 layout)
            - lg+     : 4 columns (single row)
          Borders are derived per-cell by StatCell from the index.
        */}
        <motion.div
          variants={statsVariant}
          className="grid grid-cols-2 lg:grid-cols-4 w-full overflow-hidden rounded-2xl border border-white/[0.08]"
          style={{
            maxWidth: 680,
            marginTop: 72,
            background: 'rgba(255,255,255,.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {STATS.map(({ num, label }, i) => (
            <StatCell key={label} num={num} label={label} index={i} />
          ))}
        </motion.div>

      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: 'rgba(255,255,255,.2)',
            letterSpacing: '.16em',
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </span>
        {/* Bouncing line indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 36,
            background: 'linear-gradient(to bottom, var(--violet), transparent)',
          }}
        />
      </motion.div>

    </section>
  )
}

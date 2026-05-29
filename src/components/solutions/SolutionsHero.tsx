'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Shield, Zap } from 'lucide-react'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

// ── Stagger variants ──────────────────────────────────────────────────────────
const staggerParent = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.22 } },
}
const lineReveal = {
  hidden:  { y: '110%' },
  visible: { y: '0%', transition: { duration: 1.05, ease: EASE } },
}

// ── Magnetic button wrapper ───────────────────────────────────────────────────
function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x   = useMotionValue(0)
  const y   = useMotionValue(0)
  const sx  = useSpring(x, { stiffness: 280, damping: 28 })
  const sy  = useSpring(y, { stiffness: 280, damping: 28 })

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width  / 2) * 0.28)
    y.set((e.clientY - r.top  - r.height / 2) * 0.28)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

// ── Static data (precomputed to avoid hydration mismatch) ─────────────────────
const HEADLINE = [
  { text: 'Manufacturing', teal: false },
  { text: 'intelligence',  teal: false },
  { text: 'across your',   teal: false },
  { text: 'entire value',  teal: true  },
  { text: 'chain.',        teal: false },
]

const TRUST = [
  { value: '72K+',   label: 'Verified suppliers'  },
  { value: '98.6%',  label: 'OTIF accuracy'       },
  { value: '−18%',   label: 'Avg. cost reduction' },
  { value: '< 4hrs', label: 'RFQ turnaround'      },
]

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  x:     (i * 41.3 + 13) % 100,
  y:     (i * 59.7 + 7)  % 100,
  teal:  i % 8 === 0,
  size:  i % 5 === 0 ? 1.5 : 0.72,
  dur:   3.2 + (i % 6) * 0.85,
  delay: (i * 0.22) % 4,
}))

const NET_NODES = Array.from({ length: 14 }, (_, i) => {
  const a = (2 * Math.PI * i) / 14
  return {
    x:    50 + 44 * Math.cos(a),
    y:    50 + 44 * Math.sin(a),
    size: i % 3 === 0 ? 1.7 : 1.0,
    dur:  [2, 3, 4, 5][i % 4],
  }
})

const BARS          = [38, 62, 25, 78, 48, 72, 33, 88]
const PANEL_METRICS = [
  { label: 'OTIF',      value: '98.6%', pct: '76%', hi: true  },
  { label: 'Cost Δ',    value: '−18%',  pct: '68%', hi: false },
  { label: 'Suppliers', value: '1,284', pct: '80%', hi: true  },
  { label: 'Risk',      value: '3 ↓',   pct: '22%', hi: false },
]

// OTIF ring: r=36 in 100×100 viewBox → circumference ≈ 226.2
const RING_R    = 36
const RING_CIRC = 2 * Math.PI * RING_R
const RING_DASH = RING_CIRC * 0.986

// ── Main export ───────────────────────────────────────────────────────────────
export default function SolutionsHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      aria-label="Solutions Hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#070707' }}
    >

      {/* ── Layer 1: animated teal light blobs ─────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          style={{
            position: 'absolute',
            width: '90vw', height: '90vw',
            top: '-55vw', left: '0',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${T} 0%, transparent 68%)`,
            opacity: 0.06,
            animation: 'em-blob1 26s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '65vw', height: '65vw',
            bottom: '-32vw', right: '-5vw',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${T} 0%, transparent 68%)`,
            opacity: 0.04,
            animation: 'em-blob2 32s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Horizon line */}
        <div
          style={{
            position: 'absolute',
            top: '56%', left: 0, right: 0,
            height: '1px',
            background: `linear-gradient(90deg,
              transparent 0%,
              rgba(45,212,191,0.1) 25%,
              rgba(45,212,191,0.18) 50%,
              rgba(45,212,191,0.1) 75%,
              transparent 100%)`,
          }}
        />
      </div>

      {/* ── Layer 2: fine dot grid ──────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.032,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize:  '32px 32px',
        }}
      />

      {/* ── Layer 3: drifting particles ─────────────────────────────────── */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill={p.teal ? T : '#ffffff'}
            opacity={p.teal ? 0.3 : 0.09}
          >
            <animate
              attributeName="opacity"
              values={p.teal ? '0.1;0.44;0.1' : '0.04;0.17;0.04'}
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0;${i % 2 === 0 ? 5 : -4},${-6};0,0`}
              dur={`${p.dur * 1.6}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className="grid min-h-screen grid-cols-1 items-center gap-12 pb-20 pt-24
                     lg:grid-cols-[1fr_1.08fr] lg:gap-16 xl:gap-24"
        >

          {/* ── LEFT: Editorial copy ──────────────────────────────────── */}
          <div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border
                         border-white/[0.09] bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: T }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: T }} />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                Manufacturing intelligence, reimagined
              </span>
            </motion.div>

            {/* Headline — staggered per-line reveal ──────────────────── */}
            <motion.h1
              variants={staggerParent}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {HEADLINE.map(({ text, teal }) => (
                <div key={text} className="overflow-hidden">
                  <motion.span
                    variants={lineReveal}
                    className="block font-display font-semibold"
                    style={{
                      fontSize:      'clamp(2.8rem, 5.6vw, 5.2rem)',
                      lineHeight:    0.95,
                      letterSpacing: '-0.04em',
                      color:         teal ? T : '#ffffff',
                    }}
                  >
                    {text}
                  </motion.span>
                </div>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.78, ease: EASE }}
              className="mt-8 max-w-[26rem] text-[15px] leading-[1.78] text-white/42"
            >
              From design conception to supplier delivery, Emithran powers smarter decisions
              at every stage — orchestrated by AI, grounded in 72,000+ supplier data points.
            </motion.p>

            {/* CTA row ─────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.92, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              {/* Primary — teal, shine sweep, magnetic */}
              <Magnet>
                <a
                  href="#journey"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden
                             rounded-full px-7 py-3.5 text-sm font-semibold text-black
                             transition-shadow duration-300
                             hover:shadow-[0_0_36px_rgba(45,212,191,0.5)]"
                  style={{ background: T }}
                >
                  {/* Shine sweep */}
                  <span className="pointer-events-none absolute inset-0 -skew-x-12 -translate-x-full
                                   bg-white/30 transition-transform duration-700
                                   group-hover:translate-x-[260%]" />
                  <span className="relative z-10">Explore solutions</span>
                  <ArrowRight
                    className="relative z-10 h-4 w-4 transition-transform duration-300
                               group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </Magnet>

              {/* Secondary — glass, animated glow ring, magnetic */}
              <Magnet>
                <a
                  href="#cta"
                  className="group relative inline-flex items-center gap-2 overflow-hidden
                             rounded-full border border-white/[0.1] bg-white/[0.04] px-7 py-3.5
                             text-sm font-medium text-white backdrop-blur-sm
                             transition-all duration-300
                             hover:border-[rgba(45,212,191,0.36)]
                             hover:bg-white/[0.07]
                             hover:shadow-[0_0_28px_rgba(45,212,191,0.1)]"
                >
                  {/* Inner teal glow ring */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0
                               transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 0 1px rgba(45,212,191,0.2)` }}
                  />
                  <span className="relative z-10">Book consultation</span>
                  <ArrowUpRight
                    className="relative z-10 h-4 w-4 transition-transform duration-300
                               group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </Magnet>
            </motion.div>

            {/* Trust stats ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.18 }}
              className="mt-14 border-t border-white/[0.07] pt-10"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                {TRUST.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 1.22 + i * 0.08 }}
                  >
                    <div
                      className="font-display text-[1.65rem] font-semibold
                                 leading-none tracking-tight"
                      style={{ color: i % 2 === 0 ? T : '#ffffff' }}
                    >
                      {value}
                    </div>
                    <div className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-white/30">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT: Animated visual system ────────────────────────── */}
          <VisualSystem inView={inView} />

        </div>
      </div>
    </section>
  )
}

// ── Visual system ─────────────────────────────────────────────────────────────
function VisualSystem({ inView }: { inView: boolean }) {
  return (
    <div className="relative hidden lg:block" style={{ height: '600px' }}>

      {/* ── CAD wireframe backdrop ── */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 520 520"
        width="520"
        height="520"
        overflow="visible"
      >
        {/* Slow-rotating dashed outer ring */}
        <circle cx="260" cy="260" r="228" fill="none" stroke={T}
          strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="5 14">
          <animateTransform attributeName="transform" type="rotate"
            values="0 260 260;360 260 260" dur="90s" repeatCount="indefinite" />
        </circle>
        <circle cx="260" cy="260" r="198" fill="none" stroke={T}
          strokeWidth="0.35" strokeOpacity="0.055" />
        <circle cx="260" cy="260" r="168" fill="none" stroke={T}
          strokeWidth="0.25" strokeOpacity="0.038" strokeDasharray="2 10" />
        {/* Crosshairs */}
        <line x1="260" y1="38"  x2="260" y2="482" stroke={T} strokeWidth="0.28" strokeOpacity="0.05" />
        <line x1="38"  y1="260" x2="482" y2="260" stroke={T} strokeWidth="0.28" strokeOpacity="0.05" />
        {/* 12-point tick marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI / 6) * i
          return (
            <line key={i}
              x1={260 + 161 * Math.cos(a)} y1={260 + 161 * Math.sin(a)}
              x2={260 + 176 * Math.cos(a)} y2={260 + 176 * Math.sin(a)}
              stroke={T} strokeWidth="0.7" strokeOpacity="0.17"
            />
          )
        })}
      </svg>

      {/* ── Main intelligence panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.975 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.05, delay: 0.45, ease: EASE }}
        className="absolute inset-x-[52px] bottom-[52px] top-[52px] rounded-2xl"
        style={{
          background:     'rgba(7,7,7,0.86)',
          border:         '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(22px)',
          boxShadow:
            '0 44px 88px -22px rgba(0,0,0,0.75), ' +
            '0 0 0 1px rgba(255,255,255,0.04), ' +
            '0 0 110px -35px rgba(45,212,191,0.11)',
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.052)' }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: T }} />
          </div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/28">
            emithran.ai / intelligence-core
          </div>
          <div className="flex items-center gap-1.5 text-[10px]" style={{ color: T }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                style={{ background: T }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: T }} />
            </span>
            live · 2,847 nodes
          </div>
        </div>

        {/* Supplier network SVG */}
        <div className="relative overflow-hidden px-5 pt-4" style={{ height: '216px' }}>
          <div className="mb-1 text-[9px] uppercase tracking-[0.24em] text-white/26">
            Supplier network · realtime
          </div>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ top: 20 }}>
            <defs>
              <radialGradient id="em-vs-g" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor={T} stopOpacity="0.65" />
                <stop offset="100%" stopColor={T} stopOpacity="0"    />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="31" fill="url(#em-vs-g)" opacity="0.28" />
            {NET_NODES.map(({ x, y, size, dur }, i) => (
              <g key={i}>
                <line x1="50" y1="50" x2={x} y2={y}
                  stroke={T} strokeOpacity="0.15" strokeWidth="0.28" />
                <circle cx={x} cy={y} r={size} fill="white" opacity="0.62">
                  <animate attributeName="opacity"
                    values="0.2;0.78;0.2" dur={`${dur}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
            <circle cx="50" cy="50" r="2.6" fill={T} />
            <circle cx="50" cy="50" r="2.6" fill="none" stroke={T} strokeWidth="0.45">
              <animate attributeName="r"       values="2.6;13;2.6" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0;0.9"   dur="2.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* 4-column metrics row */}
        <div
          className="grid grid-cols-4"
          style={{
            borderTop:    '1px solid rgba(255,255,255,0.052)',
            borderBottom: '1px solid rgba(255,255,255,0.052)',
          }}
        >
          {PANEL_METRICS.map(({ label, value, pct, hi }, i) => (
            <div
              key={label}
              className={`px-4 py-3 ${i < 3 ? 'border-r border-white/[0.048]' : ''}`}
            >
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/26">{label}</div>
              <div
                className="mt-1 font-display text-[1.1rem] font-semibold leading-none tracking-tight"
                style={{ color: hi ? T : '#ffffff' }}
              >
                {value}
              </div>
              <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width:      pct,
                    background: hi ? T : 'rgba(255,255,255,0.32)',
                    animation:  `em-bar-rise 1.2s ${0.88 + i * 0.1}s cubic-bezier(.2,.7,.2,1) both`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[9px] uppercase tracking-[0.22em] text-white/26">
              Cost variance · Q1 → Q4
            </div>
            <div className="text-[10px] font-medium" style={{ color: T }}>
              12 VAVE opps · ₹2.3Cr
            </div>
          </div>
          <div className="flex h-[58px] items-end gap-[3px]">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-[2px]"
                style={{
                  height:     `${h}%`,
                  background: `linear-gradient(to top, rgba(45,212,191,0.2), ${T})`,
                  animation:  `em-bar-rise .9s ${0.98 + i * 0.07}s cubic-bezier(.2,.7,.2,1) both`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Floating card: OTIF arc ring (top-right) ── */}
      <motion.div
        initial={{ opacity: 0, x: 22, y: -6 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.88, ease: EASE }}
        className="absolute right-0 top-0 z-20"
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
            style={{
              background:     'rgba(5,5,5,0.9)',
              border:         '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(18px)',
              boxShadow:      '0 22px 52px -14px rgba(0,0,0,0.65)',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={RING_R}
                fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
              <circle cx="50" cy="50" r={RING_R}
                fill="none"
                stroke={T}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={RING_CIRC}
                strokeDashoffset={RING_CIRC - RING_DASH}
                transform="rotate(-90 50 50)"
                style={{ filter: `drop-shadow(0 0 6px ${T})` }}
              />
              <text x="50" y="57" textAnchor="middle"
                fill="white" fontSize="24" fontWeight="700" fontFamily="sans-serif">
                99
              </text>
            </svg>
            <div>
              <div className="text-[12px] font-semibold text-white">OTIF Prediction</div>
              <div
                className="font-display text-[15px] font-bold leading-tight"
                style={{ color: T }}
              >
                98.6%
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/32">
                on-time in-full
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating card: Supply risk monitor (bottom-left) ── */}
      <motion.div
        initial={{ opacity: 0, x: -22 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
        className="absolute bottom-0 left-0 z-20"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        >
          <div
            className="min-w-[178px] rounded-2xl px-4 py-3.5"
            style={{
              background:     'rgba(5,5,5,0.9)',
              border:         '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(18px)',
              boxShadow:      '0 22px 52px -14px rgba(0,0,0,0.65)',
            }}
          >
            <div className="mb-2.5 flex items-center gap-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ background: 'rgba(45,212,191,0.1)' }}
              >
                <Shield className="h-3.5 w-3.5" style={{ color: T }} />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-white">Supply Risk</div>
                <div className="text-[9px] uppercase tracking-[0.12em] text-white/28">
                  live monitor
                </div>
              </div>
            </div>
            {[
              { name: 'Pune cluster',  level: 'low',    ok: true  },
              { name: 'Hosur cluster', level: 'low',    ok: true  },
              { name: 'Chennai hub',   level: 'medium', ok: false },
            ].map(({ name, level, ok }) => (
              <div key={name} className="mt-1.5 flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: ok ? T : '#fbbf24' }}
                />
                <span className="text-[10px] text-white/46">{name}</span>
                <span
                  className="ml-auto text-[9px] uppercase tracking-[0.11em] shrink-0"
                  style={{ color: ok ? T : '#fbbf24' }}
                >
                  {level}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating card: AI VAVE savings (bottom-right) ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 1.22, ease: EASE }}
        className="absolute bottom-[48px] right-0 z-20"
      >
        <motion.div
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          <div
            className="rounded-2xl px-4 py-3.5"
            style={{
              background:     'rgba(5,5,5,0.9)',
              border:         '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(18px)',
              boxShadow:      '0 22px 52px -14px rgba(0,0,0,0.65)',
            }}
          >
            <div className="mb-1 flex items-center gap-1.5">
              <Zap className="h-3 w-3" style={{ color: T }} />
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/36">AI VAVE</span>
            </div>
            <div className="font-display text-[1.55rem] font-bold leading-none tracking-tight text-white">
              ₹2.3Cr
            </div>
            <div className="mt-0.5 text-[10px] text-white/36">12 opportunities found</div>
            {/* Mini sparkline */}
            <div className="mt-2.5 flex h-5 items-end gap-[2px]">
              {[28, 52, 38, 68, 48, 76, 62, 96].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-[1px]"
                  style={{
                    height:     `${h}%`,
                    background: i === 7
                      ? T
                      : `rgba(45,212,191,${0.18 + i * 0.065})`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

    </div>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldAlert, Zap, Gauge } from 'lucide-react'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

// ── Heatmap data ──────────────────────────────────────────────────────────────
// 72 cells (6 rows × 12 cols)
// n=neutral  t=teal  a=amber  r=red
type Cell = 'n' | 't' | 'a' | 'r'

const HEATMAP: Cell[] = [
  // Row 1
  'n','r','n','t','n','t','a','n','n','t','r','r',
  // Row 2
  'n','r','a','t','r','t','a','n','a','t','a','n',
  // Row 3
  'n','n','t','n','n','t','r','a','n','n','n','t',
  // Row 4
  'r','r','t','a','t','r','t','n','a','a','n','t',
  // Row 5
  'n','n','n','n','a','t','n','r','t','n','n','n',
  // Row 6
  'n','n','a','n','n','n','n','t','n','n','n','t',
]

const CELL_BG: Record<Cell, string> = {
  n: 'rgba(255,255,255,0.1)',
  t: 'rgba(45,212,191,0.7)',
  a: 'rgba(251,191,36,0.7)',
  r: 'rgba(239,68,68,0.8)',
}
const CELL_SHADOW: Record<Cell, string | undefined> = {
  n: undefined,
  t: undefined,
  a: undefined,
  r: '0 0 18px rgba(239,68,68,.6)',
}

// ── Alert cards ───────────────────────────────────────────────────────────────
const ALERTS = [
  {
    Icon:   ShieldAlert,
    color:  'rgb(252,165,165)',        // red-300
    border: 'rgba(252,165,165,0.3)',
    title:  'Supplier 17',
    detail: 'Utilization 96% · 12-day risk',
  },
  {
    Icon:   Zap,
    color:  'rgb(253,230,138)',        // amber-200
    border: 'rgba(252,211,77,0.3)',
    title:  'Port Mundra',
    detail: 'Congestion +4 days vs avg',
  },
  {
    Icon:   Gauge,
    color:  T,
    border: 'rgba(45,212,191,0.3)',
    title:  'Buffer optimal',
    detail: 'Reduce stock −8% safely',
  },
]

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '99%',  label: 'OTIF visibility' },
  { value: '−90%', label: 'Surprises'       },
  { value: '−75%', label: 'Risk incidents'  },
  { value: '−25%', label: 'Buffer stock'    },
]

// ── Framer-motion variants ────────────────────────────────────────────────────
const gridContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.014, delayChildren: 0.25 } },
}
const cellItem = {
  hidden:  { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1,  transition: { duration: 0.28 } },
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function RiskSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="risk"
      className="relative"
      style={{
        background:      '#070707',
        paddingTop:      'clamp(4rem, 8vw, 7rem)',
        paddingBottom:   'clamp(5rem, 10vw, 9rem)',
        borderTop:       '1px solid rgba(255,255,255,0.05)',
        scrollMarginTop: '160px',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">

          {/* ── LEFT: Sticky editorial ─────────────────────────────── */}
          <div className="md:col-span-5">
            <div className="sticky top-40">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: T }}>
                  04 · Risk intelligence
                </div>

                <h2
                  className="em-text-gradient mt-4 text-balance font-semibold leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
                >
                  See the delay before it happens.
                </h2>

                <div className="mt-8 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      You rely on promised delivery dates and discover delays too late. By the
                      time you know, the project is on fire.
                    </p>
                  </div>
                  <div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(45,212,191,0.8)' }}
                    >
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                      Predictive supply chain monitoring that flags risk weeks early —
                      utilization, geopolitics, finance, quality, weather.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Visuals ─────────────────────────────────────── */}
          <div className="md:col-span-7">

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="em-glow-border em-glass overflow-hidden rounded-2xl p-6"
            >
              {/* Card header */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span>OTIF risk heatmap · next 90 days</span>
                <span className="text-red-300">3 critical alerts</span>
              </div>

              {/* Heatmap grid — scan line sweeps once, then cells stagger in */}
              <div className="relative mt-4">
                <motion.div
                  className="pointer-events-none absolute inset-x-0 z-10 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(45,212,191,0.7), transparent)` }}
                  initial={{ top: 0, opacity: 0 }}
                  animate={inView ? { top: '100%', opacity: [0, 0.75, 0.75, 0] } : {}}
                  transition={{ duration: 1.3, delay: 1.2, ease: 'linear' }}
                />
                <motion.div
                  className="grid gap-1.5"
                  style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
                  variants={gridContainer}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  {HEATMAP.map((cell, i) => (
                    <motion.div
                      key={i}
                      className={`aspect-square rounded${cell === 'r' ? ' em-risk-pulse-red' : ''}`}
                      style={{ background: CELL_BG[cell] }}
                      variants={cellItem}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Alert cards */}
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {ALERTS.map(({ Icon, color, border, title, detail }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.9 + i * 0.1, ease: EASE }}
                    className="em-glass rounded-xl p-3"
                    style={{ border: `1px solid ${border}`, color }}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    <div className="mt-2 text-xs font-medium text-white">{title}</div>
                    <div className="text-[11px] text-white/60">{detail}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats + quote */}
            <div className="mt-10">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {STATS.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.38 + i * 0.08, ease: EASE }}
                    className="em-glass em-glow-border em-hover-lift rounded-xl p-4"
                  >
                    <div className="em-teal-text font-display text-2xl font-semibold">{value}</div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.figure
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
                className="em-glass mt-5 rounded-xl p-5"
              >
                <blockquote className="font-display text-pretty text-sm leading-relaxed text-white/85">
                  "We caught a tier-2 supplier's capacity crunch six weeks before our T1 felt it.
                  That's the entire value of predictive risk."
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  — Multi-product aerospace company
                </figcaption>
              </motion.figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

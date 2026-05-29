'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

// ── Data ──────────────────────────────────────────────────────────────────────

// After VAVE: first 3 cells are consolidated (teal), remainder are neutral
const AFTER_CELLS = [true, true, true, false, false, false, false, false, false]

const OPPORTUNITIES = [
  { label: 'Consolidate 3 brackets → 1 stamped', feasibility: 'High', savings: '₹4.2L' },
  { label: 'AL-6061 → AL-5052 (same fatigue)',   feasibility: 'Med',  savings: '₹1.8L' },
  { label: 'Replace milling with cold-forming',  feasibility: 'High', savings: '₹6.5L' },
  { label: 'Outsource heat-treat to T2',          feasibility: 'Low',  savings: '₹2.1L' },
]

const STATS = [
  { value: '5.0x',  label: 'More VAVE ideas' },
  { value: '−70%',  label: 'Eval time'       },
  { value: '+40%',  label: 'Realization'     },
  { value: '₹5.0L', label: 'Avg savings'     },
]

// Framer-motion variants for the "After" teal cells
const tealGrid = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } },
}
const tealCell = {
  hidden:  { opacity: 0, scale: 0.55 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.32 } },
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function VaveSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="vave"
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
                <div className="text-[11px] uppercase tracking-[0.3em]" style={{ color: T }}>
                  05 · Value engineering
                </div>

                <h2
                  className="em-text-gradient mt-4 text-balance font-semibold leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
                >
                  VAVE that never sleeps.
                </h2>

                <div className="mt-8 space-y-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      VAVE is labor-intensive. Optimization opportunities slip through the
                      cracks every quarter.
                    </p>
                  </div>
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(45,212,191,0.8)' }}
                    >
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                      AI continuously reviews complexity, materials, processes and
                      consolidation — surfacing prioritized opportunities.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Visuals ─────────────────────────────────────── */}
          <div className="md:col-span-7">
            <div className="space-y-5">

              {/* Before / After comparison card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
                className="em-glow-border em-glass grid overflow-hidden rounded-2xl md:grid-cols-2"
              >
                {/* Before pane */}
                <div
                  className="border-b border-white/5 p-6 md:border-b-0 md:border-r"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                    Before
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-md border border-white/10 bg-white/[0.03]"
                      />
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-white/60">
                    9 parts · 4 suppliers · 12 ops
                  </div>
                </div>

                {/* After pane — teal cells stagger in */}
                <div className="relative p-6">
                  <div className="em-teal-text text-[10px] uppercase tracking-[0.18em]">
                    After AI VAVE
                  </div>
                  <motion.div
                    className="mt-4 grid grid-cols-3 gap-2"
                    variants={tealGrid}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                  >
                    {AFTER_CELLS.map((isTeal, i) => (
                      <motion.div
                        key={i}
                        variants={isTeal ? tealCell : undefined}
                        className={`aspect-square rounded-md${isTeal ? ' em-vave-teal-pulse' : ''}`}
                        style={isTeal ? {
                          border:    `1px solid rgba(45,212,191,0.6)`,
                          background:'rgba(45,212,191,0.2)',
                        } : {
                          border:    '1px solid rgba(255,255,255,0.1)',
                          background:'rgba(255,255,255,0.03)',
                        }}
                      />
                    ))}
                  </motion.div>
                  <div className="em-teal-text mt-4 text-xs">
                    3 parts · 2 suppliers · 5 ops · −38% cost
                  </div>
                </div>
              </motion.div>

              {/* Prioritized opportunities */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="em-glow-border em-glass rounded-2xl p-5"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Prioritized opportunities
                </div>
                <div className="mt-4 space-y-2">
                  {OPPORTUNITIES.map(({ label, feasibility, savings }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.45 + i * 0.09, ease: EASE }}
                      className="em-hover-lift flex items-center justify-between rounded-lg
                                 border border-white/5 bg-white/[0.02] px-4 py-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Lightbulb className="em-teal-text h-4 w-4 shrink-0" aria-hidden />
                        <span className="text-white/85">{label}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <span>{feasibility} feasibility</span>
                        <span
                          className="em-teal-text rounded-md px-2 py-0.5"
                          style={{ background: 'rgba(45,212,191,0.15)' }}
                        >
                          {savings}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>

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
                    <div className="em-teal-text text-2xl font-semibold">{value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
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
                <blockquote className="text-pretty text-sm leading-relaxed text-white/85">
                  "We went from 6 VAVE projects a year to 30, with a higher realization rate.
                  The AI does the boring work."
                </blockquote>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/40">
                  — ₹1000Cr+ manufacturing conglomerate
                </figcaption>
              </motion.figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

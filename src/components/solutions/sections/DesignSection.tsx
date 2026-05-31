'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

const STATS = [
  { value: '−40%',  label: 'Design cycle time' },
  { value: '−85%',  label: 'Cost surprises'    },
  { value: '−3.0w', label: 'Lead time'         },
  { value: '99%',   label: 'First-pass DFM'    },
]

// Annotation card config — position, colour theme, float timing
const ANNOTATIONS = [
  {
    pos:     { top: '18%', left: '8%' },
    border:  'rgba(252,211,77,0.4)',
    color:   'rgb(253,230,138)',
    label:   'Tolerance H7',
    body:    '40% costlier with Indian suppliers — optimize?',
    delay:   0.55,
    floatY:  -8,
    floatDur: 4.2,
    floatDelay: 0.9,
  },
  {
    pos:     { top: '55%', right: '6%' },
    border:  'rgba(45,212,191,0.6)',
    color:   T,
    label:   'Material Ti-6Al-4V',
    body:    '3-week lead time. 2 alternatives ≤7 days.',
    delay:   0.72,
    floatY:  -10,
    floatDur: 5.6,
    floatDelay: 1.6,
  },
  {
    pos:     { bottom: '12%', left: '12%' },
    border:  'rgba(110,231,183,0.5)',
    color:   'rgb(167,243,208)',
    label:   'Should-cost',
    body:    '₹4,820 / unit · benchmark across 72K data points',
    delay:   0.88,
    floatY:  -7,
    floatDur: 4.9,
    floatDelay: 1.2,
  },
]

export default function DesignSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="design"
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
                  01 · Design intelligence
                </div>
                <h2
                  className="em-text-gradient mt-4 text-balance font-semibold leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
                >
                  Design with the supply chain built in.
                </h2>
                <div className="mt-8 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      Design teams decide without supply chain input. Cost and manufacturability
                      surprises emerge after design lock. Every redesign costs time and money.
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(45,212,191,0.8)' }}>
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                      Embed manufacturing and supplier intelligence directly into the design
                      process — real-time, in the CAD.
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
              className="em-glow-border em-glass relative overflow-hidden rounded-2xl"
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3
                              text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span>bracket_v12.step</span>
                <span>CAD · live DFM</span>
              </div>

              {/* Viewport */}
              <div className="relative h-[460px]">

                {/* One-shot scan line — sweeps down the viewport on enter */}
                <motion.div
                  className="pointer-events-none absolute left-0 right-0 z-10 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${T}88, transparent)` }}
                  initial={{ top: 0, opacity: 0 }}
                  animate={inView ? { top: '100%', opacity: [0, 0.85, 0.85, 0] } : {}}
                  transition={{ duration: 1.8, delay: 0.3, ease: 'linear' }}
                />

                {/* CAD grid */}
                <div className="em-grid absolute inset-0 opacity-50" />

                {/* Rotating wireframe */}
                <svg viewBox="0 0 400 400" className="absolute inset-0 m-auto h-[80%] w-[80%]">
                  <defs>
                    <linearGradient id="em-wire" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%"   stopColor="white"           stopOpacity="0.9" />
                      <stop offset="100%" stopColor="rgb(45,212,191)" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  <g
                    fill="none"
                    stroke="url(#em-wire)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    style={{ transformOrigin: '200px 200px', animation: 'em-spin-slow 40s linear infinite' }}
                  >
                    <polygon points="120,80 280,80 320,160 200,260 80,160" />
                    <polygon points="120,80 200,40 280,80" />
                    <polygon points="280,80 320,160 360,140 320,80" />
                    <polygon points="80,160 200,260 240,310 60,220" />
                    <line x1="200" y1="40"  x2="200" y2="260" strokeDasharray="3 4" />
                    <line x1="120" y1="80"  x2="200" y2="260" strokeDasharray="2 5" />
                    <line x1="280" y1="80"  x2="200" y2="260" strokeDasharray="2 5" />
                  </g>
                </svg>

                {/* Floating annotation cards */}
                {ANNOTATIONS.map(({ pos, border, color, label, body, delay, floatY, floatDur, floatDelay }) => (
                  <div key={label} className="absolute" style={pos}>
                    {/* Entrance */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 10 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{ duration: 0.55, delay, ease: EASE }}
                    >
                      {/* Continuous float — different rhythm per card */}
                      <motion.div
                        animate={{ y: [0, floatY, 0] }}
                        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
                        className="em-glass max-w-[230px] rounded-xl p-3 text-[11px]"
                        style={{ border: `1px solid ${border}`, color }}
                      >
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] opacity-80">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                          </span>
                          {label}
                        </div>
                        <div className="text-white/90">{body}</div>
                      </motion.div>
                    </motion.div>
                  </div>
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
                  "Our design team used to learn about manufacturing constraints from rejection
                  emails. Now they design with them built in. Saves us 15 days per product cycle."
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  — Aerospace component manufacturer
                </figcaption>
              </motion.figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

const STATS = [
  { value: '−40%',  label: 'Design cycle time' },
  { value: '−85%',  label: 'Cost surprises'    },
  { value: '−3.0w', label: 'Lead time'         },
  { value: '99%',   label: 'First-pass DFM'    },
]

const ANNOTATIONS = [
  {
    pos:     { top: '18%', left: '8%' },
    border:  'rgba(252,211,77,0.5)',
    color:   'rgb(202,158,30)',
    label:   'Tolerance H7',
    body:    '40% costlier with Indian suppliers — optimize?',
    delay:   0.55,
    floatY:  -8,
    floatDur: 4.2,
    floatDelay: 0.9,
  },
  {
    pos:     { top: '55%', right: '6%' },
    border:  `rgba(13,158,138,0.6)`,
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
    border:  'rgba(13,158,138,0.4)',
    color:   '#0d7a6a',
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
      className="relative bg-white"
      style={{
        paddingTop:      'clamp(4rem, 8vw, 7rem)',
        paddingBottom:   'clamp(5rem, 10vw, 9rem)',
        borderTop:       '1px solid rgba(0,0,0,0.06)',
        scrollMarginTop: '160px',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid gap-12 md:grid-cols-12">

          {/* ── LEFT: Sticky editorial ── */}
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
                <p className="mt-4 text-balance text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900">
                  Design with the{' '}
                  <AnimatedText
                    text="supply chain built in."
                    textClassName="text-gray-900 font-bold"
                    underlineColor="oklch(0.68 0.13 180)"
                    underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                    underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                    underlineDuration={1.8}
                  />
                </p>
                <div className="mt-8 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/60">
                      Design teams decide without supply chain input. Cost and manufacturability
                      surprises emerge after design lock. Every redesign costs time and money.
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: T }}>
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/75">
                      Embed manufacturing and supplier intelligence directly into the design
                      process — real-time, in the CAD.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Visuals ── */}
          <div className="md:col-span-7">

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: 'rgba(13,17,23,0.97)',
                border: `1px solid rgba(13,158,138,0.2)`,
                boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
              }}
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3
                              text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span>bracket_v12.step</span>
                <span>CAD · live DFM</span>
              </div>

              {/* Viewport */}
              <div className="relative h-[460px]">

                <motion.div
                  className="pointer-events-none absolute left-0 right-0 z-10 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(13,158,138,0.6), transparent)` }}
                  initial={{ top: 0, opacity: 0 }}
                  animate={inView ? { top: '100%', opacity: [0, 0.85, 0.85, 0] } : {}}
                  transition={{ duration: 1.8, delay: 0.3, ease: 'linear' }}
                />

                <div className="em-grid absolute inset-0 opacity-50" />

                <svg viewBox="0 0 400 400" className="absolute inset-0 m-auto h-[80%] w-[80%]">
                  <defs>
                    <linearGradient id="em-wire" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%"   stopColor="white"           stopOpacity="0.9" />
                      <stop offset="100%" stopColor="rgb(13,158,138)" stopOpacity="0.9" />
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
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 10 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{ duration: 0.55, delay, ease: EASE }}
                    >
                      <motion.div
                        animate={{ y: [0, floatY, 0] }}
                        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
                        className="max-w-[230px] rounded-xl p-3 text-[11px]"
                        style={{
                          background: 'rgba(13,17,23,0.9)',
                          backdropFilter: 'blur(12px)',
                          border: `1px solid ${border}`,
                          color,
                        }}
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
                    className="rounded-xl border border-black/8 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="font-display text-2xl font-semibold" style={{ color: T }}>{value}</div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.figure
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
                className="mt-5 rounded-xl border border-black/8 bg-[#fafafa] p-5"
              >
                <blockquote className="font-display text-pretty text-sm leading-relaxed text-black/70">
                  "Our design team used to learn about manufacturing constraints from rejection
                  emails. Now they design with them built in. Saves us 15 days per product cycle."
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
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

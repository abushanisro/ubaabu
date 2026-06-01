'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldAlert, Zap, Gauge } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

type Cell = 'n' | 't' | 'a' | 'r'

const HEATMAP: Cell[] = [
  'n','r','n','t','n','t','a','n','n','t','r','r',
  'n','r','a','t','r','t','a','n','a','t','a','n',
  'n','n','t','n','n','t','r','a','n','n','n','t',
  'r','r','t','a','t','r','t','n','a','a','n','t',
  'n','n','n','n','a','t','n','r','t','n','n','n',
  'n','n','a','n','n','n','n','t','n','n','n','t',
]

const CELL_BG: Record<Cell, string> = {
  n: 'rgba(0,0,0,0.06)',
  t: `rgba(13,158,138,0.65)`,
  a: 'rgba(251,191,36,0.65)',
  r: 'rgba(239,68,68,0.75)',
}

const ALERTS = [
  {
    Icon:   ShieldAlert,
    color:  'rgb(220,38,38)',
    border: 'rgba(239,68,68,0.25)',
    title:  'Supplier 17',
    detail: 'Utilization 96% · 12-day risk',
  },
  {
    Icon:   Zap,
    color:  'rgb(180,130,0)',
    border: 'rgba(252,211,77,0.3)',
    title:  'Port Mundra',
    detail: 'Congestion +4 days vs avg',
  },
  {
    Icon:   Gauge,
    color:  T,
    border: `rgba(13,158,138,0.25)`,
    title:  'Buffer optimal',
    detail: 'Reduce stock −8% safely',
  },
]

const STATS = [
  { value: '99%',  label: 'OTIF visibility' },
  { value: '−90%', label: 'Surprises'       },
  { value: '−75%', label: 'Risk incidents'  },
  { value: '−25%', label: 'Buffer stock'    },
]

const gridContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.014, delayChildren: 0.25 } },
}
const cellItem = {
  hidden:  { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1,  transition: { duration: 0.28 } },
}

export default function RiskSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="risk"
      className="relative"
      style={{
        background:      '#fafafa',
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
                  04 · Risk intelligence
                </div>
                <p className="mt-4 text-balance text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900">
                  See the delay{' '}
                  <AnimatedText
                    text="before it happens."
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
                      You rely on promised delivery dates and discover delays too late. By the
                      time you know, the project is on fire.
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: T }}>
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/75">
                      Predictive supply chain monitoring that flags risk weeks early —
                      utilization, geopolitics, finance, quality, weather.
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
              className="overflow-hidden rounded-2xl p-6"
              style={{
                background: 'rgba(13,17,23,0.97)',
                border: `1px solid rgba(13,158,138,0.2)`,
                boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
              }}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span>OTIF risk heatmap · next 90 days</span>
                <span className="text-red-400">3 critical alerts</span>
              </div>

              {/* Heatmap grid */}
              <div className="relative mt-4">
                <motion.div
                  className="pointer-events-none absolute inset-x-0 z-10 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(13,158,138,0.7), transparent)` }}
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
                    className="rounded-xl p-3"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${border}`,
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color }} aria-hidden />
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
                className="mt-5 rounded-xl border border-black/8 bg-white p-5"
              >
                <blockquote className="font-display text-pretty text-sm leading-relaxed text-black/70">
                  "We caught a tier-2 supplier's capacity crunch six weeks before our T1 felt it.
                  That's the entire value of predictive risk."
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
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

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, BarChart2, Search, Star, Wrench } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: BarChart2, text: 'Provides real-time quality metrics by part/supplier' },
  { icon: Search,    text: 'Analyzes defect trends & root causes'                 },
  { icon: Star,      text: 'Scores supplier quality'                              },
  { icon: Wrench,    text: 'Manages corrective action workflows'                  },
]

const STATS = [
  { label: 'Quality visibility', value: 'Real',    suffix: '-time' },
  { label: 'Quality variance',   value: '−18',     suffix: '%'     },
  { label: 'Defect detection',   value: 'Earlier', suffix: ''      },
  { label: 'Corrective action',  value: 'Faster',  suffix: ''      },
]

// Supplier quality rows for the dashboard
const SUPPLIERS = [
  { name: 'Apex Precision', score: 96, yield: '99.1%', defects: 2,  status: 'pass'  },
  { name: 'VeeTech Works',  score: 88, yield: '97.4%', defects: 8,  status: 'watch' },
  { name: 'Pinnacle Parts', score: 71, yield: '94.2%', defects: 21, status: 'fail'  },
]

const STATUS_COLOR: Record<string, { dot: string; text: string; label: string }> = {
  pass:  { dot: '#22c55e', text: 'rgba(34,197,94,0.8)',  label: 'PASS'  },
  watch: { dot: '#f59e0b', text: 'rgba(245,158,11,0.8)', label: 'WATCH' },
  fail:  { dot: '#ef4444', text: 'rgba(239,68,68,0.8)',  label: 'FAIL'  },
}

// Defect trend sparkline (relative values)
const TREND = [42, 38, 51, 35, 29, 44, 31, 22, 18, 15, 12, 9]

// ── Quality Guard visualization ───────────────────────────────────────────────
function QualityGuardViz({ inView }: { inView: boolean }) {
  const maxT = Math.max(...TREND)

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: '#0c1117' }}>

      {/* Teal glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(20,184,166,0.12) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] font-mono text-white/30 tracking-widest">QUALITY GUARD · LIVE INSPECTION</span>
        <div className="flex items-center gap-1 text-[10px] text-teal-400">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          AI
        </div>
      </div>

      <div className="px-5 pt-4 pb-3 flex flex-col gap-4" style={{ height: 'calc(100% - 44px)' }}>

        {/* Scan panel + defect trend — top row */}
        <div className="flex gap-4 flex-1">

          {/* Scan panel */}
          <div className="relative w-28 h-full rounded-xl overflow-hidden border border-white/[0.08] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <ShieldCheck className="w-12 h-12 text-white/15" />
            {/* Scan line */}
            <motion.div
              className="absolute left-0 right-0 h-0.5"
              style={{ background: 'rgba(20,184,166,0.85)', boxShadow: '0 0 12px rgba(20,184,166,0.9)' }}
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Scanned overlay */}
            <motion.div
              className="absolute left-0 right-0 top-0"
              style={{ background: 'rgba(20,184,166,0.1)' }}
              animate={{ height: ['10%', '90%', '10%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Corner markers */}
            {[['top-2 left-2', 'border-t border-l'], ['top-2 right-2', 'border-t border-r'],
              ['bottom-2 left-2', 'border-b border-l'], ['bottom-2 right-2', 'border-b border-r']].map(([pos, border], i) => (
              <div key={i} className={`absolute ${pos} w-3 h-3 ${border} border-teal-500/50`} />
            ))}
            <div className="absolute bottom-2 inset-x-0 text-center text-[8px] font-mono text-teal-400/70">SCANNING</div>
          </div>

          {/* Defect trend chart */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Defect trend</span>
              <span className="text-[9px] font-mono text-teal-400">↓ improving</span>
            </div>
            <div className="relative flex items-end gap-[3px]" style={{ height: 60 }}>
              {TREND.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease: EASE }}
                  className="flex-1 rounded-sm origin-bottom"
                  style={{
                    height: `${(v / maxT) * 100}%`,
                    background: i >= 8
                      ? 'rgba(20,184,166,0.55)'
                      : `rgba(239,68,68,${0.15 + (v / maxT) * 0.35})`,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] text-white/20 font-mono">12 wks ago</span>
              <span className="text-[8px] text-white/20 font-mono">now</span>
            </div>
          </div>
        </div>

        {/* Supplier quality table */}
        <div>
          <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest mb-2">Supplier quality scores</div>
          <div className="space-y-1.5">
            {SUPPLIERS.map(({ name, score, yield: yld, defects, status }, i) => {
              const sc = STATUS_COLOR[status]
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.5 + i * 0.1, ease: EASE }}
                  className="flex items-center gap-3 rounded-lg px-3 py-1.5 border border-white/[0.06]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <span className="text-[10px] font-medium text-white/55 w-28 truncate">{name}</span>
                  {/* Score bar */}
                  <div className="flex-1 h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${score}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: EASE }}
                      style={{ background: sc.dot }}
                    />
                  </div>
                  <span className="text-[9px] font-mono w-6 text-right" style={{ color: sc.dot }}>{score}</span>
                  <span className="text-[9px] font-mono text-white/30 w-10 text-center">{yld}</span>
                  <span className="text-[9px] font-mono" style={{ color: defects > 10 ? '#ef4444' : '#f59e0b', opacity: defects > 10 ? 1 : 0.7 }}>
                    {defects}d
                  </span>
                  <span className="text-[8px] font-mono font-bold" style={{ color: sc.dot }}>{sc.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/[0.06]">
        {[['99.1%', 'best yield'], ['−71%', 'defects (12wk)'], ['1', 'CAPA open']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-teal-400">{val}</span>
            <span className="text-[10px] text-white/30">{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[10px] text-white/25">
          <span className="h-1 w-1 rounded-full bg-teal-400 animate-pulse" />
          scanning
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function QualityGuardSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Quality Guard module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient — top-center */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 35% at 50% 0%, rgba(20,184,166,0.05) 0%, transparent 100%)' }} />

      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16">

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-16 pb-0 group">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div className="lg:w-5/12 relative z-10">
            <div className="sticky top-28">

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, ease: EASE }}
                className="relative w-16 h-16 rounded-2xl mb-6 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 100%)', border: '1px solid rgba(20,184,166,0.25)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))' }} />
                <ShieldCheck className="w-7 h-7 text-teal-600 relative z-10" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 0 6px rgba(20,184,166,0.08)' }} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-3"
              >
                Quality{' '}
                <AnimatedText
                  text="Guard"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Quality Intelligence Built Into Your Supply Chain
                </span>
              </motion.p>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                className="origin-left h-0.5 w-16 rounded-full mb-10"
                style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }}
              />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="hidden lg:block h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <QualityGuardViz inView={inView} />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────────── */}
          <div className="lg:w-7/12 space-y-5 z-10">

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="relative rounded-2xl overflow-hidden border border-black/8 hover:border-teal-200 transition-colors duration-300"
              style={{ background: '#ffffff' }}
            >
              <div className="absolute left-0 inset-y-0 w-1 rounded-l-2xl"
                style={{ background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' }} />
              <div className="pl-7 pr-7 pt-7 pb-7">
                <h3 className="text-xs font-mono text-black/40 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                  Capabilities
                </h3>
                <ul className="space-y-3.5">
                  {CAPABILITIES.map(({ icon: Icon, text }, i) => (
                    <motion.li
                      key={text}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.26 + i * 0.07, ease: EASE }}
                      className="flex items-start gap-3.5 group/item cursor-default"
                    >
                      <div className="shrink-0 mt-0.5 w-6 h-6 rounded-md bg-teal-50 border border-teal-100 flex items-center justify-center
                                      group-hover/item:bg-teal-100 group-hover/item:border-teal-200 transition-colors duration-200">
                        <Icon className="w-3.5 h-3.5 text-teal-500" />
                      </div>
                      <span className="text-sm text-black/60 leading-relaxed group-hover/item:text-black/80 transition-colors duration-200">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ label, value, suffix }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.46 + i * 0.09, ease: EASE }}
                  className="relative overflow-hidden rounded-xl border border-black/8 p-5 group/stat cursor-default
                             hover:border-teal-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/[0.06] to-teal-400/0
                                  -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700 ease-in-out" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0
                                  group-hover/stat:scale-x-100 transition-transform duration-400 ease-out rounded-b-xl"
                    style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }} />
                  <div className="text-[10px] font-mono text-black/40 uppercase tracking-wider mb-2 relative z-10">{label}</div>
                  <div className="relative z-10 flex items-baseline gap-0.5">
                    <span className="text-2xl md:text-3xl font-bold text-[#0d1117] group-hover/stat:text-[#0d9e8a] transition-colors duration-300 leading-none">
                      {value}
                    </span>
                    {suffix && (
                      <span className="text-sm font-medium text-black/55 group-hover/stat:text-[#0d9e8a] transition-colors duration-300">
                        {suffix}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

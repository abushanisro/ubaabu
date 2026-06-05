'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, LayoutDashboard, BellRing, IndianRupee, GitMerge } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: LayoutDashboard, text: 'Unifies project status (supplier, quality, delivery)'  },
  { icon: BellRing,        text: 'Automates alerts for risks and constraints'            },
  { icon: IndianRupee,     text: 'Tracks project-level costs'                            },
  { icon: GitMerge,        text: 'Manages milestones & critical path'                    },
]

const STATS = [
  { label: 'Project visibility',      value: '100',  suffix: '%'  },
  { label: 'On-time delivery',        value: '+22',  suffix: '%'  },
  { label: 'Supply chain surprises',  value: '−85',  suffix: '%'  },
  { label: 'Coordination overhead',   value: '−40',  suffix: '%'  },
]

// Project tracks for the Gantt-style visualization
const TRACKS = [
  { name: 'Design & BOM',    pct: 100, status: 'done',    start: 0,  width: 35 },
  { name: 'Supplier Lock-in',pct: 100, status: 'done',    start: 20, width: 30 },
  { name: 'PPAP / Quality',  pct: 70,  status: 'active',  start: 40, width: 40 },
  { name: 'Production Run',  pct: 20,  status: 'active',  start: 65, width: 30 },
  { name: 'Delivery & OTIF', pct: 0,   status: 'pending', start: 80, width: 20 },
]

const MILESTONES = [
  { pct: 0,   label: 'Kick-off', done: true  },
  { pct: 35,  label: 'Design',   done: true  },
  { pct: 70,  label: 'PPAP',     done: false, current: true },
  { pct: 100, label: 'Launch',   done: false },
]

// ── Launch Tracker visualization ──────────────────────────────────────────────
function LaunchTrackerViz({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: '#0c1117' }}>

      {/* Teal glow on active zone */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 70% 55%, rgba(20,184,166,0.1) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] font-mono text-white/30 tracking-widest">LAUNCH TRACKER · PROJECT-001</span>
        <div className="flex items-center gap-1 text-[10px] text-teal-400">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-3">

        {/* Milestone timeline */}
        <div className="relative mb-5">
          {/* Base track */}
          <div className="h-1 bg-white/10 rounded-full relative overflow-hidden">
            {/* Teal fill to 70% */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-teal-500 rounded-full"
              initial={{ width: '0%' }}
              animate={inView ? { width: '70%' } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>
          {/* Milestone dots */}
          {MILESTONES.map(({ pct, label, done, current }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: EASE }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${pct}%` }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full border-2 -mt-0.5"
                style={{
                  background: done || current ? '#0c1117' : '#0c1117',
                  borderColor: done ? '#2dd4bf' : current ? '#2dd4bf' : 'rgba(255,255,255,0.2)',
                  boxShadow: current ? '0 0 8px rgba(20,184,166,0.7)' : 'none',
                }}
              />
              <span className="text-[9px] font-mono mt-1.5 whitespace-nowrap"
                style={{ color: done || current ? 'rgba(45,212,191,0.8)' : 'rgba(255,255,255,0.25)' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Gantt-style tracks */}
        <div className="space-y-2.5 mt-7">
          {TRACKS.map(({ name, pct, status, start, width }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.08, ease: EASE }}
              className="flex items-center gap-3"
            >
              {/* Track label */}
              <span className="text-[10px] font-mono text-white/40 w-28 shrink-0 truncate">{name}</span>
              {/* Track bar container */}
              <div className="relative flex-1 h-4 bg-white/[0.03] rounded">
                {/* Bar background (track width) */}
                <div
                  className="absolute top-0 h-full rounded"
                  style={{
                    left: `${start}%`,
                    width: `${width}%`,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Fill */}
                  <motion.div
                    className="h-full rounded"
                    initial={{ width: '0%' }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 0.9, delay: 0.7 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                    style={{
                      background: status === 'done'
                        ? 'rgba(45,212,191,0.35)'
                        : status === 'active'
                        ? 'linear-gradient(90deg, rgba(45,212,191,0.4), rgba(45,212,191,0.2))'
                        : 'rgba(255,255,255,0.06)',
                    }}
                  />
                </div>
              </div>
              {/* Status dot */}
              <div className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  background: status === 'done' ? '#2dd4bf' : status === 'active' ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                  boxShadow: status === 'active' ? '0 0 5px rgba(245,158,11,0.6)' : 'none',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/[0.06]">
        {[['70%', 'complete'], ['2', 'at risk'], ['Day 84', 'of 120']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-teal-400">{val}</span>
            <span className="text-[10px] text-white/30">{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-3 text-[9px] font-mono">
          {[['#2dd4bf', 'done'], ['#f59e0b', 'active'], ['rgba(255,255,255,0.2)', 'pending']].map(([color, lbl]) => (
            <span key={lbl} className="flex items-center gap-1 text-white/30">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              {lbl}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function LaunchTrackerSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Launch Tracker module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient — center */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

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
                <Activity className="w-7 h-7 text-teal-600 relative z-10" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 0 6px rgba(20,184,166,0.08)' }} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-3"
              >
                Launch{' '}
                <AnimatedText
                  text="Tracker"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Real-Time Project Intelligence Across Supply Chain
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
                <LaunchTrackerViz inView={inView} />
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
                  <Activity className="w-3.5 h-3.5 text-teal-500" />
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
                    <span className="text-sm font-medium text-black/55 group-hover/stat:text-[#0d9e8a] transition-colors duration-300">
                      {suffix}
                    </span>
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

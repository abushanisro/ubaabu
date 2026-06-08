'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Radar, Database, Shield, AlertTriangle, Map } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import { SectionDivider } from '@/components/products/SectionDivider'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: Database,      text: 'Aggregates supplier data continuously'              },
  { icon: Shield,        text: 'Calculates composite supplier health scoring'        },
  { icon: AlertTriangle, text: 'Predicts supplier risk'                             },
  { icon: Map,           text: 'Maps supplier capabilities'                         },
]

const STATS = [
  { label: 'Supplier discovery', value: '+300', suffix: '%'          },
  { label: 'Quality variance',   value: '−18',  suffix: '%'          },
  { label: 'Risk incidents',     value: '−75',  suffix: '%'          },
  { label: 'Consolidation',      value: 'Data', suffix: '-driven'    },
]

// Supplier blips on the radar
const BLIPS = [
  { x: 62,  y: 38,  status: 'green',  label: 'SUP-04', score: '94' },
  { x: 38,  y: 62,  status: 'green',  label: 'SUP-11', score: '88' },
  { x: 72,  y: 66,  status: 'amber',  label: 'SUP-07', score: '71' },
  { x: 28,  y: 35,  status: 'green',  label: 'SUP-19', score: '91' },
  { x: 55,  y: 75,  status: 'red',    label: 'SUP-02', score: '43' },
  { x: 42,  y: 28,  status: 'amber',  label: 'SUP-15', score: '66' },
  { x: 78,  y: 48,  status: 'green',  label: 'SUP-23', score: '87' },
]

const STATUS_COLOR: Record<string, string> = {
  green: '#22c55e',
  amber: '#f59e0b',
  red:   '#ef4444',
}

// ── Radar visualization ───────────────────────────────────────────────────────
function RadarViz({ inView }: { inView: boolean }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf9 100%)',
        border: '1px solid rgba(20,184,166,0.18)',
        boxShadow: '0 0 20px rgba(45,212,191,0.12), 0 0 60px rgba(45,212,191,0.06), 0 24px 64px rgba(0,0,0,0.06)',
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(13,148,136,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

      {/* Teal radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle 120px at 50% 56%, rgba(45,212,191,0.10) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: '#d9f2ee' }}>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-300/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
        </div>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#94a3b8' }}>SUPPLIER RADAR · 72K+ NODES</span>
        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#2dd4bf' }} />
      </div>

      {/* Radar scene */}
      <div className="relative flex items-center justify-center" style={{ height: 256 }}>

        {/* Crosshair lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-full h-px" style={{ background: 'rgba(13,148,136,0.12)' }} />
          <div className="absolute h-full w-px" style={{ background: 'rgba(13,148,136,0.12)' }} />
        </div>

        {/* Concentric rings */}
        {[1, 1.65, 2.3].map((scale, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={inView ? { opacity: 1 - i * 0.22, scale } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }}
            className="absolute rounded-full"
            style={{ width: 110, height: 110, border: '1px solid rgba(45,212,191,0.30)' }}
          />
        ))}

        {/* Rotating radar sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full"
          style={{
            width: 110 * 2.3,
            height: 110 * 2.3,
            background: 'conic-gradient(transparent 70%, rgba(45,212,191,0.18) 100%)',
          }}
        />

        {/* Centre dot */}
        <div className="absolute w-2.5 h-2.5 rounded-full z-10"
          style={{ background: '#2dd4bf', boxShadow: '0 0 12px rgba(45,212,191,0.8)' }} />

        {/* Supplier blips */}
        {BLIPS.map(({ x, y, status, label, score }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: EASE }}
            className="absolute group/blip cursor-default"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${STATUS_COLOR[status]}` }}
              animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }}
            />
            <div className="w-2 h-2 rounded-full"
              style={{ background: STATUS_COLOR[status], boxShadow: `0 0 6px ${STATUS_COLOR[status]}` }} />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/blip:opacity-100
                            transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
              <div className="rounded-md px-2 py-1 text-[9px] font-mono"
                style={{ background: '#0f1b2d', border: '1px solid rgba(217,242,238,0.3)', color: '#94a3b8' }}>
                {label} · <span style={{ color: STATUS_COLOR[status] }}>{score}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-5 px-4 py-2.5 border-t" style={{ borderColor: '#d9f2ee', background: '#f0fdf9' }}>
        {[['1,284', 'active'], ['3', 'at risk'], ['98.6%', 'OTIF']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-bold" style={{ color: '#0d9488' }}>{val}</span>
            <span className="text-[10px]" style={{ color: '#94a3b8' }}>{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-3 text-[9px] font-mono">
          {(['green', 'amber', 'red'] as const).map(s => (
            <span key={s} className="flex items-center gap-1" style={{ color: STATUS_COLOR[s] }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLOR[s] }} />
              {s === 'green' ? 'healthy' : s === 'amber' ? 'watch' : 'risk'}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function SupplierRadarSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Supplier Radar module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient — top-right for variety */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 80% 25%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12">

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-10 pb-0 group">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div className="lg:w-5/12 relative z-10">
            <div className="lg:sticky lg:top-28">

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, ease: EASE }}
                className="flex items-center justify-center rounded-lg shrink-0 mb-6"
                style={{
                  width: 44, height: 44,
                  background: 'rgba(240,253,249,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(20,184,166,0.22)',
                  boxShadow: 'rgba(0,0,0,0.06) 0px 2px 6px, rgba(255,255,255,0.75) 0px 1px 0px inset',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ overflow: 'visible' }}>
                  <rect x="16" y="16" width="8" height="8" rx="2" fill="#2dd4bf" />
                  <rect x="4" y="4" width="8" height="8" rx="2" fill="#0d9488" />
                  <rect x="28" y="4" width="8" height="8" rx="2" fill="#0d9488" />
                  <rect x="4" y="28" width="8" height="8" rx="2" fill="#0f1b2d" opacity="0.7" />
                  <rect x="28" y="28" width="8" height="8" rx="2" fill="#0f1b2d" opacity="0.7" />
                  <rect x="11" y="19" width="5" height="2" rx="1" fill="#0d9488" opacity="0.4" />
                  <rect x="24" y="19" width="5" height="2" rx="1" fill="#0d9488" opacity="0.4" />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-3"
              >
                Supplier{' '}
                <AnimatedText
                  text="Radar"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Know Your Supplier Ecosystem in Real Time
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
                className="block h-[260px] lg:h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <RadarViz inView={inView} />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────────── */}
          <div className="lg:w-7/12 space-y-5 z-10 lg:self-center">

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
                  <Radar className="w-3.5 h-3.5 text-teal-500" />
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
      <SectionDivider />
    </section>
  )
}

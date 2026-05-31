'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Truck, MapPin, AlertTriangle, IndianRupee, FileText } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: Truck,         text: 'Tracks real-time shipments'                  },
  { icon: AlertTriangle, text: 'Predicts delivery risks'                     },
  { icon: IndianRupee,   text: 'Analyzes logistics costs'                    },
  { icon: FileText,      text: 'Automates customs & documentation'           },
]

const KEY_FEATURES = [
  'Real-time tracking',
  'Delay risk prediction',
  'Logistics cost analysis',
  'Documentation automation',
  'Supplier logistics scoring',
]

const BUILT_FOR = [
  { role: 'Supply chain teams', initials: 'SC' },
  { role: 'Procurement',        initials: 'PR' },
  { role: 'Program managers',   initials: 'PM' },
  { role: 'Finance',            initials: 'FN' },
]

const STATS = [
  { label: 'OTIF visibility',      value: '98.6', suffix: '%+'   },
  { label: 'Risk prediction',      value: '94',   suffix: '%+'   },
  { label: 'Last-minute surprises',value: '−85',  suffix: '%'    },
  { label: 'Logistics savings',    value: '10',   suffix: '–15%' },
]

// Active shipments on the route
const SHIPMENTS = [
  { id: 'SHP-041', origin: 'Pune',    dest: 'Delhi',   progress: 0.82, status: 'ontime',  eta: '2h'  },
  { id: 'SHP-038', origin: 'Chennai', dest: 'Mumbai',  progress: 0.45, status: 'delayed', eta: '+4h' },
  { id: 'SHP-052', origin: 'Hosur',   dest: 'Pune',    progress: 0.18, status: 'ontime',  eta: '8h'  },
]

const STATUS_COLOR = { ontime: '#22c55e', delayed: '#f59e0b', delivered: '#2dd4bf' }

// Route SVG path (sinusoidal wave)
const ROUTE_D = 'M 0 64 Q 100 0, 200 64 T 400 64'

// ── Shipment Hub visualization ────────────────────────────────────────────────
function ShipmentViz({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: '#0c1117' }}>

      {/* Teal glow along route */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 30% at 60% 55%, rgba(20,184,166,0.1) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] font-mono text-white/30 tracking-widest">SHIPMENT HUB · LIVE TRACKING</span>
        <div className="flex items-center gap-1 text-[10px] text-teal-400">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          LIVE
        </div>
      </div>

      <div className="px-5 pt-3 pb-3 flex flex-col gap-3" style={{ height: 'calc(100% - 44px)' }}>

        {/* Route map */}
        <div className="relative" style={{ height: 100 }}>
          {/* Origin / Destination markers */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <span className="text-[8px] font-mono text-white/25">ORIGIN</span>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full border-2 border-white/25 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white/40" />
            </div>
            <span className="text-[8px] font-mono text-white/25">DEST</span>
          </div>

          <svg className="absolute inset-0 w-full h-full overflow-visible px-10" style={{ paddingLeft: 32, paddingRight: 32 }} preserveAspectRatio="none">
            {/* Background dashed route */}
            <path d={ROUTE_D} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 6" />
            {/* Teal route drawn on scroll */}
            <motion.path
              d={ROUTE_D}
              fill="none" stroke="rgba(20,184,166,0.45)" strokeWidth="2"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            />
            {/* Animated shipment dots */}
            {SHIPMENTS.map((s, i) => (
              <g key={s.id}>
                <circle r="5" opacity="0">
                  <animateMotion
                    path={ROUTE_D}
                    dur={`${8 + i * 3}s`}
                    repeatCount="indefinite"
                    begin={`${-s.progress * (8 + i * 3)}s`}
                  />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.95;1"
                    dur={`${8 + i * 3}s`} repeatCount="indefinite" begin={`${-s.progress * (8 + i * 3)}s`} />
                  <animate attributeName="fill" values={STATUS_COLOR[s.status as keyof typeof STATUS_COLOR]}
                    dur={`${8 + i * 3}s`} repeatCount="indefinite" />
                </circle>
                {/* Glow */}
                <circle r="9" opacity="0" style={{ filter: `blur(4px)` }}>
                  <animateMotion
                    path={ROUTE_D}
                    dur={`${8 + i * 3}s`}
                    repeatCount="indefinite"
                    begin={`${-s.progress * (8 + i * 3)}s`}
                  />
                  <animate attributeName="opacity" values="0;0.4;0.4;0" keyTimes="0;0.05;0.95;1"
                    dur={`${8 + i * 3}s`} repeatCount="indefinite" begin={`${-s.progress * (8 + i * 3)}s`} />
                  <animate attributeName="fill" values={STATUS_COLOR[s.status as keyof typeof STATUS_COLOR]}
                    dur={`${8 + i * 3}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>
        </div>

        {/* Shipment status rows */}
        <div className="space-y-2">
          <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest">Active shipments</div>
          {SHIPMENTS.map(({ id, origin, dest, progress, status, eta }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.1, ease: EASE }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 border border-white/[0.06]"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="w-2 h-2 rounded-full shrink-0"
                style={{ background: STATUS_COLOR[status as keyof typeof STATUS_COLOR], boxShadow: `0 0 5px ${STATUS_COLOR[status as keyof typeof STATUS_COLOR]}` }} />
              <span className="text-[10px] font-mono text-white/50 w-16 shrink-0">{id}</span>
              <span className="text-[10px] text-white/35 shrink-0">{origin}</span>
              <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: STATUS_COLOR[status as keyof typeof STATUS_COLOR] }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${progress * 100}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: EASE }}
                />
              </div>
              <span className="text-[10px] text-white/35 shrink-0">{dest}</span>
              <span className="text-[10px] font-mono shrink-0"
                style={{ color: status === 'delayed' ? '#f59e0b' : 'rgba(45,212,191,0.7)' }}>
                {eta}
              </span>
            </motion.div>
          ))}
        </div>

        {/* OTIF mini-gauge */}
        <div className="flex items-center gap-4 pt-1">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-[9px] font-mono text-white/30">OTIF</span>
              <span className="text-[9px] font-mono text-teal-400">98.6%</span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-teal-500"
                initial={{ width: 0 }} animate={inView ? { width: '98.6%' } : {}}
                transition={{ duration: 1.2, delay: 0.8, ease: EASE }} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-[9px] font-mono text-white/30">On-Time</span>
              <span className="text-[9px] font-mono text-amber-400">94.1%</span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-amber-400"
                initial={{ width: 0 }} animate={inView ? { width: '94.1%' } : {}}
                transition={{ duration: 1.2, delay: 0.9, ease: EASE }} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/[0.06]">
        {[['3', 'in transit'], ['1', 'at risk'], ['98.6%', 'OTIF']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-teal-400">{val}</span>
            <span className="text-[10px] text-white/30">{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-3 text-[9px] font-mono">
          {([['#22c55e', 'on-time'], ['#f59e0b', 'delayed']] as const).map(([color, lbl]) => (
            <span key={lbl} className="flex items-center gap-1 text-white/25">
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
export default function ShipmentHubSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Shipment Hub module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient — left-center */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 5% 50%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Decorative divider ── */}
        <div className="flex items-center gap-4 pt-10 pb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-xs font-mono text-teal-600 shrink-0"
          >
            <Truck className="w-3.5 h-3.5" />
            MOD_09 · Shipment Hub
          </motion.div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-16 pb-14 group">

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
                <Truck className="w-7 h-7 text-teal-600 relative z-10" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 0 6px rgba(20,184,166,0.08)' }} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-3 leading-[1.1]"
              >
                Shipment{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-teal-700">
                  Hub
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
                className="text-base text-slate-500 leading-relaxed mb-3"
              >
                Logistics Intelligence &amp; Delivery Tracking
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
                <ShipmentViz inView={inView} />
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
              className="relative rounded-2xl overflow-hidden border border-slate-100 hover:border-teal-200 transition-colors duration-300"
              style={{ background: 'linear-gradient(135deg, #f8fffd 0%, #ffffff 60%)' }}
            >
              <div className="absolute left-0 inset-y-0 w-1 rounded-l-2xl"
                style={{ background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' }} />
              <div className="pl-7 pr-7 pt-7 pb-7">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-teal-500" />
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
                      <span className="text-sm text-slate-600 leading-relaxed group-hover/item:text-slate-800 transition-colors duration-200">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Key Features + Built For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 overflow-hidden hover:border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {KEY_FEATURES.map((f, i) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: EASE }}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200
                                 px-3 py-1.5 rounded-lg hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700
                                 transition-all duration-200 cursor-default"
                    >
                      <span className="w-1 h-1 rounded-full bg-teal-400 shrink-0" />
                      {f}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.38, ease: EASE }}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 overflow-hidden hover:border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)', transform: 'translate(-30%,30%)' }} />
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Built For</h3>
                <div className="flex flex-col gap-2.5">
                  {BUILT_FOR.map(({ role, initials }, i) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.44 + i * 0.07, ease: EASE }}
                      className="flex items-center gap-3 group/role cursor-default"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/60
                                      flex items-center justify-center shrink-0 text-[9px] font-bold text-teal-600
                                      group-hover/role:from-teal-100 group-hover/role:to-teal-200 transition-colors duration-200">
                        {initials}
                      </div>
                      <span className="text-sm text-slate-600 group-hover/role:text-slate-800 transition-colors duration-200">{role}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ label, value, suffix }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.46 + i * 0.09, ease: EASE }}
                  className="relative overflow-hidden rounded-xl border border-slate-100 p-5 group/stat cursor-default
                             hover:border-teal-200 hover:shadow-lg transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #f8fffe 0%, #ffffff 100%)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/[0.06] to-teal-400/0
                                  -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700 ease-in-out" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0
                                  group-hover/stat:scale-x-100 transition-transform duration-400 ease-out rounded-b-xl"
                    style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }} />
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 relative z-10">{label}</div>
                  <div className="relative z-10 flex items-baseline gap-0.5">
                    <span className="text-2xl md:text-3xl font-bold text-slate-800 group-hover/stat:text-teal-600 transition-colors duration-300 leading-none">
                      {value}
                    </span>
                    <span className="text-sm font-medium text-slate-500 group-hover/stat:text-teal-500 transition-colors duration-300">
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

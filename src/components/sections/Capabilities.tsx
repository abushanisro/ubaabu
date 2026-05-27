'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─── Animated counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <span ref={ref}>{value}{suffix}</span>
}

/* ─── Metrics ─── */
const metrics = [
  { value: 40, suffix: '%', label: 'Faster Analysis', color: '#00d4ff' },
  { value: 60, suffix: '%', label: 'Less Manual Work', color: '#a78bfa' },
  { value: 3,  suffix: 'x', label: 'Improved Accuracy', color: '#2dd4bf' },
  { value: 25, suffix: '%', label: 'Lower Cycle Cost', color: '#818cf8' },
]

/* ─── VAVE Visual ─── */
function VaveVisual() {
  const lines = [
    { text: '> Analyzing component: Bracket_v4.stp', delay: 0 },
    { text: '  [AI] Material substitution found', delay: 0.6, accent: true },
    { text: '  → Switch AISI 1045 → 6061-T6 Aluminum', delay: 1.0 },
    { text: '  → Weight reduction: 42%', delay: 1.4, accent: true },
    { text: '  → Cost delta: -$3.80/unit', delay: 1.8, accent: true },
    { text: '  [AI] Geometry simplification possible', delay: 2.2 },
    { text: '  → Remove 4 redundant fillets', delay: 2.6 },
    { text: '  → Machining time -18 min/part', delay: 3.0, accent: true },
  ]
  const [visible, setVisible] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisible(i)
      if (i >= lines.length) clearInterval(interval)
    }, 600)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden"
      style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
      {/* header bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(0,212,255,0.1)', background: 'rgba(0,212,255,0.06)' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs font-mono" style={{ color: 'rgba(0,212,255,0.6)' }}>emithran-ai — vave-engine v2.4.1</span>
      </div>
      <div className="p-5 font-mono text-xs space-y-1.5 min-h-[240px]">
        {lines.map((l, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={visible > i ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
            style={{ color: l.accent ? '#00d4ff' : 'rgba(255,255,255,0.55)' }}>
            {l.text}
          </motion.div>
        ))}
        {visible >= lines.length && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            style={{ color: '#00d4ff' }}>█</motion.span>
        )}
      </div>
      {/* savings card */}
      <div className="mx-5 mb-5 rounded-xl p-4 flex items-center justify-between"
        style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
        <div>
          <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(0,212,255,0.6)' }}>Projected Savings</div>
          <div className="text-2xl font-bold text-white">$18.40<span className="text-sm font-normal text-white/40">/unit</span></div>
        </div>
        {/* mini bar chart */}
        <div className="flex items-end gap-1 h-10">
          {[0.4, 0.6, 0.5, 0.8, 0.7, 1.0, 0.9].map((h, i) => (
            <motion.div key={i} className="w-2 rounded-sm"
              initial={{ height: 0 }}
              animate={visible >= lines.length ? { height: `${h * 40}px` } : {}}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              style={{ background: `rgba(0,212,255,${0.3 + h * 0.5})` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── BOM Visual ─── */
function BomVisual() {
  const rows = [
    { part: 'BRK-001', desc: 'Steel Bracket', qty: 4, status: 'ok' },
    { part: 'BRK-001', desc: 'Steel Bracket (DUP)', qty: 4, status: 'dup' },
    { part: 'FTG-023', desc: 'Hydraulic Fitting', qty: 2, status: 'ok' },
    { part: 'MTR-088', desc: 'DC Motor 24V', qty: 1, status: 'error' },
    { part: 'PIN-004', desc: 'Alignment Pin', qty: 12, status: 'ok' },
    { part: 'SCR-011', desc: 'M6 Cap Screw', qty: 8, status: 'ok' },
  ]
  const [scanY, setScanY] = useState(0)
  const [scanDone, setScanDone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = 120
    const animate = () => {
      frame++
      setScanY(frame / total)
      if (frame < total) requestAnimationFrame(animate)
      else setScanDone(true)
    }
    setTimeout(() => requestAnimationFrame(animate), 400)
  }, [inView])

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden"
      style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.15)' }}>
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(167,139,250,0.12)', background: 'rgba(167,139,250,0.06)' }}>
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(167,139,250,0.8)' }}>BOM — Assembly_Rev3.xlsx</span>
        <motion.span className="text-xs font-mono px-2 py-0.5 rounded-full"
          animate={scanDone ? {} : { opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}>
          {scanDone ? '✓ Validation Complete' : '⬤ AI Validation Running...'}
        </motion.span>
      </div>
      {/* table */}
      <div className="relative overflow-hidden">
        {/* scan line */}
        {!scanDone && (
          <motion.div className="absolute left-0 right-0 h-8 pointer-events-none z-10"
            style={{ top: `${scanY * 100}%`, background: 'linear-gradient(to bottom, transparent, rgba(167,139,250,0.25), transparent)' }} />
        )}
        <div className="p-4 space-y-1">
          {/* header */}
          <div className="grid grid-cols-12 gap-2 text-xs uppercase tracking-widest px-2 pb-1"
            style={{ color: 'rgba(167,139,250,0.5)', borderBottom: '1px solid rgba(167,139,250,0.1)' }}>
            <span className="col-span-3">Part No.</span>
            <span className="col-span-6">Description</span>
            <span className="col-span-2 text-right">Qty</span>
            <span className="col-span-1 text-right">Flag</span>
          </div>
          {rows.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="grid grid-cols-12 gap-2 text-xs px-2 py-1.5 rounded-lg"
              style={{
                background: r.status === 'dup' ? 'rgba(251,191,36,0.08)'
                  : r.status === 'error' ? 'rgba(239,68,68,0.08)' : 'transparent',
                border: r.status === 'dup' ? '1px solid rgba(251,191,36,0.2)'
                  : r.status === 'error' ? '1px solid rgba(239,68,68,0.2)' : '1px solid transparent',
                color: 'rgba(255,255,255,0.75)'
              }}>
              <span className="col-span-3 font-mono" style={{ color: 'rgba(167,139,250,0.9)' }}>{r.part}</span>
              <span className="col-span-6">{r.desc}</span>
              <span className="col-span-2 text-right">{r.qty}</span>
              <span className="col-span-1 text-right">
                {r.status === 'dup' && <span style={{ color: '#fbbf24' }}>⚠</span>}
                {r.status === 'error' && <span style={{ color: '#ef4444' }}>✕</span>}
                {r.status === 'ok' && <span style={{ color: '#34d399' }}>✓</span>}
              </span>
            </motion.div>
          ))}
        </div>
        {/* 3D tilt hint */}
        {scanDone && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mx-4 mb-4 px-3 py-2 rounded-lg text-xs"
            style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: '#a78bfa' }}>
            AI found 2 issues: 1 duplicate part, 1 unknown SKU. Auto-fix available →
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ─── DFM Visual ─── */
function DfmVisual() {
  const annotations = [
    { label: 'Wall too thin', x: '22%', y: '28%', color: '#ef4444' },
    { label: 'Undercut detected', x: '62%', y: '18%', color: '#f59e0b' },
    { label: 'Sharp corner', x: '70%', y: '68%', color: '#f59e0b' },
  ]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden"
      style={{ background: 'rgba(45,212,191,0.04)', border: '1px solid rgba(45,212,191,0.15)' }}>
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(45,212,191,0.1)', background: 'rgba(45,212,191,0.05)' }}>
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(45,212,191,0.8)' }}>DFM Analysis — 3D Preview</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-mono"
          style={{ background: 'rgba(45,212,191,0.15)', color: '#2dd4bf' }}>Score: 71 / 100</span>
      </div>

      {/* component mockup */}
      <div className="relative mx-4 my-4 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ height: 200, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(45,212,191,0.1)' }}>
        {/* SVG mechanical part */}
        <motion.svg width="200" height="160" viewBox="0 0 200 160"
          animate={inView ? { rotateY: [0, 8, 0, -8, 0] } : {}}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 20px rgba(45,212,191,0.3))' }}>
          <defs>
            <linearGradient id="partGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a4a" />
              <stop offset="100%" stopColor="#0d2030" />
            </linearGradient>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(45,212,191,0.6)" />
              <stop offset="100%" stopColor="rgba(45,212,191,0.1)" />
            </linearGradient>
          </defs>
          {/* main body */}
          <rect x="30" y="40" width="140" height="80" rx="6" fill="url(#partGrad)" stroke="rgba(45,212,191,0.4)" strokeWidth="1" />
          {/* top face */}
          <polygon points="30,40 50,20 170,20 150,40" fill="#1a3040" stroke="rgba(45,212,191,0.3)" strokeWidth="1" />
          {/* right face */}
          <polygon points="170,20 190,40 190,120 170,120" fill="#0f2030" stroke="rgba(45,212,191,0.2)" strokeWidth="1" />
          {/* hole */}
          <ellipse cx="100" cy="80" rx="22" ry="22" fill="#0a1520" stroke="rgba(45,212,191,0.5)" strokeWidth="1.5" />
          {/* thin wall highlight */}
          <rect x="30" y="40" width="8" height="80" fill="rgba(239,68,68,0.3)" stroke="rgba(239,68,68,0.8)" strokeWidth="1" />
          {/* undercut */}
          <path d="M 150 20 L 170 20 L 190 40 L 170 40" fill="rgba(245,158,11,0.25)" stroke="rgba(245,158,11,0.7)" strokeWidth="1" />
          {/* sharp corner */}
          <rect x="162" y="108" width="18" height="14" rx="0" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.6)" strokeWidth="1" />
        </motion.svg>

        {/* pulsing issue markers */}
        {annotations.map((a, i) => (
          <motion.div key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.6 + i * 0.3 }}
            className="absolute flex items-center gap-1.5"
            style={{ left: a.x, top: a.y }}>
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: a.color, boxShadow: `0 0 8px ${a.color}` }} />
            <span className="text-xs px-2 py-0.5 rounded-md whitespace-nowrap font-mono"
              style={{ background: 'rgba(0,0,0,0.7)', color: a.color, border: `1px solid ${a.color}44`, fontSize: '0.65rem' }}>
              {a.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* score bar */}
      <div className="mx-4 mb-4">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span>Manufacturability Score</span><span style={{ color: '#2dd4bf' }}>71 / 100</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: '71%' } : {}}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ background: 'linear-gradient(90deg, #2dd4bf, #00d4ff)' }} />
        </div>
      </div>
    </div>
  )
}

/* ─── Benchmarking Visual ─── */
function BenchmarkVisual() {
  const items = [
    { label: 'Cycle Time', before: 62, after: 38, unit: 'days', color: '#00d4ff' },
    { label: 'Cost/Unit', before: 84, after: 55, unit: '$', color: '#a78bfa' },
    { label: 'Defect Rate', before: 78, after: 22, unit: 'ppm', color: '#2dd4bf' },
    { label: 'OTIF Score', before: 47, after: 91, unit: '%', color: '#818cf8' },
  ]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden"
      style={{ background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.15)' }}>
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(129,140,248,0.1)', background: 'rgba(129,140,248,0.05)' }}>
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(129,140,248,0.8)' }}>AI Benchmarking Dashboard</span>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: 'rgba(255,255,255,0.2)' }} /> Before</span>
          <span className="flex items-center gap-1" style={{ color: '#818cf8' }}><span className="w-2 h-2 rounded-sm inline-block" style={{ background: '#818cf8' }} /> After AI</span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {items.map((item, i) => {
          const improvement = item.label === 'OTIF Score'
            ? `+${item.after - item.before}${item.unit}`
            : `-${item.before - item.after}${item.unit}`
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${item.color}22`, color: item.color }}>{improvement}</span>
              </div>
              {/* before bar */}
              <div className="relative h-2.5 rounded-full mb-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.before}%` } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.8 }}
                  style={{ background: 'rgba(255,255,255,0.18)' }} />
              </div>
              {/* after bar */}
              <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.after}%` } : {}}
                  transition={{ delay: 0.5 + i * 0.12, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ background: `linear-gradient(90deg, ${item.color}aa, ${item.color})` }} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── AI Agents Visual ─── */
function AgentsVisual() {
  const orbitItems = [
    { label: 'VAVE', color: '#00d4ff', angle: 0 },
    { label: 'BOM', color: '#a78bfa', angle: 72 },
    { label: 'DFM', color: '#2dd4bf', angle: 144 },
    { label: 'Bench', color: '#818cf8', angle: 216 },
    { label: 'Audit', color: '#f472b6', angle: 288 },
  ]
  const [tick, setTick] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setTick(t => t + 1), 50)
    return () => clearInterval(id)
  }, [inView])

  const metrics = ['Tasks automated: 2,847', 'Agents active: 12', 'Avg response: 340ms', 'Savings unlocked: $1.2M']

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden"
      style={{ background: 'rgba(244,114,182,0.03)', border: '1px solid rgba(244,114,182,0.15)' }}>
      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(244,114,182,0.1)', background: 'rgba(244,114,182,0.05)' }}>
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(244,114,182,0.8)' }}>AI Agent Control Hub</span>
      </div>

      {/* hub viz */}
      <div className="relative flex items-center justify-center" style={{ height: 260 }}>
        {/* HUD rings */}
        {[80, 108, 136].map((r, i) => (
          <motion.div key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 12 - i * 2, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full"
            style={{
              width: r * 2, height: r * 2,
              border: `1px solid rgba(244,114,182,${0.12 - i * 0.03})`,
              borderStyle: i === 1 ? 'dashed' : 'solid',
            }} />
        ))}
        {/* center orb */}
        <motion.div
          animate={{ boxShadow: ['0 0 20px rgba(244,114,182,0.4)', '0 0 40px rgba(244,114,182,0.7)', '0 0 20px rgba(244,114,182,0.4)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, rgba(244,114,182,0.05) 100%)', border: '1px solid rgba(244,114,182,0.5)' }}>
          <span className="text-xs font-bold tracking-widest" style={{ color: '#f472b6' }}>AI</span>
        </motion.div>

        {/* orbit nodes */}
        {orbitItems.map((item, i) => {
          const angle = ((item.angle + tick * 0.3) * Math.PI) / 180
          const radius = 108
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1, x, y } : {}}
              transition={{ delay: 0.3 + i * 0.1, x: { duration: 0 }, y: { duration: 0 } }}
              className="absolute flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: 44, height: 44,
                background: `${item.color}18`,
                border: `1px solid ${item.color}55`,
                color: item.color,
                fontSize: '0.6rem',
                letterSpacing: '0.05em',
              }}>
              {item.label}
            </motion.div>
          )
        })}

        {/* connection lines drawn as SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {orbitItems.map((item, i) => {
            const angle = ((item.angle + tick * 0.3) * Math.PI) / 180
            const cx = 260 / 2
            const cy = 260 / 2
            const r = 108
            const x = cx + Math.cos(angle) * r
            const y = cy + Math.sin(angle) * r
            return (
              <motion.line key={i} x1={cx} y1={cy} x2={x} y2={y}
                stroke={item.color} strokeWidth="1" strokeOpacity="0.25"
                strokeDasharray="3 4"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }} />
            )
          })}
        </svg>
      </div>

      {/* metric tiles */}
      <div className="grid grid-cols-2 gap-2 mx-4 mb-4">
        {metrics.map((m, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="rounded-lg px-3 py-2 text-xs font-mono"
            style={{ background: 'rgba(244,114,182,0.06)', border: '1px solid rgba(244,114,182,0.15)', color: 'rgba(255,255,255,0.6)' }}>
            {m}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Card deck config ─── */
const CARDS = [
  {
    id: 0, badge: '01 — VAVE', label: 'AI in VAVE', color: '#00d4ff', Visual: VaveVisual,
    desc: 'AI scans every design and BOM to surface cost-reduction opportunities your team would take weeks to find manually.',
    bullets: ['Material substitution recommendations', 'Geometry simplification hints', 'Instant redesign savings estimate'],
  },
  {
    id: 1, badge: '02 — BOM', label: 'BOM Management', color: '#a78bfa', Visual: BomVisual,
    desc: 'Automatically parse, validate and reconcile multi-level BOMs across suppliers — catching errors before they reach the line.',
    bullets: ['Duplicate & conflict detection', 'Live supplier pricing overlay', 'One-click auto-fix suggestions'],
  },
  {
    id: 2, badge: '03 — DFM', label: 'DFM Analysis', color: '#2dd4bf', Visual: DfmVisual,
    desc: 'Upload any CAD file and receive a full DFM report in seconds, with issues flagged directly on the 3D model.',
    bullets: ['3D overlay issue markers', 'Configurable manufacturing rule sets', 'Weighted manufacturability score'],
  },
  {
    id: 3, badge: '04 — Benchmarking', label: 'Benchmarking', color: '#818cf8', Visual: BenchmarkVisual,
    desc: 'Compare your components and assemblies against AI-curated industry benchmarks to drive continuous cost and quality improvements.',
    bullets: ['Before / after KPI bar charts', 'Percentile ranking vs. industry', 'AI-powered improvement forecast'],
  },
  {
    id: 4, badge: '05 — Agents', label: 'AI Agents & Automation', color: '#f472b6', Visual: AgentsVisual,
    desc: 'Deploy a network of specialised AI agents that run sourcing, quality, and logistics workflows autonomously around the clock.',
    bullets: ['12 pre-built domain agents', 'Chainable automation workflows', 'Full immutable audit trail'],
  },
] as const

/* ─── Cover-flow card deck ─── */
function CardDeck() {
  const [active, setActive]       = useState(0)
  const [activeKey, setActiveKey] = useState(0)
  const [isMobile, setIsMobile]   = useState(false)
  const [dragX, setDragX]         = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const n            = CARDS.length
  const ptrStartX    = useRef(0)
  const ptrStartTime = useRef(0)
  const didDragRef   = useRef(false)
  const stageRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const go = useCallback((dir: 1 | -1) => {
    setActive(prev => (prev + dir + n) % n)
    setActiveKey(k => k + 1)
    setDragX(0)
    setIsDragging(false)
  }, [n])

  const goTo = useCallback((idx: number) => {
    setActive(idx)
    setActiveKey(k => k + 1)
    setDragX(0)
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [go])

  const handlePointerDown = (e: React.PointerEvent) => {
    ptrStartX.current    = e.clientX
    ptrStartTime.current = performance.now()
    didDragRef.current   = false
    setIsDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - ptrStartX.current
    if (Math.abs(dx) > 4) didDragRef.current = true
    setDragX(dx)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - ptrStartX.current
    const dt = performance.now() - ptrStartTime.current
    const vx = Math.abs(dx) / Math.max(dt, 1)
    if (didDragRef.current && (Math.abs(dx) > 60 || vx > 0.25)) {
      go(dx < 0 ? 1 : -1)
    } else {
      setDragX(0)
      setIsDragging(false)
    }
  }

  const getOffset = (i: number) => {
    let off = i - active
    if (off >  n / 2) off -= n
    if (off < -n / 2) off += n
    return off
  }

  const getT = (off: number) => {
    const abs = Math.abs(off)
    const s   = off >= 0 ? 1 : -1
    if (isMobile) {
      return abs === 0
        ? { x: 0,       scale: 1,    rotY: 0,       opacity: 1,    z: 0,    zIdx: 20 }
        : { x: s * 600, scale: 0.9,  rotY: 0,       opacity: 0,    z: 0,    zIdx: 5  }
    }
    switch (abs) {
      case 0:  return { x: 0,        scale: 1.00, rotY: 0,        opacity: 1.00, z: 0,    zIdx: 20 }
      case 1:  return { x: s * 312,  scale: 0.86, rotY: s * -42,  opacity: 0.62, z: -100, zIdx: 15 }
      case 2:  return { x: s * 575,  scale: 0.73, rotY: s * -58,  opacity: 0.16, z: -200, zIdx: 10 }
      default: return { x: s * 750,  scale: 0.62, rotY: s * -68,  opacity: 0.00, z: -280, zIdx: 5  }
    }
  }

  const activeTilt = isDragging ? Math.max(-18, Math.min(18, dragX / 10)) : 0
  const activeCard = CARDS[active]

  return (
    <div className="relative select-none">
      {/* ── 3-D stage ── */}
      <div
        ref={stageRef}
        className="relative overflow-hidden mx-auto touch-none"
        style={{ perspective: '1100px', height: 390, maxWidth: 1100, cursor: isDragging ? 'grabbing' : 'grab' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {CARDS.map((card, i) => {
            const off      = getOffset(i)
            const t        = getT(off)
            const isActive = off === 0
            const { Visual } = card
            const rotY     = isActive ? t.rotY + activeTilt : t.rotY

            return (
              <motion.div
                key={card.id}
                animate={{ x: t.x + (isActive ? dragX * 0.08 : 0), scale: t.scale, rotateY: rotY, opacity: t.opacity, z: t.z }}
                transition={isActive && isDragging
                  ? { rotateY: { type: 'tween', duration: 0 }, x: { type: 'tween', duration: 0 }, default: { type: 'spring', stiffness: 280, damping: 26, mass: 0.85 } }
                  : { type: 'spring', stiffness: 280, damping: 26, mass: 0.85 }
                }
                style={{
                  position: 'absolute',
                  width: isMobile ? 'min(calc(100vw - 48px), 520px)' : 520,
                  zIndex: t.zIdx,
                  transformStyle: 'preserve-3d',
                  cursor: isActive ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
                  userSelect: 'none',
                  filter: !isActive
                    ? `brightness(${Math.max(0.28, 0.68 - Math.abs(off) * 0.18)})`
                    : undefined,
                }}
                onClick={() => { if (!isActive && !didDragRef.current) go(off > 0 ? 1 : -1) }}
              >
                <div className="rounded-2xl overflow-hidden" style={{
                  background: 'rgba(6,8,16,0.97)',
                  border: `1px solid ${isActive ? card.color + '45' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: isActive
                    ? `0 0 80px ${card.color}12, 0 32px 64px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)`
                    : '0 8px 24px rgba(0,0,0,0.4)',
                }}>
                  <div className="flex items-center gap-3 px-4 py-2.5" style={{
                    borderBottom: `1px solid ${card.color}1a`,
                    background: `linear-gradient(90deg, ${card.color}0d, transparent)`,
                  }}>
                    {isActive && (
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: card.color }}
                        animate={{ boxShadow: [`0 0 0 0 ${card.color}99`, `0 0 0 5px transparent`] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                      />
                    )}
                    <span className="text-xs font-semibold tracking-[0.16em] uppercase"
                      style={{ color: isActive ? card.color : 'rgba(255,255,255,0.22)' }}>
                      {card.badge}
                    </span>
                    <span className="text-xs ml-auto truncate" style={{ color: 'rgba(255,255,255,0.18)' }}>
                      {card.label}
                    </span>
                  </div>
                  <div style={{ maxHeight: 350, overflow: 'hidden' }}>
                    {isActive
                      ? <div key={activeKey}><Visual /></div>
                      : Math.abs(off) === 1
                        ? <Visual />
                        : <div style={{ height: 350 }} />
                    }
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Description panel ── */}
      <div className="mx-auto mt-4" style={{ maxWidth: 680, minHeight: 100 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="text-center px-4"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: activeCard.color }}>
              {activeCard.label}
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {activeCard.desc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(activeCard.bullets as readonly string[]).map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                  style={{ background: `${activeCard.color}12`, border: `1px solid ${activeCard.color}28`, color: 'rgba(255,255,255,0.62)' }}>
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: activeCard.color }} />
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dot navigation ── */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {CARDS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            animate={{
              width: i === active ? 22 : 6,
              backgroundColor: i === active ? CARDS[active].color : 'rgba(255,255,255,0.22)',
            }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="h-1.5 rounded-full shrink-0"
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

      {/* swipe hint — fades after first drag */}
      <p className="text-center mt-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
        drag to explore
      </p>
    </div>
  )
}

/* ─── Animated grid background ─── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* grid */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }} />
      {/* radial vignette */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(167,139,250,0.04) 0%, transparent 60%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 80%, rgba(45,212,191,0.04) 0%, transparent 60%)' }} />
      {/* floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            left: `${5 + (i * 37) % 90}%`,
            top: `${10 + (i * 53) % 80}%`,
            background: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#a78bfa' : '#2dd4bf',
            opacity: 0.35,
          }}
          animate={{
            y: [0, -20 - (i % 3) * 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + (i % 5) * 1.2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }} />
      ))}
    </div>
  )
}

/* ─── Animated SVG progress ring ─── */
function Ring({ pct, color, size = 60 }: { pct: number; color: string; size?: number }) {
  const r    = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const ref  = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={inView ? circ * (1 - pct / 100) : circ}
          style={{
            transition: inView
              ? 'stroke-dashoffset 1.5s cubic-bezier(0.34,1.2,0.64,1) 0.2s'
              : 'none',
            filter: `drop-shadow(0 0 5px ${color}aa)`,
          }}
        />
      </svg>
    </div>
  )
}

/* ─── Mini sparkline bar chart ─── */
function SparkBars({ heights, color }: { heights: number[]; color: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="flex items-end gap-[3px]" style={{ height: 24 }}>
      {heights.map((h, i) => (
        <motion.div key={i}
          initial={{ height: 0 }}
          animate={inView ? { height: h } : { height: 0 }}
          transition={{ delay: 0.28 + i * 0.06, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-[7px] rounded-sm"
          style={{ background: color, opacity: 0.3 + (i / heights.length) * 0.7 }}
        />
      ))}
    </div>
  )
}

/* ─── Main export ─── */
export default function Capabilities() {
  const introRef  = useRef<HTMLDivElement>(null)
  const introInView = useInView(introRef, { once: true, margin: '-60px' })

  /* shared glass card style factory */
  const glass = (hex: string) => ({
    background:     `rgba(${hexToRgb(hex)},0.05)`,
    border:         `1px solid rgba(${hexToRgb(hex)},0.18)`,
    backdropFilter: 'blur(18px)',
    boxShadow:      `0 8px 32px rgba(0,0,0,0.32), 0 0 20px rgba(${hexToRgb(hex)},0.06), inset 0 1px 0 rgba(255,255,255,0.05)`,
  })

  return (
    <section id="capabilities" className="relative bg-[#030508] pt-10 pb-14 md:pt-12 md:pb-20 overflow-hidden">
      <GridBackground />

      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative mx-auto max-w-[1280px] px-6">

        {/* ── Two-column header: copy LEFT · metrics RIGHT ── */}
        <div ref={introRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-10">

          {/* ── RIGHT: floating glassmorphism metric panels ── */}
          <div className="grid grid-cols-2 gap-3 lg:order-2">

            {/* Panel 1 – 40 % Faster Analysis */}
            <motion.div
              animate={introInView ? { opacity: 1, y: 0 }  : { opacity: 0, y: 28 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ ...glass('#00d4ff'), zIndex: 1 }}
            >
              <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: '#00d4ff', opacity: 0.08, filter: 'blur(18px)' }} />

              <div className="flex items-center gap-3 mb-3">
                <Ring pct={40} color="#00d4ff" size={56} />
                <div>
                  <div className="text-[22px] font-black leading-none" style={{ color: '#00d4ff' }}>
                    <Counter target={40} suffix="%" />
                  </div>
                  <div className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    Faster Analysis
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between mb-0.5" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)' }}>
                    <span>Before</span><span>62d</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: 'rgba(0,212,255,0.2)' }} />
                </div>
                <div>
                  <div className="flex justify-between mb-0.5" style={{ fontSize: '10px', color: 'rgba(0,212,255,0.65)' }}>
                    <span>After AI</span><span>38d</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,212,255,0.08)' }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={introInView ? { width: '61%' } : {}}
                      transition={{ delay: 0.7, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{ background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <SparkBars heights={[8, 12, 10, 16, 14, 20, 18]} color="#00d4ff" />
              </div>
            </motion.div>

            {/* Panel 2 – 60 % Less Manual Work */}
            <motion.div
              animate={introInView ? { opacity: 1, y: -10 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -17 }}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ ...glass('#a78bfa'), zIndex: 2 }}
            >
              <div className="absolute -bottom-5 -left-4 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: '#a78bfa', opacity: 0.08, filter: 'blur(18px)' }} />

              <div className="text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: 'rgba(167,139,250,0.55)' }}>Less Manual Work</div>
              <div className="text-[28px] font-black leading-none mb-3" style={{ color: '#a78bfa' }}>
                <Counter target={60} suffix="%" />
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-0.5" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)' }}>
                    <span>Manual before</span><span>100%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(167,139,250,0.22)' }} />
                </div>
                <div>
                  <div className="flex justify-between mb-0.5" style={{ fontSize: '10px', color: 'rgba(167,139,250,0.65)' }}>
                    <span>AI automated</span><span>60%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(167,139,250,0.08)' }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={introInView ? { width: '60%' } : {}}
                      transition={{ delay: 0.78, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{ background: '#a78bfa', boxShadow: '0 0 6px #a78bfa88' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <SparkBars heights={[20, 18, 15, 12, 9, 7, 5]} color="#a78bfa" />
              </div>
            </motion.div>

            {/* Panel 3 – 3× Improved Accuracy */}
            <motion.div
              animate={introInView ? { opacity: 1, y: -8 }  : { opacity: 0, y: 22 }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -15 }}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ ...glass('#2dd4bf'), zIndex: 3 }}
            >
              <div className="absolute -top-4 -right-3 w-16 h-16 rounded-full pointer-events-none"
                style={{ background: '#2dd4bf', opacity: 0.09, filter: 'blur(14px)' }} />

              <div className="text-[10px] font-semibold tracking-widest uppercase mb-1.5"
                style={{ color: 'rgba(45,212,191,0.55)' }}>Improved Accuracy</div>
              <div className="text-[28px] font-black leading-none mb-3" style={{ color: '#2dd4bf' }}>
                <Counter target={3} suffix="x" />
              </div>

              <div className="flex items-end gap-2.5">
                {[
                  { h: 20, label: '1x', op: 0.28 },
                  { h: 35, label: '2x', op: 0.58 },
                  { h: 54, label: '3x', op: 1.00 },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={introInView ? { height: bar.h } : { height: 0 }}
                      transition={{ delay: 0.5 + i * 0.11, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
                      className="w-7 rounded-t-md"
                      style={{
                        background: `rgba(45,212,191,${bar.op})`,
                        boxShadow: i === 2 ? '0 0 10px rgba(45,212,191,0.5)' : 'none',
                      }}
                    />
                    <span className="text-[9px]" style={{ color: `rgba(45,212,191,${bar.op})` }}>{bar.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Panel 4 – 25 % Lower Cycle Cost */}
            <motion.div
              animate={introInView ? { opacity: 1, y: -4 }  : { opacity: 0, y: 30 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -11 }}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ ...glass('#818cf8'), zIndex: 2 }}
            >
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
                style={{ background: '#818cf8', opacity: 0.08, filter: 'blur(14px)' }} />

              <div className="flex items-center gap-3 mb-3">
                <Ring pct={25} color="#818cf8" size={56} />
                <div>
                  <div className="text-[22px] font-black leading-none" style={{ color: '#818cf8' }}>
                    <Counter target={25} suffix="%" />
                  </div>
                  <div className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    Lower Cycle Cost
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px]"
                style={{ background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)', color: '#818cf8' }}>
                ↓ $12.4k avg per programme
              </div>

              <div className="flex justify-end mt-3">
                <SparkBars heights={[22, 19, 16, 13, 10, 8, 6]} color="#818cf8" />
              </div>
            </motion.div>
          </div>

          {/* ── LEFT: badge · headline · subtitle ── */}
          <motion.div
            animate={introInView ? { opacity: 1, x: 0 }  : { opacity: 0, x: -24 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center pt-2 lg:pt-6 lg:order-1"
          >
            {/* badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 self-start"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)' }}>
              <motion.div
                animate={{ boxShadow: ['0 0 0 0 rgba(0,212,255,0.6)', '0 0 0 5px rgba(0,212,255,0)', '0 0 0 0 rgba(0,212,255,0)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#00d4ff' }}
              />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#00d4ff' }}>
                AI Capabilities
              </span>
            </div>

            <h2 className="font-bold tracking-tight text-white mb-5"
              style={{ fontSize: 'clamp(1.9rem, 3.2vw, 3rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
              Intelligence built into{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #a78bfa 50%, #2dd4bf 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>every stage</span>{' '}
              of your workflow.
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.42)', maxWidth: 400 }}>
              AI woven through VAVE, BOM, DFM, Benchmarking, and Automation — every decision faster, every analysis sharper, every cost defended.
            </p>

            {/* module tags */}
            <div className="flex flex-wrap gap-2">
              {['VAVE', 'BOM', 'DFM', 'Benchmarking', 'AI Agents'].map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    color: 'rgba(255,255,255,0.32)',
                    letterSpacing: '0.04em',
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Interactive card deck ── */}
        <CardDeck />

      </div>
    </section>
  )
}

/* hex → "r,g,b" string for rgba() */
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

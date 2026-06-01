'use client'

import { useEffect, useState } from 'react'
import { Shield, Layers, Radio, Crosshair, Cpu, GitBranch, CheckCircle2, Zap } from 'lucide-react'

const PROGRAMMES = [
  { name: 'LCA Tejas Mk2',    nodes: 4821, accuracy: 99.6 },
  { name: 'AMCA Programme',   nodes: 3240, accuracy: 99.4 },
  { name: 'DRDO AEW&CS',      nodes: 2187, accuracy: 99.1 },
  { name: 'AESA Radar Suite', nodes: 1893, accuracy: 99.8 },
  { name: 'HAL ALH-WSI',      nodes: 1456, accuracy: 99.2 },
]

const BOM_NODES = [
  { x: 50, y: 48, label: 'System', root: true },
  { x: 24, y: 28, label: 'Avionics' },
  { x: 76, y: 28, label: 'Airframe' },
  { x: 12, y: 62, label: 'Radar' },
  { x: 36, y: 68, label: 'EW Suite' },
  { x: 64, y: 68, label: 'Propulsion' },
  { x: 88, y: 58, label: 'Landing Gear' },
  { x: 50, y: 82, label: 'Weapons' },
]

const EDGES = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[0,7]]

function useCounter(target: number, duration: number, active: boolean) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) { setV(0); return }
    const steps = 80
    let step = 0
    const iv = setInterval(() => {
      step++
      const t = step / steps
      const eased = 1 - Math.pow(1 - t, 3)
      setV(Math.min(target, eased * target))
      if (step >= steps) clearInterval(iv)
    }, duration / steps)
    return () => clearInterval(iv)
  }, [target, duration, active])
  return v
}

export default function BomAccuracyViz({ active }: { active: boolean }) {
  const accuracy  = useCounter(99.4,  2200, active)
  const nodeCount = useCounter(14597, 2600, active)
  const progCount = useCounter(47,    1800, active)

  const r           = 54
  const circ        = 2 * Math.PI * r
  const dashOffset  = circ * (1 - accuracy / 100)

  const [nodesOn, setNodesOn] = useState<boolean[]>(Array(BOM_NODES.length).fill(false))

  useEffect(() => {
    if (!active) { setNodesOn(Array(BOM_NODES.length).fill(false)); return }
    BOM_NODES.forEach((_, i) => {
      setTimeout(() => setNodesOn(p => { const n=[...p]; n[i]=true; return n }), 250 + i * 180)
    })
  }, [active])

  const fmt = (n: number) => Math.floor(n).toLocaleString()

  return (
    <div className="absolute inset-0 flex items-center gap-4 px-6 md:px-10 overflow-hidden">

      {/* ── 1. Circular accuracy ring ── */}
      <div className="flex flex-col items-center shrink-0">
        <div className="relative w-28 h-28 md:w-32 md:h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* outer glow ring */}
            <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(45,212,191,0.06)" strokeWidth="12" />
            {/* track */}
            <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
            {/* progress */}
            <circle
              cx="60" cy="60" r={r} fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={active ? dashOffset : circ}
              style={{ transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1)' }}
            />
            {/* tick at 99.4% */}
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d9e8a" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-white leading-none tabular-nums">
              {accuracy.toFixed(1)}%
            </span>
            <span className="text-[9px] text-white/40 mt-0.5 uppercase tracking-widest">Accuracy</span>
          </div>
        </div>

        {/* Sub-stats */}
        <div className="mt-3 space-y-1.5 w-full min-w-[120px]">
          {[
            { icon: Layers,      label: 'BOM Nodes',   value: fmt(nodeCount) },
            { icon: Shield,      label: 'Programmes',  value: fmt(progCount) },
            { icon: CheckCircle2,label: 'Verified',    value: `${accuracy.toFixed(1)}%` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-1.5"
              style={{ opacity: active ? 1 : 0, transform: active ? 'none' : 'translateY(6px)', transition: 'opacity 0.5s ease 0.8s, transform 0.5s ease 0.8s' }}>
              <Icon className="w-3 h-3 shrink-0" style={{ color: '#2dd4bf' }} />
              <span className="text-[10px] text-white/50">{label}</span>
              <span className="text-[10px] text-white font-semibold ml-auto tabular-nums">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. BOM node graph ── */}
      <div className="flex-1 relative hidden md:block self-stretch py-3">
        <div className="absolute top-2 left-1">
          <div className="flex items-center gap-1.5">
            <GitBranch className="w-3 h-3" style={{ color: '#2dd4bf' }} />
            <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">BOM Graph</span>
          </div>
        </div>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* edges */}
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={BOM_NODES[a].x} y1={BOM_NODES[a].y}
              x2={BOM_NODES[b].x} y2={BOM_NODES[b].y}
              stroke="rgba(45,212,191,0.25)"
              strokeWidth="0.5"
              strokeDasharray="120"
              strokeDashoffset={nodesOn[b] ? 0 : 120}
              style={{ transition: `stroke-dashoffset 0.6s ease ${200 + i * 130}ms` }}
            />
          ))}
          {/* nodes */}
          {BOM_NODES.map((n, i) => (
            <g key={i} style={{ opacity: nodesOn[i] ? 1 : 0, transition: `opacity 0.3s ease` }}>
              {/* pulse ring on root */}
              {n.root && (
                <>
                  <circle cx={n.x} cy={n.y} r="9" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="0.8">
                    <animate attributeName="r" values="7;12;7" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
              <circle
                cx={n.x} cy={n.y}
                r={n.root ? 4.5 : 2.5}
                fill={n.root ? '#2dd4bf' : 'rgba(45,212,191,0.15)'}
                stroke="#2dd4bf"
                strokeWidth="0.7"
              />
              <text
                x={n.x}
                y={n.root ? n.y + 8 : n.y - 4.5}
                textAnchor="middle"
                fontSize="3.5"
                fill="rgba(255,255,255,0.5)"
              >{n.label}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── 3. Programme list ── */}
      <div className="shrink-0 w-44 hidden lg:flex flex-col gap-1 self-stretch py-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Radio className="w-3 h-3" style={{ color: '#2dd4bf' }} />
          <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Defence Programmes</span>
        </div>
        {PROGRAMMES.map((p, i) => (
          <div
            key={p.name}
            className="space-y-0.5"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'none' : 'translateX(12px)',
              transition: `opacity 0.4s ease ${350 + i * 140}ms, transform 0.4s ease ${350 + i * 140}ms`,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/55 truncate leading-tight">{p.name}</span>
              <span className="text-[10px] font-bold ml-2 shrink-0 tabular-nums" style={{ color: '#2dd4bf' }}>
                {p.accuracy}%
              </span>
            </div>
            <div className="h-[3px] rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg,#0d9e8a,#2dd4bf)',
                  width: active ? `${p.accuracy}%` : '0%',
                  transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${550 + i * 140}ms`,
                }}
              />
            </div>
          </div>
        ))}

        {/* Bottom badges */}
        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          {[
            { icon: Cpu,       label: 'AI-verified' },
            { icon: Zap,       label: 'Real-time' },
            { icon: Crosshair, label: 'Precision' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold border"
              style={{
                background: 'rgba(45,212,191,0.08)',
                color: '#2dd4bf',
                borderColor: 'rgba(45,212,191,0.2)',
                opacity: active ? 1 : 0,
                transition: 'opacity 0.5s ease 1.2s',
              }}
            >
              <Icon className="w-2.5 h-2.5" />
              {label}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

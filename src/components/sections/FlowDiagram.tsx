'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

const stages = [
  {
    n: '01',
    label: 'BOM & CAD',
    desc: 'CAD geometry, drawings, materials and structured BOMs. The engineering foundation every cost, process and supplier decision is built on.',
    icon: 'box',
  },
  {
    n: '02',
    label: 'Supplier',
    desc: 'Quote vs should-cost, capability mapping, technical feasibility, weighted nomination. Negotiate with evidence, not estimates.',
    icon: 'users',
  },
  {
    n: '03',
    label: 'Production',
    desc: 'Production lots, vendor assignments, route adherence and live status. Programme cost, supplier performance and delivery risk — visible in real time.',
    icon: 'factory',
  },
  {
    n: '04',
    label: 'Quality',
    desc: 'Inline inspections, sample submissions, and PPAP workflows connected to part and supplier records. Every shipment leaves with traceable quality evidence.',
    icon: 'shield',
  },
  {
    n: '05',
    label: 'Delivery',
    desc: 'On-time dispatch with full traceability. ISIR / PPAP closure, packing, logistics, and delivery confirmation — all from the same manufacturing record.',
    icon: 'truck',
  },
]

export default function FlowDiagram() {
  const [active, setActive] = useState(null)

  return (
    <section className="border-t border-border py-28 lg:py-36 relative overflow-hidden">
      {/* faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* HEADER — spans full width */}
        <div className="max-w-5xl mb-14 lg:mb-16">
          <SectionLabel>END-TO-END LIFECYCLE</SectionLabel>
          <h2 className="font-display text-white text-[40px] sm:text-[56px] lg:text-[68px] leading-[0.95] tracking-tight mb-6">
            From BOM to Delivery. One Continuous<br />Manufacturing Stack.
          </h2>
          <p className="font-mono text-[13px] lg:text-[14px] text-grey-200 max-w-3xl leading-relaxed">
            Every stage of manufacturing — engineering, costing, sourcing, production, quality, and delivery — connected as a single continuous record. Hover any stage to see how it locks into the system. From the first BOM release to the final shipment, one record, one truth, one platform.
          </p>
        </div>

        {/* CARDS + ORBITAL — sub-grid starts at the same vertical line */}
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 items-start">
          {/* LEFT — cards */}
          <div>
            <div className="flex flex-col gap-3">
              {stages.map((s, i) => {
                const isActive = active === i
                return (
                  <button
                    key={i}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className={`group flex items-stretch border text-left transition-all duration-300 ${
                      isActive
                        ? 'border-white/40 bg-white/[0.025]'
                        : 'border-border hover:border-white/30'
                    }`}
                  >
                    {/* Index */}
                    <div className="flex items-center justify-center w-14 border-r border-border font-mono text-[11px] tracking-widest text-grey-300 shrink-0">
                      {s.n}
                    </div>

                    {/* Icon */}
                    <div className="flex items-center justify-center w-20 border-r border-border shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                          isActive ? 'border-white/70' : 'border-grey-400 group-hover:border-white/50'
                        }`}
                      >
                        <CardIcon name={s.icon} active={isActive} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-5 py-4 min-w-0">
                      <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-white mb-2 leading-none">
                        {s.label}
                      </p>
                      <p className="font-mono text-[12px] text-grey-300 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center w-12 border-l border-border shrink-0">
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className={`transition-all duration-300 ${
                          isActive ? 'text-white translate-x-0.5 -translate-y-0.5' : 'text-grey-300'
                        }`}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT — Orbital Visualization */}
          <div className="relative flex items-stretch justify-center lg:self-stretch -mx-4 lg:mx-0">
            <Orbital active={active} setActive={setActive} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  ORBITAL VISUALIZATION                                                      */
/* -------------------------------------------------------------------------- */
function Orbital({ active, setActive }) {
  // Portrait viewBox 700 x 1000  ->  centre (350, 500)
  // Outer orbit:  rx=270, ry=410  (very tall ellipse so 5 nodes spread top→bottom)
  const nodes = [
    { i: 0, x: 165, y: 220, label: 'BOM & CAD',   n: '01', icon: 'box',     side: 'bottom' },
    { i: 1, x: 535, y: 220, label: 'SUPPLIER',    n: '02', icon: 'users',   side: 'bottom' },
    { i: 2, x: 600, y: 540, label: 'PRODUCTION',  n: '03', icon: 'factory', side: 'bottom' },
    { i: 3, x: 350, y: 880, label: 'QUALITY',     n: '04', icon: 'shield',  side: 'bottom' },
    { i: 4, x: 100, y: 540, label: 'DELIVERY',    n: '05', icon: 'truck',   side: 'bottom' },
  ]

  return (
    <svg
      viewBox="0 150 700 830"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Manufacturing lifecycle orbital diagram"
    >
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bg-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0e0e0e" stopOpacity="1" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orbit-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
        <marker id="arrow-tip" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,5 L0,10 Z" fill="rgba(255,255,255,0.55)" />
        </marker>
      </defs>

      {/* Background atmospheric glow */}
      <ellipse cx="350" cy="500" rx="320" ry="430" fill="url(#bg-radial)" />

      {/* CONCENTRIC PORTRAIT ORBITS */}
      <ellipse cx="350" cy="500" rx="270" ry="410" fill="none" stroke="url(#orbit-fade)" strokeWidth="0.8" />
      <ellipse cx="350" cy="500" rx="200" ry="300" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" strokeDasharray="2 5" />
      <ellipse cx="350" cy="500" rx="130" ry="195" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="1 4" />

      {/* DIRECTIONAL ARROW ARCS along outer orbit */}
      {[
        // 01 → 02 across the top
        { d: 'M 200 235 A 270 410 0 0 1 500 235', delay: 0 },
        // 02 → 03 (top-right to right)
        { d: 'M 565 245 A 270 410 0 0 1 615 510', delay: 0.4 },
        // 03 → 04 (right down to bottom)
        { d: 'M 605 575 A 270 410 0 0 1 380 870', delay: 0.8 },
        // 04 → 05 (bottom to left)
        { d: 'M 320 870 A 270 410 0 0 1 90 575', delay: 1.2 },
        // 05 → 01 (left up to top-left)
        { d: 'M 80 510 A 270 410 0 0 1 130 245', delay: 1.6 },
      ].map((seg, i) => (
        <motion.path
          key={i}
          d={seg.d}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.9"
          strokeLinecap="round"
          markerEnd="url(#arrow-tip)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.4, delay: 0.3 + seg.delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
      ))}

      {/* 4 spokes from inner orbit toward centre */}
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" strokeDasharray="1 3">
        <line x1="350" y1="380" x2="350" y2="440" />
        <line x1="350" y1="560" x2="350" y2="620" />
        <line x1="500" y1="500" x2="440" y2="500" />
        <line x1="200" y1="500" x2="260" y2="500" />
      </g>

      {/* Tracer dot orbiting outer ellipse */}
      <circle r="2.6" fill="#ffffff">
        <animateMotion dur="26s" repeatCount="indefinite" rotate="auto"
          path="M 620 500 A 270 410 0 1 1 80 500 A 270 410 0 1 1 620 500" />
      </circle>
      <circle r="6" fill="#ffffff" opacity="0.18">
        <animateMotion dur="26s" repeatCount="indefinite"
          path="M 620 500 A 270 410 0 1 1 80 500 A 270 410 0 1 1 620 500" />
      </circle>

      {/* CENTRE FLOATING STACK */}
      <CenterStack cx={350} cy={500} />

      {/* PEDESTAL NODES */}
      {nodes.map((node) => (
        <Pedestal
          key={node.i}
          node={node}
          isActive={active === node.i}
          onMouseEnter={() => setActive(node.i)}
          onMouseLeave={() => setActive(null)}
        />
      ))}
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  CENTRE STACK — three floating diamond slabs                                */
/* -------------------------------------------------------------------------- */
function CenterStack({ cx, cy }) {
  const W = 135 // half width of diamond face
  const H = 70  // half height
  const D = 32  // depth of side faces

  const slabs = [
    { dy: -180, scale: 0.78, opacity: 0.95 },
    { dy: 0,    scale: 1.0,  opacity: 0.78 },
    { dy: 180,  scale: 0.86, opacity: 0.6 },
  ]

  return (
    <motion.g
      animate={{ y: [0, -3, 0, 3, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      {slabs.map((s, i) => {
        const w = W * s.scale
        const h = H * s.scale
        const d = D * s.scale
        const x = cx
        const y = cy + s.dy
        return (
          <g key={i} opacity={s.opacity}>
            {/* glow underneath each slab */}
            <ellipse cx={x} cy={y + h + d + 6} rx={w * 0.85} ry={9} fill="url(#center-glow)" />
            <line x1={x - w * 0.7} y1={y + h + d + 4} x2={x + w * 0.7} y2={y + h + d + 4}
              stroke="rgba(255,255,255,0.7)" strokeWidth="0.7" />

            {/* top face */}
            <path
              d={`M${x},${y - h} L${x + w},${y} L${x},${y + h} L${x - w},${y} Z`}
              fill="#0d0d0d"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="0.9"
            />
            {/* construction lines */}
            <line x1={x - w} y1={y} x2={x + w} y2={y} stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />
            <line x1={x} y1={y - h} x2={x} y2={y + h} stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />

            {/* right face */}
            <path
              d={`M${x},${y + h} L${x + w},${y} L${x + w},${y + d} L${x},${y + h + d} Z`}
              fill="#080808"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="0.7"
            />
            {/* left face */}
            <path
              d={`M${x},${y + h} L${x - w},${y} L${x - w},${y + d} L${x},${y + h + d} Z`}
              fill="#040404"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.7"
            />

            {/* topmost slab gets the 4-dot signature emblem */}
            {i === 0 && (
              <g fill="#ffffff" opacity="0.9">
                <rect x={x - 13} y={y - 13} width={9} height={9} rx="1" />
                <rect x={x + 4}  y={y - 13} width={9} height={9} rx="1" />
                <rect x={x - 13} y={y + 4}  width={9} height={9} rx="1" />
                <rect x={x + 4}  y={y + 4}  width={9} height={9} rx="1" />
              </g>
            )}
          </g>
        )
      })}
    </motion.g>
  )
}

/* -------------------------------------------------------------------------- */
/*  PEDESTAL — base + icon + label                                             */
/* -------------------------------------------------------------------------- */
function Pedestal({ node, isActive, onMouseEnter, onMouseLeave }) {
  const w = 52, h = 22, d = 14
  const { x, y, n, label, icon, side } = node

  return (
    <g
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* glow underneath */}
      <ellipse
        cx={x}
        cy={y + h + d + 4}
        rx={isActive ? 50 : 38}
        ry="6"
        fill="url(#node-glow)"
        style={{ transition: 'all 0.4s ease' }}
      />
      <line
        x1={x - w * 0.85} y1={y + h + d + 2}
        x2={x + w * 0.85} y2={y + h + d + 2}
        stroke={isActive ? '#ffffff' : 'rgba(255,255,255,0.6)'}
        strokeWidth="0.8"
        style={{ transition: 'stroke 0.3s ease' }}
      />

      {/* Pedestal slab */}
      <path
        d={`M${x},${y - h} L${x + w},${y} L${x},${y + h} L${x - w},${y} Z`}
        fill="#0a0a0a"
        stroke={isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)'}
        strokeWidth="0.9"
        style={{ transition: 'stroke 0.3s ease' }}
      />
      <path
        d={`M${x},${y + h} L${x + w},${y} L${x + w},${y + d} L${x},${y + h + d} Z`}
        fill="#060606"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.6"
      />
      <path
        d={`M${x},${y + h} L${x - w},${y} L${x - w},${y + d} L${x},${y + h + d} Z`}
        fill="#020202"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="0.6"
      />

      {/* Icon glyph above pedestal */}
      <g transform={`translate(${x}, ${y - 38})`}>
        <NodeIcon name={icon} />
      </g>

      {/* Label */}
      {side === 'bottom' && (
        <>
          <text x={x} y={y + h + d + 28} textAnchor="middle"
            fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace" letterSpacing="2.5">
            {n}
          </text>
          <text x={x} y={y + h + d + 44} textAnchor="middle"
            fill="#ffffff" fontSize="11" fontFamily="monospace" letterSpacing="2.5" fontWeight="500">
            {label}
          </text>
        </>
      )}
      {side === 'right' && (
        <>
          <text x={x + w + 24} y={y - 4} textAnchor="start"
            fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace" letterSpacing="2.5">
            {n}
          </text>
          <text x={x + w + 24} y={y + 12} textAnchor="start"
            fill="#ffffff" fontSize="11" fontFamily="monospace" letterSpacing="2.5" fontWeight="500">
            {label}
          </text>
        </>
      )}
      {side === 'left' && (
        <>
          <text x={x - w - 24} y={y - 4} textAnchor="end"
            fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace" letterSpacing="2.5">
            {n}
          </text>
          <text x={x - w - 24} y={y + 12} textAnchor="end"
            fill="#ffffff" fontSize="11" fontFamily="monospace" letterSpacing="2.5" fontWeight="500">
            {label}
          </text>
        </>
      )}
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/*  ICON GLYPHS                                                                */
/* -------------------------------------------------------------------------- */
function NodeIcon({ name, scale = 1 }) {
  const s = (n) => n * scale
  if (name === 'box') {
    return (
      <g stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d={`M0,${-s(14)} L${s(13)},${-s(7)} L${s(13)},${s(8)} L0,${s(15)} L${-s(13)},${s(8)} L${-s(13)},${-s(7)} Z`} />
        <path d={`M0,${-s(14)} L0,${s(1)} M0,${s(1)} L${s(13)},${-s(7)} M0,${s(1)} L${-s(13)},${-s(7)}`} />
      </g>
    )
  }
  if (name === 'users') {
    return (
      <g stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <circle cx={-s(5)} cy={-s(7)} r={s(4)} />
        <circle cx={s(6)} cy={-s(8)} r={s(3.5)} />
        <path d={`M${-s(13)},${s(8)} Q${-s(13)},${-s(1)} ${-s(5)},${-s(1)} Q${s(3)},${-s(1)} ${s(3)},${s(8)}`} />
        <path d={`M${s(0)},${s(8)} Q${s(0)},${s(1)} ${s(6)},${s(1)} Q${s(13)},${s(1)} ${s(13)},${s(8)}`} />
      </g>
    )
  }
  if (name === 'factory') {
    return (
      <g stroke="#ffffff" strokeWidth="1.2" fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* chimneys */}
        <path d={`M${-s(8)},${-s(2)} L${-s(8)},${-s(13)} L${-s(4)},${-s(13)} L${-s(4)},${-s(8)}`} />
        <path d={`M${-s(4)},${-s(8)} L${s(2)},${-s(11)} L${s(2)},${-s(2)}`} />
        {/* main building */}
        <path d={`M${-s(13)},${s(10)} L${-s(13)},${-s(2)} L${s(13)},${-s(2)} L${s(13)},${s(10)} Z`} />
        {/* windows */}
        <line x1={-s(8)} y1={s(2)} x2={-s(5)} y2={s(2)} />
        <line x1={-s(2)} y1={s(2)} x2={s(1)} y2={s(2)} />
        <line x1={s(4)}  y1={s(2)} x2={s(7)} y2={s(2)} />
        <line x1={-s(8)} y1={s(6)} x2={-s(5)} y2={s(6)} />
        <line x1={-s(2)} y1={s(6)} x2={s(1)} y2={s(6)} />
        <line x1={s(4)}  y1={s(6)} x2={s(7)} y2={s(6)} />
      </g>
    )
  }
  if (name === 'shield') {
    return (
      <g stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d={`M0,${-s(15)} L${s(12)},${-s(10)} L${s(12)},${s(2)} Q${s(12)},${s(11)} 0,${s(15)} Q${-s(12)},${s(11)} ${-s(12)},${s(2)} L${-s(12)},${-s(10)} Z`} />
        <path d={`M${-s(5)},${s(0)} L${-s(1)},${s(5)} L${s(7)},${-s(4)}`} strokeWidth="1.5" />
      </g>
    )
  }
  if (name === 'truck') {
    return (
      <g stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* cargo */}
        <rect x={-s(15)} y={-s(6)} width={s(16)} height={s(13)} />
        {/* cab */}
        <path d={`M${s(1)},${s(0)} L${s(8)},${s(0)} L${s(13)},${s(5)} L${s(13)},${s(7)} L${s(1)},${s(7)} Z`} />
        {/* wheels */}
        <circle cx={-s(9)} cy={s(10)} r={s(2.5)} />
        <circle cx={s(7)}  cy={s(10)} r={s(2.5)} />
      </g>
    )
  }
  return null
}

/* -------------------------------------------------------------------------- */
/*  CARD ICONS (left list)                                                     */
/* -------------------------------------------------------------------------- */
function CardIcon({ name, active }) {
  const stroke = active ? '#ffffff' : '#cccccc'
  const sw = 1.4
  if (name === 'box') {
    return (
      <svg width="20" height="20" viewBox="-15 -15 30 30" fill="none">
        <path d="M0,-12 L11,-6 L11,7 L0,13 L-11,7 L-11,-6 Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M0,-12 L0,1 M0,1 L11,-6 M0,1 L-11,-6" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'users') {
    return (
      <svg width="22" height="22" viewBox="-14 -14 28 28" fill="none">
        <circle cx="-4" cy="-6" r="3.5" stroke={stroke} strokeWidth={sw} />
        <circle cx="5" cy="-7" r="3" stroke={stroke} strokeWidth={sw} />
        <path d="M-12,8 Q-12,-1 -4,-1 Q4,-1 4,8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M0,8 Q0,1 5,1 Q12,1 12,8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'factory') {
    return (
      <svg width="22" height="22" viewBox="-14 -14 28 28" fill="none">
        <path d="M-8,-2 L-8,-12 L-4,-12 L-4,-7 L2,-10 L2,-2 M-12,9 L-12,-2 L12,-2 L12,9 Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'shield') {
    return (
      <svg width="22" height="22" viewBox="-14 -14 28 28" fill="none">
        <path d="M0,-12 L10,-8 L10,2 Q10,9 0,12 Q-10,9 -10,2 L-10,-8 Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M-4,0 L-1,3 L5,-3" stroke={stroke} strokeWidth={sw + 0.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'truck') {
    return (
      <svg width="22" height="22" viewBox="-14 -14 28 28" fill="none">
        <rect x="-13" y="-5" width="13" height="11" stroke={stroke} strokeWidth={sw} />
        <path d="M0,-2 L7,-2 L11,2 L11,6 L0,6 Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        <circle cx="-8" cy="9" r="2" stroke={stroke} strokeWidth={sw} />
        <circle cx="6" cy="9" r="2" stroke={stroke} strokeWidth={sw} />
      </svg>
    )
  }
  return null
}

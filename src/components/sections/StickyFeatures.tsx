'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ─── DATA ────────────────────────────────────────────────────────────────────
const sections = [
  {
    num: '01',
    label: 'CAD TO COST',
    headline: 'From Drawing to Cost in Minutes.',
    body: 'Connect CAD files, drawings, part data, and BOM structures directly to cost models. Understand cost at the part level, assembly level, and supplier level — before production begins.',
    bullets: ['Estimate cost earlier in product development', 'Identify cost drivers before sourcing', 'Reduce manual cost calculation effort'],
    mode: 'cad',
  },
  {
    num: '02',
    label: 'SHOULD COST ANALYSIS',
    headline: 'Know What It Should Cost Before You Ask.',
    body: 'Calculate should-cost using raw material, machine hours, tooling, scrap, logistics, and supplier assumptions. A traceable baseline for every negotiation.',
    bullets: ['Reduce manual Excel costing', 'Compare target vs should-cost', 'Find cost gaps before negotiation'],
    mode: 'cost',
  },
  {
    num: '03',
    label: 'SUPPLIER INTELLIGENCE',
    headline: 'Choose the Right Supplier with Evidence.',
    body: 'Evaluate suppliers on cost, capability, feasibility, and delivery. Compare quotes against your should-cost model. Nominate with confidence, not gut feel.',
    bullets: ['Shortlist capable suppliers faster', 'Compare quotes against cost models', 'Build a reliable vendor intelligence base'],
    mode: 'supplier',
  },
  {
    num: '04',
    label: 'PRODUCTION & QUALITY',
    headline: 'Track Every Lot. Every Checkpoint.',
    body: 'Manage production lots, PPAP workflows, quality checkpoints, inspections, packing, and delivery tracking — all from the same manufacturing record.',
    bullets: ['Track production progress in real time', 'Connect quality data with supplier records', 'Reduce handoff gaps between teams'],
    mode: 'production',
  },
  {
    num: '05',
    label: 'DELIVERY INTELLIGENCE',
    headline: 'From First BOM to Final Shipment.',
    body: 'One continuous manufacturing record from design release to delivery confirmation. ISIR closure, packing, logistics, and delivery — visible in one platform.',
    bullets: ['Monitor delivery readiness', 'Full traceability from BOM to shipment', 'Reduce programme delay risk'],
    mode: 'delivery',
  },
]

// ─── BOM GRAPH — transforms based on active mode ─────────────────────────────
function BOMGraph({ mode }) {
  const nodes = [
    { id: 'root', x: 280, y: 280, r: 32, label: 'ASSEMBLY' },
    { id: 'n1',   x: 120, y: 160, r: 22, label: 'FUSELAGE' },
    { id: 'n2',   x: 280, y: 100, r: 22, label: 'AVIONICS' },
    { id: 'n3',   x: 440, y: 160, r: 22, label: 'PROPULSION' },
    { id: 'n4',   x: 60,  y: 340, r: 16, label: 'FRAME' },
    { id: 'n5',   x: 160, y: 60,  r: 16, label: 'SKIN' },
    { id: 'n6',   x: 220, y: 30,  r: 16, label: 'NAV' },
    { id: 'n7',   x: 350, y: 30,  r: 16, label: 'COMM' },
    { id: 'n8',   x: 460, y: 60,  r: 16, label: 'ENGINE' },
    { id: 'n9',   x: 500, y: 340, r: 16, label: 'NOZZLE' },
  ]

  const edges = [
    ['root','n1'],['root','n2'],['root','n3'],
    ['n1','n4'],['n1','n5'],
    ['n2','n6'],['n2','n7'],
    ['n3','n8'],['n3','n9'],
  ]

  const getNode = (id) => nodes.find(n => n.id === id)

  // Cost labels per node for 'cost' mode
  const costLabels = {
    root: '₹4.8Cr', n1: '₹1.2Cr', n2: '₹0.9Cr', n3: '₹2.1Cr',
    n4: '₹0.3Cr', n5: '₹0.4Cr', n6: '₹0.2Cr', n7: '₹0.3Cr', n8: '₹1.1Cr', n9: '₹0.5Cr',
  }

  // Supplier labels for 'supplier' mode
  const supplierLabels = {
    n1: 'BEL', n2: 'HAL', n3: 'DRDO', n4: 'MTAR', n5: 'L&T',
    n6: 'CENTUM', n7: 'DATA PAT.', n8: 'BHARAT FG', n9: 'APOLLO',
  }

  // Which nodes pulse in production mode
  const productionOrder = ['root','n1','n2','n3','n4','n5']

  // Node color logic
  const getNodeStyle = (node) => {
    if (mode === 'cost') {
      const costs = { root: 1, n3: 0.9, n8: 0.85, n1: 0.6, n2: 0.5 }
      const intensity = costs[node.id] || 0.3
      return {
        stroke: `rgba(255,255,255,${0.3 + intensity * 0.6})`,
        strokeWidth: node.id === 'root' ? 1.8 : 1.2,
      }
    }
    if (mode === 'supplier') {
      return {
        stroke: node.id === 'root' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
        strokeWidth: 1.2,
      }
    }
    if (mode === 'production') {
      const active = productionOrder.includes(node.id)
      return {
        stroke: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
        strokeWidth: active ? 1.8 : 0.8,
      }
    }
    if (mode === 'delivery') {
      return {
        stroke: 'rgba(255,255,255,0.7)',
        strokeWidth: 1.2,
      }
    }
    // default / cad mode
    return {
      stroke: node.id === 'root' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
      strokeWidth: node.id === 'root' ? 1.8 : 1,
    }
  }

  return (
    <svg viewBox="0 0 560 420" className="w-full h-full">
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Root glow */}
      <circle cx="280" cy="280" r="80" fill="url(#rg)" />

      {/* Edges */}
      {edges.map(([from, to], i) => {
        const a = getNode(from)
        const b = getNode(to)
        const isActive = mode === 'production'
          ? productionOrder.includes(from) && productionOrder.includes(to)
          : true
        return (
          <motion.line
            key={i}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'}
            strokeWidth="1"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const style = getNodeStyle(node)
        return (
          <motion.g
            key={node.id}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {node.id === 'root' && (
              <motion.circle
                cx={node.x} cy={node.y} r={node.r + 16}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                animate={{ r: [node.r + 16, node.r + 22, node.r + 16] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            <circle
              cx={node.x} cy={node.y} r={node.r}
              fill="#080808"
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              filter={node.id === 'root' ? 'url(#glow)' : undefined}
            />

            {/* Cost labels */}
            {mode === 'cost' && costLabels[node.id] && (
              <motion.text
                x={node.x} y={node.y + node.r + 14}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="8"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {costLabels[node.id]}
              </motion.text>
            )}

            {/* Supplier labels */}
            {mode === 'supplier' && node.id !== 'root' && supplierLabels[node.id] && (
              <motion.text
                x={node.x} y={node.y + node.r + 14}
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="7.5"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {supplierLabels[node.id]}
              </motion.text>
            )}

            {/* Default label */}
            {mode !== 'cost' && mode !== 'supplier' && (
              <text
                x={node.x}
                y={node.id === 'root' ? node.y + node.r + 16 : node.y + node.r + 13}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize={node.id === 'root' ? '8.5' : '7'}
                fontFamily="monospace"
                letterSpacing="1.5"
              >
                {node.label}
              </text>
            )}

            {/* Delivery mode — checkmark on each node */}
            {mode === 'delivery' && (
              <motion.text
                x={node.x} y={node.y + 4}
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: nodes.indexOf(node) * 0.05 }}
              >
                ✓
              </motion.text>
            )}
          </motion.g>
        )
      })}

      {/* Mode label at bottom */}
      <motion.text
        x="280" y="410"
        textAnchor="middle"
        fill="rgba(255,255,255,0.15)"
        fontSize="9"
        fontFamily="monospace"
        letterSpacing="3"
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        EMITHRAN — {mode.toUpperCase()} VIEW
      </motion.text>
    </svg>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function StickyFeatures() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.5 }
      )
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach(o => o && o.disconnect())
  }, [])

  const activeSection = sections[activeIndex]

  return (
    <section ref={containerRef} className="border-t border-border">

      {/* Section intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 border-b border-border">
        <p className="font-mono text-[11px] tracking-[0.25em] text-grey-300 uppercase mb-6">THE PLATFORM</p>
        <h2 className="font-display text-white leading-none max-w-4xl"
          style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
          From CAD to Delivery. One Connected System.
        </h2>
      </div>

      {/* Sticky layout */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-0">

          {/* LEFT — scrolling text sections */}
          <div className="lg:pr-16">
            {sections.map((section, i) => (
              <div
                key={section.num}
                ref={el => sectionRefs.current[i] = el}
                className="min-h-screen flex flex-col justify-center py-24 border-b border-border last:border-0"
              >
                {/* Big background number */}
                <div
                  aria-hidden
                  className="font-display text-white select-none pointer-events-none mb-2"
                  style={{ fontSize: 'clamp(80px, 14vw, 160px)', opacity: 0.04, lineHeight: 1 }}
                >
                  {section.num}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-[11px] tracking-[0.25em] text-grey-300 uppercase mb-5">
                    {section.label}
                  </p>

                  <h3
                    className="font-display text-white leading-none mb-8"
                    style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
                  >
                    {section.headline}
                  </h3>

                  <p className="font-mono text-[14px] text-grey-200 leading-relaxed max-w-lg mb-8">
                    {section.body}
                  </p>

                  <ul className="flex flex-col gap-3">
                    {section.bullets.map((b, bi) => (
                      <motion.li
                        key={bi}
                        className="font-mono text-[13px] text-grey-300 flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.1 + bi * 0.08 }}
                      >
                        <span className="text-grey-500 mt-0.5 shrink-0">—</span>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>

          {/* RIGHT — sticky BOM graph */}
          <div className="hidden lg:block">
            <div className="sticky top-0 h-screen flex items-center justify-center pl-8 border-l border-border">
              <div className="w-full max-w-lg">

                {/* Active section label */}
                <motion.p
                  key={activeSection.label}
                  className="font-mono text-[10px] tracking-[0.25em] text-grey-400 uppercase mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {activeSection.label}
                </motion.p>

                {/* The BOM graph */}
                <motion.div
                  key={activeSection.mode}
                  className="w-full aspect-square"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <BOMGraph mode={activeSection.mode} />
                </motion.div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-3 mt-8">
                  {sections.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-px bg-white"
                      animate={{ width: i === activeIndex ? 28 : 10, opacity: i === activeIndex ? 1 : 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

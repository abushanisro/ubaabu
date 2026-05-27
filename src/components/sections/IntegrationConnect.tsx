'use client'
import AnimatedSection from '@/components/ui/AnimatedSection'

/* ── Brand colours ─────────────────────────────────────────── */
const TEAL        = 'oklch(0.68 0.13 180)'   /* #48d2be */
const NAVY        = '#060a1c'                 /* darker navy panel */
const NODE_BG     = 'rgba(72,210,190,0.07)'  /* teal-tinted glass */
const NODE_BORDER = 'rgba(72,210,190,0.22)'  /* teal border */

/* ── Module data ────────────────────────────────────────────── */
const TOP_MODULES = [
  { label: 'BOM Management',        sub: '204 parts · 12 assemblies' },
  { label: 'Process Planning',      sub: 'Cost est. +18.4%' },
  { label: 'Supplier Evaluation',   sub: '4 suppliers scored' },
  { label: 'Supplier Nomination',   sub: 'Supplier B · 92 pts' },
]

const BOTTOM_MODULES = [
  { label: 'Production Planning', sub: 'ISIR → Batch → Mass' },
  { label: 'Quality Control',     sub: '98.6% · 1,227 Pass' },
  { label: 'Delivery',            sub: '98% on-time' },
  { label: 'Benchmark Analysis',  sub: '3 projects compared' },
  { label: 'VAVE',                sub: '↓ 18% cost reduction' },
]

/* ── Node box (top / bottom modules) ───────────────────────── */
function ModuleNode({
  label, sub, className = '', style,
}: {
  label: string; sub: string; className?: string; style?: React.CSSProperties
}) {
  return (
    <div
      className={`absolute flex flex-col gap-0.5 px-2.5 py-1.5 rounded-lg border whitespace-nowrap ${className}`}
      style={{ background: NODE_BG, borderColor: NODE_BORDER, ...style }}
    >
      <span className="text-[11px] font-semibold text-white/80 leading-tight">{label}</span>
      <span className="text-[9px] font-mono text-white/35 leading-tight">{sub}</span>
    </div>
  )
}

/* ── Small pill badge ───────────────────────────────────────── */
function Badge({
  label, className = '', accent = false, style,
}: {
  label: string; className?: string; accent?: boolean; style?: React.CSSProperties
}) {
  return (
    <div
      className={`absolute px-3 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap border ${className}`}
      style={accent
        ? { background: TEAL, color: '#fff', borderColor: 'transparent', ...style }
        : { background: NODE_BG, borderColor: NODE_BORDER, color: 'rgba(255,255,255,0.75)', ...style }
      }
    >
      {label}
    </div>
  )
}

/* ── Centre hub ─────────────────────────────────────────────── */
function Hub() {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                 flex flex-col items-center gap-1 px-7 py-4 rounded-2xl border
                 font-bold text-sm tracking-tight text-white
                 shadow-[0_0_60px_rgba(72,210,190,0.18)]"
      style={{ background: 'rgba(72,210,190,0.10)', borderColor: 'rgba(72,210,190,0.55)' }}
    >
      <span className="text-white text-sm font-bold">Emithran</span>
      <span className="text-[9px] font-mono text-white/35 font-normal tracking-widest uppercase">
        Intelligence Hub
      </span>
    </div>
  )
}

/* ── Bottom module pill ─────────────────────────────────────── */
function BottomPill({ label }: { label: string }) {
  return (
    <div
      className="px-2 py-1 rounded text-[9px] font-mono text-teal-300/60 border whitespace-nowrap"
      style={{ background: 'rgba(72,210,190,0.06)', borderColor: 'rgba(72,210,190,0.18)' }}
    >
      {label}
    </div>
  )
}

/* ── SVG connection lines ───────────────────────────────────── */
function Lines() {
  const stroke = 'rgba(72,210,190,0.45)'
  const dash   = '4 4'
  const sw     = '1'
  const hx = 50; const hy = 50

  /* top module x positions (matching 4 modules) */
  const topXs = [18, 33, 58, 74]
  const topY  = 14

  /* method badge positions */
  const methL = { x: 24, y: 34 }
  const methR = { x: 68, y: 34 }

  /* side badge positions */
  const sideL = { x: 20, y: 50 }
  const sideR = { x: 72, y: 50 }

  /* orchestration */
  const orchY = 67

  /* bottom pill xs */
  const btmXs  = [30, 38, 50, 62, 70]
  const btmY   = 84

  const line = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
  )
  const curve = (x1: number, y1: number, x2: number, y2: number, k: string) => {
    const mx = (x1 + x2) / 2
    return (
      <path key={k} d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`}
        fill="none" stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
    )
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
         viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>

      {/* Horizontal centre line */}
      <line x1="0" y1="50" x2="100" y2="50"
        stroke="rgba(72,210,190,0.25)" strokeWidth="0.5" strokeDasharray="3 3" />

      {/* Top modules → method badges */}
      {topXs.slice(0, 2).map((x, i) => line(x, topY, methL.x, methL.y, `tl${i}`))}
      {topXs.slice(2).map((x, i)  => line(x, topY, methR.x, methR.y, `tr${i}`))}

      {/* Method badges → hub */}
      {curve(methL.x, methL.y, hx, hy, 'ml')}
      {curve(methR.x, methR.y, hx, hy, 'mr')}

      {/* Side badges → hub */}
      {line(sideL.x, sideL.y, hx, hy, 'sl')}
      {line(sideR.x, sideR.y, hx, hy, 'sr')}

      {/* Hub → orchestration */}
      {line(hx, hy, hx, orchY, 'ho')}

      {/* Orchestration → bottom pills */}
      {btmXs.map((x, i) => line(hx, orchY, x, btmY, `ob${i}`))}

      {/* Animated dots */}
      <circle r="0.8" fill="oklch(0.68 0.13 180)" opacity="0.9">
        <animateMotion dur="2.6s" repeatCount="indefinite"
          path={`M${topXs[0]} ${topY} C${methL.x} ${topY} ${methL.x} ${hy} ${hx} ${hy}`} />
      </circle>
      <circle r="0.7" fill="oklch(0.68 0.13 180)" opacity="0.7">
        <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.2s"
          path={`M${topXs[3]} ${topY} C${methR.x} ${topY} ${methR.x} ${hy} ${hx} ${hy}`} />
      </circle>
      <circle r="0.65" fill="oklch(0.68 0.13 180)" opacity="0.6">
        <animateMotion dur="2s" repeatCount="indefinite" begin="0.6s"
          path={`M${hx} ${hy} L${hx} ${orchY} L${btmXs[2]} ${btmY}`} />
      </circle>
    </svg>
  )
}

/* ── Dot-grid background ─────────────────────────────────────── */
const dotGrid: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, rgba(72,210,190,0.18) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
}

/* ══════════════════════════════════════════════════════════════
   Main section
══════════════════════════════════════════════════════════════ */
export default function IntegrationConnect() {
  return (
    <section className="relative bg-[#080808] pt-10 md:pt-14 pb-0 overflow-hidden text-white">
      {/* Column lines */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-white/[0.08] hidden md:block" style={{ left: 64 }} />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-white/[0.08] hidden md:block" style={{ right: 64 }} />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12">

        {/* Header */}
        <AnimatedSection className="max-w-xl">
          <p className="text-base md:text-lg leading-relaxed">
            <span className="font-bold">Precision at every stage of manufacturing.</span>{' '}
            <span className="text-white/50">
              From BOM and supplier selection to production, quality, delivery, and value
              engineering — all operating as one intelligent system.
            </span>
          </p>
        </AnimatedSection>

        {/* Diagram */}
        <AnimatedSection delay={0.15} className="mt-6">
          <div
            className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{ background: NAVY, height: 400 }}
          >
            {/* Dot grid */}
            <div className="absolute inset-0" style={dotGrid} />

            {/* Edge vignette */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 65% 65% at 50% 50%, transparent 45%, ${NAVY} 100%)` }} />
            {/* Teal ambient glow at hub centre */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(72,210,190,0.06) 0%, transparent 70%)' }} />

            {/* SVG lines */}
            <Lines />

            {/* ── Top: 4 module nodes ─── */}
            <ModuleNode label="BOM Management"      sub="204 parts · 12 assemblies"
              className="hidden md:flex" style={{ left: '8%',  top: '7%' }} />
            <ModuleNode label="Process Planning"    sub="Cost est. +18.4%"
              className="hidden md:flex" style={{ left: '26%', top: '3%' }} />
            <ModuleNode label="Supplier Evaluation" sub="4 suppliers scored"
              className="hidden md:flex" style={{ left: '51%', top: '7%' }} />
            <ModuleNode label="Supplier Nomination" sub="Supplier B · 92 pts"
              className="hidden md:flex" style={{ left: '69%', top: '3%' }} />

            {/* ── Row 2: method badges ─── */}
            <Badge label="AI Planning"  style={{ left: '18%', top: '32%' }} className="hidden md:block" />
            <Badge label="Cost Engine"  style={{ right: '18%', top: '32%' }} className="hidden md:block" />

            {/* ── Centre row ─── */}
            <Badge label="Module Flow ↗" accent
              style={{ left: '12%', top: '46%' }} className="hidden md:block" />

            <Hub />

            <Badge label="Real-time Sync"
              style={{ right: '10%', top: '46%' }} className="hidden md:block" />

            {/* ── Below hub ─── */}
            <Badge label="Workflow Engine"
              className="hidden md:block -translate-x-1/2"
              style={{ left: '50%', top: '64%' }} />

            {/* ── Bottom module pills ─── */}
            <div className="absolute hidden md:flex gap-1.5 -translate-x-1/2"
                 style={{ left: '50%', bottom: '7%' }}>
              {BOTTOM_MODULES.map((m) => (
                <BottomPill key={m.label} label={m.label} />
              ))}
            </div>

            {/* ── Mobile fallback ─── */}
            <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center gap-3 p-5">
              <div className="px-5 py-3 rounded-xl border font-bold text-sm text-white"
                   style={{ background: 'rgba(72,210,190,0.10)', borderColor: 'rgba(72,210,190,0.55)' }}>
                Emithran · Intelligence Hub
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {[...TOP_MODULES, ...BOTTOM_MODULES].map((m) => (
                  <span key={m.label}
                    className="px-2 py-1 rounded text-[10px] font-mono text-white/55 border"
                    style={{ background: NODE_BG, borderColor: NODE_BORDER }}>
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}

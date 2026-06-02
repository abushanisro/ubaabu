'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Lock, Globe, Activity,
  Calculator, Layers, Search, Lightbulb, ShieldCheck, Flag,
  Database, Package, ShoppingCart, Cpu, TrendingUp, Settings2,
  type LucideIcon,
} from 'lucide-react'

const SplineScene = dynamic(
  () => import('@/components/ui/splite').then(m => ({ default: m.SplineScene })),
  { ssr: false, loading: () => null }
)

type Item = { id: string; label: string; sub: string; desc: string; icon: LucideIcon }

const LEFT: Item[] = [
  { id: 'should-cost',    icon: Calculator,  label: 'Should Cost',    sub: '+8% accuracy, −80% RFQ time',   desc: 'Fast & robust cost guidance for procurement and quoting with plus 8% accuracy, cutting RFQ cycle time by 80%.' },
  { id: 'bom-composer',   icon: Layers,      label: 'BOM Composer',   sub: '99.4% accuracy, 80% faster',    desc: 'Automated BOM assembly with 99.4% accuracy across complex defence programme structures, 80% faster than manual.' },
  { id: 'supplier-radar', icon: Search,      label: 'Supplier Radar', sub: '+300% discovery, −75% risk',    desc: 'AI-powered supplier discovery across 50K+ verified Indian vendors with 75% reduction in supply chain risk incidents.' },
  { id: 'vave-studio',    icon: Lightbulb,   label: 'VAVE Studio',    sub: '3-5× ideas, savings per year',  desc: 'Value analysis and engineering platform generating 3-5x more cost reduction ideas per programme cycle.' },
  { id: 'quality-guard',  icon: ShieldCheck, label: 'Quality Guard',  sub: 'AI inspection, real-time alerts', desc: 'Real-time AI-powered inspection and quality monitoring with instant alert workflows for defence-grade standards.' },
  { id: 'launch-tracker', icon: Flag,        label: 'Launch Tracker', sub: 'Milestones, NPI tracking',      desc: 'End-to-end NPI milestone tracking across complex multi-year defence and aerospace programmes.' },
]
const RIGHT: Item[] = [
  { id: 'erp',      icon: Database,    label: 'ERP Systems',    sub: 'SAP · Oracle · MS Dynamics',   desc: 'Bi-directional ERP sync that surfaces cost gaps between should-cost models and actuals in real time.' },
  { id: 'plm',      icon: Package,     label: 'PLM Software',   sub: 'Siemens · PTC · Dassault',     desc: 'Native PLM connectors for Teamcenter, Windchill, and ENOVIA to embed cost intelligence into design workflows.' },
  { id: 'proc',     icon: ShoppingCart,label: 'Procurement',    sub: 'Ariba · Coupa · Jaggaer',      desc: 'Direct procurement platform integration for automated RFQ dispatch and purchase order creation at scale.' },
  { id: 'ai-lakes', icon: Cpu,         label: 'AI & Data Lakes',sub: 'BI · Warehouses · REST APIs',   desc: 'REST APIs and data lake connectors feed Emithran intelligence into BI tools and custom AI pipelines.' },
  { id: 'mes',      icon: Settings2,   label: 'MES / SCADA',    sub: 'Siemens · Rockwell · GE',      desc: 'Shop-floor integration with MES and SCADA systems for real-time production data and quality traceability.' },
  { id: 'finance',  icon: TrendingUp,  label: 'Finance & Cost', sub: 'Tally · SAP FICO · Oracle',    desc: 'Finance system connectors for cost actuals comparison, variance reporting, and programme P&L analysis.' },
]
const ALL = [...LEFT, ...RIGHT]
const PILLARS = [
  { icon: Lock,     title: 'Enterprise-grade security', badge: 'ISO 27001', body: 'ISO 27001 certified. SOC 2 Type II compliant with role-based access controls meeting defence data-sovereignty requirements.', image: '/assets/element-bg/Enterprise-grade.png' },
  { icon: Globe,    title: 'Scalable platform',         badge: undefined,   body: 'Single unified platform spanning programmes, geographies, and Tier-1 to Tier-4 supplier networks at full scale.',                   image: '/assets/element-bg/Scalable.png' },
  { icon: Activity, title: 'Operational stability',     badge: undefined,   body: 'Proven reliability for mission-critical manufacturing and sourcing workflows across long-cycle defence programmes.',                image: '/assets/element-bg/Operational.png' },
]
const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

type Pt = { x: number; y: number }

export default function EnterpriseSection() {
  const stageRef   = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const coreRef    = useRef<HTMLDivElement>(null)
  const itemElsRef = useRef<Map<string, HTMLElement>>(new Map())
  const activeRef  = useRef<string | null>(null)
  const rafRef     = useRef<number>(0)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [activeId,  setActiveId]  = useState<string | null>(null)
  const [pinnedId,  setPinnedId]  = useState<string | null>(null)
  const [isMob,     setIsMob]     = useState(false)

  useEffect(() => { activeRef.current = activeId }, [activeId])

  useEffect(() => {
    const check = () => setIsMob(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  function layoutItems() {
    const stage = stageRef.current
    if (!stage) return
    const W = stage.clientWidth
    const H = stage.clientHeight
    if (!W || !H) return
    const mob = W < 640

    if (mob) {
      const cx = W / 2
      const cy = H * 0.43
      const r  = Math.min(W * 0.45, H * 0.39)
      const DEG = Math.PI / 180
      const placeArc = (id: string, angle: number) => {
        const el = itemElsRef.current.get(id)
        if (!el) return
        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)
        el.style.transform = `translate(${x - el.offsetWidth / 2}px,${y - el.offsetHeight / 2}px)`
      }
      // Near-full circle: ~30° gap top, ~20° gap bottom — uniform 31° spacing
      const leftStep  = (155 * DEG) / (LEFT.length  - 1)
      const rightStep = (155 * DEG) / (RIGHT.length - 1)
      LEFT.forEach( (it, i) => placeArc(it.id, 100 * DEG + leftStep  * i))
      RIGHT.forEach((it, i) => placeArc(it.id, -75 * DEG + rightStep * i))
      return
    }

    // Desktop — two vertical columns
    const N      = LEFT.length
    const topY   = H * 0.06
    const botY   = H * 0.94
    const gap    = N > 1 ? (botY - topY) / (N - 1) : 0
    const leftX  = W * 0.17
    const rightX = W * 0.83
    const place  = (id: string, cx: number, i: number) => {
      const el = itemElsRef.current.get(id)
      if (!el) return
      el.style.transform = `translate(${cx - el.offsetWidth / 2}px,${topY + gap * i - el.offsetHeight / 2}px)`
    }
    LEFT.forEach( (it, i) => place(it.id, leftX,  i))
    RIGHT.forEach((it, i) => place(it.id, rightX, i))
  }

  useEffect(() => {
    const stage  = stageRef.current
    const canvas = canvasRef.current
    const core   = coreRef.current
    if (!stage || !canvas || !core) return
    const ctx = canvas.getContext('2d')!
    let dpr = 1

    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      const r = stage!.getBoundingClientRect()
      canvas!.width  = Math.round(r.width * dpr)
      canvas!.height = Math.round(r.height * dpr)
      canvas!.style.width  = r.width + 'px'
      canvas!.style.height = r.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      layoutItems()
    }
    function coreInfo() {
      const sr = stage!.getBoundingClientRect()
      const cr = core!.getBoundingClientRect()
      return { x: cr.left - sr.left + cr.width / 2, y: cr.top - sr.top + cr.height / 2, r: Math.min(cr.width, cr.height) / 2 }
    }
    function itemEdge(id: string) {
      const el = itemElsRef.current.get(id)
      if (!el) return null
      const sr   = stage!.getBoundingClientRect()
      const er   = el.getBoundingClientRect()
      const side = LEFT.some(l => l.id === id) ? 'left' : 'right'
      if (stage!.clientWidth < 640) {
        // Circular layout — connect from item centre
        return { x: er.left - sr.left + er.width / 2, y: er.top - sr.top + er.height / 2, side }
      }
      return { x: side === 'left' ? er.right - sr.left + 4 : er.left - sr.left - 4, y: er.top - sr.top + er.height / 2, side }
    }
    function arrow(from: Pt, to: Pt, active: boolean) {
      const angle = Math.atan2(to.y - from.y, to.x - from.x)
      const s = active ? 7 : 5.5
      ctx.save(); ctx.translate(to.x, to.y); ctx.rotate(angle)
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-s, -s * 0.55); ctx.moveTo(0, 0); ctx.lineTo(-s, s * 0.55)
      ctx.lineWidth = active ? 1.7 : 1.2
      ctx.strokeStyle = active ? 'rgba(45,212,191,0.95)' : 'rgba(45,212,191,0.6)'
      ctx.shadowColor = active ? 'rgba(45,212,191,0.45)' : 'transparent'
      ctx.shadowBlur = active ? 10 : 0
      ctx.stroke(); ctx.restore()
    }
    function line(from: Pt, to: Pt, active: boolean, phase: number, offset: number, reverse: boolean) {
      const dx = to.x - from.x, dy = to.y - from.y, len = Math.hypot(dx, dy) || 1
      const ox = (-dy / len) * offset, oy = (dx / len) * offset
      const s: Pt = { x: from.x + ox, y: from.y + oy }, e: Pt = { x: to.x + ox, y: to.y + oy }
      ctx.save(); ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(e.x, e.y)
      ctx.setLineDash(active ? [7, 7] : [5, 9]); ctx.lineDashOffset = reverse ? phase : -phase
      ctx.lineWidth = active ? 1.4 : 0.85
      ctx.strokeStyle = active ? 'rgba(45,212,191,0.88)' : 'rgba(45,212,191,0.32)'
      ctx.shadowColor = active ? 'rgba(45,212,191,0.3)' : 'transparent'
      ctx.shadowBlur = active ? 10 : 0
      ctx.stroke(); if (reverse) arrow(e, s, active); else arrow(s, e, active); ctx.restore()
    }
    function connectors(from: Pt & { side: string }, to: Pt, active: boolean, phase: number) {
      if (stage!.clientWidth >= 640 && from.side === 'right') {
        line(from, to, active, phase, -4, false); line(from, to, active, phase, 4, true)
      } else {
        line(from, to, active, phase, 0, false)
      }
    }
    function rings(cx: number, cy: number, r: number, phase: number) {
      ;[{ rm: 0.52, a: 0.48, solid: true }, { rm: 0.70, a: 0.28, solid: true }, { rm: 0.88, a: 0.16, solid: false }]
        .forEach(({ rm, a, solid }, i) => {
          ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r * rm + Math.sin(phase / 28 + i) * 1.2, 0, Math.PI * 2)
          ctx.lineWidth = 1; ctx.strokeStyle = `rgba(45,212,191,${a})`
          if (!solid) { ctx.setLineDash([5, 8]); ctx.lineDashOffset = -phase * 0.3 }
          ctx.stroke(); ctx.restore()
        })
    }
    function render(time: number) {
      const W = parseInt(canvas!.style.width) || canvas!.offsetWidth
      const H = parseInt(canvas!.style.height) || canvas!.offsetHeight
      ctx.clearRect(0, 0, W, H)
      const c = coreInfo(), phase = time / 40, aid = activeRef.current
      const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r * 1.9)
      g.addColorStop(0, aid ? 'rgba(45,212,191,0.07)' : 'rgba(45,212,191,0.025)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c.x, c.y, c.r * 1.9, 0, Math.PI * 2); ctx.fill()
      rings(c.x, c.y, c.r * 1.65, phase)
      ALL.forEach(item => {
        const edge = itemEdge(item.id); if (!edge) return
        const active = item.id === aid
        const dx = c.x - edge.x, dy = c.y - edge.y, len = Math.hypot(dx, dy) || 1
        const end: Pt = { x: c.x - (dx / len) * c.r * 1.05, y: c.y - (dy / len) * c.r * 1.05 }
        connectors(edge, end, active, phase)
      })
      rafRef.current = requestAnimationFrame(render)
    }
    resize()
    rafRef.current = requestAnimationFrame(render)
    const ro = new ResizeObserver(resize); ro.observe(stage)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function enter(id: string) {
    if (pinnedId) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setActiveId(id)
  }
  function leave() {
    if (pinnedId || isMob) return
    timerRef.current = setTimeout(() => setActiveId(null), 200)
  }
  function toggle(id: string) {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (pinnedId === id) { setPinnedId(null); setActiveId(null) }
    else { setPinnedId(id); setActiveId(id) }
  }

  const activeItem = ALL.find(i => i.id === activeId)
  const robotSize  = isMob ? 108 : 260

  return (
    <section className="bg-[#080808] overflow-hidden">

      {/* Trust pillars */}
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-6 sm:pt-10 pb-0">
        <div className="text-center mb-3 sm:mb-5">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#2dd4bf' }}>
            Built for the Enterprise
          </p>
          <h2 className="text-base sm:text-xl md:text-2xl font-semibold leading-snug tracking-tight">
            Secure, scalable, and built for Indian defence manufacturing
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-7">
          {PILLARS.map(({ icon: Icon, title, body, badge, image }) => (
            <div
              key={title}
              className="rounded-xl border flex flex-col relative overflow-hidden"
              style={{
                background: 'rgba(8,10,14,0.9)',
                borderColor: 'rgba(255,255,255,0.07)',
                minHeight: 80,
              }}
            >
              {/* Background illustration */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                  opacity: 0.55,
                  pointerEvents: 'none',
                }}
              />
              {/* Light scrim — just enough to keep text readable */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(160deg, rgba(6,10,14,0.72) 0%, rgba(6,10,14,0.40) 60%, rgba(6,10,14,0.10) 100%)' }}
              />

              {/* Content */}
              <div className="relative z-10 p-2.5 sm:p-4 flex flex-col gap-1 sm:gap-2 h-full">
                <div className="flex items-start gap-1.5 sm:gap-2.5">
                  <div
                    className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 mt-0.5 sm:mt-0"
                    style={{ background: 'rgba(13,158,138,0.15)', border: '1px solid rgba(45,212,191,0.18)' }}
                  >
                    <Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" style={{ color: '#2dd4bf' }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[8.5px] sm:text-[12px] font-semibold text-white leading-tight">{title}</h3>
                    {badge && (
                      <span
                        className="hidden sm:inline-block text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5"
                        style={{ background: 'rgba(45,212,191,0.12)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.25)' }}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
                <p className="hidden sm:block text-[11px] leading-relaxed text-white/40">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(45,212,191,0.12),transparent)' }} />
      </div>

      {/* Infographic header */}
      <div className="text-center pt-4 sm:pt-7 pb-1 sm:pb-3 px-6">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#2dd4bf' }}>
          Platform Integrations
        </p>
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold leading-snug tracking-tight max-w-2xl mx-auto">
          Put supply chain intelligence to work across your enterprise
        </h2>
      </div>

      {/* Infographic stage */}
      <div
        ref={stageRef}
        className="relative mx-auto"
        style={{ height: isMob ? 480 : 560, maxWidth: 1280 }}
        onMouseLeave={leave}
        onClick={() => { setActiveId(null); setPinnedId(null) }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Left items */}
        {LEFT.map(item => {
          const active = activeId === item.id
          const Icon = item.icon
          return (
            <div
              key={item.id}
              ref={el => { if (el) itemElsRef.current.set(item.id, el); else itemElsRef.current.delete(item.id) }}
              className="absolute left-0 top-0 z-10 cursor-pointer select-none"
              style={{ transform: 'translate(-9999px,0)' }}
              onPointerEnter={e => { if (e.pointerType === 'mouse') enter(item.id) }}
              onPointerLeave={e => { if (e.pointerType === 'mouse') leave() }}
              onClick={e => { e.stopPropagation(); toggle(item.id) }}
            >
              {isMob ? (
                /* Mobile: bare icon + 1-line label, no card bg */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div
                    style={{
                      width: 24, height: 24,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 7,
                      background: active
                        ? 'linear-gradient(135deg,rgba(13,158,138,0.35) 0%,rgba(6,12,16,0.92) 100%)'
                        : 'linear-gradient(135deg,rgba(13,158,138,0.18) 0%,rgba(6,12,16,0.88) 100%)',
                      border: `1px solid ${active ? 'rgba(45,212,191,0.50)' : 'rgba(45,212,191,0.25)'}`,
                      boxShadow: active ? '0 0 8px rgba(45,212,191,0.30)' : 'none',
                    }}
                  >
                    <Icon style={{
                      width: 12, height: 12,
                      color: active ? '#2dd4bf' : 'rgba(45,212,191,0.80)',
                      filter: active ? 'drop-shadow(0 0 3px rgba(45,212,191,0.7))' : 'none',
                    }} />
                  </div>
                  <span style={{
                    fontSize: 7.5, fontWeight: 600, whiteSpace: 'nowrap',
                    color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
                    lineHeight: 1,
                  }}>
                    {item.label}
                  </span>
                </div>
              ) : (
                /* Desktop: full neural-bg pill */
                <div
                  className="flex items-center rounded-xl border transition-all duration-200"
                  style={{
                    padding: '7px 10px', gap: 9,
                    backgroundImage: `linear-gradient(${active ? 'rgba(4,10,16,0.84)' : 'rgba(6,13,18,0.76)'}, ${active ? 'rgba(4,10,16,0.84)' : 'rgba(6,13,18,0.76)'}), url('/assets/element-bg/aicard.png')`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    borderColor: active ? 'rgba(45,212,191,0.45)' : 'rgba(45,212,191,0.18)',
                    boxShadow: active
                      ? '0 0 18px rgba(45,212,191,0.20), inset 0 0 0 1px rgba(45,212,191,0.08)'
                      : '0 2px 8px rgba(0,0,0,0.45)',
                    transform: active ? 'translateX(-5px) rotate(-0.7deg)' : 'translateX(0) rotate(0deg)',
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0 transition-all duration-200"
                    style={{
                      width: 34, height: 34,
                      background: active
                        ? 'linear-gradient(135deg,rgba(13,158,138,0.30) 0%,rgba(6,12,16,0.92) 100%)'
                        : 'linear-gradient(135deg,rgba(13,158,138,0.13) 0%,rgba(6,12,16,0.85) 100%)',
                      border: `1px solid ${active ? 'rgba(45,212,191,0.44)' : 'rgba(45,212,191,0.20)'}`,
                      boxShadow: active ? '0 0 10px rgba(45,212,191,0.24)' : 'none',
                    }}
                  >
                    <Icon style={{
                      width: 16, height: 16,
                      color: active ? '#2dd4bf' : 'rgba(45,212,191,0.72)',
                      filter: active ? 'drop-shadow(0 0 4px rgba(45,212,191,0.65))' : 'none',
                    }} />
                  </div>
                  <span className="font-semibold text-white/90 whitespace-nowrap leading-tight" style={{ fontSize: 12 }}>
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          )
        })}

        {/* Right items */}
        {RIGHT.map(item => {
          const active = activeId === item.id
          const Icon = item.icon
          return (
            <div
              key={item.id}
              ref={el => { if (el) itemElsRef.current.set(item.id, el); else itemElsRef.current.delete(item.id) }}
              className="absolute left-0 top-0 z-10 cursor-pointer select-none"
              style={{ transform: 'translate(-9999px,0)' }}
              onPointerEnter={e => { if (e.pointerType === 'mouse') enter(item.id) }}
              onPointerLeave={e => { if (e.pointerType === 'mouse') leave() }}
              onClick={e => { e.stopPropagation(); toggle(item.id) }}
            >
              {isMob ? (
                /* Mobile: bare icon + 1-line label, no card bg */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div
                    style={{
                      width: 24, height: 24,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 7,
                      background: active
                        ? 'linear-gradient(135deg,rgba(13,158,138,0.35) 0%,rgba(6,12,16,0.92) 100%)'
                        : 'linear-gradient(135deg,rgba(13,158,138,0.18) 0%,rgba(6,12,16,0.88) 100%)',
                      border: `1px solid ${active ? 'rgba(45,212,191,0.50)' : 'rgba(45,212,191,0.25)'}`,
                      boxShadow: active ? '0 0 8px rgba(45,212,191,0.30)' : 'none',
                    }}
                  >
                    <Icon style={{
                      width: 12, height: 12,
                      color: active ? '#2dd4bf' : 'rgba(45,212,191,0.80)',
                      filter: active ? 'drop-shadow(0 0 3px rgba(45,212,191,0.7))' : 'none',
                    }} />
                  </div>
                  <span style={{
                    fontSize: 7.5, fontWeight: 600, whiteSpace: 'nowrap',
                    color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
                    lineHeight: 1,
                  }}>
                    {item.label}
                  </span>
                </div>
              ) : (
                /* Desktop: full neural-bg pill, reversed */
                <div
                  className="flex flex-row-reverse items-center rounded-xl border transition-all duration-200"
                  style={{
                    padding: '7px 10px', gap: 9,
                    backgroundImage: `linear-gradient(${active ? 'rgba(4,10,16,0.84)' : 'rgba(6,13,18,0.76)'}, ${active ? 'rgba(4,10,16,0.84)' : 'rgba(6,13,18,0.76)'}), url('/assets/element-bg/aicard.png')`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    borderColor: active ? 'rgba(45,212,191,0.45)' : 'rgba(45,212,191,0.18)',
                    boxShadow: active
                      ? '0 0 18px rgba(45,212,191,0.20), inset 0 0 0 1px rgba(45,212,191,0.08)'
                      : '0 2px 8px rgba(0,0,0,0.45)',
                    transform: active ? 'translateX(5px) rotate(0.7deg)' : 'translateX(0) rotate(0deg)',
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0 transition-all duration-200"
                    style={{
                      width: 34, height: 34,
                      background: active
                        ? 'linear-gradient(135deg,rgba(13,158,138,0.30) 0%,rgba(6,12,16,0.92) 100%)'
                        : 'linear-gradient(135deg,rgba(13,158,138,0.13) 0%,rgba(6,12,16,0.85) 100%)',
                      border: `1px solid ${active ? 'rgba(45,212,191,0.44)' : 'rgba(45,212,191,0.20)'}`,
                      boxShadow: active ? '0 0 10px rgba(45,212,191,0.24)' : 'none',
                    }}
                  >
                    <Icon style={{
                      width: 16, height: 16,
                      color: active ? '#2dd4bf' : 'rgba(45,212,191,0.72)',
                      filter: active ? 'drop-shadow(0 0 4px rgba(45,212,191,0.65))' : 'none',
                    }} />
                  </div>
                  <span className="font-semibold text-white/90 whitespace-nowrap leading-tight" style={{ fontSize: 12 }}>
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          )
        })}

        {/* Robot hub */}
        <div
          ref={coreRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ width: robotSize, height: robotSize, top: isMob ? '43%' : '50%' }}
        >
          {/* Outer ambient glow rings */}
          <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: '50%', boxShadow: '0 0 60px 20px rgba(45,212,191,0.18), 0 0 120px 40px rgba(13,158,138,0.10)' }} />

          {/* Spline robot with brand teal filter */}
          <div className="relative w-full h-full"
            style={{ filter: 'drop-shadow(0 0 18px rgba(45,212,191,0.7)) drop-shadow(0 0 48px rgba(13,158,138,0.45)) brightness(1.08) saturate(1.15)' }}>
            <SplineScene scene={SCENE} className="w-full h-full" />
            {/* Teal colour wash overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-full"
              style={{ background: 'radial-gradient(circle at 50% 40%, rgba(45,212,191,0.10) 0%, transparent 68%)', mixBlendMode: 'screen' }} />
          </div>

          {/* Floating manufacturing data chips — desktop only */}
          {!isMob && (
            <>
              <div className="absolute pointer-events-none flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ top: '12%', left: '-22%', background: 'rgba(6,12,16,0.82)', border: '1px solid rgba(45,212,191,0.22)', backdropFilter: 'blur(8px)' }}>
                <span className="text-[8px] font-semibold uppercase tracking-widest" style={{ color: '#2dd4bf' }}>BOM</span>
                <span className="text-[8px] text-white/40">99.4%</span>
              </div>
              <div className="absolute pointer-events-none flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ top: '12%', right: '-22%', background: 'rgba(6,12,16,0.82)', border: '1px solid rgba(45,212,191,0.22)', backdropFilter: 'blur(8px)' }}>
                <span className="text-[8px] font-semibold uppercase tracking-widest" style={{ color: '#2dd4bf' }}>RFQ</span>
                <span className="text-[8px] text-white/40">-40%</span>
              </div>
              <div className="absolute pointer-events-none flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ bottom: '20%', left: '-26%', background: 'rgba(6,12,16,0.82)', border: '1px solid rgba(45,212,191,0.22)', backdropFilter: 'blur(8px)' }}>
                <span className="text-[8px] font-semibold uppercase tracking-widest" style={{ color: '#2dd4bf' }}>AI</span>
                <span className="text-[8px] text-white/40">Active</span>
              </div>
              <div className="absolute pointer-events-none flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ bottom: '20%', right: '-26%', background: 'rgba(6,12,16,0.82)', border: '1px solid rgba(45,212,191,0.22)', backdropFilter: 'blur(8px)' }}>
                <span className="text-[8px] font-semibold uppercase tracking-widest" style={{ color: '#0d9e8a' }}>MFG</span>
                <span className="text-[8px] text-white/40">Live</span>
              </div>
            </>
          )}

          {/* Brand label */}
          {!isMob && (
            <div className="absolute inset-x-0 flex justify-center pointer-events-none" style={{ bottom: 8 }}>
              <span className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                style={{ color: '#2dd4bf', background: 'rgba(0,0,0,0.72)', border: '1px solid rgba(45,212,191,0.28)', backdropFilter: 'blur(6px)', letterSpacing: '0.12em' }}>
                Emithran Engine
              </span>
            </div>
          )}
        </div>

        {/* Centre description card */}
        <div
          className="absolute z-20"
          style={{
            left: '50%',
            top: isMob ? 'calc(43% + 62px)' : 'calc(50% + 136px)',
            transform: 'translateX(-50%)',
            width: isMob ? 140 : 300,
            pointerEvents: activeItem ? 'auto' : 'none',
          }}
        >
          <div
            className="text-center transition-all duration-300"
            style={{
              opacity: activeItem ? 1 : 0,
              transform: activeItem ? 'translateY(0)' : 'translateY(6px)',
              ...(isMob ? {} : {
                borderRadius: '0.75rem',
                padding: '12px 16px',
                background: 'rgba(6,12,16,0.94)',
                border: '1px solid rgba(45,212,191,0.22)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.7)',
              }),
            }}
          >
            <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#2dd4bf' }}>
              {activeItem?.label ?? ' '}
            </p>
            <p style={{ fontSize: isMob ? 9 : 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.72)' }}>
              {activeItem?.desc ?? ' '}
            </p>
          </div>
        </div>
      </div>

      <div className="pb-3 sm:pb-6" />
    </section>
  )
}

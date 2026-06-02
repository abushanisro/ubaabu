'use client'
import { useEffect, useRef, useState } from 'react'
import FlowCards from '@/components/sections/FlowCards'
import { BudgetCard } from '@/components/ui/analytics-bento'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Sparkles, TrendingUp, Zap, CheckCircle, Users, Clock, X } from 'lucide-react'

export default function WatchDemo() {
  const [savings, setSavings] = useState(0)
  const [animated, setAnimated] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true)
          const duration = 2000
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
            setSavings(parseFloat((eased * 1.2).toFixed(2)))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animated])

  const displaySavings = savings < 0.05 ? '₹0' : `₹${Math.min(savings, 1.2).toFixed(1)}Cr`

  const stats = [
    { value: '40%',    label: 'Faster RFQ',      icon: Zap },
    { value: '₹1.2Cr', label: 'Savings',         icon: TrendingUp },
    { value: '99.4%',  label: 'BOM accuracy',    icon: CheckCircle },
    { value: '80+',    label: 'Suppliers',        icon: Users },
    { value: '5K+',    label: 'Hours saved',      icon: Clock },
  ]

  return (
    <section ref={sectionRef} className="relative w-full bg-white overflow-hidden">

      {/* ── Mobile background SVG (9:16) — sets section height on mobile ── */}
      <img
        src="/assets/cards/watchdemomobiile.svg"
        alt="" aria-hidden
        className="w-full h-auto block lg:hidden"
      />

      {/* ── Desktop background SVG — sets section height on desktop ── */}
      <img
        src="/assets/cards/watchdemo.svg"
        alt="" aria-hidden
        className="w-full h-auto hidden lg:block"
      />

      {/* ══════════════════════════════════════════════
          MOBILE OVERLAY  (hidden on lg+)
      ══════════════════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 flex flex-col px-3 pt-6 pb-4" style={{ gap: 0 }}>

        {/* ── Headline + CTAs ── */}
        <div className="flex flex-col items-center text-center shrink-0 mb-2">
          <h2 className="text-[22px] font-bold tracking-tight text-[#0d1117] leading-[1.25]">
            End-to-End Supplier Intelligence<br />
            <span className="text-[#0d9e8a]">at the speed of AI</span>
          </h2>
          <p className="mt-1 text-[10px] text-[#4b5563] leading-snug">
            Sourcing, costing, BOM intelligence, and supplier evaluation — all in one platform.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <a
              href="#demo"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
            >
              Request Demo
              <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0.5 4h6" /><path d="M1 1l3 3-3 3" />
              </svg>
            </a>
            <button
              className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white/70 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold text-[#0d1117]"
              onClick={() => setVideoOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              Watch Overview
            </button>
          </div>
        </div>

        {/* ── Main video — fixed aspect ratio so features get space ── */}
        <div className="shrink-0 overflow-hidden rounded-2xl mb-2" style={{ aspectRatio: '16/9' }}>
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="/videos/hero-bg.mp4"
            thumbnailSrc="/assets/cards/videocard.svg"
            thumbnailAlt="Watch Emithran in action"
            className="h-full [&_img]:rounded-none [&_img]:border-0 [&_img]:shadow-none [&_img]:block [&_img]:w-full [&_img]:h-full [&_img]:object-cover"
          />
        </div>

        {/* ── 4 feature highlights — 2×2 grid ── */}
        <div className="grid grid-cols-2 gap-1.5 shrink-0 mb-2">
          {[
            { icon: Sparkles, title: 'Chat with Emithran AI',       desc: 'Get instant answers about sourcing, costing, and suppliers.' },
            { icon: CheckCircle, title: 'View Cost Data',            desc: 'Explore should-cost breakdowns and benchmark insights.' },
            { icon: Users,      title: 'Collaborate & Take Action', desc: 'Work with procurement and engineering teams in real time.' },
            { icon: Zap,        title: 'View & Comment on 3D Models', desc: 'Interact with CAD assemblies and manufacturing views.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-black/10 bg-white/90 backdrop-blur-sm p-2 shadow-sm flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon className="h-2.5 w-2.5 shrink-0 text-[#0d9e8a]" />
                  <span className="text-[9px] font-semibold text-[#0d1117] leading-tight">{title}</span>
                </div>
                <span className="text-[#0d9e8a] text-[10px] leading-none">›</span>
              </div>
              <p className="text-[8.5px] text-[#64748b] leading-snug">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── BudgetCard + AI Negotiation — compact 2-col ── */}
        <div className="grid grid-cols-2 gap-2 shrink-0 mb-2">
          <BudgetCard />
          <div className="rounded-xl border border-black/10 bg-white/90 backdrop-blur-sm p-2.5 shadow-lg">
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 shrink-0 text-[#0d9e8a]" />
              <div className="text-[10px] font-semibold text-[#0d1117] leading-tight">AI Negotiation</div>
            </div>
            <div className="mt-0.5 text-[9px] text-[#64748b]">Potential annual savings</div>
            <div className="mt-1 flex items-end justify-between">
              <div className="text-lg font-bold tracking-tight text-[#0d1117] tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {displaySavings}
              </div>
              <TrendingUp className="h-4 w-5 text-[#0d9e8a]" />
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="shrink-0 mt-2">
          <div className="grid grid-cols-5 gap-1">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.value} className="flex flex-col gap-0.5 px-1.5 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-black/[0.07] items-center text-center">
                  <Icon className="h-2.5 w-2.5 text-[#0d9e8a]" />
                  <span className="text-[10px] font-bold tracking-tight text-[#0d1117] leading-tight">{s.value}</span>
                  <span className="text-[8px] leading-tight text-[#64748b]">{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP OVERLAY  (hidden below lg)
      ══════════════════════════════════════════════ */}
      <div className="hidden lg:flex absolute inset-0 flex-col justify-between">

        {/* Top: flanking cards + headline + CTAs */}
        <div className="w-full px-8 pt-10">
          <div className="flex items-center gap-4 max-w-7xl mx-auto">

            <div className="w-52 shrink-0">
              <BudgetCard />
            </div>

            <div className="flex-1 flex flex-col items-center text-center">
              <h2 className="text-[2.4rem] font-bold tracking-tight text-[#0d1117] leading-[1.15] max-w-2xl">
                End-to-End Supplier Intelligence{' '}
                <span className="text-[#0d9e8a]">at the speed of AI</span>
              </h2>
              <p className="mt-3 text-[14px] text-[#4b5563]">
                Sourcing, costing, BOM intelligence, and supplier evaluation — all in one platform.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#demo"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
                >
                  Request Demo
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0.5 5.5h7" /><path d="M1.5 1.5l4 4-4 4" />
                  </svg>
                </a>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/70 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-[#0d1117] hover:bg-white/90 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                  </svg>
                  Watch Overview
                </button>
              </div>
            </div>

            <div className="w-44 shrink-0">
              <div className="rounded-xl border border-black/10 bg-white/90 backdrop-blur-sm p-3 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#0d9e8a]" />
                  <div className="text-[11px] font-semibold text-[#0d1117] leading-tight">AI Negotiation Summary</div>
                </div>
                <div className="mt-1 text-[10px] text-[#64748b]">Potential annual savings</div>
                <div className="mt-1.5 flex items-end justify-between">
                  <div className="text-2xl font-bold tracking-tight text-[#0d1117] tabular-nums transition-all duration-75" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {displaySavings}
                  </div>
                  <TrendingUp className="h-6 w-8 text-[#0d9e8a]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Middle: flow cards */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-7xl px-8">
            <FlowCards />
          </div>
        </div>

        {/* Bottom: stats row */}
        <div className="pb-12 flex justify-center">
          <div className="grid grid-cols-5 gap-2 w-full max-w-3xl px-4">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.value} className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-black/[0.07]">
                  <Icon className="h-3.5 w-3.5 text-[#0d9e8a]" />
                  <span className="text-lg font-bold tracking-tight text-[#0d1117]">{s.value}</span>
                  <span className="text-[10px] leading-snug text-[#64748b]">{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* ── Video modal ── */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video mx-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 flex items-center justify-center w-9 h-9 rounded-full bg-neutral-900/60 ring-1 ring-white/20 backdrop-blur-md text-white hover:opacity-80 transition"
              onClick={() => setVideoOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-full border-2 border-white rounded-2xl overflow-hidden">
              <video
                src="/videos/hero-bg.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

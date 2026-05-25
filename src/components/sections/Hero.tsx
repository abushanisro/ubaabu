'use client'
import { useEffect, useRef, useState } from 'react'
import { GradientRibbon } from '@/components/GradientRibbon'
import { Typewriter } from '@/components/ui/typewriter'
import { Perspective } from '@/components/ui/perspective-highlight'

const FEATURES = [
  'BOM to Supplier',
  'Should-Cost Analysis',
  'Supplier Intelligence',
  'Production Planning',
  'Quality & PPAP',
  'Delivery Tracking',
  'Cost Benchmarking',
]

function Digit({ cur, prev }: { cur: string; prev: string }) {
  const changed = cur !== prev
  return (
    <span style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', verticalAlign: 'middle', lineHeight: '1.4', height: '1.4em' }}>
      <span style={{ display: 'block', visibility: 'hidden', lineHeight: '1.4', whiteSpace: 'pre' }}>{cur}</span>
      <span style={{ display: 'block', position: 'absolute', top: 0, left: 0, right: 0, lineHeight: '1.4', textAlign: 'center', transform: changed ? 'translateY(-100%)' : 'translateY(0)', transition: changed ? 'transform 0.32s cubic-bezier(0.4,0,0.2,1)' : 'none' }}>{prev}</span>
      <span style={{ display: 'block', position: 'absolute', top: 0, left: 0, right: 0, lineHeight: '1.4', textAlign: 'center', transform: changed ? 'translateY(0)' : 'translateY(100%)', transition: changed ? 'transform 0.32s cubic-bezier(0.4,0,0.2,1)' : 'none' }}>{cur}</span>
    </span>
  )
}

function LiveSavings() {
  const BASE = 1.0
  const RATE = 0.1
  const [value, setValue] = useState(0)
  const [prevValue, setPrevValue] = useState(0)
  useEffect(() => {
    setValue(BASE)
    setPrevValue(BASE)
    const id = setInterval(() => {
      setValue((v) => { setPrevValue(v); return +(v + RATE).toFixed(1) })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  const fmt = (n: number) => n.toFixed(1)
  const cur = fmt(value); const prev = fmt(prevValue)
  const maxLen = Math.max(cur.length, prev.length)
  const c = cur.padStart(maxLen, ' '); const p = prev.padStart(maxLen, ' ')
  return (
    <div className="mb-6 flex items-center gap-1.5 text-sm text-black/40">
      <span>Live cost savings identified:</span>
      <span className="font-medium text-black/65" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }} aria-live="polite" aria-atomic="true">
        <span>$</span>{c.split('').map((ch, i) => <Digit key={i} cur={ch} prev={p[i] ?? ch} />)}
      </span>
    </div>
  )
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => setPlaying(true)

  return (
    <section className="relative bg-white">
      {/* ribbon + overlay clipped independently so floating cards aren't cut */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <GradientRibbon className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #ffffff 28%, rgba(255,255,255,0.75) 46%, rgba(255,255,255,0.15) 65%, transparent 80%)' }} />
      </div>

      <style>{`
        .hds-btn-primary { display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185)); color:#fff; border:none; border-radius:6px; padding:10px 20px; font-size:14px; font-weight:600; cursor:pointer; text-decoration:none; transition:opacity 0.2s; }
        .hds-btn-primary:hover { opacity:0.85; }
        .hds-btn-primary .arrow-line { transition:transform 0.2s ease; }
        .hds-btn-primary:hover .arrow-line { transform:translateX(2px); }
        .hds-btn-secondary { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#425466; border:1px solid rgba(0,0,0,0.15); border-radius:6px; padding:10px 20px; font-size:14px; font-weight:500; cursor:pointer; text-decoration:none; transition:background 0.2s, border-color 0.2s, color 0.2s; }
        .hds-btn-secondary:hover { background:oklch(0.95 0.04 180); border-color:oklch(0.68 0.13 180); color:oklch(0.45 0.14 185); }
      `}</style>

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-6 pt-24 pb-10 lg:grid-cols-2 lg:gap-10 lg:pt-28 lg:pb-12">

        {/* ── LEFT: copy ── */}
        <div className="w-full max-w-[560px]">
          <LiveSavings />
          <h1 className="text-[32px] font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-[40px] lg:text-[50px]">
            End-to-End Manufacturing Intelligence
          </h1>
          <p className="mt-3 text-[17px] font-semibold md:text-[19px]" style={{ minHeight: '1.6em' }}>
            <span className="text-black/45">AI for </span>
            <Typewriter
              text={FEATURES}
              speed={55}
              deleteSpeed={35}
              waitTime={1800}
              cursorChar="_"
              cursorClassName="ml-0.5"
              className="text-black/70"
            />
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#555]">
            Manage sourcing, costing, planning, quality, benchmarking, and delivery
            at the speed of AI — using connected manufacturing and supplier data.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#demo" className="hds-btn-primary">
              Get started
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
                <path className="arrow-line" d="M0.5 5.5h7" />
                <path className="arrow-line" d="M1.5 1.5l4 4-4 4" />
              </svg>
            </a>
            <button onClick={handlePlay} className="hds-btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#425466" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="#425466" stroke="none" />
              </svg>
              Watch Overview
            </button>
          </div>
        </div>

        {/* ── RIGHT: product mockup + floating panels ── */}
        <div className="relative w-full pb-4 pt-6 lg:pb-20 lg:pt-12">

          {/* ── VAVE Analysis card — top-right ── */}
          <Perspective
            maxRotateX={10} maxRotateY={18} smoothing={0.1}
            className="absolute -top-2 -right-2 z-20 hidden w-56 lg:block lg:-right-6"
            cardClassName="overflow-hidden rounded-xl border border-white/12 shadow-2xl"
            cardStyle={{ background: 'linear-gradient(145deg, #2a2a2a 0%, #141414 50%, #080808 100%)' }}
          >
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2">
              <span className="text-xs font-semibold text-white">VAVE Analysis</span>
              <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300">IDEAS</span>
            </div>

            {/* savings summary */}
            <div className="flex items-center justify-between border-b border-white/6 px-4 py-2">
              <div>
                <p className="text-[10px] text-white/35">Potential Saving</p>
                <p className="text-sm font-bold text-teal-400">$268</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/35">Function Risk</p>
                <p className="text-sm font-bold text-amber-300">Low</p>
              </div>
            </div>

            {/* idea rows */}
            <div className="divide-y divide-white/4 px-4">
              {[
                { idea: 'Consolidate seal + piston', save: '$74', type: 'VA', color: 'text-blue-300',   bg: 'bg-blue-500/12'   },
                { idea: 'Standard thread pitch',     save: '$46', type: 'VE', color: 'text-violet-300', bg: 'bg-violet-500/12' },
                { idea: 'Reduce wall by 0.4 mm',     save: '$61', type: 'VA', color: 'text-blue-300',   bg: 'bg-blue-500/12'   },
                { idea: 'Alt Al-6061 alloy grade',   save: '$87', type: 'VE', color: 'text-violet-300', bg: 'bg-violet-500/12' },
              ].map((r) => (
                <div key={r.idea} className="flex items-center gap-2 py-2">
                  <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${r.bg} ${r.color}`}>{r.type}</span>
                  <p className="flex-1 text-[11px] leading-snug text-white/55">{r.idea}</p>
                  <span className="shrink-0 text-[11px] font-semibold text-teal-400">{r.save}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2">
              <span className="text-[10px] text-white/30">TVC-12 · Rev 2</span>
              <span className="text-[10px] font-medium text-teal-400">↓ 18% cost</span>
            </div>
          </Perspective>

          {/* Main product card — 3d-drawing.png thumbnail with play overlay */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.22)]">
            <img
              src="/assets/hero-page/3d-drawing.png"
              alt="Emithran platform preview"
              className="block w-full object-cover"
              style={{ aspectRatio: '16/10' }}
            />
            {/* dark tint so play button pops */}
            <div className="absolute inset-0" style={{ background: 'rgba(6,14,26,0.38)' }} />

            {/* Play button — always on top */}
            <button
              onClick={handlePlay}
              className="absolute inset-0 z-10 flex items-center justify-center transition-all"
              aria-label="Play demo video"
            >
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.78 0.13 175), oklch(0.55 0.16 185))',
                  boxShadow: '0 8px 40px oklch(0.68 0.13 180 / 0.6)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </span>
            </button>

            {/* Live Signal bar — bottom of product card */}
            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3" style={{ background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.0) 100%)' }}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Live Signal</span>
                </span>
                <span className="text-[10px] font-medium text-teal-400">AI Agent</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-white/40">
                <span>Production · Batch A-2410</span>
                <span className="text-white/60">120 Hz</span>
                <span className="font-medium text-white/80">99.4% OTI</span>
              </div>
            </div>
          </div>

          {/* ── Live Signal wave card — bottom-right ── */}
          <Perspective
            maxRotateX={10} maxRotateY={18} smoothing={0.1}
            className="absolute -bottom-4 -right-2 z-20 w-56 lg:-right-6 lg:bottom-6 hidden lg:block"
            cardClassName="overflow-hidden rounded-xl border border-white/10 shadow-2xl"
            cardStyle={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)' }}
          >
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <span className="text-sm font-semibold text-white">Live Signal</span>
              <span className="text-[11px] font-medium text-teal-400">AI Agent</span>
            </div>
            <div className="px-4 pt-3 pb-1">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">Production · Batch A-2410</p>
              <style>{`
                @keyframes hwdrift1{0%,100%{transform:translateX(0)}50%{transform:translateX(-4px)}}
                @keyframes hwdrift2{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
                @keyframes hwbar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.35)}}
                .hws1{animation:hwdrift1 3s ease-in-out infinite}
                .hws2{animation:hwdrift2 4.5s ease-in-out infinite}
              `}</style>
              <svg viewBox="0 0 210 40" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ height: 40, overflow: 'visible' }}>
                <path className="hws2" d="M0,20 C26,8 50,32 76,20 C102,8 126,32 152,20 C178,8 196,32 210,20" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="2" />
                <path className="hws1" d="M0,20 C22,5 46,35 70,20 C94,5 118,35 142,20 C166,5 190,35 210,20" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                <circle r="3" fill="#60a5fa" opacity="0.9">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M0,20 C22,5 46,35 70,20 C94,5 118,35 142,20 C166,5 190,35 210,20" />
                </circle>
              </svg>
            </div>
            <div className="flex items-end gap-[3px] px-4 pb-3" style={{ height: 34 }}>
              {[0.5,0.8,0.4,1,0.6,0.9,0.3,0.7,0.5,1,0.4,0.8,0.6,0.9,0.3,0.7,0.5,0.8,1,0.4].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 24}px`, background: `rgba(59,130,246,${0.3 + h * 0.5})`, animation: `hwbar ${1.2 + (i % 5) * 0.3}s ease-in-out ${i * 0.08}s infinite`, transformOrigin: 'bottom' }} />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2">
              <span className="text-[10px] text-white/30">120 Hz</span>
              <span className="text-[10px] font-medium text-blue-300">99.4% OTIF</span>
            </div>
          </Perspective>

        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }} />

      {/* ── Full-screen video modal ── */}
      {playing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setPlaying(false)}
        >
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-5 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close video"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className="relative w-full max-w-7xl mx-6 overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src="/videos/emithran.mp4"
              poster="/assets/hero-page/3d-drawing.png"
              controls
              autoPlay
              className="w-full"
              onEnded={() => setPlaying(false)}
            />
          </div>
        </div>
      )}
    </section>
  )
}

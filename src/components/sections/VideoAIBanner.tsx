'use client'

import { useState } from 'react'
import { Play, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

const suppliers = [
  { name: 'Precision Works Ltd',   country: 'IN', cost: 92, quality: 96, otif: 98, risk: 'Low',    score: 95, status: 'preferred' },
  { name: 'Atlas Machining Co.',   country: 'DE', cost: 78, quality: 99, otif: 94, risk: 'Low',    score: 91, status: 'approved'  },
  { name: 'Horizon Forge',         country: 'CN', cost: 97, quality: 81, otif: 88, risk: 'Medium', score: 74, status: 'review'    },
  { name: 'Delta Components',      country: 'IN', cost: 85, quality: 88, otif: 91, risk: 'Low',    score: 88, status: 'approved'  },
]

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
  preferred: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', label: 'Preferred' },
  approved:  { bg: 'bg-blue-500/15',    text: 'text-blue-300',    label: 'Approved'  },
  review:    { bg: 'bg-amber-500/15',   text: 'text-amber-300',   label: 'Review'    },
}

export default function SupplierIntelligenceBanner() {
  const [played, setPlayed] = useState(false)

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: 'linear-gradient(135deg, #05111e 0%, #071a2e 45%, #0b2340 75%, #072030 100%)' }}
    >
      {/* grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle,#0e4f7c 0%,transparent 70%)' }} />

      {/* ── two-column layout ── */}
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">

        {/* LEFT: copy */}
        <div>
          <p className="chip mb-5">Supplier Intelligence</p>
          <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[52px]">
            Find the right supplier,<br />every time.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/55 md:text-lg">
            AI-powered vendor scoring across cost, quality, lead time, and risk — so your sourcing team nominates with confidence, not guesswork.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              'Live quote benchmarking against your should-cost model',
              'Supplier risk flags from delivery history and financial signals',
              'One-click PPAP & audit document requests',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#05111e] transition hover:bg-white/90">
              Request a Demo →
            </a>
            <button
              onClick={() => setPlayed(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/8"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/40">
                <Play size={9} className="fill-white translate-x-px" />
              </span>
              Watch Overview
            </button>
          </div>
        </div>

        {/* RIGHT: product mockup + floating panels */}
        <div className="relative mt-8 pb-16 pt-10 lg:mt-0 lg:pb-20 lg:pt-12">

          {/* ── Supplier Score card — top-right ── */}
          <div
            className="absolute -top-2 -right-2 z-20 hidden w-52 overflow-hidden rounded-xl border border-white/12 shadow-2xl lg:block lg:-right-6"
            style={{ background: 'rgba(13,27,42,0.96)', backdropFilter: 'blur(16px)' }}
          >
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <span className="text-xs font-semibold text-white">Top Vendor</span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Score 95
              </span>
            </div>
            <div className="space-y-1.5 px-4 py-3">
              {[
                { label: 'Cost Competitiveness', value: '92%',  color: '#3b82f6' },
                { label: 'Quality Rating',        value: '96%',  color: '#10b981' },
                { label: 'On-Time Delivery',      value: '98%',  color: '#10b981' },
                { label: 'Risk Rating',           value: 'Low',  color: '#10b981' },
                { label: 'Lead Time',             value: '4 wks',color: '#60a5fa' },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between text-[11px]">
                  <span className="text-white/45">{m.label}</span>
                  <span className="font-semibold" style={{ color: m.color }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Product mockup card ── */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.6)]" style={{ background: '#091525' }}>
            {/* window chrome */}
            <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#060f1b] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
              <span className="ml-3 text-xs text-white/30">Emithran — TVC-12 Actuator · Supplier Evaluation</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                4 Vendors
              </span>
            </div>

            {/* dashboard */}
            <div className="flex min-h-[320px] md:min-h-[380px]">
              {/* sidebar */}
              <div className="hidden w-36 shrink-0 border-r border-white/6 p-3 sm:block" style={{ background: '#060f1b' }}>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">Projects</p>
                {['TVC-12 Actuator','Valve Assembly','Bracket Set','Seal Kit'].map((item, i) => (
                  <div key={item} className={`mb-0.5 rounded px-2 py-1.5 text-[11px] ${i === 0 ? 'bg-blue-500/18 text-blue-200 font-medium' : 'text-white/35'}`}>{item}</div>
                ))}
                <div className="mt-3 border-t border-white/6 pt-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">Views</p>
                  {['Scoreboard','Quote Compare','Risk Map','PPAP Tracker'].map((item, i) => (
                    <div key={item} className={`mb-0.5 rounded px-2 py-1.5 text-[11px] ${i === 0 ? 'bg-amber-500/15 text-amber-300 font-medium' : 'text-white/30'}`}>{item}</div>
                  ))}
                </div>
              </div>

              {/* main pane — supplier table */}
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between border-b border-white/6 px-4 py-3">
                  <p className="text-xs font-semibold text-white/60">Supplier Scoreboard — Actuator Body</p>
                  <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-medium text-blue-300">AI Ranked</span>
                </div>

                {/* column headers */}
                <div className="grid grid-cols-5 gap-2 border-b border-white/4 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/25">
                  <span className="col-span-2">Supplier</span>
                  <span className="text-center">Quality</span>
                  <span className="text-center">OTIF</span>
                  <span className="text-center">Score</span>
                </div>

                <div className="flex flex-col divide-y divide-white/4 px-4">
                  {suppliers.map((s) => {
                    const st = statusStyle[s.status]
                    return (
                      <div key={s.name} className="grid grid-cols-5 items-center gap-2 py-2.5">
                        <div className="col-span-2 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="shrink-0 rounded bg-white/8 px-1 py-0.5 text-[9px] font-bold text-white/50">{s.country}</span>
                            <p className="truncate text-[11px] font-medium text-white/80">{s.name}</p>
                          </div>
                          <span className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold ${st.bg} ${st.text}`}>{st.label}</span>
                        </div>
                        <div className="text-center">
                          <p className="text-[11px] font-semibold text-white/70">{s.quality}%</p>
                          <div className="mx-auto mt-0.5 h-1 w-8 overflow-hidden rounded-full bg-white/8">
                            <div className="h-1 rounded-full bg-emerald-400" style={{ width: `${s.quality}%` }} />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-[11px] font-semibold text-white/70">{s.otif}%</p>
                          <div className="mx-auto mt-0.5 h-1 w-8 overflow-hidden rounded-full bg-white/8">
                            <div className="h-1 rounded-full bg-blue-400" style={{ width: `${s.otif}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold"
                            style={{
                              background: s.score >= 90 ? 'rgba(16,185,129,0.15)' : s.score >= 80 ? 'rgba(59,130,246,0.15)' : 'rgba(245,158,11,0.15)',
                              color: s.score >= 90 ? '#34d399' : s.score >= 80 ? '#60a5fa' : '#fbbf24',
                            }}
                          >
                            {s.score}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* summary row */}
                <div className="mt-auto border-t border-white/6 px-4 py-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-white/5 p-2">
                      <p className="text-[10px] text-white/35">Avg Quote Gap</p>
                      <p className="mt-0.5 text-sm font-bold text-amber-300">−9.2%</p>
                    </div>
                    <div className="rounded-lg bg-emerald-500/8 p-2">
                      <p className="text-[10px] text-emerald-400/60">Best OTIF</p>
                      <p className="mt-0.5 text-sm font-bold text-emerald-300">98%</p>
                    </div>
                    <div className="rounded-lg bg-blue-500/8 p-2">
                      <p className="text-[10px] text-blue-400/60">Nominated</p>
                      <p className="mt-0.5 text-sm font-bold text-blue-300">1 of 4</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* play overlay */}
            {!played && (
              <button
                onClick={() => setPlayed(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition hover:bg-black/5"
                style={{ background: 'rgba(5,17,30,0.50)' }}
                aria-label="Play supplier intelligence overview"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-transform hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#050e1b">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
                  See Supplier Intelligence — 2 min
                </span>
              </button>
            )}
          </div>

          {/* ── Delivery Trend wave card — bottom-right ── */}
          <div className="absolute -bottom-4 -right-2 z-20 w-56 overflow-hidden rounded-xl border border-white/10 shadow-2xl lg:-right-6 lg:bottom-6" style={{ background: '#0d1b2a' }}>
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <span className="text-sm font-semibold text-white">OTIF Trend</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-emerald-300">↑ 2.1%</span>
              </div>
            </div>
            <div className="px-4 pt-3 pb-1">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">Last 6 months</p>
              <style>{`
                @keyframes sivdrift1{0%,100%{transform:translateX(0)}50%{transform:translateX(-4px)}}
                @keyframes sivdrift2{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
                @keyframes sivbar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.35)}}
                .siv1{animation:sivdrift1 3s ease-in-out infinite}
                .siv2{animation:sivdrift2 4.5s ease-in-out infinite}
              `}</style>
              <svg viewBox="0 0 210 40" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ height: 40, overflow: 'visible' }}>
                <path className="siv2" d="M0,28 C35,18 70,32 105,22 C140,12 175,26 210,18" fill="none" stroke="rgba(52,211,153,0.2)" strokeWidth="2" />
                <path className="siv1" d="M0,30 C35,22 70,34 105,24 C140,14 175,24 210,14" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
                <circle r="3" fill="#6ee7b7" opacity="0.9">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M0,30 C35,22 70,34 105,24 C140,14 175,24 210,14" />
                </circle>
              </svg>
            </div>
            <div className="flex items-end gap-[3px] px-4 pb-3" style={{ height: 34 }}>
              {[0.7,0.75,0.8,0.72,0.85,0.9,0.82,0.88,0.92,0.86,0.94,0.9,0.96,0.91,0.98,0.93,0.97,0.95,1,0.98].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 24}px`, background: `rgba(52,211,153,${0.25 + h * 0.45})`, animation: `sivbar ${1.2 + (i % 5) * 0.3}s ease-in-out ${i * 0.08}s infinite`, transformOrigin: 'bottom' }} />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2">
              <span className="text-[10px] text-white/30">Avg 93.2%</span>
              <span className="text-[10px] font-medium text-emerald-300">98% peak</span>
            </div>
          </div>

          {/* ── Emithran AI panel — bottom-left ── */}
          <div className="absolute -bottom-4 -left-2 z-20 w-72 overflow-hidden rounded-xl border border-white/10 shadow-2xl lg:-left-6 lg:bottom-6" style={{ background: '#0d1b2a' }}>
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <span className="text-sm font-semibold text-white">Emithran AI</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-emerald-300">Nomination Ready</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 border-b border-white/8 px-4 py-2.5">
              {[['Best Score','95 / 100','text-emerald-300'],['Quote Gap','−9.2%','text-blue-300'],['Risk','Low','text-emerald-300']].map(([k,v,c]) => (
                <div key={k} className="rounded bg-white/6 px-2 py-1 text-[10px]">
                  <span className="text-white/40">{k} </span>
                  <span className={`font-semibold ${c}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/35">Recommendations</p>
              <ul className="space-y-2 text-[12px] leading-relaxed text-white/60">
                <li><span className="font-semibold text-white">Nominate Precision Works Ltd</span> — highest composite score with the best OTIF and lowest risk profile.</li>
                <li><span className="font-semibold text-white">Request revised quote from Atlas</span> — quality score is superior; a 5% cost reduction closes the gap.</li>
              </ul>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2">
                <input type="text" placeholder="Ask anything..." className="flex-1 bg-transparent text-[12px] text-white/50 placeholder:text-white/25 outline-none" readOnly />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── animated wave divider ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0]" aria-hidden>
        <style>{`
          @keyframes wv1{0%,100%{transform:translateX(0)}50%{transform:translateX(-3%)}}
          @keyframes wv2{0%,100%{transform:translateX(0)}50%{transform:translateX(3%)}}
          @keyframes wv3{0%,100%{transform:translateX(0)}50%{transform:translateX(-2%)}}
          .wv1{animation:wv1 9s ease-in-out infinite}
          .wv2{animation:wv2 12s ease-in-out infinite}
          .wv3{animation:wv3 7s ease-in-out infinite}
        `}</style>
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path className="wv1" d="M0,40 C240,90 480,0 720,50 C960,100 1200,10 1440,55 L1440,100 L0,100 Z" fill="rgba(255,255,255,0.04)" />
          <path className="wv2" d="M0,60 C200,20 500,80 760,45 C1020,10 1250,70 1440,40 L1440,100 L0,100 Z" fill="rgba(255,255,255,0.06)" />
          <path className="wv3" d="M0,75 C300,45 600,95 900,65 C1100,45 1300,85 1440,70 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

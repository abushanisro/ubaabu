'use client'
import { useEffect, useState } from 'react'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Typewriter } from '@/components/ui/typewriter'

const CAPABILITIES = ['BOM Intelligence', 'Should-Cost', 'Supplier Radar', 'Quality & PPAP']

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
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative bg-white" style={{ minHeight: '100svh' }}>
      {/* hero background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src="/assets/cards/projectcardmobile.svg" alt="" className="absolute inset-0 h-full w-full object-cover object-center translate-y-20 lg:hidden" />
        <img src="/assets/cards/projectcard.svg" alt="" className="absolute inset-0 h-full w-full object-cover object-center hidden lg:block lg:translate-y-20" />
      </div>

      <style>{`
        .hds-btn-primary { display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185)); color:#fff; border:none; border-radius:6px; padding:10px 20px; font-size:14px; font-weight:600; cursor:pointer; text-decoration:none; transition:opacity 0.2s; }
        .hds-btn-primary:hover { opacity:0.85; }
        .hds-btn-primary .arrow-line { transition:transform 0.2s ease; }
        .hds-btn-primary:hover .arrow-line { transform:translateX(2px); }
        .hds-btn-secondary { display:inline-flex; align-items:center; gap:8px; background:transparent; color:oklch(0.55 0.14 182); border:1.5px solid oklch(0.68 0.13 180); border-radius:6px; padding:10px 20px; font-size:14px; font-weight:600; cursor:pointer; text-decoration:none; transition:background 0.2s, color 0.2s; }
        .hds-btn-secondary:hover { background:oklch(0.96 0.04 180); color:oklch(0.45 0.14 185); }
      `}</style>

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-6 pt-20 pb-8 lg:grid-cols-2 lg:gap-10 lg:pt-28 lg:pb-12">

        {/* ── LEFT: copy ── */}
        <div className="w-full max-w-[560px]">
          <LiveSavings />
          <h1 className="text-[32px] font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-[40px] lg:text-[50px]">
            End-to-End{' '}
            <span className="text-[#0d9e8a]">Manufacturing</span>{' '}
            Intelligence
          </h1>
          <p className="mt-3 text-[17px] font-semibold md:text-[19px]" style={{ minHeight: '1.6em' }}>
            <span className="text-black/45">AI for </span>
            <Typewriter
              text={CAPABILITIES}
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
            <button onClick={() => setVideoOpen(true)} className="hds-btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.55 0.14 182)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="oklch(0.55 0.14 182)" stroke="none" />
              </svg>
              Watch Overview
            </button>
          </div>
        </div>

        {/* ── RIGHT: product mockup + floating panels ── */}
        <div className="relative w-full pb-4 pt-4 lg:pb-20 lg:pt-12">


          {/* Main product card — HeroVideoDialog */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.22)]">
            <HeroVideoDialog
              animationStyle="from-center"
              videoSrc="/videos/emithran.mp4"
              thumbnailSrc="/assets/hero-page/3d-drawing.png"
              thumbnailAlt="Emithran platform preview"
              isOpen={videoOpen}
              onOpenChange={setVideoOpen}
              className="[&_img]:rounded-none [&_img]:border-0 [&_img]:shadow-none"
            />

          </div>


        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10" style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }} />

      {/* ── Partner logos — fills the bottom gap ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-b border-black/[0.06] bg-white/80 backdrop-blur-sm py-5">
        <style>{`
          @keyframes marquee-p { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          .marquee-p { animation: marquee-p 32s linear infinite; will-change: transform; }
        `}</style>
        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 24px, black 80px, black calc(100% - 80px), transparent calc(100% - 24px))',
            WebkitMaskImage: 'linear-gradient(to right, transparent 24px, black 80px, black calc(100% - 80px), transparent calc(100% - 24px))',
          }}
        >
          {(() => {
            const logos = [
              { src: '/assets/trustedby/ashokleyland.png', alt: 'Ashok Leyland' },
              { src: '/assets/trustedby/TATAPower.png',    alt: 'TATA Power' },
              { src: '/assets/trustedby/digantara.png',    alt: 'Digantara' },
              { src: '/assets/trustedby/Pixxel.png',       alt: 'Pixxel' },
              { src: '/assets/trustedby/RolandBerger.png', alt: 'Roland Berger' },
              { src: '/assets/trustedby/rainmaker.png',    alt: 'Rainmaker' },
              { src: '/assets/trustedby/ForusHealth.png',  alt: 'Forus Health' },
              { src: '/assets/trustedby/Aadya.png',        alt: 'Aadya' },
              { src: '/assets/trustedby/Tanbo.png',        alt: 'Tanbo' },
              { src: '/assets/trustedby/emuski.png',       alt: 'Emuski' },
            ]
            const row = [...logos, ...logos]
            return (
              <div className="marquee-p flex w-max items-center gap-10 md:gap-14">
                {row.map((logo, i) => (
                  <img key={i} src={logo.src} alt={logo.alt} className="h-6 w-auto object-contain opacity-70" />
                ))}
              </div>
            )
          })()}
        </div>
      </div>

    </section>
  )
}

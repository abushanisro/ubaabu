import React from 'react'
import { ArrowRight } from 'lucide-react'

const iconVars = {
  '--blendBackground': '#2dd4bf',
  '--blendForeground': '#0f1b2d',
  '--blendIntersection': '#0d9488',
} as React.CSSProperties

function BuildingsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 39 40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <clipPath id="BuildingsIconClipPath">
          <path d="M37 0a2 2 0 012 2v36a2 2 0 01-2 2h-3v-8a1 1 0 00-1-1h-3a1 1 0 00-1 1v8H18a2 2 0 01-2-2V2a2 2 0 012-2h19zM25 20h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm8 0h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm0-8h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm-8 0h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm0-8h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1zm8 0h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1z" fill="var(--blendBackground)" />
        </clipPath>
      </defs>
      <path d="M37 0a2 2 0 012 2v36a2 2 0 01-2 2h-3v-8a1 1 0 00-1-1h-3a1 1 0 00-1 1v8H18a2 2 0 01-2-2V2a2 2 0 012-2h19zM25 20h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm8 0h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm0-8h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm-8 0h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm0-8h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1zm8 0h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1z" fill="var(--blendBackground)" />
      <path d="M22.954 12.057a2 2 0 01.046.424V38a2 2 0 01-2 2H2a2 2 0 01-2-2V16.612a2 2 0 011.575-1.954l19-4.13a2 2 0 012.38 1.529zM17 28h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm-8 0H6a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm0-8H6a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm8 0h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1z" fill="var(--blendForeground)" />
      <g clipPath="url(#BuildingsIconClipPath)">
        <path d="M22.954 12.057a2 2 0 01.046.424V38a2 2 0 01-2 2H2a2 2 0 01-2-2V16.612a2 2 0 011.575-1.954l19-4.13a2 2 0 012.38 1.529zM17 28h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm-8 0H6a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm0-8H6a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1zm8 0h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1z" fill="var(--blendIntersection)" />
      </g>
    </svg>
  )
}

function DocumentsIcon() {
  return (
    <svg width="24" height="28" viewBox="0 0 34 40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <clipPath id="documentsIconClipPath">
          <rect width="26" height="34" rx="2" fill="var(--blendBackground)" />
        </clipPath>
      </defs>
      <rect width="26" height="34" rx="2" fill="var(--blendBackground)" />
      <path d="M30 6a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h18zm0 28H12v2h18v-2zm0-5h-4v2h4v-2zm-6 0H12v2h12v-2zm6-5H12v2h18v-2zm0-5H12v2h18v-2zm0-9h-6v2h6v-2zm-10 0h-8v2h8v-2z" fill="var(--blendForeground)" />
      <g clipPath="url(#documentsIconClipPath)">
        <path d="M30 6a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h18zm0 28H12v2h18v-2zm0-5h-4v2h4v-2zm-6 0H12v2h12v-2zm6-5H12v2h18v-2zm0-5H12v2h18v-2zm0-9h-6v2h6v-2zm-10 0h-8v2h8v-2z" fill="var(--blendIntersection)" />
      </g>
    </svg>
  )
}

export default function PricingCTA() {
  return (
    <section id="final-cta" className="pricing-section bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3 md:gap-10 md:py-20">

        {/* Col 1 — headline + CTAs */}
        <div className="cta-fade-up">
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f1b2d] md:text-[40px] md:leading-[1.1]">
            Ready to get started? Book a demo or request a custom quote.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#0f1b2d]/60">
            Access outcome-based packages with transparent, ROI-driven pricing, or talk to our team to design a custom rollout tailored to your manufacturing operations.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="/request-demo"
              className="cta-pill group inline-flex items-center gap-2 rounded-full bg-[#2dd4bf] px-5 py-2.5 text-sm font-medium text-[#0f1b2d] shadow-[0_10px_30px_-12px_color-mix(in_oklab,#2dd4bf_60%,transparent)] transition-all hover:-translate-y-px hover:shadow-[0_14px_34px_-12px_color-mix(in_oklab,#2dd4bf_70%,transparent)]"
            >
              Book a demo
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href="/contact?source=pricing&cta=contact-sales"
              className="cta-link group inline-flex items-center gap-1.5 text-sm font-medium text-[#0d9488] transition-colors hover:text-[#0f1b2d]"
            >
              Contact sales
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>

        {/* Col 2 — See our customers */}
        <div className="cta-fade-up group relative" style={{ animationDelay: '0.1s' }}>
          <span aria-hidden className="absolute left-0 top-[2.35rem] h-4 w-[3px] rounded-full bg-[#2dd4bf] transition-all duration-300 group-hover:h-6 group-hover:bg-[#0d9488]" />
          <div className="pl-5">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-lg border border-border/70 bg-[#f3f7f9] transition-transform duration-300 group-hover:-translate-y-0.5" style={iconVars}>
              <BuildingsIcon />
            </div>
            <h3 className="text-[15px] font-semibold tracking-tight text-[#0f1b2d]">See our customers</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#0f1b2d]/60">
              From mid-market manufacturers to global OEMs, explore how leading teams use Emithran to cut design costs and accelerate sourcing.
            </p>
          </div>
        </div>

        {/* Col 3 — Explore the platform */}
        <div className="cta-fade-up group relative" style={{ animationDelay: '0.2s' }}>
          <span aria-hidden className="absolute left-0 top-[2.35rem] h-4 w-[3px] rounded-full bg-[#2dd4bf] transition-all duration-300 group-hover:h-6 group-hover:bg-[#0d9488]" />
          <div className="pl-5">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-lg border border-border/70 bg-[#f3f7f9] transition-transform duration-300 group-hover:-translate-y-0.5" style={iconVars}>
              <DocumentsIcon />
            </div>
            <h3 className="text-[15px] font-semibold tracking-tight text-[#0f1b2d]">Explore the platform</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#0f1b2d]/60">
              See the modules behind Emithran — design intelligence, supplier sourcing, and end-to-end supply chain visibility in one workspace.
            </p>
          </div>
        </div>

      </div>

    </section>
  )
}

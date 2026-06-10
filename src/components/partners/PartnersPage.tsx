'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

/* ── Partner Ecosystem Nav ────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Work with a partner', href: '/about/partners',                     active: true  },
  { label: 'Become a partner',    href: '/about/partners/become-a-partner',    active: false },
  { label: 'Vendor onboarding',   href: '/about/partners/vendor-onboarding',   active: false },
] as const

function PartnerEcosystemNav() {
  return (
    <div className="sticky top-[64px] z-40 border-b bg-white/95 backdrop-blur-md" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 md:px-12 py-0">

        {/* Title */}
        <span className="hidden sm:block shrink-0 text-[13px] font-semibold tracking-tight py-3 border-r pr-6" style={{ color: '#0f1b2d', borderColor: 'rgba(0,0,0,0.08)' }}>
          Partner Ecosystem
        </span>

        {/* Links */}
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide ml-auto">
          {NAV_LINKS.map(({ label, href, active, ...rest }) => (
            <Link
              key={label}
              href={href}
              {...('external' in rest && rest.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="relative whitespace-nowrap px-3 py-3.5 text-[13px] font-medium transition-colors"
              style={{ color: active ? '#0d9488' : 'rgba(15,27,45,0.5)' }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#0f1b2d' }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(15,27,45,0.5)' }}
            >
              {label}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full"
                  style={{ background: '#0d9488' }}
                />
              )}
            </Link>
          ))}
        </nav>

      </div>
    </div>
  )
}

/* ── Hero partner type cards ──────────────────────────────────────── */

const HERO_PARTNER_CARDS = [
  {
    title: 'System Integrators',
    tagline: 'ERP & MES implementation',
    delay: '0s',
    icon: (
      <svg viewBox="0 0 42 36" width="26" height="22" fill="none">
        <rect x="6" y="2" width="30" height="8" rx="2" fill="#0d9488"/>
        <rect x="6" y="13" width="30" height="8" rx="2" fill="#0d9488"/>
        <rect x="6" y="24" width="30" height="8" rx="2" fill="#0d9488"/>
        <rect x="29" y="5" width="4" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
        <rect x="29" y="16" width="4" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
        <rect x="29" y="27" width="4" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),
  },
  {
    title: 'Technology Partners',
    tagline: 'API & platform connectors',
    delay: '0.7s',
    icon: (
      <svg viewBox="0 0 40 32" width="26" height="22" fill="none">
        <rect x="4" y="1" width="32" height="26" rx="3" fill="#0d9488"/>
        <rect x="4" y="9" width="32" height="1.5" fill="rgba(255,255,255,0.12)"/>
        <circle cx="10" cy="5" r="2" fill="rgba(255,255,255,0.45)"/>
        <circle cx="16" cy="5" r="2" fill="rgba(255,255,255,0.3)"/>
        <circle cx="22" cy="5" r="2" fill="rgba(255,255,255,0.2)"/>
        <rect x="9" y="13" width="12" height="2" rx="1" fill="rgba(255,255,255,0.55)"/>
        <rect x="9" y="18" width="18" height="2" rx="1" fill="rgba(255,255,255,0.35)"/>
      </svg>
    ),
  },
  {
    title: 'Industry Consultants',
    tagline: 'Domain cost advisory',
    delay: '1.4s',
    icon: (
      <svg viewBox="0 0 40 42" width="26" height="28" fill="none">
        <rect x="5" y="14" width="6" height="24" rx="2" fill="#0d9488"/>
        <rect x="14" y="6" width="6" height="32" rx="2" fill="#0d9488"/>
        <rect x="23" y="1" width="6" height="37" rx="2" fill="#0d9488"/>
        <rect x="32" y="9" width="6" height="29" rx="2" fill="#0d9488"/>
        <rect x="4" y="39" width="34" height="2" rx="1" fill="#0d9488"/>
      </svg>
    ),
  },
  {
    title: 'Resellers & Distributors',
    tagline: 'Regional GTM expertise',
    delay: '2.1s',
    icon: (
      <svg viewBox="0 0 40 40" width="26" height="26" fill="none">
        <path d="M20 2a18 18 0 1 1 0 36A18 18 0 0 1 20 2zm0 2c-1.9 0-4.5 4-5.6 10h11.2c-1.1-6-3.7-10-5.6-10zm-8.7 10H5.6a16 16 0 0 0 0 12H11.3a38 38 0 0 1 0-12zm17.4 0H23a38 38 0 0 1 0 12h5.7a16 16 0 0 0 0-12zM14.7 28c1.2 5.4 3.6 9 5.3 9 1.7 0 4.1-3.6 5.3-9H14.7z" fill="#0d9488"/>
      </svg>
    ),
  },
]

function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 pt-24 pb-0">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0">

          {/* Left - text */}
          <div className="flex-1 md:pr-16 z-10">
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ color: '#0d9488', background: 'rgba(13,148,136,0.08)' }}
            >
              Emithran Partners
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5" style={{ color: '#0f1b2d' }}>
              Move faster with<br />Emithran partners
            </h1>
            <p className="text-[15px] leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(15,27,45,0.6)' }}>
              Our certified partner network spans system integrators, technology providers, and industry consultants - helping you deploy, scale, and get maximum value from the platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about/partners/become-a-partner"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: 'linear-gradient(135deg, #0d9488, #2dd4bf)' }}
              >
                Become a partner
              </Link>
              <a
                href="#browse"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-colors"
                style={{ color: '#0d9488', border: '1.5px solid rgba(13,148,136,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,148,136,0.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                Browse partners
              </a>
            </div>
          </div>

          {/* Right - floating partner category cards (hidden on mobile) */}
          <div className="hidden md:flex flex-1 items-center justify-end">
            <div className="flex gap-4" style={{ width: 380 }}>

              {/* Left column */}
              <div className="flex flex-col gap-4 flex-1">
                {([HERO_PARTNER_CARDS[0], HERO_PARTNER_CARDS[2]] as typeof HERO_PARTNER_CARDS).map(card => (
                  <div
                    key={card.title}
                    className="rounded-2xl p-4 bg-white flex flex-col gap-2"
                    style={{
                      border: '1px solid rgba(13,148,136,0.13)',
                      boxShadow: '0 6px 28px rgba(13,148,136,0.10), 0 1px 4px rgba(0,0,0,0.05)',
                      animation: `drift 3.8s ease-in-out ${card.delay} infinite`,
                    }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(13,148,136,0.07)' }}>
                      {card.icon}
                    </div>
                    <p className="text-[12px] font-bold leading-snug" style={{ color: '#0f1b2d' }}>{card.title}</p>
                    <p className="text-[11px]" style={{ color: 'rgba(15,27,45,0.5)' }}>{card.tagline}</p>
                  </div>
                ))}
              </div>

              {/* Right column - offset down */}
              <div className="flex flex-col gap-4 flex-1 mt-10">
                {([HERO_PARTNER_CARDS[1], HERO_PARTNER_CARDS[3]] as typeof HERO_PARTNER_CARDS).map(card => (
                  <div
                    key={card.title}
                    className="rounded-2xl p-4 bg-white flex flex-col gap-2"
                    style={{
                      border: '1px solid rgba(13,148,136,0.13)',
                      boxShadow: '0 6px 28px rgba(13,148,136,0.10), 0 1px 4px rgba(0,0,0,0.05)',
                      animation: `drift 3.8s ease-in-out ${card.delay} infinite`,
                    }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(13,148,136,0.07)' }}>
                      {card.icon}
                    </div>
                    <p className="text-[12px] font-bold leading-snug" style={{ color: '#0f1b2d' }}>{card.title}</p>
                    <p className="text-[11px]" style={{ color: 'rgba(15,27,45,0.5)' }}>{card.tagline}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Diagonal teal accent band */}
      <div className="relative mt-10 overflow-hidden" style={{ height: 72 }}>
        <div
          className="absolute inset-x-[-5%] inset-y-0"
          style={{
            background: 'linear-gradient(90deg, #0d9488 0%, #2dd4bf 50%, #0d9488 100%)',
            transform: 'skewY(-2deg)',
            opacity: 0.92,
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'rgba(255,255,255,0.3)' }}
        />
      </div>
    </section>
  )
}

/* ── Why Partners ─────────────────────────────────────────────────── */

const BENEFITS = [
  {
    title: 'Drive Innovation',
    body: "Get expert help building on Emithran's cost intelligence infrastructure to create differentiated offerings for manufacturing clients.",
    bullets: ['Leverage should-cost APIs', 'Add supplier intelligence layers', 'Optimise procurement workflows'],
    icon: (
      <svg viewBox="0 0 36 42" width="36" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><clipPath id="benefitClip0"><rect x="7" y="26" width="22" height="13" rx="2" /></clipPath></defs>
        <rect x="7" y="26" width="22" height="13" rx="2" fill="rgba(13,148,136,0.18)" />
        <path d="M18 3C12.48 3 8 7.48 8 13c0 3.7 1.96 6.95 4.9 8.76L13 23v4a2 2 0 002 2h6a2 2 0 002-2v-4l.1-1.24C26.04 19.95 28 16.7 28 13 28 7.48 23.52 3 18 3zm-2 28v2h4v-2h-4zm1 4.5h2V34h-2v1.5z" fill="#0d9488" />
        <g clipPath="url(#benefitClip0)">
          <path d="M18 3C12.48 3 8 7.48 8 13c0 3.7 1.96 6.95 4.9 8.76L13 23v4a2 2 0 002 2h6a2 2 0 002-2v-4l.1-1.24C26.04 19.95 28 16.7 28 13 28 7.48 23.52 3 18 3zm-2 28v2h4v-2h-4zm1 4.5h2V34h-2v1.5z" fill="rgba(13,148,136,0.5)" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Launch Quickly',
    body: 'Reduce time to deployment with partner integrations that have already done the setup and certification work.',
    bullets: ['Go live in days, not months', 'Co-sell with the Emithran team', 'Access sandbox & test environments'],
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><clipPath id="benefitClip1"><ellipse cx="13" cy="34" rx="10" ry="5" /></clipPath></defs>
        <ellipse cx="13" cy="34" rx="10" ry="5" fill="rgba(13,148,136,0.18)" />
        <path d="M20 2c-4 0-10 6-10 14v10l3.5-2 3.5 2 3.5-2 3.5 2V16C24 8 24 2 20 2zm0 11a2 2 0 110-4 2 2 0 010 4zm-8 21c0 2.76 3.58 5 8 5s8-2.24 8-5" fill="#0d9488" />
        <g clipPath="url(#benefitClip1)">
          <path d="M20 2c-4 0-10 6-10 14v10l3.5-2 3.5 2 3.5-2 3.5 2V16C24 8 24 2 20 2zm0 11a2 2 0 110-4 2 2 0 010 4zm-8 21c0 2.76 3.58 5 8 5s8-2.24 8-5" fill="rgba(13,148,136,0.5)" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Expand Globally',
    body: 'Accelerate your reach with global partnerships or regional India and Southeast Asia manufacturing experts.',
    bullets: ['Enter new manufacturing markets', "Access India's top 500 OEMs", 'Add local supplier networks'],
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><clipPath id="benefitClip2"><circle cx="13" cy="22" r="13" /></clipPath></defs>
        <circle cx="13" cy="22" r="13" fill="rgba(13,148,136,0.18)" />
        <path d="M24 6a16 16 0 1 1 0 32A16 16 0 0 1 24 6zm0 2c-1.7 0-4 3.6-5 9h10c-1-5.4-3.3-9-5-9zm-7.8 9H9.5a14 14 0 0 0 0 10h6.7a34 34 0 0 1 0-10zm15.3 0h-6.7a34 34 0 0 1 0 10h6.7a14 14 0 0 0 0-10zM19.3 29c1 4.8 3.2 8 4.7 8 1.5 0 3.7-3.2 4.7-8H19.3z" fill="#0d9488" />
        <g clipPath="url(#benefitClip2)">
          <path d="M24 6a16 16 0 1 1 0 32A16 16 0 0 1 24 6zm0 2c-1.7 0-4 3.6-5 9h10c-1-5.4-3.3-9-5-9zm-7.8 9H9.5a14 14 0 0 0 0 10h6.7a34 34 0 0 1 0-10zm15.3 0h-6.7a34 34 0 0 1 0 10h6.7a14 14 0 0 0 0-10zM19.3 29c1 4.8 3.2 8 4.7 8 1.5 0 3.7-3.2 4.7-8H19.3z" fill="rgba(13,148,136,0.5)" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Streamline Operations',
    body: 'Integrate Emithran into your existing business processes and IT infrastructure with pre-built kits.',
    bullets: ['Unify cost reporting', 'Automate BOM validation', 'Simplify supplier workflows'],
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><clipPath id="benefitClip3"><circle cx="13" cy="23" r="12" /></clipPath></defs>
        <circle cx="13" cy="23" r="12" fill="rgba(13,148,136,0.18)" />
        <path d="M27.5 15.2l-1.6-2.8-2.4 1.4c-.7-.6-1.5-1-2.4-1.3V9.5h-3.2v3c-.9.3-1.7.8-2.4 1.4l-2.4-1.4-1.6 2.8 2.4 1.4a7 7 0 000 2.6l-2.4 1.4 1.6 2.8 2.4-1.4c.7.6 1.5 1 2.4 1.3v3h3.2v-3c.9-.3 1.7-.8 2.4-1.4l2.4 1.4 1.6-2.8-2.4-1.4c.1-.4.2-.9.2-1.3s-.1-.9-.2-1.3l2.4-1.4zm-7.5 4.3a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#0d9488" />
        <g clipPath="url(#benefitClip3)">
          <path d="M27.5 15.2l-1.6-2.8-2.4 1.4c-.7-.6-1.5-1-2.4-1.3V9.5h-3.2v3c-.9.3-1.7.8-2.4 1.4l-2.4-1.4-1.6 2.8 2.4 1.4a7 7 0 000 2.6l-2.4 1.4 1.6 2.8 2.4-1.4c.7.6 1.5 1 2.4 1.3v3h3.2v-3c.9-.3 1.7-.8 2.4-1.4l2.4 1.4 1.6-2.8-2.4-1.4c.1-.4.2-.9.2-1.3s-.1-.9-.2-1.3l2.4-1.4zm-7.5 4.3a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="rgba(13,148,136,0.5)" />
        </g>
      </svg>
    ),
  },
]

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
      <g fill="#0d9488" fillRule="evenodd">
        <circle opacity={0.15} cx="8" cy="8" r="8" />
        <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z" />
      </g>
    </svg>
  )
}

function WhyPartnersSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left - heading + intro */}
          <div className="lg:w-[36%] shrink-0">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#0d9488' }}>
              Why partner with Emithran
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] mb-5" style={{ color: '#0f1b2d' }}>
              Accelerate your business at every stage
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.55)' }}>
              Lean on our partners to do the heavy lifting. Emithran partners help organisations of all sizes and can provide whatever assistance you need to deploy cost intelligence throughout your business.
            </p>
          </div>

          {/* Right - 2×2 benefit blocks */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {BENEFITS.map(b => (
              <div key={b.title}>
                <div className="mb-3">{b.icon}</div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: '#0f1b2d' }}>{b.title}</h3>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(15,27,45,0.55)' }}>{b.body}</p>
                <ul className="flex flex-col gap-2">
                  {b.bullets.map(bullet => (
                    <li key={bullet} className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-[13px]" style={{ color: 'rgba(15,27,45,0.7)' }}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── Partner Specialisations ──────────────────────────────────────── */

const SPECIALISATIONS = [
  {
    title: 'System Integrators',
    body: "ERP & MES implementation experts - SAP, Oracle, and custom stacks - embedding Emithran's cost intelligence into existing workflows.",
    trackSlug: 'system-integrator',
    icon: (
      <svg viewBox="0 0 42 36" width="42" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><clipPath id="specClip0"><rect x="2" y="20" width="20" height="14" rx="2"/></clipPath></defs>
        <rect x="2" y="20" width="20" height="14" rx="2" fill="rgba(13,148,136,0.18)"/>
        <rect x="6" y="2" width="30" height="8" rx="2" fill="#0d9488"/>
        <rect x="6" y="13" width="30" height="8" rx="2" fill="#0d9488"/>
        <rect x="6" y="24" width="30" height="8" rx="2" fill="#0d9488"/>
        <rect x="29" y="5" width="4" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
        <rect x="29" y="16" width="4" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
        <rect x="29" y="27" width="4" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
        <g clipPath="url(#specClip0)">
          <rect x="6" y="2" width="30" height="8" rx="2" fill="rgba(13,148,136,0.5)"/>
          <rect x="6" y="13" width="30" height="8" rx="2" fill="rgba(13,148,136,0.5)"/>
          <rect x="6" y="24" width="30" height="8" rx="2" fill="rgba(13,148,136,0.5)"/>
        </g>
      </svg>
    ),
  },
  {
    title: 'Technology Partners',
    body: 'API integrations, data connectors, and platform extensions - linking supplier databases, CAD tools, and procurement systems.',
    trackSlug: 'technology-partner',
    icon: (
      <svg viewBox="0 0 40 38" width="40" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><clipPath id="specClip1"><rect x="2" y="22" width="18" height="14" rx="3"/></clipPath></defs>
        <rect x="2" y="22" width="18" height="14" rx="3" fill="rgba(13,148,136,0.18)"/>
        <rect x="4" y="3" width="32" height="26" rx="3" fill="#0d9488"/>
        <rect x="4" y="11" width="32" height="1.5" fill="rgba(255,255,255,0.12)"/>
        <circle cx="10" cy="7" r="2" fill="rgba(255,255,255,0.45)"/>
        <circle cx="16" cy="7" r="2" fill="rgba(255,255,255,0.3)"/>
        <circle cx="22" cy="7" r="2" fill="rgba(255,255,255,0.2)"/>
        <rect x="9" y="15" width="12" height="2" rx="1" fill="rgba(255,255,255,0.55)"/>
        <rect x="9" y="20" width="18" height="2" rx="1" fill="rgba(255,255,255,0.35)"/>
        <rect x="9" y="25" width="8" height="2" rx="1" fill="rgba(255,255,255,0.55)"/>
        <g clipPath="url(#specClip1)">
          <rect x="4" y="3" width="32" height="26" rx="3" fill="rgba(13,148,136,0.5)"/>
        </g>
      </svg>
    ),
  },
  {
    title: 'Industry Consultants',
    body: 'Automotive, Aerospace & Defence domain advisors delivering Emithran-powered should-cost studies and supplier benchmarking.',
    trackSlug: 'industry-consultant',
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><clipPath id="specClip2"><rect x="2" y="22" width="20" height="16" rx="2"/></clipPath></defs>
        <rect x="2" y="22" width="20" height="16" rx="2" fill="rgba(13,148,136,0.18)"/>
        <rect x="5" y="26" width="6" height="12" rx="2" fill="#0d9488"/>
        <rect x="14" y="18" width="6" height="20" rx="2" fill="#0d9488"/>
        <rect x="23" y="10" width="6" height="28" rx="2" fill="#0d9488"/>
        <rect x="32" y="14" width="6" height="24" rx="2" fill="#0d9488"/>
        <rect x="4" y="38" width="34" height="2" rx="1" fill="#0d9488"/>
        <g clipPath="url(#specClip2)">
          <rect x="5" y="26" width="6" height="12" rx="2" fill="rgba(13,148,136,0.5)"/>
          <rect x="14" y="18" width="6" height="20" rx="2" fill="rgba(13,148,136,0.5)"/>
          <rect x="23" y="10" width="6" height="28" rx="2" fill="rgba(13,148,136,0.5)"/>
          <rect x="32" y="14" width="6" height="24" rx="2" fill="rgba(13,148,136,0.5)"/>
          <rect x="4" y="38" width="34" height="2" rx="1" fill="rgba(13,148,136,0.5)"/>
        </g>
      </svg>
    ),
  },
  {
    title: 'Resellers & Distributors',
    body: 'Regional GTM partners across South Asia and Southeast Asia managing licensing, onboarding, and local customer success.',
    trackSlug: 'reseller-distributor',
    icon: (
      <svg viewBox="0 0 40 42" width="40" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><clipPath id="specClip3"><circle cx="13" cy="28" r="13"/></clipPath></defs>
        <circle cx="13" cy="28" r="13" fill="rgba(13,148,136,0.18)"/>
        <path d="M24 6a16 16 0 1 1 0 32A16 16 0 0 1 24 6zm0 2c-1.7 0-4 3.6-5 9h10c-1-5.4-3.3-9-5-9zm-7.8 9H9.5a14 14 0 0 0 0 10h6.7a34 34 0 0 1 0-10zm15.3 0h-6.7a34 34 0 0 1 0 10h6.7a14 14 0 0 0 0-10zM19.3 29c1 4.8 3.2 8 4.7 8 1.5 0 3.7-3.2 4.7-8H19.3z" fill="#0d9488"/>
        <g clipPath="url(#specClip3)">
          <path d="M24 6a16 16 0 1 1 0 32A16 16 0 0 1 24 6zm0 2c-1.7 0-4 3.6-5 9h10c-1-5.4-3.3-9-5-9zm-7.8 9H9.5a14 14 0 0 0 0 10h6.7a34 34 0 0 1 0-10zm15.3 0h-6.7a34 34 0 0 1 0 10h6.7a14 14 0 0 0 0-10zM19.3 29c1 4.8 3.2 8 4.7 8 1.5 0 3.7-3.2 4.7-8H19.3z" fill="rgba(13,148,136,0.5)"/>
        </g>
      </svg>
    ),
  },
]

function SpecialisationsSection() {
  return (
    <section id="browse" className="py-20 px-6 md:px-12" style={{ background: '#f0fdf9' }}>
      <div className="mx-auto max-w-[1280px]">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#0d9488' }}>
          Partner specialisations
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12" style={{ color: '#0f1b2d' }}>
          Access partners with proven expertise
        </h2>
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {SPECIALISATIONS.map(s => (
            <Link
              key={s.title}
              href={`/about/partners/become-a-partner?track=${s.trackSlug}`}
              className="shrink-0 w-[80vw] max-w-[320px] sm:w-auto sm:max-w-none rounded-2xl p-6 bg-white flex flex-col group"
              style={{ border: '1px solid rgba(13,148,136,0.12)', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(13,148,136,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(13,148,136,0.08)' }}
              >
                {s.icon}
              </div>
              <h3 className="text-[15px] font-bold mb-2" style={{ color: '#0f1b2d' }}>{s.title}</h3>
              <p className="text-[13px] leading-relaxed mb-4 flex-1" style={{ color: 'rgba(15,27,45,0.58)' }}>{s.body}</p>
              <span
                className="inline-flex items-center gap-1 text-[13px] font-semibold"
                style={{ color: '#0d9488' }}
              >
                Apply now
                <AnimatedArrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Case Study Carousel ──────────────────────────────────────────── */

interface CarouselItem {
  slug: string
  title: string
  description: string
  challenge: string
  solution: string
  impact: string
  accentColor: string
  bgImage: string
  quote: string
  quoteAuthor: string
  quoteRole: string
  logoSrc: string
  logoAlt: string
  shortLabel: string
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    slug: 'chassis-india-belgium',
    title: 'India vs Belgium: 38% Landed Cost Saving on HGV Chassis Rails',
    description: 'Emithran benchmarked India roll-forming against Belgium manufacturing for a major European OEM, delivering full DDP landed cost visibility from Chennai to Scotland.',
    challenge: 'The procurement team had no transparent cost data to justify dual sourcing. Belgian supplier pricing was accepted at face value with no independent benchmark.',
    solution: 'Emithran built granular should-cost models for both geographies - factoring raw material, labour, tooling, and full DDP logistics - enabling a direct comparison.',
    impact: 'A 38% total landed cost advantage for India-sourced rails was validated, directly informing a £1.2M annual sourcing decision.',
    accentColor: '#0d9488',
    bgImage: '/assets/casestudy/case4.png',
    quote: 'Emithran gave us the data confidence we needed to dual-source. The India saving was real - we could prove it line by line.',
    quoteAuthor: 'Procurement Director',
    quoteRole: 'European HGV OEM',
    logoSrc: '/assets/trustedby/ashokleyland.svg',
    logoAlt: 'Ashok Leyland',
    shortLabel: '38% saving',
  },
  {
    slug: 'exhaust-system',
    title: 'Should-Cost Deep Dive: Automotive Exhaust Assembly at Tier-1 Scale',
    description: 'A full should-cost model for a complex exhaust assembly revealed 19% procurement leakage and enabled a data-driven renegotiation with Tier-1 stamping suppliers.',
    challenge: 'The OEM had no visibility into the actual cost build-up of a multi-component exhaust system. Supplier quotes were accepted without challenge.',
    solution: 'Emithran decomposed the assembly into 24 sub-parts, modelling material cost, press tooling, welding, and finish for each Stuttgart Tier-1 supplier.',
    impact: 'The renegotiation recovered 19% of annual spend - approximately €340K per year - without changing a single supplier.',
    accentColor: '#d97706',
    bgImage: '/assets/casestudy/case5.png',
    quote: 'We had suspected overpayment for years. Emithran quantified it in 48 hours and gave us the ammunition to act.',
    quoteAuthor: 'Category Manager',
    quoteRole: 'Tier-1 Automotive Supplier',
    logoSrc: '/assets/trustedby/RolandBerger.svg',
    logoAlt: 'Roland Berger',
    shortLabel: '19% leakage',
  },
  {
    slug: 'hgv-chassis',
    title: 'HGV Chassis Ladder Frame: BOM Costing Across 3 Geographies',
    description: 'Multi-geography cost benchmarking for a heavy goods vehicle chassis frame - comparing India, Germany, and Turkey fabrication costs with full landed cost visibility.',
    challenge: 'A global sourcing team needed a reliable cost comparison across three candidate manufacturing regions with no common cost model.',
    solution: 'Emithran built region-specific models for India, Germany, and Turkey, accounting for steel grade availability, labour rates, and port-to-plant logistics.',
    impact: 'India-sourced fabrication came in 31% below Germany on a landed cost basis, saving the team 6 weeks of RFQ cycle time.',
    accentColor: '#2563eb',
    bgImage: '/assets/casestudy/truck.png',
    quote: 'The 3-geography BOM model was the single source of truth our team had been missing. Sourcing decisions that used to take months took days.',
    quoteAuthor: 'Global Sourcing Lead',
    quoteRole: 'Major HGV Manufacturer',
    logoSrc: '/assets/trustedby/TATAPower.svg',
    logoAlt: 'TATA Power',
    shortLabel: '3-geo BOM',
  },
  {
    slug: 'dc-dc-converter',
    title: 'Aerospace DC-DC Converter: VAVE Analysis Saves 22% per Unit',
    description: 'Value analysis of an aviation-grade DC-DC converter identified 14 substitution opportunities, delivering 22% unit cost reduction without changing form factor.',
    challenge: 'An aerospace electronics manufacturer was under pressure to reduce unit cost without disrupting DO-160 qualification or the existing PCB layout.',
    solution: "Emithran's VAVE analysis mapped every passive component against qualified alternatives, running DFM checks and pricing for 14 substitution candidates.",
    impact: '8 substitutions were approved, delivering a 22% unit cost reduction on a $4,200 converter - $924 saving per unit at volume.',
    accentColor: '#7c3aed',
    bgImage: '/assets/casestudy/case3.png',
    quote: 'The VAVE output was actionable from day one. Our engineers could review the substitution list directly - no translation needed.',
    quoteAuthor: 'VP Engineering',
    quoteRole: 'Aerospace Electronics OEM',
    logoSrc: '/assets/trustedby/digantara.svg',
    logoAlt: 'Digantara',
    shortLabel: '22% VAVE',
  },
  {
    slug: 'electronics-teardown',
    title: 'Competitive Electronics Teardown: Reverse BOM for Defence Subsystem',
    description: 'A complete teardown and reverse BOM of a competing defence subsystem gave procurement intelligence that informed the sourcing strategy for the next generation program.',
    challenge: 'The programme office had no cost intelligence on a competing subsystem winning on price. They needed to understand the structural cost advantage.',
    solution: 'Emithran performed a full physical teardown and built a reverse BOM, pricing every component at volume across qualified defence-grade suppliers globally.',
    impact: "The competitor's cost advantage was traced to a single ASIC. Redesigning around a catalogue alternative closed the price gap by 18%.",
    accentColor: '#dc2626',
    bgImage: '/assets/casestudy/case7.png',
    quote: 'We finally understood what we were competing against. The teardown paid for itself in the first contract it influenced.',
    quoteAuthor: 'Programme Director',
    quoteRole: 'UK Defence Electronics Firm',
    logoSrc: '/assets/trustedby/Pixxel.svg',
    logoAlt: 'Pixxel',
    shortLabel: 'Teardown',
  },
  {
    slug: 'hgv-cab-strategy',
    title: 'HGV Cab Assembly: Make vs Buy Decision Across 6 Components',
    description: 'Structured make-vs-buy analysis using real supplier costs, logistics, and tooling amortisation to guide a £2M sourcing decision for a major OEM.',
    challenge: 'Engineering favoured in-house production; procurement favoured outsourcing. Neither side had a cost model to settle the debate objectively.',
    solution: 'Emithran built a full make-vs-buy model for 6 cab components, incorporating overhead absorption, tooling write-off, and supplier TCO with DDP logistics.',
    impact: '4 of 6 components were confirmed as buy decisions. Annual sourcing saving versus in-house production: £380K, with full board-level justification.',
    accentColor: '#059669',
    bgImage: '/assets/casestudy/case6.png',
    quote: 'For the first time, both engineering and procurement were looking at the same numbers. The debate ended in one meeting.',
    quoteAuthor: 'COO',
    quoteRole: 'South American HGV Manufacturer',
    logoSrc: '/assets/trustedby/Tanbo.svg',
    logoAlt: 'Tanbo',
    shortLabel: 'Make vs Buy',
  },
  {
    slug: 'rear-view-mirror',
    title: 'Rear View Mirror Assembly: 94% BOM Accuracy in Under 48 Hours',
    description: 'Automated BOM extraction and validation for a 180-part rear view mirror assembly delivered 94% accuracy in 48 hours, replacing a 3-week manual costing exercise.',
    challenge: 'A Tier-1 supplier needed a validated BOM for a 180-part assembly to support a customer quote. Their manual costing process took 3 weeks and often contained errors.',
    solution: "Emithran's platform extracted and validated the full BOM from engineering drawings and ERP data, cross-referencing against live supplier pricing.",
    impact: '94% BOM accuracy achieved in 48 hours. The supplier submitted the quote on time and won a programme worth $2.2M annually.',
    accentColor: '#b45309',
    bgImage: '/assets/casestudy/case8.png',
    quote: 'We went from a 3-week process to 48 hours. The accuracy was better than anything we had produced manually.',
    quoteAuthor: 'Head of Costing',
    quoteRole: 'Indian Tier-1 Automotive Supplier',
    logoSrc: '/assets/trustedby/Aadya.svg',
    logoAlt: 'Aadya',
    shortLabel: '94% BOM',
  },
  {
    slug: 'rear-axle-should-cost',
    title: 'Rear Axle Should-Cost: Breaking Down a £480 Casting-Machined Assembly',
    description: 'A granular should-cost analysis of a rear axle housing - from raw casting to machining cycle time - identified a £68/unit overcharge from a Tier-1 supplier.',
    challenge: "A UK OEM suspected they were overpaying for a cast-and-machined rear axle housing but had no internal capability to audit the Tier-1 supplier's pricing.",
    solution: 'Emithran built a bottom-up should-cost model including casting yield, machining operations, surface treatment, and logistics from the West Midlands.',
    impact: 'A £68/unit overcharge was confirmed. The renegotiation recovered £272K in the first year.',
    accentColor: '#6d28d9',
    bgImage: '/assets/casestudy/f1card.png',
    quote: "The should-cost model was more detailed than the supplier's own costing sheet. They had no choice but to negotiate.",
    quoteAuthor: 'Head of Supplier Development',
    quoteRole: 'UK Automotive OEM',
    logoSrc: '/assets/trustedby/rainmaker.svg',
    logoAlt: 'Rainmaker',
    shortLabel: '£68/unit',
  },
]

function CaseStudyCarousel() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    setActiveIdx(i => (i + 1) % CAROUSEL_ITEMS.length)
  }, [])

  useEffect(() => {
    if (paused) return
    timerRef.current = setTimeout(advance, 6000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeIdx, paused, advance])

  const item = CAROUSEL_ITEMS[activeIdx]

  return (
    <section
      id="case-studies"
      className="py-16 px-6 md:px-12 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1280px]">

        {/* eyebrow */}
        <p className="text-[11px] font-bold uppercase tracking-widest mb-10" style={{ color: '#0d9488' }}>
          Case studies
        </p>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12" style={{ minHeight: 400 }}>

          {/* Left - text */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3" style={{ color: '#0f1b2d' }}>
                {item.title}
              </h2>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.58)' }}>
                {item.description}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {(['challenge', 'solution', 'impact'] as const).map(key => (
                <div key={key}>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: item.accentColor }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                    {item[key]}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href={`/case-studies/${item.slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-auto transition-opacity hover:opacity-70 group"
              style={{ color: item.accentColor }}
            >
              Read full case study
              <AnimatedArrow />
            </Link>
          </div>

          {/* Right - image card with quote */}
          <div
            className="lg:w-[52%] shrink-0 rounded-2xl overflow-hidden relative flex flex-col justify-end"
            style={{ minHeight: 380, backgroundImage: `url(${item.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* gradient overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,20,30,0.88) 0%, rgba(10,20,30,0.3) 55%, transparent 100%)' }} />
            {/* quote */}
            <div className="relative z-10 p-7 pb-5">
              <blockquote className="text-[14px] leading-relaxed text-white mb-4 italic max-w-md">
                "{item.quote}"
              </blockquote>
              <p className="text-[11px] font-semibold mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {item.quoteAuthor}, {item.quoteRole}
              </p>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                style={{ background: item.accentColor + '33', color: item.accentColor, border: `1px solid ${item.accentColor}55` }}
              >
                Case Study
              </span>
            </div>
          </div>

        </div>

        {/* Nav - logo buttons + colored progress bar */}
        <div className="mt-10">
          {/* Progress segments */}
          <div className="flex gap-0 mb-4" style={{ height: 3 }}>
            {CAROUSEL_ITEMS.map((ci, i) => (
              <button
                key={ci.slug}
                onClick={() => setActiveIdx(i)}
                className="flex-1 h-full transition-all duration-300"
                style={{
                  background: ci.accentColor,
                  opacity: i === activeIdx ? 1 : 0.18,
                  borderRadius: i === 0 ? '2px 0 0 2px' : i === CAROUSEL_ITEMS.length - 1 ? '0 2px 2px 0' : 0,
                }}
                aria-label={`Go to case study: ${ci.title}`}
              />
            ))}
          </div>

          {/* Logo buttons */}
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {CAROUSEL_ITEMS.map((ci, i) => (
              <button
                key={ci.slug}
                onClick={() => setActiveIdx(i)}
                className="flex-1 min-w-[80px] flex items-center justify-center py-3 px-2 transition-all duration-200"
                style={{ opacity: i === activeIdx ? 1 : 0.35 }}
              >
                <span
                  className="text-[11px] font-bold tracking-tight whitespace-nowrap"
                  style={{ color: i === activeIdx ? ci.accentColor : '#0f1b2d' }}
                >
                  {ci.shortLabel}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile dot indicators */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            {CAROUSEL_ITEMS.map((ci, i) => (
              <button
                key={ci.slug}
                onClick={() => setActiveIdx(i)}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{ background: i === activeIdx ? item.accentColor : 'rgba(15,27,45,0.2)' }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Bottom CTA ───────────────────────────────────────────────────── */

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors group"
      style={{ color: '#0d9488' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a7c72' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#0d9488' }}
    >
      {children}
      <AnimatedArrow />
    </Link>
  )
}

function BottomCTA() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white border-t" style={{ borderColor: 'rgba(13,148,136,0.10)' }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:items-start">

          {/* Left - heading + CTAs (~50%) */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] mb-4" style={{ color: '#0f1b2d' }}>
              Ready to get connected?
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: 'rgba(15,27,45,0.55)' }}>
              Explore the partner directory or contact us to learn more about working with partners.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about/partners/become-a-partner"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-85 group"
                style={{ background: 'linear-gradient(135deg, #0d9488, #2dd4bf)' }}
              >
                Become a partner
                <AnimatedArrow />
              </Link>
              <ArrowLink href="/contact?source=partners&cta=contact-our-team">Contact our team</ArrowLink>
            </div>
          </div>

          {/* Right - two cards side by side (~50%) */}
          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-5">

            {/* Card: Read customer stories */}
            <div
              className="flex-1 rounded-2xl p-6 flex flex-col"
              style={{ border: '1px solid rgba(13,148,136,0.12)', background: '#f8fffe' }}
            >
              <div className="mb-4 shrink-0">
                <svg viewBox="0 0 34 40" xmlns="http://www.w3.org/2000/svg" width="34" height="40">
                  <defs>
                    <clipPath id="docsClip">
                      <rect width="26" height="34" rx="2" fill="rgba(13,148,136,0.18)" />
                    </clipPath>
                  </defs>
                  <rect width="26" height="34" rx="2" fill="rgba(13,148,136,0.18)" />
                  <path d="M30 6a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h18zm0 28H12v2h18v-2zm0-5h-4v2h4v-2zm-6 0H12v2h12v-2zm6-5H12v2h18v-2zm0-5H12v2h18v-2zm0-9h-6v2h6v-2zm-10 0h-8v2h8v-2z" fill="#0d9488" />
                  <g clipPath="url(#docsClip)">
                    <path d="M30 6a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h18zm0 28H12v2h18v-2zm0-5h-4v2h4v-2zm-6 0H12v2h12v-2zm6-5H12v2h18v-2zm0-5H12v2h18v-2zm0-9h-6v2h6v-2zm-10 0h-8v2h8v-2z" fill="rgba(13,148,136,0.5)" />
                  </g>
                </svg>
              </div>
              <h3 className="text-[14px] font-bold mb-1.5" style={{ color: '#0f1b2d' }}>Read customer stories</h3>
              <p className="text-[13px] leading-relaxed mb-4 flex-1" style={{ color: 'rgba(15,27,45,0.55)' }}>
                See how Emithran helps manufacturers of all sizes.
              </p>
              <ArrowLink href="/case-studies">See all stories</ArrowLink>
            </div>

            {/* Card: Become a partner */}
            <div
              className="flex-1 rounded-2xl p-6 flex flex-col"
              style={{ border: '1px solid rgba(13,148,136,0.12)', background: '#f8fffe' }}
            >
              <div className="mb-4 shrink-0">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="personClip">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17 8C25.8366 8 33 15.1634 33 24C33 29.087 30.626 33.6195 26.9256 36.5501C26.0383 33.2393 21.9317 30.7368 17 30.7368C12.0683 30.7368 7.96174 33.2392 7.07298 36.5493C3.37396 33.6195 1 29.087 1 24C1 15.1634 8.16344 8 17 8ZM17 18C14.2386 18 12 20.2386 12 23C12 25.7614 14.2386 28 17 28C19.7614 28 22 25.7614 22 23C22 20.2386 19.7614 18 17 18Z" fill="rgba(13,148,136,0.18)" />
                    </clipPath>
                  </defs>
                  <path fillRule="evenodd" clipRule="evenodd" d="M17 8C25.8366 8 33 15.1634 33 24C33 29.087 30.626 33.6195 26.9256 36.5501C26.0383 33.2393 21.9317 30.7368 17 30.7368C12.0683 30.7368 7.96174 33.2392 7.07298 36.5493C3.37396 33.6195 1 29.087 1 24C1 15.1634 8.16344 8 17 8ZM17 18C14.2386 18 12 20.2386 12 23C12 25.7614 14.2386 28 17 28C19.7614 28 22 25.7614 22 23C22 20.2386 19.7614 18 17 18Z" fill="rgba(13,148,136,0.18)" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M30 3C34.9706 3 39 7.02944 39 12C39 16.9706 34.9706 21 30 21C25.0294 21 21 16.9706 21 12C21 7.02944 25.0294 3 30 3ZM33.94 7.73L28 13.78L26.43 12C26.1336 11.7182 25.6762 11.6943 25.352 11.9436C25.0279 12.193 24.9337 12.6413 25.13 13L27 16.2C27.1823 16.4942 27.5039 16.6732 27.85 16.6732C28.1961 16.6732 28.5177 16.4942 28.7 16.2C29 15.79 34.7 8.63 34.7 8.63C35.45 7.83 34.54 7.12 33.94 7.73Z" fill="#0d9488" />
                  <g clipPath="url(#personClip)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M30 3C34.9706 3 39 7.02944 39 12C39 16.9706 34.9706 21 30 21C25.0294 21 21 16.9706 21 12C21 7.02944 25.0294 3 30 3ZM33.94 7.73L28 13.78L26.43 12C26.1336 11.7182 25.6762 11.6943 25.352 11.9436C25.0279 12.193 24.9337 12.6413 25.13 13L27 16.2C27.1823 16.4942 27.5039 16.6732 27.85 16.6732C28.1961 16.6732 28.5177 16.4942 28.7 16.2C29 15.79 34.7 8.63 34.7 8.63C35.45 7.83 34.54 7.12 33.94 7.73Z" fill="rgba(13,148,136,0.5)" />
                  </g>
                </svg>
              </div>
              <h3 className="text-[14px] font-bold mb-1.5" style={{ color: '#0f1b2d' }}>Become a partner</h3>
              <p className="text-[13px] leading-relaxed mb-4 flex-1" style={{ color: 'rgba(15,27,45,0.55)' }}>
                Interested in joining the Emithran partner network?
              </p>
              <ArrowLink href="/contact?source=partners&cta=become-a-partner">Learn more</ArrowLink>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function PartnersPage() {
  return (
    <main>
      <PartnerEcosystemNav />
      <HeroSection />
      <WhyPartnersSection />
      <SpecialisationsSection />
      <CaseStudyCarousel />
      <BottomCTA />
    </main>
  )
}

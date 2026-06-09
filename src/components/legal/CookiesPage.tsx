'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const LAST_UPDATED = 'June 8, 2026'

/* ── Sidebar nav ──────────────────────────────────────────────────── */

interface NavItem {
  id: string
  label: string
  sub?: { id: string; label: string }[]
}

const NAV: NavItem[] = [
  { id: 'what-are-cookies', label: 'What are cookies' },
  {
    id: 'cookies-we-use',
    label: 'Cookies we use',
    sub: [
      { id: 'essential',  label: 'Essential cookies'  },
      { id: 'functional', label: 'Functional cookies' },
      { id: 'analytics',  label: 'Analytics cookies'  },
      { id: 'marketing',  label: 'Marketing cookies'  },
    ],
  },
  { id: 'third-party', label: 'Third-party cookies'       },
  { id: 'retention',   label: 'Cookie retention periods'  },
  { id: 'consent',     label: 'Managing your preferences' },
  { id: 'do-not-track',label: 'Do Not Track'              },
  { id: 'updates',     label: 'Policy updates'            },
  { id: 'contact',     label: 'Contact us'                },
]

const ALL_IDS = NAV.flatMap(n => [n.id, ...(n.sub?.map(s => s.id) ?? [])])

/* ── Content helpers ──────────────────────────────────────────────── */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-[18px] font-bold tracking-tight mb-4 scroll-mt-28" style={{ color: '#0f1b2d' }}>
      {children}
    </h2>
  )
}

function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-[14px] font-semibold mt-7 mb-2.5 scroll-mt-28" style={{ color: '#0f1b2d' }}>
      {children}
    </h3>
  )
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13.5px] leading-[1.8] mb-3.5" style={{ color: 'rgba(15,27,45,0.72)' }}>
      {children}
    </p>
  )
}

function SubClause({ letter, children }: { letter: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-2.5 pl-2">
      <span className="text-[13px] font-medium shrink-0 mt-0.5 w-5" style={{ color: 'rgba(15,27,45,0.45)' }}>({letter})</span>
      <p className="text-[13.5px] leading-[1.8]" style={{ color: 'rgba(15,27,45,0.72)' }}>{children}</p>
    </div>
  )
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-4 pl-4 flex flex-col gap-2" style={{ listStyleType: 'disc' }}>
      {items.map((item, i) => (
        <li key={i} className="text-[13.5px] leading-[1.8] pl-1" style={{ color: 'rgba(15,27,45,0.72)' }}>
          {item}
        </li>
      ))}
    </ul>
  )
}

function Divider() {
  return <hr className="my-10" style={{ borderColor: 'rgba(15,27,45,0.07)' }} />
}

function Bold({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: '#0f1b2d', fontWeight: 600 }}>{children}</strong>
}

function TealLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{ color: '#0d9488' }} className="hover:underline">
      {children}
    </a>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 mb-5"
      style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.14)' }}
    >
      <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(15,27,45,0.68)' }}>{children}</p>
    </div>
  )
}

function DefRow({ term, definition }: { term: string; definition: React.ReactNode }) {
  return (
    <div className="flex gap-5 py-3.5 border-b" style={{ borderColor: 'rgba(15,27,45,0.07)' }}>
      <span className="text-[13px] font-semibold shrink-0 w-48" style={{ color: '#0f1b2d' }}>
        &ldquo;{term}&rdquo;
      </span>
      <span className="text-[13px] leading-[1.7]" style={{ color: 'rgba(15,27,45,0.68)' }}>
        {definition}
      </span>
    </div>
  )
}

/* ── Cookie table ─────────────────────────────────────────────────── */

interface CookieRow {
  name: string
  provider: string
  purpose: string
  duration: string
}

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="rounded-xl overflow-hidden mb-5" style={{ border: '1px solid rgba(15,27,45,0.09)' }}>
      {/* Header */}
      <div
        className="grid grid-cols-4 gap-0 px-4 py-3 border-b"
        style={{ background: 'rgba(15,27,45,0.03)', borderColor: 'rgba(15,27,45,0.07)' }}
      >
        {['Cookie', 'Provider', 'Purpose', 'Duration'].map(h => (
          <span
            key={h}
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: 'rgba(15,27,45,0.45)' }}
          >
            {h}
          </span>
        ))}
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-4 gap-0 px-4 py-3 border-b last:border-b-0"
          style={{ borderColor: 'rgba(15,27,45,0.06)' }}
        >
          <span className="text-[13px] font-mono font-medium" style={{ color: '#0f1b2d' }}>{row.name}</span>
          <span className="text-[13px]" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.provider}</span>
          <span className="text-[13px]" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.purpose}</span>
          <span className="text-[13px]" style={{ color: 'rgba(15,27,45,0.55)' }}>{row.duration}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function CookiesPage() {
  const [activeId, setActiveId] = useState('what-are-cookies')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          )
          setActiveId(top.target.id)
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    )
    ALL_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function isActive(item: NavItem) {
    return activeId === item.id || item.sub?.some(s => s.id === activeId)
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div className="border-b" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
        <div className="mx-auto max-w-[1160px] px-6 md:px-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 pt-10 pb-4 text-[12px]" style={{ color: 'rgba(15,27,45,0.4)' }}>
            <Link href="/" className="hover:text-[#0d9488] transition-colors">Home</Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Legal</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: '#0f1b2d' }}>Cookies Policy</span>
          </div>

          {/* Related docs tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mb-px">
            {[
              { label: 'Terms of Service',         href: '/terms',   active: false },
              { label: 'Privacy Policy',            href: '/privacy', active: false },
              { label: 'Cookies Policy',            href: '/cookies', active: true  },
              { label: 'Data Processing Agreement', href: '/dpa',     active: false },
            ].map(tab => (
              <Link
                key={tab.label}
                href={tab.href}
                className="whitespace-nowrap px-5 py-3.5 text-[13px] font-medium border-b-2 transition-colors"
                style={{
                  borderColor: tab.active ? '#0d9488' : 'transparent',
                  color:       tab.active ? '#0d9488' : 'rgba(15,27,45,0.5)',
                }}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1160px] px-6 md:px-12 py-14 flex flex-col lg:flex-row gap-14 lg:gap-20">

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="hidden lg:block w-[208px] shrink-0">
          <div className="sticky top-[88px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-4 px-3" style={{ color: 'rgba(15,27,45,0.38)' }}>
              On this page
            </p>
            <nav className="flex flex-col gap-0.5">
              {NAV.map(item => {
                const active = isActive(item)
                return (
                  <React.Fragment key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="text-left w-full px-3 py-[7px] rounded-lg text-[12.5px] leading-snug transition-all"
                      style={{
                        color:      active ? '#0d9488'               : 'rgba(15,27,45,0.55)',
                        fontWeight: active ? 600                      : 400,
                        background: active ? 'rgba(13,148,136,0.07)' : 'transparent',
                      }}
                    >
                      {item.label}
                    </button>
                    {item.sub?.map(s => {
                      const sa = activeId === s.id
                      return (
                        <button
                          key={s.id}
                          onClick={() => scrollTo(s.id)}
                          className="text-left w-full py-[5px] pl-7 pr-3 rounded-lg text-[11.5px] leading-snug transition-all"
                          style={{
                            color:      sa ? '#0d9488' : 'rgba(15,27,45,0.42)',
                            fontWeight: sa ? 500 : 400,
                          }}
                        >
                          {s.label}
                        </button>
                      )
                    })}
                  </React.Fragment>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* ── Article ─────────────────────────────────────────────── */}
        <article className="flex-1 min-w-0">

          {/* Title */}
          <div className="mb-10">
            <h1 className="text-[34px] md:text-[40px] font-bold tracking-tight leading-tight mb-2" style={{ color: '#0f1b2d' }}>
              Cookies Policy
            </h1>
            <p className="text-[13px] mb-6" style={{ color: 'rgba(15,27,45,0.42)' }}>
              Last updated: {LAST_UPDATED}
            </p>
            <Callout>
              This Cookies Policy explains how Emithran Technologies Private Limited (&ldquo;Emithran&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) uses cookies and similar tracking technologies on our website and manufacturing intelligence platform. We use <Bold>essential cookies</Bold> to keep the platform secure and functional, <Bold>functional cookies</Bold> to remember your preferences, <Bold>analytics cookies</Bold> to understand how you use our product, and <Bold>marketing cookies</Bold> to measure the effectiveness of our advertising. You can manage your cookie preferences at any time through our cookie banner or your browser settings.
            </Callout>
          </div>

          {/* ── Section 1: What are cookies ── */}
          <H2 id="what-are-cookies">What are cookies?</H2>
          <Para>
            Cookies are small text files that a website or web application places on your device (computer, tablet, or mobile phone) when you visit it. They are widely used to make websites work efficiently, to enhance the user experience, and to provide information to the owners of the site.
          </Para>
          <Para>
            Cookies can be <Bold>session cookies</Bold>, which are deleted when you close your browser, or <Bold>persistent cookies</Bold>, which remain on your device for a defined period or until you delete them. They can be set either by the website you are visiting (<Bold>first-party cookies</Bold>) or by third-party services that the website uses (<Bold>third-party cookies</Bold>).
          </Para>
          <Para>
            In addition to HTTP cookies, we may also use the following similar technologies:
          </Para>
          <Ul
            items={[
              <><Bold>Local storage and session storage</Bold> — browser-based key-value stores that allow us to persist lightweight data (such as your UI theme preference or active workspace) directly in your browser without sending it to our servers on every request.</>,
              <><Bold>Pixel tags (web beacons)</Bold> — small transparent images embedded in web pages or emails that notify us when a page has been loaded or an email has been opened. Pixel tags do not store information on your device but enable us to record that a particular action has occurred and to associate it with your session or email address.</>,
              <><Bold>Fingerprinting and canvas hashes</Bold> — Emithran does <Bold>not</Bold> use browser fingerprinting or canvas-based device identification techniques on any part of its platform or marketing website.</>,
            ]}
          />
          <Para>
            References to &ldquo;cookies&rdquo; throughout this policy include all of the above technologies unless otherwise specified.
          </Para>
          <Divider />

          {/* ── Section 2: Cookies we use ── */}
          <H2 id="cookies-we-use">Cookies we use</H2>
          <Para>
            We categorise the cookies we use into four groups based on their purpose. The tables below list every cookie currently deployed by Emithran or its approved third-party providers, grouped by category. We review this list periodically; if we add new cookies we will update this page and, where required by law, seek fresh consent.
          </Para>

          {/* 2.1 Essential */}
          <H3 id="essential">Essential cookies</H3>
          <Para>
            Essential cookies are strictly necessary to provide the core functionality of the Emithran platform. Without them, services such as user authentication and security protections cannot operate. Because they are essential, these cookies are always active and cannot be disabled through our cookie preference centre. You may still block them through your browser, but doing so will prevent the platform from working correctly.
          </Para>
          <CookieTable
            rows={[
              {
                name:     '__session',
                provider: 'Emithran',
                purpose:  'Maintains the authenticated user session so you remain logged in as you navigate the platform.',
                duration: 'Session',
              },
              {
                name:     'csrf_token',
                provider: 'Emithran',
                purpose:  'Cross-Site Request Forgery (CSRF) protection token. Prevents malicious sites from submitting unauthorised requests on your behalf.',
                duration: 'Session',
              },
              {
                name:     'cookieconsent',
                provider: 'Emithran',
                purpose:  'Stores your cookie consent preferences so we do not ask again on every visit.',
                duration: '1 year',
              },
            ]}
          />

          {/* 2.2 Functional */}
          <H3 id="functional">Functional cookies</H3>
          <Para>
            Functional cookies enable enhanced functionality and personalisation. They remember choices you make — such as your preferred language, active workspace, or UI theme — and allow us to provide a more personalised experience. These cookies do not track your browsing activity across other websites. Disabling them means that some personalisation features will not be available and you may need to reset your preferences each time you visit.
          </Para>
          <CookieTable
            rows={[
              {
                name:     'lang_pref',
                provider: 'Emithran',
                purpose:  'Stores your chosen language or locale so the platform displays content in your preferred language on subsequent visits.',
                duration: '1 year',
              },
              {
                name:     'workspace_id',
                provider: 'Emithran',
                purpose:  'Remembers the last workspace you had active so you are returned to the correct workspace context on your next login.',
                duration: '30 days',
              },
              {
                name:     'ui_theme',
                provider: 'Emithran',
                purpose:  'Persists your dark mode or light mode interface preference across sessions.',
                duration: '1 year',
              },
            ]}
          />

          {/* 2.3 Analytics */}
          <H3 id="analytics">Analytics cookies</H3>
          <Para>
            Analytics cookies help us understand how visitors and users interact with our website and platform. The information collected is aggregated and anonymised wherever possible; it helps us identify which features are used most, where users encounter friction, and how to improve our product. We do not use analytics cookie data to build profiles for advertising purposes.
          </Para>
          <CookieTable
            rows={[
              {
                name:     '_ga',
                provider: 'Google Analytics',
                purpose:  'Registers a unique identifier to distinguish users and calculate visit, session, and campaign data for site analytics reports.',
                duration: '2 years',
              },
              {
                name:     '_ga_*',
                provider: 'Google Analytics',
                purpose:  'Used to persist session state and throttle request rates for Google Analytics 4 measurement.',
                duration: '2 years',
              },
              {
                name:     'ph_*',
                provider: 'PostHog',
                purpose:  'Product analytics: captures feature usage events, funnel completion, and user flows within the platform to guide product decisions.',
                duration: '1 year',
              },
              {
                name:     '_hjSession*',
                provider: 'Hotjar',
                purpose:  'Session recording and heatmaps: captures anonymised interaction data (mouse movements, clicks, scrolling) to help us understand usability issues.',
                duration: 'Session',
              },
            ]}
          />

          {/* 2.4 Marketing */}
          <H3 id="marketing">Marketing cookies</H3>
          <Para>
            Marketing cookies are used to measure the effectiveness of our advertising campaigns and to attribute conversions to the correct marketing channel. We do not use these cookies to deliver targeted behavioural advertising on third-party websites. These cookies are only set if you consent to marketing cookies through our cookie banner. You can withdraw consent at any time by updating your preferences.
          </Para>
          <CookieTable
            rows={[
              {
                name:     '_fbp',
                provider: 'Meta (Facebook)',
                purpose:  'Tracks website visits and conversions from Meta advertising. Used to measure the ROI of Meta ad campaigns that direct traffic to emithran.in.',
                duration: '90 days',
              },
              {
                name:     'li_fat_id',
                provider: 'LinkedIn',
                purpose:  'LinkedIn ad attribution and conversion tracking. Records when a user visits the site after seeing a LinkedIn advertisement.',
                duration: '30 days',
              },
              {
                name:     '_gcl_au',
                provider: 'Google Ads',
                purpose:  'Google conversion tracking. Associates a website conversion event (such as a demo request) with a Google Ads click that preceded it.',
                duration: '90 days',
              },
            ]}
          />
          <Divider />

          {/* ── Section 3: Third-party cookies ── */}
          <H2 id="third-party">Third-party cookies</H2>
          <Para>
            Some cookies on the Emithran platform and website are set by third-party services that we integrate with. Emithran does not control these third parties&rsquo; cookies or how they use the information they collect. Each third party&rsquo;s use of your data is governed by their own privacy policies, which we link below.
          </Para>
          <Para>
            The following third-party providers currently set cookies through the Emithran platform or website:
          </Para>
          <Ul
            items={[
              <><Bold>Google Analytics</Bold> (Alphabet Inc.) — website and product analytics. Privacy policy: <TealLink href="https://policies.google.com/privacy">policies.google.com/privacy</TealLink>. Opt out: <TealLink href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Browser Add-on</TealLink>.</>,
              <><Bold>PostHog</Bold> (PostHog Inc.) — product analytics and feature flags. Privacy policy: <TealLink href="https://posthog.com/privacy">posthog.com/privacy</TealLink>. Opt out: available through our cookie preference centre.</>,
              <><Bold>Hotjar</Bold> (Hotjar Ltd.) — session recording and heatmaps. Privacy policy: <TealLink href="https://www.hotjar.com/legal/policies/privacy/">hotjar.com/legal/policies/privacy</TealLink>. Opt out: <TealLink href="https://www.hotjar.com/legal/compliance/opt-out">hotjar.com/legal/compliance/opt-out</TealLink>.</>,
              <><Bold>Meta (Facebook)</Bold> — advertising attribution and conversion measurement. Privacy policy: <TealLink href="https://www.facebook.com/privacy/policy/">facebook.com/privacy/policy</TealLink>. Opt out: <TealLink href="https://www.facebook.com/help/568137493302217">Facebook Ad Preferences</TealLink>.</>,
              <><Bold>LinkedIn</Bold> (Microsoft Corporation) — advertising attribution. Privacy policy: <TealLink href="https://www.linkedin.com/legal/privacy-policy">linkedin.com/legal/privacy-policy</TealLink>. Opt out: <TealLink href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out">LinkedIn Ad Settings</TealLink>.</>,
              <><Bold>Google Ads</Bold> (Alphabet Inc.) — conversion tracking. Privacy policy: <TealLink href="https://policies.google.com/privacy">policies.google.com/privacy</TealLink>. Opt out: <TealLink href="https://adssettings.google.com/">Google Ads Settings</TealLink>.</>,
            ]}
          />
          <Para>
            We periodically review our third-party cookie inventory. If we engage a new third-party provider that sets cookies, we will update the tables in Section 2 and this section before deploying those cookies to our users.
          </Para>
          <Divider />

          {/* ── Section 4: Retention periods ── */}
          <H2 id="retention">Cookie retention periods</H2>
          <Para>
            The duration for which a cookie remains on your device depends on whether it is a <Bold>session cookie</Bold> or a <Bold>persistent cookie</Bold>:
          </Para>
          <SubClause letter="a">
            <Bold>Session cookies</Bold> exist only for the duration of your browser session. They are automatically deleted when you close your browser tab or window. Session cookies are typically used for security-critical functions such as authentication tokens and CSRF protection, where it would be inappropriate to persist them beyond a single session.
          </SubClause>
          <SubClause letter="b">
            <Bold>Persistent cookies</Bold> remain on your device for a defined period — ranging from 30 days for short-lived attribution cookies to 2 years for analytics identifiers — or until you manually delete them. The specific retention period for each cookie is listed in the Duration column of the tables in Section 2.
          </SubClause>
          <Para>
            Retention periods are set to the minimum necessary to fulfil the purpose of each cookie. For example:
          </Para>
          <Ul
            items={[
              'Workspace and preference cookies (30 days to 1 year) are retained long enough to spare you from resetting your preferences on every visit, without persisting indefinitely.',
              'Analytics identifiers (up to 2 years) need a longer lifespan to enable longitudinal analysis of product usage trends — for instance, to understand whether a user who signed up six months ago has adopted a new feature.',
              'Marketing attribution cookies (30–90 days) follow industry-standard windows that correspond to typical B2B sales cycles for manufacturing SaaS products.',
            ]}
          />
          <Para>
            Where a cookie&rsquo;s retention period is renewed on each visit (a &ldquo;rolling expiry&rdquo;), the duration shown in Section 2 reflects the time from your most recent visit, not from initial placement. You can view and manually delete individual cookies at any time using your browser&rsquo;s developer tools or privacy settings.
          </Para>
          <Divider />

          {/* ── Section 5: Managing preferences ── */}
          <H2 id="consent">Managing your preferences</H2>

          <H3 id="consent-banner">Cookie preference centre</H3>
          <Para>
            When you first visit emithran.in or log in to the Emithran platform, we display a cookie consent banner that allows you to accept all cookies, reject non-essential cookies, or customise your preferences by category. You can revisit and update your preferences at any time by clicking the &ldquo;Cookie Settings&rdquo; link in the footer of our website or platform.
          </Para>
          <Para>
            Withdrawing consent does not affect the lawfulness of any processing that took place before withdrawal. Essential cookies remain active regardless of your preference selections because they are necessary for the platform to function.
          </Para>

          <H3 id="consent-browser">Browser-level controls</H3>
          <Para>
            You can also manage cookies directly in your browser. Instructions for the most common browsers are linked below:
          </Para>
          <Ul
            items={[
              <><Bold>Google Chrome:</Bold> <TealLink href="https://support.google.com/chrome/answer/95647">support.google.com/chrome/answer/95647</TealLink></>,
              <><Bold>Mozilla Firefox:</Bold> <TealLink href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop">support.mozilla.org — Enhanced Tracking Protection</TealLink></>,
              <><Bold>Apple Safari:</Bold> <TealLink href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac">support.apple.com — Safari privacy settings</TealLink></>,
              <><Bold>Microsoft Edge:</Bold> <TealLink href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">support.microsoft.com — Delete cookies in Edge</TealLink></>,
              <><Bold>Opera:</Bold> <TealLink href="https://help.opera.com/en/latest/web-preferences/#cookies">help.opera.com — Web preferences</TealLink></>,
            ]}
          />
          <Para>
            Note that blocking or deleting cookies at the browser level will affect all websites, not just Emithran. Blocking essential cookies will prevent you from logging in or using core platform features.
          </Para>

          <H3 id="consent-optout">Third-party opt-out tools</H3>
          <Para>
            For analytics and advertising cookies set by third parties, you can use the dedicated opt-out mechanisms provided by those services:
          </Para>
          <Ul
            items={[
              <><Bold>Google Analytics:</Bold> install the <TealLink href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Browser Add-on</TealLink> to prevent your data from being sent to Google Analytics on all websites.</>,
              <><Bold>Hotjar:</Bold> visit <TealLink href="https://www.hotjar.com/legal/compliance/opt-out">hotjar.com/legal/compliance/opt-out</TealLink> to set a persistent Hotjar opt-out cookie.</>,
              <><Bold>Advertising networks (NAI / DAA):</Bold> use the <TealLink href="https://optout.networkadvertising.org/">Network Advertising Initiative opt-out tool</TealLink> or the <TealLink href="https://optout.aboutads.info/">Digital Advertising Alliance opt-out tool</TealLink> to opt out of interest-based advertising from participating ad networks globally.</>,
              <><Bold>Your Online Choices (EEA/UK):</Bold> visit <TealLink href="https://www.youronlinechoices.com/">youronlinechoices.com</TealLink> to manage advertising preferences from IAB Europe member companies.</>,
            ]}
          />
          <Divider />

          {/* ── Section 6: Do Not Track ── */}
          <H2 id="do-not-track">Do Not Track</H2>
          <Para>
            Some browsers include a &ldquo;Do Not Track&rdquo; (DNT) setting that signals to websites that you do not wish to be tracked across sites. There is currently no universally accepted technical standard for how websites should respond to DNT signals.
          </Para>
          <Para>
            At present, <Bold>Emithran does not alter its cookie or tracking behaviour in response to browser-level DNT signals</Bold>. We take this position because the lack of a common standard means that honoring DNT in some browsers but not others could create inconsistent privacy outcomes for our users.
          </Para>
          <Para>
            Instead, we encourage you to use our <Bold>cookie preference centre</Bold> (accessible via the &ldquo;Cookie Settings&rdquo; link) to exercise granular control over the specific categories of cookies you wish to enable or disable. This gives you more precise control than a generic DNT signal.
          </Para>
          <Para>
            We will revisit this position if a widely adopted DNT standard emerges or if applicable law requires us to honour DNT signals. If you are a California resident, please see our <TealLink href="/privacy">Privacy Policy</TealLink> for information about your rights under the California Consumer Privacy Act (CCPA), including the right to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information.
          </Para>
          <Divider />

          {/* ── Section 7: Updates ── */}
          <H2 id="updates">Policy updates</H2>
          <Para>
            We may update this Cookies Policy from time to time to reflect changes in the cookies we use, changes in applicable law, or improvements to our practices. When we make material changes — for example, adding a new category of cookies or a new third-party provider — we will:
          </Para>
          <SubClause letter="a">update the &ldquo;Last updated&rdquo; date at the top of this page;</SubClause>
          <SubClause letter="b">display an in-app or website notification drawing your attention to the changes for at least 14 days after the update is published; and</SubClause>
          <SubClause letter="c">where required by law (for example, where we intend to use cookies in a materially different way or add a new consent-requiring category), re-request your consent via the cookie banner before the new cookies are set.</SubClause>
          <Para>
            We recommend reviewing this page periodically. The current version is always available at <TealLink href="/cookies">emithran.in/cookies</TealLink>. Archived versions of this policy can be requested by emailing <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink>.
          </Para>
          <Para>
            Minor changes — such as correcting typographical errors, updating cookie names that have not changed in function, or refreshing hyperlinks — may be made without separate notification. The &ldquo;Last updated&rdquo; date will still reflect any change, however small.
          </Para>
          <Divider />

          {/* ── Section 8: Contact ── */}
          <H2 id="contact">Contact us</H2>
          <Para>
            If you have any questions about this Cookies Policy, would like to exercise your privacy rights, or wish to request a copy of a previous version of this policy, please contact us using the details below. We aim to respond to all privacy-related enquiries within 5 business days.
          </Para>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(13,148,136,0.14)' }}
          >
            <div className="p-5 border-b" style={{ background: 'rgba(13,148,136,0.05)', borderColor: 'rgba(13,148,136,0.1)' }}>
              <p className="text-[13.5px] font-semibold" style={{ color: '#0f1b2d' }}>
                Questions about cookies or your privacy?
              </p>
            </div>
            <div className="p-5 flex flex-col gap-3" style={{ background: '#fff' }}>
              {[
                { label: 'Privacy enquiries', email: 'emithran@emuski.com'  },
                { label: 'Legal enquiries',   email: 'emithran@emuski.com'    },
                { label: 'Security reports',  email: 'emithran@emuski.com' },
              ].map(row => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-[12.5px] font-medium w-40 shrink-0" style={{ color: 'rgba(15,27,45,0.55)' }}>
                    {row.label}
                  </span>
                  <a href={`mailto:${row.email}`} className="text-[13px] hover:underline" style={{ color: '#0d9488' }}>
                    {row.email}
                  </a>
                </div>
              ))}
              <div className="pt-1 mt-1 border-t" style={{ borderColor: 'rgba(15,27,45,0.07)' }}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                  <span className="text-[12.5px] font-medium w-40 shrink-0" style={{ color: 'rgba(15,27,45,0.55)' }}>
                    Postal address
                  </span>
                  <p className="text-[13px] leading-[1.7]" style={{ color: 'rgba(15,27,45,0.65)' }}>
                    Emithran Technologies Private Limited<br />
                    Attn: Data Privacy Officer<br />
                    Bangalore, Karnataka, India
                  </p>
                </div>
              </div>
            </div>
          </div>

        </article>
      </div>
    </div>
  )
}

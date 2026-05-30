'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import * as Nav from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────
type NavLink    = { label: string; href: string; badge?: string }
type NavSection = { heading?: string; items: NavLink[] }
type NavEntry   = { label: string; layout: 'simple' | 'mega'; sections: NavSection[] }

// ─── Nav Data ─────────────────────────────────────────────────────────────────
const NAV: NavEntry[] = [
  {
    label: 'Why Emithran?',
    layout: 'simple',
    sections: [{
      items: [
        { label: 'Case Studies',             href: '/case-studies' },
        { label: 'Customer Reviews',         href: '/reviews' },
        { label: 'Manufacturability',        href: '/manufacturability' },
        { label: 'Profitability',            href: '/profitability' },
        { label: 'Sustainability',           href: '/sustainability' },
        { label: 'Unique Platform Features', href: '/features' },
      ],
    }],
  },
  {
    label: 'Solutions',
    layout: 'mega',
    sections: [
      {
        heading: 'By Stage',
        items: [
          { label: 'Enterprises',     href: '/solutions/enterprises' },
          { label: 'Startups / SMBs', href: '/solutions/startups' },
        ],
      },
      {
        heading: 'By Use Case',
        items: [
          { label: 'Manufacturability Analysis', href: '/solutions/manufacturability' },
          { label: 'Cost Optimization',          href: '/solutions/cost' },
          { label: 'Design-to-Cost',             href: '/solutions/design-to-cost' },
          { label: 'Supplier Management',        href: '/solutions/suppliers' },
          { label: 'BOM Analysis',               href: '/solutions/bom' },
          { label: 'Quality Control',            href: '/solutions/quality' },
        ],
      },
      {
        heading: 'By Industry',
        items: [
          { label: 'Automotive',           href: '/industries/automotive' },
          { label: 'Aerospace & Defense',  href: '/industries/aerospace' },
          { label: 'Consumer Electronics', href: '/industries/electronics' },
          { label: 'Medical Devices',      href: '/industries/medical' },
          { label: 'Industrial Equipment', href: '/industries/industrial' },
          { label: 'Defense',              href: '/industries/defense' },
        ],
      },
      {
        heading: 'Ecosystem',
        items: [
          { label: 'Partners',                 href: '/partners' },
          { label: 'Integrations Marketplace', href: '/integrations' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    layout: 'mega',
    sections: [
      {
        heading: 'Products',
        items: [
          { label: 'aiSource',     href: '/platform/aisource',  badge: 'NEW' },
          { label: 'aP Design',    href: '/platform/design' },
          { label: 'aP Pro',       href: '/platform/pro' },
          { label: 'aP Generate',  href: '/platform/generate' },
          { label: 'aP Workspace', href: '/platform/workspace' },
          { label: 'aP Analytics', href: '/platform/analytics' },
        ],
      },
      {
        heading: 'Services',
        items: [
          { label: 'Expert Services', href: '/services/expert' },
          { label: 'Training',        href: '/services/training' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    layout: 'mega',
    sections: [
      {
        heading: 'Learn',
        items: [
          { label: 'Blog',             href: '/blog' },
          { label: 'Customer Stories', href: '/customers' },
          { label: 'Guides',           href: '/guides' },
        ],
      },
      {
        heading: 'Support',
        items: [
          { label: 'Get Support',           href: '/support' },
          { label: 'Managed Support Plans', href: '/support/managed' },
          { label: 'Professional Services', href: '/services/professional' },
        ],
      },
      {
        heading: 'Company',
        items: [
          { label: 'Product Roadmap',   href: '/roadmap' },
          { label: 'Annual Conference', href: '/conference' },
          { label: 'Jobs',              href: '/careers' },
          { label: 'Newsroom',          href: '/news' },
        ],
      },
      {
        heading: 'Contact',
        items: [
          { label: 'Contact Sales',    href: '/contact' },
          { label: 'Become a Partner', href: '/partners/apply' },
        ],
      },
      {
        heading: 'Manufacturing Insights',
        items: [
          { label: 'CAD to Cost',                  href: '/insights/cad-to-cost' },
          { label: 'Digital Factories',            href: '/insights/digital-factories' },
          { label: 'Manufacturing Process Models', href: '/insights/process-models' },
          { label: 'Regional Data Libraries',      href: '/insights/regional-data' },
          { label: 'Bulk Costing & Analysis',      href: '/insights/bulk-costing' },
          { label: 'Simulation',                   href: '/insights/simulation' },
          { label: 'Integrations',                 href: '/insights/integrations' },
        ],
      },
    ],
  },
  {
    label: 'About',
    layout: 'simple',
    sections: [{
      items: [
        { label: 'About Us',       href: '/about' },
        { label: 'Careers',        href: '/careers' },
        { label: 'Contact',        href: '/contact' },
        { label: 'Leadership',     href: '/about/leadership' },
        { label: 'News & Events',  href: '/news' },
        { label: 'Partners',       href: '/partners' },
        { label: 'Request a Demo', href: '#demo' },
        { label: 'Security',       href: '/security' },
        { label: 'Support',        href: '/support' },
      ],
    }],
  },
]

// ─── Panel components ─────────────────────────────────────────────────────────

function SimplePanel({ sections }: { sections: NavSection[] }) {
  return (
    <div className="p-3 min-w-[220px]">
      {sections.map((sec, si) => (
        <div key={si} className={si > 0 ? 'mt-3 pt-3 border-t border-black/6' : ''}>
          {sec.heading && (
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-black/35">
              {sec.heading}
            </p>
          )}
          {sec.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-md px-2 py-2 text-[13px] font-medium text-black/65 hover:bg-black/[0.04] hover:text-black transition-colors"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-700 leading-none">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

const colClass: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
}

function MegaPanel({ sections }: { sections: NavSection[] }) {
  const cols = colClass[sections.length] ?? 'grid-cols-4'
  return (
    <div className={`grid ${cols} gap-x-8 gap-y-1 p-6 min-w-[400px]`}>
      {sections.map((sec, si) => (
        <div key={si}>
          {sec.heading && (
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-black/35">
              {sec.heading}
            </p>
          )}
          <ul className="space-y-0.5">
            {sec.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] font-medium text-black/65 hover:bg-black/[0.04] hover:text-black transition-colors"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-700 leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/" prefetch={false} className="flex items-center gap-1.5 shrink-0">
      <img src="/assets/logo/logo-black.png" alt="Emithran" className="h-7 w-7" />
      <span className="font-display text-[17px] font-semibold tracking-tight text-[#080808]">
        EMITHRAN
      </span>
    </Link>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleSection = (label: string) =>
    setOpenSection(prev => (prev === label ? null : label))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-black/8 transition-all duration-200',
        scrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-md',
      )}
    >
      {/* ──────────────────── Desktop ──────────────────── */}
      <Nav.Root className="relative hidden md:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3">
          <Logo />

          <Nav.List className="flex items-center gap-0.5">
            {NAV.map((entry) => (
              <Nav.Item
                key={entry.label}
                className={entry.layout === 'simple' ? 'relative' : undefined}
              >
                <Nav.Trigger
                  className={cn(
                    'group flex items-center gap-1 rounded-md px-2.5 py-2 outline-none select-none',
                    'text-[13px] font-medium text-black/60 whitespace-nowrap',
                    'hover:text-black hover:bg-black/5 transition-colors',
                    'data-[state=open]:text-black data-[state=open]:bg-black/5',
                  )}
                >
                  {entry.label}
                  <ChevronDown
                    className="h-3.5 w-3.5 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </Nav.Trigger>

                {entry.layout === 'simple' ? (
                  // Compact dropdown — positioned under its own trigger
                  <Nav.Content className="absolute left-0 top-full z-50 pt-2 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out">
                    <div className="rounded-xl border border-black/8 bg-white shadow-xl overflow-hidden">
                      <SimplePanel sections={entry.sections} />
                    </div>
                  </Nav.Content>
                ) : (
                  // Mega dropdown — fixed full viewport width below the nav bar
                  <Nav.Content className="fixed inset-x-0 top-[53px] z-50 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out">
                    <div className="border-b border-black/8 bg-white shadow-xl">
                      <div className="mx-auto max-w-[1280px] px-6">
                        <MegaPanel sections={entry.sections} />
                      </div>
                    </div>
                  </Nav.Content>
                )}
              </Nav.Item>
            ))}
          </Nav.List>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="/contact"
              className="rounded-md border border-black/15 px-4 py-2 text-[13px] font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors whitespace-nowrap"
            >
              Contact Us
            </a>
            <a
              href="#demo"
              className="rounded-md px-4 py-2 text-[13px] font-semibold text-white hover:opacity-85 transition-opacity whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
            >
              Request a Demo
            </a>
          </div>
        </div>
      </Nav.Root>

      {/* ──────────────────── Mobile ──────────────────── */}
      <div className="md:hidden">
        <div className="mx-4 flex items-center justify-between py-3.5">
          <Logo />
          <button
            onClick={() => { setMobileOpen(o => !o); setOpenSection(null) }}
            className="rounded-md p-1.5 text-[#080808] hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="mx-3 mb-3 rounded-xl border border-black/8 bg-white shadow-lg overflow-hidden">
            {NAV.map((entry) => (
              <div key={entry.label} className="border-b border-black/6 last:border-0">
                <button
                  onClick={() => toggleSection(entry.label)}
                  className="flex w-full items-center justify-between px-4 py-3 text-[13px] font-medium text-black/65 hover:text-black hover:bg-black/[0.03] transition-colors"
                >
                  {entry.label}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 opacity-45 transition-transform duration-200',
                      openSection === entry.label && 'rotate-180',
                    )}
                  />
                </button>

                {openSection === entry.label && (
                  <div className="border-t border-black/6 bg-black/[0.015] pb-2">
                    {entry.sections.map((sec, si) => (
                      <div key={si} className="pt-2">
                        {sec.heading && (
                          <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-black/35">
                            {sec.heading}
                          </p>
                        )}
                        {sec.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between px-6 py-2 text-[13px] text-black/55 hover:text-black hover:bg-black/[0.04] transition-colors"
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-700 leading-none">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="p-3 flex flex-col gap-2">
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-md border border-black/15 px-4 py-2.5 text-center text-[13px] font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#demo"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-md px-4 py-2.5 text-center text-[13px] font-semibold text-white hover:opacity-85 transition-opacity"
                style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
              >
                Request a Demo
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

<<<<<<< HEAD
const items = [
  { label: 'Why Emithran?', href: '/why-emithran' },
  { label: 'Solutions',     href: '/solutions' },
  { label: 'Products',      href: '/products' },
  { label: 'Pricing',       href: '/pricing' },
  { label: 'About',         href: '/about' },
  { label: 'Resources',     href: '/resources' },
]

=======
// ─── Types ────────────────────────────────────────────────────────────────────
type NavLink    = { label: string; href: string; badge?: string }
type NavSection = { heading?: string; items: NavLink[] }
type NavEntry   = { label: string; layout: 'simple' | 'mega'; sections: NavSection[]; wide?: boolean }

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
          { label: 'OEMs & Primes',    href: '/solutions/oems' },
          { label: 'Tier-1 Suppliers', href: '/solutions/tier1' },
          { label: 'Startups & SMBs',  href: '/solutions/startups' },
        ],
      },
      {
        heading: 'By Use Case',
        items: [
          { label: 'Design & Manufacturability', href: '/solutions#design' },
          { label: 'Should Cost Analysis',       href: '/solutions#cost' },
          { label: 'Supplier Intelligence',      href: '/solutions#supplier' },
          { label: 'Risk & Compliance',          href: '/solutions#risk' },
          { label: 'VAVE',                       href: '/solutions#vave' },
          { label: 'Production Tracking',        href: '/solutions#tracking' },
        ],
      },
      {
        heading: 'By Industry',
        items: [
          { label: 'Space',                  href: '/industries/space' },
          { label: 'Defence',               href: '/industries/defence' },
          { label: 'Aerospace',             href: '/industries/aerospace' },
          { label: 'Precision Manufacturing', href: '/industries/precision' },
        ],
      },
      {
        heading: 'Ecosystem',
        items: [
          { label: 'Partners',     href: '/partners' },
          { label: 'Integrations', href: '/integrations' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    layout: 'mega',
    sections: [
      {
        heading: 'Design',
        items: [
          { label: 'BOM Composer',      href: '/platform/bom-composer' },
          { label: 'Should-Cost Engine', href: '/platform/should-cost-engine' },
          { label: 'VAVE Studio',        href: '/platform/vave-studio' },
        ],
      },
      {
        heading: 'Build',
        items: [
          { label: 'Supplier Radar', href: '/platform/supplier-radar' },
          { label: 'Vendor Match',   href: '/platform/vendor-match' },
          { label: 'Launch Tracker', href: '/platform/launch-tracker' },
          { label: 'Quality Guard',  href: '/platform/quality-guard' },
        ],
      },
      {
        heading: 'Ship',
        items: [
          { label: 'Shipment Hub',    href: '/platform/shipment-hub' },
          { label: 'Cost Benchmarker', href: '/platform/cost-benchmarker' },
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
        heading: 'Platform',
        items: [
          { label: 'CAD to Cost',           href: '/platform#cad-to-cost' },
          { label: 'Should Cost Analysis',  href: '/platform#should-cost' },
          { label: 'Supplier Intelligence', href: '/platform#supplier-intelligence' },
          { label: 'Production Tracking',   href: '/platform#production-tracking' },
          { label: 'Quality & PPAP',        href: '/platform#quality' },
          { label: 'Analytics',             href: '/platform#analytics' },
        ],
      },
    ],
  },
  {
    label: 'About',
    layout: 'simple',
    wide: true,
    sections: [{
      items: [
        { label: 'About Us',        href: '/about' },
        { label: 'Careers',         href: '/careers' },
        { label: 'Contact',         href: '/contact' },
        { label: 'Leadership',      href: '/about/leadership' },
        { label: 'News & Events',   href: '/news' },
        { label: 'Partners',        href: '/partners' },
        { label: 'Request a Demo',  href: '#demo' },
        { label: 'Security',        href: '/security' },
        { label: 'Support',         href: '/support' },
      ],
    }],
  },
]

// ─── Panel components ─────────────────────────────────────────────────────────

function SimplePanel({ sections, wide }: { sections: NavSection[]; wide?: boolean }) {
  return (
    <div className={cn('p-2', wide ? 'min-w-[380px]' : 'min-w-[220px]')}>
      {sections.map((sec, si) => (
        <div key={si} className={si > 0 ? 'mt-2 pt-2 border-t border-black/6' : ''}>
          {sec.heading && (
            <p className="mb-0.5 px-3 pt-1 text-[10px] font-semibold uppercase tracking-widest text-black/35">
              {sec.heading}
            </p>
          )}
          <div className={cn(wide && 'grid grid-cols-2 gap-x-1')}>
            {sec.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-md px-3 py-2 text-[13px] font-medium text-black/65 hover:bg-black/[0.04] hover:text-black transition-colors"
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
    <div className={`grid ${cols} gap-x-8 py-6`}>
      {sections.map((sec, si) => (
        <div key={si}>
          {sec.heading && (
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-black/35">
              {sec.heading}
            </p>
          )}
          <ul>
            {sec.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] font-medium text-black/65 hover:bg-black/[0.04] hover:text-black transition-colors"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-700 leading-none">
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

>>>>>>> b0c6142 (balance)
export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/8 bg-white/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" prefetch={false} className="flex items-center gap-1.5">
          <img src="/assets/logo/logo-black.png" alt="Emithran" className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-[#080808]">
            EMITHRAN
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

<<<<<<< HEAD
        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/contact"
            className="rounded-md border border-black/15 px-4 py-2 text-sm font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors whitespace-nowrap"
=======
                {entry.layout === 'simple' ? (
                  <Nav.Content className="absolute left-0 top-full z-50 pt-2 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out">
                    <div className="rounded-xl border border-black/8 bg-white shadow-xl overflow-hidden">
                      <SimplePanel sections={entry.sections} wide={entry.wide} />
                    </div>
                  </Nav.Content>
                ) : (
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
>>>>>>> b0c6142 (balance)
          >
            Contact Us
          </a>
          <a
            href="#demo"
            className="rounded-md px-4 py-2 text-sm font-semibold text-white hover:opacity-85 transition-opacity whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}
          >
            Request a Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#080808]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-4 mb-2 rounded-xl border border-black/8 bg-white p-4 shadow-lg md:hidden">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/contact"
            className="mt-2 block w-full rounded-md px-4 py-2.5 text-center text-sm font-semibold text-[#0d1117] border border-black/15 hover:bg-black/[0.04] transition-colors"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </a>
          <a
            href="#demo"
            className="mt-2 block w-full rounded-md px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-85 transition-opacity"
            style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}
            onClick={() => setOpen(false)}
          >
            Request a Demo
          </a>
        </div>
      )}
    </header>
  )
}

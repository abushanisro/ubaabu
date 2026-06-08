'use client'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'

type DropdownItem = { label: string; href: string }
type NavItem = {
  label: string
  href?: string
  children?: DropdownItem[]
}

const items: NavItem[] = [
  { label: 'Why Emithran?', href: '/why-emithran' },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'Partners', href: '/about/partners' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Products', href: '/products' },
      { label: 'Training', href: '/products/training' },
      { label: 'Engineering Support', href: '/products/engineering-support' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background:     scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,1)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom:   '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" prefetch={false} className="flex items-center gap-1">
          <img src="/assets/infographics/logo/logo-white.png" alt="Emithran" className="h-8 w-auto" />
          <span className="font-display text-lg font-semibold tracking-tight text-[#080808]">EMITHRAN</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {items.map((item) =>
            item.children ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors whitespace-nowrap"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${hoveredItem === item.label ? 'rotate-180' : ''}`}
                  />
                </a>
                {hoveredItem === item.label && (
                  <div className="absolute left-0 top-full z-50 mt-0 min-w-[190px] rounded-xl border border-black/8 bg-white py-1.5 shadow-xl">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/contact"
            className="rounded-md border border-black/15 px-4 py-2 text-sm font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors whitespace-nowrap"
          >
            Contact Us
          </a>
          <a
            href="/request-demo"
            className="rounded-md px-4 py-2 text-sm font-semibold text-white hover:opacity-85 transition-opacity whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}
          >
            Request Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#080808]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-4 mb-2 rounded-xl border border-black/8 bg-white p-4 shadow-lg md:hidden">
          {items.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileExpanded === item.label && (
                  <div className="ml-3 mt-0.5 mb-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-black/50 hover:text-black hover:bg-black/5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="/contact"
            className="mt-2 block w-full rounded-md px-4 py-2.5 text-center text-sm font-semibold text-[#0d1117] border border-black/15 hover:bg-black/[0.04] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </a>
          <a
            href="/contact"
            className="mt-2 block w-full rounded-md px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-85 transition-opacity"
            style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}
            onClick={() => setMobileOpen(false)}
          >
            Request Demo
          </a>
        </div>
      )}
    </header>
  )
}

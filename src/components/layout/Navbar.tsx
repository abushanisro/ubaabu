'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const items = [
  { label: 'Why Emithran?', href: '/why-emithran' },
  { label: 'Solutions',     href: '/solutions' },
  { label: 'Products',      href: '/products' },
  { label: 'Pricing',       href: '/pricing' },
  { label: 'About',         href: '/about' },
  { label: 'Resources',     href: '/resources' },
]

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

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/contact"
            className="rounded-md border border-black/15 px-4 py-2 text-sm font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors whitespace-nowrap"
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

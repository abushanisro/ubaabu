'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const items = [
  { label: 'Capabilities' },
  { label: 'Industries' },
  { label: 'Platform' },
  { label: 'Resources' },
  { label: 'Company' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="inline-block h-6 w-6 rounded-md bg-[var(--ink)]" />
          EMITHRAN
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {items.map((i) => (
            <li key={i.label}>
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-[var(--ink)] hover:bg-black/5">
                {i.label}
                <ChevronDown size={14} className="opacity-60" />
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          <button className="rounded-md px-3 py-2 text-sm font-medium hover:bg-black/5">Sign in</button>
          <button className="btn-primary text-sm">Contact sales →</button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="mx-4 rounded-2xl bg-white p-4 shadow-xl md:hidden">
          {items.map((i) => (
            <button key={i.label} className="block w-full rounded-md px-3 py-3 text-left text-sm font-medium hover:bg-black/5">
              {i.label}
            </button>
          ))}
          <button className="btn-primary mt-2 w-full justify-center text-sm">Contact sales</button>
        </div>
      )}
    </header>
  )
}

'use client'

import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const CATEGORIES = ['Core', 'Sourcing', 'Supply Chain', 'Operational'] as const
type Category = typeof CATEGORIES[number]

type Cell = true | 'double' | false | string
interface Row { label: string; cells: [Cell, Cell, Cell] }
interface Section { category: Category; rows: Row[] }

const SECTIONS: Section[] = [
  {
    category: 'Core',
    rows: [
      { label: 'BOM Management',       cells: [true,          true,        true]          },
      { label: 'Live DFM Feedback',    cells: [true,          'double',    'double']      },
      { label: 'Should-Cost Modeling', cells: ['Design phase', 'Full',     'Full']        },
    ],
  },
  {
    category: 'Sourcing',
    rows: [
      { label: 'Supplier Shortlisting', cells: [false, true, 'double'] },
      { label: 'Quote Benchmarking',    cells: [false, true, 'double'] },
    ],
  },
  {
    category: 'Supply Chain',
    rows: [
      { label: 'VAVE Automation',            cells: [false, false, true] },
      { label: 'Real-Time Project Tracking', cells: [false, false, true] },
      { label: 'Quality Control',            cells: [false, false, true] },
      { label: 'Delivery Risk Alerts',       cells: [false, false, true] },
    ],
  },
  {
    category: 'Operational',
    rows: [
      { label: 'Team Size', cells: ['Up to 8',      'Up to 12',  'Up to 25+']          },
      { label: 'Support',   cells: ['Email / Chat', 'Priority',  'Dedicated Manager']  },
    ],
  },
]

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check className="size-4 text-[#0d9488]" aria-hidden />
      </div>
    )
  }
  if (value === 'double') {
    return (
      <div className="flex justify-center">
        <Check className="size-4 text-[#0d9488]" aria-hidden />
        <Check className="-ml-2 size-4 text-[#2dd4bf]" aria-hidden />
      </div>
    )
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <Minus className="size-4 text-[#0f1b2d]/25" aria-hidden />
      </div>
    )
  }
  return <div className="text-center text-xs text-[#0f1b2d]/60">{value}</div>
}

export default function PricingCompare() {
  const [active, setActive] = useState<Category>('Core')

  const scrollTo = (cat: Category) => {
    setActive(cat)
    document.getElementById(`cmp-${cat}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="compare" className="pricing-section bg-[#f0fdf9]">
      <div className="mx-auto max-w-[1200px] px-6 py-14">

        {/* Header */}
        <AnimateIn>
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-medium text-[#0d9488]">Compare</p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#0f1b2d] md:text-4xl">
                {"What's included in each package."}
              </h2>
            </div>
            <p className="self-end text-sm text-[#0f1b2d]/50 md:max-w-md">
              A side-by-side view of every capability across the three packages. Jump to a category using the navigation on the left.
            </p>
          </div>
        </AnimateIn>

        {/* Body */}
        <AnimateIn delay={0.1}>
          <div className="grid gap-8 md:grid-cols-[200px_1fr]">

            {/* Sidebar */}
            <aside className="md:sticky md:top-24 md:self-start">
              <ul className="flex gap-2 overflow-x-auto md:flex-col md:gap-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => scrollTo(cat)}
                      className={`w-full whitespace-nowrap rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        active === cat
                          ? 'bg-[#0d9488]/[0.1] font-medium text-[#0f1b2d]'
                          : 'text-[#0f1b2d]/50 hover:text-[#0f1b2d]'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              <a
                href="/contact?source=pricing&cta=download-comparison"
                className="mt-6 hidden text-xs font-medium text-[#0d9488] hover:underline md:inline-flex"
              >
                Download comparison PDF →
              </a>
            </aside>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">

              {/* Column headers */}
              <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-black/[0.08] bg-[#0d9488]/[0.07] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#0f1b2d]/50">
                <div>Capability</div>
                <div className="text-center">Design</div>
                <div className="text-center">Sourcing</div>
                <div className="text-center">Supply Chain</div>
              </div>

              {/* Sections */}
              {SECTIONS.map(({ category, rows }) => (
                <div key={category} id={`cmp-${category}`}>
                  <div className="border-b border-black/[0.08] bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#0f1b2d]">
                    {category}
                  </div>
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center border-b border-black/[0.05] px-6 py-4 text-sm transition-colors last:border-b-0 hover:bg-[#0d9488]/[0.04]"
                    >
                      <div className="font-medium text-[#0f1b2d]">{row.label}</div>
                      {row.cells.map((cell, i) => (
                        <CellValue key={i} value={cell} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}

            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

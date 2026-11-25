import type { Metadata } from 'next'
import Link from 'next/link'
import { PILLARS, itemsForPillar } from '@/lib/topics'
import { pageOpenGraph } from '@/lib/seo'

const TITLE = 'Manufacturing Cost & Sourcing Topics'
const DESCRIPTION =
  'Browse Emithran’s guides by topic: should-cost, process costing, DFM and VAVE, BOMs, supplier risk, sourcing, aerospace and defence, India manufacturing and AI.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/topics' },
  openGraph: pageOpenGraph('/topics', `${TITLE} | Emithran`, DESCRIPTION),
}

export default function TopicsIndexPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Topics</h1>
        <p className="mt-4 max-w-3xl text-black/60">
          Twelve topic hubs that bring together every guide, glossary term, template, case study and product page on a subject.
          Pick the problem you are working on and start from its hub.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <li key={p.slug}>
              <Link href={`/topics/${p.slug}`} className="block h-full rounded-xl border border-black/10 p-6 hover:border-[#0d9488]/40">
                <h2 className="text-lg font-bold">{p.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-black/60">{p.summary}</p>
                <p className="mt-3 text-[13px] font-semibold text-[#0d9488]">{itemsForPillar(p.slug).length} resources →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

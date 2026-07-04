import Link from 'next/link'
import type { Metadata } from 'next'
import { GLOSSARY_TERMS } from '@/components/seo/seoRoadmapData'

export const metadata: Metadata = {
  title: 'Manufacturing SEO Glossary | Emithran',
  description: 'Glossary of manufacturing intelligence, should-cost, BOM, sourcing, procurement, and supplier intelligence terms.',
  alternates: { canonical: '/glossary' },
}

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Manufacturing intelligence glossary</h1>
        <p className="mt-4 max-w-3xl text-black/60">
          Definitions for cost engineering, BOM management, sourcing, supplier intelligence, and manufacturing analytics teams.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GLOSSARY_TERMS.map((term) => (
            <Link key={term.slug} href={`/glossary/${term.slug}`} className="rounded-xl border border-black/10 p-4 text-sm font-semibold hover:border-[#0d9488]/40 hover:text-[#0d9488]">
              {term.term}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

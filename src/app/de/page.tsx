import Link from 'next/link'
import type { Metadata } from 'next'
import { DE_PAGES } from '@/components/seo/seoRoadmapData'

export const metadata: Metadata = {
  title: 'Emithran Deutschland Pilot',
  description: 'German-language pilot hub for Emithran should-cost analysis, supplier intelligence, and manufacturing benchmarking.',
  alternates: { canonical: '/de' },
}

export default function GermanPilotPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">Deutschland Pilot</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
          Fertigungsintelligenz fuer Kosten, Lieferanten und BOMs.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60">
          Emithran hilft deutschen Fertigungsteams, Kostenmodelle, Lieferantenvergleiche und indisch-europaeische Sourcing-Entscheidungen strukturiert zu bewerten.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {DE_PAGES.map((page) => (
            <Link key={page.slug} href={`/de/${page.slug}`} className="rounded-xl border border-black/10 p-6 hover:border-[#0d9488]/40">
              <h2 className="text-xl font-bold">{page.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/60">{page.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

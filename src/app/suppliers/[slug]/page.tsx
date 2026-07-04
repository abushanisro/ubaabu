import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PROGRAMMATIC_SUPPLIER_PAGES } from '@/components/seo/seoRoadmapData'

export function generateStaticParams() {
  return PROGRAMMATIC_SUPPLIER_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = PROGRAMMATIC_SUPPLIER_PAGES.find((item) => item.slug === slug)
  if (!page) return {}

  return {
    title: page.title,
    description: `Find and benchmark ${page.process.replace(/-/g, ' ')} suppliers in ${page.region.replace(/-/g, ' ')} with Emithran supplier intelligence.`,
    alternates: { canonical: `/suppliers/${page.slug}` },
    robots: { index: false, follow: true },
  }
}

export default async function SupplierProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = PROGRAMMATIC_SUPPLIER_PAGES.find((item) => item.slug === slug)
  if (!page) notFound()

  const process = page.process.replace(/-/g, ' ')
  const region = page.region.replace(/-/g, ' ')

  return (
    <main className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">Supplier intelligence</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight capitalize">
          {process} suppliers in {region}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60">
          Use Emithran Supplier Radar to identify qualified {process} suppliers in {region}, compare capability, certification, delivery risk, and should-cost fit before releasing an RFQ.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ['Capability', 'Process capability, equipment class, materials handled, and programme fit.'],
            ['Risk', 'Certification, capacity, geography, single-source exposure, and quality history.'],
            ['Cost', 'Regional should-cost benchmarks, landed cost assumptions, and negotiation targets.'],
          ].map(([heading, body]) => (
            <section key={heading} className="rounded-xl border border-[#0d9488]/15 bg-[#0d9488]/5 p-6">
              <h2 className="text-lg font-bold">{heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/60">{body}</p>
            </section>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link href="/supplier-intelligence" className="inline-flex rounded-xl border border-[#0d9488]/25 px-6 py-3 text-sm font-semibold text-[#0d9488]">
            Explore Supplier Radar
          </Link>
          <Link href="/request-demo" className="inline-flex rounded-xl bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white">
            Request a Demo
          </Link>
        </div>
      </div>
    </main>
  )
}

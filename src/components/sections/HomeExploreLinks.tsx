import Link from 'next/link'

const LINKS = [
  {
    href: '/should-cost-analysis-software',
    title: 'Should-Cost Analysis Software',
    body: 'Bottom-up cost models for machined, cast, forged and fabricated parts, with negotiation briefs you can take to suppliers.',
  },
  {
    href: '/bom-management-software',
    title: 'BOM Management Software',
    body: 'Import, validate and enrich multi-level BOMs, then cost them with the same engine.',
  },
  {
    href: '/supplier-intelligence',
    title: 'Supplier Intelligence',
    body: 'Qualify and compare suppliers across capability, certification, capacity and risk before you release an RFQ.',
  },
  {
    href: '/defence-manufacturing',
    title: 'Defence Manufacturing',
    body: 'Programme-level cost visibility, supplier qualification and should-cost for indigenisation.',
  },
  {
    href: '/aerospace-cost-engineering',
    title: 'Aerospace Cost Engineering',
    body: 'Should-cost modelling, AS9100 supplier qualification and multi-level aerospace BOMs.',
  },
  {
    href: '/case-studies',
    title: 'Case Studies',
    body: 'Chassis, axle, exhaust, electronics and cab programmes, with the numbers behind each result.',
  },
]

export default function HomeExploreLinks() {
  return (
    <section className="bg-white py-10 md:py-16" aria-labelledby="explore-emithran-heading">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">Explore Emithran</p>
        <h2 id="explore-emithran-heading" className="max-w-2xl text-2xl font-bold tracking-tight text-[#0f1b2d] md:text-3xl">
          Cost, BOM and supplier intelligence for engineered products
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-black/[0.08] bg-white p-5 transition-all hover:border-[#0d9488]/40 hover:shadow-md"
            >
              <h3 className="text-[15px] font-bold text-[#0f1b2d] transition-colors group-hover:text-[#0d9488]">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-black/55">{item.body}</p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-black/55">
          Comparing tools?{' '}
          <Link href="/emithran-vs-apriori" className="font-semibold text-[#0d9488] hover:underline">Emithran vs aPriori</Link>
          {' · '}
          <Link href="/emithran-vs-costimator" className="font-semibold text-[#0d9488] hover:underline">Emithran vs Costimator</Link>
        </p>
      </div>
    </section>
  )
}

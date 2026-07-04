import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import SectionLabel from '@/components/ui/SectionLabel'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Aerospace Cost Engineering Software India | Emithran',
  description:
    "Aerospace cost engineering software for India's aviation OEMs, MRO providers, and space manufacturers. Should-cost modelling, BOM management, and supplier intelligence for AS9100-certified supply chains.",
  keywords: [
    'aerospace cost engineering india', 'aerospace cost engineering software',
    'aviation manufacturing cost analysis', 'aerospace should cost tool india',
    'AS9100 supplier intelligence india', 'aerospace BOM management',
    'MRO cost analysis india', 'aerospace procurement software',
    'aircraft component cost modelling', 'space manufacturing cost engineering',
  ],
  alternates: { canonical: '/aerospace-cost-engineering' },
  openGraph: {
    title: 'Aerospace Cost Engineering Software India | Emithran',
    description: "Should-cost modelling, BOM management, and supplier intelligence for India's aerospace and aviation supply chains.",
    url: '/aerospace-cost-engineering',
    type: 'website',
  },
  twitter: {
    title: 'Aerospace Cost Engineering Software India | Emithran',
    description: "Should-cost modelling and supplier intelligence for India's aerospace OEMs. Trusted by Pixxel, Digantara, and leading aviation manufacturers.",
  },
}

const features = [
  {
    title: 'Aerospace Should-Cost Modelling',
    body: 'Bottom-up cost models for aerospace components - from structural frames and fasteners to avionics sub-assemblies. Model India vs European or US manufacturing costs side by side.',
  },
  {
    title: 'AS9100 Supplier Qualification',
    body: 'Filter the 72,000+ supplier database by AS9100, NADCAP, and aerospace-specific certifications. Qualification status and audit history visible before you shortlist.',
  },
  {
    title: 'Multi-Level Aerospace BOM',
    body: 'Manage complex aircraft and satellite BOMs with full configuration control, variant management, and effectivity tracking across design and production phases.',
  },
  {
    title: 'MRO Cost Intelligence',
    body: 'Should-cost models for MRO activities - labour, consumables, tooling, and overhaul scopes. Use data to benchmark MRO providers and set fair work-order targets.',
  },
  {
    title: 'VAVE for Aerospace',
    body: 'Identify cost reduction opportunities without compromising structural integrity or airworthiness. Design, material, process, and supplier VAVE ideas tracked to closure.',
  },
  {
    title: 'NewSpace + Satellite Hardware',
    body: 'Purpose-built for commercial space manufacturers. Manage satellite sub-assembly BOMs and should-cost models alongside ground segment and launch programme costs.',
  },
]

const stats = [
  { value: '72K+', label: 'verified Indian suppliers searchable by aerospace certification and process capability' },
  { value: '131kg', label: 'mass saving quantified on HGV CAB structure by switching from steel to composite - same cost engineering methodology applied to aerospace' },
  { value: '99.4%', label: 'BOM accuracy rate on active aerospace and space programmes managed on the platform' },
]

const faqs = [
  {
    q: 'What is aerospace cost engineering software?',
    a: "Aerospace cost engineering software builds bottom-up should-cost models for aircraft, satellite, and aviation components, and connects those models to AS9100- and NADCAP-qualified supplier intelligence and multi-level BOM management. Emithran is built specifically for India's aerospace and space manufacturing context.",
  },
  {
    q: 'Can Emithran cost aerospace components against India vs Europe or US manufacturing?',
    a: 'Yes. Should-cost models can compare the same aerospace component manufactured in India against European or US manufacturing, using region-specific labour, material, and overhead rates.',
  },
  {
    q: 'Does Emithran support MRO cost analysis, not just new manufacturing?',
    a: 'Yes. Should-cost models extend to MRO activities, covering labour, consumables, tooling, and overhaul scopes, which can be used to benchmark MRO providers and set fair work-order targets.',
  },
  {
    q: 'How does supplier qualification work for aerospace-specific certifications?',
    a: 'The supplier database can be filtered by AS9100, NADCAP, and other aerospace-specific certifications, with qualification status and audit history visible before you shortlist a supplier.',
  },
  {
    q: 'Is Emithran suitable for NewSpace and satellite manufacturers, not just aviation?',
    a: 'Yes. The platform manages satellite sub-assembly BOMs and should-cost models alongside ground segment and launch programme costs, and is used by commercial NewSpace manufacturers as well as traditional aviation OEMs.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Emithran Aerospace Cost Engineering',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${siteUrl}/aerospace-cost-engineering`,
  description: "Aerospace cost engineering software for India's aviation OEMs, MRO providers, and space manufacturers, covering should-cost modelling, BOM management, and supplier intelligence for AS9100-certified supply chains.",
  provider: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free pilot available' },
  featureList: features.map((f) => f.title),
}

export default function AerospaceCostEngineeringPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PageHero
        eyebrow="Aerospace Cost Engineering - India"
        title="Cost intelligence for India's aerospace and space manufacturers."
        subtitle="Emithran gives aerospace OEMs, satellite manufacturers, and aviation component suppliers the cost engineering tools to compete globally - with should-cost models, AS9100-qualified supplier intelligence, and BOM management built for the complexity of aerospace programmes."
      />

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Platform capabilities</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-[0.95] tracking-tight max-w-3xl mb-16">
            Every tool aerospace cost engineers need in one platform.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {features.map((f) => (
              <div key={f.title} className="bg-[#0a0a0a] p-8 lg:p-10">
                <h3 className="font-display text-[20px] mb-3" style={{ color: '#2dd4bf' }}>{f.title}</h3>
                <p className="font-mono text-[13px] text-white/60 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Results</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            {stats.map((s) => (
              <div key={s.value}>
                <p className="font-display text-[56px] lg:text-[72px] leading-none tracking-tight" style={{ color: '#2dd4bf' }}>{s.value}</p>
                <p className="font-mono text-[13px] text-white/60 leading-relaxed mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Industry coverage</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[48px] leading-[0.95] max-w-2xl mb-10">
            Across India's full aerospace and space ecosystem.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[13px] text-white/70">
            {[
              'Commercial NewSpace - satellite bus, payload, and ground systems',
              'ISRO supply chain - structural, propulsion, and avionics suppliers',
              'Civil aviation MRO - engine overhaul, airframe, and component MRO',
              'Helicopter and UAV manufacturers and their Tier-1 suppliers',
              'Avionics and embedded systems OEMs for aviation programmes',
              'Aerospace composite and machined component suppliers',
            ].map((u) => (
              <div key={u} className="flex gap-3 items-start">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />
                {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display text-white text-[32px] lg:text-[40px] leading-[0.95] mb-10">
            Common questions about aerospace cost engineering
          </h2>
          <div className="divide-y divide-white/10">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-display text-[16px] mb-2" style={{ color: '#2dd4bf' }}>{f.q}</h3>
                <p className="font-mono text-[13px] text-white/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="See Emithran on an aerospace or space programme."
        subtitle="Book a programme-specific walkthrough. We sign NDAs before every demo."
      />
    </div>
  )
}
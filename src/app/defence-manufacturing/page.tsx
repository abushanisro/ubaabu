import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import SectionLabel from '@/components/ui/SectionLabel'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Defence Manufacturing Software India | Emithran',
  description:
    'Manufacturing intelligence software for India\'s defence OEMs and DRDO supply chain. BOM management, should-cost analysis, and supplier qualification built for ITAR-sensitive, mission-critical programmes.',
  keywords: [
    'defence manufacturing software india', 'DRDO supply chain software',
    'HAL manufacturing analytics', 'defence OEM platform india',
    'private defence manufacturing india', 'defence procurement software',
    'defence BOM management', 'defence supplier qualification india',
    'Atmanirbhar defence manufacturing', 'defence cost engineering india',
  ],
  alternates: { canonical: '/defence-manufacturing' },
  openGraph: {
    title: 'Defence Manufacturing Software India | Emithran',
    description: 'BOM management, should-cost analysis, and supplier qualification built for India\'s defence OEMs and DRDO supply chains.',
    url: '/defence-manufacturing',
    type: 'website',
  },
  twitter: {
    title: 'Defence Manufacturing Software India | Emithran',
    description: 'Manufacturing intelligence built for DRDO, HAL, and private defence OEMs in India.',
  },
}

const features = [
  {
    title: 'Programme-Level Cost Visibility',
    body: 'Full programme cost roll-up from component to system level. Track actuals vs targets across every sub-assembly, sub-system, and supplier in real time.',
  },
  {
    title: 'Supplier Qualification for Defence',
    body: 'Qualify suppliers against AS9100, NADCAP, and defence-specific requirements. Maintain an auditable, live record of every supplier\'s qualification status.',
  },
  {
    title: 'BOM Management for Complex Assemblies',
    body: 'Manage multi-level defence equipment BOMs with full revision control, configuration management, and change impact analysis across variants.',
  },
  {
    title: 'Should-Cost for Indigenisation',
    body: 'Building under Atmanirbhar Bharat or DPP guidelines? Model the should-cost of indigenised components vs imported alternatives - with India-specific labour, material, and overhead rates.',
  },
  {
    title: 'PPAP + Quality Guard',
    body: 'Manage PPAP submissions, inspection records, and supplier quality scores across your entire defence supply chain. One system. One audit trail.',
  },
  {
    title: 'Secure + NDA-Ready',
    body: 'We sign NDAs before every demo and engagement. Data stays within your programme boundary. No cross-programme data leakage.',
  },
]

const stats = [
  { value: '99.4%', label: 'BOM accuracy rate across active defence and aerospace programmes on the platform' },
  { value: '72K+', label: 'Indian manufacturing suppliers in Supplier Radar - searchable by defence capability' },
  { value: '40%', label: 'faster RFQ turnaround when using Emithran should-cost models in defence procurement' },
]

const faqs = [
  {
    q: 'What is defence manufacturing software?',
    a: 'Defence manufacturing software gives OEMs, DRDO supply chains, and private defence manufacturers programme-level cost visibility, supplier qualification, and BOM management built for security, traceability, and compliance requirements specific to defence programmes. Emithran provides this alongside should-cost modelling for indigenisation decisions under Atmanirbhar Bharat and DPP guidelines.',
  },
  {
    q: 'Is Emithran suitable for ITAR-sensitive or classified programmes?',
    a: 'Emithran signs NDAs before every demo and engagement, and data stays within your programme boundary with no cross-programme data leakage. For specific ITAR or classification requirements, our team works through the relevant data handling and access controls with your security team before onboarding.',
  },
  {
    q: 'Can Emithran model should-cost for indigenised vs imported components?',
    a: 'Yes. Should-cost models can compare indigenised components against imported alternatives using India-specific labour, material, and overhead rates, which is useful for Make-I, Make-II, and indigenisation decisions under Atmanirbhar Bharat and DPP guidelines.',
  },
  {
    q: 'Which defence supply chains does Emithran support?',
    a: 'Private defence OEMs building under Make-I and Make-II categories, DRDO labs and their Tier-1 manufacturing partners, HAL and DPSUs, electronics and communications equipment manufacturers, armoured vehicle and naval systems manufacturers, and ammunition and propulsion sub-system suppliers.',
  },
  {
    q: 'How does Emithran handle multi-level defence equipment BOMs?',
    a: 'Multi-level BOMs are managed with full revision control, configuration management, and change impact analysis across variants, so engineering and procurement teams can see how a change in one component cascades through the assembly.',
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
  name: 'Emithran Defence Manufacturing Intelligence',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${siteUrl}/defence-manufacturing`,
  description: "Manufacturing intelligence software for India's defence OEMs and DRDO supply chain, covering BOM management, should-cost analysis, and supplier qualification for ITAR-sensitive, mission-critical programmes.",
  provider: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free pilot available' },
  featureList: features.map((f) => f.title),
}

export default function DefenceManufacturingPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PageHero
        eyebrow="Defence Manufacturing - India"
        title="Manufacturing intelligence for India's defence programmes."
        subtitle="Emithran gives defence OEMs, DRDO supply chains, and private defence manufacturers the cost visibility, supplier intelligence, and BOM accuracy they need to deliver on programme - without compromising on security or compliance."
      />

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Platform capabilities</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-[0.95] tracking-tight max-w-3xl mb-16">
            Built for mission-critical manufacturing. Not adapted from it.
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
          <SectionLabel>Platform scale</SectionLabel>
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
          <SectionLabel>Who we serve</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[48px] leading-[0.95] max-w-2xl mb-10">
            Across India's entire defence manufacturing ecosystem.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[13px] text-white/70">
            {[
              'Private defence OEMs building under Make-I and Make-II categories',
              'DRDO labs and their Tier-1 manufacturing partners',
              'HAL and DPSUs managing complex avionics and airframe supply chains',
              'Electronics and communications equipment manufacturers',
              'Armoured vehicle and naval systems manufacturers',
              'Ammunition and propulsion sub-system suppliers',
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
            Common questions about defence manufacturing software
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
        title="See Emithran running on a defence programme."
        subtitle="We sign NDAs before every demo and treat all programme data as confidential."
      />
    </div>
  )
}
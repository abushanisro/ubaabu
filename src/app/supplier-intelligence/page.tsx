import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import SectionLabel from '@/components/ui/SectionLabel'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Supplier Intelligence Platform India | Emithran',
  description:
    "India's largest manufacturing supplier intelligence platform. 72,000+ verified suppliers across defence, aerospace, space, and precision manufacturing. Qualification scoring, risk assessment, and capability mapping.",
  keywords: [
    'supplier intelligence platform india', 'supplier database india',
    'supplier qualification software', 'manufacturing supplier search india',
    'defence supplier intelligence', 'aerospace supplier database',
    'supplier risk assessment india', 'vendor qualification platform',
    'MSME supplier database india', 'supplier capability mapping',
  ],
  alternates: { canonical: '/supplier-intelligence' },
  openGraph: {
    title: 'Supplier Intelligence Platform India | Emithran',
    description: '72,000+ verified suppliers. Qualification scoring, risk assessment, and capability mapping for defence, aerospace, and space supply chains.',
    url: '/supplier-intelligence',
    type: 'website',
  },
  twitter: {
    title: 'Supplier Intelligence Platform India | Emithran',
    description: '72,000+ verified Indian suppliers. Qualification scoring and risk assessment for mission-critical supply chains.',
  },
}

const features = [
  {
    title: '72,000+ Verified Suppliers',
    body: 'The largest curated database of Indian manufacturing suppliers - covering MSMEs, Tier-2, and Tier-1 across defence, aerospace, space, automotive, and precision engineering.',
  },
  {
    title: 'Qualification Scoring',
    body: 'Every supplier is scored across capability, capacity, quality certifications, and on-time delivery history. Find qualified alternatives before a single RFQ goes out.',
  },
  {
    title: 'Risk Intelligence',
    body: 'Single-source risk flags, geopolitical exposure, financial stress signals, and quality failure history - all visible before you commit to a supplier.',
  },
  {
    title: 'Capability Mapping',
    body: 'Search by process (forging, casting, machining, PCBA), material, certification (AS9100, IATF, NADCAP), or geography. Find the right supplier in minutes, not days.',
  },
  {
    title: 'PPAP + Quality History',
    body: 'See a supplier\'s full PPAP submission history, inspection records, and quality scores across all programmes they supply. No more surprises after onboarding.',
  },
  {
    title: 'Dual-Source Identification',
    body: 'Automatically identifies qualified alternative suppliers for every critical component in your BOM. De-risk your supply chain with one click.',
  },
]

const stats = [
  { value: '72K+', label: 'verified manufacturing suppliers in the Emithran Supplier Radar database' },
  { value: '647+', label: 'active vendors onboarded across defence, aerospace, and space programmes' },
  { value: '22%', label: 'harness cost reduction achieved by dual-sourcing from Bangalore wire harness suppliers' },
]

const faqs = [
  {
    q: 'What is supplier intelligence software?',
    a: 'Supplier intelligence software is a platform that centralizes supplier capability, certification, capacity, risk, and performance data so procurement and engineering teams can qualify and compare suppliers before committing to a sourcing decision. Emithran connects this data to 72,000+ verified Indian manufacturers, scored across capability, capacity, quality certifications, and delivery history.',
  },
  {
    q: 'How does Emithran verify its supplier database?',
    a: 'Suppliers are verified through a combination of certification checks (AS9100, IATF 16949, NADCAP), documented capability and capacity data, quality and PPAP submission history, and ongoing performance signals from active programmes. Verification status is visible on every supplier profile.',
  },
  {
    q: 'Can I find suppliers for a specific process or certification?',
    a: 'Yes. You can search by manufacturing process (forging, casting, machining, PCBA, and more), material, certification (AS9100, IATF 16949, NADCAP), or geography, and get a ranked shortlist of qualified suppliers in minutes.',
  },
  {
    q: 'Does Emithran identify dual-source or backup suppliers automatically?',
    a: 'Yes. For every critical component in your BOM, Emithran can surface qualified alternative suppliers, helping you de-risk single-source exposure without running a separate sourcing exercise.',
  },
  {
    q: 'Which industries does the supplier database cover?',
    a: 'Defence, aerospace, space, automotive, precision engineering, and electronics manufacturing, with particular depth in DRDO, HAL, ISRO, and private OEM supply chains across India.',
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
  name: 'Emithran Supplier Radar',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${siteUrl}/supplier-intelligence`,
  description: "India's manufacturing supplier intelligence platform with 72,000+ verified suppliers, qualification scoring, risk assessment, and capability mapping for defence, aerospace, and space supply chains.",
  provider: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free pilot available' },
  featureList: features.map((f) => f.title),
}

export default function SupplierIntelligencePage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PageHero
        eyebrow="Supplier Intelligence - India"
        title="Find the right supplier before the deadline, not after."
        subtitle="Emithran is supplier intelligence software that gives procurement and programme teams access to 72,000+ verified Indian manufacturers - with qualification scores, risk flags, and capability data to make confident sourcing decisions fast."
      />

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Platform capabilities</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-[0.95] tracking-tight max-w-3xl mb-16">
            Supplier intelligence built for India's mission-critical supply chains.
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
          <SectionLabel>Scale</SectionLabel>
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
            Covering every critical manufacturing sector in India.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[13px] text-white/70">
            {[
              'Defence - DRDO, HAL, private defence OEM supply chains',
              'Aerospace - component suppliers for aviation programmes',
              'Space - ISRO supply chain, commercial NewSpace manufacturers',
              'Automotive - Tier-1 and Tier-2 suppliers for passenger and commercial vehicles',
              'Precision engineering - CNC machining, sheet metal, and specialty processes',
              'Electronics - PCBA, wire harness, and embedded systems manufacturers',
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
            Common questions about supplier intelligence
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
        title="Find your next qualified supplier today."
        subtitle="Book a programme-specific walkthrough. We sign NDAs before every demo."
      />
    </div>
  )
}
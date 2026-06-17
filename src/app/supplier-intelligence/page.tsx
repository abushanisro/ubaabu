import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import SectionLabel from '@/components/ui/SectionLabel'

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

export default function SupplierIntelligencePage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <PageHero
        eyebrow="Supplier Intelligence - India"
        title="Find the right supplier before the deadline, not after."
        subtitle="Emithran Supplier Radar gives procurement and programme teams access to 72,000+ verified Indian manufacturers - with qualification scores, risk flags, and capability data to make confident sourcing decisions fast."
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

      <PageCTA
        title="Find your next qualified supplier today."
        subtitle="Book a programme-specific walkthrough. We sign NDAs before every demo."
      />
    </div>
  )
}
import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'BOM Management Software India | Emithran',
  description:
    "India's most accurate BOM management software for defence, aerospace, and space OEMs. 99.4% BOM accuracy rate. Automated validation, version control, and cost roll-up. Trusted by Ashok Leyland, TATA Power & Digantara.",
  keywords: [
    'BOM management software india', 'bill of materials software',
    'BOM accuracy tool', 'BOM validation software india',
    'multi level BOM management', 'engineering BOM software',
    'manufacturing BOM platform', 'BOM cost rollup',
    'defence BOM management', 'aerospace BOM software india',
  ],
  alternates: { canonical: '/bom-management' },
  openGraph: {
    title: 'BOM Management Software India | Emithran',
    description: '99.4% BOM accuracy rate. Automated validation, version control, and cost roll-up for defence, aerospace, and space OEMs.',
    url: '/bom-management',
    type: 'website',
  },
  twitter: {
    title: 'BOM Management Software India | Emithran',
    description: '99.4% BOM accuracy. Automated validation and cost roll-up for India\'s OEMs.',
  },
}

const features = [
  {
    title: '99.4% BOM Accuracy',
    body: 'Automated validation catches errors, duplicate part numbers, missing specs, and inconsistent units before they reach the supply chain. One mistake in a 500-part BOM can cascade into production delays worth millions.',
  },
  {
    title: 'Multi-Level BOM Support',
    body: 'Full Engineering BOM, Manufacturing BOM, and Service BOM - all linked. Changes at any level propagate instantly. No more mismatched revision sheets across departments.',
  },
  {
    title: 'Real-Time Cost Roll-Up',
    body: 'Every part has a cost. Every change to the BOM instantly updates the programme cost total. Procurement, engineering, and finance always look at the same number.',
  },
  {
    title: 'CAD + ERP Integration',
    body: 'Pull BOM data directly from SolidWorks, CATIA, or your ERP. No manual re-entry. No transcription errors. BOM Composer is the single source of truth.',
  },
  {
    title: 'Version Control + Audit Trail',
    body: 'Every BOM revision is tracked with timestamps, change reasons, and approver names. Audits are a printout, not a panic.',
  },
  {
    title: 'Supplier-Linked BOMs',
    body: 'Each BOM line links to qualified suppliers in the Supplier Radar database. See lead time, price history, and risk score for every component without leaving the BOM view.',
  },
]

const stats = [
  { value: '99.4%', label: 'BOM accuracy rate across active defence and aerospace programmes on the platform' },
  { value: '$50B+', label: 'in global defence and aerospace procurement still managed on spreadsheets and legacy systems' },
  { value: '40%', label: 'faster RFQ turnaround when teams use Emithran BOM Composer vs manual BOM tools' },
]

export default function BomManagementPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <PageHero
        eyebrow="BOM Management - India"
        title="A single source of truth for every component in your programme."
        subtitle="Emithran BOM Composer gives defence, aerospace, and space OEMs automated BOM validation, real-time cost roll-up, and version control - so a single line-item error never turns into a production crisis."
      />

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Platform capabilities</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-[0.95] tracking-tight max-w-3xl mb-16">
            BOM management built for mission-critical programmes.
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
          <SectionLabel>Why it matters</SectionLabel>
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
          <SectionLabel>Who uses BOM Composer</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[48px] leading-[0.95] max-w-2xl mb-10">
            Built for engineering and procurement teams in mission-critical industries.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[13px] text-white/70">
            {[
              'Defence OEMs managing multi-tier BOMs across DRDO and private programmes',
              'Aerospace component suppliers tracking 500+ part assemblies with tight revision control',
              'Space hardware manufacturers where BOM errors can ground a mission',
              'Precision engineering Tier-1s that supply Ashok Leyland, TATA, and other large OEMs',
              'Procurement teams building RFQ packages from engineering BOM data',
              'Cost engineering teams who need a live cost roll-up as designs evolve',
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
        title="See BOM Composer running on your programme."
        subtitle="Book a programme-specific walkthrough. We sign NDAs before every demo."
      />
    </div>
  )
}
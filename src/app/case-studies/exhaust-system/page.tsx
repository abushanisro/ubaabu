import CaseStudyShell, {
  SectionLabel, Card, DarkCard, ImpactGrid,
} from '@/components/case-studies/CaseStudyShell'

export const metadata = {
  title: 'Should Costing for Exhaust System | Emithran Case Study',
  description: 'How Emithran identified a £1.3m annual cost saving for a high-performance automotive OEM through should-cost analysis of an exhaust assembly.',
  alternates: { canonical: '/case-studies/exhaust-system' },
}

const BULLETS = (items: string[]) => (
  <ul className="space-y-3">
    {items.map((s, i) => (
      <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#475569]">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
        {s}
      </li>
    ))}
  </ul>
)

const NUMBERED = (items: string[]) => (
  <ol className="space-y-3">
    {items.map((s, i) => (
      <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#475569]">
        <span className="mt-0.5 shrink-0 text-[12px] font-bold text-[#0d9488]">{i + 1}.</span>
        {s}
      </li>
    ))}
  </ol>
)

export default function ExhaustCaseStudy() {
  return (
    <CaseStudyShell
      slug="exhaust-system"
      industry="Automotive"
      date="May 28, 2026"
      readTime="6 min read"
      metric="£1.3m / yr saving"
      title={<>Should Costing for<br className="hidden md:block" /> Exhaust System</>}
      subtitle="Foremost high-performance car maker in the automotive sector - Titanium vs Stainless Steel material decision"
      image="/assets/casestudy/f1card.png"
      imageAlt="High-performance exhaust system"
      stats={[
        { label: 'Product',  value: 'Exhaust Assembly' },
        { label: 'Volume',   value: '300 Pieces' },
        { label: 'Location', value: 'UK' },
        { label: 'Material', value: 'Ti vs SS' },
        { label: 'Saving',   value: '£1.3m / yr' },
      ]}
      ctaTitle="Want a should-cost analysis for your assembly?"
      ctaBody="Talk to our engineering team. We scope, model, and deliver a cost breakdown you can take straight into supplier negotiations."
      ctaSource="case-study-exhaust-system"
    >

      {/* Row 1 - Problem + Scope */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card accent>
          <SectionLabel>Problem Statement · Business Challenges</SectionLabel>
          <h2 className="mb-4 text-[17px] font-bold text-[#0f1b2d]">What the client needed to solve</h2>
          {BULLETS([
            'Creating an achievable budget for this sub-assembly which meets the target cost for the vehicle.',
            'Negotiating a purchase price which meets the budget.',
            'Selecting the optimal material type - Titanium or Stainless Steel - based on the cost of manufacture.',
            'Setting a defensible supplier target cost ahead of commercial negotiations.',
          ])}
        </Card>

        <Card accent>
          <SectionLabel>Project Specification · Scope of Work</SectionLabel>
          <h2 className="mb-4 text-[17px] font-bold text-[#0f1b2d]">What Emithran was tasked to do</h2>
          {BULLETS([
            'Review the current design and determine the cost of the exhaust assembly using the Should Cost methodology.',
            'Estimate the cost at UK conditions for manufacture in Titanium.',
            'Estimate the cost at UK conditions for manufacture in Stainless Steel.',
            'Identify cost drivers and provide actionable recommendations for reduction.',
          ])}
        </Card>
      </div>

      {/* Row 2 - Technical Description */}
      <Card accent>
        <SectionLabel>Technical Information · Product Description</SectionLabel>
        <h2 className="mb-5 text-[17px] font-bold text-[#0f1b2d]">Exhaust Manifold Assembly</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/35">Major Parts</p>
            {BULLETS(['Manifolds', 'CAT chambers', 'Lambda sensors', 'Fully pressed muffler (upper & lower shell)'])}
          </div>
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/35">Construction</p>
            <p className="text-[14px] leading-relaxed text-[#475569]">
              Primarily sheet metal and pipe formed along with welding. 4-channel catalytic conversion system with a single diffuser at the end.
            </p>
          </div>
        </div>
      </Card>

      {/* Row 3 - Key Aspects + Deliverables */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <SectionLabel>Key Aspects</SectionLabel>
          {NUMBERED([
            'Optimum process adopted using best technology',
            'Appropriate machine selection',
            'Appropriate process parameter selection',
            'Up to date cost data for materials, machine and labour at the manufacturing location',
          ])}
        </Card>

        <Card>
          <SectionLabel>Deliverables</SectionLabel>
          {NUMBERED([
            'Should Cost analysis for the exhaust assembly for both Titanium and Stainless Steel',
            'Identification of cost drivers and recommendations for cost reduction',
            'Customer knowledge-base documentation compiled',
          ])}
        </Card>
      </div>

      {/* Row 4 - Cost Comparison */}
      <div>
        <SectionLabel>Cost Drivers for Exhaust Assembly</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Case Comparison: Titanium vs Stainless Steel</h2>
        <div className="grid gap-5 md:grid-cols-2">

          {/* Ti */}
          <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/35">Case 01</p>
                <h3 className="mt-1 text-[18px] font-bold text-[#0f1b2d]">Titanium</h3>
                <p className="text-[12px] text-black/40">Manufacturing Location: UK</p>
              </div>
              <div className="shrink-0 rounded-xl bg-red-50 px-4 py-2 text-center">
                <p className="text-[10px] font-medium text-red-400">Total Cost</p>
                <p className="text-[20px] font-bold text-red-600">£13,260</p>
              </div>
            </div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/35">Major Cost Drivers</p>
            <div className="space-y-3">
              {[
                { part: 'Manifold Exhaust LH & RH', pct: 23 },
                { part: 'Exhaust Silencer', pct: 16 },
              ].map((d) => (
                <div key={d.part}>
                  <div className="mb-1.5 flex justify-between text-[13px]">
                    <span className="text-[#475569]">{d.part}</span>
                    <span className="font-bold text-[#0f1b2d]">{d.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-red-50">
                    <div className="h-1.5 rounded-full bg-red-400" style={{ width: `${d.pct * 4}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SS - Recommended */}
          <div className="rounded-2xl border border-[#0d9488]/20 bg-gradient-to-b from-[#f0fdfb] to-white p-6 shadow-sm ring-1 ring-[#0d9488]/15">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]/70">Case 02 · Recommended</p>
                <h3 className="mt-1 text-[18px] font-bold text-[#0f1b2d]">Stainless Steel</h3>
                <p className="text-[12px] text-black/40">Manufacturing Location: UK</p>
              </div>
              <div className="shrink-0 rounded-xl bg-[#0d9488]/10 px-4 py-2 text-center">
                <p className="text-[10px] font-medium text-[#0d9488]">Total Cost</p>
                <p className="text-[20px] font-bold text-[#0d9488]">£8,910</p>
              </div>
            </div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-black/35">Major Cost Drivers</p>
            <div className="space-y-3">
              {[
                { part: 'Manifold Exhaust LH & RH', pct: 22 },
                { part: 'Exhaust Silencer', pct: 13 },
              ].map((d) => (
                <div key={d.part}>
                  <div className="mb-1.5 flex justify-between text-[13px]">
                    <span className="text-[#475569]">{d.part}</span>
                    <span className="font-bold text-[#0f1b2d]">{d.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#0d9488]/10">
                    <div className="h-1.5 rounded-full bg-[#0d9488]" style={{ width: `${d.pct * 4}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#0d9488]/10 px-3 py-2">
              <span className="text-[11px] font-bold text-[#0d9488]">£4,350 saved per unit</span>
              <span className="text-[10px] text-[#0d9488]/60">· 300 pcs = £1.3m / yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5 - Impact */}
      <DarkCard>
        <SectionLabel>Value Additions</SectionLabel>
        <h2 className="mb-8 text-[22px] font-bold text-white">What Emithran delivered</h2>
        <ImpactGrid items={[
          { num: '£1.3m', title: 'Annual Cost Saving',   desc: 'Identified by switching from Titanium to Stainless Steel across 300 units per year.' },
          { num: '100%',  title: 'Target Cost Coverage', desc: 'Supplier target cost established against every component in the exhaust assembly.' },
          { num: 'VBN',   title: 'Negotiation Ready',    desc: 'Emithran cost breakdown enabled value-based price negotiation with suppliers.' },
          { num: 'DFM',   title: 'Design Optimised',     desc: 'Main cost drivers identified via value engineering - design optimised for cost.' },
        ]} />
      </DarkCard>

    </CaseStudyShell>
  )
}

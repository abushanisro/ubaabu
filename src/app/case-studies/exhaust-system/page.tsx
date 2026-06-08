import Link from 'next/link'

export const metadata = {
  title: 'Should Costing for Exhaust System | Emithran Case Study',
  description: 'How Emithran identified a £1.3m annual cost saving for a high-performance automotive OEM through should-cost analysis of an exhaust assembly.',
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-[12px] font-medium text-[#334155]">
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">{children}</p>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default function ExhaustCaseStudy() {
  return (
    <main className="bg-[#f8fafb] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[480px] overflow-hidden">
        <img
          src="/assets/casestudy/f1card.png"
          alt="High-performance F1 exhaust system"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-12 md:px-12">
          <Link href="/#case-studies" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition-colors w-fit">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Case Studies
          </Link>
          <h1 className="text-3xl md:text-[44px] font-bold leading-tight tracking-tight text-white max-w-[720px]">
            Should Costing for<br />Exhaust System
          </h1>
          <p className="mt-3 text-[16px] text-white/65 max-w-[520px]">
            Foremost high-performance car maker in the automotive sector
          </p>
        </div>
      </div>

      {/* ── Overview strip ── */}
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px px-6 md:grid-cols-5 md:px-12">
          {[
            { label: 'Product',  value: 'Exhaust Assembly' },
            { label: 'Volume',   value: '300 Pieces' },
            { label: 'Location', value: 'UK' },
            { label: 'Material', value: 'Ti vs SS' },
            { label: 'Saving',   value: '£1.3m / yr' },
          ].map((item) => (
            <div key={item.label} className="py-5 px-4 first:pl-0 last:pr-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-black/35">{item.label}</p>
              <p className="mt-1 text-[15px] font-bold text-[#0d1117]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20 space-y-10">

        {/* Row 1 — Problem + Specification */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <SectionLabel>Problem Statement · Business Challenges</SectionLabel>
            <h2 className="mb-4 text-[17px] font-bold text-[#0d1117]">What the client needed to solve</h2>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#475569]">
              <li className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />Creating an achievable budget for this sub-assembly which meets the target cost for the vehicle.</li>
              <li className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />Negotiating a purchase price which meets the budget.</li>
              <li className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />Selecting the optimal material type — Titanium or Stainless Steel — based on the cost of manufacture.</li>
              <li className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />Setting a defensible supplier target cost ahead of commercial negotiations.</li>
            </ul>
          </Card>

          <Card>
            <SectionLabel>Project Specification · Scope of Work</SectionLabel>
            <h2 className="mb-4 text-[17px] font-bold text-[#0d1117]">What Emithran was tasked to do</h2>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#475569]">
              <li className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />Review the current design and determine the cost of the exhaust assembly using the Should Cost methodology.</li>
              <li className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />Estimate the cost at UK conditions for manufacture in <strong>Titanium</strong>.</li>
              <li className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />Estimate the cost at UK conditions for manufacture in <strong>Stainless Steel</strong>.</li>
              <li className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />Identify cost drivers and provide actionable recommendations for reduction.</li>
            </ul>
          </Card>
        </div>

        {/* Row 2 — Technical Information */}
        <Card>
          <SectionLabel>Technical Information · Product Description</SectionLabel>
          <h2 className="mb-6 text-[17px] font-bold text-[#0d1117]">Exhaust Manifold Assembly</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-black/40">Major Parts</p>
              <ul className="space-y-2 text-[14px] text-[#475569]">
                {['Manifolds', 'CAT chambers', 'Lambda sensors', 'Fully pressed muffler (upper & lower shell)'].map(p => (
                  <li key={p} className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#94a3b8]" />{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-black/40">Construction</p>
              <p className="text-[14px] leading-relaxed text-[#475569]">
                Primarily sheet metal and pipe formed along with welding. 4-channel catalytic conversion system with a single diffuser at the end.
              </p>
            </div>
          </div>
        </Card>

        {/* Row 3 — Key Aspects + Deliverables */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <SectionLabel>Key Aspects</SectionLabel>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#475569]">
              {[
                'Optimum process adopted using best technology',
                'Appropriate machine selection',
                'Appropriate process parameter selection',
                'Up to date cost data for materials, machine and labour at the manufacturing location',
              ].map((a, i) => (
                <li key={i} className="flex gap-2.5"><span className="mt-1 shrink-0 text-[#2dd4bf] font-bold text-xs">{i + 1}.</span>{a}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionLabel>Deliverables</SectionLabel>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#475569]">
              {[
                'Should Cost analysis for the exhaust assembly for both Titanium and Stainless Steel',
                'Identification of cost drivers and recommendations for cost reduction',
                'Customer knowledge-base documentation compiled',
              ].map((d, i) => (
                <li key={i} className="flex gap-2.5"><span className="mt-1 shrink-0 text-[#2dd4bf] font-bold text-xs">{i + 1}.</span>{d}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Row 4 — Cost Analysis */}
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">Cost Drivers for Exhaust Assembly</p>
          <h2 className="mb-6 text-[20px] font-bold text-[#0d1117]">Case Comparison: Titanium vs Stainless Steel</h2>
          <div className="grid gap-6 md:grid-cols-2">

            {/* Case 1 */}
            <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">Case 01</p>
                  <h3 className="text-[17px] font-bold text-[#0d1117]">Titanium</h3>
                </div>
                <span className="rounded-xl bg-red-50 px-3 py-1.5 text-center">
                  <p className="text-[11px] font-medium text-red-400">Total Cost</p>
                  <p className="text-[18px] font-bold text-red-600">£13,260</p>
                </span>
              </div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-black/35">Major Cost Drivers</p>
              <div className="space-y-3">
                {[
                  { part: 'Manifold Exhaust LH & RH', pct: 23 },
                  { part: 'Exhaust Silencer', pct: 16 },
                ].map((d) => (
                  <div key={d.part}>
                    <div className="mb-1 flex justify-between text-[13px]">
                      <span className="text-[#475569]">{d.part}</span>
                      <span className="font-semibold text-[#0d1117]">{d.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/[0.06]">
                      <div className="h-1.5 rounded-full bg-red-400" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12px] text-black/40">Manufacturing Location: UK</p>
            </div>

            {/* Case 2 */}
            <div className="rounded-2xl border border-[#2dd4bf]/30 bg-[#f0fdfb] p-6 shadow-sm ring-1 ring-[#2dd4bf]/20">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2dd4bf]/70">Case 02 · Recommended</p>
                  <h3 className="text-[17px] font-bold text-[#0d1117]">Stainless Steel</h3>
                </div>
                <span className="rounded-xl bg-teal-50 px-3 py-1.5 text-center">
                  <p className="text-[11px] font-medium text-teal-500">Total Cost</p>
                  <p className="text-[18px] font-bold text-teal-700">£8,910</p>
                </span>
              </div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-black/35">Major Cost Drivers</p>
              <div className="space-y-3">
                {[
                  { part: 'Manifold Exhaust LH & RH', pct: 22 },
                  { part: 'Exhaust Silencer', pct: 13 },
                ].map((d) => (
                  <div key={d.part}>
                    <div className="mb-1 flex justify-between text-[13px]">
                      <span className="text-[#475569]">{d.part}</span>
                      <span className="font-semibold text-[#0d1117]">{d.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/[0.06]">
                      <div className="h-1.5 rounded-full bg-teal-400" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12px] text-black/40">Manufacturing Location: UK</p>
            </div>

          </div>
        </div>

        {/* Row 5 — Value Additions */}
        <div className="rounded-2xl bg-[#0d1117] p-8 md:p-10">
          <SectionLabel>Value Additions</SectionLabel>
          <h2 className="mb-8 text-[22px] font-bold text-white">What Emithran delivered</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { stat: '£1.3m', desc: 'Annual cost saving identified by switching from Titanium to Stainless Steel.' },
              { stat: '100%', desc: 'Supplier target cost established against every component in the exhaust assembly.' },
              { stat: 'VBN', desc: 'Emithran cost breakdown enabled value-based price negotiation with suppliers.' },
              { stat: 'DFM', desc: 'Main cost drivers identified via value engineering — design optimised for cost.' },
            ].map((v) => (
              <div key={v.stat} className="flex gap-4 rounded-xl bg-white/[0.05] p-5">
                <span className="shrink-0 text-[22px] font-bold text-[#2dd4bf]">{v.stat}</span>
                <p className="text-[14px] leading-relaxed text-white/65">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 6 — CTA */}
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white py-10 px-6 text-center shadow-sm">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#2dd4bf]">For Enquiry</p>
          <h2 className="text-[20px] font-bold text-[#0d1117]">Want a should-cost analysis for your assembly?</h2>
          <p className="max-w-[480px] text-[14px] text-[#64748b]">
            Talk to our engineering team about your component. We scope, model, and deliver a cost breakdown you can take straight into supplier negotiations.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a
              href="/request-demo"
              className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
            >
              Request a Demo
            </a>
            <a
              href="/contact?source=case-study-exhaust-system&cta=contact-sales"
              className="rounded-lg border border-black/15 px-5 py-2.5 text-[13px] font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}

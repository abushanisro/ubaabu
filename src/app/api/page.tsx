import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

export const metadata: Metadata = {
  title: 'API & Data Pipeline | Emithran',
  description:
    'Connect Emithran costing, machine and labour rates, RFQs and supplier data to your ERP and procurement tools through an API, or build custom workflows with our developers and costing engineers.',
  alternates: { canonical: '/api' },
}

const NAVY = '#0f1b2d'
const TEAL = '#2dd4bf'
const LINE = 'rgba(255,255,255,0.10)'
const PANEL = 'rgba(255,255,255,0.04)'

const primaryBtn = { background: TEAL, color: NAVY, boxShadow: '0 4px 24px rgba(45,212,191,0.30)' }

const SYSTEMS = ['ERP', 'BOM and PLM', 'Procurement tracker', 'Supplier records']
const MODULES = ['Should-Cost Engine', 'Machine and Labour Rates', 'RFQ Management', 'Supplier Nomination']

const STATS = [
  { value: '72,000+', label: 'Verified suppliers queryable' },
  { value: '7', label: 'Connected intelligence modules' },
  { value: '5+', label: 'Regions of raw material and rate data' },
  { value: '500+', label: 'Manufacturing processes' },
]

const PATHS = [
  {
    title: 'Use the platform.',
    body: 'Upload a CAD file or BOM and get cost breakdowns, routing and supplier recommendations from the dashboard.',
    cta: 'Request a Demo',
    href: '/request-demo',
    visual: (
      <div className="space-y-3 p-6 text-[13px]">
        <div className="max-w-[85%] rounded-lg bg-white px-3 py-2" style={{ color: NAVY }}>
          Cost this bracket for China vs India at 5,000 units a year.
        </div>
        <div className="ml-auto max-w-[85%] rounded-lg px-3 py-2" style={{ background: 'rgba(45,212,191,0.18)', color: '#ccfbf1' }}>
          India is 14% lower. Sheet metal, laser cut and press brake routing.
        </div>
      </div>
    ),
  },
  {
    title: 'Connect your systems.',
    body: 'Link Emithran to your ERP, BOM structures and vendor records. Your existing data stays where it is.',
    cta: 'Talk to Our Team',
    href: '/contact',
    visual: (
      <div className="grid grid-cols-4 gap-3 p-6">
        {['ERP', 'PLM', 'MES', 'BOM', 'RFQ', 'CRM', 'Excel', 'Vendors'].map((n) => (
          <div key={n} className="grid h-12 place-items-center rounded-lg bg-white text-[11px] font-bold" style={{ color: NAVY }}>
            {n}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Build your own.',
    body: 'Use the REST API to build custom machine rates, formulas, RFQ flows and procurement dashboards.',
    cta: 'Talk to Our Team',
    href: '/contact',
    visual: (
      <pre className="overflow-hidden p-6 font-mono text-[12px] leading-6" style={{ color: '#cbd5e1' }}>
        <span style={{ color: TEAL }}>curl</span> https://api.emithran.com/v1/costs \{'\n'}
        {'  '}-H <span style={{ color: '#fdba74' }}>&quot;Authorization: Bearer $KEY&quot;</span> \{'\n'}
        {'  '}-F <span style={{ color: '#fdba74' }}>file=@bracket.step</span>
      </pre>
    ),
  },
]

function Heading({ lead, rest }: { lead: string; rest: string }) {
  return (
    <h2 className="font-display max-w-3xl text-[28px] leading-tight md:text-[40px]">
      <span className="font-bold text-white">{lead}</span>{' '}
      <span style={{ color: 'rgba(255,255,255,0.55)' }}>{rest}</span>
    </h2>
  )
}

function Connector() {
  return <div className="h-10 border-l border-dashed" style={{ borderColor: 'rgba(45,212,191,0.5)' }} />
}

function Chip({ children, solid }: { children: string; solid?: boolean }) {
  return (
    <span
      className="rounded-md px-4 py-2 text-[13px] font-semibold"
      style={solid ? { background: TEAL, color: NAVY } : { background: 'rgba(45,212,191,0.14)', color: '#99f6e4', border: '1px solid rgba(45,212,191,0.3)' }}
    >
      {children}
    </span>
  )
}

export default function ApiPage() {
  return (
    <main className="pt-24 text-white" style={{ background: NAVY }}>
      <div className="mx-auto max-w-[1180px] border-x px-6 md:px-12" style={{ borderColor: LINE }}>
        <section className="border-b py-16 md:py-24" style={{ borderColor: LINE }}>
          <Heading
            lead="Reliable, Extensible Infrastructure for Every Stack."
            rest="Fit Emithran to your plants, parts and procurement process with flexible API and custom build options."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request-demo" className="rounded-full px-7 py-3.5 text-[15px] font-semibold" style={primaryBtn}>
              Request a Demo
            </Link>
            <Link
              href="/contact"
              className="rounded-full border px-7 py-3.5 text-[15px] font-semibold hover:bg-white/5"
              style={{ borderColor: 'rgba(255,255,255,0.25)' }}
            >
              Talk to Our Team
            </Link>
          </div>
        </section>

        <section className="border-b py-16 md:py-24" style={{ borderColor: LINE }}>
          <Heading
            lead="Connect to Existing Systems."
            rest="Pipe costing, rates, RFQs and supplier data into your ERP, BOMs and trackers, and build custom workflows on top."
          />
          <div className="mt-12 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-2 rounded-lg p-3" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
              {SYSTEMS.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
            <Connector />
            <div className="flex gap-3"><Chip solid>SDK</Chip><Chip solid>Webhooks</Chip></div>
            <Connector />
            <div
              className="font-display grid h-24 w-24 place-items-center rounded-xl text-[15px] font-bold"
              style={{ background: 'linear-gradient(135deg, #0f1b2d 0%, #0a2a26 55%, #0f1b2d 100%)', border: '1px solid rgba(45,212,191,0.5)' }}
            >
              Emithran
            </div>
            <Connector />
            <div className="flex flex-wrap justify-center gap-2">
              {MODULES.map((s) => <Chip key={s} solid>{s}</Chip>)}
            </div>
          </div>
        </section>

        <section className="border-b py-16 md:py-24" style={{ borderColor: LINE }}>
          <Heading
            lead="Scale with Confidence."
            rest="Replace 8 to 9 hours of Excel consolidation with live dashboards that answer plant-visit questions in seconds."
          />
          <div
            className="mt-12 h-48 rounded-2xl"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse at 70% 50%, rgba(45,212,191,0.55), transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(13,158,138,0.45), transparent 55%)',
              WebkitMaskImage: 'repeating-linear-gradient(0deg, #000 0 3px, transparent 3px 5px)',
              maskImage: 'repeating-linear-gradient(0deg, #000 0 3px, transparent 3px 5px)',
            }}
          />
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[44px] font-bold leading-none" style={{ color: TEAL }}>{s.value}</div>
                <p className="mt-3 text-[15px] font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <Heading
            lead="Choose an Integration Path."
            rest="With dedicated costing engineers and clear documentation, start with the option that fits your team."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PATHS.map((p) => (
              <div key={p.title}>
                <div className="h-[184px] overflow-hidden rounded-xl" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
                  {p.visual}
                </div>
                <p className="mt-6 text-[16px] leading-7">
                  <strong className="font-semibold">{p.title}</strong>{' '}
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>{p.body}</span>
                </p>
                <Link href={p.href} className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold hover:text-white" style={{ color: TEAL }}>
                  {p.cta}
                  <AnimatedArrow />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

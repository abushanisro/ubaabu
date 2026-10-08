'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Cpu,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

type Pillar = {
  image: string
  title: string
  description: string
  links: string[]
}

const PILLARS: Pillar[] = [
  {
    image: '/assets/element-bg/manufaturing.png',
    title: 'Manufacturing Excellence',
    description:
      'Through Emithran\u2019s AI-driven manufacturing intelligence, product concepts become market-ready parts with rapid prototyping and on-demand manufacturing \u2014 precision, speed, and scalability across automotive, aerospace, and industrial applications.',
    links: ['On-Demand Manufacturing', 'Rapid Prototyping', 'Custom Manufacturing', 'Production Scaling'],
  },
  {
    image: '/assets/element-bg/egineering.png',
    title: 'Engineering Innovation',
    description:
      'Deep engineering expertise to optimize costs, validate designs, and strategically source components with precision and efficiency \u2014 data-driven insights for a competitive advantage.',
    links: ['Product Cost Estimation', 'VAVE - Teardown & Benchmarking', 'Strategic Sourcing Support', 'Expert Engineer Support'],
  },
]

const SUCCESS_STORIES = [
  {
    title: '75 Units to the USA in Just 3 Days: Delivering Against the Clock',
    summary:
      'A leading aerospace company needed 75 precision components delivered to the USA within 3 days. After other vendors failed, Emithran completed end-to-end manufacturing in 24 hours with zero defects.',
  },
  {
    title: 'Satellite Broadcast & Sensor Components',
    summary:
      'Emithran prototyped a space-grade satellite barrel with 1mm wall thickness and complex grooves in 3 days, leading to a full manufacturing partnership.',
  },
  {
    title: 'Advanced Graphite Machining',
    summary:
      'Emithran sourced proprietary Tokai Carbon within India, ran 9 mechanical tests, and delivered final components where no local supplier could.',
  },
  {
    title: 'Defence Sector Zero-Zero Tolerance',
    summary:
      'Emithran achieved zero-zero tolerance on defence components by controlling anodization thickness, enabling flawless assembly after other suppliers failed.',
  },
]

export default function ExpertEngineeringSupportPage() {
  return (
    <div className="min-h-screen bg-white text-[#0f1b2d]">
      {/* ── 1. Hero ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#080808] pt-28 pb-20 md:pt-36 md:pb-28"
        style={{
          backgroundImage: 'url(/assets/element-bg/background.png)',
          backgroundSize: '100% 103%',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative mx-auto max-w-[960px] px-6 text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white leading-tight mb-6 md:text-5xl lg:text-6xl">
            Expert Engineering Support
          </h1>
          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-white/70 mb-8 md:text-[17px]">
            Emithran connects end-to-end manufacturing intelligence \u2014 automating 3D CAD feature analysis, cycle times,
            raw material indices, zero-based costing, and supplier nomination across precision aerospace, defence,
            and automotive engineering programs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/request-demo?source=expert-engineering-support&cta=request-demo"
              className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-lg"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
            >
              Request a Demo
            </Link>
            <Link
              href="/contact?source=expert-engineering-support&cta=contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.08] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Pillars ────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] py-16 md:py-20 border-b border-black/[0.06]">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mx-auto grid max-w-[820px] grid-cols-1 gap-6 md:grid-cols-2">
            {PILLARS.map(({ image, title, description, links }) => (
              <div key={title} className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-44 w-full">
                  <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                </div>
                <div className="p-7">
                  <h2 className="mb-3 text-[18px] font-bold text-[#0f1b2d]">{title}</h2>
                  <p className="mb-5 text-[14px] leading-relaxed text-black/65">{description}</p>
                  <ul className="space-y-2">
                    {links.map((l) => (
                      <li key={l}>
                        <Link
                          href="/request-demo"
                          className="group flex items-center gap-2 text-[13px] text-black/60 hover:text-[#0d9488] transition-colors"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                          <span className="group-hover:underline">{l}</span>
                          <AnimatedArrow />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Introductory Call ──────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1140px] px-6">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0f1b2d] md:text-4xl">
              Emithran Introductory Call
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-[14.5px] text-black/60">
              Live discussion on CAD feature extraction, global raw material benchmarks, zero-based costing automation, and enterprise automotive procurement deployment.
            </p>
          </div>

          {/* Key Discussion Takeaways */}
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-black/[0.07] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#0d9488]">
                <Cpu size={16} />
                <h3 className="text-[14px] font-bold text-[#0f1b2d]">CAD &amp; Process Calculator</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-black/60">
                Direct CAD upload for sheet metal, injection moulding, and precision machining. Automatic routing calculation, feature voice analysis, and lookup-table cycle times.
              </p>
            </div>
            <div className="rounded-xl border border-black/[0.07] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#0d9488]">
                <FileSpreadsheet size={16} />
                <h3 className="text-[14px] font-bold text-[#0f1b2d]">Zero-Based Costing (ZBC)</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-black/60">
                Automating raw material reconciliation across 12 plants, 28 steel grades, and 10 OEMs \u2014 replacing manual 8\u20139 hour monthly spreadsheets with instant dashboard intelligence.
              </p>
            </div>
            <div className="rounded-xl border border-black/[0.07] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#0d9488]">
                <CheckCircle2 size={16} />
                <h3 className="text-[14px] font-bold text-[#0f1b2d]">Supplier Nomination &amp; RFQ</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-black/60">
                Multi-region raw materials (USA, China, Mexico, Western Europe, India, Vietnam), MHR/LHR location models, supplier evaluation rankings, and real-time Gantt tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Success Stories ────────────────────────────────── */}
      <section className="bg-[#f8fafc] py-16 md:py-20 border-t border-b border-black/[0.06]">
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="mb-2 text-center text-2xl md:text-3xl font-bold tracking-tight text-[#0f1b2d]">
            Success Stories
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-[14px] text-black/55">
            A few of the precision manufacturing challenges the Emithran engineering team has solved.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SUCCESS_STORIES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">Case Study</p>
                <h3 className="mb-2 text-[16px] font-bold leading-snug text-[#0f1b2d]">{s.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-black/60">{s.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/request-demo"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d9488] hover:underline"
            >
              Explore Emithran Manufacturing Intelligence <AnimatedArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

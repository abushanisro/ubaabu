import Link from 'next/link'
import type { SeoLandingPage as SeoLandingPageData } from './seoRoadmapData'

export default function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  return (
    <main className="min-h-screen bg-white text-[#0f1b2d]">
      <section className="pt-28 pb-16 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 text-sm mb-8 text-black/40">
            <Link href="/" className="hover:text-[#0d9488]">Emithran</Link>
            <span>/</span>
            <span className="text-black/70">{page.h1}</span>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[#0d9488]">
            {page.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            {page.h1}
          </h1>
          <p className="max-w-3xl mt-6 text-lg leading-relaxed text-black/60">
            {page.intro}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/request-demo" className="inline-flex items-center justify-center rounded-xl bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white">
              Request a Demo
            </Link>
            <Link href="/case-studies" className="inline-flex items-center justify-center rounded-xl border border-[#0d9488]/25 bg-[#0d9488]/5 px-6 py-3 text-sm font-semibold text-[#0d9488]">
              See Case Studies
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid gap-4 md:grid-cols-3">
          {page.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-[#0d9488]/15 bg-[#0d9488]/5 p-6">
              <p className="text-4xl font-bold text-[#0d9488]">{metric.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/55">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid gap-10">
          {page.sections.map((section) => (
            <article key={section.heading} className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">Capability</p>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">{section.heading}</h2>
              </div>
              <div>
                <p className="text-[15px] leading-relaxed text-black/60">{section.body}</p>
                <ul className="mt-5 grid gap-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-black/65">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#f8fafb] border-y border-black/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[#0d9488]">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Common questions</h2>
          <div className="grid gap-3">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-black/10 bg-white p-5">
                <summary className="cursor-pointer text-sm font-semibold">{faq.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-black/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f1b2d] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Turn this SEO journey into a qualified pipeline.</h2>
          <p className="mt-4 text-white/55">Connect the keyword page, content cluster, and product workflow in one demo.</p>
          <Link href="/request-demo" className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#2dd4bf] px-7 py-3 text-sm font-semibold text-[#0f1b2d]">
            Book a walkthrough
          </Link>
        </div>
      </section>
    </main>
  )
}

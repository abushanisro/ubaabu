import Link from 'next/link'
import type { ContextualLink, LandingPageExpansion } from './contentTypes'

/**
 * Long-form blocks that bring thin landing pages to 900–1,500 words
 * (SEO audit Nov 2026, issue #06): walkthrough, use cases by industry, customer
 * proof, comparison table and related links. Shared by the English landing
 * template and the German pages; styling follows the existing landing template.
 */
const LABELS = {
  en: { walkthrough: 'How it works', useCases: 'Use cases', proof: 'Proof', compare: 'Compare', related: 'Related reading', read: 'Read the case study' },
  de: { walkthrough: 'So funktioniert es', useCases: 'Anwendungsfälle', proof: 'Nachweise', compare: 'Vergleich', related: 'Weiterlesen', read: 'Fallstudie lesen' },
}

type Expansion = Pick<LandingPageExpansion, 'walkthrough' | 'useCases' | 'proof' | 'comparison' | 'related'>

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">{children}</p>
}

export function WalkthroughBlock({ data, lang = 'en' }: { data: Expansion['walkthrough']; lang?: 'en' | 'de' }) {
  return (
    <section className="py-12 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <Eyebrow>{LABELS[lang].walkthrough}</Eyebrow>
        <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">{data.heading}</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-black/60">{data.intro}</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {data.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-black/10 p-5">
              <p className="text-sm font-bold text-[#0d9488]">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-lg font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function UseCasesBlock({ data, lang = 'en' }: { data: Expansion['useCases']; lang?: 'en' | 'de' }) {
  return (
    <section className="py-12 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <Eyebrow>{LABELS[lang].useCases}</Eyebrow>
        <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">{data.heading}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {data.items.map((item) => (
            <div key={item.industry} className="rounded-xl border border-[#0d9488]/15 bg-[#0d9488]/5 p-5">
              <h3 className="text-base font-bold">{item.industry}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/65">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProofBlock({ data, lang = 'en' }: { data: Expansion['proof']; lang?: 'en' | 'de' }) {
  return (
    <section className="py-12 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <Eyebrow>{LABELS[lang].proof}</Eyebrow>
        <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">{data.heading}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {data.items.map((item) => (
            <Link key={item.href + item.title} href={item.href} className="group rounded-xl border border-black/10 p-5 hover:border-[#0d9488]/40">
              <h3 className="text-base font-bold group-hover:text-[#0d9488]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{item.body}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-[#0d9488]">{LABELS[lang].read} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ComparisonBlock({ data, lang = 'en' }: { data: Expansion['comparison']; lang?: 'en' | 'de' }) {
  return (
    <section className="py-12 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <Eyebrow>{LABELS[lang].compare}</Eyebrow>
        <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">{data.heading}</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-black/60">{data.intro}</p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-black/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-[#f8fafb]">
              <tr>
                {data.columns.map((col) => (
                  <th key={col} scope="col" className="px-4 py-3 font-semibold text-black/80">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.join('|')} className="border-t border-black/10 align-top">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 font-semibold text-black/75">{cell}</th>
                    ) : (
                      <td key={i} className="px-4 py-3 text-black/60">{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function RelatedLinksBlock({ links, lang = 'en', heading }: { links: ContextualLink[]; lang?: 'en' | 'de'; heading?: string }) {
  if (!links.length) return null
  return (
    <section className="py-12 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{heading ?? LABELS[lang].related}</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block min-h-11 rounded-xl border border-black/10 p-4 hover:border-[#0d9488]/40">
                <span className="text-sm font-semibold text-[#0d9488]">{link.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-black/60">{link.context}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ExpansionBlocks({ data, lang = 'en' }: { data: Expansion; lang?: 'en' | 'de' }) {
  return (
    <>
      <WalkthroughBlock data={data.walkthrough} lang={lang} />
      <UseCasesBlock data={data.useCases} lang={lang} />
      <ProofBlock data={data.proof} lang={lang} />
      <ComparisonBlock data={data.comparison} lang={lang} />
    </>
  )
}

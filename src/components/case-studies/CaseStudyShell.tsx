import Link from 'next/link'
import { CASE_STUDIES } from './caseStudyData'

/* ─────────────── types ─────────────── */
interface Stat { label: string; value: string }

interface CaseStudyShellProps {
  slug: string
  industry: string
  date: string
  readTime: string
  metric?: string
  title: React.ReactNode
  subtitle: string
  image: string
  imageAlt?: string
  stats: Stat[]
  ctaTitle: string
  ctaBody: string
  ctaSource: string
  children: React.ReactNode
}

/* ─────────────── shared primitives (exported for pages) ─────────────── */

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0d9488]">
      {children}
    </p>
  )
}

export function Card({ children, className = '', accent = false }: { children: React.ReactNode; className?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border border-black/[0.07] bg-white shadow-sm overflow-hidden ${className}`}>
      {accent && <div className="h-0.5 w-full bg-gradient-to-r from-[#0d9488] to-[#2dd4bf]" />}
      <div className="p-5 md:p-6">{children}</div>
    </div>
  )
}

export function DarkCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-[#0f1b2d] overflow-hidden ${className}`}>
      <div className="h-0.5 w-full bg-gradient-to-r from-[#0d9488] to-[#2dd4bf]" />
      <div className="p-6 md:p-10">{children}</div>
    </div>
  )
}

export function StatRow({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex items-center justify-between py-2.5 text-[13px] border-b border-black/[0.05] last:border-0 ${className}`}>
      <span className="text-black/45">{label}</span>
      <span className="font-semibold text-[#0f1b2d] text-right">{value}</span>
    </div>
  )
}

export function BarRow({ label, value, pct, color = '#0d9488', extra }: { label: string; value: string; pct: number; color?: string; extra?: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
          <span className="text-[#475569] truncate">{label}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {extra && <span className="text-[11px] text-black/30">{extra}</span>}
          <span className="text-[13px] font-bold text-[#0f1b2d] tabular-nums">{value}</span>
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-black/[0.06]">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
      </div>
    </div>
  )
}

export function ImpactGrid({ items }: { items: { num: string; title: string; desc: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((v) => (
        <div key={v.num} className="flex gap-4 rounded-xl bg-white/[0.06] p-5 border border-white/[0.06]">
          <span className="shrink-0 text-xl font-bold text-[#2dd4bf] leading-tight mt-0.5">{v.num}</span>
          <div>
            <p className="mb-1 text-[13px] font-semibold text-white">{v.title}</p>
            <p className="text-[12px] leading-relaxed text-white/55">{v.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TagBadge({ type }: { type: 'Process' | 'Design' | 'Supplier' | 'Material' }) {
  const styles: Record<string, string> = {
    Process:  'bg-blue-50 text-blue-700 border-blue-100',
    Design:   'bg-violet-50 text-violet-700 border-violet-100',
    Supplier: 'bg-teal-50 text-teal-700 border-teal-100',
    Material: 'bg-orange-50 text-orange-700 border-orange-100',
  }
  return (
    <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${styles[type] ?? 'bg-gray-50 text-gray-600 border-gray-100'}`}>
      {type}
    </span>
  )
}

/* ─────────────── Related Case Studies ─────────────── */
function RelatedStudies({ slug }: { slug: string }) {
  const related = CASE_STUDIES.filter(cs => cs.slug !== slug).slice(0, 3)
  return (
    <section className="border-t border-black/[0.07] bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0d9488]">Related</p>
        <h2 className="mb-8 text-xl font-bold tracking-tight text-[#0f1b2d]">More case studies</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm transition-all hover:border-[#0d9488]/30 hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#0d9488]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0d9488]">
                  {cs.industry}
                </span>
                {cs.metric && (
                  <span className="rounded-full bg-[#0f1b2d]/5 px-2 py-0.5 text-[10px] font-semibold text-[#0f1b2d]/60">
                    {cs.metric}
                  </span>
                )}
              </div>
              <h3 className="text-[14px] font-bold leading-snug text-[#0f1b2d] group-hover:text-[#0d9488] transition-colors line-clamp-2">
                {cs.title}
              </h3>
              <p className="text-[12px] leading-relaxed text-black/45 line-clamp-2">{cs.excerpt}</p>
              <div className="mt-auto flex items-center gap-1.5 text-[12px] font-semibold text-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity">
                Read case study
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Shell ─────────────── */
export default function CaseStudyShell({
  slug, industry, date, readTime, metric, title, subtitle,
  image, imageAlt = '', stats, ctaTitle, ctaBody, ctaSource, children,
}: CaseStudyShellProps) {
  return (
    <main className="min-h-screen bg-[#f8fafb]">

      {/* ── Hero ── */}
      <div className="relative min-h-[340px] md:min-h-[500px] overflow-hidden bg-[#0f1b2d]">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(15,27,45,0.45) 0%, rgba(15,27,45,0.88) 70%, rgba(15,27,45,0.97) 100%)' }}
        />

        {/* Content */}
        <div className="relative mx-auto flex h-full min-h-[340px] md:min-h-[500px] max-w-[1280px] flex-col justify-end px-6 pb-10 md:px-12 md:pb-14">

          {/* Breadcrumb */}
          <Link
            href="/case-studies"
            className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Case Studies
          </Link>

          {/* Badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#0d9488] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {industry}
            </span>
            {metric && (
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-sm">
                {metric}
              </span>
            )}
          </div>

          <h1 className="max-w-[780px] text-2xl font-bold leading-tight tracking-tight text-white md:text-[40px] md:leading-[1.1]">
            {title}
          </h1>
          <p className="mt-3 max-w-[560px] text-[14px] leading-relaxed text-white/55 md:text-[16px]">
            {subtitle}
          </p>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-[12px] text-white/40">
            <span>{date}</span>
            <span className="text-white/20">·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-2 divide-x divide-y divide-black/[0.06] sm:grid-cols-3 md:divide-y-0 lg:grid-cols-5">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-4 py-5 ${i === 0 ? 'pl-0' : ''} ${i === stats.length - 1 ? 'pr-0' : ''}`}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-black/35">{s.label}</p>
                <p className="mt-1 text-[15px] font-bold text-[#0f1b2d] leading-snug">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page-specific body ── */}
      <div className="mx-auto max-w-[1280px] space-y-8 px-6 py-12 md:px-12 md:py-16 md:space-y-10">
        {children}
      </div>

      {/* ── Final CTA ── */}
      <div className="border-t border-black/[0.07] bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
          <div className="rounded-2xl bg-[#0f1b2d] px-8 py-12 text-center md:px-16 md:py-16 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute right-[-8%] top-[-20%] h-72 w-96 rotate-[-20deg] rounded-[28px] bg-[#2dd4bf]/10" />
              <div className="absolute left-[-10%] bottom-[-20%] h-56 w-80 rotate-[15deg] rounded-[28px] bg-[#0d9488]/10" />
            </div>
            <div className="relative">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2dd4bf]">For Enquiry</p>
              <h2 className="mx-auto mb-3 max-w-lg text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">
                {ctaTitle}
              </h2>
              <p className="mx-auto mb-8 max-w-md text-[14px] leading-relaxed text-white/50">
                {ctaBody}
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/request-demo"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0d9488] px-7 py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#0b7a70] hover:-translate-y-px"
                >
                  Request a Demo
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a
                  href={`/contact?source=${ctaSource}&cta=contact-sales`}
                  className="inline-flex items-center rounded-full border border-white/20 px-7 py-3 text-[13px] font-medium text-white/80 transition-all hover:border-white/40 hover:text-white"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related studies ── */}
      <RelatedStudies slug={slug} />

    </main>
  )
}

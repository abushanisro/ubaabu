/**
 * Topical-map taxonomy (SEO audit Nov 2026, issue #05).
 *
 * Every content item on the site (blog posts, glossary terms, landing pages,
 * comparison pages, case studies, downloads) is tagged to one or more of the 12
 * pillars from the topical map. The tags drive:
 *   - the 12 pillar hub pages at /topics/<slug> (each links to every spoke),
 *   - the "Related reading" block on blog posts and glossary terms,
 *   - the "Topics" links in the footer.
 * Tagging is rule-based on slug + title so new content is picked up automatically.
 */
import { POSTS } from '@/components/blog/blogData'
import { CASE_STUDIES } from '@/components/case-studies/caseStudyData'
import { COMPARISON_PAGE_SLUGS, SEO_LANDING_PAGES, GLOSSARY_TERMS } from '@/components/seo/seoRoadmapData'
import { PILLAR_COPY } from '@/components/seo/pillarCopy'

export type ContentKind = 'guide' | 'glossary' | 'product' | 'comparison' | 'case-study' | 'download' | 'report'

export interface ContentItem {
  href: string
  title: string
  kind: ContentKind
  description?: string
  /** Pillar slugs, most relevant first. */
  pillars: string[]
}

/** Pillar slug -> matching rule (applied to "slug title", lower-cased). Order = priority. */
const PILLAR_RULES: [string, RegExp][] = [
  ['should-cost-analysis', /should-?\s?cost|cost model|cost estimat|cost-estimat|cost breakdown|cost-breakdown|bottom-up|parametric|analogous|\bcers?\b|learning.curve|independent cost|ice-vs|cost engineering|cost-engineering|manufacturing cost|manufacturing-cost|costimator|apriori|product cost management|product-cost-management|\bpcm\b|machine.hour|cost driver|total cost formula/],
  ['manufacturing-process-costing', /\bcnc\b|machining|sheet.metal|forging|casting|moulding|molding|\bpcba?\b|harness|process library|process-library|cycle time|machine.hour|titanium|inconel|buy-to-fly|tooling|teardown|manufacturing process/],
  ['design-to-cost-dfm-vave', /\bdfma?\b|design.for|design.to|\bvave\b|value.engineering|value analysis|target.cost|teardown|design-for-excellence/],
  ['bom-management', /\bbom\b|bill of materials|engineering change|new product introduction|launch readiness|reverse bom/],
  ['supplier-intelligence-risk', /supplier(?!.negotiation)(?!.price)|single.source|sole.source|scorecard|qualification|supply chain risk|dual.sourcing|resilien|\bsrm\b|supplier radar/],
  ['strategic-sourcing-procurement', /sourcing|procurement|negotiation|\brfq\b|spend|price.increase|make.vs.buy|total cost of ownership|landed|vendor|reverse auction|\bmro\b|ddp|exw|cost avoidance/],
  ['aerospace-defence-space', /aerospace|defen[cs]e|\bspace\b|nadcap|as9100|\bitar\b|cmmc|satellite|export control/],
  ['india-manufacturing', /india|\bmsme\b|german|germany|belgium|deutschland/],
  ['materials-commodity-costs', /material|commodity|titanium|inconel|stainless|metal pric|benchmark/],
  ['quality-compliance-launch', /quality|\bppap\b|\bapqp\b|iatf|iso 9001|iso-9001|iso 27001|nadcap|as9100|launch|inspection/],
  ['ai-manufacturing-intelligence', /\bai\b|\bml\b|machine learning|digital twin|manufacturing intelligence|manufacturing-intelligence|compound growth|analytics/],
  ['comparisons-templates-tools', /alternative|\bvs\b|compared|comparison|template|calculator|checklist|scorecard|buyer|\bbest\b|worksheet|tools/],
]

export function pillarsFor(slug: string, title: string): string[] {
  const hay = `${slug.replace(/-/g, ' ')} ${slug} ${title}`.toLowerCase()
  const hits = PILLAR_RULES.filter(([, re]) => re.test(hay)).map(([p]) => p)
  return hits.length ? hits : ['ai-manufacturing-intelligence']
}

const DOWNLOADS: { file: string; title: string }[] = [
  { file: 'should-cost-model-template.xlsx', title: 'Should-cost model template (XLSX)' },
  { file: 'should-cost-analysis-checklist.pdf', title: 'Should-cost analysis checklist (PDF)' },
  { file: 'should-cost-gap-worksheet.csv', title: 'Should-cost gap worksheet (CSV)' },
  { file: 'should-cost-software-scorecard.csv', title: 'Should-cost software scorecard (CSV)' },
  { file: 'cost-breakdown-template.csv', title: 'Cost breakdown template (CSV)' },
  { file: 'machined-part-costing-template.csv', title: 'Machined part costing template (CSV)' },
  { file: 'machine-hour-rate-calculator.csv', title: 'Machine hour rate calculator (CSV)' },
  { file: 'sheet-metal-costing-template.csv', title: 'Sheet metal costing template (CSV)' },
  { file: 'learning-curve-calculator.xlsx', title: 'Learning curve cost calculator (XLSX)' },
  { file: 'design-to-cost-framework.csv', title: 'Design-to-cost framework (CSV)' },
  { file: 'dfm-checklist.csv', title: 'DFM checklist (CSV)' },
  { file: 'dfm-software-scorecard.csv', title: 'DFM software scorecard (CSV)' },
  { file: 'make-vs-buy-worksheet.csv', title: 'Make-vs-buy worksheet (CSV)' },
  { file: 'negotiation-prep-sheet.pdf', title: 'Supplier negotiation prep sheet (PDF)' },
  { file: 'price-increase-response-template.xlsx', title: 'Supplier price increase response template (XLSX)' },
  { file: 'supplier-scorecard-template.xlsx', title: 'Supplier scorecard template (XLSX)' },
  { file: 'aerospace-supplier-qualification-checklist.pdf', title: 'Aerospace (AS9100) supplier qualification checklist (PDF)' },
  { file: 'aerospace-costing-checklist.csv', title: 'Aerospace costing checklist (CSV)' },
  { file: 'manufacturing-costing-software-checklist.csv', title: 'Manufacturing costing software checklist (CSV)' },
  { file: 'pcm-evaluation-checklist.csv', title: 'Product cost management (PCM) evaluation checklist (CSV)' },
]
export const DOWNLOAD_FILES = DOWNLOADS.map((d) => ({ ...d, href: `/downloads/${d.file}` }))

/** Glossary terms with expanded (indexable) pages. Filled in by glossary module. */
import { EXPANDED_GLOSSARY_SLUGS } from '@/components/seo/glossaryContent'

const MONEY_PAGES: { href: string; title: string }[] = [
  { href: '/should-cost-analysis-software', title: 'Should-Cost Analysis Software' },
  { href: '/bom-management-software', title: 'BOM Management Software' },
  { href: '/supplier-intelligence', title: 'Supplier Intelligence Platform' },
  { href: '/defence-manufacturing', title: 'Defence Manufacturing Software' },
  { href: '/aerospace-cost-engineering', title: 'Aerospace Cost Engineering' },
]

function build(): ContentItem[] {
  const items: ContentItem[] = []
  for (const p of POSTS) {
    items.push({ href: `/blog/${p.slug}`, title: p.title, kind: 'guide', description: p.excerpt, pillars: pillarsFor(p.slug, p.title) })
  }
  for (const t of GLOSSARY_TERMS.filter((t) => EXPANDED_GLOSSARY_SLUGS.has(t.slug))) {
    items.push({ href: `/glossary/${t.slug}`, title: t.term.replace(/^\w/, (c) => c.toUpperCase()), kind: 'glossary', description: t.description, pillars: pillarsFor(t.slug, t.term) })
  }
  for (const m of MONEY_PAGES) {
    const slug = m.href.slice(1)
    items.push({ href: m.href, title: m.title, kind: 'product', pillars: pillarsFor(slug, m.title) })
  }
  for (const l of SEO_LANDING_PAGES) {
    const title = l.title.split('|')[0].trim()
    items.push({ href: `/${l.slug}`, title, kind: 'product', description: l.description, pillars: pillarsFor(l.slug, title) })
  }
  for (const slug of COMPARISON_PAGE_SLUGS) {
    const title = `Emithran vs ${slug.replace('emithran-vs-', '').replace(/^\w/, (c) => c.toUpperCase()).replace('Dfma', 'DFMA')}`
    items.push({ href: `/${slug}`, title, kind: 'comparison', pillars: ['comparisons-templates-tools', 'should-cost-analysis', ...(slug.includes('dfma') ? ['design-to-cost-dfm-vave'] : [])] })
  }
  for (const c of CASE_STUDIES) {
    items.push({ href: `/case-studies/${c.slug}`, title: c.title, kind: 'case-study', description: c.excerpt, pillars: pillarsFor(c.slug, `${c.title} ${c.industry}`) })
  }
  for (const d of DOWNLOAD_FILES) {
    items.push({ href: d.href, title: d.title, kind: 'download', pillars: [...pillarsFor(d.file.replace(/\.\w+$/, ''), d.title), 'comparisons-templates-tools'] })
  }
  items.push({
    href: '/state-of-manufacturing-cost-intelligence-2026',
    title: 'State of Manufacturing Cost Intelligence 2026 (report)',
    kind: 'report',
    pillars: ['should-cost-analysis', 'india-manufacturing', 'materials-commodity-costs', 'ai-manufacturing-intelligence'],
  })
  // De-duplicate pillar lists.
  return items.map((i) => ({ ...i, pillars: [...new Set(i.pillars)] }))
}

export const CONTENT_ITEMS: ContentItem[] = build()

export const PILLARS = PILLAR_COPY

export function itemsForPillar(slug: string): ContentItem[] {
  return CONTENT_ITEMS.filter((i) => i.pillars.includes(slug))
}

export function pillarBySlug(slug: string) {
  return PILLAR_COPY.find((p) => p.slug === slug)
}

/**
 * Related reading for a page: other guides sharing the page's primary pillar first,
 * then its secondary pillars. Excludes the page itself.
 */
export function relatedReading(href: string, pillars: string[], limit = 6): ContentItem[] {
  const out: ContentItem[] = []
  for (const p of pillars) {
    for (const i of CONTENT_ITEMS) {
      if (out.length >= limit) return out
      if (i.href === href || out.some((o) => o.href === i.href)) continue
      if ((i.kind === 'guide' || i.kind === 'glossary' || i.kind === 'case-study') && i.pillars[0] === p) out.push(i)
    }
  }
  for (const p of pillars) {
    for (const i of CONTENT_ITEMS) {
      if (out.length >= limit) return out
      if (i.href === href || out.some((o) => o.href === i.href)) continue
      if ((i.kind === 'guide' || i.kind === 'case-study') && i.pillars.includes(p)) out.push(i)
    }
  }
  return out
}

const CORE_MONEY = new Set(MONEY_PAGES.map((m) => m.href))

/**
 * Solution / product pages to recommend from a piece of content: pages sharing its
 * pillars, preferring the secondary landing pages (the five core product pages are
 * already linked sitewide from the navbar and footer). SEO audit #05: every money
 * page should collect 10+ contextual inlinks.
 */
export function solutionLinksFor(href: string, pillars: string[], limit = 3): ContentItem[] {
  const out: ContentItem[] = []
  const products = CONTENT_ITEMS.filter((i) => i.kind === 'product' && i.href !== href)
  for (const pass of [false, true]) {
    for (const p of pillars) {
      for (const i of products) {
        if (out.length >= limit) return out
        if (out.some((o) => o.href === i.href)) continue
        if (CORE_MONEY.has(i.href) !== pass) continue
        if (i.pillars[0] === p || (pass && i.pillars.includes(p))) out.push(i)
      }
    }
  }
  return out
}

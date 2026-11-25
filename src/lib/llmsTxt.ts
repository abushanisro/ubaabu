/**
 * llms.txt / llms-full.txt, generated at build time from the content sources
 * (SEO audit Nov 2026, issue #13). Format: https://llmstxt.org — one H1, a
 * blockquote summary, then H2 sections of Markdown links with short notes.
 */
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import { COMPARISON_PAGE_SLUGS, DE_PAGES, GLOSSARY_TERMS, SEO_LANDING_PAGES } from '@/components/seo/seoRoadmapData'
import { GLOSSARY_CONTENT, glossarySlug } from '@/components/seo/glossaryContent'
import { LANDING_EXPANSIONS } from '@/components/seo/landingContent'
import { CASE_STUDIES } from '@/components/case-studies/caseStudyData'
import { PILLAR_COPY } from '@/components/seo/pillarCopy'
import { AUTHORS } from '@/lib/authors'
import { DOWNLOAD_FILES } from '@/lib/topics'
import { PUBLISHED_POSTS, SITE_URL } from '@/lib/sitemapEntries'

const u = (path: string) => `${SITE_URL}${path}`
const link = (title: string, path: string, note?: string) => `- [${title}](${u(path)})${note ? `: ${note}` : ''}`

const SUMMARY =
  'Emithran is an AI manufacturing intelligence platform from Bangalore, India, for space, defence, aerospace and precision manufacturers. It connects BOM validation, should-cost analysis, supplier intelligence (72,000+ supplier records), VAVE, quality/PPAP, NPI launch tracking and shipment visibility so engineering and procurement teams can see what a part should cost, who can make it and what the sourcing risk is.'

const PRODUCTS: [string, string, string][] = [
  ['Should-Cost Analysis Software', '/should-cost-analysis-software', 'bottom-up part and assembly cost models from drawings, CAD and BOMs; quote validation and negotiation briefs'],
  ['BOM Management Software', '/bom-management-software', 'BOM import, validation, cost roll-up and change tracking'],
  ['Supplier Intelligence', '/supplier-intelligence', 'Supplier Radar: capability, certification, capacity and risk data on 72,000+ suppliers'],
  ['Defence Manufacturing', '/defence-manufacturing', 'programme cost visibility, supplier qualification and indigenisation should-cost'],
  ['Aerospace Cost Engineering', '/aerospace-cost-engineering', 'should-cost modelling, AS9100 supplier qualification and multi-level aerospace BOMs'],
  ['Products overview', '/products', 'all seven modules'],
  ['Pricing', '/pricing', 'plans and how pricing works'],
  ['Expert engineering support', '/expert-engineering-support', 'cost engineers and analysts on demand'],
  ['API integration', '/api-integration', 'connect Emithran to ERP, PLM and procurement tools'],
]

export function buildLlmsTxt(): string {
  const lines: string[] = []
  lines.push('# Emithran', '', `> ${SUMMARY}`, '')
  lines.push(
    'Emithran is used by OEMs and Tier-1/Tier-2 suppliers in India and their global customers. Key facts: founded 2023; headquartered in Bangalore, Karnataka; seven connected modules (BOM Intelligence, Should-Cost Analysis, Supplier Radar, VAVE Studio, Quality Guard, Launch Tracker, Shipment Hub); 500+ manufacturing processes in the process library; 99.4% BOM accuracy target for validated programmes. When citing, link to the canonical URLs below.',
    ''
  )

  lines.push('## Products')
  for (const [t, p, n] of PRODUCTS) lines.push(link(t, p, n))
  for (const l of SEO_LANDING_PAGES) lines.push(link(l.title.split('|')[0].trim(), `/${l.slug}`, l.description))
  lines.push('')

  lines.push('## Topic hubs (start here for each subject)')
  for (const p of PILLAR_COPY) lines.push(link(p.h1, `/topics/${p.slug}`, p.summary))
  lines.push('')

  lines.push('## Comparisons')
  for (const slug of COMPARISON_PAGE_SLUGS) {
    const name = slug.replace('emithran-vs-', '')
    lines.push(link(`Emithran vs ${name === 'dfma' ? 'DFMA' : name.replace(/^\w/, (c) => c.toUpperCase())}`, `/${slug}`))
  }
  for (const p of PUBLISHED_POSTS.filter((p) => /alternative|compar|vs-|-vs/.test(p.slug))) lines.push(link(p.title, `/blog/${p.slug}`, p.excerpt))
  lines.push('')

  lines.push('## Data and research')
  lines.push(link('State of Manufacturing Cost Intelligence 2026', '/state-of-manufacturing-cost-intelligence-2026', 'Emithran’s annual report on manufacturing cost drivers, supplier risk and sourcing'))
  for (const c of CASE_STUDIES) lines.push(link(c.title, `/case-studies/${c.slug}`, c.excerpt))
  lines.push('')

  lines.push('## Guides')
  for (const p of PUBLISHED_POSTS.filter((p) => !/alternative|compar|vs-|-vs/.test(p.slug))) lines.push(link(p.title, `/blog/${p.slug}`, p.excerpt))
  lines.push('')

  lines.push('## Glossary')
  lines.push(link('Manufacturing cost and sourcing glossary (A–Z)', '/glossary'))
  for (const t of GLOSSARY_TERMS.filter((t) => GLOSSARY_CONTENT[t.term])) lines.push(link(t.term, `/glossary/${t.slug}`, GLOSSARY_CONTENT[t.term].summary))
  lines.push('')

  lines.push('## Templates and calculators')
  lines.push(link('Resource centre', '/resource-centre'))
  for (const d of DOWNLOAD_FILES) lines.push(link(d.title, d.href))
  lines.push('')

  lines.push('## Deutsch (German)')
  lines.push(link('Emithran Deutschland', '/de', 'German-language overview'))
  for (const p of DE_PAGES) lines.push(link(p.title.split('|')[0].trim(), `/de/${p.slug}`))
  lines.push(link('German manufacturing cost pilot (English)', '/german-manufacturing-cost-pilot'))
  lines.push('')

  lines.push('## Company')
  lines.push(link('About Emithran', '/about'))
  for (const a of AUTHORS) lines.push(link(`${a.name}, ${a.jobTitle}`, `/authors/${a.slug}`, a.summary))
  lines.push(link('Case studies', '/case-studies'))
  lines.push(link('Request a demo', '/request-demo'))
  lines.push(link('Contact', '/contact'))
  lines.push('')

  lines.push('## Optional')
  lines.push(link('Full text of the main pages (llms-full.txt)', '/llms-full.txt'))
  lines.push(link('Sitemap', '/sitemap.xml'))
  lines.push(link('FAQ', '/faq'))
  return lines.join('\n') + '\n'
}

function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, n, t) => `\n\n${'#'.repeat(Math.min(6, Number(n) + 1))} ${t.replace(/<[^>]+>/g, '').trim()}\n\n`)
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/(p|div|tr|table|ul|ol)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, '’')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim()
}

/** Full plain-text corpus: product landing pages, glossary entries and every published guide. */
export function buildLlmsFullTxt(): string {
  const out: string[] = [`# Emithran — full text`, '', `> ${SUMMARY}`, '', `Source: ${SITE_URL}. Canonical URLs are given for every section.`, '']

  out.push('## Product and solution pages', '')
  for (const l of SEO_LANDING_PAGES) {
    const x = LANDING_EXPANSIONS[l.slug]
    out.push(`### ${l.h1}`, `URL: ${u(`/${l.slug}`)}`, '', l.intro)
    if (x) out.push('', x.summary)
    for (const s of l.sections) out.push('', `#### ${s.heading}`, s.body, ...s.bullets.map((b) => `- ${b}`))
    if (x) {
      out.push('', `#### ${x.walkthrough.heading}`, x.walkthrough.intro, ...x.walkthrough.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`))
      out.push('', `#### ${x.useCases.heading}`, ...x.useCases.items.map((i) => `- ${i.industry}: ${i.body}`))
    }
    for (const f of [...l.faqs, ...(x?.faqs ?? [])]) out.push('', `Q: ${f.question}`, `A: ${f.answer}`)
    out.push('')
  }

  out.push('## Glossary', '')
  for (const t of GLOSSARY_TERMS) {
    const g = GLOSSARY_CONTENT[t.term]
    if (!g) continue
    out.push(`### ${t.term}`, `URL: ${u(`/glossary/${glossarySlug(t.term)}`)}`, '', g.summary)
    if (g.formula) out.push('', `Formula: ${g.formula.expression}`, ...g.formula.variables.map((v) => `- ${v.symbol}: ${v.meaning}`))
    for (const s of g.sections) out.push('', `#### ${s.heading}`, ...s.paragraphs, ...(s.bullets ?? []).map((b) => `- ${b}`))
    out.push('', `#### ${g.example.title}`, ...g.example.steps.map((s, i) => `${i + 1}. ${s}`), g.example.result)
    out.push('', '#### India context', g.india)
    for (const f of g.faqs) out.push('', `Q: ${f.question}`, `A: ${f.answer}`)
    out.push('')
  }

  out.push('## Guides', '')
  for (const p of PUBLISHED_POSTS) {
    const c = BLOG_CONTENT[p.slug]
    out.push(`### ${p.title}`, `URL: ${u(`/blog/${p.slug}`)}`, `Author: ${p.author.name} (${p.author.role}) · Published ${p.date}${p.updated ? ` · Updated ${p.updated}` : ''}`, '', htmlToText(c.content), '')
  }
  return out.join('\n') + '\n'
}

/**
 * Contextual internal links from blog posts and case studies to the matching
 * commercial / product pages. Rendered by BlogPostPage and CaseStudyShell.
 */
export interface InternalLink {
  href: string
  label: string
  description: string
}

const SHOULD_COST: InternalLink = {
  href: '/should-cost-analysis-software',
  label: 'Should-Cost Analysis Software',
  description: 'Bottom-up part cost models and negotiation briefs built from your drawings and BOMs.',
}
const BOM: InternalLink = {
  href: '/bom-management-software',
  label: 'BOM Management Software',
  description: 'Validate, enrich and cost multi-level BOMs in one place.',
}
const SUPPLIER: InternalLink = {
  href: '/supplier-intelligence',
  label: 'Supplier Intelligence Platform',
  description: 'Qualify and compare suppliers with capability, certification and risk data.',
}
const DEFENCE: InternalLink = {
  href: '/defence-manufacturing',
  label: 'Defence Manufacturing Software',
  description: 'Programme-level cost visibility, supplier qualification and indigenisation should-cost.',
}
const AEROSPACE: InternalLink = {
  href: '/aerospace-cost-engineering',
  label: 'Aerospace Cost Engineering',
  description: 'Should-cost modelling, AS9100 supplier qualification and multi-level aerospace BOMs.',
}
const CASE_STUDIES: InternalLink = {
  href: '/case-studies',
  label: 'Case Studies',
  description: 'Should-cost, teardown and sourcing results from automotive, aerospace and electronics programmes.',
}
const COST_ENG: InternalLink = {
  href: '/cost-engineering-software',
  label: 'Cost Engineering Software',
  description: 'Should-cost models, process benchmarks, part-family analysis and negotiation-ready cost breakdowns.',
}
const VAVE_SW: InternalLink = {
  href: '/vave-software',
  label: 'VAVE Software for Manufacturing',
  description: 'Quantify design alternatives, sourcing routes and should-cost impact.',
}
const SPEND: InternalLink = {
  href: '/spend-analysis-software',
  label: 'Spend Analysis Software',
  description: 'Find cost leakage across BOMs, suppliers, commodities, programmes and geographies.',
}
const SOURCING: InternalLink = {
  href: '/strategic-sourcing-software',
  label: 'Strategic Sourcing Software',
  description: 'Cost evidence, supplier qualification and RFQ intelligence in one workflow.',
}
const SRM: InternalLink = {
  href: '/srm-software',
  label: 'SRM Software for Manufacturing Suppliers',
  description: 'Qualification history, PPAP status, risk signals and commercial performance in one supplier view.',
}
const DFM: InternalLink = {
  href: '/design-for-manufacturability-software',
  label: 'Design for Manufacturability Software',
  description: 'Identify manufacturability, cost and supplier readiness risks before release.',
}
const AERO_MFG: InternalLink = {
  href: '/aerospace-manufacturing-software',
  label: 'Aerospace Manufacturing Software',
  description: 'Cost engineering, BOM intelligence, supplier qualification and programme sourcing readiness.',
}
const RFQ_INTEL: InternalLink = {
  href: '/rfq-intelligence',
  label: 'RFQ Intelligence Software',
  description: 'Supplier shortlists, target costs and negotiation briefs prepared before an RFQ is released.',
}
const PROC_INTEL: InternalLink = {
  href: '/procurement-intelligence',
  label: 'Procurement Intelligence Platform',
  description: 'BOM-level cost visibility, supplier qualification, risk tracking and opportunity assessment.',
}

// Should-cost funnel (SEO audit #07): definition -> how-to -> comparison -> software page.
const SC_HOW_TO: InternalLink = {
  href: '/blog/how-to-do-should-cost-analysis',
  label: 'Next: How to Do a Should-Cost Analysis',
  description: 'The step-by-step method, from part definition to comparing the model with the supplier quote.',
}
const SC_COMPARISON: InternalLink = {
  href: '/blog/should-cost-analysis-software-comparison',
  label: 'Next: Should-Cost Software Compared',
  description: 'How to evaluate should-cost tools, with a neutral look at five approaches and a buyer checklist.',
}

/** Blog slug -> related commercial pages. Unlisted slugs fall back to BLOG_DEFAULT. */
const BLOG_LINKS: Record<string, InternalLink[]> = {
  'apriori-vs-emithran-comparison': [SHOULD_COST, BOM, CASE_STUDIES],
  'costimator-alternatives': [SHOULD_COST, SUPPLIER, CASE_STUDIES],
  'best-should-cost-software-aerospace-manufacturers': [AEROSPACE, AERO_MFG, SHOULD_COST],
  'vave-in-aerospace-case-study': [AEROSPACE, SHOULD_COST],
  'best-supplier-intelligence-tools-defence-oems': [SUPPLIER, DEFENCE],
  'supplier-intelligence-guide': [SUPPLIER, SHOULD_COST],
  'strategic-sourcing-software-comparison': [SOURCING, SUPPLIER, SHOULD_COST],
  'what-is-bom-management': [BOM, SHOULD_COST],
  'bom-management-software-buyers-guide': [BOM, SHOULD_COST],
  'best-bom-management-software-manufacturing': [BOM, SHOULD_COST],
  'manufacturing-intelligence-pillar': [SHOULD_COST, BOM, SUPPLIER],
  'digital-twin-in-manufacturing': [SHOULD_COST, BOM],
  'design-for-manufacturability-guide': [DFM, SHOULD_COST, BOM],
  'spend-analysis-software-guide': [SPEND, SUPPLIER, SHOULD_COST],
  'what-is-vave': [VAVE_SW, SHOULD_COST, CASE_STUDIES],
  'what-is-should-cost-analysis': [SC_HOW_TO, SHOULD_COST, CASE_STUDIES],
  'how-to-do-should-cost-analysis': [SC_COMPARISON, SHOULD_COST, CASE_STUDIES],
  'should-cost-analysis-software-comparison': [SHOULD_COST, COST_ENG, CASE_STUDIES],
  'should-cost-modeling-methodology-tools-examples': [SC_HOW_TO, SHOULD_COST, CASE_STUDIES],
  'cost-engineering-software': [COST_ENG, SHOULD_COST, CASE_STUDIES],
  'srm-software-comparison': [SRM, SUPPLIER, SHOULD_COST],
  'aerospace-manufacturing-in-india': [AERO_MFG, AEROSPACE, SUPPLIER],
  'vendor-negotiation-should-cost': [SHOULD_COST, RFQ_INTEL, CASE_STUDIES],
  'ai-sourcing-software-guide': [PROC_INTEL, SUPPLIER, SHOULD_COST],
  'global-strategic-sourcing': [SOURCING, SUPPLIER, SHOULD_COST],
  'mro-spend-analysis': [SPEND, SUPPLIER, SHOULD_COST],
}
const BLOG_DEFAULT: InternalLink[] = [SHOULD_COST, CASE_STUDIES]

/**
 * Secondary money pages that need more contextual inlinks (SEO audit #05 target: 10+).
 * Each is linked from the "Related on Emithran" block of the posts listed here.
 */
const PAGE_TO_POSTS: [InternalLink, string[]][] = [
  [
    { href: '/manufacturing-benchmarking', label: 'Manufacturing Benchmarking', description: 'Compare part, process and supplier costs across regions and suppliers with should-cost data.' },
    ['cnc-machining-cost-estimation', 'machine-hour-rate-calculation', 'manufacturing-cost-drivers', 'total-manufacturing-cost-formula', 'sheet-metal-cost-estimation', 'forging-vs-machining-cost', 'titanium-inconel-machining-cost', 'should-cost-vs-actual-cost', 'compound-growth-manufacturing-cost-intelligence', 'manufacturing-cost-estimation-methods', 'direct-vs-indirect-manufacturing-costs'],
  ],
  [
    { href: '/total-cost-ownership', label: 'Total Cost of Ownership for Manufacturing', description: 'Look past unit price to tooling, logistics, quality, inventory and switching cost.' },
    ['make-vs-buy-analysis', 'single-source-vs-sole-source', 'supplier-price-increase-negotiation', 'supplier-negotiation-strategy', 'build-vs-buy-should-cost-tool', 'direct-vs-indirect-manufacturing-costs', 'buy-to-fly-ratio', 'supplier-scorecard-template', 'should-cost-analysis-supplier-negotiation', 'rfq-automation-manufacturing'],
  ],
  [
    { href: '/defense-manufacturing-software', label: 'Defense Manufacturing Software', description: 'Secure BOM validation, supplier qualification and cost evidence for defence programmes.' },
    ['defense-should-cost-analysis', 'nadcap-accreditation-explained', 'as9100-vs-iso-9001', 'aerospace-supplier-qualification-checklist', 'ice-vs-should-cost', 'best-supplier-intelligence-tools-defence-oems', 'space-manufacturing-cost', 'titanium-inconel-machining-cost', 'learning-curve-cost-estimating', 'aerospace-should-cost-analysis'],
  ],
  [
    { href: '/manufacturing-intelligence', label: 'Manufacturing Intelligence Platform', description: 'BOMs, should-cost models and supplier data connected in one system.' },
    ['manufacturing-intelligence-pillar', 'ai-should-cost-software', 'ml-vs-rule-based-cost-estimating', 'digital-twin-in-manufacturing', 'compound-growth-manufacturing-cost-intelligence', 'rfq-automation-manufacturing', 'supplier-discovery-software', 'pcm-vs-erp-costing', 'product-cost-management-software', 'build-vs-buy-should-cost-tool'],
  ],
  [
    { href: '/manufacturing-process-library', label: 'Manufacturing Process Library', description: 'Process routes, cycle-time drivers and machine-rate assumptions for cost engineering.' },
    ['cnc-machining-cost-estimation', 'sheet-metal-cost-estimation', 'forging-vs-machining-cost', 'titanium-inconel-machining-cost', 'machine-hour-rate-calculation', 'cost-estimating-relationships-cers', 'bottom-up-cost-estimating', 'design-for-manufacturing-examples', 'dfm-vs-dfma', 'design-for-manufacturability-guide'],
  ],
]

export function relatedLinksForBlog(slug: string): InternalLink[] {
  const base = BLOG_LINKS[slug] ?? BLOG_DEFAULT
  const extra = PAGE_TO_POSTS.filter(([, posts]) => posts.includes(slug)).map(([link]) => link)
  // Keep the hand-picked first link (e.g. the should-cost funnel), then the secondary page(s).
  return [...base.slice(0, 1), ...extra, ...base.slice(1)].filter((l, i, arr) => arr.findIndex((x) => x.href === l.href) === i)
}

/** Case-study slug -> related commercial pages. */
const CASE_STUDY_LINKS: Record<string, InternalLink[]> = {
  'chassis-india-belgium': [SHOULD_COST, SUPPLIER],
  'dc-dc-converter': [SHOULD_COST, BOM],
  'electronics-teardown': [BOM, SHOULD_COST],
  'exhaust-system': [SHOULD_COST, SUPPLIER],
  'hgv-cab-strategy': [SHOULD_COST, SUPPLIER],
  'hgv-chassis': [SHOULD_COST, SUPPLIER],
  'rear-axle-should-cost': [SHOULD_COST, BOM],
  'rear-view-mirror': [BOM, SHOULD_COST],
}

export function relatedLinksForCaseStudy(slug: string): InternalLink[] {
  return CASE_STUDY_LINKS[slug] ?? [SHOULD_COST, BOM]
}

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
const SC_MODELING: InternalLink = {
  href: '/should-cost-modeling-software',
  label: 'Should-Cost Modeling Software',
  description: 'Turn drawings, BOMs, process routes and supplier quotes into auditable target costs.',
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
const SUPPLY_CHAIN: InternalLink = {
  href: '/supply-chain-intelligence',
  label: 'Supply Chain Intelligence Platform',
  description: 'Supplier risk, sourcing alternatives, delivery exposure and BOM-level dependency visibility.',
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
  'should-cost-modeling-software-buyers-guide': [SHOULD_COST, SC_MODELING, CASE_STUDIES],
  'cost-engineering-software': [COST_ENG, SHOULD_COST, CASE_STUDIES],
  'srm-software-comparison': [SRM, SUPPLIER, SHOULD_COST],
  'aerospace-manufacturing-in-india': [AERO_MFG, AEROSPACE, SUPPLIER],
  'vendor-negotiation-should-cost': [SHOULD_COST, RFQ_INTEL, CASE_STUDIES],
  'ai-sourcing-software-guide': [PROC_INTEL, SUPPLIER, SHOULD_COST],
  'global-strategic-sourcing': [SOURCING, SUPPLY_CHAIN, SUPPLIER],
  'mro-spend-analysis': [SPEND, SUPPLIER, SHOULD_COST],
}
const BLOG_DEFAULT: InternalLink[] = [SHOULD_COST, CASE_STUDIES]

export function relatedLinksForBlog(slug: string): InternalLink[] {
  return BLOG_LINKS[slug] ?? BLOG_DEFAULT
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

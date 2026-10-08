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
const VS_APRIORI: InternalLink = {
  href: '/emithran-vs-apriori',
  label: 'Emithran vs aPriori',
  description: 'Feature-by-feature comparison of the two should-cost platforms.',
}
const VS_COSTIMATOR: InternalLink = {
  href: '/emithran-vs-costimator',
  label: 'Emithran vs Costimator',
  description: 'How Emithran compares with Costimator for cost estimating.',
}
const CASE_STUDIES: InternalLink = {
  href: '/case-studies',
  label: 'Case Studies',
  description: 'Should-cost, teardown and sourcing results from automotive, aerospace and electronics programmes.',
}

/** Blog slug -> related commercial pages. Unlisted slugs fall back to BLOG_DEFAULT. */
const BLOG_LINKS: Record<string, InternalLink[]> = {
  'apriori-vs-emithran-comparison': [VS_APRIORI, SHOULD_COST],
  'costimator-alternatives': [VS_COSTIMATOR, SHOULD_COST],
  'best-should-cost-software-aerospace-manufacturers': [AEROSPACE, SHOULD_COST],
  'vave-in-aerospace-case-study': [AEROSPACE, SHOULD_COST],
  'best-supplier-intelligence-tools-defence-oems': [SUPPLIER, DEFENCE],
  'supplier-intelligence-guide': [SUPPLIER, SHOULD_COST],
  'strategic-sourcing-software-comparison': [SUPPLIER, SHOULD_COST],
  'what-is-bom-management': [BOM, SHOULD_COST],
  'bom-management-software-buyers-guide': [BOM, SHOULD_COST],
  'best-bom-management-software-manufacturing': [BOM, SHOULD_COST],
  'manufacturing-intelligence-pillar': [SHOULD_COST, BOM, SUPPLIER],
  'digital-twin-in-manufacturing': [SHOULD_COST, BOM],
  'design-for-manufacturability-guide': [SHOULD_COST, BOM],
  'spend-analysis-software-guide': [SHOULD_COST, SUPPLIER],
  'what-is-vave': [SHOULD_COST, CASE_STUDIES],
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

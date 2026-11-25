/**
 * Shared shapes for the long-form SEO content modules (glossary expansions,
 * landing-page expansions, German pages and pillar hubs). Content lives in plain
 * data files so the page templates stay presentational.
 */

export interface ContextualLink {
  href: string
  /** Anchor text. */
  label: string
  /** One sentence explaining why the reader should follow the link. */
  context: string
}

export interface FaqItem {
  question: string
  answer: string
}

/** Expanded glossary entry (target 400–700 words in total). */
export interface GlossaryEntryContent {
  /** 40–60 word, answer-first definition shown directly under the H1. */
  summary: string
  /** Optional formula block. */
  formula?: {
    expression: string
    variables: { symbol: string; meaning: string }[]
    note?: string
  }
  /** 2–3 explanatory sections; each paragraph starts with a 1–2 sentence answer-first summary. */
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  /** Worked example with illustrative numbers (clearly labelled as illustrative). */
  example: { title: string; steps: string[]; result: string }
  /** One paragraph on how the term applies in India's manufacturing context. */
  india: string
  faqs: FaqItem[]
  /** 3+ contextual links: the pillar blog post, the money page, and one more spoke. */
  links: ContextualLink[]
}

/** Optional blocks that extend an English SEO landing page to 900–1,500 words. */
export interface LandingPageExpansion {
  /** 40–60 word answer-first summary shown under the H1 intro. */
  summary: string
  walkthrough: {
    heading: string
    intro: string
    steps: { title: string; body: string }[]
  }
  useCases: {
    heading: string
    items: { industry: string; body: string }[]
  }
  /** Proof must point at real case studies on the site. */
  proof: {
    heading: string
    items: { title: string; body: string; href: string }[]
  }
  comparison: {
    heading: string
    intro: string
    columns: string[]
    rows: string[][]
  }
  /** Extra FAQs appended to the page's existing FAQs. */
  faqs: FaqItem[]
  /** Contextual links to related pages. */
  related: ContextualLink[]
}

/** Optional blocks that extend a German page. */
export interface GermanPageExpansion {
  summary: string
  walkthrough: { heading: string; intro: string; steps: { title: string; body: string }[] }
  useCases: { heading: string; items: { industry: string; body: string }[] }
  proof: { heading: string; items: { title: string; body: string; href: string }[] }
  comparison: { heading: string; intro: string; columns: string[]; rows: string[][] }
  faqs: FaqItem[]
  related: ContextualLink[]
}

/** German hub (/de) content. */
export interface GermanHubContent {
  title: string
  description: string
  h1: string
  intro: string
  summary: string
  modules: { heading: string; body: string }[]
  sections: { heading: string; paragraphs: string[] }[]
  proof: { heading: string; items: { title: string; body: string; href: string }[] }
  faqs: FaqItem[]
  cta: { heading: string; body: string }
}

/** Pillar hub intro copy (the spoke lists are generated from content tags). */
export interface PillarHubCopy {
  /** e.g. 'should-cost-analysis' — URL is /topics/<slug>. */
  slug: string
  /** Topical-map pillar id, e.g. 'P1'. */
  id: string
  name: string
  /** <title> without brand, ≤ 55 characters. */
  title: string
  /** Meta description, 140–155 characters. */
  description: string
  h1: string
  /** 40–60 word answer-first summary. */
  summary: string
  /** 2–3 short sections of orientation copy (≈ 300–450 words in total). */
  sections: { heading: string; paragraphs: string[] }[]
  /** The money page this pillar feeds. */
  moneyPage: { href: string; label: string }
}

/**
 * Expanded glossary entries (SEO audit Nov 2026, issue #03).
 *
 * Only these terms get their own indexable page at /glossary/<slug>. Every other
 * term is merged into the A–Z list on /glossary (its old URL redirects to its
 * anchor there) until it is expanded here.
 */
import type { GlossaryEntryContent } from './contentTypes'
import { GLOSSARY_CONTENT_A } from './glossaryContentA'
import { GLOSSARY_CONTENT_B } from './glossaryContentB'

export const GLOSSARY_CONTENT: Record<string, GlossaryEntryContent> = {
  ...GLOSSARY_CONTENT_A,
  ...GLOSSARY_CONTENT_B,
}

export function glossarySlug(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export const EXPANDED_GLOSSARY_SLUGS = new Set(Object.keys(GLOSSARY_CONTENT).map(glossarySlug))

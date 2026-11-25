/**
 * English <-> German page pairs (SEO audit Nov 2026, issue #08). Every pair gets
 * reciprocal hreflang annotations: en, de and x-default (= the English page).
 * Use `languageAlternates(path)` in a page's metadata `alternates.languages`.
 */
export const HREFLANG_PAIRS: { en: string; de: string }[] = [
  { en: '/', de: '/de' },
  { en: '/should-cost-analysis-software', de: '/de/should-cost-analysis-software' },
  { en: '/supplier-intelligence', de: '/de/supplier-intelligence' },
  { en: '/bom-management-software', de: '/de/bom-management-software' },
  { en: '/manufacturing-intelligence', de: '/de/manufacturing-intelligence' },
  { en: '/defence-manufacturing', de: '/de/defence-aerospace-manufacturing' },
]

export function languageAlternates(path: string): Record<string, string> | undefined {
  const pair = HREFLANG_PAIRS.find((p) => p.en === path || p.de === path)
  return pair ? { en: pair.en, de: pair.de, 'x-default': pair.en } : undefined
}

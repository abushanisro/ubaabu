import { glossaryEntries, renderUrlset, xmlResponse } from '@/lib/sitemapEntries'

export const dynamic = 'force-static'

export function GET() {
  return xmlResponse(renderUrlset(glossaryEntries()))
}

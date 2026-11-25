import { buildLlmsFullTxt } from '@/lib/llmsTxt'

// Generated at build time from the content sources (see src/lib/llmsTxt.ts).
export const dynamic = 'force-static'

export function GET() {
  return new Response(buildLlmsFullTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

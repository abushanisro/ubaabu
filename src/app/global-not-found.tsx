import type { Metadata } from 'next'
import './globals.css'
import RootShell from '@/components/layout/RootShell'
import NotFound from './(site)/not-found'

/**
 * 404 for URLs that match no route. Needed because the app has two root layouts
 * ((site) = English, (de) = German), so there is no single layout to wrap a
 * top-level not-found page. Returns a real HTTP 404.
 */
export const metadata: Metadata = {
  title: { absolute: '404 - Page not found | Emithran' },
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFound />
    </RootShell>
  )
}

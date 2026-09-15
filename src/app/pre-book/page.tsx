import type { Metadata } from 'next'
import PreBookPage from '@/components/pre-book/PreBookPage'

export const metadata: Metadata = {
  title: 'Pre-book the Vendor Management App | Emithran',
  description: 'Reserve early access to the Emithran Vendor Management app - supplier discovery, evaluation, RFQs, and nomination, built for the field.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/pre-book' },
}

export default function Page() {
  return <PreBookPage />
}

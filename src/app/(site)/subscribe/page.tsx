import type { Metadata } from 'next'
import SubscribePage from '@/components/subscribe/SubscribePage'

export const metadata: Metadata = {
  title: 'Subscribe to Emithran Updates',
  description: 'Sign up for Emithran manufacturing intelligence articles, case studies, and product updates.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/subscribe' },
}

export default function Page() {
  return <SubscribePage />
}

import type { Metadata } from 'next'
import EngineeringSupportPage from '@/components/engineering-support/EngineeringSupportPage'

export const metadata: Metadata = {
  title: 'Engineering Support',
  description: 'Expert engineering support, implementation partners, and managed services for the Emithran manufacturing intelligence platform.',
  alternates: { canonical: '/products/engineering-support' },
}

export default function Page() {
  return <EngineeringSupportPage />
}

import type { Metadata } from 'next'
import TrainingPage from '@/components/training/TrainingPage'

export const metadata: Metadata = {
  title: 'Training & Certification',
  description: 'Structured training tracks and certification for the Emithran platform: should-cost modelling, BOM validation and supplier intelligence for your team.',
  alternates: { canonical: '/products/training' },
}

export default function Page() {
  return <TrainingPage />
}

import type { Metadata } from 'next'
import TrainingPage from '@/components/training/TrainingPage'

export const metadata: Metadata = {
  title: 'Training & Certification',
  description: 'Structured training tracks and certification programmes for the Emithran manufacturing intelligence platform.',
  alternates: { canonical: '/products/training' },
}

export default function Page() {
  return <TrainingPage />
}

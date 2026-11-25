import type { Metadata } from 'next'
import IndustriesPage from '@/components/industries/IndustriesPage'
import { ogImages } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Space, Defence & Aerospace Manufacturing Software',
  description:
    'Emithran serves space, defence, aerospace and precision manufacturers, where cost accuracy, supplier quality and delivery visibility decide programmes.',
  keywords: [
    'defence manufacturing software India', 'aerospace manufacturing platform',
    'space manufacturing intelligence', 'precision manufacturing analytics India',
    'satellite hardware manufacturing', 'DRDO supply chain software',
    'ISRO manufacturing analytics', 'HAL supplier intelligence',
  ],
  alternates: { canonical: '/industries' },
  openGraph: {
    images: ogImages,
    title: 'Emithran for Space, Defence, Aerospace & Precision Manufacturing',
    description: 'Manufacturing intelligence built for India\'s mission-critical industries.',
    url: '/industries', type: 'website', siteName: 'Emithran',
  },
}

export default function Page() {
  return <IndustriesPage />
}

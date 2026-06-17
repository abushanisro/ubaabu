import type { Metadata } from 'next'
import IndustriesPage from '@/components/industries/IndustriesPage'

export const metadata: Metadata = {
  title: 'Industries - Space, Defence & Aerospace Manufacturing Software',
  description:
    'Emithran serves space & satellite hardware, defence OEMs, aerospace component suppliers, and precision manufacturers - mission-critical sectors where cost accuracy, supplier quality, and delivery visibility determine programme success.',
  keywords: [
    'defence manufacturing software India', 'aerospace manufacturing platform',
    'space manufacturing intelligence', 'precision manufacturing analytics India',
    'satellite hardware manufacturing', 'DRDO supply chain software',
    'ISRO manufacturing analytics', 'HAL supplier intelligence',
  ],
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Emithran for Space, Defence, Aerospace & Precision Manufacturing',
    description: 'Manufacturing intelligence built for India\'s mission-critical industries.',
    url: '/industries', type: 'website',
  },
}

export default function Page() {
  return <IndustriesPage />
}

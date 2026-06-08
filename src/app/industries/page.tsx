import type { Metadata } from 'next'
import IndustriesPage from '@/components/industries/IndustriesPage'

export const metadata: Metadata = {
  title: 'Industries | Emithran Manufacturing Intelligence',
  description:
    'Emithran serves space & satellite hardware, defence equipment manufacturing, aerospace component suppliers, and precision manufacturing — mission-critical sectors where cost, quality, and delivery visibility matter most.',
}

export default function Page() {
  return <IndustriesPage />
}

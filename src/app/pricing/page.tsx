import PricingHero from '@/components/pricing/PricingHero'
import PricingPackages from '@/components/pricing/PricingPackages'
import PricingFAQs from '@/components/pricing/PricingFAQs'
import PricingCTA from '@/components/pricing/PricingCTA'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Pricing - Outcome-Based Manufacturing Intelligence Plans',
  description:
    'Outcome-based pricing for manufacturing intelligence. No per-seat fees, no hidden costs. Plans for startups, growing OEMs, and enterprise manufacturers in defence, aerospace, and space.',
  keywords: [
    'manufacturing software pricing India', 'BOM software cost', 'should cost tool pricing',
    'manufacturing intelligence subscription', 'OEM software plans', 'affordable manufacturing AI',
  ],
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Emithran Pricing - No Per-Seat Fees, No Hidden Costs',
    description: 'Transparent, outcome-based plans for manufacturers of every scale.',
    url: '/pricing', type: 'website',
  },
}

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPackages />
      <PricingFAQs />
      <PricingCTA />
    </>
  )
}

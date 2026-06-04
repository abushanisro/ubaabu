import PricingHero from '@/components/pricing/PricingHero'
import PricingPackages from '@/components/pricing/PricingPackages'
import PricingFAQs from '@/components/pricing/PricingFAQs'
import PricingCTA from '@/components/pricing/PricingCTA'

export const metadata = {
  title: 'Pricing | Emithran Manufacturing Intelligence',
  description:
    'Transparent, outcome-based pricing for manufacturers of every scale. No per-seat fees, no hidden costs.',
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

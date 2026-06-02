import PricingHero from '@/components/pricing/PricingHero'
import PricingNav from '@/components/pricing/PricingNav'
import PricingPackages from '@/components/pricing/PricingPackages'
import PricingCompare from '@/components/pricing/PricingCompare'
import PricingROI from '@/components/pricing/PricingROI'
import PricingAddons from '@/components/pricing/PricingAddons'
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
      <PricingNav />
      <PricingPackages />
      <PricingCompare />
      <PricingROI />
      <PricingAddons />
      <PricingFAQs />
      <PricingCTA />
    </>
  )
}

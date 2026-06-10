import HeroAndProblem from '@/components/emithran/HeroAndProblem'
import ApproachAndBenefits from '@/components/emithran/ApproachAndBenefits'
import BuiltForSupplyChains from '@/components/emithran/BuiltForSupplyChains'
import OutcomeAndWhy from '@/components/emithran/OutcomeAndWhy'
import WhyIndia from '@/components/emithran/WhyIndia'
import FinalCTA from '@/components/emithran/FinalCTA'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Why Emithran - The Manufacturing OS Built for India\'s OEMs',
  description:
    'Discover why space, defence, and aerospace manufacturing teams choose Emithran over generic ERP tools: deeper cost intelligence, live supplier data, and an architecture built for India\'s supply chain.',
  keywords: [
    'why Emithran', 'best manufacturing intelligence software India',
    'ERP alternative manufacturers India', 'manufacturing OS India',
    'cost engineering platform comparison', 'manufacturing AI platform benefits',
  ],
  alternates: { canonical: '/why-emithran' },
  openGraph: {
    title: 'Why Emithran - Manufacturing Intelligence Built for India',
    description: 'Deeper cost intelligence, live supplier data, and a platform built for Indian manufacturing.',
    url: '/why-emithran', type: 'website',
  },
}

export default function WhyEmithranPage() {
  return (
    <>
      <HeroAndProblem />
      <ApproachAndBenefits />
      <BuiltForSupplyChains />
      <OutcomeAndWhy />
      <FinalCTA />
      <WhyIndia />
    </>
  )
}

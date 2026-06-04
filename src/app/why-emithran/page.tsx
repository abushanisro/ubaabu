import HeroAndProblem from '@/components/emithran/HeroAndProblem'
import ApproachAndBenefits from '@/components/emithran/ApproachAndBenefits'
import BuiltForSupplyChains from '@/components/emithran/BuiltForSupplyChains'
import OutcomeAndWhy from '@/components/emithran/OutcomeAndWhy'
import WhyIndia from '@/components/emithran/WhyIndia'
import FinalCTA from '@/components/emithran/FinalCTA'

export const metadata = {
  title: 'Why Emithran | The Manufacturing OS for India',
  description:
    'Discover why manufacturing teams across defence, aerospace, and precision industries choose Emithran to make faster, smarter decisions.',
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

import Hero from '@/components/sections/Hero'
import LogoMarquee from '@/components/sections/LogoMarquee'
import PlatformShowcase from '@/components/sections/PlatformShowcase'
import ProductIntelligence from '@/components/sections/ProductIntelligence'
import StatsSection from '@/components/sections/StatsSection'
import WatchDemo from '@/components/sections/WatchDemo'
import CaseStudies from '@/components/sections/CaseStudies'
import FinalCTA from '@/components/sections/FinalCTA'
import FAQ from '@/components/sections/FAQ'
export default function App() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <PlatformShowcase />
      <StatsSection />
      <ProductIntelligence />
      <div className="bg-white h-16 lg:h-24" />
      <WatchDemo />
      <CaseStudies />
      <FinalCTA />
      <FAQ />
    </>
  )
}

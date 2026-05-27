import Hero from '@/components/sections/Hero'
import LogoMarquee from '@/components/sections/LogoMarquee'
import PlatformShowcase from '@/components/sections/PlatformShowcase'
import VideoAIBanner from '@/components/sections/VideoAIBanner'
import IntegrationConnect from '@/components/sections/IntegrationConnect'
import ScaleSection from '@/components/sections/ScaleSection'
import Capabilities from '@/components/sections/Capabilities'
import StatsSection from '@/components/sections/StatsSection'
import Industries from '@/components/sections/Industries'
import FinalCTA from '@/components/sections/FinalCTA'

export default function App() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <PlatformShowcase />
      <VideoAIBanner />
      <IntegrationConnect />
      <ScaleSection />
      <Capabilities />
      <StatsSection />
      <Industries />
      <FinalCTA />
    </>
  )
}

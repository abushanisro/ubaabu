import Hero from '@/components/sections/Hero'
import LogoMarquee from '@/components/sections/LogoMarquee'
import PlatformShowcase from '@/components/sections/PlatformShowcase'
import Capabilities from '@/components/sections/Capabilities'
import VideoAIBanner from '@/components/sections/VideoAIBanner'
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
      <Capabilities />
      <StatsSection />
      <Industries />
      <FinalCTA />
    </>
  )
}

import AboutHero from '@/components/about/AboutHero'
import AboutMission from '@/components/about/AboutMission'

export const metadata = {
  title: 'About Emithran | Built by Engineers',
  description:
    'Learn about Emithran — the manufacturing intelligence platform built by engineers who refused to accept the broken system.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
    </>
  )
}

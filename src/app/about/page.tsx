import AboutReferencePage from "@/components/about/AboutReferencePage";

import type { Metadata } from 'next'
import { ogImages } from '@/lib/seo'
export const metadata: Metadata = {
  title: 'About Emithran - Built on the Shop Floor',
  description:
    'Emithran is built by engineers who lived the manufacturing problem. We deliver AI-powered should-cost analysis, supplier intelligence, and BOM management for space, defence, and aerospace OEMs in India.',
  keywords: [
    'Emithran about', 'manufacturing intelligence company India',
    'AI manufacturing platform founder', 'defence aerospace software company Bangalore',
    'cost engineering company India', 'manufacturing AI startup India',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    images: ogImages,
    title: 'About Emithran - Built by Engineers, for Manufacturers',
    description: 'The story behind Emithran\'s manufacturing intelligence platform and why we built it.',
    url: '/about', type: 'website', siteName: 'Emithran',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

// Founder Person schema lives on the About page only (it used to be emitted sitewide from the root layout).
const peopleJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Singaravelan S.',
    jobTitle: 'CEO',
    worksFor: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
    url: `${siteUrl}/about`,
    sameAs: ['https://www.linkedin.com/in/singaravelan-srinivasan-emuski/'],
    knowsAbout: ['Manufacturing Intelligence', 'Should Cost Analysis', 'Supplier Intelligence', 'Strategic Sourcing'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abushan',
    jobTitle: 'CTO',
    worksFor: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
    url: `${siteUrl}/about`,
    sameAs: ['https://www.linkedin.com/in/abushan/'],
    knowsAbout: ['Cost Engineering Software', 'BOM Management', 'AI Manufacturing', 'Manufacturing Analytics'],
  },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(peopleJsonLd) }} />
      <AboutReferencePage />
    </>
  );
}

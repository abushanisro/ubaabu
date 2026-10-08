import AboutReferencePage from "@/components/about/AboutReferencePage";

import type { Metadata } from 'next'
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
    images: [{ url: '/assets/meta/emithran-og.jpg', width: 1200, height: 630, alt: 'Emithran - Manufacturing Intelligence Platform' }],
    title: 'About Emithran - Built by Engineers, for Manufacturers',
    description: 'The story behind Emithran\'s manufacturing intelligence platform and why we built it.',
    url: '/about', type: 'website', siteName: 'Emithran',
  },
};

export default function AboutPage() {
  return <AboutReferencePage />;
}

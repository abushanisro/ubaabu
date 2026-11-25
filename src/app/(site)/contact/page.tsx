import ContactPage from '@/components/contact/ContactPage'

import type { Metadata } from 'next'
import { ogImages } from '@/lib/seo'
export const metadata: Metadata = {
  title: 'Contact Emithran - Talk to a Manufacturing Expert',
  description:
    'Talk to an Emithran manufacturing intelligence expert about BOM management, should-cost analysis or supplier intelligence for your programme.',
  keywords: [
    'contact Emithran', 'manufacturing software demo India',
    'BOM software contact', 'should cost analysis consultation',
    'defence manufacturing software inquiry', 'Bangalore manufacturing AI contact',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    images: ogImages,
    title: 'Contact Emithran - Manufacturing Intelligence Experts',
    description: 'Talk to our team about manufacturing intelligence for your programme.',
    url: '/contact', type: 'website', siteName: 'Emithran',
  },
}

export default function Page() {
  return <ContactPage />
}

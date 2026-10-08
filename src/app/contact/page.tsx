import ContactPage from '@/components/contact/ContactPage'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact Emithran - Talk to a Manufacturing Expert',
  description:
    'Get in touch with the Emithran team. Talk to a manufacturing intelligence expert about BOM management, should-cost analysis, or supplier intelligence for your space, defence, or aerospace programme.',
  keywords: [
    'contact Emithran', 'manufacturing software demo India',
    'BOM software contact', 'should cost analysis consultation',
    'defence manufacturing software inquiry', 'Bangalore manufacturing AI contact',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    images: [{ url: '/assets/meta/emithran-og.jpg', width: 1200, height: 630, alt: 'Emithran - Manufacturing Intelligence Platform' }],
    title: 'Contact Emithran - Manufacturing Intelligence Experts',
    description: 'Talk to our team about manufacturing intelligence for your programme.',
    url: '/contact', type: 'website', siteName: 'Emithran',
  },
}

export default function Page() {
  return <ContactPage />
}

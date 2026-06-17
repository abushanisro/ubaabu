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
    title: 'Contact Emithran - Manufacturing Intelligence Experts',
    description: 'Talk to our team about manufacturing intelligence for your programme.',
    url: '/contact', type: 'website',
  },
}

export default function Page() {
  return <ContactPage />
}

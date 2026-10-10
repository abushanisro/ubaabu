import PrivacyPage from '@/components/privacy/PrivacyPage'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  alternates: { canonical: '/privacy' },
  openGraph: pageOpenGraph("/privacy", "Privacy Policy | Emithran", "Learn how Emithran collects, uses, and protects your personal data when you use our manufacturing intelligence platform."),
  title: 'Privacy Policy',
  description:
    'Learn how Emithran collects, uses, and protects your personal data when you use our manufacturing intelligence platform.',
  robots: { index: true, follow: true },
}

export default function Page() {
  return <PrivacyPage />
}

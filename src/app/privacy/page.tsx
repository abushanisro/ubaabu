import PrivacyPage from '@/components/privacy/PrivacyPage'

export const metadata = {
  title: 'Privacy Policy | Emithran',
  description:
    'Learn how Emithran collects, uses, and protects your personal data when you use our manufacturing intelligence platform.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <PrivacyPage />
}

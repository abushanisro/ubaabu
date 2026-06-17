import PrivacyPage from '@/components/privacy/PrivacyPage'

export const metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy | Emithran',
  description:
    'Learn how Emithran collects, uses, and protects your personal data when you use our manufacturing intelligence platform.',
}

export default function Page() {
  return <PrivacyPage />
}

import type { Metadata } from 'next'
import '../globals.css'
import RootShell from '@/components/layout/RootShell'
import { rootMetadata } from '@/lib/rootMetadata'

export const metadata: Metadata = {
  ...rootMetadata,
  openGraph: { ...rootMetadata.openGraph, locale: 'de_DE' },
  other: { ...rootMetadata.other, language: 'German' },
}

// German root layout: serves /de/* with <html lang="de"> (SEO audit Nov 2026, issue #08).
export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="de">{children}</RootShell>
}

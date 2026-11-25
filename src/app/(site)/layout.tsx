import type { Metadata } from 'next'
import '../globals.css'
import RootShell from '@/components/layout/RootShell'
import { rootMetadata } from '@/lib/rootMetadata'

export const metadata: Metadata = rootMetadata

// English root layout (every route except /de/*).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}

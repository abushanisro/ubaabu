'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const LAST_UPDATED = 'June 8, 2026'

/* ── Sidebar nav structure ────────────────────────────────────────── */

interface NavItem {
  id: string
  label: string
  sub?: { id: string; label: string }[]
}

const NAV: NavItem[] = [
  { id: 'who-we-are',   label: 'Who we are' },
  {
    id: 'data-we-collect',
    label: 'Personal Data we collect',
    sub: [
      { id: 'platform-users',  label: 'Platform Users' },
      { id: 'business-users',  label: 'Business Users' },
      { id: 'visitors',        label: 'Visitors' },
    ],
  },
  { id: 'how-we-use',   label: 'How we use Personal Data' },
  { id: 'how-we-share', label: 'How we share Personal Data' },
  { id: 'legal-bases',  label: 'Legal bases for processing' },
  { id: 'your-rights',  label: 'Your rights and choices' },
  { id: 'retention',    label: 'Retention' },
  { id: 'security',     label: 'Security' },
  { id: 'transfers',    label: 'International transfers' },
  { id: 'children',     label: "Children's privacy" },
  { id: 'updates',      label: 'Policy updates' },
  {
    id: 'jurisdiction',
    label: 'Jurisdiction-specific provisions',
    sub: [
      { id: 'india',      label: 'India' },
      { id: 'eea-uk',     label: 'EEA and United Kingdom' },
      { id: 'usa',        label: 'United States' },
      { id: 'australia',  label: 'Australia' },
    ],
  },
  { id: 'contact', label: 'Contact us' },
]

const ALL_IDS = NAV.flatMap(n => [n.id, ...(n.sub?.map(s => s.id) ?? [])])

/* ── Reusable content components ──────────────────────────────────── */

function SectionHeading({ id, number, children }: { id: string; number: number; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[18px] font-bold tracking-tight mb-4 scroll-mt-28"
      style={{ color: '#0f1b2d' }}
    >
      {number}. {children}
    </h2>
  )
}

function SubHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="text-[14px] font-semibold mt-7 mb-3 scroll-mt-28"
      style={{ color: '#0f1b2d' }}
    >
      {children}
    </h3>
  )
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] leading-[1.8] mb-4" style={{ color: 'rgba(15,27,45,0.7)' }}>
      {children}
    </p>
  )
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-5 pl-4 flex flex-col gap-2" style={{ listStyleType: 'disc' }}>
      {items.map((item, i) => (
        <li key={i} className="text-[14px] leading-[1.75] pl-1" style={{ color: 'rgba(15,27,45,0.7)' }}>
          {item}
        </li>
      ))}
    </ul>
  )
}

function Divider() {
  return <hr className="my-10" style={{ borderColor: 'rgba(15,27,45,0.07)' }} />
}

function Bold({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: '#0f1b2d', fontWeight: 600 }}>{children}</strong>
}

function TealLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{ color: '#0d9488' }} className="hover:underline">
      {children}
    </a>
  )
}

/* ── Main page component ──────────────────────────────────────────── */

export default function PrivacyPage() {
  const [activeId, setActiveId] = useState('who-we-are')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          // pick the topmost visible section
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          )
          setActiveId(top.target.id)
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    )

    ALL_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function isActive(item: NavItem) {
    return activeId === item.id || item.sub?.some(s => s.id === activeId)
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── Breadcrumb + related docs bar ─────────────────────────── */}
      <div className="border-b" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
        <div className="mx-auto max-w-[1160px] px-6 md:px-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 pt-10 pb-4 text-[12px]" style={{ color: 'rgba(15,27,45,0.4)' }}>
            <Link href="/" className="hover:text-[#0d9488] transition-colors">Home</Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Legal</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: '#0f1b2d' }}>Privacy Policy</span>
          </div>

          {/* Related docs tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mb-px">
            {[
              { label: 'Privacy Policy',          href: '/privacy',  active: true  },
              { label: 'Cookies Policy',           href: '/cookies',  active: false },
              { label: 'Data Processing Agreement',href: '/dpa',      active: false },
              { label: 'Terms of Service',         href: '/terms',    active: false },
            ].map(tab => (
              <Link
                key={tab.label}
                href={tab.href}
                className="whitespace-nowrap px-5 py-3.5 text-[13px] font-medium border-b-2 transition-colors"
                style={{
                  borderColor: tab.active ? '#0d9488' : 'transparent',
                  color: tab.active ? '#0d9488' : 'rgba(15,27,45,0.5)',
                }}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two-column layout ──────────────────────────────────────── */}
      <div className="mx-auto max-w-[1160px] px-6 md:px-12 py-14 flex flex-col lg:flex-row gap-14 lg:gap-20">

        {/* ── Sticky sidebar ──────────────────────────────────────── */}
        <aside className="hidden lg:block w-[208px] shrink-0">
          <div className="sticky top-[88px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-4 px-3" style={{ color: 'rgba(15,27,45,0.38)' }}>
              On this page
            </p>
            <nav className="flex flex-col gap-0.5">
              {NAV.map(item => {
                const active = isActive(item)
                return (
                  <React.Fragment key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="group flex items-center text-left w-full px-3 py-[7px] rounded-lg text-[12.5px] leading-snug transition-all"
                      style={{
                        color:      active ? '#0d9488'               : 'rgba(15,27,45,0.55)',
                        fontWeight: active ? 600                      : 400,
                        background: active ? 'rgba(13,148,136,0.07)' : 'transparent',
                      }}
                    >
                      {item.label}
                    </button>
                    {item.sub?.map(s => {
                      const sa = activeId === s.id
                      return (
                        <button
                          key={s.id}
                          onClick={() => scrollTo(s.id)}
                          className="text-left w-full py-[5px] pl-7 pr-3 rounded-lg text-[11.5px] leading-snug transition-all"
                          style={{
                            color:      sa ? '#0d9488' : 'rgba(15,27,45,0.42)',
                            fontWeight: sa ? 500 : 400,
                          }}
                        >
                          {s.label}
                        </button>
                      )
                    })}
                  </React.Fragment>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* ── Article content ─────────────────────────────────────── */}
        <article className="flex-1 min-w-0">

          {/* Title block */}
          <div className="mb-10">
            <h1 className="text-[34px] md:text-[40px] font-bold tracking-tight leading-tight mb-2" style={{ color: '#0f1b2d' }}>
              Privacy Policy
            </h1>
            <p className="text-[13px] mb-6" style={{ color: 'rgba(15,27,45,0.42)' }}>
              Last updated: {LAST_UPDATED}
            </p>
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.14)' }}
            >
              <p className="text-[13.5px] leading-[1.8]" style={{ color: 'rgba(15,27,45,0.68)' }}>
                Emithran Technologies Private Limited (&ldquo;Emithran,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates a manufacturing intelligence platform that helps engineering, procurement, and supply chain teams with should-cost analysis, BOM management, supplier benchmarking, and cost optimisation. This Privacy Policy explains how we collect, use, share, and protect your personal data when you use our platform or visit our website.
              </p>
            </div>
          </div>

          {/* ── Section 1 ── */}
          <SectionHeading id="who-we-are" number={1}>Who we are</SectionHeading>
          <Para>
            Emithran Technologies Private Limited is registered in India and operates the Emithran manufacturing intelligence platform available at emithran.in and related subdomains. Our platform serves procurement professionals, cost engineers, supply chain managers, and operations teams at manufacturing companies globally, with a primary focus on India, Southeast Asia, and the United Kingdom.
          </Para>
          <Para>
            For the purposes of applicable data protection law, Emithran is the <Bold>data controller</Bold> for personal data collected through our website and platform. Where we process personal data on behalf of business customers, we act as a <Bold>data processor</Bold> under the terms of our{' '}
            <TealLink href="/dpa">Data Processing Agreement</TealLink>.
          </Para>
          <Divider />

          {/* ── Section 2 ── */}
          <SectionHeading id="data-we-collect" number={2}>Personal Data we collect</SectionHeading>
          <Para>
            The personal data we collect depends on how you interact with Emithran. We have categorised users into three groups:
          </Para>

          <SubHeading id="platform-users">a. Platform Users</SubHeading>
          <Para>
            Platform Users are individuals who create an account and use the Emithran platform directly — engineers, procurement managers, cost analysts, and supply chain professionals.
          </Para>
          <Para><Bold>Personal Data we collect:</Bold></Para>
          <Ul items={[
            'Account information: full name, work email address, job title, and department',
            'Authentication data: hashed passwords and two-factor authentication credentials',
            'Profile information: profile photo and LinkedIn URL (both optional)',
            'Usage data: features accessed, BOM analyses created, reports generated, and session activity logs',
            'Communications: support requests, in-platform messages, and feedback submissions',
            'Payment data: billing address and invoice details — card numbers are processed by our payment provider and never stored on Emithran servers',
          ]} />
          <Para><Bold>How we use this data:</Bold></Para>
          <Ul items={[
            'To provision and maintain your platform account',
            'To deliver the should-cost, BOM validation, and supplier intelligence features you request',
            'To send transactional emails such as password resets and invoice notifications',
            'To improve platform functionality through aggregated and anonymised usage analytics',
            'To comply with legal and regulatory obligations',
          ]} />

          <SubHeading id="business-users">b. Business Users</SubHeading>
          <Para>
            Business Users are organisations that contract with Emithran to provide platform access to their teams. This section also applies to administrators and authorised representatives of those organisations.
          </Para>
          <Para><Bold>Personal Data we collect:</Bold></Para>
          <Ul items={[
            'Organisation details: company name, registered address, and company identification number',
            'Contact persons: name, work email, phone number, and role of the primary and billing contacts',
            'KYB information: where required by applicable law or partner programmes — business registration documents and beneficial ownership information',
            'Contractual records: signed agreements, purchase orders, and formal correspondence',
          ]} />

          <SubHeading id="visitors">c. Website Visitors</SubHeading>
          <Para>
            Visitors are individuals who browse emithran.in and related pages without creating an account.
          </Para>
          <Para><Bold>Personal Data we collect:</Bold></Para>
          <Ul items={[
            'Device and browser data: IP address, browser type, operating system, and screen resolution',
            'Interaction data: pages visited, time spent, referring URLs, and clicks',
            'Form submissions: name and email submitted through contact, demo, or newsletter forms',
            'Cookie data: as described in our Cookies Policy',
          ]} />
          <Divider />

          {/* ── Section 3 ── */}
          <SectionHeading id="how-we-use" number={3}>How we use Personal Data</SectionHeading>
          <Ul items={[
            <><Bold>Service delivery</Bold> — to operate the platform, process analyses, and deliver reports you request</>,
            <><Bold>Account management</Bold> — to create and manage accounts, handle authentication, and administer workspaces</>,
            <><Bold>Customer support</Bold> — to respond to enquiries, troubleshoot issues, and provide technical assistance</>,
            <><Bold>Product improvement</Bold> — to analyse usage patterns, identify bugs, and develop features based on aggregated data</>,
            <><Bold>Marketing communications</Bold> — to send newsletters, product updates, and event invitations where you have opted in or where we have a legitimate interest</>,
            <><Bold>Security and fraud prevention</Bold> — to detect and prevent unauthorised access, fraud, and illegal activity</>,
            <><Bold>Legal compliance</Bold> — to meet obligations under applicable law including tax, anti-money-laundering, and data protection requirements</>,
            <><Bold>Business operations</Bold> — for auditing, financial reporting, and operational planning</>,
          ]} />
          <Divider />

          {/* ── Section 4 ── */}
          <SectionHeading id="how-we-share" number={4}>How we share Personal Data</SectionHeading>
          <Para>We do not sell your personal data. We share it only as described below.</Para>
          <Ul items={[
            <><Bold>Service providers</Bold> — we engage third-party providers for cloud hosting (AWS), payment processing (Stripe), email delivery (Resend), analytics, and customer support tools. Each operates under strict data processing agreements with Emithran.</>,
            <><Bold>Workspace administrators</Bold> — if you use Emithran through a Business User workspace, your activity data within that workspace may be visible to the workspace administrator.</>,
            <><Bold>Legal obligations</Bold> — we may disclose data to law enforcement, regulatory bodies, or courts when required by law, court order, or to protect our legal rights and those of our users.</>,
            <><Bold>Business transfers</Bold> — in the event of a merger, acquisition, or asset sale, personal data may be transferred to the successor entity under equivalent privacy protections and with notice to affected users.</>,
            <><Bold>With your consent</Bold> — for any other sharing not described above, we will seek your explicit consent in advance.</>,
          ]} />
          <Divider />

          {/* ── Section 5 ── */}
          <SectionHeading id="legal-bases" number={5}>Legal bases for processing</SectionHeading>
          <Para>
            Where the GDPR, UK GDPR, or equivalent legislation applies, we process personal data on the following legal bases:
          </Para>
          <Ul items={[
            <><Bold>Contract performance</Bold> — processing necessary to deliver the services you have subscribed to or requested under our Terms of Service</>,
            <><Bold>Legal obligation</Bold> — processing required to comply with applicable law including tax, financial reporting, and anti-fraud obligations</>,
            <><Bold>Legitimate interests</Bold> — processing for platform security, fraud prevention, product improvement, and B2B marketing where our interests are not overridden by your rights</>,
            <><Bold>Consent</Bold> — for marketing emails and optional analytics cookies. You may withdraw consent at any time without affecting the lawfulness of prior processing.</>,
          ]} />
          <Divider />

          {/* ── Section 6 ── */}
          <SectionHeading id="your-rights" number={6}>Your rights and choices</SectionHeading>
          <Para>Depending on your jurisdiction, you may have the following rights regarding your personal data:</Para>
          <Ul items={[
            <><Bold>Access</Bold> — request a copy of the personal data we hold about you</>,
            <><Bold>Rectification</Bold> — correct inaccurate or incomplete personal data</>,
            <><Bold>Erasure</Bold> — request deletion of your personal data, subject to legal retention obligations</>,
            <><Bold>Restriction</Bold> — request that we limit how we process your data while a dispute is under review</>,
            <><Bold>Data portability</Bold> — receive your personal data in a machine-readable format and transfer it to another service</>,
            <><Bold>Objection</Bold> — object to processing based on legitimate interests, including profiling for direct marketing</>,
            <><Bold>Opt out of marketing</Bold> — unsubscribe from marketing emails at any time via the unsubscribe link in any email or by contacting us at <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink></>,
          ]} />
          <Para>
            To exercise any right, email <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink>. We will respond within 30 days, or within the period required by applicable law. We may need to verify your identity before acting on your request.
          </Para>
          <Divider />

          {/* ── Section 7 ── */}
          <SectionHeading id="retention" number={7}>Retention</SectionHeading>
          <Para>We retain personal data for as long as necessary to fulfil the purposes for which it was collected, or as required by law.</Para>
          <Ul items={[
            'Account data is retained for the duration of your active subscription, plus 90 days after closure to allow for reactivation — after which it is deleted or anonymised',
            'Financial and invoicing records are retained for 7 years under the Income Tax Act 1961 and applicable foreign tax obligations',
            'Support and communications records are retained for 3 years after the last interaction',
            'Website analytics data is retained for 26 months in aggregated form',
            'Fraud-monitoring data may be retained for up to 5 years',
          ]} />
          <Para>
            When data is no longer required, we securely delete it or anonymise it such that it can no longer be attributed to you.
          </Para>
          <Divider />

          {/* ── Section 8 ── */}
          <SectionHeading id="security" number={8}>Security</SectionHeading>
          <Para>
            We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, loss, alteration, or disclosure:
          </Para>
          <Ul items={[
            'Encryption in transit (TLS 1.2+) and at rest (AES-256)',
            'Role-based access controls limiting data access to authorised personnel',
            'Regular security assessments and penetration testing',
            'Multi-factor authentication on all production systems',
            'Incident response procedures with notification protocols compliant with GDPR and DPDPA obligations',
          ]} />
          <Para>
            While we take reasonable precautions, no system is completely secure. If you believe your account has been compromised, contact us immediately at <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink>.
          </Para>
          <Divider />

          {/* ── Section 9 ── */}
          <SectionHeading id="transfers" number={9}>International Data Transfers</SectionHeading>
          <Para>
            Emithran is headquartered in India. Primary data processing infrastructure is located in AWS data centres in the Mumbai (ap-south-1) region. Certain service providers or support team members may process data from other jurisdictions.
          </Para>
          <Para>When personal data is transferred outside India or the European Economic Area, we implement appropriate safeguards including:</Para>
          <Ul items={[
            'Standard Contractual Clauses (SCCs) approved by the European Commission for transfers from the EEA',
            'The UK International Data Transfer Agreement (IDTA) for transfers from the United Kingdom',
            'Adequacy decisions where applicable',
          ]} />
          <Para>
            You may request a copy of the applicable transfer mechanism by emailing <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink>.
          </Para>
          <Divider />

          {/* ── Section 10 ── */}
          <SectionHeading id="children" number={10}>Children's Privacy</SectionHeading>
          <Para>
            The Emithran platform is a B2B enterprise service designed for use by adults in professional settings. We do not knowingly collect personal data from individuals under the age of 18. If you believe we have inadvertently received data from a minor, please contact us and we will delete it promptly.
          </Para>
          <Divider />

          {/* ── Section 11 ── */}
          <SectionHeading id="updates" number={11}>Policy Updates</SectionHeading>
          <Para>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will notify registered users by email and display a prominent notice on our website at least 14 days before the changes take effect.
          </Para>
          <Para>
            The &ldquo;Last updated&rdquo; date at the top of this policy reflects the most recent revision. Continued use of the platform after the effective date of any update constitutes acceptance of the revised policy.
          </Para>
          <Divider />

          {/* ── Section 12 ── */}
          <SectionHeading id="jurisdiction" number={12}>Jurisdiction-Specific Provisions</SectionHeading>

          <SubHeading id="india">India</SubHeading>
          <Para>
            Emithran processes personal data in accordance with the <Bold>Digital Personal Data Protection Act 2023 (DPDPA)</Bold> and associated rules. As a Data Fiduciary, we maintain a record of processing activities and appoint a Consent Manager where required by the rules. You have the right to nominate a representative for the exercise of your rights in the event of your death or incapacity.
          </Para>
          <Para>
            To raise a grievance under the DPDPA, contact our Grievance Officer at <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink>. Grievances will be acknowledged within 48 hours and resolved within 30 days. If you remain dissatisfied, you may approach the Data Protection Board of India.
          </Para>

          <SubHeading id="eea-uk">EEA and United Kingdom</SubHeading>
          <Para>
            If you are located in the European Economic Area or the United Kingdom, you have rights under the <Bold>GDPR</Bold> or <Bold>UK GDPR</Bold> respectively and may lodge a complaint with your local supervisory authority — the Information Commissioner&rsquo;s Office (ICO) for UK residents, or the relevant national authority for EEA residents.
          </Para>
          <Para>
            Our EU GDPR representative can be reached at <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink>.
          </Para>

          <SubHeading id="usa">United States</SubHeading>
          <Para>
            For <Bold>California residents</Bold>, under the California Consumer Privacy Act (CCPA) as amended by the CPRA, you have the right to know, delete, and opt out of the sale or sharing of personal information. We do not sell personal information as defined under the CCPA. To submit a CCPA request, email <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink> with &ldquo;CCPA Request&rdquo; in the subject line.
          </Para>
          <Para>
            For <Bold>Virginia, Colorado, and Connecticut residents</Bold>, we comply with the respective state consumer data protection laws. You have the right to access, correct, delete, and opt out of targeted advertising. Submit requests to <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink>.
          </Para>

          <SubHeading id="australia">Australia</SubHeading>
          <Para>
            For Australian residents, we comply with the <Bold>Privacy Act 1988 (Cth)</Bold> and the Australian Privacy Principles (APPs). You have the right to access and correct personal information we hold about you. To make a complaint or access request, email <TealLink href="mailto:emithran@emuski.com">emithran@emuski.com</TealLink>. If your complaint is not resolved to your satisfaction, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.
          </Para>
          <Divider />

          {/* ── Section 13 ── */}
          <SectionHeading id="contact" number={13}>Contact us</SectionHeading>
          <Para>
            If you have questions, concerns, or data subject requests relating to this Privacy Policy, please contact us:
          </Para>

          <div
            className="rounded-xl overflow-hidden mb-6"
            style={{ border: '1px solid rgba(13,148,136,0.14)' }}
          >
            <div className="p-5 border-b" style={{ background: 'rgba(13,148,136,0.05)', borderColor: 'rgba(13,148,136,0.1)' }}>
              <p className="text-[13.5px] font-semibold" style={{ color: '#0f1b2d' }}>
                Emithran Technologies Private Limited
              </p>
            </div>
            <div className="p-5 flex flex-col gap-3" style={{ background: '#fff' }}>
              {[
                { label: 'Privacy enquiries',       email: 'emithran@emuski.com'  },
                { label: 'Security reports',         email: 'emithran@emuski.com' },
                { label: 'Grievance Officer (India)',email: 'emithran@emuski.com'},
                { label: 'EU Representative',        email: 'emithran@emuski.com'   },
              ].map(row => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-[12.5px] font-medium w-52 shrink-0" style={{ color: 'rgba(15,27,45,0.55)' }}>
                    {row.label}
                  </span>
                  <a
                    href={`mailto:${row.email}`}
                    className="text-[13px] hover:underline"
                    style={{ color: '#0d9488' }}
                  >
                    {row.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <Para>
            Related policies: <TealLink href="/cookies">Cookies Policy</TealLink> · <TealLink href="/dpa">Data Processing Agreement</TealLink> · <TealLink href="/terms">Terms of Service</TealLink>
          </Para>

        </article>
      </div>
    </div>
  )
}

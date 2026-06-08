'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const EFFECTIVE_DATE = 'June 8, 2026'

/* ── Sidebar nav ──────────────────────────────────────────────────── */

interface NavItem {
  id: string
  label: string
  sub?: { id: string; label: string }[]
}

const NAV: NavItem[] = [
  { id: 'preamble',   label: 'Overview' },
  {
    id: 'services',
    label: '1. Services',
    sub: [
      { id: 's1-1', label: '1.1 Platform access' },
      { id: 's1-2', label: '1.2 Restrictions' },
      { id: 's1-3', label: '1.3 Support' },
      { id: 's1-4', label: '1.4 Beta features' },
      { id: 's1-5', label: '1.5 Modifications' },
      { id: 's1-6', label: '1.6 Third-party services' },
    ],
  },
  {
    id: 'license',
    label: '2. License',
    sub: [
      { id: 's2-1', label: '2.1 Grant' },
      { id: 's2-2', label: '2.2 Restrictions' },
      { id: 's2-3', label: '2.3 Third-party software' },
    ],
  },
  { id: 'account-security', label: '3. Account Security' },
  {
    id: 'privacy-data',
    label: '4. Privacy & Data',
    sub: [
      { id: 's4-1', label: '4.1 Data Processing Agreement' },
      { id: 's4-2', label: '4.2 Platform Data' },
      { id: 's4-3', label: '4.3 Security incidents' },
      { id: 's4-4', label: '4.4 Retention' },
    ],
  },
  {
    id: 'ip',
    label: '5. Intellectual Property',
    sub: [
      { id: 's5-1', label: '5.1 Ownership' },
      { id: 's5-2', label: '5.2 Feedback' },
      { id: 's5-3', label: '5.3 Marks' },
    ],
  },
  { id: 'confidentiality', label: '6. Confidentiality' },
  {
    id: 'fees',
    label: '7. Fees & Payment',
    sub: [
      { id: 's7-1', label: '7.1 Subscription fees' },
      { id: 's7-2', label: '7.2 Invoicing & collection' },
      { id: 's7-3', label: '7.3 Taxes' },
    ],
  },
  {
    id: 'liability',
    label: '8. Limitation of Liability',
    sub: [
      { id: 's8-1', label: '8.1 Disclaimers' },
      { id: 's8-2', label: '8.2 Indirect liability' },
      { id: 's8-3', label: '8.3 Liability cap' },
    ],
  },
  { id: 'indemnification', label: '9. Indemnification' },
  {
    id: 'termination',
    label: '10. Suspension & Termination',
    sub: [
      { id: 's10-1', label: '10.1 Suspension' },
      { id: 's10-2', label: '10.2 Termination' },
      { id: 's10-3', label: '10.3 Effect of termination' },
    ],
  },
  {
    id: 'general',
    label: '11. General',
    sub: [
      { id: 's11-1',  label: '11.1 Compliance with law' },
      { id: 's11-2',  label: '11.2 Notices' },
      { id: 's11-3',  label: '11.3 Governing law' },
      { id: 's11-4',  label: '11.4 Dispute resolution' },
      { id: 's11-5',  label: '11.5 Assignment' },
      { id: 's11-6',  label: '11.6 Entire agreement' },
      { id: 's11-7',  label: '11.7 Force majeure' },
      { id: 's11-8',  label: '11.8 Severability' },
    ],
  },
  { id: 'definitions', label: '12. Definitions' },
  { id: 'regional',    label: '13. Regional Terms' },
]

const ALL_IDS = NAV.flatMap(n => [n.id, ...(n.sub?.map(s => s.id) ?? [])])

/* ── Content helpers ──────────────────────────────────────────────── */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-[18px] font-bold tracking-tight mb-4 scroll-mt-28" style={{ color: '#0f1b2d' }}>
      {children}
    </h2>
  )
}

function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-[14px] font-semibold mt-7 mb-2.5 scroll-mt-28" style={{ color: '#0f1b2d' }}>
      {children}
    </h3>
  )
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13.5px] leading-[1.8] mb-3.5" style={{ color: 'rgba(15,27,45,0.72)' }}>
      {children}
    </p>
  )
}

function SubClause({ letter, children }: { letter: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-2.5 pl-2">
      <span className="text-[13px] font-medium shrink-0 mt-0.5 w-5" style={{ color: 'rgba(15,27,45,0.45)' }}>({letter})</span>
      <p className="text-[13.5px] leading-[1.8]" style={{ color: 'rgba(15,27,45,0.72)' }}>{children}</p>
    </div>
  )
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-4 pl-4 flex flex-col gap-2" style={{ listStyleType: 'disc' }}>
      {items.map((item, i) => (
        <li key={i} className="text-[13.5px] leading-[1.8] pl-1" style={{ color: 'rgba(15,27,45,0.72)' }}>
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

function Def({ term }: { term: string }) {
  return <strong style={{ color: '#0f1b2d', fontWeight: 600 }}>&ldquo;{term}&rdquo;</strong>
}

function TealLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{ color: '#0d9488' }} className="hover:underline">
      {children}
    </a>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 mb-5"
      style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.14)' }}
    >
      <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(15,27,45,0.68)' }}>{children}</p>
    </div>
  )
}

function WarningCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 mb-5"
      style={{ background: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.25)' }}
    >
      <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(15,27,45,0.68)' }}>{children}</p>
    </div>
  )
}

/* ── Definition row ───────────────────────────────────────────────── */

function DefRow({ term, definition }: { term: string; definition: React.ReactNode }) {
  return (
    <div className="flex gap-5 py-3.5 border-b" style={{ borderColor: 'rgba(15,27,45,0.07)' }}>
      <span className="text-[13px] font-semibold shrink-0 w-48" style={{ color: '#0f1b2d' }}>
        &ldquo;{term}&rdquo;
      </span>
      <span className="text-[13px] leading-[1.7]" style={{ color: 'rgba(15,27,45,0.68)' }}>
        {definition}
      </span>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function TermsPage() {
  const [activeId, setActiveId] = useState('preamble')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function isActive(item: NavItem) {
    return activeId === item.id || item.sub?.some(s => s.id === activeId)
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── Top bar ───────────────────────────────────────────────── */}
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
            <span style={{ color: '#0f1b2d' }}>Terms of Service</span>
          </div>

          {/* Related docs tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mb-px">
            {[
              { label: 'Terms of Service',          href: '/terms',   active: true  },
              { label: 'Privacy Policy',             href: '/privacy', active: false },
              { label: 'Cookies Policy',             href: '/cookies', active: false },
              { label: 'Data Processing Agreement',  href: '/dpa',     active: false },
            ].map(tab => (
              <Link
                key={tab.label}
                href={tab.href}
                className="whitespace-nowrap px-5 py-3.5 text-[13px] font-medium border-b-2 transition-colors"
                style={{
                  borderColor: tab.active ? '#0d9488' : 'transparent',
                  color:       tab.active ? '#0d9488' : 'rgba(15,27,45,0.5)',
                }}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1160px] px-6 md:px-12 py-14 flex flex-col lg:flex-row gap-14 lg:gap-20">

        {/* ── Sidebar ─────────────────────────────────────────────── */}
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
                      className="text-left w-full px-3 py-[7px] rounded-lg text-[12.5px] leading-snug transition-all"
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

        {/* ── Article ─────────────────────────────────────────────── */}
        <article className="flex-1 min-w-0">

          {/* Title */}
          <div className="mb-10">
            <h1 className="text-[34px] md:text-[40px] font-bold tracking-tight leading-tight mb-2" style={{ color: '#0f1b2d' }}>
              Terms of Service
            </h1>
            <p className="text-[13px] mb-6" style={{ color: 'rgba(15,27,45,0.42)' }}>
              Effective date: {EFFECTIVE_DATE}
            </p>
            <Callout>
              These Terms of Service (&ldquo;Agreement&rdquo;) govern your access to and use of the Emithran manufacturing intelligence platform and related services. By creating an account or using the Services, you agree to be bound by this Agreement. If you are accepting on behalf of an organisation, you represent that you have authority to bind that organisation.
            </Callout>
            <WarningCallout>
              <Bold>Important:</Bold> Section 11.4 contains a binding arbitration clause and class action waiver that affects your legal rights. Please read it carefully.
            </WarningCallout>
          </div>

          {/* ── Preamble / Overview ── */}
          <H2 id="preamble">Overview</H2>
          <Para>
            Emithran Technologies Private Limited (<Bold>&ldquo;Emithran&rdquo;</Bold>, <Bold>&ldquo;we&rdquo;</Bold>, <Bold>&ldquo;us&rdquo;</Bold>, or <Bold>&ldquo;our&rdquo;</Bold>) provides a cloud-based manufacturing intelligence platform including should-cost analysis, bill-of-materials management, supplier benchmarking, and procurement cost optimisation tools (<Bold>&ldquo;Platform&rdquo;</Bold> or <Bold>&ldquo;Services&rdquo;</Bold>). The entity you contract with depends on your location and is specified in Section 13 (Regional Terms).
          </Para>
          <Para>
            Capitalised terms used but not defined in context are defined in Section 12 (Definitions). This Agreement incorporates by reference the <TealLink href="/privacy">Privacy Policy</TealLink>, the <TealLink href="/dpa">Data Processing Agreement</TealLink>, and any Order Form or Statement of Work executed between the parties.
          </Para>
          <Divider />

          {/* ── Section 1 ── */}
          <H2 id="services">1. Services</H2>

          <H3 id="s1-1">1.1 Platform Access</H3>
          <Para>
            Subject to this Agreement and timely payment of all applicable Fees, Emithran grants you a non-exclusive, non-transferable right to access and use the Services during the Subscription Term solely for your internal business purposes, including cost engineering, procurement analysis, and supply chain intelligence activities.
          </Para>

          <H3 id="s1-2">1.2 Restrictions</H3>
          <Para>You must not, and must not permit others to:</Para>
          <SubClause letter="a">access or use the Services for any unlawful purpose or in violation of any applicable law or regulation;</SubClause>
          <SubClause letter="b">resell, sublicense, distribute, or make the Services available to any third party without Emithran&rsquo;s prior written consent;</SubClause>
          <SubClause letter="c">reverse engineer, decompile, disassemble, or attempt to derive the source code of any part of the Services;</SubClause>
          <SubClause letter="d">use the Services to develop a competing product or service;</SubClause>
          <SubClause letter="e">circumvent any access controls, rate limits, or security mechanisms;</SubClause>
          <SubClause letter="f">introduce malicious code, viruses, or disruptive programmes into the Services or related infrastructure;</SubClause>
          <SubClause letter="g">use automated means to scrape, crawl, or extract data from the Services beyond what is permitted by documented APIs;</SubClause>
          <SubClause letter="h">upload or process data that infringes a third party&rsquo;s intellectual property rights or violates their confidentiality obligations.</SubClause>

          <H3 id="s1-3">1.3 Support</H3>
          <Para>
            Emithran will provide technical support in accordance with the support tier purchased in your Order Form. Standard support includes email support with a target response time of one Business Day. Enterprise support tiers may include priority response, dedicated account management, and onboarding assistance as specified in the applicable Order Form.
          </Para>

          <H3 id="s1-4">1.4 Beta Features</H3>
          <Para>
            Emithran may make pre-release or beta features available to you at no additional charge. Beta features are provided <Bold>&ldquo;as is&rdquo;</Bold> without warranty of any kind and may be discontinued at any time. Emithran shall have no liability in connection with your use of beta features.
          </Para>

          <H3 id="s1-5">1.5 Modifications</H3>
          <Para>
            Emithran reserves the right to modify, update, or discontinue features of the Services at any time. Where a modification materially reduces the functionality you rely on, Emithran will provide at least 30 days&rsquo; prior notice by email. Your continued use of the Services after the notice period constitutes acceptance of the modification.
          </Para>

          <H3 id="s1-6">1.6 Third-Party Services</H3>
          <Para>
            The Services may integrate with or depend upon third-party services (for example, ERP connectors or external supplier databases). Emithran does not warrant the availability, accuracy, or security of third-party services and shall not be liable for any loss arising from their failure or unavailability. Your use of third-party services is governed by those parties&rsquo; own terms.
          </Para>
          <Divider />

          {/* ── Section 2 ── */}
          <H2 id="license">2. License to Emithran Technology</H2>

          <H3 id="s2-1">2.1 Grant</H3>
          <Para>
            Subject to this Agreement, Emithran grants you a limited, non-exclusive, non-transferable, revocable licence to access and use the Emithran Technology solely to the extent necessary to use the Services during the Subscription Term.
          </Para>

          <H3 id="s2-2">2.2 Restrictions</H3>
          <Para>
            Except as expressly permitted in this Agreement, you shall not copy, modify, adapt, translate, or create derivative works of any Emithran Technology. All rights not expressly granted are reserved by Emithran.
          </Para>

          <H3 id="s2-3">2.3 Third-Party Software</H3>
          <Para>
            Certain components of the Services incorporate open-source or third-party software licensed under their own terms. A list of material third-party components and their licences is available at <TealLink href="/legal/oss">emithran.in/legal/oss</TealLink>. Nothing in this Agreement limits rights that cannot be restricted under applicable open-source licences.
          </Para>
          <Divider />

          {/* ── Section 3 ── */}
          <H2 id="account-security">3. Account Security</H2>
          <Para>
            You are responsible for all activity that occurs under your account. You must:
          </Para>
          <SubClause letter="a">keep your login credentials confidential and not share them with any unauthorised person;</SubClause>
          <SubClause letter="b">use strong, unique passwords and enable multi-factor authentication where available;</SubClause>
          <SubClause letter="c">notify Emithran immediately at <TealLink href="mailto:security@emithran.in">security@emithran.in</TealLink> if you suspect any unauthorised access to your account;</SubClause>
          <SubClause letter="d">ensure that all Users authorised to access your workspace comply with this Agreement.</SubClause>
          <Para>
            Emithran will not be liable for any loss or damage arising from your failure to maintain the security of your account credentials.
          </Para>
          <Divider />

          {/* ── Section 4 ── */}
          <H2 id="privacy-data">4. Privacy and Data Use</H2>

          <H3 id="s4-1">4.1 Data Processing Agreement</H3>
          <Para>
            Where Emithran processes Personal Data on your behalf as a data processor (for example, employee names, supplier contact details, or end-customer information you upload to the Platform), the terms of the <TealLink href="/dpa">Data Processing Agreement</TealLink> (&ldquo;DPA&rdquo;) apply and are incorporated into this Agreement by reference. In the event of conflict between this Agreement and the DPA with respect to Personal Data, the DPA prevails.
          </Para>

          <H3 id="s4-2">4.2 Platform Data</H3>
          <Para>
            Emithran may generate aggregated, anonymised usage data derived from your use of the Services (<Bold>&ldquo;Platform Data&rdquo;</Bold>). Platform Data contains no Personal Data and cannot be used to identify you or your organisation. Emithran may use Platform Data to improve the Services, develop benchmarks, train machine-learning models, and publish aggregate industry insights. All Platform Data is owned by Emithran.
          </Para>

          <H3 id="s4-3">4.3 Security Incidents</H3>
          <Para>
            If Emithran becomes aware of a confirmed breach of security leading to the accidental or unlawful destruction, loss, alteration, or unauthorised disclosure of User Data, Emithran will notify you without undue delay (and in any case within 72 hours of becoming aware) by email to your registered address. Such notification shall include the nature of the incident, the categories of data affected, and the remedial measures taken or proposed.
          </Para>

          <H3 id="s4-4">4.4 Retention and Deletion</H3>
          <Para>
            Upon termination or expiry of the Agreement, Emithran will, at your written request, return or securely delete User Data within 60 days, except where Emithran is required to retain it by applicable law. Emithran&rsquo;s standard data retention schedule is described in the <TealLink href="/privacy">Privacy Policy</TealLink>.
          </Para>
          <Divider />

          {/* ── Section 5 ── */}
          <H2 id="ip">5. Intellectual Property</H2>

          <H3 id="s5-1">5.1 Ownership</H3>
          <Para>
            As between the parties: (a) Emithran owns all right, title, and interest in and to the Emithran Technology, Platform Data, and all related IP Rights; and (b) you own all right, title, and interest in your User Data. You grant Emithran a limited, non-exclusive, royalty-free licence to access and use your User Data solely to provide the Services and to generate Platform Data in accordance with Section 4.2.
          </Para>

          <H3 id="s5-2">5.2 Feedback</H3>
          <Para>
            If you submit ideas, suggestions, or feedback about the Services (<Bold>&ldquo;Feedback&rdquo;</Bold>), you hereby assign to Emithran all right, title, and interest in that Feedback without restriction. Emithran may use Feedback for any purpose without obligation to you.
          </Para>

          <H3 id="s5-3">5.3 Marks</H3>
          <Para>
            Each party retains ownership of its own trademarks and brand assets. Neither party may use the other&rsquo;s trademarks, trade names, or logos without prior written consent, except that: (a) Emithran may identify you as a customer in its marketing materials using your company name only, unless you opt out by written notice; and (b) you may state that you use the Emithran platform in a factual and non-disparaging manner.
          </Para>
          <Divider />

          {/* ── Section 6 ── */}
          <H2 id="confidentiality">6. Confidentiality</H2>
          <Para>
            Each party (<Bold>&ldquo;Receiving Party&rdquo;</Bold>) agrees to hold in confidence all Confidential Information of the other party (<Bold>&ldquo;Disclosing Party&rdquo;</Bold>) and to use it only to exercise its rights and fulfil its obligations under this Agreement. The Receiving Party shall:
          </Para>
          <SubClause letter="a">restrict access to Confidential Information to employees, contractors, and agents who have a need to know and who are bound by confidentiality obligations at least as protective as those in this Agreement;</SubClause>
          <SubClause letter="b">protect Confidential Information with the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care;</SubClause>
          <SubClause letter="c">promptly notify the Disclosing Party of any actual or suspected unauthorised disclosure of Confidential Information.</SubClause>
          <Para>
            These obligations do not apply to information that: (i) is or becomes publicly known through no breach of this Agreement; (ii) was already known to the Receiving Party before disclosure; (iii) is independently developed without use of Confidential Information; or (iv) is required to be disclosed by law, court order, or regulatory authority, provided the Receiving Party gives the Disclosing Party reasonable prior notice where permitted.
          </Para>
          <Para>
            Confidentiality obligations survive termination of this Agreement for 3 years, except for trade secrets which are protected for as long as they remain trade secrets.
          </Para>
          <Divider />

          {/* ── Section 7 ── */}
          <H2 id="fees">7. Fees and Payment</H2>

          <H3 id="s7-1">7.1 Subscription Fees</H3>
          <Para>
            You agree to pay all Fees specified in your Order Form. Unless otherwise stated, Fees are quoted in Indian Rupees (INR) and exclusive of applicable taxes. Fees for the initial Subscription Term are due in advance. Renewal Fees are due on the first day of each renewal term.
          </Para>
          <Para>
            Emithran may modify its pricing with at least 60 days&rsquo; written notice prior to the start of your next renewal term. Your continued use of the Services following the notice period constitutes acceptance of the updated Fees.
          </Para>

          <H3 id="s7-2">7.2 Invoicing and Collection</H3>
          <Para>
            Emithran will issue invoices electronically to the billing email on your account. Invoices are payable within 30 days of the invoice date unless otherwise specified in the Order Form. Overdue amounts bear interest at the rate of 1.5% per month (or the maximum rate permitted by law, if lower). Emithran reserves the right to suspend access to the Services for accounts more than 15 days overdue after written notice.
          </Para>

          <H3 id="s7-3">7.3 Taxes</H3>
          <Para>
            All Fees are exclusive of taxes, duties, levies, and charges including GST, VAT, withholding tax, and similar obligations. You are responsible for all such taxes in connection with your use of the Services, excluding taxes on Emithran&rsquo;s net income. Where Indian GST applies, Emithran will issue a tax invoice. If you are required by law to withhold any amount, you must gross up the payment so that Emithran receives the full invoiced amount.
          </Para>
          <Divider />

          {/* ── Section 8 ── */}
          <H2 id="liability">8. Limitation of Liability</H2>

          <H3 id="s8-1">8.1 Disclaimers</H3>
          <Para>
            THE SERVICES ARE PROVIDED <Bold>&ldquo;AS IS&rdquo;</Bold> AND <Bold>&ldquo;AS AVAILABLE&rdquo;</Bold> WITHOUT WARRANTY OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, EMITHRAN EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. EMITHRAN DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
          </Para>
          <Para>
            Should-cost outputs, cost models, supplier benchmarks, and other analytical results generated by the Services are provided for informational and planning purposes only. They do not constitute professional accounting, legal, or commercial advice. You are solely responsible for all procurement, sourcing, and business decisions made in reliance on such outputs.
          </Para>

          <H3 id="s8-2">8.2 Exclusion of Indirect Liability</H3>
          <Para>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, NEITHER PARTY SHALL BE LIABLE TO THE OTHER FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, BUSINESS, GOODWILL, OR ANTICIPATED SAVINGS, ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, REGARDLESS OF THE FORM OF ACTION AND WHETHER OR NOT SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </Para>

          <H3 id="s8-3">8.3 Liability Cap</H3>
          <Para>
            SUBJECT TO SECTION 8.2, EACH PARTY&rsquo;S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL FEES PAID OR PAYABLE BY YOU TO EMITHRAN IN THE 12 MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (B) INR 5,00,000 (FIVE LAKH RUPEES).
          </Para>
          <Para>
            The limitations in this Section 8 do not apply to: (i) either party&rsquo;s indemnification obligations under Section 9; (ii) either party&rsquo;s breach of its confidentiality obligations; (iii) Emithran&rsquo;s infringement of your IP rights; or (iv) liability that cannot be limited by applicable law.
          </Para>
          <Divider />

          {/* ── Section 9 ── */}
          <H2 id="indemnification">9. Indemnification</H2>
          <Para>
            <Bold>By Emithran.</Bold> Emithran will defend you against any third-party claim alleging that the Services, as provided by Emithran and used in accordance with this Agreement, infringe that third party&rsquo;s patent, copyright, trademark, or trade secret rights (&ldquo;IP Claim&rdquo;). Emithran will pay damages and costs finally awarded by a court or agreed in settlement, provided you: (a) promptly notify Emithran in writing of the IP Claim; (b) give Emithran sole control of the defence; and (c) provide reasonable assistance at Emithran&rsquo;s expense.
          </Para>
          <Para>
            <Bold>By You.</Bold> You will defend Emithran against any third-party claim arising from: (a) your breach of this Agreement; (b) your violation of applicable law; (c) your User Data infringing a third party&rsquo;s rights; or (d) your use of the Services in a manner not permitted by this Agreement. You will pay damages and costs finally awarded or agreed in settlement, subject to the same conditions as above.
          </Para>
          <Para>
            If an IP Claim is made or is reasonably likely, Emithran may at its election: (i) obtain the right for you to continue using the affected Service; (ii) replace or modify the Service to avoid the infringement; or (iii) terminate the affected Service and refund prepaid unused Fees.
          </Para>
          <Divider />

          {/* ── Section 10 ── */}
          <H2 id="termination">10. Suspension and Termination</H2>

          <H3 id="s10-1">10.1 Suspension</H3>
          <Para>
            Emithran may immediately suspend your access to the Services, with or without notice, if: (a) you breach any provision of this Agreement and fail to cure within 10 days of written notice (where a cure is possible); (b) your account is more than 15 days past due; (c) Emithran reasonably believes your use poses a security risk, legal risk, or risk to other users; or (d) required to do so by law or regulatory authority.
          </Para>

          <H3 id="s10-2">10.2 Termination</H3>
          <Para>
            <Bold>By you.</Bold> You may terminate this Agreement for convenience with 30 days&rsquo; written notice. Termination for convenience does not entitle you to a refund of any prepaid Fees.
          </Para>
          <Para>
            <Bold>By Emithran.</Bold> Emithran may terminate this Agreement: (a) for your uncured material breach, effective 30 days after written notice; (b) immediately if you become insolvent, file for bankruptcy, or make an assignment for the benefit of creditors; or (c) for convenience with 60 days&rsquo; written notice.
          </Para>
          <Para>
            <Bold>For cause.</Bold> Either party may terminate immediately if the other party materially breaches Section 5 (IP), Section 6 (Confidentiality), or any payment obligation.
          </Para>

          <H3 id="s10-3">10.3 Effect of Termination</H3>
          <Para>
            Upon termination or expiry: (a) all licences granted to you under this Agreement terminate immediately; (b) you must cease all use of the Services and delete any local copies of Emithran Technology; (c) each party will return or destroy the other&rsquo;s Confidential Information upon request; and (d) you remain liable for all Fees accrued prior to termination. Sections that by their nature should survive (including 4, 5, 6, 7, 8, 9, 11, and 12) will survive termination.
          </Para>
          <Divider />

          {/* ── Section 11 ── */}
          <H2 id="general">11. General Provisions</H2>

          <H3 id="s11-1">11.1 Compliance with Law</H3>
          <Para>
            Each party will comply with all applicable laws and regulations in connection with its activities under this Agreement, including data protection laws, export control laws, and anti-bribery laws.
          </Para>

          <H3 id="s11-2">11.2 Notices</H3>
          <Para>
            Notices under this Agreement must be in writing. Emithran will send notices to your registered email address. You must send legal notices to Emithran at <TealLink href="mailto:legal@emithran.in">legal@emithran.in</TealLink> with a copy to the postal address in Section 12. Notices are deemed received on the date of delivery or, for email, on the next Business Day after sending.
          </Para>

          <H3 id="s11-3">11.3 Governing Law</H3>
          <Para>
            This Agreement and any dispute arising out of or in connection with it is governed by the laws of India, without regard to conflict-of-law principles. Regional governing law variations are set out in Section 13.
          </Para>

          <H3 id="s11-4">11.4 Dispute Resolution</H3>
          <Para>
            The parties agree to attempt in good faith to resolve any dispute informally before commencing arbitration. Either party may escalate a dispute to senior management with a written notice of dispute. If the dispute is not resolved within 30 days of such notice, it shall be referred to and finally resolved by arbitration under the Singapore International Arbitration Centre (SIAC) Rules, which Rules are deemed to be incorporated by reference. The seat and venue of arbitration shall be Bangalore, India. The arbitral tribunal shall consist of one arbitrator. The language of the arbitration shall be English. Judgment on any award may be entered in any court of competent jurisdiction.
          </Para>
          <Para>
            <Bold>Class action waiver.</Bold> Each party irrevocably waives any right to bring or participate in a class, consolidated, or representative proceeding arising out of or relating to this Agreement.
          </Para>

          <H3 id="s11-5">11.5 Assignment</H3>
          <Para>
            You may not assign this Agreement or any rights or obligations hereunder without Emithran&rsquo;s prior written consent. Emithran may assign this Agreement in connection with a merger, acquisition, corporate restructuring, or sale of all or substantially all of its assets, provided Emithran gives you written notice and the assignee assumes all obligations under this Agreement.
          </Para>

          <H3 id="s11-6">11.6 Entire Agreement</H3>
          <Para>
            This Agreement, together with all Order Forms, Statements of Work, the DPA, and the Privacy Policy, constitutes the entire agreement between the parties with respect to its subject matter and supersedes all prior agreements, understandings, negotiations, and discussions. No oral representations shall modify this Agreement.
          </Para>

          <H3 id="s11-7">11.7 Force Majeure</H3>
          <Para>
            Neither party is liable for failure or delay in performance caused by a Force Majeure Event. The affected party must promptly notify the other and use commercially reasonable efforts to resume performance. If the Force Majeure Event persists for more than 60 consecutive days, either party may terminate the Agreement on written notice without liability.
          </Para>

          <H3 id="s11-8">11.8 Severability and Waiver</H3>
          <Para>
            If any provision of this Agreement is found unenforceable, it shall be modified to the minimum extent necessary to make it enforceable, or severed if modification is not possible, without affecting the remaining provisions. No waiver of any provision or right is effective unless in writing. A party&rsquo;s failure to enforce a provision does not constitute a waiver of its right to enforce it in the future.
          </Para>
          <Divider />

          {/* ── Section 12 ── */}
          <H2 id="definitions">12. Definitions</H2>
          <Para>
            The following capitalised terms have the meanings set out below. Other capitalised terms are defined where they first appear in this Agreement.
          </Para>

          <div className="mb-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(15,27,45,0.09)' }}>
            <div className="flex gap-5 px-4 py-3 border-b" style={{ background: 'rgba(15,27,45,0.03)', borderColor: 'rgba(15,27,45,0.07)' }}>
              <span className="text-[11px] font-bold uppercase tracking-wider w-48 shrink-0" style={{ color: 'rgba(15,27,45,0.45)' }}>Term</span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.45)' }}>Meaning</span>
            </div>
            <div className="px-4">
              <DefRow term="Affiliate" definition="Any entity that directly or indirectly controls, is controlled by, or is under common control with a party, where 'control' means ownership of more than 50% of the voting interests." />
              <DefRow term="Agreement" definition="These Terms of Service, together with all Order Forms, the DPA, the Privacy Policy, and any other documents incorporated by reference." />
              <DefRow term="Business Day" definition="A day other than a Saturday, Sunday, or public holiday in Karnataka, India." />
              <DefRow term="Confidential Information" definition="Any non-public information disclosed by one party to the other that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure. User Data and Emithran Technology are Confidential Information of the respective owner." />
              <DefRow term="Emithran Technology" definition="The Platform, APIs, software, algorithms, machine-learning models, cost databases, documentation, and all other technology developed or owned by Emithran and made available as part of the Services." />
              <DefRow term="Fees" definition="All amounts payable by you to Emithran under this Agreement, including subscription fees, usage-based charges, and professional services fees." />
              <DefRow term="Force Majeure Event" definition="Any cause beyond a party's reasonable control including acts of God, war, terrorism, natural disaster, pandemic, government action, power failure, or internet or telecommunications outage." />
              <DefRow term="IP Rights" definition="All intellectual property rights including patents, copyrights, trademarks, trade secrets, database rights, and moral rights, whether registered or unregistered, anywhere in the world." />
              <DefRow term="Order Form" definition="A written or electronic order executed by the parties specifying the Services subscribed to, Fees, Subscription Term, and any additional terms." />
              <DefRow term="Personal Data" definition="Any information relating to an identified or identifiable natural person, as further defined in the DPA." />
              <DefRow term="Platform Data" definition="Aggregated, anonymised data derived by Emithran from your use of the Services that cannot be used to identify you or any individual." />
              <DefRow term="Subscription Term" definition="The period during which you are entitled to access the Services, as specified in the Order Form, commencing on the start date and continuing until terminated or expired." />
              <DefRow term="User" definition="An individual employee, contractor, or agent of yours who is authorised to access and use the Services under your account." />
              <DefRow term="User Data" definition="All data, content, and information submitted to or processed by the Services by you or your Users, including BOM data, supplier pricing, cost models, and procurement records." />
            </div>
          </div>

          {/* Emithran contracting entities */}
          <Para><Bold>Emithran Contracting Entities by region:</Bold></Para>
          <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid rgba(15,27,45,0.09)' }}>
            <div className="grid grid-cols-3 gap-0 px-4 py-3 border-b" style={{ background: 'rgba(15,27,45,0.03)', borderColor: 'rgba(15,27,45,0.07)' }}>
              {['Region', 'Contracting Entity', 'Registered Address'].map(h => (
                <span key={h} className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.45)' }}>{h}</span>
              ))}
            </div>
            {[
              ['India & Rest of World', 'Emithran Technologies Private Limited', 'Bangalore, Karnataka, India'],
              ['United Kingdom & EEA',  'Emithran UK Limited',                   'London, United Kingdom'],
            ].map(([region, entity, address]) => (
              <div key={region} className="grid grid-cols-3 gap-0 px-4 py-3.5 border-b last:border-b-0" style={{ borderColor: 'rgba(15,27,45,0.06)' }}>
                <span className="text-[13px]" style={{ color: 'rgba(15,27,45,0.7)' }}>{region}</span>
                <span className="text-[13px] font-medium" style={{ color: '#0f1b2d' }}>{entity}</span>
                <span className="text-[13px]" style={{ color: 'rgba(15,27,45,0.55)' }}>{address}</span>
              </div>
            ))}
          </div>
          <Divider />

          {/* ── Section 13 ── */}
          <H2 id="regional">13. Regional Terms</H2>
          <Para>
            The following jurisdiction-specific terms apply where you are located in the specified region and supplement or modify the general terms above. In the event of conflict, the regional terms prevail for users in that region.
          </Para>

          <H3 id="r-india">13.1 India</H3>
          <Para>
            <Bold>Governing law.</Bold> This Agreement is governed by the laws of India. The courts of Bangalore, Karnataka shall have exclusive jurisdiction for matters not referred to arbitration.
          </Para>
          <Para>
            <Bold>IT Act.</Bold> The Services are subject to the Information Technology Act, 2000 and applicable rules made thereunder, including the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </Para>
          <Para>
            <Bold>GST.</Bold> Where applicable, GST shall be charged in addition to the Fees at the rate prevailing at the time of the taxable supply. If you provide a valid GST registration number, Emithran will issue a B2B tax invoice.
          </Para>
          <Para>
            <Bold>TDS.</Bold> If you are required to deduct TDS under the Income Tax Act, 1961, you may deduct TDS at the applicable rate and remit it to the relevant authority. You must provide Emithran with Form 16A within 15 days of filing the TDS return so that Emithran may claim credit.
          </Para>

          <H3 id="r-eea">13.2 EEA and United Kingdom</H3>
          <Para>
            <Bold>Governing law.</Bold> For users in the EEA, this Agreement is governed by the laws of Ireland. For users in the United Kingdom, this Agreement is governed by the laws of England and Wales.
          </Para>
          <Para>
            <Bold>Dispute resolution.</Bold> Disputes shall be referred to the International Chamber of Commerce (ICC) in London for UK users and in Dublin for EEA users.
          </Para>
          <Para>
            <Bold>Consumer rights.</Bold> Nothing in this Agreement limits any rights you have under applicable consumer protection legislation that cannot be excluded or limited.
          </Para>

          <H3 id="r-usa">13.3 United States</H3>
          <Para>
            <Bold>Governing law.</Bold> This Agreement is governed by the laws of the State of California, without regard to its conflict-of-law principles.
          </Para>
          <Para>
            <Bold>Arbitration.</Bold> Disputes shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules, with the seat in San Francisco, California.
          </Para>
          <Para>
            <Bold>Jury trial waiver.</Bold> TO THE EXTENT PERMITTED BY LAW, EACH PARTY IRREVOCABLY WAIVES ANY RIGHT TO A JURY TRIAL IN ANY LEGAL PROCEEDING ARISING OUT OF OR RELATING TO THIS AGREEMENT.
          </Para>

          <H3 id="r-aus">13.4 Australia</H3>
          <Para>
            <Bold>Governing law.</Bold> This Agreement is governed by the laws of New South Wales, Australia.
          </Para>
          <Para>
            <Bold>Consumer law.</Bold> Nothing in this Agreement excludes, restricts, or modifies any right or remedy, or any guarantee, warranty, or other term or condition, implied or imposed by the Australian Consumer Law (Schedule 2 to the Competition and Consumer Act 2010 (Cth)) that cannot lawfully be excluded.
          </Para>
          <Divider />

          {/* Contact block */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(13,148,136,0.14)' }}
          >
            <div className="p-5 border-b" style={{ background: 'rgba(13,148,136,0.05)', borderColor: 'rgba(13,148,136,0.1)' }}>
              <p className="text-[13.5px] font-semibold" style={{ color: '#0f1b2d' }}>
                Questions about these terms?
              </p>
            </div>
            <div className="p-5 flex flex-col gap-3" style={{ background: '#fff' }}>
              {[
                { label: 'Legal enquiries',  email: 'legal@emithran.in'   },
                { label: 'Privacy matters',  email: 'privacy@emithran.in' },
                { label: 'Security reports', email: 'security@emithran.in'},
              ].map(row => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-[12.5px] font-medium w-40 shrink-0" style={{ color: 'rgba(15,27,45,0.55)' }}>
                    {row.label}
                  </span>
                  <a href={`mailto:${row.email}`} className="text-[13px] hover:underline" style={{ color: '#0d9488' }}>
                    {row.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </article>
      </div>
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const LAST_UPDATED = 'June 8, 2026'

/* ── Sidebar nav ──────────────────────────────────────────────────── */

interface NavItem {
  id: string
  label: string
  sub?: { id: string; label: string }[]
}

const NAV: NavItem[] = [
  { id: 'background',  label: 'Background & Scope' },
  { id: 'definitions', label: 'Definitions' },
  {
    id: 'processing-details',
    label: 'Details of Processing',
    sub: [
      { id: 'subject-matter', label: 'Subject matter' },
      { id: 'duration',       label: 'Duration' },
      { id: 'nature',         label: 'Nature & purpose' },
      { id: 'data-types',     label: 'Types of Personal Data' },
      { id: 'data-subjects',  label: 'Categories of data subjects' },
    ],
  },
  {
    id: 'processor-obligations',
    label: 'Processor Obligations',
    sub: [
      { id: 'instructions',      label: 'Processing on instructions' },
      { id: 'confidentiality',   label: 'Confidentiality' },
      { id: 'security',          label: 'Security measures' },
      { id: 'sub-processors',    label: 'Sub-processors' },
      { id: 'data-subject-rights', label: 'Data subject rights' },
      { id: 'transfers',         label: 'International transfers' },
      { id: 'dpia',              label: 'DPIAs & prior consultation' },
    ],
  },
  { id: 'controller-obligations', label: 'Controller Obligations' },
  { id: 'audits',                 label: 'Audits & Inspections' },
  { id: 'deletion',               label: 'Return & Deletion of Data' },
  { id: 'liability',              label: 'Liability' },
  { id: 'general-dpa',            label: 'General' },
  { id: 'schedule-a',             label: 'Schedule A — Processing Details' },
  { id: 'schedule-b',             label: 'Schedule B — Security Measures' },
  { id: 'schedule-c',             label: 'Schedule C — Sub-processors' },
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

export default function DPAPage() {
  const [activeId, setActiveId] = useState('background')

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
            <span style={{ color: '#0f1b2d' }}>Data Processing Agreement</span>
          </div>

          {/* Related docs tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mb-px">
            {[
              { label: 'Terms of Service',          href: '/terms',   active: false },
              { label: 'Privacy Policy',             href: '/privacy', active: false },
              { label: 'Cookies Policy',             href: '/cookies', active: false },
              { label: 'Data Processing Agreement',  href: '/dpa',     active: true  },
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
              Data Processing Agreement
            </h1>
            <p className="text-[13px] mb-6" style={{ color: 'rgba(15,27,45,0.42)' }}>
              Last updated: {LAST_UPDATED}
            </p>
            <Callout>
              This Data Processing Agreement (&ldquo;DPA&rdquo;) forms part of and is incorporated into the Terms of Service between Emithran Technologies Private Limited (&ldquo;Emithran&rdquo;) and Customer (&ldquo;Controller&rdquo;). Where Emithran processes Personal Data on behalf of the Controller as a Processor, this DPA governs that processing.
            </Callout>
          </div>

          {/* ── Section 1: Background & Scope ── */}
          <H2 id="background">1. Background &amp; Scope</H2>
          <Para>
            Emithran Technologies Private Limited (<Bold>&ldquo;Emithran&rdquo;</Bold> or <Bold>&ldquo;Processor&rdquo;</Bold>) operates a cloud-based manufacturing intelligence platform that enables customers to perform should-cost analysis, manage bills of materials, benchmark supplier pricing, and optimise procurement costs (the <Bold>&ldquo;Services&rdquo;</Bold>).
          </Para>
          <Para>
            In the course of providing the Services, Emithran may process Personal Data that is uploaded to, generated within, or otherwise made available on the Platform by the Customer and its Users. In that context, the Customer acts as the <Bold>&ldquo;Controller&rdquo;</Bold> of such Personal Data and Emithran acts as the <Bold>&ldquo;Processor&rdquo;</Bold>.
          </Para>
          <Para>
            This DPA is incorporated into and forms an inseparable part of the Terms of Service (the <Bold>&ldquo;Agreement&rdquo;</Bold>) entered into between Emithran and the Customer. Capitalised terms not defined in this DPA have the meanings given to them in the Agreement. In the event of any conflict or inconsistency between this DPA and the Agreement in relation to the processing of Personal Data, this DPA shall prevail.
          </Para>
          <Para>
            This DPA applies to all processing of Personal Data carried out by Emithran on behalf of the Controller in connection with the Services. It does not apply to Personal Data processed by Emithran as a Controller in its own right (for example, account registration data processed for contract management and billing purposes), which is governed by the <TealLink href="/privacy">Privacy Policy</TealLink>.
          </Para>
          <Para>
            The parties acknowledge that the details of processing set out in Schedule A form an integral part of this DPA and accurately describe the nature and scope of the processing activities Emithran carries out on behalf of the Controller.
          </Para>
          <Divider />

          {/* ── Section 2: Definitions ── */}
          <H2 id="definitions">2. Definitions</H2>
          <Para>
            For the purposes of this DPA, the following terms have the meanings set out below. Other capitalised terms are defined where they first appear or in the Agreement.
          </Para>

          <div className="mb-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(15,27,45,0.09)' }}>
            <div className="flex gap-5 px-4 py-3 border-b" style={{ background: 'rgba(15,27,45,0.03)', borderColor: 'rgba(15,27,45,0.07)' }}>
              <span className="text-[11px] font-bold uppercase tracking-wider w-48 shrink-0" style={{ color: 'rgba(15,27,45,0.45)' }}>Term</span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.45)' }}>Meaning</span>
            </div>
            <div className="px-4">
              <DefRow term="Controller" definition="The natural or legal person, public authority, agency, or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal Data. For the purposes of this DPA, Controller means the Customer." />
              <DefRow term="Processor" definition="A natural or legal person, public authority, agency, or other body which processes Personal Data on behalf of the Controller. For the purposes of this DPA, Processor means Emithran." />
              <DefRow term="Sub-processor" definition="Any third party engaged by Emithran (as Processor) to carry out processing activities on behalf of the Controller in connection with the Services, as listed in Schedule C." />
              <DefRow term="Personal Data" definition="Any information relating to an identified or identifiable natural person ('data subject'). An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person." />
              <DefRow term="Processing" definition="Any operation or set of operations which is performed on Personal Data or on sets of Personal Data, whether or not by automated means, such as collection, recording, organisation, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure, or destruction." />
              <DefRow term="Data Subject" definition="An identified or identifiable natural person to whom Personal Data relates." />
              <DefRow
                term="Data Protection Law"
                definition={<>All applicable laws and regulations relating to the processing of Personal Data and privacy, including (as applicable): the General Data Protection Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;); the UK GDPR as it forms part of domestic law by virtue of the European Union (Withdrawal) Act 2018; India&rsquo;s Digital Personal Data Protection Act 2023 (&ldquo;DPDPA&rdquo;); and any other applicable national or state data protection legislation.</>}
              />
              <DefRow term="EEA" definition="The European Economic Area, comprising the member states of the European Union together with Iceland, Liechtenstein, and Norway." />
              <DefRow term="GDPR" definition="Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data." />
              <DefRow term="SCCs" definition="The Standard Contractual Clauses for the transfer of Personal Data to third countries as adopted by the European Commission from time to time, currently set out in Commission Implementing Decision (EU) 2021/914." />
              <DefRow term="Security Incident" definition="Any confirmed breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, Personal Data transmitted, stored, or otherwise processed by Emithran in connection with the Services." />
              <DefRow term="Services" definition="The Emithran manufacturing intelligence platform and related services as described in the Agreement." />
            </div>
          </div>
          <Divider />

          {/* ── Section 3: Processing Details ── */}
          <H2 id="processing-details">3. Details of Processing</H2>
          <Para>
            The details of the processing activities carried out by Emithran on behalf of the Controller are set out in this Section 3 and in Schedule A. In the event of any inconsistency, Schedule A shall prevail.
          </Para>

          <H3 id="subject-matter">3.1 Subject Matter</H3>
          <Para>
            The subject matter of the processing is the provision of the Services to the Controller, including all processing operations necessary to enable the Controller and its Users to access and use the manufacturing intelligence platform, including BOM management, should-cost analysis, supplier benchmarking, procurement workflow tooling, and associated analytics features.
          </Para>

          <H3 id="duration">3.2 Duration</H3>
          <Para>
            Emithran shall process Personal Data on behalf of the Controller for the duration of the Agreement (the <Bold>&ldquo;Subscription Term&rdquo;</Bold>). Upon expiry or termination of the Agreement, Emithran shall cease processing and shall return or delete Personal Data in accordance with Section 7 of this DPA and Schedule A.
          </Para>

          <H3 id="nature">3.3 Nature and Purpose of Processing</H3>
          <Para>
            The nature of the processing includes storage, retrieval, organisation, structuring, use, and display of Personal Data for the purpose of providing the Services. The specific purposes of processing are:
          </Para>
          <SubClause letter="a">enabling authorised Users to access and use the Platform and its features;</SubClause>
          <SubClause letter="b">facilitating BOM creation, cost analysis, and supplier management workflows;</SubClause>
          <SubClause letter="c">sending transactional and operational emails and notifications to Users and contacts;</SubClause>
          <SubClause letter="d">providing customer support and responding to queries raised by Users;</SubClause>
          <SubClause letter="e">generating usage analytics to improve product quality, stability, and performance;</SubClause>
          <SubClause letter="f">maintaining security, preventing fraud, and ensuring the integrity and availability of the Services.</SubClause>

          <H3 id="data-types">3.4 Types of Personal Data</H3>
          <Para>
            The categories of Personal Data processed by Emithran on behalf of the Controller include:
          </Para>
          <Ul items={[
            <><Bold>BOM and procurement data:</Bold> supplier company names, supplier contact names, supplier email addresses, supplier telephone numbers, and other contact details uploaded or generated by the Controller in the course of using the Platform.</>,
            <><Bold>Account and user data:</Bold> account holder names, email addresses, job titles, department names, profile photographs (if uploaded), and login credentials (stored in hashed form) of individuals authorised to access the Platform.</>,
            <><Bold>Billing and payment contacts:</Bold> names, email addresses, postal addresses, and payment instrument details (tokenised) of individuals designated as billing contacts for the Controller&rsquo;s account.</>,
            <><Bold>Communications data:</Bold> email addresses, names, and message content of individuals who communicate with the Controller&rsquo;s team via Platform-integrated communication tools or support channels.</>,
            <><Bold>Usage and event data:</Bold> IP addresses, device identifiers, session identifiers, and behavioural event data generated by Users when accessing and navigating the Platform.</>,
          ]} />

          <H3 id="data-subjects">3.5 Categories of Data Subjects</H3>
          <Para>
            The categories of data subjects whose Personal Data Emithran processes on behalf of the Controller are:
          </Para>
          <Ul items={[
            <><Bold>Users:</Bold> employees, contractors, and agents of the Controller who are granted access to the Platform.</>,
            <><Bold>Business users and administrators:</Bold> individuals within the Controller&rsquo;s organisation who manage the account, configure settings, or administer the workspace.</>,
            <><Bold>Supplier contacts:</Bold> employees, representatives, or contacts of third-party suppliers whose details are uploaded to or created within the Platform by the Controller as part of its procurement or sourcing workflows.</>,
            <><Bold>Billing contacts:</Bold> individuals within the Controller&rsquo;s organisation designated as financial or billing contacts for subscription management purposes.</>,
          ]} />
          <Divider />

          {/* ── Section 4: Processor Obligations ── */}
          <H2 id="processor-obligations">4. Processor Obligations</H2>

          <H3 id="instructions">4.1 Processing on Documented Instructions</H3>
          <Para>
            Emithran shall process Personal Data only on the documented instructions of the Controller, including with regard to transfers of Personal Data to a third country or an international organisation, unless required to do so by applicable Data Protection Law. In such a case, Emithran shall inform the Controller of that legal requirement before processing, unless that law prohibits such information on important grounds of public interest.
          </Para>
          <Para>
            The Controller&rsquo;s instructions for processing are: (i) as set out in the Agreement and this DPA; and (ii) as communicated in writing by the Controller from time to time in accordance with the Agreement. Emithran shall promptly inform the Controller if, in Emithran&rsquo;s opinion, an instruction infringes applicable Data Protection Law.
          </Para>
          <SubClause letter="a">Emithran shall not process Personal Data for its own purposes, including for purposes of training machine-learning models, constructing benchmarks, or for any marketing or commercial purpose, unless Personal Data has been fully anonymised and aggregated such that individual data subjects cannot be identified.</SubClause>
          <SubClause letter="b">Any processing of Personal Data beyond the scope of the Controller&rsquo;s instructions shall require prior written agreement between the parties in the form of an amendment to this DPA or a separate processing agreement.</SubClause>

          <H3 id="confidentiality">4.2 Confidentiality of Processing</H3>
          <Para>
            Emithran shall ensure that all persons authorised to process Personal Data on its behalf:
          </Para>
          <SubClause letter="a">are subject to binding confidentiality obligations (whether contractual or arising by operation of law) that are at least as protective as those in this DPA;</SubClause>
          <SubClause letter="b">access Personal Data only to the extent strictly necessary for the performance of their duties in connection with the Services;</SubClause>
          <SubClause letter="c">have received appropriate training in data protection obligations relevant to their role and the Personal Data they handle;</SubClause>
          <SubClause letter="d">are made aware of this DPA and the Controller&rsquo;s instructions to the extent relevant to their duties.</SubClause>
          <Para>
            Emithran shall ensure that access to Personal Data is granted on a least-privilege basis and that access rights are reviewed and revoked promptly upon a change in an employee&rsquo;s role or departure from the organisation.
          </Para>

          <H3 id="security">4.3 Security Measures</H3>
          <Para>
            Taking into account the state of the art, the costs of implementation, and the nature, scope, context, and purposes of processing, as well as the risk of varying likelihood and severity to the rights and freedoms of natural persons, Emithran shall implement and maintain appropriate technical and organisational measures to ensure a level of security appropriate to the risk. These measures are described in Schedule B and include:
          </Para>
          <SubClause letter="a">the pseudonymisation and encryption of Personal Data at rest and in transit;</SubClause>
          <SubClause letter="b">the ability to ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems and services;</SubClause>
          <SubClause letter="c">the ability to restore the availability and access to Personal Data in a timely manner in the event of a physical or technical incident;</SubClause>
          <SubClause letter="d">a process for regularly testing, assessing, and evaluating the effectiveness of technical and organisational measures for ensuring the security of processing.</SubClause>
          <Para>
            <Bold>Security Incident notification.</Bold> In the event that Emithran becomes aware of a confirmed Security Incident, Emithran shall notify the Controller without undue delay and, where feasible, not later than 72 hours after becoming aware of it. Such notification shall include, to the extent then known:
          </Para>
          <SubClause letter="a">a description of the nature of the Security Incident, including the categories and approximate number of data subjects and Personal Data records concerned;</SubClause>
          <SubClause letter="b">the name and contact details of Emithran&rsquo;s data protection point of contact from whom further information can be obtained;</SubClause>
          <SubClause letter="c">a description of the likely consequences of the Security Incident;</SubClause>
          <SubClause letter="d">a description of the measures taken or proposed to be taken by Emithran to address the Security Incident, including, where appropriate, measures to mitigate its possible adverse effects.</SubClause>
          <Para>
            Where, and in so far as, it is not possible to provide all information at the same time, the information may be provided in phases without undue further delay. Emithran&rsquo;s obligation to report a Security Incident under this clause does not constitute an acknowledgement of fault or liability.
          </Para>

          <H3 id="sub-processors">4.4 Sub-processors</H3>
          <Para>
            The Controller grants Emithran a general authorisation to engage Sub-processors, subject to the conditions set out in this Section 4.4. The list of Sub-processors currently authorised by the Controller is set out in Schedule C.
          </Para>
          <SubClause letter="a"><Bold>Notice of changes.</Bold> Emithran shall provide the Controller with at least 10 calendar days&rsquo; prior written notice of any intended addition or replacement of a Sub-processor by updating Schedule C and notifying the Controller by email to the address registered on the Controller&rsquo;s account.</SubClause>
          <SubClause letter="b"><Bold>Objection rights.</Bold> The Controller may object to the addition or replacement of a Sub-processor on reasonable data protection grounds by notifying Emithran in writing within the notice period. Where the Controller objects, the parties shall discuss the objection in good faith. If Emithran proceeds with the change and the Controller maintains a reasonable objection, the Controller may terminate the Agreement in respect of those Services that cannot be provided without the relevant Sub-processor, subject to any notice obligations in the Agreement.</SubClause>
          <SubClause letter="c"><Bold>Sub-processor obligations.</Bold> Where Emithran engages a Sub-processor, it shall impose on that Sub-processor data protection obligations equivalent to those imposed on Emithran under this DPA, in particular providing sufficient guarantees to implement appropriate technical and organisational measures such that the processing will meet applicable Data Protection Law requirements.</SubClause>
          <SubClause letter="d"><Bold>Liability.</Bold> Emithran shall remain fully liable to the Controller for the performance of the Sub-processor&rsquo;s data protection obligations to the extent that Emithran is responsible under this DPA.</SubClause>

          <H3 id="data-subject-rights">4.5 Data Subject Rights</H3>
          <Para>
            Emithran shall, taking into account the nature of the processing, assist the Controller by appropriate technical and organisational measures, insofar as this is possible, to fulfil the Controller&rsquo;s obligations to respond to requests from Data Subjects exercising their rights under applicable Data Protection Law. These rights include:
          </Para>
          <SubClause letter="a">the right of access to Personal Data (including provision of copies);</SubClause>
          <SubClause letter="b">the right to rectification of inaccurate or incomplete Personal Data;</SubClause>
          <SubClause letter="c">the right to erasure (&ldquo;right to be forgotten&rdquo;);</SubClause>
          <SubClause letter="d">the right to restriction of processing;</SubClause>
          <SubClause letter="e">the right to data portability in a structured, commonly used, and machine-readable format;</SubClause>
          <SubClause letter="f">the right to object to processing;</SubClause>
          <SubClause letter="g">rights related to automated individual decision-making, including profiling.</SubClause>
          <Para>
            Where Emithran receives a request from a Data Subject in relation to Personal Data processed on behalf of the Controller, Emithran shall promptly forward such request to the Controller and shall not respond directly to the Data Subject except where authorised in writing to do so by the Controller. Emithran shall provide its assistance within a reasonable timeframe and, in any case, in sufficient time to allow the Controller to comply with applicable regulatory deadlines.
          </Para>
          <Para>
            Emithran shall assist the Controller in ensuring compliance with obligations relating to security, breach notification, data protection impact assessments, and prior consultation with supervisory authorities, having regard to the nature of the processing and the information available to Emithran.
          </Para>

          <H3 id="transfers">4.6 International Transfers</H3>
          <Para>
            Emithran shall not transfer Personal Data to a third country outside the EEA or a country not recognised as providing an adequate level of protection by an applicable authority, except:
          </Para>
          <SubClause letter="a">where the transfer is to a country in respect of which an adequacy decision has been adopted by the European Commission or the competent UK authority under applicable Data Protection Law;</SubClause>
          <SubClause letter="b">where the transfer is subject to appropriate safeguards in the form of Standard Contractual Clauses (SCCs) adopted by the European Commission, incorporated herein by reference as Annex to this DPA, with Emithran as the data importer and the Controller as the data exporter, or such other SCCs as may be applicable;</SubClause>
          <SubClause letter="c">where the transfer is subject to binding corporate rules, approved codes of conduct, or approved certification mechanisms recognised under applicable Data Protection Law;</SubClause>
          <SubClause letter="d">where the transfer is otherwise permitted under applicable Data Protection Law.</SubClause>
          <Para>
            The parties agree that, to the extent that Personal Data from the EEA or UK is transferred to or accessible from Sub-processors located in third countries, Emithran shall ensure that appropriate transfer mechanisms are in place with such Sub-processors. Details of the locations of each Sub-processor are set out in Schedule C. Upon request, Emithran shall provide the Controller with copies of the applicable transfer mechanisms.
          </Para>

          <H3 id="dpia">4.7 Data Protection Impact Assessments and Prior Consultation</H3>
          <Para>
            Emithran shall provide reasonable assistance to the Controller in carrying out data protection impact assessments (&ldquo;DPIAs&rdquo;) where required by applicable Data Protection Law, having regard to the nature of the processing and the information available to Emithran. Such assistance shall include:
          </Para>
          <SubClause letter="a">providing information about the processing operations conducted by Emithran in connection with the Services, including the technical and organisational security measures described in Schedule B;</SubClause>
          <SubClause letter="b">where requested in writing, reviewing and providing comments on draft DPIA documentation prepared by the Controller relating to the Services.</SubClause>
          <Para>
            Where, following a DPIA, applicable Data Protection Law requires the Controller to consult with a supervisory authority prior to processing, Emithran shall provide reasonable assistance to the Controller in preparing the information required for such consultation, including information about the processing activities carried out by Emithran as Processor.
          </Para>
          <Divider />

          {/* ── Section 5: Controller Obligations ── */}
          <H2 id="controller-obligations">5. Controller Obligations</H2>
          <Para>
            The Controller represents, warrants, and undertakes to Emithran that:
          </Para>
          <SubClause letter="a"><Bold>Lawful basis.</Bold> The Controller has and will maintain throughout the Subscription Term a valid lawful basis under applicable Data Protection Law for all processing of Personal Data that it instructs Emithran to carry out on its behalf, including any necessary consents, legitimate interests assessments, or contractual necessity grounds.</SubClause>
          <SubClause letter="b"><Bold>Notices and transparency.</Bold> The Controller has provided, and will continue to provide, all necessary privacy notices and transparency information to Data Subjects whose Personal Data is processed through the Services, in accordance with applicable Data Protection Law, including information about Emithran as a Processor.</SubClause>
          <SubClause letter="c"><Bold>Accuracy.</Bold> The Controller shall take reasonable steps to ensure that Personal Data submitted to the Services is accurate, up to date, and adequate for the purposes for which it is processed. The Controller shall promptly notify Emithran of any inaccuracies of which it becomes aware.</SubClause>
          <SubClause letter="d"><Bold>Data minimisation.</Bold> The Controller shall not submit Personal Data to the Services beyond what is reasonably necessary for the purposes of using the Services, and shall not upload categories of Personal Data that are not described in Schedule A without first agreeing an amendment to this DPA with Emithran.</SubClause>
          <SubClause letter="e"><Bold>Compliance with Data Protection Law.</Bold> The Controller shall comply with all applicable Data Protection Law in connection with its use of the Services and its instructions to Emithran as Processor, including its obligations as a Controller with respect to Data Subject rights, security, and breach notification.</SubClause>
          <SubClause letter="f"><Bold>Authorised instructions.</Bold> The Controller&rsquo;s instructions to Emithran shall at all times comply with applicable Data Protection Law. The Controller shall be responsible for ensuring that any instruction it provides to Emithran is lawful and does not put Emithran in breach of applicable Data Protection Law.</SubClause>
          <SubClause letter="g"><Bold>Third-party data.</Bold> Where the Controller uploads Personal Data of third parties (including supplier contacts) to the Services, the Controller warrants that it has the authority to do so and that the processing of such data by Emithran as Processor is lawful under applicable Data Protection Law.</SubClause>
          <Divider />

          {/* ── Section 6: Audits ── */}
          <H2 id="audits">6. Audits and Inspections</H2>
          <Para>
            Emithran shall make available to the Controller all information reasonably necessary to demonstrate compliance with the obligations laid down in this DPA and shall allow for and contribute to audits, including inspections, conducted by the Controller or an auditor mandated by the Controller, subject to the conditions set out in this Section 6.
          </Para>
          <SubClause letter="a"><Bold>Frequency.</Bold> The Controller may exercise its audit rights under this Section 6 no more than once per calendar year, unless: (i) a Security Incident has occurred that is reasonably related to the scope of the audit; or (ii) a supervisory authority requires more frequent audits.</SubClause>
          <SubClause letter="b"><Bold>Notice.</Bold> The Controller shall give Emithran at least 30 calendar days&rsquo; prior written notice of any intended audit or inspection, specifying the scope, duration, and start date. Emithran may request that the Controller use a mutually agreed qualified third-party auditor rather than the Controller&rsquo;s own personnel, provided that Emithran acts reasonably in doing so.</SubClause>
          <SubClause letter="c"><Bold>Confidentiality.</Bold> Any auditor mandated by the Controller shall be subject to binding confidentiality obligations acceptable to Emithran prior to commencing the audit. The audit shall be conducted in a manner that minimises disruption to Emithran&rsquo;s business operations and shall not compromise the security, confidentiality, or integrity of other customers&rsquo; data.</SubClause>
          <SubClause letter="d"><Bold>Costs.</Bold> All costs associated with an audit or inspection under this Section 6, including Emithran&rsquo;s reasonable internal costs for facilitating the audit, shall be borne by the Controller. Emithran shall provide the Controller with a reasonable estimate of such costs prior to commencement.</SubClause>
          <SubClause letter="e"><Bold>Certifications.</Bold> In lieu of, or in addition to, an on-site audit, the Controller may request that Emithran provide copies of relevant third-party security certifications, penetration test executive summaries, or audit reports (such as SOC 2 Type II reports), subject to applicable confidentiality restrictions. Emithran shall use commercially reasonable efforts to maintain ISO 27001 certification or an equivalent standard throughout the Subscription Term.</SubClause>
          <Divider />

          {/* ── Section 7: Deletion ── */}
          <H2 id="deletion">7. Return and Deletion of Personal Data</H2>
          <Para>
            Upon expiry or termination of the Agreement, or upon the written request of the Controller at any time, Emithran shall at the Controller&rsquo;s election:
          </Para>
          <SubClause letter="a"><Bold>Return.</Bold> Provide the Controller with a copy of all Personal Data processed on its behalf in a structured, commonly used, and machine-readable format (such as CSV or JSON export), within 30 calendar days of the request or termination date; or</SubClause>
          <SubClause letter="b"><Bold>Delete.</Bold> Securely delete or destroy all Personal Data processed on behalf of the Controller, including all copies held on backup systems, within 30 calendar days of the request or termination date.</SubClause>
          <Para>
            Emithran shall, within 10 business days of completing the return or deletion, provide the Controller with a written certification confirming that all Personal Data has been returned or deleted in accordance with this Section 7, unless applicable law requires retention of some or all of the Personal Data.
          </Para>
          <Para>
            Where applicable law requires Emithran to retain Personal Data beyond the 30-day period, Emithran shall notify the Controller in writing, specifying the legal basis for retention and the anticipated retention period. During any extended retention period, Emithran shall not process the retained Personal Data for any purpose other than compliance with the applicable legal obligation, and shall delete it as soon as the legal requirement lapses.
          </Para>
          <Para>
            The Controller acknowledges that following deletion, Emithran may retain aggregated and fully anonymised statistical data derived from the Controller&rsquo;s use of the Services, provided that such data cannot be used to identify the Controller or any individual Data Subject.
          </Para>
          <Divider />

          {/* ── Section 8: Liability ── */}
          <H2 id="liability">8. Liability</H2>
          <Para>
            Each party&rsquo;s liability to the other under or in connection with this DPA (whether arising in contract, tort including negligence, breach of statutory duty, or otherwise) shall be subject to the limitations and exclusions set out in the Agreement, including the overall liability cap and the exclusion of indirect and consequential damages.
          </Para>
          <Para>
            Notwithstanding the foregoing, the parties agree that:
          </Para>
          <SubClause letter="a"><Bold>Uncapped liability for certain Security Incidents.</Bold> Where a Security Incident arising directly from Emithran&rsquo;s failure to comply with its security obligations under Section 4.3 and Schedule B results in a binding fine, penalty, or administrative sanction imposed by a supervisory authority on the Controller under applicable Data Protection Law, Emithran&rsquo;s liability in respect of such fine, penalty, or sanction shall not be subject to the aggregate liability cap set out in the Agreement, but shall be limited to the portion of the supervisory authority&rsquo;s determination attributable to Emithran&rsquo;s breach. For the avoidance of doubt, this clause does not apply where the Security Incident was caused or contributed to by the Controller&rsquo;s own failure to comply with its obligations under this DPA or applicable Data Protection Law.</SubClause>
          <SubClause letter="b"><Bold>Contribution.</Bold> Where both parties are responsible for damage caused by processing in breach of applicable Data Protection Law, each party shall be liable for that part of the damage for which it is responsible. A party shall be exonerated from liability if it proves that it is not in any way responsible for the event giving rise to the damage.</SubClause>
          <SubClause letter="c"><Bold>Data Subject claims.</Bold> Where a Data Subject pursues a claim against Emithran as Processor in respect of processing carried out on behalf of the Controller, Emithran shall promptly notify the Controller and, if Emithran is liable, the Controller shall indemnify and hold Emithran harmless from the proportion of such liability that is attributable to the Controller&rsquo;s instructions or breach of this DPA.</SubClause>
          <Divider />

          {/* ── Section 9: General ── */}
          <H2 id="general-dpa">9. General</H2>
          <SubClause letter="a"><Bold>Term and termination.</Bold> This DPA shall enter into force on the effective date of the Agreement and shall remain in force for the duration of the Agreement. This DPA shall terminate automatically upon termination or expiry of the Agreement, subject to the survival of obligations set out in Section 9(d).</SubClause>
          <SubClause letter="b"><Bold>Conflicts.</Bold> In the event of any conflict or inconsistency between this DPA and the Agreement in relation to the processing of Personal Data, the provisions of this DPA shall prevail. In all other respects, the Agreement shall govern.</SubClause>
          <SubClause letter="c"><Bold>Governing law.</Bold> This DPA is governed by the same governing law as applies to the Agreement under the applicable Regional Terms (as defined in the Agreement). For Controllers in India, this DPA is governed by the laws of India; for Controllers in the EEA, by the laws of Ireland; for Controllers in the United Kingdom, by the laws of England and Wales.</SubClause>
          <SubClause letter="d"><Bold>Survival.</Bold> Sections 7 (Return and Deletion), 8 (Liability), and 9 (General) shall survive termination or expiry of this DPA and the Agreement.</SubClause>
          <SubClause letter="e"><Bold>Amendments.</Bold> This DPA may only be amended by a written instrument signed by authorised representatives of both parties. Emithran may update this DPA from time to time to reflect changes in applicable Data Protection Law by providing the Controller with at least 30 days&rsquo; prior written notice, provided that such updates do not materially reduce the Controller&rsquo;s rights or increase its obligations without its consent.</SubClause>
          <SubClause letter="f"><Bold>Entire agreement.</Bold> This DPA, together with its Schedules and the Agreement, constitutes the entire agreement between the parties with respect to the processing of Personal Data by Emithran on behalf of the Controller, and supersedes all prior agreements, representations, and understandings relating to that subject matter.</SubClause>
          <SubClause letter="g"><Bold>Contact.</Bold> Questions or requests relating to this DPA should be directed to <TealLink href="mailto:privacy@emithran.in">privacy@emithran.in</TealLink>.</SubClause>
          <Divider />

          {/* ── Schedule A ── */}
          <H2 id="schedule-a">Schedule A — Processing Details</H2>
          <Para>
            This Schedule A forms part of the DPA and sets out the details of the processing activities carried out by Emithran on behalf of the Controller.
          </Para>

          <div className="mb-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(15,27,45,0.09)' }}>
            <div className="grid grid-cols-[200px_1fr] px-4 py-3 border-b" style={{ background: 'rgba(15,27,45,0.03)', borderColor: 'rgba(15,27,45,0.07)' }}>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.45)' }}>Item</span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.45)' }}>Details</span>
            </div>
            {[
              {
                item: 'Subject matter',
                detail: 'The provision of the Emithran manufacturing intelligence platform and related Services to the Controller, including BOM management, should-cost analysis, supplier benchmarking, procurement workflows, and analytics.',
              },
              {
                item: 'Duration',
                detail: 'For the duration of the Subscription Term under the Agreement, and for such additional period as may be required under applicable law or as agreed between the parties for the purpose of return or deletion under Section 7 of the DPA.',
              },
              {
                item: 'Nature of processing',
                detail: 'Storage, structuring, retrieval, display, transmission, and deletion of Personal Data for the purposes of providing the Services. Processing is carried out by automated means via Emithran\'s cloud infrastructure.',
              },
              {
                item: 'Purpose of processing',
                detail: 'To enable the Controller and its authorised Users to access and use the Services, including BOM creation, cost analysis, supplier management, transactional communications, customer support, and product analytics.',
              },
              {
                item: 'Types of Personal Data',
                detail: 'BOM and procurement data (supplier names, emails, telephone numbers); account and user data (names, email addresses, job titles, hashed passwords); billing and payment contacts (names, email addresses, tokenised payment details); communications data (email addresses, message content); usage and event data (IP addresses, session identifiers, behavioural events).',
              },
              {
                item: 'Categories of data subjects',
                detail: 'Users (employees, contractors, agents of the Controller authorised to access the Platform); Business users and administrators (individuals managing the Controller\'s account); Supplier contacts (employees or representatives of third-party suppliers uploaded by the Controller); Billing contacts (individuals designated as financial contacts for the Controller\'s account).',
              },
              {
                item: 'Retention period',
                detail: 'Personal Data is retained for the duration of the Subscription Term. Upon termination or expiry of the Agreement, Personal Data will be returned or deleted in accordance with Section 7 of the DPA within 30 days, unless a longer retention period is required by applicable law.',
              },
            ].map((row, i, arr) => (
              <div
                key={row.item}
                className="grid grid-cols-[200px_1fr] px-4 py-4"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(15,27,45,0.06)' : 'none' }}
              >
                <span className="text-[13px] font-semibold pr-4" style={{ color: '#0f1b2d' }}>{row.item}</span>
                <span className="text-[13px] leading-[1.7]" style={{ color: 'rgba(15,27,45,0.68)' }}>{row.detail}</span>
              </div>
            ))}
          </div>
          <Divider />

          {/* ── Schedule B ── */}
          <H2 id="schedule-b">Schedule B — Technical and Organisational Security Measures</H2>
          <Para>
            This Schedule B describes the technical and organisational measures (&ldquo;TOMs&rdquo;) implemented by Emithran to ensure a level of security appropriate to the risk of processing Personal Data on behalf of the Controller. These measures are reviewed and updated regularly.
          </Para>

          <div className="mb-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(15,27,45,0.09)' }}>
            <div className="grid grid-cols-[180px_1fr] px-4 py-3 border-b" style={{ background: 'rgba(15,27,45,0.03)', borderColor: 'rgba(15,27,45,0.07)' }}>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.45)' }}>Category</span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.45)' }}>Measure</span>
            </div>
            {[
              {
                category: 'Access Control',
                measure: 'Role-based access control (RBAC) with least-privilege principles enforced across all production systems. Multi-factor authentication (MFA) mandatory for all Emithran personnel accessing production environments. Privileged access management (PAM) tooling for administrative access. Access rights reviewed quarterly and revoked immediately upon role change or departure. Unique user accounts; shared credentials prohibited.',
              },
              {
                category: 'Encryption',
                measure: 'All Personal Data encrypted in transit using TLS 1.2 or higher. All Personal Data encrypted at rest using AES-256 or equivalent. Database-level encryption enabled across all production data stores. Encryption keys managed via a dedicated key management service (KMS) with rotation policies. Backups encrypted using the same standards as primary data stores.',
              },
              {
                category: 'Network Security',
                measure: 'Production infrastructure hosted within logically isolated Virtual Private Clouds (VPCs). Network segmentation with firewall rules enforced at perimeter and between tiers. Web Application Firewall (WAF) deployed to protect public-facing endpoints. Intrusion detection and prevention systems (IDS/IPS) monitoring network traffic. Regular vulnerability scanning and penetration testing by qualified third-party providers (minimum annually). DDoS mitigation via cloud provider protections.',
              },
              {
                category: 'Physical Security',
                measure: 'Emithran relies on AWS-managed data centre physical security, which includes multi-layer physical access controls, 24/7 on-site security personnel, biometric access, CCTV surveillance, and environmental controls (fire suppression, climate control, uninterruptible power supply). Emithran does not maintain its own data centre facilities. Personnel working with Personal Data in office environments are subject to clean-desk policies and locked-screen requirements.',
              },
              {
                category: 'Backup & Recovery',
                measure: 'Automated daily backups of all production databases with point-in-time recovery capability. Backups stored in geographically separate regions from primary data. Backup integrity tested quarterly via restoration drills. Recovery Time Objective (RTO) of 4 hours and Recovery Point Objective (RPO) of 1 hour for critical data. Business continuity and disaster recovery plans reviewed and tested annually.',
              },
              {
                category: 'Incident Management',
                measure: 'Documented Security Incident response plan maintained and tested at least annually. 24/7 alerting and on-call rotation for critical security events. Security Incidents triaged, contained, and investigated in accordance with documented runbooks. Controller notification within 72 hours of confirmed Security Incident as described in Section 4.3 of the DPA. Post-incident reviews conducted and remediation tracked to closure.',
              },
              {
                category: 'Personnel',
                measure: 'Background checks conducted for all Emithran employees and contractors prior to access to production environments, in accordance with applicable law. All personnel subject to binding confidentiality agreements. Annual data protection and security awareness training mandatory for all staff. Developer secure coding training conducted as part of onboarding and refreshed annually. Data protection policies reviewed and communicated to all staff regularly.',
              },
              {
                category: 'Vendor Management',
                measure: 'All Sub-processors assessed for data protection and security compliance prior to onboarding. Contractual data processing agreements including equivalent data protection obligations imposed on all Sub-processors. Sub-processor security certifications reviewed and maintained. Sub-processor list maintained in Schedule C and updated in accordance with Section 4.4 of the DPA. Sub-processor access to Personal Data limited to what is necessary for their specific processing function.',
              },
            ].map((row, i, arr) => (
              <div
                key={row.category}
                className="grid grid-cols-[180px_1fr] px-4 py-4"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(15,27,45,0.06)' : 'none' }}
              >
                <span className="text-[13px] font-semibold pr-4" style={{ color: '#0f1b2d' }}>{row.category}</span>
                <span className="text-[13px] leading-[1.7]" style={{ color: 'rgba(15,27,45,0.68)' }}>{row.measure}</span>
              </div>
            ))}
          </div>
          <Divider />

          {/* ── Schedule C ── */}
          <H2 id="schedule-c">Schedule C — Approved Sub-processors</H2>
          <Para>
            This Schedule C lists the Sub-processors that Emithran is authorised to use in connection with the Services as of the date set out above. Emithran will update this Schedule in accordance with Section 4.4 of the DPA and provide notice to the Controller prior to any addition or replacement.
          </Para>

          <div className="mb-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(15,27,45,0.09)' }}>
            <div className="grid grid-cols-3 px-4 py-3 border-b" style={{ background: 'rgba(15,27,45,0.03)', borderColor: 'rgba(15,27,45,0.07)' }}>
              {['Name', 'Location', 'Purpose'].map(h => (
                <span key={h} className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.45)' }}>{h}</span>
              ))}
            </div>
            {[
              {
                name: 'Amazon Web Services, Inc. (AWS)',
                location: 'USA (primary); India (ap-south-1 region)',
                purpose: 'Cloud infrastructure and hosting: compute, storage, managed databases, networking, key management, and backup services underpinning the Emithran platform.',
              },
              {
                name: 'Stripe, Inc.',
                location: 'USA',
                purpose: 'Payment processing: handling and tokenising payment card and billing information for subscription fee collection and invoice management.',
              },
              {
                name: 'Resend, Inc.',
                location: 'USA',
                purpose: 'Transactional email delivery: sending automated platform notifications, password resets, account confirmations, and operational email communications to Users.',
              },
              {
                name: 'PostHog, Inc.',
                location: 'USA / EU (customer choice of region)',
                purpose: 'Product analytics: collecting and analysing usage events and User behaviour data to support product improvement, feature development, and operational monitoring.',
              },
              {
                name: 'Intercom, Inc.',
                location: 'USA',
                purpose: 'Customer support platform: facilitating live chat, in-app messaging, and support ticket management between Emithran support personnel and Users.',
              },
              {
                name: 'Google LLC (Google Analytics)',
                location: 'USA',
                purpose: 'Website analytics: collecting and analysing visitor and session data on the Emithran marketing website (emithran.in) to understand traffic patterns and campaign effectiveness.',
              },
            ].map((row, i, arr) => (
              <div
                key={row.name}
                className="grid grid-cols-3 px-4 py-4"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(15,27,45,0.06)' : 'none' }}
              >
                <span className="text-[13px] font-semibold pr-3" style={{ color: '#0f1b2d' }}>{row.name}</span>
                <span className="text-[13px] pr-3" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.location}</span>
                <span className="text-[13px] leading-[1.6]" style={{ color: 'rgba(15,27,45,0.68)' }}>{row.purpose}</span>
              </div>
            ))}
          </div>

          <Para>
            The Controller acknowledges that the Sub-processors listed in this Schedule C may update their own sub-processing arrangements from time to time. Emithran will ensure that any such changes do not reduce the level of data protection provided to the Controller under this DPA.
          </Para>
          <Divider />

          {/* Contact block */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(13,148,136,0.14)' }}
          >
            <div className="p-5 border-b" style={{ background: 'rgba(13,148,136,0.05)', borderColor: 'rgba(13,148,136,0.1)' }}>
              <p className="text-[13.5px] font-semibold" style={{ color: '#0f1b2d' }}>
                Questions about this Data Processing Agreement?
              </p>
            </div>
            <div className="p-5 flex flex-col gap-3" style={{ background: '#fff' }}>
              {[
                { label: 'DPA enquiries',   email: 'privacy@emithran.in'  },
                { label: 'Legal enquiries', email: 'legal@emithran.in'    },
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

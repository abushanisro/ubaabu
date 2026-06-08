export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  label: string
  items: FAQItem[]
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    items: [
      {
        id: 'gs-1',
        question: 'What is Emithran and who is it for?',
        answer:
          'Emithran is a manufacturing intelligence platform built for precision manufacturers, Tier-1 and Tier-2 suppliers, and OEM procurement teams — primarily in automotive, aerospace, defence, and space. It gives your team real-time should-cost data, supplier visibility, BOM validation, and shipment tracking in one place.',
      },
      {
        id: 'gs-2',
        question: 'How long does onboarding take?',
        answer:
          'Most teams are live within 5 business days. Onboarding includes a guided setup session, BOM data import, and supplier network mapping. For enterprise deployments with ERP integration, the typical timeline is 2–4 weeks.',
      },
      {
        id: 'gs-3',
        question: 'Do I need to install any software?',
        answer:
          'No. Emithran is fully web-based and runs in your browser. There is no desktop installation required. We offer optional integrations with SAP, Oracle, and other ERP systems via API or pre-built connectors.',
      },
      {
        id: 'gs-4',
        question: 'Can I trial the platform before committing?',
        answer:
          'Yes. We offer a 14-day guided proof of concept where your team works with real data — typically a live BOM or a supplier network you want to analyse. Contact our team to start your trial.',
      },
    ],
  },
  {
    id: 'should-cost',
    label: 'Should-Cost Analysis',
    items: [
      {
        id: 'sc-1',
        question: 'What is a should-cost model and how does Emithran build one?',
        answer:
          'A should-cost model is a bottom-up cost estimate of what a part or assembly should cost to manufacture — based on materials, labour, overheads, and profit margin — rather than what a supplier quotes. Emithran\'s Should-Cost Engine pulls live commodity prices, regional labour rates, machine cycle time estimates, and overhead benchmarks to generate a should-cost figure automatically from a part description or CAD file.',
      },
      {
        id: 'sc-2',
        question: 'How accurate are the should-cost estimates?',
        answer:
          'Typical accuracy is within ±8% of actual manufacturing cost for standard machined, stamped, and cast components. Accuracy improves when you upload a CAD file or detailed drawing. Complex assemblies with multi-step processes may have wider variance, and we flag these cases explicitly.',
      },
      {
        id: 'sc-3',
        question: 'Which manufacturing processes are supported?',
        answer:
          'Emithran currently supports CNC machining, stamping, casting (sand, die, investment), injection moulding, sheet metal fabrication, roll forming, welded assemblies, and PCB assembly. We are actively adding forging, extrusion, and additive manufacturing.',
      },
      {
        id: 'sc-4',
        question: 'Can I compare costs across multiple geographies?',
        answer:
          'Yes. You can run a multi-geography cost comparison across India, Germany, UK, USA, China, Mexico, and Turkey in a single report. The output includes landed cost (DDP) with logistics and duty factored in — not just ex-works price.',
      },
      {
        id: 'sc-5',
        question: 'How do I use should-cost data in supplier negotiations?',
        answer:
          'The platform generates a negotiation brief that shows your should-cost estimate alongside the supplier\'s quote, the gap, and a suggested target price. Many customers share this directly with suppliers as a basis for structured negotiations — win rates on RFQs typically improve by 20–30% in the first quarter of use.',
      },
    ],
  },
  {
    id: 'supplier-intelligence',
    label: 'Supplier Intelligence',
    items: [
      {
        id: 'si-1',
        question: 'What data does Supplier Radar provide on each supplier?',
        answer:
          'Each supplier profile includes financial health indicators, certification status (ISO 9001, IATF 16949, AS9100, NADCAP), delivery performance history, capacity utilisation, quality scores, and risk flags. For Indian suppliers, we also include Udyam registration data and MSME classification.',
      },
      {
        id: 'si-2',
        question: 'How many suppliers are in the Emithran network?',
        answer:
          'Our network currently covers over 2,400 verified precision manufacturers across India, Germany, UK, USA, Japan, and Singapore. The database is updated quarterly with new supplier additions and annual re-verification of certifications.',
      },
      {
        id: 'si-3',
        question: 'Can I add my own supplier data to the platform?',
        answer:
          'Yes. You can import your existing approved vendor list (AVL) and enrich it with Emithran\'s intelligence data. Your proprietary supplier records remain private to your organisation and are never shared with other customers.',
      },
      {
        id: 'si-4',
        question: 'How does Emithran handle supply chain risk alerts?',
        answer:
          'Supplier Radar monitors for financial distress signals, certification lapses, geopolitical exposure, and delivery performance degradation. When a risk threshold is crossed, you receive an in-platform alert and an optional email notification. You can configure alert sensitivity per supplier tier.',
      },
    ],
  },
  {
    id: 'bom-quality',
    label: 'BOM & Quality',
    items: [
      {
        id: 'bq-1',
        question: 'What file formats does BOM import support?',
        answer:
          'We support Excel (.xlsx, .xls), CSV, and direct ERP export formats from SAP (IDOC/CSV), Oracle, and Infor. We also accept STEP and IGES files for CAD-driven BOM extraction. If your format is not listed, contact support — we have handled most proprietary ERP formats.',
      },
      {
        id: 'bq-2',
        question: 'How does BOM validation work?',
        answer:
          'Our automated validation checks each line item against our parts database for: correct part number format, specification consistency, unit of measure errors, duplicate entries, and supplier-part mismatches. Errors are flagged with severity levels and suggested corrections. Typical validation for a 500-part BOM completes in under 2 minutes.',
      },
      {
        id: 'bq-3',
        question: 'Does Emithran support PPAP documentation?',
        answer:
          'Yes. The Quality module includes a PPAP tracker that manages all 18 elements of a Production Part Approval Process submission. You can assign actions, attach documents, track approval status, and generate a compliant submission pack for customer review.',
      },
      {
        id: 'bq-4',
        question: 'Can multiple teams collaborate on the same BOM?',
        answer:
          'Yes. BOMs support multi-user collaboration with role-based permissions (viewer, editor, approver). All changes are tracked with an audit log showing who made what change and when. You can leave comments on individual line items and assign review tasks to team members.',
      },
    ],
  },
  {
    id: 'shipping-otif',
    label: 'Shipping & OTIF',
    items: [
      {
        id: 'so-1',
        question: 'What is the Shipment Hub and what does it track?',
        answer:
          'Shipment Hub is Emithran\'s logistics intelligence module. It tracks purchase order fulfilment, despatch confirmations, in-transit status, customs clearance, and delivery confirmation. It integrates with major freight forwarders and 3PLs via API, and supports manual update for smaller shipments.',
      },
      {
        id: 'so-2',
        question: 'How is OTIF calculated on the platform?',
        answer:
          'OTIF (On-Time In-Full) is calculated per shipment line: on-time is measured against the confirmed delivery date, and in-full against the ordered quantity. Dashboard metrics aggregate across all open programs, supplier, and time period — you can slice OTIF by supplier, customer, part family, or quarter.',
      },
      {
        id: 'so-3',
        question: 'Does the platform send automated delivery alerts?',
        answer:
          'Yes. You can configure milestone alerts for: order confirmation, despatch, customs clearance, expected delivery, and late delivery. Alerts are delivered via in-platform notification, email, or webhook to your own systems.',
      },
    ],
  },
  {
    id: 'pricing-security',
    label: 'Pricing & Security',
    items: [
      {
        id: 'ps-1',
        question: 'How is Emithran priced?',
        answer:
          'Emithran is priced on a per-seat subscription model with module add-ons. Starter plans cover should-cost analysis and BOM validation. Professional plans add Supplier Radar and Shipment Hub. Enterprise plans include ERP integration, dedicated support, and custom data feeds. Contact us for a quote tailored to your team size and module needs.',
      },
      {
        id: 'ps-2',
        question: 'Is there a minimum contract length?',
        answer:
          'Annual subscriptions are our standard offering and come with a 15% discount versus monthly billing. Monthly plans are available for teams that need flexibility. Enterprise contracts are typically 2-year agreements with SLA guarantees.',
      },
      {
        id: 'ps-3',
        question: 'Where is my data stored and who can access it?',
        answer:
          'All customer data is stored in ISO 27001-certified data centres in India (primary) with EU failover. Data is encrypted at rest (AES-256) and in transit (TLS 1.3). Your data is never shared with other customers or used to train shared models. Emithran staff can only access your data with your explicit written consent for support purposes.',
      },
      {
        id: 'ps-4',
        question: 'Is Emithran compliant with ITAR and defence data requirements?',
        answer:
          'We support defence customers with enhanced data isolation, access logging, and configurable data residency. For ITAR-controlled technical data, we recommend discussing your specific requirements with our enterprise team before onboarding — we have existing deployments with defence-sector customers and can advise on the right configuration.',
      },
    ],
  },
]

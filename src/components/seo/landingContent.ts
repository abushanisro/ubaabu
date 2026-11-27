import type { LandingPageExpansion } from './contentTypes'
import { sourcingIndiaExpansion, ukShouldCostExpansion, usEstimatingExpansion } from './marketLandingData'

/**
 * Long-form expansions for thin English SEO landing pages.
 * Keyed by page slug (see seoRoadmapData.ts). Proof items point only at
 * published case studies; all links appear in the site's valid URL list.
 */
export const LANDING_EXPANSIONS: Record<string, LandingPageExpansion> = {
  'should-cost-modelling-uk': ukShouldCostExpansion,
  'manufacturing-cost-estimating-software': usEstimatingExpansion,
  'sourcing-from-india': sourcingIndiaExpansion,
  'procurement-intelligence': {
    summary:
      'Procurement intelligence connects BOM lines, supplier records and should-cost estimates so buyers can see where money and risk sit before they negotiate. Emithran links BOM Intelligence, Should-Cost Analysis and Supplier Radar, with 72,000+ supplier records, so every sourcing decision carries part-level cost and supplier evidence.',
    walkthrough: {
      heading: 'How a procurement intelligence workflow runs in Emithran',
      intro:
        'The workflow starts with the BOM and ends with a ranked list of actions. Each step reuses the data from the step before, so nothing is re-keyed between engineering, cost and sourcing.',
      steps: [
        {
          title: 'Import the BOM and spend data',
          body: 'Upload an Excel or CSV BOM export alongside existing quote and purchase history. BOM Intelligence normalises part numbers, materials and quantities and flags duplicates or missing attributes before any analysis starts.',
        },
        {
          title: 'Attach a should-cost estimate to each line',
          body: 'Should-Cost Analysis builds a bottom-up estimate from material, process, cycle time and overhead assumptions. Each line now shows what it should cost next to what you currently pay.',
        },
        {
          title: 'Map suppliers and exposure',
          body: 'Supplier Radar matches each line to current and alternative suppliers, and shows single-source parts, geographic concentration and certification status against the line it affects.',
        },
        {
          title: 'Rank opportunities by value and risk',
          body: 'Gaps between price paid and should-cost are combined with spend and risk signals to rank where to act first: renegotiate, resource, redesign or leave alone.',
        },
        {
          title: 'Take the evidence into the negotiation',
          body: 'Cost breakdowns and supplier alternatives are exported for the commercial conversation, and outcomes are recorded so the next sourcing event starts from a known baseline.',
        },
      ],
    },
    useCases: {
      heading: 'Where procurement intelligence is used',
      items: [
        {
          industry: 'Aerospace',
          body: 'Low-volume, high-mix parts in titanium, Inconel and aluminium where quotes vary widely. Line-level should-cost helps buyers separate genuine material and machining cost from margin, while AS9100 and NADCAP status stays visible against each supplier.',
        },
        {
          industry: 'Defence',
          body: 'Sole-source and low-competition parts where there is no second quote to compare against. A process-based estimate gives the buyer an independent reference point and a documented basis for cost-realism discussions.',
        },
        {
          industry: 'Space',
          body: 'Small-batch satellite and launch hardware where a single late supplier can move a launch date. Supplier exposure and capacity signals sit next to cost so schedule risk is weighed alongside price.',
        },
        {
          industry: 'Automotive and precision engineering',
          body: 'Higher-volume programmes where a few cents per part matter across annual volumes. Benchmarks across processes and regions show whether a price increase or a resourcing proposal is justified.',
        },
      ],
    },
    proof: {
      heading: 'Results from published case studies',
      items: [
        {
          title: '38% landed-cost saving on HGV chassis rails',
          body: 'Benchmarking roll-formed rails made in India against Belgium production, including full DDP logistics, showed a 38% total landed-cost advantage. A clear example of sourcing evidence feeding a regional decision.',
          href: '/case-studies/chassis-india-belgium',
        },
        {
          title: 'LCV rear axle should-cost at $244 per unit',
          body: 'A full-assembly should-cost for a 2-tonne LCV rear drive axle at 40,000 units a year identified the drive head and carrier assembly as 46% of cost, showing buyers where negotiation effort should go.',
          href: '/case-studies/rear-axle-should-cost',
        },
        {
          title: 'PCB cost from $19.89 to $8.07',
          body: 'An electronics teardown across a radar sensor and an EV battery thermal management system found a lower-cost PCB technology, giving procurement a specific, evidence-backed alternative to put to suppliers.',
          href: '/case-studies/electronics-teardown',
        },
      ],
    },
    comparison: {
      heading: 'Procurement intelligence options compared',
      intro:
        'Most teams already have spreadsheets and an ERP purchasing module. The question is which tasks each one handles well, and where part-level cost and supplier evidence is missing.',
      columns: ['Capability', 'Spreadsheets', 'ERP purchasing module', 'Point spend-analysis tool', 'Emithran'],
      rows: [
        ['Purchase orders and approvals', 'No', 'Yes, core function', 'No', 'Works alongside ERP'],
        ['Spend by supplier and category', 'Manual', 'Yes, from transactions', 'Yes', 'Yes, linked to BOM lines'],
        ['Should-cost per BOM line', 'Possible, manual build per part', 'No', 'Rarely', 'Yes, process-based'],
        ['Supplier alternatives and capability', 'Depends on buyer knowledge', 'Approved vendors only', 'Limited', '72,000+ supplier records'],
        ['Single-source and concentration flags', 'Manual', 'Partial', 'Partial', 'Yes, per line'],
        ['Opportunity ranking by value and risk', 'Manual', 'No', 'Spend-based only', 'Cost gap, spend and risk combined'],
      ],
    },
    faqs: [
      {
        question: 'Does procurement intelligence replace our ERP?',
        answer: 'No. The ERP remains the system of record for orders, receipts and payments. Emithran works alongside it, importing BOM and spend exports and adding cost and supplier evidence that the ERP does not hold.',
      },
      {
        question: 'How accurate are the should-cost estimates?',
        answer: 'Accuracy depends on the quality of drawings and BOM data. Estimates are built from transparent material, process and overhead assumptions, so a cost engineer can review and adjust every driver rather than trust a single number.',
      },
      {
        question: 'Which teams use procurement intelligence day to day?',
        answer: 'Category buyers and sourcing managers use it most, with cost engineers maintaining the models and programme managers reviewing supplier risk against milestones.',
      },
      {
        question: 'How long does a pilot take?',
        answer: 'A focused pilot on one commodity or programme typically takes around five days to set up, using a current BOM export, supplier list and recent quote history.',
      },
    ],
    related: [
      { href: '/should-cost-analysis-software', label: 'Should-cost analysis software', context: 'See how line-level cost estimates are built and reviewed.' },
      { href: '/supplier-intelligence', label: 'Supplier intelligence', context: 'Explore how supplier capability, certification and risk are tracked.' },
      { href: '/spend-analysis-software', label: 'Spend analysis software', context: 'Understand how spend data is classified before opportunities are ranked.' },
      { href: '/blog/should-cost-analysis-supplier-negotiation', label: 'Should-cost in supplier negotiation', context: 'Read how cost evidence changes the tone of a negotiation.' },
      { href: '/blog/supplier-price-increase-negotiation', label: 'Challenging a supplier price increase', context: 'A practical method for responding to price increase requests with data.' },
    ],
  },

  'defense-manufacturing-software': {
    summary:
      'Defence manufacturing software helps primes and subcontractors produce defensible cost estimates and keep sensitive supply chains visible across long programmes. Emithran combines BOM validation, process-based should-cost and supplier intelligence, so sole-source parts get an independent estimate and sourcing restrictions are tracked against each line.',
    walkthrough: {
      heading: 'How a defence sourcing and costing workflow runs in Emithran',
      intro:
        'Defence programmes need the same discipline as any sourcing event, plus a stronger audit trail. The workflow below keeps each assumption recorded from the first BOM import to the final cost submission.',
      steps: [
        {
          title: 'Validate the BOM',
          body: 'Import the programme BOM from Excel or CSV. BOM Intelligence checks part numbers, materials, revisions and quantities, and highlights lines with missing or conflicting data before they reach a cost model.',
        },
        {
          title: 'Tag sourcing restrictions',
          body: 'Lines and suppliers carry attributes such as export-control relevance and domestic or allied-source requirements, so restricted items are visible throughout the workflow. Access can be scoped by role.',
        },
        {
          title: 'Build should-cost for sole-source items',
          body: 'For parts with a single capable supplier, Should-Cost Analysis builds an estimate from material, process routing, cycle time, labour and overhead rates. The estimate stands on its own rather than on a competing quote.',
        },
        {
          title: 'Check supplier depth and risk',
          body: 'Supplier Radar shows which qualified suppliers could make each part, where capacity is thin and where a programme depends on one site, so second-source planning starts early.',
        },
        {
          title: 'Document for review',
          body: 'Cost breakdowns, assumptions and supplier evidence are exported in a structured form suited to internal reviews and customer cost-realism discussions. Changes are recorded across the programme timeline.',
        },
      ],
    },
    useCases: {
      heading: 'Defence and adjacent use cases',
      items: [
        {
          industry: 'Land systems and vehicles',
          body: 'Fabricated hulls, chassis structures and drivetrain components where regional manufacturing cost and logistics decide the sourcing route. Benchmarks across regions show whether an offset or indigenisation plan is cost-realistic.',
        },
        {
          industry: 'Defence electronics',
          body: 'Radar, communication and power electronics where PCB technology and component choices drive cost. Teardown-style should-cost separates board, assembly and enclosure cost so each can be challenged.',
        },
        {
          industry: 'Aerospace and missile structures',
          body: 'Machined titanium and Inconel parts with high buy-to-fly ratios and long lead times. Process-based estimates expose how much of the price is material, machine time and special processes.',
        },
        {
          industry: 'Indigenisation programmes in India',
          body: 'Make in India and DAP 2020 encourage domestic sourcing. Supplier intelligence helps identify Indian suppliers with the right processes and certifications, and should-cost shows whether a domestic route is competitive.',
        },
      ],
    },
    proof: {
      heading: 'Method proven in published case studies',
      items: [
        {
          title: 'Electronics teardown: PCB cost from $19.89 to $8.07',
          body: 'Component-level teardown and PCBA should-costing across a radar sensor and an EV thermal management system identified a lower-cost PCB technology. The same method applies to defence electronics assemblies.',
          href: '/case-studies/electronics-teardown',
        },
        {
          title: 'DC-DC converter: 22% unit cost reduction through VAVE',
          body: 'A full teardown, component-level should-cost and 13 VAVE ideas cut unit cost by 22%, including a 39% body cost reduction and 28% on the PCBA. A model for challenging cost on power electronics.',
          href: '/case-studies/dc-dc-converter',
        },
        {
          title: 'HGV chassis: 38% rail cost reduction by region',
          body: 'A 74-line BOM comparison of Northern Europe and India production showed a 38% lower manufacturing cost for rails made in India, the kind of evidence an indigenisation or offset case needs.',
          href: '/case-studies/hgv-chassis',
        },
      ],
    },
    comparison: {
      heading: 'How defence teams typically estimate cost, compared',
      intro:
        'Defence cost estimates are often assembled from spreadsheets and supplier quotes. The table compares common approaches on the tasks that matter most for sole-source and restricted supply chains.',
      columns: ['Capability', 'Spreadsheets', 'Generic ERP costing module', 'Standalone estimating tool', 'Emithran'],
      rows: [
        ['Should-cost without a competing quote', 'Possible, analyst-dependent', 'No, uses standard costs', 'Yes', 'Yes, process-based'],
        ['Export-control and source-restriction tags', 'Manual columns', 'Partial', 'Rarely', 'Yes, on lines and suppliers'],
        ['Supplier depth and second-source search', 'Buyer knowledge', 'Approved vendors only', 'No', '72,000+ supplier records'],
        ['Assumption trail for cost reviews', 'Fragile across versions', 'Limited', 'Yes', 'Yes, recorded per estimate'],
        ['Link from BOM line to cost and supplier', 'Manual', 'Partial', 'Part-level only', 'Yes, connected modules'],
      ],
    },
    faqs: [
      {
        question: 'Can Emithran support cost submissions under US or UK defence rules?',
        answer: 'Emithran produces structured should-cost evidence and assumptions. How that evidence is used in a submission, for example alongside FAR 15.407-4 should-cost reviews in the US, remains the responsibility of your contracts and compliance teams.',
      },
      {
        question: 'Is programme data separated from other business units?',
        answer: 'Yes. Data can be segmented by programme or business unit, and access is scoped by role so restricted programmes are visible only to authorised users.',
      },
      {
        question: 'Does the platform help with indigenisation targets?',
        answer: 'It helps identify domestic suppliers with relevant processes and compares domestic and imported cost routes. It does not certify indigenous content; that remains a contractual calculation.',
      },
    ],
    related: [
      { href: '/defence-manufacturing', label: 'Defence manufacturing', context: 'An overview of how Emithran supports defence programmes end to end.' },
      { href: '/blog/defense-should-cost-analysis', label: 'Should-cost analysis for defence contracts', context: 'How should-cost is used in the US, UK and India.' },
      { href: '/blog/single-source-vs-sole-source', label: 'Single-source vs sole-source', context: 'Why the distinction changes how you negotiate and plan second sources.' },
      { href: '/blog/ice-vs-should-cost', label: 'Independent cost estimates vs should-cost', context: 'Where an ICE and a should-cost model differ in purpose and detail.' },
      { href: '/blog/best-supplier-intelligence-tools-defence-oems', label: 'Supplier intelligence tools for defence OEMs', context: 'What to look for when evaluating supplier intelligence for defence.' },
    ],
  },

  'manufacturing-benchmarking': {
    summary:
      'Manufacturing benchmarking compares the cost of a part across processes, regions and suppliers to show what a competitive price looks like. Emithran builds benchmarks from material, cycle time, labour, energy and logistics assumptions across 500+ manufacturing processes, so a quote can be judged against a transparent range rather than a gut feel.',
    walkthrough: {
      heading: 'How a benchmarking study runs in Emithran',
      intro:
        'A benchmark is only as good as the baseline behind it. The workflow below starts with a single, reviewed should-cost model and then varies one factor at a time.',
      steps: [
        {
          title: 'Define the part and volume',
          body: 'Load the drawing data or BOM line, annual volume and lifetime quantity. Volume matters because tooling amortisation and process choice change as quantities rise.',
        },
        {
          title: 'Build the baseline should-cost',
          body: 'Should-Cost Analysis creates a bottom-up estimate for the current process route, with material, cycle time, machine rate, labour, overhead and margin shown separately.',
        },
        {
          title: 'Vary the process route',
          body: 'The same part is costed under alternative processes, for example forging against machining from bar, or casting against fabrication, drawing on the process library.',
        },
        {
          title: 'Vary the region and logistics',
          body: 'Labour, energy and overhead rates are swapped for other regions, and freight, duty and packaging are added to compare landed cost rather than ex-works price.',
        },
        {
          title: 'Place quotes on the range',
          body: 'Supplier quotes are plotted against the modelled range. Quotes far above it become negotiation targets; quotes far below it are checked for missing scope or capacity risk.',
        },
      ],
    },
    useCases: {
      heading: 'Benchmarking use cases by industry',
      items: [
        {
          industry: 'Automotive and commercial vehicles',
          body: 'Region-to-region benchmarks for structures and assemblies, where labour and logistics swing landed cost. Typical questions: build in Europe, India or both, and at what volume does tooling pay back.',
        },
        {
          industry: 'Aerospace',
          body: 'Process benchmarks for titanium and nickel-alloy parts, where buy-to-fly ratio and machine time dominate. Forging, additive and machining from plate can be compared on the same basis.',
        },
        {
          industry: 'Defence and space',
          body: 'Low-volume parts with few suppliers, where a benchmark range is often the only independent reference for a sole-source quote.',
        },
        {
          industry: 'Electronics',
          body: 'PCB technology, layer count and assembly benchmarks, where an alternative board specification can change cost substantially without changing function.',
        },
      ],
    },
    proof: {
      heading: 'Benchmarking results from published case studies',
      items: [
        {
          title: 'Six HGV cab structure approaches benchmarked',
          body: 'Six cab structure solutions for a hydrogen HGV manufacturer were compared on tooling investment, piece cost, mass and safety status, from prototype volumes to 4,000 units a year.',
          href: '/case-studies/hgv-cab-strategy',
        },
        {
          title: '38% landed-cost saving: India vs Belgium',
          body: 'Roll-formed chassis rails made in India were benchmarked against Belgian production with full DDP logistics to Scotland, showing a 38% total landed-cost advantage.',
          href: '/case-studies/chassis-india-belgium',
        },
        {
          title: '£1.3m a year: titanium vs stainless exhaust',
          body: 'A material and process benchmark for a high-performance exhaust assembly at 300 units a year in the UK identified a £1.3m annual saving.',
          href: '/case-studies/exhaust-system',
        },
      ],
    },
    comparison: {
      heading: 'Benchmarking approaches compared',
      intro:
        'Teams usually benchmark by collecting more quotes or by building one-off spreadsheets. Both have a place; the table shows where each runs out.',
      columns: ['Capability', 'Multiple quotes', 'Spreadsheet model', 'Published cost index', 'Emithran'],
      rows: [
        ['Explains why a price differs', 'No', 'Yes, if well built', 'No', 'Yes, driver by driver'],
        ['Compare process routes for one part', 'Only if suppliers quote both', 'Manual per route', 'No', 'Yes, from a process library'],
        ['Compare regions on landed cost', 'Only with regional suppliers', 'Manual rate tables', 'Broad averages', 'Yes, rates and logistics'],
        ['Works without supplier participation', 'No', 'Yes', 'Yes', 'Yes'],
        ['Reusable across many parts', 'No', 'Hard to maintain', 'Yes, but generic', 'Yes, shared assumptions'],
      ],
    },
    faqs: [
      {
        question: 'How many quotes do I need before benchmarking?',
        answer: 'None. A modelled benchmark does not depend on supplier quotes. Quotes are useful to place on the range once it exists, but the range itself comes from process and rate assumptions.',
      },
      {
        question: 'Can I benchmark total landed cost rather than piece price?',
        answer: 'Yes. Freight, duty, packaging and inventory carrying cost can be added to compare suppliers in different regions on a delivered basis.',
      },
      {
        question: 'What makes a benchmark defensible in a negotiation?',
        answer: 'Visible assumptions. When the supplier can see material weight, cycle time and rates, the conversation moves to which assumption is wrong rather than whether the number is fair.',
      },
    ],
    related: [
      { href: '/should-cost-analysis-software', label: 'Should-cost analysis software', context: 'The baseline model that every benchmark starts from.' },
      { href: '/manufacturing-process-library', label: 'Manufacturing process library', context: 'The process routes available when comparing alternatives.' },
      { href: '/total-cost-ownership', label: 'Total cost of ownership', context: 'How to extend a benchmark from piece price to lifetime cost.' },
      { href: '/blog/forging-vs-machining-cost', label: 'Forging vs machining cost', context: 'A worked process benchmark for aerospace brackets.' },
      { href: '/blog/manufacturing-cost-drivers', label: 'Manufacturing cost drivers', context: 'The variables that move a benchmark up or down.' },
    ],
  },

  'aerospace-manufacturing-software': {
    summary:
      'Aerospace manufacturing software for cost and sourcing teams links BOMs, should-cost models and qualified suppliers in one workflow. Emithran models low-volume, high-mix aerospace parts from material and process data, and tracks AS9100 and NADCAP status on each supplier, so cost and qualification are reviewed together.',
    walkthrough: {
      heading: 'How an aerospace cost and sourcing workflow runs in Emithran',
      intro:
        'Aerospace parts are expensive to make and slow to requalify, so the cost model and the supplier decision need to be made together. The steps below follow one part family from BOM to award.',
      steps: [
        {
          title: 'Load the BOM and part data',
          body: 'Import the BOM from Excel or CSV with material specifications, revisions and quantities. BOM Intelligence flags missing material grades or conflicting revisions that would distort cost.',
        },
        {
          title: 'Model material and buy-to-fly',
          body: 'Should-Cost Analysis calculates raw material from stock form and finished mass, so the buy-to-fly ratio on titanium and nickel alloys is visible and priced correctly.',
        },
        {
          title: 'Model process and special processes',
          body: 'Machining time, heat treatment, surface treatment and NDT are added as separate cost lines, reflecting low-volume set-up and inspection effort rather than high-volume amortisation.',
        },
        {
          title: 'Match qualified suppliers',
          body: 'Supplier Radar lists suppliers with the required processes and shows AS9100 and NADCAP status against the special processes each part needs.',
        },
        {
          title: 'Explore VAVE and alternatives',
          body: 'VAVE Studio records design and process alternatives, such as near-net-shape forging instead of machining from plate, with their cost effect and qualification implications.',
        },
      ],
    },
    useCases: {
      heading: 'Aerospace and adjacent use cases',
      items: [
        {
          industry: 'Commercial aerostructures',
          body: 'Machined brackets, fittings and frames where buy-to-fly and machine hours drive price. Should-cost shows how much of a quote is material, machining and special processes.',
        },
        {
          industry: 'Aero engines and hot sections',
          body: 'Inconel and titanium parts with long cycle times and costly tooling wear. Process-based estimates make cutting time and scrap risk explicit.',
        },
        {
          industry: 'Avionics and power electronics',
          body: 'Converters, harnesses and sensor assemblies where component and PCB choices drive cost. Teardown-style analysis separates board, assembly and enclosure.',
        },
        {
          industry: 'Space and satellite hardware',
          body: 'Very low volumes where traditional volume-based costing breaks down. Models carry set-up, inspection and documentation effort per batch rather than spreading it across large runs.',
        },
      ],
    },
    proof: {
      heading: 'Results from published case studies',
      items: [
        {
          title: 'DC-DC converter: 22% lower unit cost through VAVE',
          body: 'A full teardown, component-level should-cost and 13 VAVE ideas reduced unit cost by 22%, with a 39% body cost reduction and 28% on the PCBA.',
          href: '/case-studies/dc-dc-converter',
        },
        {
          title: 'Electronics teardown: PCB from $19.89 to $8.07',
          body: 'Bare PCB benchmarking and PCBA should-costing on a radar sensor identified a lower-cost PCB technology, relevant to avionics and sensor assemblies.',
          href: '/case-studies/electronics-teardown',
        },
        {
          title: 'Titanium vs stainless: £1.3m a year',
          body: 'A material comparison for a low-volume, high-performance exhaust assembly showed a £1.3m annual saving, illustrating how material choice dominates low-volume part cost.',
          href: '/case-studies/exhaust-system',
        },
      ],
    },
    comparison: {
      heading: 'Aerospace cost and sourcing tools compared',
      intro:
        'Aerospace teams commonly combine spreadsheets, an ERP or PLM system, and a separate supplier quality tracker. The table shows which tasks each covers.',
      columns: ['Capability', 'Spreadsheets', 'ERP or PLM module', 'Supplier quality tracker', 'Emithran'],
      rows: [
        ['Buy-to-fly and material cost from stock form', 'Manual', 'Standard cost only', 'No', 'Yes'],
        ['Special processes as separate cost lines', 'Manual', 'Rarely', 'No', 'Yes'],
        ['AS9100 and NADCAP status per supplier', 'Manual list', 'Partial', 'Yes', 'Yes, linked to parts'],
        ['Find alternative qualified suppliers', 'No', 'Approved vendors only', 'Existing suppliers only', '72,000+ supplier records'],
        ['VAVE ideas with cost effect', 'Manual', 'No', 'No', 'Yes, VAVE Studio'],
        ['Integration with existing systems', 'Not applicable', 'System of record', 'Standalone', 'Excel/CSV import, API available'],
      ],
    },
    faqs: [
      {
        question: 'Does Emithran replace our PLM or ERP?',
        answer: 'No. PLM remains the engineering record and ERP the transactional record. Emithran works alongside both, importing BOMs and adding cost and supplier intelligence.',
      },
      {
        question: 'Can it model additive manufacturing for aerospace parts?',
        answer: 'Additive routes can be compared against machining and forging where they are in the process library, so the cost effect of a change in route is visible before qualification work starts.',
      },
      {
        question: 'Is Emithran itself AS9100 certified?',
        answer: 'Emithran is software and does not manufacture parts. It tracks the AS9100 and NADCAP status of your suppliers; certification of your own operations stays with your quality system.',
      },
    ],
    related: [
      { href: '/aerospace-cost-engineering', label: 'Aerospace cost engineering', context: 'How Emithran supports aerospace cost engineering teams.' },
      { href: '/blog/aerospace-should-cost-analysis', label: 'Should-cost analysis for aerospace parts', context: 'A complete guide to aerospace should-cost.' },
      { href: '/blog/buy-to-fly-ratio', label: 'Buy-to-fly ratio', context: 'Why material utilisation dominates aerospace part cost.' },
      { href: '/blog/nadcap-accreditation-explained', label: 'NADCAP accreditation explained', context: 'What buyers need to know about special-process accreditation.' },
      { href: '/blog/titanium-inconel-machining-cost', label: 'Titanium and Inconel machining cost', context: 'The machining cost drivers behind aerospace alloy parts.' },
    ],
  },

  'srm-software': {
    summary:
      'SRM software for manufacturers keeps each supplier’s qualification, performance, risk and cost history in one record. Emithran links supplier records to the parts they make and the should-cost of those parts, so performance reviews and award decisions draw on quality, delivery and commercial evidence together.',
    walkthrough: {
      heading: 'How supplier relationship management runs in Emithran',
      intro:
        'An SRM workflow starts with a clean supplier record and ends with a decision: develop, keep, dual-source or exit. Each step adds evidence to the same record.',
      steps: [
        {
          title: 'Create or import the supplier record',
          body: 'Import your supplier list from Excel or CSV. Records are matched against Supplier Radar’s 72,000+ supplier profiles where possible, adding processes, locations and certifications.',
        },
        {
          title: 'Link suppliers to parts',
          body: 'BOM Intelligence links each supplier to the BOM lines it supplies, so exposure is visible: which programmes depend on this supplier and which parts have no alternative.',
        },
        {
          title: 'Record qualification and quality status',
          body: 'Certifications such as AS9100, IATF 16949 and NADCAP, PPAP and APQP status, audit findings and corrective actions are held on the record. Quality Guard links quality escapes to the parts affected.',
        },
        {
          title: 'Score performance',
          body: 'Quality, delivery, cost and responsiveness are combined into a consistent scorecard, with commercial performance compared against the should-cost of the parts supplied.',
        },
        {
          title: 'Decide and follow through',
          body: 'Review outcomes, development plans and resourcing decisions are recorded on the supplier, and carried into the next RFQ shortlist.',
        },
      ],
    },
    useCases: {
      heading: 'SRM use cases by industry',
      items: [
        {
          industry: 'Automotive',
          body: 'PPAP and APQP tracking for new part launches across many tier suppliers, with IATF 16949 status and delivery performance visible at the point of award.',
        },
        {
          industry: 'Aerospace',
          body: 'AS9100 and NADCAP status for special-process suppliers, where an expired accreditation can stop shipments. Expiry dates and audit findings are flagged ahead of time.',
        },
        {
          industry: 'Defence',
          body: 'Small, specialised supplier bases where single-source dependence is common. SRM records show programme exposure and support second-source planning.',
        },
        {
          industry: 'Space and precision engineering',
          body: 'Young supply chains with fast-growing suppliers, where capacity and quality maturity need watching as volumes rise.',
        },
      ],
    },
    proof: {
      heading: 'Supplier decisions backed by published case studies',
      items: [
        {
          title: '38% landed-cost saving on HGV chassis rails',
          body: 'Comparing Indian and Belgian supply routes with full DDP logistics showed a 38% total landed-cost advantage, the kind of evidence that supports a resourcing decision.',
          href: '/case-studies/chassis-india-belgium',
        },
        {
          title: 'Rear view mirror BOM at $0.96 per unit',
          body: 'A should-cost across five processes for a five-part mirror assembly at 150,000 units a year in India gave a part-by-part reference for supplier performance reviews.',
          href: '/case-studies/rear-view-mirror',
        },
      ],
    },
    comparison: {
      heading: 'SRM options compared',
      intro:
        'Supplier management is often split across procurement spreadsheets, an ERP vendor master and a quality system. The table compares coverage of everyday SRM tasks.',
      columns: ['Capability', 'Spreadsheets', 'ERP vendor master', 'Supplier portal', 'Emithran'],
      rows: [
        ['Single supplier record across teams', 'One per team', 'Commercial data only', 'Supplier-entered data', 'Yes'],
        ['Certification and expiry tracking', 'Manual', 'Limited', 'Document upload', 'Yes, with alerts'],
        ['Link supplier to BOM lines and programmes', 'Manual', 'Partial', 'No', 'Yes'],
        ['Scorecard with quality, delivery and cost', 'Manual', 'Delivery only', 'Rarely', 'Yes'],
        ['Price compared with should-cost', 'No', 'No', 'No', 'Yes'],
        ['Find alternative suppliers', 'No', 'No', 'No', '72,000+ supplier records'],
      ],
    },
    faqs: [
      {
        question: 'Do suppliers need to log in to Emithran?',
        answer: 'No. SRM in Emithran is built for your team’s side of the relationship. Supplier documents and data can be recorded by your team without requiring supplier accounts.',
      },
      {
        question: 'Can we use our existing scorecard criteria?',
        answer: 'Yes. Weightings for quality, delivery, cost and responsiveness can be set to match your existing supplier scorecard so historical reviews stay comparable.',
      },
      {
        question: 'How does SRM connect to should-cost?',
        answer: 'Each part a supplier makes can carry a should-cost estimate, so commercial performance is judged against what the part should cost, not only against last year’s price.',
      },
    ],
    related: [
      { href: '/supplier-intelligence', label: 'Supplier intelligence', context: 'How supplier capability and risk data feed the SRM record.' },
      { href: '/strategic-sourcing-software', label: 'Strategic sourcing software', context: 'Where SRM data informs category plans and sourcing events.' },
      { href: '/blog/supplier-scorecard-template', label: 'Supplier scorecard template', context: 'QCD metrics and how to use them in reviews.' },
      { href: '/blog/aerospace-supplier-qualification-checklist', label: 'AS9100 supplier qualification checklist', context: 'A checklist for qualifying aerospace suppliers.' },
      { href: '/rfq-intelligence', label: 'RFQ intelligence', context: 'How supplier history shapes RFQ shortlists.' },
    ],
  },

  'resource-centre': {
    summary:
      'The Emithran resource centre holds free templates, calculators, checklists and reports for cost engineers and sourcing teams. Each resource maps to a step in a costing workflow, from building a should-cost model to preparing a negotiation, and links to the guide that explains how to use it.',
    walkthrough: {
      heading: 'How to use these resources in a costing workflow',
      intro:
        'The resources follow the order a cost engineer or buyer typically works in. Use them in sequence on one part or sourcing event, then decide where a template is enough and where a platform saves time.',
      steps: [
        {
          title: 'Set up the cost basis',
          body: 'Start with the machine hour rate calculator to establish rates for the processes involved, and the learning curve calculator if volumes will rise over the programme.',
        },
        {
          title: 'Build the part estimate',
          body: 'Use the should-cost model template, or the machined-part and sheet metal costing templates for those process families, to build a bottom-up estimate of material, process, overhead and margin.',
        },
        {
          title: 'Structure and compare',
          body: 'Put the estimate into the cost breakdown template, then use the should-cost gap worksheet to compare it line by line with a supplier quote.',
        },
        {
          title: 'Decide the route',
          body: 'Use the make-vs-buy worksheet, design-to-cost framework and DFM checklist to test whether a different process, design or supplier changes the answer.',
        },
        {
          title: 'Prepare the conversation',
          body: 'Take the gap analysis into the negotiation prep sheet, and use the price increase response template when a supplier asks for more.',
        },
        {
          title: 'Review suppliers and tools',
          body: 'Use the supplier scorecard and qualification checklists for periodic reviews, and the software scorecards if you are evaluating a costing platform.',
        },
      ],
    },
    useCases: {
      heading: 'Resources by task',
      items: [
        {
          industry: 'Should-cost and cost estimating',
          body: 'should-cost-model-template.xlsx, cost-breakdown-template.csv, machined-part-costing-template.csv, sheet-metal-costing-template.csv, machine-hour-rate-calculator.csv, learning-curve-calculator.xlsx and should-cost-analysis-checklist.pdf.',
        },
        {
          industry: 'Negotiation and price challenges',
          body: 'should-cost-gap-worksheet.csv, negotiation-prep-sheet.pdf and price-increase-response-template.xlsx, for turning a cost estimate into a structured supplier conversation.',
        },
        {
          industry: 'Design and make-vs-buy decisions',
          body: 'design-to-cost-framework.csv, dfm-checklist.csv and make-vs-buy-worksheet.csv, for testing design and sourcing alternatives before committing.',
        },
        {
          industry: 'Supplier quality and aerospace qualification',
          body: 'supplier-scorecard-template.xlsx, aerospace-supplier-qualification-checklist.pdf and aerospace-costing-checklist.csv. For software selection: should-cost-software-scorecard.csv, pcm-evaluation-checklist.csv, manufacturing-costing-software-checklist.csv and dfm-software-scorecard.csv.',
        },
      ],
    },
    proof: {
      heading: 'Research and case studies',
      items: [
        {
          title: 'State of Manufacturing Cost Intelligence 2026',
          body: 'Emithran’s report on how manufacturers estimate cost, manage suppliers and use cost data in sourcing decisions.',
          href: '/state-of-manufacturing-cost-intelligence-2026',
        },
        {
          title: 'LCV rear axle should-cost: $244 per unit',
          body: 'A full-assembly should-cost of a 2-tonne LCV rear drive axle at 40,000 units a year, the same bottom-up method the templates follow at larger scale.',
          href: '/case-studies/rear-axle-should-cost',
        },
        {
          title: 'Rear view mirror BOM: $0.96 per unit',
          body: 'A five-part assembly costed across five processes at 150,000 units a year in India, showing how a cost breakdown is built part by part.',
          href: '/case-studies/rear-view-mirror',
        },
      ],
    },
    comparison: {
      heading: 'Template or platform: which fits each task',
      intro:
        'Templates are the right tool for a single part, a first estimate or learning the method. A platform becomes worthwhile when the same work repeats across many parts, suppliers and people.',
      columns: ['Task', 'Template', 'Emithran platform'],
      rows: [
        ['Estimate one part', 'Good fit, quick to fill', 'Faster where the process is in the library'],
        ['Estimate a full BOM', 'Slow, one file per part', 'BOM import with estimates per line'],
        ['Keep rates and assumptions consistent', 'Depends on version control', 'Shared assumptions across users'],
        ['Compare quotes to should-cost', 'Gap worksheet per quote', 'Gaps across all lines and suppliers'],
        ['Find alternative suppliers', 'Not covered', '72,000+ supplier records'],
        ['Score suppliers', 'Scorecard template per review', 'Scorecards linked to parts and cost'],
      ],
    },
    faqs: [
      {
        question: 'Which template should I start with?',
        answer: 'For most teams, the should-cost model template and the should-cost analysis checklist. Together they cover the structure of an estimate and the checks to run before using it in a negotiation.',
      },
      {
        question: 'Do the templates use the same method as the Emithran platform?',
        answer: 'They follow the same bottom-up structure of material, process, overhead and margin. The platform adds a process library, supplier data and BOM-level automation.',
      },
      {
        question: 'Can I share the templates within my company?',
        answer: 'Yes. The templates are intended to be used and adapted by your team on real parts and sourcing events.',
      },
    ],
    related: [
      { href: '/state-of-manufacturing-cost-intelligence-2026', label: 'State of Manufacturing Cost Intelligence 2026', context: 'Emithran’s annual report on cost intelligence practice.' },
      { href: '/blog/should-cost-excel-template', label: 'Free should-cost Excel template', context: 'A walk through the should-cost model template and how to use it.' },
      { href: '/blog/machine-hour-rate-calculation', label: 'Machine hour rate calculation', context: 'The formula and example behind the machine hour rate calculator.' },
      { href: '/blog/make-vs-buy-analysis', label: 'Make-vs-buy analysis', context: 'The decision framework behind the make-vs-buy worksheet.' },
      { href: '/glossary', label: 'Manufacturing cost glossary', context: 'Definitions for the terms used across the templates.' },
    ],
  },
}

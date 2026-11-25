import type { GlossaryEntryContent } from './contentTypes'

/**
 * Expanded glossary entries, batch A. Each entry targets 400–700 visible words.
 * Worked examples use illustrative numbers only.
 */
export const GLOSSARY_CONTENT_A: Record<string, GlossaryEntryContent> = {
  'should cost analysis': {
    summary:
      'Should cost analysis is an engineering-based estimate of what a part or assembly should cost to produce. It is built bottom-up from material, process, labour, overhead and margin data rather than from supplier quotes alone, so buyers and engineers can test a quoted price against a transparent, evidence-based cost model.',
    formula: {
      expression: 'Should cost = Material + Process (cycle time × machine and labour rates) + Overhead + Profit',
      variables: [
        { symbol: 'Material', meaning: 'Gross raw material weight × price per kg, less scrap credit' },
        { symbol: 'Process', meaning: 'Each operation’s cycle and set-up time multiplied by the relevant hourly rate' },
        { symbol: 'Overhead', meaning: 'Factory, quality and administrative costs not tied to one operation' },
        { symbol: 'Profit', meaning: 'A reasonable supplier margin for the category and region' },
      ],
    },
    sections: [
      {
        heading: 'What a should-cost model tells you',
        paragraphs: [
          'A should-cost model shows where a part’s cost comes from, not just what the total is. That breakdown lets a buyer see whether a quote gap sits in material, machining time, overhead or margin, and ask the supplier a specific question instead of asking for a discount.',
          'It is used to benchmark quotes, prepare negotiations, check price increase requests and steer design decisions before a drawing is released.',
        ],
      },
      {
        heading: 'Where to go next',
        paragraphs: [
          'This page is a short definition. The links below take you from the full guide, to the step-by-step method, to a comparison of software tools, and finally to Emithran’s own should-cost module.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: a machined aluminium bracket',
      steps: [
        'Material: 0.8 kg of 6061 billet at ₹350/kg = ₹280.',
        'Process: 18 minutes of 3-axis milling at ₹1,500/hour = ₹450.',
        'Overhead at 15% of conversion cost = ₹68; profit at 10% = ₹80.',
      ],
      result: 'Should cost ≈ ₹878 per part. A quote of ₹1,200 leaves a ₹322 gap to discuss, line by line.',
    },
    india:
      'In India, should-cost analysis is increasingly used by OEMs localising parts under Make in India and by defence buyers who need defensible price evidence. Regional differences in power tariffs, labour rates and machine utilisation between clusters such as Pune, Chennai and Bangalore mean that a model calibrated to the right region matters as much as the method.',
    faqs: [
      {
        question: 'Is should cost the same as the supplier’s price?',
        answer:
          'No. Should cost is an independent estimate of efficient production cost. The supplier’s price may be higher or lower; the gap is what you investigate.',
      },
      {
        question: 'Can I do should cost analysis in Excel?',
        answer:
          'Yes, for a handful of parts. Spreadsheets become hard to maintain once you need consistent rates, process data and audit trails across hundreds of parts.',
      },
      {
        question: 'Who uses should cost analysis?',
        answer:
          'Procurement teams, cost engineers, design engineers and programme managers, especially in aerospace, defence, automotive and industrial equipment.',
      },
    ],
    links: [
      {
        href: '/blog/what-is-should-cost-analysis',
        label: 'What is should cost analysis? Complete guide',
        context: 'Start here for the full definition, inputs and use cases.',
      },
      {
        href: '/blog/how-to-do-should-cost-analysis',
        label: 'How to do should cost analysis, step by step',
        context: 'Follow the method from drawing review to negotiation-ready model.',
      },
      {
        href: '/blog/should-cost-analysis-software-comparison',
        label: 'Should cost analysis software compared',
        context: 'See how the main tools differ before you choose one.',
      },
      {
        href: '/should-cost-analysis-software',
        label: 'Emithran should-cost analysis software',
        context: 'See how Emithran builds should-cost models across 500+ manufacturing processes.',
      },
    ],
  },

  'BOM management': {
    summary:
      'BOM management is the practice of structuring, validating and maintaining a bill of materials so that part numbers, quantities, specifications, sourcing status and cost stay accurate as a product moves from design into production. A well-managed BOM is the single source of truth that engineering, procurement and production all work from.',
    sections: [
      {
        heading: 'What good BOM management covers',
        paragraphs: [
          'Good BOM management keeps one controlled structure and a clear revision history. Every line should carry a unique part number, quantity, unit of measure, material or specification, approved source and current cost, and every change should be traceable to an engineering change.',
          'Most problems come from copies. When engineering holds an EBOM in PLM, manufacturing holds an MBOM in ERP and procurement works from a spreadsheet export, the three drift apart and nobody knows which version is right.',
        ],
        bullets: [
          'Structure: assemblies, sub-assemblies and parts with correct parent–child relationships',
          'Validation: duplicate, missing and obsolete part checks before release',
          'Enrichment: sourcing status, lifecycle, lead time and cost per line',
          'Change control: revisions linked to engineering change orders',
        ],
      },
      {
        heading: 'Why it matters for cost and sourcing',
        paragraphs: [
          'The BOM is where cost and supply risk become visible. A validated, costed BOM shows which lines drive most of the product cost, which parts are single-sourced and which are approaching obsolescence, so sourcing effort goes where it matters.',
          'Emithran imports Excel or CSV BOMs and works alongside existing ERP and PLM systems, with a 99.4% BOM accuracy target for validated programmes.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: cleaning a 1,200-line electronics BOM',
      steps: [
        'Import the BOM export from PLM and the purchasing spreadsheet.',
        'Flag 40 duplicate part numbers that describe the same resistor, and 15 lines with no approved source.',
        'Identify 9 components marked end-of-life by their manufacturers.',
        'Attach current cost to each line and roll it up by assembly.',
      ],
      result:
        'The team consolidates duplicates, launches sourcing on the 15 unsourced lines and plans last-time buys or alternates for the 9 end-of-life parts before they stop production.',
    },
    india:
      'Indian manufacturers supplying global OEMs often receive BOMs in the customer’s format and must reconcile them with their own ERP part masters, which creates duplicate numbering. For defence and space programmes under DAP 2020 and indigenisation targets, a clean BOM is also the starting point for tracking which lines are sourced domestically and which still depend on imports.',
    faqs: [
      {
        question: 'What is the difference between an EBOM and an MBOM?',
        answer:
          'An engineering BOM reflects the design as drawn. A manufacturing BOM adds what production needs, such as consumables, packaging and the order of assembly.',
      },
      {
        question: 'Do I need dedicated BOM software if I have PLM?',
        answer:
          'Not always. PLM controls design data well, but many teams add a layer for cost, sourcing status and supplier data that PLM does not hold.',
      },
      {
        question: 'How often should a BOM be validated?',
        answer:
          'At every release gate and after any engineering change. For long programmes, a periodic check for obsolescence and supplier changes is also worth scheduling.',
      },
    ],
    links: [
      {
        href: '/blog/what-is-bom-management',
        label: 'What is BOM management? Definition and best practices',
        context: 'The full guide to BOM structure, validation and change control.',
      },
      {
        href: '/bom-management-software',
        label: 'Emithran BOM management software',
        context: 'See how BOM Intelligence validates, enriches and costs a BOM.',
      },
      {
        href: '/blog/bom-management-software-buyers-guide',
        label: 'BOM management software buyer’s guide',
        context: 'Questions to ask before you choose a BOM tool.',
      },
      {
        href: '/case-studies/rear-view-mirror',
        label: 'Rear view mirror BOM should-cost case study',
        context: 'A worked BOM costing across five manufacturing processes.',
      },
    ],
  },

  'supplier intelligence': {
    summary:
      'Supplier intelligence is structured data on supplier capability, certification, capacity, risk and performance, used to find, qualify and compare suppliers before and during sourcing decisions. It replaces ad hoc searches and personal contacts with a consistent view of who can make a part, to what standard, and with what risk.',
    sections: [
      {
        heading: 'What supplier intelligence includes',
        paragraphs: [
          'Supplier intelligence answers three questions: who can make this part, can they be trusted to make it, and what happens if they cannot. It combines discovery data with qualification and risk data in one record per supplier.',
        ],
        bullets: [
          'Capability: processes, materials, machine envelope, tolerances',
          'Certification: AS9100, IATF 16949, ISO 9001, NADCAP special processes',
          'Capacity and location: plants, shifts, export experience',
          'Risk: financial health, geographic concentration, single-source exposure',
          'Performance: on-time delivery, quality escapes, responsiveness',
        ],
      },
      {
        heading: 'How it changes sourcing',
        paragraphs: [
          'Good supplier intelligence shortens the search and widens the shortlist. Instead of sending every RFQ to the same three suppliers, a buyer can filter by process, certification and region and invite capable suppliers they had not considered.',
          'Emithran’s Supplier Radar draws on 72,000+ supplier records so teams can screen suppliers by process and certification before an RFQ goes out.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: finding a second source for anodised parts',
      steps: [
        'Filter suppliers by CNC machining plus anodising, within a chosen region.',
        'Keep only those with AS9100 and NADCAP chemical processing listed.',
        'Exclude suppliers already carrying more than a set share of the programme’s spend.',
        'Review the remaining shortlist for capacity and export experience.',
      ],
      result:
        'The buyer moves from one incumbent to a shortlist of four qualified candidates, ready for a trial RFQ, without weeks of cold searching.',
    },
    india:
      'India’s supplier base is spread across clusters such as Bangalore, Pune, Chennai, Hyderabad and Coimbatore, and many capable small and medium suppliers have little online presence. Supplier intelligence helps OEMs and defence primes find these firms, check certifications and build domestic second sources in line with indigenisation goals.',
    faqs: [
      {
        question: 'Is supplier intelligence the same as SRM?',
        answer:
          'No. Supplier intelligence focuses on data for finding and evaluating suppliers. SRM manages relationships with suppliers you already work with.',
      },
      {
        question: 'Where does supplier data come from?',
        answer:
          'Typically from public registries, certification bodies, supplier self-declarations, internal performance records and direct verification.',
      },
      {
        question: 'Does supplier intelligence replace audits?',
        answer:
          'No. It narrows the shortlist and flags risks. Audits and first article inspection are still needed before a supplier is approved.',
      },
    ],
    links: [
      {
        href: '/blog/supplier-intelligence-guide',
        label: 'Supplier intelligence guide for manufacturing teams',
        context: 'The complete guide to supplier data, discovery and risk.',
      },
      {
        href: '/supplier-intelligence',
        label: 'Emithran supplier intelligence',
        context: 'See how Supplier Radar screens suppliers by process and certification.',
      },
      {
        href: '/blog/best-supplier-intelligence-tools-defence-oems',
        label: 'Best supplier intelligence tools for defence OEMs',
        context: 'How the main tools compare for defence supply chains.',
      },
      {
        href: '/blog/supplier-discovery-software',
        label: 'Supplier discovery software explained',
        context: 'How discovery tools find suppliers you did not already know.',
      },
    ],
  },

  'strategic sourcing': {
    summary:
      'Strategic sourcing is a category-level approach to procurement that aligns supplier selection, negotiation and contracting with longer-term business and programme goals. Rather than buying parts one RFQ at a time, teams analyse spend, understand supply markets and cost drivers, and choose suppliers and contract structures that deliver value over years.',
    sections: [
      {
        heading: 'How strategic sourcing works',
        paragraphs: [
          'Strategic sourcing follows a repeatable cycle from spend analysis to contract and review. The point is to decide on a strategy for a whole category, such as machined aluminium parts or wire harnesses, before running individual sourcing events.',
        ],
        bullets: [
          'Profile the category: spend, part families, current suppliers',
          'Understand the market: capable suppliers, regions, cost drivers',
          'Set the strategy: consolidate, dual-source, localise or make in-house',
          'Run the sourcing event with should-cost targets',
          'Contract, implement and review performance',
        ],
      },
      {
        heading: 'Where cost data fits',
        paragraphs: [
          'Strategic sourcing is only as good as its cost baseline. Should-cost models and regional benchmarks tell you what a category ought to cost in each supply market, so a decision to consolidate or relocate is based on evidence rather than a single round of quotes.',
          'Total cost of ownership, not unit price, is the usual decision measure, because freight, duty, quality and switching costs can reverse a price-only decision.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: consolidating a sheet metal category',
      steps: [
        'Spend analysis shows ₹12 crore across 14 sheet metal suppliers, with similar parts priced up to 30% apart.',
        'Should-cost models for the top 50 parts set a target price per part family.',
        'The team runs one sourcing event and awards the category to three suppliers.',
      ],
      result:
        'Fewer suppliers receive larger, steadier volumes, prices move towards the should-cost targets, and the team still keeps a second source for each part family.',
    },
    india:
      'For Indian manufacturers, strategic sourcing often means deciding between domestic and imported supply for each category. Make in India policies, defence indigenisation lists, GST input credits and import duties all affect the comparison, and India-versus-Europe or India-versus-China cost studies are a common input to these decisions.',
    faqs: [
      {
        question: 'How is strategic sourcing different from purchasing?',
        answer:
          'Purchasing executes orders. Strategic sourcing decides which suppliers to use, on what terms and why, usually at category level and over several years.',
      },
      {
        question: 'Does strategic sourcing always mean fewer suppliers?',
        answer:
          'No. Consolidation is common, but for critical parts the right strategy may be to add a second source to reduce risk.',
      },
      {
        question: 'How often should a category strategy be reviewed?',
        answer:
          'Typically once a year, or sooner when a major supplier, price index or programme requirement changes.',
      },
    ],
    links: [
      {
        href: '/blog/strategic-sourcing-software-comparison',
        label: 'Strategic sourcing software comparison',
        context: 'How sourcing tools differ for manufacturers.',
      },
      {
        href: '/strategic-sourcing-software',
        label: 'Emithran strategic sourcing software',
        context: 'See how should-cost, BOM and supplier data come together for category decisions.',
      },
      {
        href: '/case-studies/chassis-india-belgium',
        label: 'India vs Belgium chassis rails case study',
        context: 'A 38% landed-cost saving found by comparing two supply regions.',
      },
      {
        href: '/blog/make-vs-buy-analysis',
        label: 'Make-vs-buy analysis framework',
        context: 'A decision framework for keeping work in-house or sourcing it.',
      },
    ],
  },

  SRM: {
    summary:
      'SRM, or supplier relationship management, is the ongoing management of supplier qualification, performance, risk and collaboration after a sourcing decision has been made. It covers the full life of the relationship: onboarding, scorecards, business reviews, corrective actions and development work, so that suppliers keep meeting quality, cost and delivery expectations.',
    formula: {
      expression: 'Supplier score = Σ (weightᵢ × scoreᵢ)',
      variables: [
        { symbol: 'weightᵢ', meaning: 'Importance of metric i, with all weights summing to 100%' },
        { symbol: 'scoreᵢ', meaning: 'Supplier’s normalised score on metric i, for example 0–100' },
      ],
      note: 'Typical metrics are quality (defect rate), cost (price versus should cost) and delivery (on-time in full).',
    },
    sections: [
      {
        heading: 'What SRM involves',
        paragraphs: [
          'SRM turns a signed contract into a managed relationship. It sets out how each supplier is measured, how often performance is reviewed and what happens when it slips.',
        ],
        bullets: [
          'Segmentation: strategic, preferred, approved and transactional suppliers',
          'Scorecards on quality, cost and delivery',
          'Quarterly or annual business reviews',
          'Corrective action requests and follow-up',
          'Joint cost reduction and development projects',
        ],
      },
      {
        heading: 'Why cost evidence matters in SRM',
        paragraphs: [
          'Cost conversations go better with shared facts. When a supplier asks for a price increase, a should-cost model that shows material and conversion cost lets both sides agree what has actually changed, which protects the relationship as well as the margin.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: a quarterly supplier scorecard',
      steps: [
        'Weights: quality 40%, delivery 35%, cost 25%.',
        'Supplier scores: quality 90, delivery 70, cost 80.',
        'Weighted score: 0.40 × 90 + 0.35 × 70 + 0.25 × 80 = 36 + 24.5 + 20 = 80.5.',
      ],
      result:
        'An overall score of 80.5 with delivery as the weakest area. The business review focuses on a delivery improvement plan rather than price.',
    },
    india:
      'Many Indian OEMs rely on long-standing relationships with local MSME suppliers that are managed informally. Structured SRM, with shared scorecards and cost data, helps these suppliers meet the documentation expected by global customers and by defence programmes, and gives buyers a fair basis for development support.',
    faqs: [
      {
        question: 'What is the difference between SRM and supplier intelligence?',
        answer:
          'Supplier intelligence helps you find and evaluate suppliers. SRM manages the suppliers you have already chosen.',
      },
      {
        question: 'How many metrics should a scorecard have?',
        answer:
          'Usually five to eight. Too many metrics dilute attention; quality, cost and delivery should always be included.',
      },
      {
        question: 'Do all suppliers need full SRM?',
        answer:
          'No. Most teams apply full SRM to strategic and critical suppliers and lighter monitoring to transactional ones.',
      },
    ],
    links: [
      {
        href: '/blog/supplier-scorecard-template',
        label: 'Supplier scorecard template: QCD metrics',
        context: 'How to build and use a quality, cost and delivery scorecard.',
      },
      {
        href: '/srm-software',
        label: 'Emithran SRM software',
        context: 'See how supplier performance and cost data are managed in one place.',
      },
      {
        href: '/downloads/supplier-scorecard-template.xlsx',
        label: 'Download the supplier scorecard template',
        context: 'A ready-made spreadsheet with weighted QCD scoring.',
      },
      {
        href: '/blog/supplier-price-increase-negotiation',
        label: 'How to challenge a supplier price increase with data',
        context: 'Use cost evidence to handle price increase requests.',
      },
    ],
  },

  'spend analysis': {
    summary:
      'Spend analysis is the process of collecting, cleaning, categorising and reviewing procurement spend by commodity, supplier or part family. It shows where money goes, which suppliers and categories matter most, and where there are savings opportunities, maverick spend or inconsistent pricing for similar parts.',
    sections: [
      {
        heading: 'The spend analysis process',
        paragraphs: [
          'Spend analysis turns scattered purchase data into a single categorised view. Most of the effort goes into cleaning: matching supplier names, mapping part descriptions to categories and converting currencies.',
        ],
        bullets: [
          'Extract purchase orders and invoices from ERP and other sources',
          'Cleanse: merge duplicate suppliers, standardise units',
          'Classify each line into a category taxonomy',
          'Analyse by category, supplier, part family and region',
          'Prioritise opportunities and hand them to sourcing',
        ],
      },
      {
        heading: 'From spend view to part-level action',
        paragraphs: [
          'Category totals show where to look; part-level cost data shows what to do. Once spend analysis identifies a high-spend category, should-cost models and price comparisons across similar parts reveal whether the issue is price, specification or supplier choice.',
          'A Pareto view is the usual starting point: in many manufacturers, a small share of suppliers and part families accounts for most of the spend.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: finding price variation in fasteners',
      steps: [
        'Classify a year of purchase data and isolate the fasteners category.',
        'Group identical M8 stainless bolts bought from six suppliers.',
        'Find unit prices ranging from ₹9 to ₹16 for the same specification.',
      ],
      result:
        'Moving volume to the two best-priced qualified suppliers would remove most of the variation. The category becomes a priority for the next sourcing event.',
    },
    india:
      'Indian manufacturers often have spend data spread across several ERP instances, plant-level purchasing and GST invoices with inconsistent supplier names. GSTIN numbers can help de-duplicate suppliers, and spend analysis is a natural first step before deciding which imported categories could be localised.',
    faqs: [
      {
        question: 'What data do I need for spend analysis?',
        answer:
          'Purchase orders, invoices and supplier master data at minimum. Part numbers and descriptions make part-level analysis possible.',
      },
      {
        question: 'What is maverick spend?',
        answer:
          'Purchases made outside agreed contracts or approved suppliers, often at higher prices and without proper controls.',
      },
      {
        question: 'How is spend analysis different from should-cost analysis?',
        answer:
          'Spend analysis shows what you paid. Should-cost analysis estimates what a part should cost. Used together, they show where you overpay.',
      },
    ],
    links: [
      {
        href: '/blog/spend-analysis-software-guide',
        label: 'Spend analysis software guide for manufacturing',
        context: 'The full guide to spend data, classification and tools.',
      },
      {
        href: '/spend-analysis-software',
        label: 'Emithran spend analysis software',
        context: 'See how spend is linked to part-level cost and supplier data.',
      },
      {
        href: '/blog/cost-breakdown-analysis',
        label: 'Cost breakdown analysis explained',
        context: 'The next step once spend analysis has found a costly category.',
      },
    ],
  },

  'cost engineering': {
    summary:
      'Cost engineering is the discipline of building and validating manufacturing cost models from process, material and labour data to support design, sourcing and negotiation decisions. Cost engineers estimate what parts should cost, explain the drivers behind that cost, and help engineering and procurement reduce it without compromising function.',
    formula: {
      expression: 'Unit cost = Material + Σ (cycle timeₒ × rateₒ) + (set-up + tooling) ÷ batch size + Overhead + Margin',
      variables: [
        { symbol: 'cycle timeₒ', meaning: 'Time for operation o per part' },
        { symbol: 'rateₒ', meaning: 'Machine and labour hourly rate for operation o' },
        { symbol: 'batch size', meaning: 'Parts per production run, over which set-up and tooling are spread' },
      ],
    },
    sections: [
      {
        heading: 'What cost engineers do',
        paragraphs: [
          'Cost engineers turn drawings into defensible cost estimates. They read the geometry and specification, choose a realistic process route, estimate cycle times and apply material prices and hourly rates for the relevant region.',
        ],
        bullets: [
          'Early estimates for new designs and quotations',
          'Should-cost models to benchmark supplier prices',
          'Design reviews to find cost drivers and alternatives',
          'Make-versus-buy and regional sourcing comparisons',
        ],
      },
      {
        heading: 'Methods and tools',
        paragraphs: [
          'Cost engineering uses different methods at different stages. Analogous and parametric estimates suit early concepts; bottom-up, process-based models suit released drawings and negotiation.',
          'Spreadsheets remain common, but dedicated software keeps rates, process data and assumptions consistent across a team. Emithran covers 500+ manufacturing processes for this purpose.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: a turned steel shaft',
      steps: [
        'Material: 1.2 kg bar at ₹110/kg = ₹132.',
        'Turning: 6 minutes at ₹1,200/hour = ₹120; grinding: 4 minutes at ₹1,500/hour = ₹100.',
        'Set-up of ₹3,000 over a batch of 200 = ₹15 per part.',
        'Overhead and margin at 20% of the subtotal ₹367 = ₹73.',
      ],
      result: 'Unit cost ≈ ₹440. Doubling the batch to 400 would save about ₹7.50 per part in set-up alone.',
    },
    india:
      'Indian cost engineering teams increasingly serve global customers from engineering centres in Bangalore, Pune, Chennai and Hyderabad, building models for parts made in India and abroad. That makes regional rate libraries essential: the same cycle time can carry very different hourly costs in India, Germany or the UK.',
    faqs: [
      {
        question: 'Is cost engineering the same as cost accounting?',
        answer:
          'No. Cost accounting records what was spent. Cost engineering predicts what something should cost before or while it is made.',
      },
      {
        question: 'What background do cost engineers have?',
        answer:
          'Most come from manufacturing or mechanical engineering, with knowledge of processes, materials and shop-floor practice.',
      },
      {
        question: 'When should cost engineering start?',
        answer:
          'As early as concept design, when most of a product’s cost is still open to change.',
      },
    ],
    links: [
      {
        href: '/blog/cost-engineering-software',
        label: 'Cost engineering software for manufacturers',
        context: 'How the main cost engineering tools compare.',
      },
      {
        href: '/cost-engineering-software',
        label: 'Emithran cost engineering software',
        context: 'See how cost models are built across 500+ processes.',
      },
      {
        href: '/blog/cost-modeling-in-manufacturing',
        label: 'Cost modelling in manufacturing: methods and best practices',
        context: 'The modelling methods cost engineers use at each stage.',
      },
      {
        href: '/case-studies/rear-axle-should-cost',
        label: 'LCV rear axle should-cost case study',
        context: 'A full assembly cost model at $244 per unit.',
      },
    ],
  },

  'design for manufacturability': {
    summary:
      'Design for manufacturability (DFM) is the engineering practice of designing parts so they can be produced efficiently and at lower cost with available manufacturing processes. It reduces scrap, rework, tooling complexity and cycle time by applying process knowledge while the design is still easy to change, before drawings are released.',
    sections: [
      {
        heading: 'Core DFM principles',
        paragraphs: [
          'DFM means designing for the process that will actually make the part. A feature that is simple in CAD can be slow, risky or expensive on the shop floor, and DFM catches those features early.',
        ],
        bullets: [
          'Use standard materials and stock sizes',
          'Avoid tolerances tighter than the function needs',
          'Design for standard tooling: radii, hole sizes, thread lengths',
          'Minimise set-ups and part re-orientation',
          'Keep wall thickness consistent for castings and mouldings',
        ],
      },
      {
        heading: 'Linking DFM to cost',
        paragraphs: [
          'DFM works best when every suggestion carries a cost. Engineers are more likely to change a design when they can see that a tolerance relaxation saves a grinding operation worth a specific amount per part.',
          'DFM is closely related to DFMA, which adds design for assembly, and to design-to-cost, which sets an explicit cost target for the design.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: a machined housing',
      steps: [
        'Original design: internal corner radius of 1 mm in a 40 mm deep pocket, all tolerances ±0.02 mm.',
        'DFM review: increase the radius to 6 mm so a standard end mill can be used; relax non-functional tolerances to ±0.1 mm.',
        'Re-estimate: milling time falls from 42 to 28 minutes and one inspection step is removed.',
      ],
      result: 'At ₹1,600/hour, the time saving alone is about ₹370 per part, with lower scrap risk.',
    },
    india:
      'Indian suppliers often receive drawings designed around equipment and practices in other countries. DFM reviews that reflect the machines and processes available in Indian supplier clusters help localisation succeed first time and avoid costly specification deviations later in the programme.',
    faqs: [
      {
        question: 'What is the difference between DFM and DFMA?',
        answer:
          'DFM focuses on making individual parts easier to produce. DFMA adds design for assembly, such as reducing part count and fasteners.',
      },
      {
        question: 'Who should run a DFM review?',
        answer:
          'Design engineers with input from manufacturing engineers, cost engineers and, where possible, the intended supplier.',
      },
      {
        question: 'When is DFM most effective?',
        answer:
          'Before drawing release. After tooling is ordered, changes become slow and expensive.',
      },
      {
        question: 'Can DFM be automated?',
        answer:
          'Many geometric checks can be automated in software. Judgement about function and process choice still needs engineers.',
      },
    ],
    links: [
      {
        href: '/blog/design-for-manufacturability-guide',
        label: 'Design for manufacturability: principles, rules and checklist',
        context: 'The complete guide to DFM rules by process.',
      },
      {
        href: '/design-for-manufacturability-software',
        label: 'Emithran design for manufacturability software',
        context: 'See how DFM feedback is linked to part cost.',
      },
      {
        href: '/blog/design-for-manufacturing-examples',
        label: '10 design for manufacturing examples with cost impact',
        context: 'Real-world style examples of DFM changes and their savings.',
      },
      {
        href: '/downloads/dfm-checklist.csv',
        label: 'Download the DFM checklist',
        context: 'A ready-to-use checklist for design reviews.',
      },
    ],
  },

  VAVE: {
    summary:
      'VAVE, or value analysis and value engineering, is a structured method for evaluating design, material or process alternatives to reduce cost or improve function without compromising a part’s required performance. Value analysis applies it to existing products; value engineering applies it during design. Both start from the function the customer actually needs.',
    formula: {
      expression: 'Value = Function ÷ Cost',
      variables: [
        { symbol: 'Function', meaning: 'What the part must do, expressed as required performance' },
        { symbol: 'Cost', meaning: 'The full cost of delivering that function' },
      ],
      note: 'Value rises when cost falls for the same function, or when function improves for the same cost.',
    },
    sections: [
      {
        heading: 'How a VAVE study works',
        paragraphs: [
          'A VAVE study asks what each part does and whether there is a cheaper way to do it. It follows a fixed sequence so that ideas are tested against function and cost, not opinion.',
        ],
        bullets: [
          'Information: gather drawings, costs, volumes and requirements',
          'Function analysis: define each function as a verb and a noun',
          'Creative: generate alternatives for high-cost functions',
          'Evaluation: cost and risk-check each alternative',
          'Implementation: validate, qualify and release the change',
        ],
      },
      {
        heading: 'Where the savings come from',
        paragraphs: [
          'Most VAVE savings come from material, process and part-count changes. Typical ideas include substituting a grade, switching from machining to forming, combining parts or relaxing specifications that exceed the real requirement.',
          'Emithran’s DC-DC converter case study recorded a 22% unit cost reduction on an aerospace converter through a VAVE analysis.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: a welded steel bracket',
      steps: [
        'Function: support a 5 kg load at a fixed position.',
        'Current design: three machined plates welded together, total cost ₹900.',
        'Alternative: one laser-cut and bent sheet metal part, cost ₹520, verified by load test.',
      ],
      result: 'Function is unchanged and cost falls by ₹380, so value improves by roughly 73%.',
    },
    india:
      'Indian automotive and industrial OEMs have used VAVE for years to meet annual price-down expectations, often in joint workshops with suppliers. In aerospace and defence, VAVE changes must also pass qualification and customer approval, so studies need cost evidence strong enough to justify the requalification effort.',
    faqs: [
      {
        question: 'What is the difference between VA and VE?',
        answer:
          'Value analysis reviews products already in production. Value engineering applies the same method during design, before release.',
      },
      {
        question: 'Does VAVE reduce quality?',
        answer:
          'It should not. VAVE keeps required function and performance fixed and removes cost that does not contribute to them.',
      },
      {
        question: 'Who takes part in a VAVE workshop?',
        answer:
          'Usually design, manufacturing, procurement, quality and cost engineering, and often key suppliers.',
      },
    ],
    links: [
      {
        href: '/blog/what-is-vave',
        label: 'What is VAVE? Value analysis and value engineering guide',
        context: 'The full guide to the VAVE method and job plan.',
      },
      {
        href: '/vave-software',
        label: 'Emithran VAVE software',
        context: 'See how VAVE Studio costs and compares design alternatives.',
      },
      {
        href: '/case-studies/dc-dc-converter',
        label: 'Aerospace DC-DC converter VAVE case study',
        context: 'A VAVE analysis that saved 22% per unit.',
      },
      {
        href: '/blog/value-engineering',
        label: 'Value engineering: a practical framework',
        context: 'A step-by-step framework for running value engineering.',
      },
    ],
  },

  RFQ: {
    summary:
      'An RFQ, or request for quotation, is a formal document sent to suppliers asking them to quote price, lead time and terms for a defined part, assembly or service. It is usually based on drawings, specifications, volumes and quality requirements, so that responses can be compared on a like-for-like basis.',
    sections: [
      {
        heading: 'What a good RFQ contains',
        paragraphs: [
          'A good RFQ removes ambiguity so that every supplier quotes the same thing. Missing information leads to assumptions, and assumptions lead to quotes that cannot be compared.',
        ],
        bullets: [
          'Drawings, 3D models and revision levels',
          'Material, finish and special process requirements',
          'Annual volumes, batch sizes and programme life',
          'Quality requirements such as AS9100, PPAP level or first article inspection',
          'A cost breakdown template for material, process, tooling and margin',
          'Delivery terms, response deadline and evaluation criteria',
        ],
      },
      {
        heading: 'Evaluating responses',
        paragraphs: [
          'Quotes are easier to judge against an independent baseline. A should-cost model shows what the part ought to cost, so a buyer can see whether the lowest quote is realistic and where the highest quote is out of line.',
          'Asking suppliers for a cost breakdown in the same structure as your should-cost model makes the comparison quick and the follow-up questions specific.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: comparing three quotes',
      steps: [
        'Should cost for a cast and machined housing: ₹2,400.',
        'Supplier A quotes ₹2,500; B quotes ₹3,300; C quotes ₹1,900.',
        'B’s breakdown shows machining time twice the model estimate; C’s shows no allowance for impregnation, which the drawing requires.',
      ],
      result:
        'The buyer clarifies the requirement with C and asks B to review its process route, rather than simply choosing the lowest number.',
    },
    india:
      'Many Indian suppliers still receive RFQs by email with PDF drawings and respond in their own formats, which makes comparison slow. Government and defence procurement in India follows formal tender procedures under DAP 2020 and related rules, so private-sector RFQ practice and public tendering differ in structure and timelines.',
    faqs: [
      {
        question: 'What is the difference between an RFQ, RFP and RFI?',
        answer:
          'An RFI gathers information about suppliers. An RFP asks for a proposed solution. An RFQ asks for a price on a defined requirement.',
      },
      {
        question: 'How many suppliers should receive an RFQ?',
        answer:
          'Commonly three to five qualified suppliers. Fewer limits competition; more adds evaluation work without much benefit.',
      },
      {
        question: 'Can RFQs be automated?',
        answer:
          'Preparation, distribution and comparison can be largely automated. Supplier selection and negotiation still benefit from human judgement.',
      },
    ],
    links: [
      {
        href: '/blog/rfq-automation-manufacturing',
        label: 'RFQ automation in manufacturing',
        context: 'What parts of the RFQ process to automate and what to keep human.',
      },
      {
        href: '/rfq-intelligence',
        label: 'Emithran RFQ intelligence software',
        context: 'See how quotes are compared against should-cost baselines.',
      },
      {
        href: '/blog/supplier-negotiation-strategy',
        label: 'Supplier negotiation strategy: a should-cost-backed playbook',
        context: 'How to turn RFQ results into a structured negotiation.',
      },
    ],
  },

  'design to cost': {
    summary:
      'Design to cost is an approach where a target cost is set early in product design and engineering decisions are made to stay within that target. Instead of costing a design after it is finalised, cost becomes a design requirement alongside weight, performance and reliability, tracked at every design review.',
    formula: {
      expression: 'Target cost = Target selling price − Target margin',
      variables: [
        { symbol: 'Target selling price', meaning: 'The price the market or customer will accept' },
        { symbol: 'Target margin', meaning: 'The profit the business requires on the product' },
      ],
      note: 'The product-level target is then allocated to sub-systems and parts.',
    },
    sections: [
      {
        heading: 'How design to cost works',
        paragraphs: [
          'Design to cost sets the budget first and designs to it. The product target is split across sub-systems, each design team owns its allocation, and cost estimates are refreshed at each gate.',
        ],
        bullets: [
          'Set the product target cost from price and margin',
          'Allocate targets to sub-systems and major parts',
          'Estimate cost at each design iteration',
          'Close gaps with DFM, VAVE and sourcing options',
          'Freeze the design only when the estimate meets the target',
        ],
      },
      {
        heading: 'Why early estimates matter',
        paragraphs: [
          'Most of a product’s cost is fixed by early design choices. Material, process route and part count are usually decided long before procurement sees the drawing, so cost estimates must be available to designers at concept and preliminary design stages.',
          'Design to cost differs from design to value, which weighs cost against customer value rather than treating cost as a fixed ceiling.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: an industrial control unit',
      steps: [
        'Target price ₹50,000, target margin 30%, so target cost = ₹35,000.',
        'Allocation: enclosure ₹6,000, electronics ₹20,000, wiring and assembly ₹9,000.',
        'First estimate shows the enclosure at ₹8,200, ₹2,200 over target.',
        'Switching from machined to sheet metal construction brings it to ₹5,800.',
      ],
      result: 'The enclosure meets its allocation and the design proceeds to the next gate within target.',
    },
    india:
      'Indian OEMs designing for price-sensitive domestic markets have long practised informal design to cost. Defence and space programmes under indigenisation initiatives increasingly need it formally, as domestic designs must compete on cost with established imported equipment.',
    faqs: [
      {
        question: 'Is design to cost the same as target costing?',
        answer:
          'They are closely related. Target costing sets the target from market price; design to cost is the engineering discipline of meeting it.',
      },
      {
        question: 'What if the target cannot be met?',
        answer:
          'The team escalates with evidence: change the specification, accept a lower margin, or adjust the price. The target should not be quietly ignored.',
      },
      {
        question: 'Which tools support design to cost?',
        answer:
          'Early-stage cost estimating, DFM analysis and should-cost modelling tools that designers can use without waiting for supplier quotes.',
      },
    ],
    links: [
      {
        href: '/blog/design-to-cost',
        label: 'Design-to-cost: definition, process and worked examples',
        context: 'The full guide to setting and meeting cost targets in design.',
      },
      {
        href: '/design-to-cost-software',
        label: 'Emithran design-to-cost software',
        context: 'See how designers get cost estimates during design.',
      },
      {
        href: '/downloads/design-to-cost-framework.csv',
        label: 'Download the design-to-cost framework',
        context: 'A template for allocating and tracking cost targets.',
      },
      {
        href: '/blog/target-costing',
        label: 'Target costing: how to set and hit cost targets',
        context: 'How the target itself is derived and allocated.',
      },
    ],
  },

  'total cost of ownership': {
    summary:
      'Total cost of ownership (TCO) is the full cost of a sourced part or service over its lifecycle. It includes unit price plus logistics, duty, quality cost, inventory carrying cost and switching or requalification cost. TCO shows when the cheapest quote is not the cheapest supplier once every cost of using it is counted.',
    formula: {
      expression: 'TCO = Price + Freight + Duty + Quality cost + Inventory carrying cost + Switching cost',
      variables: [
        { symbol: 'Price', meaning: 'Unit price × volume over the period' },
        { symbol: 'Freight and duty', meaning: 'Transport, insurance, customs duty and handling' },
        { symbol: 'Quality cost', meaning: 'Inspection, scrap, rework and warranty' },
        { symbol: 'Inventory carrying cost', meaning: 'Cost of holding safety stock for longer lead times' },
        { symbol: 'Switching cost', meaning: 'Qualification, first article, tooling and transfer cost, spread over the period' },
      ],
    },
    sections: [
      {
        heading: 'Why price alone misleads',
        paragraphs: [
          'Unit price is often only part of what a part really costs. A distant supplier with a lower price may need larger safety stock, air freight when schedules slip and more incoming inspection, and these costs can outweigh the price difference.',
        ],
      },
      {
        heading: 'Using TCO in sourcing decisions',
        paragraphs: [
          'TCO is most useful when comparing regions or switching suppliers. Build it on the same basis for each option, over the same period, and include one-off costs such as requalification spread across expected volume.',
          'Emithran’s India versus Belgium chassis rail case study compared landed cost across two regions and found a 38% saving.',
        ],
        bullets: [
          'Use the same volume and period for every option',
          'Include risk costs such as expediting and line stoppage where you have data',
          'Revisit TCO when freight rates, duties or exchange rates change',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: domestic versus imported casting',
      steps: [
        'Imported: price ₹800, freight and duty ₹180, extra inventory ₹40, extra inspection ₹20 = ₹1,040 per part.',
        'Domestic: price ₹900, freight ₹30, inventory ₹10, inspection ₹10 = ₹950 per part.',
        'Switching to the domestic supplier costs ₹4 lakh in qualification, spread over 10,000 parts = ₹40 per part.',
      ],
      result: 'Domestic TCO is ₹990 against ₹1,040 imported, so the higher-priced domestic supplier is cheaper overall.',
    },
    india:
      'For Indian buyers, TCO comparisons need to account for basic customs duty, GST and whether input tax credit is available, as well as port and inland freight. These factors, together with Make in India preferences in public procurement, often change the outcome of an import-versus-domestic decision.',
    faqs: [
      {
        question: 'Is TCO the same as landed cost?',
        answer:
          'No. Landed cost covers price, freight, duty and handling to your door. TCO adds quality, inventory and switching costs over the lifecycle.',
      },
      {
        question: 'How long a period should TCO cover?',
        answer:
          'Usually the contract term or the remaining programme life, whichever is the relevant decision horizon.',
      },
      {
        question: 'What costs are most often missed?',
        answer:
          'Inventory carrying cost, expediting, internal inspection and the cost of qualifying a new supplier.',
      },
    ],
    links: [
      {
        href: '/total-cost-ownership',
        label: 'Total cost of ownership guide for manufacturing',
        context: 'The full guide to building a TCO comparison.',
      },
      {
        href: '/strategic-sourcing-software',
        label: 'Emithran strategic sourcing software',
        context: 'See how TCO feeds category and supplier decisions.',
      },
      {
        href: '/case-studies/chassis-india-belgium',
        label: 'India vs Belgium chassis rails case study',
        context: 'A 38% landed-cost saving from a two-region comparison.',
      },
    ],
  },

  'machine hourly rate': {
    summary:
      'The machine hourly rate is the cost per hour of operating a specific machine or production line. It combines depreciation, interest, power, maintenance, floor space and often operator labour, divided by productive hours per year. It is a key input to should-cost models for machined or processed parts.',
    formula: {
      expression:
        'Machine hourly rate = (Depreciation + Interest + Power + Maintenance + Floor space + Consumables) ÷ Productive hours per year',
      variables: [
        { symbol: 'Depreciation', meaning: '(Purchase price − residual value) ÷ useful life in years' },
        { symbol: 'Interest', meaning: 'Cost of capital tied up in the machine' },
        { symbol: 'Power', meaning: 'Connected load × utilisation × tariff × hours' },
        { symbol: 'Productive hours', meaning: 'Shifts × hours × working days × utilisation' },
      ],
      note: 'Operator labour is either added to the machine rate or costed separately; be consistent across models.',
    },
    sections: [
      {
        heading: 'Why the rate matters',
        paragraphs: [
          'For machined parts, the hourly rate multiplies every minute of cycle time. A small error in the rate becomes a large error in the part cost, so it needs to reflect the actual machine class, region and utilisation.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [
          'The most common mistake is assuming too many productive hours. Set-ups, maintenance and idle time mean real utilisation is usually well below calendar hours, and a low utilisation assumption raises the rate.',
        ],
        bullets: [
          'Using one rate for all machines regardless of size or axes',
          'Ignoring shift pattern differences between suppliers',
          'Double-counting labour in both machine and labour rates',
          'Leaving out tooling and coolant consumables',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: a 5-axis machining centre',
      steps: [
        'Depreciation: (₹2.4 crore − ₹40 lakh) ÷ 10 years = ₹20 lakh per year.',
        'Interest ₹12 lakh, power ₹6 lakh, maintenance ₹5 lakh, space ₹3 lakh, consumables ₹4 lakh.',
        'Total annual cost: ₹50 lakh.',
        'Productive hours: 2 shifts × 8 hours × 300 days × 75% = 3,600 hours.',
      ],
      result: 'Machine hourly rate ≈ ₹1,389 per hour, before operator labour.',
    },
    india:
      'In India, machine hourly rates vary noticeably between states because of industrial power tariffs, land costs and typical shift patterns. Many Indian job shops run two or three shifts, which spreads fixed costs over more hours and lowers the rate compared with single-shift operations in other countries.',
    faqs: [
      {
        question: 'Should operator wages be included in the machine rate?',
        answer:
          'Either approach works if applied consistently. Separate rates make it easier to model one operator running several machines.',
      },
      {
        question: 'How often should rates be updated?',
        answer:
          'At least annually, and whenever power tariffs, wage agreements or utilisation change significantly.',
      },
      {
        question: 'Why do suppliers quote different rates for similar machines?',
        answer:
          'Differences in machine age, financing, utilisation, region and overhead allocation all change the rate.',
      },
    ],
    links: [
      {
        href: '/blog/machine-hour-rate-calculation',
        label: 'How to calculate machine hour rate',
        context: 'The full method, formula and worked example.',
      },
      {
        href: '/should-cost-analysis-software',
        label: 'Emithran should-cost analysis software',
        context: 'See how regional machine rates feed should-cost models.',
      },
      {
        href: '/downloads/machine-hour-rate-calculator.csv',
        label: 'Download the machine hour rate calculator',
        context: 'A template to calculate rates for your own machines.',
      },
      {
        href: '/blog/cnc-machining-cost-estimation',
        label: 'Should-cost analysis for CNC machined parts',
        context: 'How machine rates are used in a complete part estimate.',
      },
    ],
  },

  PPAP: {
    summary:
      'PPAP, the Production Part Approval Process, is a standardised set of documentation and testing requirements used to confirm that a supplier’s production process can consistently make parts that meet specification at the quoted rate. It originated in automotive and is widely used in precision manufacturing, with an aerospace counterpart in AS9145.',
    sections: [
      {
        heading: 'What a PPAP submission contains',
        paragraphs: [
          'A PPAP package is evidence that the production process is ready. The AIAG PPAP manual lists 18 elements; the customer decides which are required through the submission level.',
        ],
        bullets: [
          'Design records and engineering change documents',
          'Design and process FMEA',
          'Process flow diagram and control plan',
          'Measurement system analysis and dimensional results',
          'Material and performance test results',
          'Initial process capability studies',
          'Part Submission Warrant (PSW) signed by the supplier',
        ],
      },
      {
        heading: 'Submission levels',
        paragraphs: [
          'PPAP has five submission levels, from a warrant only at Level 1 to a full package reviewed at the supplier’s site at Level 5. Level 3, a warrant with product samples and full supporting data, is the usual default unless the customer specifies otherwise.',
          'PPAP is typically required for new parts, engineering changes, a change of supplier or production site, and after tooling is replaced or refurbished.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: approving a new die-cast part',
      steps: [
        'The supplier runs a production trial using production tooling at the planned rate.',
        'It measures 5 sample parts against every drawing dimension and runs a capability study on critical features.',
        'It submits a Level 3 package with the PSW, control plan, FMEA and test results.',
        'The customer’s supplier quality engineer reviews and approves the submission.',
      ],
      result: 'The part is released for series supply, and any later process change triggers a new PPAP.',
    },
    india:
      'PPAP is standard practice across India’s automotive component industry, where many suppliers hold IATF 16949 certification and supply both domestic and export OEMs. As Indian suppliers move into aerospace and defence work, they often adapt existing PPAP experience to customer-specific or AS9145-based approval requirements.',
    faqs: [
      {
        question: 'What is the difference between PPAP and APQP?',
        answer:
          'APQP is the planning framework for developing a product and process. PPAP is the approval step near the end that proves the process is ready.',
      },
      {
        question: 'Is PPAP used outside automotive?',
        answer:
          'Yes. Aerospace, defence, medical and industrial manufacturers use PPAP or similar approval processes, sometimes under different names.',
      },
      {
        question: 'What is a Part Submission Warrant?',
        answer:
          'The summary document in which the supplier declares that the parts meet all requirements and the process is ready for production.',
      },
    ],
    links: [
      {
        href: '/blog/aerospace-supplier-qualification-checklist',
        label: 'AS9100 supplier qualification checklist',
        context: 'Where production approval fits in qualifying a supplier.',
      },
      {
        href: '/srm-software',
        label: 'Emithran SRM software',
        context: 'See how supplier qualification and performance are tracked.',
      },
      {
        href: '/blog/as9100-vs-iso-9001',
        label: 'AS9100 vs ISO 9001 for procurement teams',
        context: 'The quality system standards behind supplier approval.',
      },
    ],
  },

  APQP: {
    summary:
      'APQP, Advanced Product Quality Planning, is a structured framework for planning and validating a new product’s design and manufacturing process before full production begins. It organises work into phases with defined outputs, so that quality risks are found and controlled early. It is commonly used alongside PPAP, which closes the process.',
    sections: [
      {
        heading: 'The five phases of APQP',
        paragraphs: [
          'APQP breaks product launch into five phases, each with defined deliverables and a review gate. The phases overlap in practice, but no phase should be signed off until its outputs are complete.',
        ],
        bullets: [
          'Plan and define the programme: customer requirements, goals, preliminary BOM',
          'Product design and development: design FMEA, DFM, drawings and specifications',
          'Process design and development: process flow, process FMEA, control plan',
          'Product and process validation: production trial, measurement studies, PPAP',
          'Feedback, assessment and corrective action: reduce variation and capture lessons',
        ],
      },
      {
        heading: 'Why APQP matters for cost',
        paragraphs: [
          'APQP is a quality framework, but it shapes cost too. Problems found during design or process planning are far cheaper to fix than problems found after tooling is built or parts are in the field.',
          'Running DFM and cost estimates in the early phases, alongside the design FMEA, helps teams avoid launching a product that meets quality targets but misses its cost target.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: launching a new sensor housing',
      steps: [
        'Phase 1: capture requirements and set quality and cost targets.',
        'Phase 2: a design FMEA and DFM review change a thin wall that would have caused casting porosity.',
        'Phase 3: the process FMEA adds an in-line leak test to the control plan.',
        'Phase 4: a production trial and PPAP confirm capability.',
      ],
      result:
        'The design issue is fixed on paper in Phase 2 instead of after tooling, avoiding a die modification and a delayed launch.',
    },
    india:
      'APQP is widely practised by Indian automotive suppliers working to IATF 16949 and customer-specific requirements. Indian aerospace and defence suppliers are increasingly expected to follow APQP-style planning, often through AS9145, as programmes push for indigenous production of more complex parts.',
    faqs: [
      {
        question: 'Who created APQP?',
        answer:
          'It was developed by the major US automotive manufacturers through the AIAG and is now used across many manufacturing sectors.',
      },
      {
        question: 'Is APQP mandatory?',
        answer:
          'It is expected under IATF 16949 and many customer requirements, but it is not a legal requirement in itself.',
      },
      {
        question: 'How long does APQP take?',
        answer:
          'It runs for the length of the product development programme, which may be months for a simple part or years for a complex system.',
      },
    ],
    links: [
      {
        href: '/blog/aerospace-supplier-qualification-checklist',
        label: 'AS9100 supplier qualification checklist',
        context: 'How suppliers are qualified before and during product launch.',
      },
      {
        href: '/aerospace-manufacturing-software',
        label: 'Emithran aerospace manufacturing software',
        context: 'See how cost, BOM and supplier data support new programme launches.',
      },
      {
        href: '/blog/design-for-manufacturability-guide',
        label: 'Design for manufacturability guide',
        context: 'The DFM reviews that belong in APQP Phase 2.',
      },
    ],
  },
}

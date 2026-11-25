import type { GlossaryEntryContent } from './contentTypes'

/**
 * Expanded glossary entries, batch B. Keys match the term strings in glossarySeed.
 * All worked examples use illustrative numbers only.
 */
export const GLOSSARY_CONTENT_B: Record<string, GlossaryEntryContent> = {
  'landed cost': {
    summary:
      'Landed cost is the total cost of a part once it reaches your receiving dock: the supplier’s ex-works price plus packaging, freight, insurance, customs duty, clearance, inland transport and handling. It is the number to compare suppliers on, because a cheaper unit price from further away can still cost more when it lands.',
    formula: {
      expression: 'Landed cost per unit = Ex-works price + (Freight + Insurance + Duty + Clearance + Inland transport + Handling) ÷ Units shipped',
      variables: [
        { symbol: 'Ex-works price', meaning: 'Supplier price at their factory gate, before any logistics' },
        { symbol: 'Freight', meaning: 'Sea, air or road charges for the consignment' },
        { symbol: 'Duty', meaning: 'Non-recoverable customs duties and surcharges on the assessable value' },
        { symbol: 'Clearance', meaning: 'Customs broker, port and documentation fees' },
        { symbol: 'Handling', meaning: 'Unloading, warehousing and inspection at destination' },
      ],
      note: 'Include only taxes you cannot recover.',
    },
    sections: [
      {
        heading: 'Why landed cost matters more than unit price',
        paragraphs: [
          'Landed cost is the only fair basis for comparing suppliers in different countries. A quote of 100 per unit from one region and 90 from another tells you little until freight, duty and lead-time costs are added to both.',
          'Logistics and duty often move a sourcing decision by several percentage points. For heavy or bulky parts such as chassis rails, castings or fabricated frames, freight can be a large share of the delivered price, which is why local suppliers often win on landed cost despite higher factory rates.',
        ],
        bullets: [
          'Incoterms decide who pays which leg; normalise every quote to the same basis before comparing.',
          'Inventory carrying cost rises with longer transit times and larger safety stock.',
        ],
      },
      {
        heading: 'How landed cost fits into should-cost work',
        paragraphs: [
          'A should-cost model estimates the ex-works price; landed cost adds the journey. Cost engineers usually build the part cost bottom-up from material, process and overhead, then layer logistics and duty on top to compare regions.',
          'Keeping the two layers separate makes negotiations cleaner. If a supplier’s factory price is fair but freight is inflated, the fix is a logistics change, not a price challenge.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: two-region comparison for a steel bracket',
      steps: [
        'Supplier A (overseas) quotes 8.00 per unit ex-works; Supplier B (domestic) quotes 9.00 per unit ex-works. Volume is 20,000 units per shipment.',
        'Supplier A adds sea freight and insurance of 14,000, non-recoverable duty of 12,000 and clearance plus inland transport of 6,000: 32,000 ÷ 20,000 = 1.60 per unit.',
        'Supplier B adds road freight and handling of 6,000: 6,000 ÷ 20,000 = 0.30 per unit.',
        'Landed cost: Supplier A = 9.60; Supplier B = 9.30.',
      ],
      result:
        'The supplier with the higher unit price is about 3% cheaper on a landed basis, before counting the extra safety stock the longer sea route requires.',
    },
    india:
      'For Indian importers, landed cost typically includes Basic Customs Duty and applicable surcharges on the assessable value, plus IGST on imports. IGST is generally recoverable as input tax credit for GST-registered manufacturers, so it is usually treated as a cash-flow item rather than a cost. For exporters, India’s lower conversion costs can outweigh long freight legs; Emithran’s India vs Belgium chassis rail study found a 38% landed-cost saving once logistics were included.',
    faqs: [
      {
        question: 'Is landed cost the same as total cost of ownership?',
        answer:
          'No. Landed cost stops at your receiving dock. Total cost of ownership also covers quality failures, inventory, supplier management, warranty and end-of-life costs over the life of the part.',
      },
      {
        question: 'Should GST or VAT be included in landed cost?',
        answer:
          'Only the portion you cannot recover. Recoverable input taxes affect working capital but not the final cost of the part.',
      },
      {
        question: 'How do Incoterms affect landed cost?',
        answer:
          'Incoterms set where responsibility for freight, insurance and risk passes from seller to buyer. An FOB quote and a DAP quote are not comparable until both are converted to the same delivered basis.',
      },
    ],
    links: [
      {
        href: '/case-studies/chassis-india-belgium',
        label: 'India vs Belgium: 38% landed-cost saving on HGV chassis rails',
        context: 'A real regional comparison showing how freight and duty change the sourcing answer.',
      },
      {
        href: '/strategic-sourcing-software',
        label: 'Strategic sourcing software',
        context: 'See how Emithran compares suppliers and regions on a delivered-cost basis.',
      },
      {
        href: '/blog/what-is-should-cost-analysis',
        label: 'What is should-cost analysis?',
        context: 'The pillar guide to estimating the ex-works price that landed cost is built on.',
      },
      {
        href: '/total-cost-ownership',
        label: 'Total cost of ownership guide',
        context: 'Extends landed cost to the full lifetime cost of a sourced part.',
      },
    ],
  },

  'dual sourcing': {
    summary:
      'Dual sourcing means qualifying two suppliers for the same part or process so that production can continue if one fails. It trades some purchasing leverage and qualification cost for supply continuity, and gives buyers a live price benchmark. It is common for critical parts where a single disruption would stop a programme.',
    sections: [
      {
        heading: 'How dual sourcing works in practice',
        paragraphs: [
          'Dual sourcing splits volume between two qualified suppliers, or keeps a second supplier qualified and ready. The split might be 70/30, 50/50 or a dormant backup that receives occasional orders to stay current.',
          'Each model has a different cost. An active split keeps both suppliers practised and gives continuous price comparison, but each supplier sees lower volume and may quote higher. A dormant backup is cheaper day to day, but takes longer to ramp when it is needed.',
        ],
        bullets: [
          'Active split: both suppliers produce continuously; fastest recovery, lower volume per supplier.',
          'Lead and follow: one main supplier, one smaller share held for continuity.',
          'Qualified standby: second source approved but ordered rarely; lowest running cost, slowest ramp.',
        ],
      },
      {
        heading: 'When dual sourcing is worth the cost',
        paragraphs: [
          'Dual sourcing is worth it when the cost of a line stoppage exceeds the extra cost of qualifying and running a second supplier. That is usually true for parts with long lead times, special processes, or no in-house fallback.',
          'It is rarely worth it for low-value commodity parts with many interchangeable suppliers, or for parts where tooling is so expensive that duplicating it outweighs the risk. In regulated sectors such as aerospace, the first-article and qualification effort for a second source is significant and should be planned, not improvised during a crisis.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: is a second source justified?',
      steps: [
        'A machined housing has annual spend of 500,000 with one supplier. A disruption would halt final assembly for an estimated six weeks.',
        'Estimated cost of a six-week stoppage, including expediting and late-delivery penalties: 900,000. Estimated probability of a disruption in a year: 10%. Expected annual loss: 90,000.',
        'Qualifying a second supplier costs 40,000 one-off; splitting volume adds an estimated 3% to unit prices, or 15,000 a year.',
      ],
      result:
        'Year-one cost of 55,000 is below the 90,000 expected loss, so dual sourcing is justified on these illustrative assumptions.',
    },
    india:
      'In India, dual sourcing is increasingly shaped by indigenisation goals. Defence procurement under DAP 2020 rewards indigenous content, so OEMs often add an Indian second source alongside an established overseas supplier. The challenge is qualification depth: for special processes and aerospace-grade materials, the pool of approved Indian suppliers is still growing, which makes supplier discovery and capability checks the first step.',
    faqs: [
      {
        question: 'What is the difference between dual sourcing and multi-sourcing?',
        answer:
          'Dual sourcing uses exactly two suppliers for a part. Multi-sourcing uses three or more, which is more common for commodity items with many capable suppliers.',
      },
      {
        question: 'Does dual sourcing always increase unit price?',
        answer:
          'Not always. Splitting volume can reduce scale discounts, but continuous competition between two suppliers often offsets that. Should-cost estimates help confirm both quotes are fair.',
      },
      {
        question: 'How long does qualifying a second source take?',
        answer:
          'It varies by scope. A simple commodity part may take weeks; an aerospace part needing first-article inspection and special-process approval can take many months.',
      },
    ],
    links: [
      {
        href: '/blog/single-source-vs-sole-source',
        label: 'Single-source vs sole-source',
        context: 'Explains the dependency that dual sourcing is designed to remove.',
      },
      {
        href: '/supplier-intelligence',
        label: 'Supplier intelligence',
        context: 'Search 72,000+ supplier records to find a credible second source.',
      },
      {
        href: '/blog/supplier-intelligence-guide',
        label: 'Supplier intelligence guide',
        context: 'How manufacturing teams assess supplier capability and risk before qualifying.',
      },
    ],
  },

  'single source risk': {
    summary:
      'Single source risk is the exposure a programme carries when only one supplier is qualified to make a part, even though other suppliers could in principle make it. If that supplier has a fire, quality escape, capacity squeeze or financial failure, production stops until an alternative is found and qualified.',
    formula: {
      expression: 'Expected annual exposure = Probability of disruption × (Weeks to recover × Cost per week of disruption)',
      variables: [
        { symbol: 'Probability of disruption', meaning: 'Estimated likelihood the supplier fails to deliver within a year' },
        { symbol: 'Weeks to recover', meaning: 'Time to find, qualify and ramp an alternative supplier' },
        { symbol: 'Cost per week of disruption', meaning: 'Lost margin, expediting, penalties and idle capacity per week' },
      ],
      note: 'A simple screening measure. It ranks parts for attention; it is not a precise forecast.',
    },
    sections: [
      {
        heading: 'Single source versus sole source',
        paragraphs: [
          'Single source is a choice; sole source is a constraint. A single-sourced part has other capable suppliers in the market but only one approved, while a sole-sourced part has only one supplier able to make it at all, for example because of proprietary technology.',
          'The distinction matters because the remedies differ. Single source risk can be reduced by qualifying a second supplier. Sole source risk usually needs design changes, buffer stock, long-term agreements or investment in a new capability.',
        ],
      },
      {
        heading: 'How to find and rank single source risk',
        paragraphs: [
          'Start from the BOM, not the supplier list. Flag every part with one approved supplier, then rank by recovery time and the cost of a stoppage.',
        ],
        bullets: [
          'Recovery time: tooling ownership, special processes and qualification steps all lengthen it.',
          'Supplier health: financial stability, capacity utilisation, delivery history and quality record.',
          'Concentration: several critical parts with the same supplier compound the exposure.',
          'Geography: regional events such as floods, power shortages or export controls.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: ranking two single-sourced parts',
      steps: [
        'Part A, a forged fitting: 8% estimated probability of disruption, 26 weeks to qualify an alternative, 40,000 cost per week. Exposure = 0.08 × 26 × 40,000 = 83,200.',
        'Part B, a cable assembly: 15% probability, 6 weeks to recover, 20,000 per week. Exposure = 0.15 × 6 × 20,000 = 18,000.',
      ],
      result:
        'Part A carries about 4.6 times the exposure of Part B despite a lower probability of failure, because recovery is slow. It should be first in line for a second source or a buffer stock decision.',
    },
    india:
      'Indian defence, space and aerospace programmes often carry single source risk because the domestic base of qualified suppliers for special processes, aerospace alloys and precision electronics is still developing. Indigenisation targets add pressure to replace imported single sources with Indian ones. Mapping which parts depend on one supplier, and which Indian suppliers have the right certifications and processes, is usually the first practical step.',
    faqs: [
      {
        question: 'Is single sourcing always bad?',
        answer:
          'No. It can lower price through volume and simplify quality control. The risk is acceptable when recovery is fast or the part is low impact.',
      },
      {
        question: 'How often should single source risk be reviewed?',
        answer:
          'At least annually, and whenever a supplier’s financial position, ownership, capacity or quality record changes.',
      },
      {
        question: 'What are alternatives to dual sourcing?',
        answer:
          'Buffer stock, owning the tooling, long-term supply agreements, design changes that widen the supplier pool, or keeping an in-house fallback.',
      },
    ],
    links: [
      {
        href: '/blog/single-source-vs-sole-source',
        label: 'Single-source vs sole-source: the real difference',
        context: 'The pillar explainer on the two kinds of supplier dependency.',
      },
      {
        href: '/supplier-intelligence',
        label: 'Supplier intelligence',
        context: 'Identify alternative suppliers by process, certification and region.',
      },
      {
        href: '/blog/supplier-discovery-software',
        label: 'Supplier discovery software',
        context: 'How discovery tools shorten the search for a qualified second source.',
      },
    ],
  },

  'supplier qualification': {
    summary:
      'Supplier qualification is the structured process of confirming that a supplier can consistently make a specific part to the required quality, quantity and schedule before it receives production orders. It covers certifications, process capability, capacity, financial health and a successful first article, and it ends with the supplier on the approved list for that scope.',
    sections: [
      {
        heading: 'The stages of supplier qualification',
        paragraphs: [
          'Qualification moves from paper checks to physical proof. Most teams screen documents first, then audit the site, then approve on the evidence of first-article parts.',
        ],
        bullets: [
          'Pre-screen: certifications such as ISO 9001, AS9100 or IATF 16949, special-process accreditations, and financial checks.',
          'Capability review: equipment list, process capability data, inspection resources and sub-tier control.',
          'Site audit: quality system, traceability, calibration, training and housekeeping.',
          'First article: a full dimensional and documentation check on the first production parts.',
          'Approval and monitoring: added to the approved supplier list for a defined scope, then tracked on a scorecard.',
        ],
      },
      {
        heading: 'Qualification is scoped, not general',
        paragraphs: [
          'A supplier is qualified for specific processes and parts, not for everything. A shop approved for aluminium machining is not automatically approved for titanium, or for heat treatment it subcontracts.',
          'Recording the scope precisely prevents a common failure: new parts being placed with an approved supplier whose approval does not cover the material, process or tolerance involved. In aerospace, approval scope also has to reflect customer-mandated special-process sources.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: weighted qualification score',
      steps: [
        'A buyer scores a candidate machining supplier out of 100 using weights of quality system 30, process capability 25, capacity 20, delivery history 15 and financial health 10.',
        'Scores achieved: quality 27, capability 20, capacity 18, delivery 10, financial 8. Total: 83.',
        'The team’s threshold for conditional approval is 75, and full approval requires a passed first article.',
      ],
      result:
        'The supplier is conditionally approved for aluminium machining only, with full approval pending a first-article inspection on the target part.',
    },
    india:
      'Indian OEMs sourcing for defence and aerospace often qualify suppliers against both customer requirements and national bodies; military airworthiness in India involves agencies such as CEMILAC and DGAQA. For suppliers serving global primes, AS9100 certification and NADCAP accreditation for special processes are frequent prerequisites. Many capable Indian MSMEs are not well documented online, so discovery and capability verification take real effort.',
    faqs: [
      {
        question: 'What is the difference between supplier qualification and supplier evaluation?',
        answer:
          'Qualification is the one-time approval to supply a defined scope. Evaluation is the ongoing measurement of quality, cost and delivery after approval.',
      },
      {
        question: 'How long does supplier qualification take?',
        answer:
          'It varies by scope. A low-risk commodity part may take weeks; aerospace parts with special processes and first-article inspection can take several months.',
      },
      {
        question: 'Can a supplier lose qualified status?',
        answer:
          'Yes. Repeated quality escapes, lapsed certifications or unapproved process changes are common reasons for suspension or removal from the approved list.',
      },
    ],
    links: [
      {
        href: '/blog/aerospace-supplier-qualification-checklist',
        label: 'AS9100 supplier qualification checklist',
        context: 'The pillar checklist procurement teams use to qualify aerospace suppliers.',
      },
      {
        href: '/srm-software',
        label: 'SRM software for manufacturing suppliers',
        context: 'Track qualification status, scope and performance in one place.',
      },
      {
        href: '/downloads/aerospace-supplier-qualification-checklist.pdf',
        label: 'Download the supplier qualification checklist (PDF)',
        context: 'A printable version of the checklist for audits and supplier visits.',
      },
    ],
  },

  'cost breakdown analysis': {
    summary:
      'Cost breakdown analysis splits a part’s price into its building blocks: material, conversion (machine and labour), overhead, tooling, logistics, and supplier margin. It shows where the money goes, so buyers can compare a quote line by line against a should-cost estimate and challenge the elements that look out of line.',
    formula: {
      expression: 'Price = Material + Conversion + Overhead + Tooling share + Logistics + Profit',
      variables: [
        { symbol: 'Material', meaning: 'Gross material weight × price per kg, less scrap credit' },
        { symbol: 'Conversion', meaning: 'Process time × machine hour rate, plus direct labour' },
        { symbol: 'Overhead', meaning: 'Plant, quality, engineering and SG&A costs allocated to the part' },
        { symbol: 'Tooling share', meaning: 'Amortised tooling cost per part' },
        { symbol: 'Profit', meaning: 'Supplier margin, usually a percentage of cost' },
      ],
    },
    sections: [
      {
        heading: 'Why a breakdown beats a single price',
        paragraphs: [
          'A single price hides the cause of a cost gap; a breakdown exposes it. Two quotes at the same price can have very different structures, one heavy in material and another heavy in overhead.',
          'Once a price is broken down, each line can be tested against a reference: commodity indices for material, machine hour rates for conversion, and benchmarks for overhead and margin. The conversation with the supplier then becomes specific.',
        ],
      },
      {
        heading: 'Where breakdowns go wrong',
        paragraphs: [
          'The most common errors are inconsistent definitions. If one supplier puts setup in overhead and another in conversion, line-by-line comparison misleads.',
        ],
        bullets: [
          'Use net versus gross material weight consistently, and account for scrap value.',
          'Separate one-off tooling from recurring part cost.',
          'State the volume and batch size each breakdown assumes.',
          'Keep logistics outside the ex-works price so landed costs compare cleanly.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: comparing a quote to a should-cost breakdown',
      steps: [
        'Supplier quote for a machined aluminium bracket: 42.00 per unit, with a breakdown of material 9.00, conversion 18.00, overhead 8.00, profit 7.00.',
        'Should-cost estimate: material 8.50, conversion 13.50, overhead 6.50, profit 3.42 (12% of cost). Total 31.92.',
        'The largest gap is conversion: 4.50 per unit. Reviewing the routing shows the supplier assumed a 3-axis machine with two extra setups.',
      ],
      result:
        'The buyer opens the negotiation on cycle time and setups rather than asking for a blanket discount, a gap of about 24% between quote and should-cost.',
    },
    india:
      'In Indian supply chains, cost breakdowns are common in automotive sourcing and increasingly requested in defence and aerospace. Material is often priced against domestic steel and aluminium producers’ lists, while imported alloys carry exchange-rate and duty components that should be shown separately. Lower labour rates shift the balance toward material and machine cost, so machine hour rates deserve the closest scrutiny.',
    faqs: [
      {
        question: 'Will suppliers share a cost breakdown?',
        answer:
          'Many will when it is a condition of the RFQ, especially in automotive. Where they will not, a should-cost model gives the buyer an independent breakdown.',
      },
      {
        question: 'What is the difference between a cost breakdown and a should-cost?',
        answer:
          'A cost breakdown describes a price someone has quoted. A should-cost estimates what the part ought to cost from first principles. Comparing the two shows the negotiable gap.',
      },
      {
        question: 'How detailed should a breakdown be?',
        answer:
          'Detailed enough to test each driver: material weight and grade, each operation’s time and rate, tooling, overhead and margin.',
      },
    ],
    links: [
      {
        href: '/blog/cost-breakdown-analysis',
        label: 'Cost breakdown analysis guide',
        context: 'The pillar guide to analysing manufacturing costs line by line.',
      },
      {
        href: '/should-cost-analysis-software',
        label: 'Should-cost analysis software',
        context: 'Generate an independent breakdown to compare against supplier quotes.',
      },
      {
        href: '/downloads/cost-breakdown-template.csv',
        label: 'Cost breakdown template (CSV)',
        context: 'A ready-made structure for collecting consistent supplier breakdowns.',
      },
    ],
  },

  'manufacturing cost estimation': {
    summary:
      'Manufacturing cost estimation predicts what a part or assembly will cost to make before it is quoted or produced. Estimators use analogous, parametric or bottom-up methods, combining material, process time, labour, overhead and tooling assumptions. Good estimates guide design choices early and give procurement an independent reference when quotes arrive.',
    sections: [
      {
        heading: 'The main estimation methods',
        paragraphs: [
          'The right method depends on how much design data exists. Early concepts suit analogous and parametric methods; released drawings suit bottom-up estimates.',
        ],
        bullets: [
          'Analogous: scale the cost of a similar past part. Fast, but only as good as the reference.',
          'Parametric: use cost estimating relationships, such as cost per kg or per feature, fitted to historical data.',
          'Bottom-up (engineering): model each operation’s time and rate, plus material and tooling. Slowest, most defensible.',
          'Machine learning: predict cost from geometry and attributes trained on past quotes; useful at scale when data is clean.',
        ],
      },
      {
        heading: 'What makes an estimate reliable',
        paragraphs: [
          'Reliable estimates state their assumptions. Volume, batch size, material grade, tolerances, region and the supplier’s likely equipment all change the answer.',
          'Accuracy should improve as the design matures. Estimates at concept stage carry wide ranges; estimates on a released drawing should be close enough to challenge a quote. Comparing estimates with actual quotes over time is the simplest way to calibrate.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: bottom-up estimate for a turned steel shaft',
      steps: [
        'Material: 1.2 kg bar at 1.50 per kg = 1.80.',
        'Turning: 6 minutes at a machine hour rate of 30 per hour = 3.00. Grinding: 3 minutes at 36 per hour = 1.80.',
        'Setup: 60 minutes at 30 per hour over a batch of 200 = 0.15.',
        'Subtotal 6.75; overhead at 15% = 1.01; profit at 10% = 0.78.',
      ],
      result: 'Estimated price about 8.54 per unit, built from assumptions a buyer can check and a supplier can dispute line by line.',
    },
    india:
      'Indian manufacturers often estimate cost in spreadsheets maintained by a few experienced engineers, which makes estimates hard to audit and slow to update when steel or aluminium prices move. Regional differences matter: machine hour rates, power tariffs and labour costs vary across clusters such as Pune, Chennai, Bengaluru and Coimbatore. For export programmes, estimates should be built for the target region rather than assumed from Indian rates.',
    faqs: [
      {
        question: 'How accurate is manufacturing cost estimation?',
        answer:
          'It depends on method and design maturity. Concept-stage estimates carry wide ranges; bottom-up estimates on released drawings can be close enough to negotiate with.',
      },
      {
        question: 'Who does cost estimation in a manufacturing company?',
        answer:
          'Usually cost engineers or estimators, working with design engineering and procurement. In smaller firms, manufacturing engineers often do it alongside other work.',
      },
      {
        question: 'Is should-cost the same as cost estimation?',
        answer:
          'Should-cost is a type of cost estimate used for sourcing: it estimates what an efficient supplier ought to charge, including a fair margin.',
      },
    ],
    links: [
      {
        href: '/blog/manufacturing-cost-estimation-methods',
        label: 'Manufacturing cost estimation: every method',
        context: 'The pillar guide comparing analogous, parametric, bottom-up and ML methods.',
      },
      {
        href: '/cost-engineering-software',
        label: 'Cost engineering software',
        context: 'Run estimates against a library of 500+ manufacturing processes.',
      },
      {
        href: '/blog/bottom-up-cost-estimating',
        label: 'Bottom-up cost estimating',
        context: 'A deeper look at the most defensible estimation method.',
      },
    ],
  },

  'direct and indirect manufacturing costs': {
    summary:
      'Direct manufacturing costs can be traced to a specific part: raw material, purchased components and the labour that works on it. Indirect costs, or manufacturing overhead, support production generally: supervision, maintenance, utilities, depreciation and quality staff. Indirect costs are allocated to parts using a driver such as machine hours or labour hours.',
    formula: {
      expression: 'Total manufacturing cost = Direct materials + Direct labour + Manufacturing overhead',
      variables: [
        { symbol: 'Direct materials', meaning: 'Raw material and bought-in components consumed by the part' },
        { symbol: 'Direct labour', meaning: 'Wages of operators working directly on the part' },
        { symbol: 'Manufacturing overhead', meaning: 'Indirect production costs allocated using a driver such as machine hours' },
      ],
      note: 'Selling, general and administrative costs sit outside manufacturing cost but are part of a supplier’s price.',
    },
    sections: [
      {
        heading: 'Telling direct and indirect costs apart',
        paragraphs: [
          'The test is traceability. If a cost can be measured against one part economically, it is direct; if it is shared across many parts, it is indirect.',
        ],
        bullets: [
          'Direct: bar stock, castings, fasteners, operator time on the machine, part-specific outside processing.',
          'Indirect: shop supervision, maintenance, cutting fluids, utilities, building depreciation, inspection staff.',
          'Grey areas: setup labour and consumable tooling are treated differently by different companies; be consistent.',
        ],
      },
      {
        heading: 'Why allocation choices change part cost',
        paragraphs: [
          'Overhead allocation can move cost between parts without changing the total. Allocating by labour hours penalises manual parts; allocating by machine hours penalises long-cycle machined parts.',
          'In automated plants, labour is a small share of cost, so labour-based allocation distorts part costs badly. Machine hour rates that include depreciation, power and maintenance usually give a fairer picture for machining and fabrication.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: costing a machined part',
      steps: [
        'Direct material: 12.00. Direct labour: 0.5 hours at 8.00 per hour = 4.00.',
        'Plant overhead of 600,000 a year is allocated over 40,000 machine hours: 15.00 per machine hour.',
        'The part uses 0.8 machine hours: overhead = 12.00.',
      ],
      result:
        'Total manufacturing cost = 12.00 + 4.00 + 12.00 = 28.00. Overhead is as large as material, which is typical for machined parts and why machine hour rates deserve scrutiny.',
    },
    india:
      'In Indian plants, direct labour is often a smaller share of part cost than in Western Europe or North America, while imported machines, power and financing costs weigh more heavily in overhead. That makes the overhead allocation method especially important when comparing Indian and overseas quotes. Overhead rates based on labour hours can understate the true cost of capital-intensive operations.',
    faqs: [
      {
        question: 'Is electricity a direct or indirect cost?',
        answer:
          'Usually indirect, recovered through the machine hour rate. Where a process is power-intensive and metered, such as heat treatment, it may be treated as direct.',
      },
      {
        question: 'Are indirect costs the same as fixed costs?',
        answer:
          'No. Direct versus indirect is about traceability; fixed versus variable is about how cost changes with volume. Overhead contains both fixed and variable items.',
      },
      {
        question: 'Why does this matter to procurement?',
        answer:
          'Supplier quotes recover overhead through their rates. Knowing how overhead is built helps buyers judge whether a machine hour rate or overhead percentage is reasonable.',
      },
    ],
    links: [
      {
        href: '/blog/direct-vs-indirect-manufacturing-costs',
        label: 'Direct vs indirect manufacturing costs',
        context: 'The pillar guide with definitions, examples and formulas.',
      },
      {
        href: '/cost-engineering-software',
        label: 'Cost engineering software',
        context: 'Model material, labour and overhead consistently across parts and suppliers.',
      },
      {
        href: '/blog/machine-hour-rate-calculation',
        label: 'How to calculate machine hour rate',
        context: 'The main tool for allocating overhead to machined and fabricated parts.',
      },
    ],
  },

  'CNC machining cost': {
    summary:
      'CNC machining cost is the price of producing a part by removing material on computer-controlled mills, lathes or machining centres. It is driven by material, cycle time multiplied by the machine hour rate, setup time spread over the batch, and finishing and inspection. Tight tolerances, hard alloys and complex geometry raise it fastest.',
    formula: {
      expression: 'Cost per part = Material + (Cycle time × Machine hour rate) + (Setup time × Machine hour rate ÷ Batch size) + Finishing + Inspection',
      variables: [
        { symbol: 'Material', meaning: 'Stock or billet weight × price per kg, less any scrap credit' },
        { symbol: 'Cycle time', meaning: 'Machining time per part, including tool changes and handling' },
        { symbol: 'Machine hour rate', meaning: 'Hourly cost of the machine including depreciation, power, maintenance and operator' },
        { symbol: 'Batch size', meaning: 'Number of parts produced per setup' },
      ],
      note: 'Overhead and margin are added on top of this manufacturing cost to reach a quoted price.',
    },
    sections: [
      {
        heading: 'What drives CNC machining cost',
        paragraphs: [
          'Cycle time and machine rate dominate for most machined parts. Material matters more for expensive alloys and for parts where most of the billet is cut away.',
        ],
        bullets: [
          'Material: titanium and nickel alloys cost more per kg and machine more slowly than aluminium.',
          'Removal volume: a high stock-to-finished ratio means long roughing time and expensive scrap.',
          'Tolerances and finish: tighter limits add finishing passes, slower feeds and inspection time.',
          'Setups: each re-clamp adds setup time and error risk; 5-axis machines can reduce setups at a higher hourly rate.',
          'Batch size: small batches carry a larger share of setup and programming per part.',
        ],
      },
      {
        heading: 'Using CNC cost models in sourcing',
        paragraphs: [
          'A CNC should-cost model lets buyers test a quote against a credible routing. If the supplier’s implied cycle time is far above the estimate, the gap usually comes from machine choice, extra setups or conservative cutting parameters.',
          'The same model helps engineers. Relaxing a non-functional tolerance or changing a deep pocket can cut more cost than any negotiation.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: aluminium housing on a 3-axis mill',
      steps: [
        'Material: 2.0 kg billet at 4.00 per kg = 8.00.',
        'Cycle time: 24 minutes at a machine hour rate of 40 per hour = 16.00.',
        'Setup: 90 minutes at 40 per hour = 60.00, spread over a batch of 50 = 1.20 per part.',
        'Anodising 3.00; inspection 1.50.',
      ],
      result: 'Manufacturing cost about 29.70 per part. Cycle time is over half the cost, so routing and tolerances are the first places to look.',
    },
    india:
      'India has large CNC machining clusters in Bengaluru, Pune, Coimbatore, Hyderabad and the NCR, serving automotive, aerospace and defence customers. Machine hour rates are generally lower than in Western Europe, but many 5-axis machines and cutting tools are imported, so depreciation and tooling form a larger share of the rate. For aerospace work, buyers also check AS9100 certification and material traceability.',
    faqs: [
      {
        question: 'Why is titanium so expensive to machine?',
        answer:
          'Titanium is costly per kg, and it must be cut at lower speeds with more tool wear, which raises cycle time and tooling cost per part.',
      },
      {
        question: 'Is 5-axis machining always more expensive?',
        answer:
          'The hourly rate is higher, but fewer setups and shorter total time can make the part cheaper for complex geometry.',
      },
      {
        question: 'How does batch size change CNC cost?',
        answer:
          'Setup and programming are spread across the batch, so small batches carry a much higher fixed cost per part.',
      },
      {
        question: 'What is a typical machine hour rate?',
        answer:
          'It varies by machine type, region and utilisation. Build it from depreciation, power, maintenance, floor space and labour rather than relying on a generic figure.',
      },
    ],
    links: [
      {
        href: '/blog/cnc-machining-cost-estimation',
        label: 'Should-cost for CNC machined parts: a worked example',
        context: 'The pillar walk-through of a full CNC should-cost model.',
      },
      {
        href: '/should-cost-analysis-software',
        label: 'Should-cost analysis software',
        context: 'Estimate machining cost from routing, material and region.',
      },
      {
        href: '/downloads/machined-part-costing-template.csv',
        label: 'Machined part costing template (CSV)',
        context: 'Structure your own CNC estimates using the same cost elements.',
      },
      {
        href: '/blog/titanium-inconel-machining-cost',
        label: 'Machining cost drivers for titanium and Inconel',
        context: 'Why aerospace alloys change every term in the CNC cost formula.',
      },
    ],
  },

  'sheet metal costing': {
    summary:
      'Sheet metal costing estimates the price of parts cut, punched, bent and joined from flat sheet. Cost comes from the blank’s material (including nesting scrap), cutting time, the number of bends, secondary operations such as welding or inserts, finishing, and setup spread over the batch. Material and bend count usually dominate.',
    formula: {
      expression: 'Cost per part = (Blank area × Thickness × Density × Price per kg ÷ Nesting yield) + Cutting time × Rate + Bends × Time per bend × Rate + Secondary ops + Finishing + Setup ÷ Batch',
      variables: [
        { symbol: 'Blank area', meaning: 'Flat-pattern area of the part' },
        { symbol: 'Nesting yield', meaning: 'Share of the sheet used by parts, after skeleton and offcut scrap' },
        { symbol: 'Cutting time', meaning: 'Laser, plasma or punch time, driven by cut length and pierce count' },
        { symbol: 'Rate', meaning: 'Machine hour rate for the cutting or press brake cell' },
      ],
    },
    sections: [
      {
        heading: 'The cost drivers in sheet metal',
        paragraphs: [
          'Material and handling operations drive most sheet metal cost. Cutting is fast on modern lasers, so the number of bends, part handling and secondary operations often matter more than cut length.',
        ],
        bullets: [
          'Material grade and thickness: stainless and aluminium cost more per kg than mild steel.',
          'Nesting yield: awkward shapes waste sheet; common-line cutting and mixed nests recover it.',
          'Bends: each bend adds press brake time; flips and tool changes add more.',
          'Secondary operations: welding, PEM inserts, tapping and deburring.',
          'Finishing: powder coating, plating or passivation, often priced by area.',
        ],
      },
      {
        heading: 'Design choices that change sheet metal cost',
        paragraphs: [
          'Most sheet metal savings come from design, not negotiation. Standard bend radii, consistent flange lengths and fewer separate parts reduce tooling changes and welding.',
          'Replacing a welded assembly with a single bent part, or replacing machined brackets with formed ones, can reduce cost substantially. A sheet metal cost model makes these trade-offs visible before drawings are released.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: mild steel enclosure panel',
      steps: [
        'Blank 0.30 m² × 2 mm × 7,850 kg/m³ = 4.71 kg. At 1.00 per kg and 80% nesting yield: 5.89.',
        'Laser cutting: 2 minutes at 60 per hour = 2.00.',
        'Four bends at 0.5 minutes each on a press brake at 36 per hour = 1.20.',
        'Powder coat 2.50; setup 1.00 per part on a batch of 100.',
      ],
      result: 'Manufacturing cost about 12.59 per part. Material is nearly half the cost, so blank size and nesting are the first levers.',
    },
    india:
      'India’s sheet metal supply base is concentrated around automotive and electrical clusters in Pune, Chennai, the NCR and Gujarat. Mild steel and stainless prices follow domestic mill price lists, which move with global steel markets, so models need regular material updates. Many fabricators offer laser cutting, bending and powder coating under one roof, which can lower logistics cost between operations.',
    faqs: [
      {
        question: 'Is laser cutting or punching cheaper?',
        answer:
          'Punching is often cheaper at high volumes for parts with many standard holes. Laser cutting suits lower volumes and complex profiles without dedicated tools.',
      },
      {
        question: 'How do I reduce sheet metal part cost?',
        answer:
          'Reduce blank size, standardise bend radii, cut the number of bends and welds, and choose finishes that match the real environment.',
      },
      {
        question: 'Does thickness affect cost beyond material?',
        answer:
          'Yes. Thicker sheet cuts more slowly, needs higher-tonnage brakes and may need different tooling.',
      },
    ],
    links: [
      {
        href: '/blog/sheet-metal-cost-estimation',
        label: 'Sheet metal cost estimation',
        context: 'The pillar guide to pricing laser-cut and bent parts.',
      },
      {
        href: '/should-cost-analysis-software',
        label: 'Should-cost analysis software',
        context: 'Estimate sheet metal cost from geometry, material and process.',
      },
      {
        href: '/downloads/sheet-metal-costing-template.csv',
        label: 'Sheet metal costing template (CSV)',
        context: 'A ready structure for blank, cutting, bending and finishing cost.',
      },
    ],
  },

  'tooling amortisation': {
    summary:
      'Tooling amortisation spreads the one-off cost of part-specific tools, such as injection moulds, die-casting dies, press tools and fixtures, across the number of parts expected over the tool’s life or the contract. The result is a per-part tooling charge that is added to the piece price instead of paid upfront.',
    formula: {
      expression: 'Tooling cost per part = Tooling cost ÷ Amortisation volume (plus financing cost if the supplier funds the tool)',
      variables: [
        { symbol: 'Tooling cost', meaning: 'Design, build and trial cost of the part-specific tool' },
        { symbol: 'Amortisation volume', meaning: 'Parts over which the cost is recovered: contract volume or tool life, whichever is lower' },
        { symbol: 'Financing cost', meaning: 'Interest the supplier charges for carrying the tooling investment' },
      ],
    },
    sections: [
      {
        heading: 'Paying upfront versus amortising',
        paragraphs: [
          'Paying upfront gives the buyer clear ownership; amortising preserves cash but adds risk. When tooling is built into the piece price, the supplier recovers it only if forecast volumes are reached.',
          'If volumes fall short, the supplier may ask for a true-up payment. If volumes exceed the plan, the buyer keeps paying for a tool that is already paid off. Contracts should state the amortisation volume, what happens at that volume, and who owns the tool.',
        ],
      },
      {
        heading: 'Checking tooling charges in a quote',
        paragraphs: [
          'Ask for tooling to be quoted separately from the piece price. That makes it possible to test both against should-cost estimates.',
        ],
        bullets: [
          'Confirm the amortisation volume matches the programme forecast.',
          'Check whether tool maintenance and refurbishment are included.',
          'Agree who owns the tool and whether it can be moved to another supplier.',
          'Remove the tooling element from the piece price once the volume is reached.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: injection mould amortised into piece price',
      steps: [
        'Mould cost: 60,000. Contract volume: 200,000 parts over three years.',
        'Simple amortisation: 60,000 ÷ 200,000 = 0.30 per part.',
        'The supplier adds financing at roughly 0.03 per part for carrying the investment: 0.33 per part.',
        'Actual demand reaches only 120,000 parts, recovering 36,000 of the tooling cost through the piece price.',
      ],
      result:
        'Without a true-up clause, the supplier is short by 24,000 plus financing. With one, the buyer pays the balance. Either way, the amortisation volume needs to be realistic from the start.',
    },
    india:
      'Tool rooms in India, including clusters in Pune, Chennai, Bengaluru and Rajkot, build moulds, dies and press tools for domestic and export customers, often at lower cost than imported tooling. Buyers should still check steel grade, expected tool life and maintenance terms, since a cheaper tool that wears early raises the real cost per part. Tool ownership and GST treatment should be agreed in writing before the tool is built.',
    faqs: [
      {
        question: 'Who owns amortised tooling?',
        answer:
          'Whoever the contract says. Typically the buyer owns it once fully paid, but this must be written down, or moving the tool to another supplier becomes a dispute.',
      },
      {
        question: 'What volume should tooling be amortised over?',
        answer:
          'The lower of the realistic programme volume and the tool’s expected life. Using optimistic forecasts understates the per-part charge.',
      },
      {
        question: 'Is tooling amortisation the same as depreciation?',
        answer:
          'They are related. Depreciation is an accounting treatment of an asset; tooling amortisation in sourcing is a pricing mechanism that recovers tool cost through part prices.',
      },
    ],
    links: [
      {
        href: '/blog/total-manufacturing-cost-formula',
        label: 'Total manufacturing cost formula',
        context: 'Shows where amortised tooling sits within total part cost.',
      },
      {
        href: '/cost-engineering-software',
        label: 'Cost engineering software',
        context: 'Model tooling and piece price separately and test amortisation volumes.',
      },
      {
        href: '/blog/manufacturing-cost-drivers',
        label: 'Manufacturing cost drivers',
        context: 'How volume and tooling interact with the other variables that set part cost.',
      },
    ],
  },

  NADCAP: {
    summary:
      'NADCAP (National Aerospace and Defense Contractors Accreditation Program) is an industry-managed accreditation for special processes such as heat treating, chemical processing, non-destructive testing, welding and coatings. It is administered by the Performance Review Institute (PRI), and many aerospace primes require it of suppliers performing those processes.',
    sections: [
      {
        heading: 'What NADCAP covers and how it works',
        paragraphs: [
          'NADCAP accredits processes, not whole companies. A supplier may be accredited for heat treatment and NDT but not for welding, and buyers need to check the specific commodity and scope.',
          'Process standards are set by industry task groups that include aerospace primes and suppliers. PRI schedules audits by technical auditors who are specialists in the process, and findings must be closed before accreditation is granted. Accreditation is time-limited and renewed by re-audit; suppliers with a strong record can earn longer intervals through PRI’s merit approach.',
        ],
        bullets: [
          'Common commodities: heat treating, chemical processing, NDT, welding, coatings, composites, materials testing laboratories.',
          'Audits check compliance with industry checklists and the customer’s own specifications.',
          'Accreditation status is visible to subscribing primes through PRI’s systems.',
        ],
      },
      {
        heading: 'NADCAP and AS9100 are complementary',
        paragraphs: [
          'AS9100 certifies a quality management system; NADCAP accredits the technical control of a special process. Many aerospace suppliers need both: AS9100 for the business and NADCAP for each special process they perform.',
          'For procurement, NADCAP status affects both qualification and cost. A shop without the required accreditation may subcontract the process, which adds logistics, lead time and margin to the part.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: checking special-process coverage on a routing',
      steps: [
        'A machined titanium fitting routing includes machining, heat treatment, fluorescent penetrant inspection and anodising.',
        'The candidate supplier holds AS9100 and NADCAP accreditation for heat treating only.',
        'Penetrant inspection and anodising must go to accredited sub-tier suppliers approved by the customer.',
      ],
      result:
        'The buyer adds two subcontract steps to the should-cost model, including transport and sub-tier margin, and confirms each sub-tier holds the right NADCAP scope before approving the routing.',
    },
    india:
      'Indian suppliers serving global aerospace primes increasingly hold NADCAP accreditation for processes such as heat treatment, NDT and chemical processing, particularly in Bengaluru, Hyderabad and other aerospace clusters. For Indian military programmes, buyers may also need to satisfy national requirements administered through bodies such as CEMILAC and DGAQA. Checking accreditation scope, rather than assuming it, is a core step in Indian aerospace supplier qualification.',
    faqs: [
      {
        question: 'Who runs NADCAP?',
        answer:
          'The Performance Review Institute (PRI), a not-for-profit organisation, administers NADCAP on behalf of the aerospace and defence industry.',
      },
      {
        question: 'Is NADCAP mandatory?',
        answer:
          'It is not a legal requirement, but many aerospace primes require it in purchase orders and supplier manuals for special processes.',
      },
      {
        question: 'How long does NADCAP accreditation take?',
        answer:
          'It varies by scope, the number of commodities and how many audit findings need to be closed. First-time accreditation usually takes months of preparation.',
      },
      {
        question: 'Does NADCAP replace AS9100?',
        answer:
          'No. AS9100 covers the quality management system; NADCAP covers specific special processes. Many suppliers need both.',
      },
    ],
    links: [
      {
        href: '/blog/nadcap-accreditation-explained',
        label: 'NADCAP accreditation explained for aerospace buyers',
        context: 'The pillar guide to NADCAP commodities, audits and supplier checks.',
      },
      {
        href: '/aerospace-manufacturing-software',
        label: 'Aerospace manufacturing software',
        context: 'See how Emithran supports aerospace costing and supplier qualification.',
      },
      {
        href: '/blog/aerospace-supplier-qualification-checklist',
        label: 'AS9100 supplier qualification checklist',
        context: 'Where NADCAP checks fit within a wider supplier qualification.',
      },
    ],
  },

  AS9100: {
    summary:
      'AS9100 is the quality management system standard for aviation, space and defence organisations. It includes all of ISO 9001 and adds requirements for product safety, configuration management, risk, counterfeit parts prevention, first-article inspection and on-time delivery. It is published by SAE International on behalf of the International Aerospace Quality Group (IAQG).',
    sections: [
      {
        heading: 'What AS9100 adds to ISO 9001',
        paragraphs: [
          'AS9100 keeps the ISO 9001 structure and adds aerospace-specific controls. The additions focus on safety, traceability and preventing escapes that matter in flight hardware.',
        ],
        bullets: [
          'Product safety and configuration management.',
          'Operational risk management and special requirements identified by the customer.',
          'Prevention of counterfeit parts and control of foreign object damage.',
          'First-article inspection and control of special processes.',
          'Measurement of on-time delivery and product conformity.',
        ],
      },
      {
        heading: 'The 9100 family and certification',
        paragraphs: [
          'AS9100 is one of a family of IAQG standards. The same requirements are issued as EN 9100 in Europe and JISQ 9100 in Japan, and related standards cover distributors (AS9120) and maintenance organisations (AS9110).',
          'Certification is issued by accredited certification bodies under the IAQG scheme, and certified organisations are listed in the IAQG’s OASIS database, which buyers can use to confirm status and scope. The current revision is AS9100D; buyers should check that certificates are current and cover the relevant site and scope.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: screening suppliers for an aerospace RFQ',
      steps: [
        'A buyer shortlists eight machining suppliers for a flight-critical bracket.',
        'Five hold ISO 9001 only; three hold AS9100. Of those three, one certificate covers a different site from the one quoting.',
        'The two eligible suppliers are checked for NADCAP coverage of the anodising and penetrant inspection steps.',
      ],
      result:
        'Two suppliers go forward to quotation. Checking AS9100 scope early avoids spending engineering time on quotes that cannot be accepted.',
    },
    india:
      'In India, AS9100 is a common entry requirement for suppliers to global aerospace primes, and is increasingly expected for space and defence work. Many Indian machining, fabrication and electronics suppliers are adding AS9100 to an existing ISO 9001 system. For military programmes, national requirements through bodies such as CEMILAC and DGAQA may apply in addition. Effort and timeline vary by scope and the maturity of the existing quality system.',
    faqs: [
      {
        question: 'Who publishes AS9100?',
        answer:
          'SAE International publishes AS9100 on behalf of the International Aerospace Quality Group (IAQG), which develops the 9100 series.',
      },
      {
        question: 'Is AS9100 the same as ISO 9001?',
        answer:
          'No. AS9100 contains ISO 9001 in full and adds aerospace, space and defence requirements.',
      },
      {
        question: 'How can I verify a supplier’s AS9100 certificate?',
        answer:
          'Check the IAQG OASIS database and confirm the certificate is current and covers the site and scope that will make your part.',
      },
      {
        question: 'Does AS9100 cover special processes such as heat treatment?',
        answer:
          'It requires control of special processes, but many primes also require NADCAP accreditation for those processes.',
      },
    ],
    links: [
      {
        href: '/blog/as9100-vs-iso-9001',
        label: 'AS9100 vs ISO 9001',
        context: 'The pillar comparison of what changes for procurement teams.',
      },
      {
        href: '/aerospace-manufacturing-software',
        label: 'Aerospace manufacturing software',
        context: 'Cost and supplier tools built for aerospace programmes.',
      },
      {
        href: '/downloads/aerospace-supplier-qualification-checklist.pdf',
        label: 'Aerospace supplier qualification checklist (PDF)',
        context: 'Includes AS9100 and special-process checks for supplier audits.',
      },
    ],
  },

  'make vs buy': {
    summary:
      'Make vs buy is the decision whether to produce a part or process in-house or source it from a supplier. It compares the full incremental cost of making against the landed cost of buying, then weighs capacity, capability, IP protection, quality control and supply risk. Cost alone rarely settles it.',
    formula: {
      expression: 'Make if: (Variable cost to make + Avoidable fixed cost ÷ Volume) < Landed cost to buy',
      variables: [
        { symbol: 'Variable cost to make', meaning: 'Material, direct labour, consumables and power per part' },
        { symbol: 'Avoidable fixed cost', meaning: 'Fixed costs that exist only if you make the part: new equipment, tooling, extra staff' },
        { symbol: 'Volume', meaning: 'Parts over the decision horizon' },
        { symbol: 'Landed cost to buy', meaning: 'Supplier price plus freight, duty, inspection and supplier management' },
      ],
      note: 'Exclude fixed overhead that continues whichever option you choose; including it biases the result toward buying.',
    },
    sections: [
      {
        heading: 'Beyond cost: the strategic factors',
        paragraphs: [
          'Make vs buy is a strategic decision supported by cost, not the reverse. A part that is cheaper to buy may still be made in-house to protect know-how or control a critical process.',
        ],
        bullets: [
          'Core capability: keep processes that differentiate your product.',
          'Capacity: buying frees in-house capacity for higher-value work.',
          'IP and export control: some designs should not leave the building.',
          'Supply risk: a sole external source can create single source risk.',
          'Quality: in-house control may matter for safety-critical parts.',
        ],
      },
      {
        heading: 'Getting the cost comparison right',
        paragraphs: [
          'The usual error is comparing a supplier price with a fully loaded internal cost. Only costs that change with the decision belong in the comparison.',
          'A should-cost model of the bought part helps in two ways: it shows whether the supplier’s price is fair, and it gives a like-for-like routing to compare with your own plant’s costs.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: in-house machining or outsource',
      steps: [
        'Volume: 10,000 parts a year. Supplier landed cost: 22.00 per part.',
        'In-house variable cost: 14.00 per part. A new machine and fixtures add avoidable fixed cost of 90,000 a year including depreciation and an extra operator.',
        'Make cost = 14.00 + 90,000 ÷ 10,000 = 23.00 per part.',
      ],
      result:
        'On cost alone, buying is cheaper by 1.00 per part. At 15,000 parts a year the make cost falls to 20.00, so the decision flips; the break-even is 11,250 parts.',
    },
    india:
      'For Indian manufacturers, make vs buy often turns on capital cost and capability rather than labour. Imported machines, financing and utilisation risk raise the avoidable fixed cost of making, while a deep MSME supplier base can make buying attractive. In defence, indigenous content requirements under DAP 2020 may favour making or buying within India over importing, which changes the options considered.',
    faqs: [
      {
        question: 'What costs should be excluded from a make vs buy analysis?',
        answer:
          'Sunk costs and fixed overhead that will continue whatever you decide, such as existing building costs or management salaries.',
      },
      {
        question: 'How often should make vs buy decisions be reviewed?',
        answer:
          'Whenever volumes, supplier prices, capacity or strategy change materially, and at least at major programme milestones.',
      },
      {
        question: 'Can a company both make and buy the same part?',
        answer:
          'Yes. Some firms make base volume in-house and buy peaks from a supplier, which also provides a dual-source fallback.',
      },
    ],
    links: [
      {
        href: '/blog/make-vs-buy-analysis',
        label: 'Make-vs-buy analysis: a decision framework',
        context: 'The pillar guide with a full framework and worked examples.',
      },
      {
        href: '/should-cost-analysis-software',
        label: 'Should-cost analysis software',
        context: 'Estimate the fair external price to compare with your internal cost.',
      },
      {
        href: '/downloads/make-vs-buy-worksheet.csv',
        label: 'Make-vs-buy worksheet (CSV)',
        context: 'Lay out incremental costs and break-even volume for your own decision.',
      },
      {
        href: '/case-studies/hgv-cab-strategy',
        label: 'HGV cab structure: six manufacturing approaches benchmarked',
        context: 'A case study comparing manufacturing routes for one structure.',
      },
    ],
  },

  'teardown analysis': {
    summary:
      'Teardown analysis is the disassembly of a product, yours or a competitor’s, to document every component, material and manufacturing process and estimate what each part costs. It turns a physical product into a costed bill of materials, revealing design choices, cost drivers and ideas for value engineering or negotiation.',
    sections: [
      {
        heading: 'How a teardown is carried out',
        paragraphs: [
          'A teardown moves from the whole product down to individual parts, recording as it goes. Each step produces data that feeds a should-cost model.',
        ],
        bullets: [
          'Document the assembly: photographs, weights, fastener counts and assembly sequence.',
          'Disassemble to part level and identify materials, often with simple tests or lab analysis.',
          'Infer processes for each part: machining, casting, moulding, stamping, PCB assembly.',
          'Build a costed BOM using should-cost models for each part and the assembly labour.',
          'Compare with your own product to find design, material and process differences.',
        ],
      },
      {
        heading: 'What teardowns are used for',
        paragraphs: [
          'Teardowns serve three main purposes: competitive benchmarking, cost reduction and supplier negotiation. Benchmarking shows how a competitor meets a price point; cost reduction finds cheaper ways to deliver the same function; negotiation uses the costed BOM to challenge quotes.',
          'Electronics teardowns are especially revealing because PCB cost is driven by component selection, layer count and assembly process, which are visible once the board is inspected. Emithran’s electronics teardown study showed a PCB cost falling from $19.89 to $8.07 on a should-cost basis.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: teardown of a small motor controller',
      steps: [
        'The unit is weighed and disassembled into 42 parts: a die-cast housing, a 4-layer PCB, connectors, fasteners and a gasket.',
        'Should-cost models give: housing 6.20, PCB assembly 14.80, connectors 3.10, fasteners and gasket 0.90, assembly labour 1.50. Total 26.50.',
        'Your own equivalent unit costs 34.00. The biggest gap is the PCB: your design uses a 6-layer board and more discrete components.',
      ],
      result:
        'A redesign to a 4-layer board becomes the top value engineering idea, worth an estimated 5.00 per unit on these illustrative figures.',
    },
    india:
      'Teardown analysis is widely used by Indian automotive and electronics manufacturers to benchmark imported and competitor products and to plan localisation. When an imported assembly is torn down, the costed BOM shows which parts can be sourced in India and at what estimated cost. Teams should respect intellectual property law: teardowns inform cost and design understanding, but copying protected designs is a separate legal question.',
    faqs: [
      {
        question: 'Is teardown analysis legal?',
        answer:
          'Disassembling a product you have bought for analysis is generally lawful, but copying patented or otherwise protected designs is not. Take legal advice on specific cases.',
      },
      {
        question: 'How long does a teardown take?',
        answer:
          'It varies by product complexity, from days for a simple assembly to several weeks for a complex electromechanical system with costing.',
      },
      {
        question: 'What is the difference between teardown and reverse engineering?',
        answer:
          'Teardown focuses on understanding cost and design choices. Reverse engineering aims to reproduce the design, often with detailed measurements and drawings.',
      },
    ],
    links: [
      {
        href: '/blog/what-is-vave',
        label: 'What is VAVE?',
        context: 'The pillar guide to value analysis and value engineering, where teardowns feed ideas.',
      },
      {
        href: '/vave-software',
        label: 'VAVE software',
        context: 'Turn teardown findings into costed value engineering ideas.',
      },
      {
        href: '/case-studies/electronics-teardown',
        label: 'Electronics and PCB should-cost teardown case study',
        context: 'A real teardown of a radar sensor, EV BTMS and wire harness.',
      },
    ],
  },

  'target costing': {
    summary:
      'Target costing sets the maximum cost a product can have, working back from the price customers will pay and the margin the business needs. That allowable cost is then split across systems and parts, and design and sourcing teams work to meet it before the design is frozen, rather than discovering cost after launch.',
    formula: {
      expression: 'Target cost = Target selling price − Target profit margin',
      variables: [
        { symbol: 'Target selling price', meaning: 'The price the market will bear for the planned features' },
        { symbol: 'Target profit margin', meaning: 'Required profit per unit, often set as a percentage of price' },
      ],
      note: 'The gap between current estimated cost and target cost is the cost reduction the programme must find.',
    },
    sections: [
      {
        heading: 'How target costing works',
        paragraphs: [
          'Target costing starts from the market and works inward. Price is treated as an input, not an output of cost-plus pricing.',
        ],
        bullets: [
          'Set the target selling price from market research and competitor benchmarks.',
          'Subtract the required margin to get the allowable cost.',
          'Allocate the allowable cost to systems and parts, often in proportion to their value to the customer.',
          'Estimate the current design’s cost and measure the gap to target.',
          'Close the gap through design changes, value engineering and sourcing, then track progress at each gate.',
        ],
      },
      {
        heading: 'Making target costing stick',
        paragraphs: [
          'Targets only work when engineers can see the cost of their choices quickly. If cost estimates arrive weeks after a design review, the design has already moved on.',
          'That is why target costing relies on fast should-cost estimates during design, close work with suppliers, and regular reviews comparing estimated cost with target. Target costing sets the goal; design-to-cost is the discipline of designing to meet it.',
        ],
      },
    ],
    example: {
      title: 'Illustrative example: setting a target for a pump assembly',
      steps: [
        'Market research supports a selling price of 400 per unit. The business requires a 25% margin: 100 per unit.',
        'Target cost = 400 − 100 = 300 per unit.',
        'The current design is estimated at 345 per unit, a gap of 45.',
        'The gap is allocated: housing redesign 20, motor sourcing 15, fastener and assembly simplification 10.',
      ],
      result:
        'Each sub-team gets a specific cost reduction to deliver before design freeze, with progress tracked against the 300 target at each gate.',
    },
    india:
      'Target costing suits India’s price-sensitive markets, where automotive, two-wheeler and consumer durables makers work backwards from price points customers accept. It is also relevant to defence and space programmes aiming to deliver capability at lower cost than imported equivalents. Accurate target costing depends on India-specific cost data, because material, labour and overhead ratios differ from those in Western cost models.',
    faqs: [
      {
        question: 'What is the difference between target costing and cost-plus pricing?',
        answer:
          'Cost-plus adds a margin to whatever the product costs. Target costing starts from the market price and forces the cost to fit.',
      },
      {
        question: 'When should target costing start?',
        answer:
          'At concept stage, before the design is frozen, because most of a product’s cost is committed by early design decisions.',
      },
      {
        question: 'How is target costing related to design-to-cost?',
        answer:
          'Target costing sets the cost goal; design-to-cost is the engineering process that designs the product to meet it.',
      },
    ],
    links: [
      {
        href: '/blog/target-costing',
        label: 'Target costing: how to set and hit cost targets',
        context: 'The pillar guide to running target costing during design.',
      },
      {
        href: '/design-to-cost-software',
        label: 'Design-to-cost software',
        context: 'Give engineers fast cost feedback against their targets.',
      },
      {
        href: '/blog/target-cost-formula',
        label: 'Target cost formula',
        context: 'How the target cost is calculated and applied in practice.',
      },
    ],
  },
}

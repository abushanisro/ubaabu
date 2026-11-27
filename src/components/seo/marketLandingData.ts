import type { SeoLandingPage } from './seoRoadmapData'
import type { LandingPageExpansion } from './contentTypes'

/**
 * US and UK market landing pages (Nov 2026 audit, finding 03: the site had no US- or
 * UK-specific commercial pages). Keywords come from Google/Bing/DuckDuckGo autocomplete
 * collected for the US and UK markets (for example "should cost model uk government",
 * "manufacturing cost estimating software", "sourcing from india").
 *
 * Regulatory references are kept general and factual; the pages never claim that Emithran
 * is certified under, or guarantees compliance with, any government regime.
 */

type Sections = SeoLandingPage['sections']
type Faqs = SeoLandingPage['faqs']

/* ------------------------------------------------------------------ UK: should cost modelling */

export const ukShouldCostSections: Sections = [
  {
    heading: 'Should cost models that stand up to UK commercial scrutiny',
    body: 'UK buyers in central government, defence and regulated industry are increasingly expected to show what a product or service should cost before they award or renew a contract. Emithran builds that model bottom-up, from material, process, labour and overhead, so the number can be explained line by line.',
    bullets: [
      'Bottom-up cost models built from drawings, CAD data or teardown evidence, not from a single supplier quote.',
      'Every assumption (material grade, cycle time, labour rate, overhead, margin) recorded and editable.',
      'Outputs structured for internal business cases, supplier negotiations and contract reviews.',
    ],
  },
  {
    heading: 'Regional cost comparison: UK, EU, India and beyond',
    body: 'Many UK manufacturers compare domestic production with suppliers in Europe and India. Emithran keeps regional labour, machine-hour and overhead rates side by side, so the same part can be costed in each location before a sourcing decision is made.',
    bullets: [
      'Compare make-in-UK against EU and India supply on the same cost structure.',
      'Landed cost view covering freight, duty under the UK Global Tariff and inventory carrying cost.',
      'Sensitivity on exchange rates and commodity prices so a decision is not hostage to one assumption.',
    ],
  },
  {
    heading: 'From model to negotiation',
    body: 'A should cost model only creates value when it changes a commercial conversation. Emithran turns the model into a negotiation pack that compares the supplier quote with the modelled cost, element by element.',
    bullets: [
      'Quote-versus-should-cost gap shown per cost element.',
      'Supplier alternatives from 72,000+ supplier records where a second source is needed.',
      'Outcome tracking so the next contract starts from a known baseline.',
    ],
  },
]

export const ukShouldCostFaqs: Faqs = [
  {
    question: 'What is a should cost model in UK public procurement?',
    answer: 'A should cost model estimates what a good or service should cost over its whole life, built from its underlying cost drivers. UK central government guidance (the Sourcing Playbook and the accompanying Cabinet Office guidance on should cost modelling) expects one for important outsourcing and make-or-buy decisions. Emithran applies the same bottom-up discipline to manufactured parts and assemblies.',
  },
  {
    question: 'Is it "should cost modelling" or "should cost modeling"?',
    answer: 'Both describe the same method. "Modelling" is the British spelling used in UK government guidance, and "modeling" is the American spelling. The method is identical: build the cost from material, process, labour, overhead and margin, then compare it with the price offered.',
  },
  {
    question: 'Can Emithran support UK defence single source pricing?',
    answer: 'Emithran produces structured, assumption-level cost evidence that commercial teams can use alongside their own single source pricing work. How that evidence is used under the Single Source Contract Regulations remains the responsibility of your contracts and compliance teams.',
  },
]

export const ukShouldCostExpansion: LandingPageExpansion = {
  summary:
    'Should cost modelling estimates what a part, assembly or service ought to cost from its real cost drivers, so UK buyers can test a quote before they accept it. Emithran builds these models bottom-up, compares UK, EU and India production on one cost structure, and turns the result into negotiation-ready evidence.',
  walkthrough: {
    heading: 'How a should cost model is built in Emithran',
    intro: 'The steps below follow the structure UK commercial teams already use for business cases, applied at part and assembly level.',
    steps: [
      { title: 'Define the scope', body: 'Start from the drawing, CAD model, BOM or a physical teardown. Agree the annual volume, quality standard and delivery terms the model must reflect.' },
      { title: 'Model material and process', body: 'Should-Cost Analysis calculates material weight and scrap, then routes each operation (machining, sheet metal, casting, moulding, assembly) with cycle times and machine-hour rates.' },
      { title: 'Apply regional rates', body: 'Labour, overhead and energy rates are applied for the UK and for each alternative region, so the same part can be costed in several locations.' },
      { title: 'Add landed cost', body: 'Freight, duty, packaging and inventory carrying cost are added for imported routes, giving a like-for-like comparison with domestic supply.' },
      { title: 'Compare with the quote', body: 'The modelled cost is set against the supplier price element by element, and the gaps are ranked by value for the negotiation.' },
    ],
  },
  useCases: {
    heading: 'Where UK teams use should cost modelling',
    items: [
      { industry: 'Defence and security', body: 'Sole-source and low-competition parts where an independent cost estimate is the main lever in a pricing discussion.' },
      { industry: 'Automotive and commercial vehicles', body: 'Chassis, cab and powertrain components where regional manufacturing cost decides whether to keep production in the UK or source abroad.' },
      { industry: 'Aerospace and space', body: 'Machined, fabricated and electronic parts with high material cost and long qualification cycles.' },
      { industry: 'Public sector outsourcing', body: 'Make-or-buy and insourcing decisions where guidance expects a should cost model before the decision is taken.' },
    ],
  },
  proof: {
    heading: 'Method shown in published case studies',
    items: [
      { title: 'Chassis should-cost: India vs Belgium', body: 'A regional comparison of the same chassis parts made in India and in Europe, built on one cost structure.', href: '/case-studies/chassis-india-belgium' },
      { title: 'HGV cab: should-cost and decision matrix', body: 'Should-cost combined with a sourcing decision matrix for a heavy goods vehicle cab.', href: '/case-studies/hgv-cab-strategy' },
      { title: 'LCV rear axle should-cost', body: 'A bottom-up cost model of a light commercial vehicle rear axle used to challenge supplier pricing.', href: '/case-studies/rear-axle-should-cost' },
    ],
  },
  comparison: {
    heading: 'Ways UK teams build a should cost model, compared',
    intro: 'Spreadsheets remain common. The table shows where a dedicated tool changes the result.',
    columns: ['Capability', 'Spreadsheet model', 'Consultancy study', 'Emithran'],
    rows: [
      ['Process-level cost build-up', 'Analyst-dependent', 'Yes', 'Yes, routed per operation'],
      ['UK vs EU vs India rates on one structure', 'Manual', 'Per study', 'Built in'],
      ['Assumption trail for review', 'Fragile across versions', 'In the report', 'Recorded per estimate'],
      ['Reusable for the next contract', 'Rarely', 'No', 'Yes'],
      ['Linked supplier alternatives', 'No', 'Sometimes', '72,000+ supplier records'],
    ],
  },
  faqs: [
    { question: 'How long does a should cost model take to build?', answer: 'A single machined or fabricated part can be modelled in hours once drawings are available. Multi-line assemblies take longer, and Emithran engineers can build the first models with your team during a pilot.' },
    { question: 'Do you price in pounds sterling?', answer: 'Models can be presented in GBP, EUR, USD or INR, with exchange-rate assumptions recorded so they can be updated.' },
  ],
  related: [
    { href: '/should-cost-analysis-software', label: 'Should-cost analysis software', context: 'The product overview behind every should cost model.' },
    { href: '/blog/should-cost-modeling-methodology-tools-examples', label: 'Should cost modelling methodology', context: 'A step-by-step method with worked examples.' },
    { href: '/blog/how-to-build-should-cost-model-excel-ai', label: 'Building a should cost model in Excel and with AI', context: 'Compare a spreadsheet build with an automated one.' },
    { href: '/sourcing-from-india', label: 'Sourcing from India', context: 'Cost and supplier evidence for UK buyers considering Indian suppliers.' },
  ],
}

/* ------------------------------------------------------------- US: cost estimating software */

export const usEstimatingSections: Sections = [
  {
    heading: 'Manufacturing cost estimating built from the process up',
    body: 'US engineering and sourcing teams need a defensible estimate before a quote arrives, not after. Emithran estimates part and assembly cost from material, process routing, cycle time, labor and overhead, the same structure cost estimators use, without rebuilding a spreadsheet for every part.',
    bullets: [
      'Estimates for machining, sheet metal, casting, forging, molding, PCBA and assembly.',
      'Every rate and cycle time visible and editable, so estimators stay in control.',
      'BOM-level roll-up from individual part estimates to the full assembly.',
    ],
  },
  {
    heading: 'Tariff-aware landed cost for reshoring and dual sourcing',
    body: 'Section 232 and Section 301 tariffs, freight and inventory cost now decide many US sourcing choices. Emithran adds them to the manufacturing estimate, so domestic, nearshore (Mexico) and offshore routes such as India can be compared on landed cost.',
    bullets: [
      'Side-by-side US, Mexico, India and China cost structures for the same part.',
      'Duty, freight and carrying cost added per route, with assumptions you can change as tariffs move.',
      'Supplier alternatives from 72,000+ supplier records when a second source is needed.',
    ],
  },
  {
    heading: 'Estimates that hold up in negotiation and cost reviews',
    body: 'A cost estimate is useful when a buyer can defend it. Emithran keeps the assumption trail with each estimate and compares it with supplier quotes line by line.',
    bullets: [
      'Quote-versus-estimate gap by cost element.',
      'Assumption history kept for internal and customer cost reviews.',
      'Exports for negotiation packs and program reviews.',
    ],
  },
]

export const usEstimatingFaqs: Faqs = [
  {
    question: 'What is manufacturing cost estimating software?',
    answer: 'Manufacturing cost estimating software calculates what a part or assembly should cost to make, using material, process, labor, overhead and margin assumptions. It replaces one-off spreadsheets with a repeatable model that estimators, engineers and buyers can share.',
  },
  {
    question: 'How is Emithran priced for US teams?',
    answer: 'Pricing is outcome-based and depends on the number of users and the scope of the pilot. The pricing page explains the model, and a scoped quote follows a short discovery call.',
  },
  {
    question: 'Can estimates support DoD should-cost reviews?',
    answer: 'Emithran produces structured, assumption-level estimates that teams can use alongside should-cost reviews such as those described in FAR 15.407-4. How the evidence is used in a submission remains the responsibility of your contracts and compliance teams.',
  },
]

export const usEstimatingExpansion: LandingPageExpansion = {
  summary:
    'Manufacturing cost estimating software calculates what a part should cost from material, process routing, cycle time, labor and overhead. Emithran gives US engineering and sourcing teams repeatable, editable estimates, adds tariff-aware landed cost for each sourcing route, and compares every estimate with supplier quotes.',
  walkthrough: {
    heading: 'How an estimate is built in Emithran',
    intro: 'Each step reuses the data from the one before, so the estimate, the landed cost and the negotiation pack stay consistent.',
    steps: [
      { title: 'Import the drawing or BOM', body: 'Start from a CAD model, drawing or BOM export. BOM Intelligence checks part numbers, materials and quantities before estimating.' },
      { title: 'Route the process', body: 'Each part is routed through its operations (turning, milling, stamping, welding, molding, SMT and others) with machine-hour rates and cycle times.' },
      { title: 'Apply labor and overhead', body: 'Regional labor and overhead rates are applied for the US and for each alternative region you want to compare.' },
      { title: 'Add landed cost', body: 'Freight, duty and inventory cost are added per route, so a domestic and an imported option are compared on the same basis.' },
      { title: 'Compare with quotes', body: 'Supplier quotes are set against the estimate element by element, and the gaps are ranked by spend.' },
    ],
  },
  useCases: {
    heading: 'Where US teams use cost estimating',
    items: [
      { industry: 'Aerospace and defense', body: 'Machined and fabricated parts with high material cost and few qualified suppliers, where an independent estimate drives the pricing discussion.' },
      { industry: 'Commercial vehicles and off-highway', body: 'Frames, cabs, axles and brackets where reshoring and nearshoring decisions depend on landed cost.' },
      { industry: 'Electronics', body: 'PCBA and box-build estimates that separate board, component and assembly cost.' },
      { industry: 'Industrial equipment', body: 'Castings, forgings and weldments where material and process choices dominate cost.' },
    ],
  },
  proof: {
    heading: 'Method shown in published case studies',
    items: [
      { title: 'Electronics teardown: PCB cost from $19.89 to $8.07', body: 'Component-level teardown and PCBA should-costing identified a lower-cost PCB technology.', href: '/case-studies/electronics-teardown' },
      { title: 'DC-DC converter: 22% unit cost reduction', body: 'Teardown, component-level estimating and VAVE ideas cut unit cost by 22%.', href: '/case-studies/dc-dc-converter' },
      { title: 'HGV chassis ladder frame should-cost', body: 'A 74-line BOM estimate comparing two production regions.', href: '/case-studies/hgv-chassis' },
    ],
  },
  comparison: {
    heading: 'Cost estimating approaches, compared',
    intro: 'Most teams start with spreadsheets or an ERP standard cost. The table shows the gaps a dedicated estimating tool closes.',
    columns: ['Capability', 'Spreadsheets', 'ERP standard cost', 'Emithran'],
    rows: [
      ['Process-level estimate', 'Analyst-dependent', 'No', 'Yes'],
      ['Tariff-aware landed cost by route', 'Manual', 'No', 'Yes'],
      ['Quote-versus-estimate by cost element', 'Manual', 'No', 'Yes'],
      ['BOM roll-up', 'Fragile', 'Yes', 'Yes'],
      ['Supplier alternatives', 'No', 'Approved vendors only', '72,000+ supplier records'],
    ],
  },
  faqs: [
    { question: 'Does Emithran offer cost estimating services as well as software?', answer: 'Yes. Emithran cost engineers can build estimates for your team through Expert Engineering Support, alongside or before a software rollout.' },
    { question: 'Which currencies and units are supported?', answer: 'Estimates can be shown in USD and other currencies, in imperial or metric units, with exchange-rate assumptions recorded.' },
  ],
  related: [
    { href: '/should-cost-analysis-software', label: 'Should-cost analysis software', context: 'The product overview behind every estimate.' },
    { href: '/blog/manufacturing-cost-estimation-methods', label: 'Manufacturing cost estimation methods', context: 'Parametric, analogous and bottom-up estimating explained.' },
    { href: '/blog/cnc-machining-cost-estimation', label: 'CNC machining cost estimation', context: 'A worked machining estimate step by step.' },
    { href: '/expert-engineering-support', label: 'Cost estimating services', context: 'Have Emithran engineers build the first estimates.' },
  ],
}

/* ------------------------------------------------------------ US + UK: sourcing from India */

export const sourcingIndiaSections: Sections = [
  {
    heading: 'Know what an Indian supplier should charge before you ask',
    body: 'US and UK OEMs moving volume to India often lack a reliable reference price. Emithran builds a bottom-up should-cost using Indian material, labor, machine-hour and overhead rates, so the first quote can be judged against evidence instead of a guess.',
    bullets: [
      'India-specific rates for machining, fabrication, casting, forging, molding and electronics.',
      'Landed cost to the US or UK, including freight, duty and inventory carrying cost.',
      'Direct comparison with your current domestic or China-based price.',
    ],
  },
  {
    heading: 'Find and qualify suppliers with evidence',
    body: 'Supplier Radar connects 72,000+ supplier records to the parts you need, with process capability, certifications and risk signals, so sourcing teams can shortlist Indian suppliers for an RFQ quickly.',
    bullets: [
      'Search by process, material, size and certification (for example AS9100 or IATF 16949).',
      'Qualification and risk signals before the first visit.',
      'Dual-source options to reduce dependency on a single site.',
    ],
  },
  {
    heading: 'Engineers on the ground in India',
    body: 'Emithran is headquartered in Bangalore and was founded by costing engineers who work with Indian suppliers every day. That local knowledge shortens the learning curve for overseas buyers.',
    bullets: [
      'Support with supplier visits, first-article and PPAP preparation.',
      'Cost engineering support for negotiations with Indian suppliers.',
      'Clear documentation for programme and management reviews.',
    ],
  },
]

export const sourcingIndiaFaqs: Faqs = [
  {
    question: 'Why are US and UK OEMs sourcing manufacturing from India?',
    answer: 'Common reasons are diversification away from a single country, competitive labor and engineering cost, English-language engineering teams and a broad supplier base in machining, castings, forgings and electronics. Tariffs and trade agreements change the economics, so each part should be compared on landed cost.',
  },
  {
    question: 'How do I compare an Indian quote with a domestic one?',
    answer: 'Compare landed cost, not unit price. Add freight, duty, packaging, inventory carrying cost and the cost of quality and travel to the Indian price, then set it against the domestic price. Emithran calculates these elements for each route.',
  },
  {
    question: 'How are Indian suppliers qualified?',
    answer: 'Shortlisting uses process capability, certifications, capacity and risk data, followed by audits, first-article inspection and PPAP or equivalent approval. Emithran supports each step with supplier data and engineering support.',
  },
]

export const sourcingIndiaExpansion: LandingPageExpansion = {
  summary:
    'Sourcing manufacturing from India works best when buyers know what a part should cost there and which suppliers can really make it. Emithran gives US and UK OEMs India-specific should-cost, landed-cost comparison and a 72,000+ record supplier database, with costing engineers based in Bangalore.',
  walkthrough: {
    heading: 'How an India sourcing project runs with Emithran',
    intro: 'The workflow moves from cost evidence to a qualified supplier, so commercial and quality decisions use the same data.',
    steps: [
      { title: 'Select the parts', body: 'Import the BOM and pick candidate parts by spend, process and current supplier risk.' },
      { title: 'Model India should-cost', body: 'Should-Cost Analysis estimates each part with Indian material, labor and machine-hour rates.' },
      { title: 'Compare landed cost', body: 'Freight, duty and inventory are added for delivery to the US or UK and compared with the current price.' },
      { title: 'Shortlist suppliers', body: 'Supplier Radar matches parts to Indian suppliers by process, capacity and certification.' },
      { title: 'Run the RFQ and qualify', body: 'Quotes are compared with should-cost, and qualification steps are tracked through first article and approval.' },
    ],
  },
  useCases: {
    heading: 'Typical parts sourced from India',
    items: [
      { industry: 'Machined components', body: 'Turned and milled parts in steel, aluminium and stainless steel for industrial, automotive and aerospace programmes.' },
      { industry: 'Castings and forgings', body: 'Iron and aluminium castings and steel forgings where Indian foundry and forge capacity is deep.' },
      { industry: 'Fabrications and frames', body: 'Welded structures, chassis rails and brackets where labor content is high.' },
      { industry: 'Electronics', body: 'PCBA and cable assemblies, with component sourcing assumptions recorded in the estimate.' },
    ],
  },
  proof: {
    heading: 'Published India comparisons',
    items: [
      { title: 'Chassis should-cost: India vs Belgium', body: 'The same chassis parts costed in India and in Europe on one structure.', href: '/case-studies/chassis-india-belgium' },
      { title: 'HGV chassis: rail cost by region', body: 'A 74-line BOM comparison of Northern Europe and India production.', href: '/case-studies/hgv-chassis' },
      { title: 'Exhaust system should-costing', body: 'Material and process trade-offs costed for an exhaust system.', href: '/case-studies/exhaust-system' },
    ],
  },
  comparison: {
    heading: 'Ways to start sourcing from India, compared',
    intro: 'Buyers typically choose between going alone, using a sourcing agent, or working from cost and supplier data.',
    columns: ['Capability', 'Direct search and RFQ', 'Sourcing agent', 'Emithran'],
    rows: [
      ['Reference price before quoting', 'No', 'Agent estimate', 'Bottom-up should-cost'],
      ['Landed cost to US or UK', 'Manual', 'Sometimes', 'Built in'],
      ['Supplier search by capability', 'Directories', 'Agent network', '72,000+ supplier records'],
      ['Transparency of margins', 'Low', 'Often hidden', 'Assumptions visible'],
      ['Engineering support in India', 'No', 'Varies', 'Bangalore-based engineers'],
    ],
  },
  faqs: [
    { question: 'Can you help with supplier visits in India?', answer: 'Yes. Emithran engineers can support supplier visits, audits and first-article preparation through Expert Engineering Support.' },
  ],
  related: [
    { href: '/supplier-intelligence', label: 'Supplier intelligence platform', context: 'Search and qualify suppliers by capability and risk.' },
    { href: '/topics/india-manufacturing', label: 'India manufacturing guides', context: 'All guides on manufacturing and sourcing from India.' },
    { href: '/total-cost-ownership', label: 'Total cost of ownership', context: 'Why landed cost and quality cost matter more than unit price.' },
    { href: '/should-cost-modelling-uk', label: 'Should cost modelling for UK buyers', context: 'The UK view of the same cost discipline.' },
  ],
}

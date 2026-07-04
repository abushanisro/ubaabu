export interface SeoLandingPage {
  slug: string
  title: string
  description: string
  eyebrow: string
  h1: string
  intro: string
  keywords: string[]
  metrics: { value: string; label: string }[]
  sections: { heading: string; body: string; bullets: string[] }[]
  faqs: { question: string; answer: string }[]
}

const baseMetrics = [
  { value: '72K+', label: 'supplier records connected to sourcing intelligence' },
  { value: '99.4%', label: 'BOM accuracy target for validated programmes' },
  { value: '5 days', label: 'typical pilot setup for a focused team' },
]

function page(
  slug: string,
  title: string,
  description: string,
  h1: string,
  primaryKeyword: string,
  sections: SeoLandingPage['sections'],
  faqs: SeoLandingPage['faqs']
): SeoLandingPage {
  return {
    slug,
    title,
    description,
    eyebrow: 'Manufacturing Intelligence',
    h1,
    intro: description,
    keywords: [
      primaryKeyword,
      `${primaryKeyword} India`,
      'manufacturing intelligence software',
      'cost engineering platform',
      'supplier intelligence',
      'BOM management',
      'should cost analysis',
    ],
    metrics: baseMetrics,
    sections,
    faqs,
  }
}

const strategicSourcingSections: SeoLandingPage['sections'] = [
  {
    heading: 'From reactive buying to strategic sourcing',
    body: 'Strategic sourcing replaces one-off RFQs with category-level plans tied to programme timelines, so supplier decisions are made ahead of need rather than under deadline pressure.',
    bullets: [
      'Category-level spend visibility across every active BOM.',
      'Supplier segmentation by risk, capability, and strategic fit.',
      'Multi-year sourcing roadmaps aligned to programme milestones.',
    ],
  },
  {
    heading: 'Supplier qualification before commitment',
    body: 'Suppliers are screened on capability and certification before they enter a sourcing event, so qualification work is not repeated for every new RFQ.',
    bullets: [
      'Capability and certification screening, including NADCAP, AS9100, and IATF 16949.',
      'Financial health and capacity risk checks ahead of award.',
      'Qualification history reused across future sourcing events.',
    ],
  },
  {
    heading: 'Negotiation backed by should-cost evidence',
    body: 'Sourcing teams enter negotiations with a target cost range built from process and material data, not just a sense of what the last quote looked like.',
    bullets: [
      'Target cost ranges built from process and material assumptions.',
      'Leverage points identified before the conversation starts.',
      'Documented rationale ready for audit and compliance review.',
    ],
  },
]

const strategicSourcingFaqs: SeoLandingPage['faqs'] = [
  { question: 'How is strategic sourcing software different from a generic procurement tool?', answer: 'Generic procurement tools track purchase orders and invoices. Strategic sourcing software works one level up, helping teams plan category strategy, segment suppliers, and build multi-year sourcing roadmaps tied to programme timelines.' },
  { question: 'Can strategic sourcing software work alongside our existing ERP?', answer: 'Yes. It is built to complement an ERP rather than replace it, pulling in BOM, supplier, and quote data to support sourcing decisions while transactional records stay in the ERP.' },
  { question: 'What data does Emithran need to support strategic sourcing decisions?', answer: 'Representative BOMs, supplier lists, historical quotes, and the sourcing categories or programmes you want visibility into. Most teams can get a useful first view within days of providing this.' },
]

const shouldCostModelingSections: SeoLandingPage['sections'] = [
  {
    heading: 'Should-cost models built from process and material data',
    body: 'Each model is assembled from the inputs that actually drive manufacturing cost, rather than scaled from a generic industry average.',
    bullets: [
      'Material grade and raw material index pricing.',
      'Process-specific cycle time and machine rate assumptions.',
      'Tooling and overhead allocation by batch size.',
    ],
  },
  {
    heading: 'Validate supplier quotes line by line',
    body: 'Quoted prices are compared against the modeled target cost at the line-item level, so variance is visible before it becomes a negotiation surprise.',
    bullets: [
      'Compare quoted price against modeled target cost per part.',
      'Flag line items that fall outside expected variance.',
      'Track quote history across sourcing events.',
    ],
  },
  {
    heading: 'From model to negotiation brief',
    body: 'A should-cost model is only useful if it reaches the negotiation table in a form the supplier conversation can actually use.',
    bullets: [
      'Exportable cost breakdowns for RFQ and negotiation.',
      'Sensitivity views for volume, material, and geography changes.',
      'Audit trail for engineering and finance sign-off.',
    ],
  },
]

const shouldCostModelingFaqs: SeoLandingPage['faqs'] = [
  { question: 'What inputs does a should-cost model need?', answer: 'At minimum, a part drawing or CAD model, material specification, target process route, and expected volume. Supplier quote history improves accuracy further but is not required to get started.' },
  { question: 'How accurate are should-cost models compared to actual supplier costs?', answer: 'Accuracy depends on how closely the process and material assumptions match the supplier’s actual production route. Models are designed to be directionally reliable enough to flag real variance, not to predict a supplier’s exact margin.' },
  { question: 'Can should-cost modeling support multiple manufacturing processes in one BOM?', answer: 'Yes. A single BOM can mix machined, cast, formed, and assembled parts, each modeled against the process-specific cost drivers relevant to it.' },
]

const srmSections: SeoLandingPage['sections'] = [
  {
    heading: 'One record per supplier, not one spreadsheet per team',
    body: 'Qualification, performance, and quality history live in a single supplier profile instead of being scattered across procurement, quality, and engineering trackers.',
    bullets: [
      'Qualification status, certifications, and audit history in one place.',
      'Commercial performance and on-time delivery tracked over time.',
      'Quality escapes and corrective actions linked to the supplier record.',
    ],
  },
  {
    heading: 'Risk visibility before it becomes a problem',
    body: 'Supplier risk is tracked continuously, so capacity or certification issues surface before they affect a delivery commitment.',
    bullets: [
      'Capacity and financial risk signals updated as conditions change.',
      'Single-source and geographic concentration flags.',
      'Early warning for certification expiry or audit findings.',
    ],
  },
  {
    heading: 'Performance reviews backed by data',
    body: 'Supplier reviews run on a consistent scorecard instead of being reconstructed from memory and email threads before each meeting.',
    bullets: [
      'Scorecards combining quality, delivery, cost, and responsiveness.',
      'Review cadence tied to programme milestones.',
      'Supplier development plans tracked through to closure.',
    ],
  },
]

const srmFaqs: SeoLandingPage['faqs'] = [
  { question: 'How is this different from a supplier portal?', answer: 'A supplier portal is mainly a data collection interface for the supplier. SRM software is built for your team’s side of the relationship: qualification history, risk tracking, and performance review across every supplier you manage.' },
  { question: 'Can SRM data feed into sourcing and RFQ decisions?', answer: 'Yes. Qualification status and performance history carry directly into shortlist and award decisions, so a supplier’s track record is visible at the point a new sourcing event is created.' },
  { question: 'How is supplier risk data kept current?', answer: 'Risk signals update as new certification, capacity, financial, or quality information is recorded, rather than being refreshed only during an annual review cycle.' },
]

const spendAnalysisSections: SeoLandingPage['sections'] = [
  {
    heading: 'See spend the way engineering and finance actually think about it',
    body: 'Spend is grouped by commodity, process, and part family rather than only by general ledger code, so the numbers map to decisions procurement teams can act on.',
    bullets: [
      'Spend grouped by commodity, process, and part family.',
      'Cross-referenced against should-cost targets to flag overpayment.',
      'Programme-level rollups across multiple BOMs.',
    ],
  },
  {
    heading: 'Find leakage hiding in maverick and tail spend',
    body: 'The biggest savings opportunities are often in the long tail of small, inconsistent purchases rather than the headline contracts.',
    bullets: [
      'Identify off-contract or non-preferred-supplier purchases.',
      'Surface duplicate part numbers and inconsistent pricing for the same component.',
      'Rank savings opportunities by size and ease of action.',
    ],
  },
  {
    heading: 'Turn analysis into an actioned pipeline',
    body: 'An opportunity is only worth identifying if someone owns it through to a closed result.',
    bullets: [
      'Opportunity register with owners and target dates.',
      'Before-and-after tracking once a sourcing action closes.',
      'Reporting suited for procurement leadership reviews.',
    ],
  },
]

const spendAnalysisFaqs: SeoLandingPage['faqs'] = [
  { question: 'What spend data formats can be analyzed?', answer: 'Standard exports from ERP, accounts payable, or procurement systems, typically CSV or Excel, covering supplier, part, quantity, and price fields.' },
  { question: 'How does spend analysis differ from a BI dashboard?', answer: 'A BI dashboard visualizes whatever fields you give it. Spend analysis here is purpose-built to cross-reference spend against should-cost targets and part-level data, so it surfaces overpayment, not just totals.' },
  { question: 'Can this work with multiple ERPs or regional ledgers?', answer: 'Yes. Spend data from different ERPs or regional ledgers can be normalized into a common commodity and part-family structure for a consolidated view.' },
]

const costEngineeringSections: SeoLandingPage['sections'] = [
  {
    heading: 'Cost models that survive engineering scrutiny',
    body: 'Cost breakdowns are built at a level of detail engineering teams can actually review and challenge, not a single rolled-up number.',
    bullets: [
      'Process-route-specific cost breakdowns reviewed by engineering, not just procurement.',
      'Material, labor, overhead, and tooling shown as separate, defensible line items.',
      'Version history when a design or process route changes.',
    ],
  },
  {
    heading: 'Benchmark across process and geography',
    body: 'The same part can be costed under more than one process or location to see whether a different route changes the outcome materially.',
    bullets: [
      'Compare the same part costed under multiple manufacturing processes.',
      'Regional cost benchmarks for labor, energy, and logistics.',
      'Identify when a process or location switch changes the cost outcome materially.',
    ],
  },
  {
    heading: 'Connect cost engineering to the rest of the programme',
    body: 'A cost model that lives outside the BOM and supplier workflow loses value the moment the design changes.',
    bullets: [
      'Cost models linked to BOM line items and supplier quotes.',
      'Validated targets feed directly into RFQ and negotiation workflows.',
      'A single source of truth as parts move through design iterations.',
    ],
  },
]

const costEngineeringFaqs: SeoLandingPage['faqs'] = [
  { question: 'Who typically owns cost engineering output, procurement or engineering?', answer: 'Both. Engineering typically validates the technical assumptions behind a model, while procurement uses the resulting target cost during negotiation. The output is built to be reviewed by either team.' },
  { question: 'Can cost engineering software model multiple process alternatives for the same part?', answer: 'Yes. A part can be modeled under more than one process route, for example machined versus cast, to compare cost outcomes before committing to a route.' },
  { question: 'How does this fit with existing CAD or PLM tools?', answer: 'Part geometry and BOM data exported from CAD or PLM systems feed directly into the cost model, rather than requiring data to be rebuilt manually.' },
]

const dfmSections: SeoLandingPage['sections'] = [
  {
    heading: 'Catch manufacturability risk before release',
    body: 'Design choices that drive up process cost or scrap rate are easier and cheaper to fix while a part is still in design review.',
    bullets: [
      'Flag tolerances, features, or material choices that drive up process cost or scrap rate.',
      'Cross-check designs against known supplier process capability.',
      'Surface DFM issues while changes are still inexpensive to make.',
    ],
  },
  {
    heading: 'Connect DFM findings to cost and supplier readiness',
    body: 'A manufacturability flag is more actionable when it comes with a cost number and a list of suppliers who can actually produce the design as drawn.',
    bullets: [
      'Show the cost impact of a DFM finding, not just a flag.',
      'Identify which qualified suppliers can produce the design as drawn.',
      'Route findings back to engineering with supporting evidence.',
    ],
  },
  {
    heading: 'Build institutional DFM knowledge over time',
    body: 'The same manufacturability issues tend to recur across part families; capturing them once avoids relearning them on every new design.',
    bullets: [
      'Capture recurring DFM issues by part family and process.',
      'Reuse rules across future designs instead of relearning them.',
      'Reduce late-stage engineering changes tied to manufacturability.',
    ],
  },
]

const dfmFaqs: SeoLandingPage['faqs'] = [
  { question: 'Does this replace engineering DFM reviews?', answer: 'No. It supports engineering review with cost and supplier-capability context, helping reviewers prioritize which findings matter most rather than replacing the review itself.' },
  { question: 'What process types are covered for manufacturability checks?', answer: 'Machining, sheet metal, casting, forging, injection moulding, and PCBA are the most commonly covered processes, with capability rules specific to each.' },
  { question: 'Can DFM findings be tied back to specific BOM line items?', answer: 'Yes. Each finding is linked to the BOM line item and part revision it applies to, so the history travels with the part as the design changes.' },
]

const procurementIntelligenceSections: SeoLandingPage['sections'] = [
  {
    heading: 'BOM-level visibility procurement teams don’t usually get',
    body: 'Cost and risk exposure are visible down to the individual line item, not just summarized at the purchase order level.',
    bullets: [
      'Cost and risk exposure visible down to individual line items.',
      'Flag parts with single-source or high-risk supplier exposure.',
      'Connect part-level data to programme timelines.',
    ],
  },
  {
    heading: 'Qualify and track suppliers without manual chasing',
    body: 'Certification and capacity status stay current without procurement having to re-request the same documents every quarter.',
    bullets: [
      'Certification and capability status kept current without email chains.',
      'Capacity and risk signals updated as conditions change.',
      'Qualification history reused across multiple sourcing events.',
    ],
  },
  {
    heading: 'Turn intelligence into sourcing decisions',
    body: 'Visibility only matters if it leads somewhere; opportunities are ranked so the team knows what to act on first.',
    bullets: [
      'Opportunity assessment ranked by savings potential and risk.',
      'Should-cost evidence available at the point of negotiation.',
      'Reporting built for programme and leadership reviews.',
    ],
  },
]

const procurementIntelligenceFaqs: SeoLandingPage['faqs'] = [
  { question: 'How does procurement intelligence differ from a standard procurement system?', answer: 'A standard procurement system manages purchase orders and approvals. Procurement intelligence adds BOM-level cost and risk visibility underneath those transactions, so decisions are informed by part-level evidence.' },
  { question: 'What’s needed to get BOM-level visibility running?', answer: 'A current BOM export, supplier list, and any existing quote history. Most of this can be connected within the first week of a pilot.' },
  { question: 'Can this support multiple business units or programmes at once?', answer: 'Yes. Data can be segmented by business unit or programme while still allowing a consolidated view where needed.' },
]

const rfqIntelligenceSections: SeoLandingPage['sections'] = [
  {
    heading: 'Prepare RFQs with evidence, not assumptions',
    body: 'A target cost and a pre-qualified shortlist go out with the RFQ, instead of being worked out after quotes come back.',
    bullets: [
      'Target costs built from process and material data before the RFQ goes out.',
      'Supplier shortlist pre-qualified on capability and certification.',
      'Technical assumptions documented so every supplier quotes against the same basis.',
    ],
  },
  {
    heading: 'Compare quotes on equal footing',
    body: 'Quotes are evaluated against the same should-cost target rather than ranked purely on lowest headline price.',
    bullets: [
      'Line-by-line comparison against the should-cost target.',
      'Flag quotes with unexplained variance from the model.',
      'Track quote history across revisions and suppliers.',
    ],
  },
  {
    heading: 'Close the loop after award',
    body: 'What actually happened after award is fed back into the system, so the next should-cost model is more accurate than the last.',
    bullets: [
      'Capture final negotiated terms against the original target.',
      'Feed actuals back into future should-cost models.',
      'Maintain an audit trail for engineering and finance review.',
    ],
  },
]

const rfqIntelligenceFaqs: SeoLandingPage['faqs'] = [
  { question: 'How early in the sourcing process should RFQ intelligence be used?', answer: 'Ideally before the RFQ is issued, so the target cost and supplier shortlist are ready when quotes start coming in rather than assembled afterward.' },
  { question: 'Can RFQ intelligence handle multiple supplier responses for the same part?', answer: 'Yes. Multiple quotes for the same part or assembly can be compared side by side against the same should-cost target.' },
  { question: 'Does this integrate with existing e-sourcing tools?', answer: 'Target costs and shortlists can be exported into existing e-sourcing or e-RFQ tools, so the evidence travels with the event rather than living separately.' },
]

const vaveSections: SeoLandingPage['sections'] = [
  {
    heading: 'Quantify design alternatives before committing',
    body: 'Material, process, or design changes are compared on cost impact before tooling commitment, rather than after the fact.',
    bullets: [
      'Compare cost impact of material, process, or design changes side by side.',
      'Model the should-cost outcome of each alternative before tooling commitment.',
      'Flag changes that affect manufacturability or supplier readiness.',
    ],
  },
  {
    heading: 'Track VAVE ideas from proposal to validated savings',
    body: 'Ideas move through a defined pipeline with an owner and a target part, rather than living in a slide deck that goes stale after one review.',
    bullets: [
      'Pipeline view of ideas by stage, owner, and target part.',
      'Cost impact captured at proposal and re-validated after implementation.',
      'Ideas linked back to the specific BOM line items they affect.',
    ],
  },
  {
    heading: 'Build a reusable library of validated ideas',
    body: 'A VAVE idea proven on one part is often relevant to similar parts in future programmes, if it can be found again.',
    bullets: [
      'Store successful VAVE changes by part family and process.',
      'Reuse validated savings logic across similar parts in future programmes.',
      'Avoid re-litigating ideas that were already proven out.',
    ],
  },
]

const vaveFaqs: SeoLandingPage['faqs'] = [
  { question: 'What’s the difference between VAVE and general cost reduction?', answer: 'VAVE specifically evaluates whether a design, material, or process change can reduce cost without compromising required function, using a structured comparison rather than an ad hoc cut.' },
  { question: 'Can VAVE software model multiple alternatives for the same part simultaneously?', answer: 'Yes. Several alternatives can be modeled and compared against the same baseline part to see which delivers the best cost-to-risk tradeoff.' },
  { question: 'How is VAVE savings impact validated after implementation?', answer: 'Proposed savings are re-checked against actual supplier quotes or production data once the change is implemented, so the recorded savings reflect reality, not just the original estimate.' },
]

const designToCostSections: SeoLandingPage['sections'] = [
  {
    heading: 'Set cost targets while the design is still flexible',
    body: 'A target cost is established at concept stage, while changes are still cheap, rather than discovered only once a design is locked.',
    bullets: [
      'Target costs established at concept stage based on process and material assumptions.',
      'Design decisions tracked against the target as the part matures.',
      'Drift flagged early, when changes are still inexpensive.',
    ],
  },
  {
    heading: 'Tradeoffs evaluated against the target, not after the fact',
    body: 'Design and sourcing alternatives are compared against the same number, so engineering and procurement are working from one shared reference.',
    bullets: [
      'Compare design and sourcing alternatives against the same cost target.',
      'Surface which decisions have the largest cost impact.',
      'Keep engineering and procurement aligned on the same number.',
    ],
  },
  {
    heading: 'Carry the target through to sourcing',
    body: 'The same target used during design carries through to the RFQ, instead of being replaced by a generic benchmark once sourcing starts.',
    bullets: [
      'Design-to-cost targets feed directly into RFQ and negotiation.',
      'Supplier quotes evaluated against the original target.',
      'Full traceability from concept target to final landed cost.',
    ],
  },
]

const designToCostFaqs: SeoLandingPage['faqs'] = [
  { question: 'At what design stage should design-to-cost targets be set?', answer: 'As early as concept or preliminary design, while material, process, and geometry decisions are still flexible enough to respond to the target.' },
  { question: 'How are targets adjusted as a design matures?', answer: 'Targets are revisited as design assumptions firm up, with variance tracked against the original number so any drift is visible rather than absorbed silently.' },
  { question: 'Does design-to-cost software replace traditional should-cost analysis?', answer: 'No. Should-cost analysis is the underlying method used to set and validate the target; design-to-cost is the discipline of tracking design decisions against that target over time.' },
]

const aerospaceSections: SeoLandingPage['sections'] = [
  {
    heading: 'Built for aerospace’s certification and traceability demands',
    body: 'Supplier and part data are structured to match how aerospace programmes are actually audited.',
    bullets: [
      'Supplier qualification tracked against AS9100 and NADCAP requirements.',
      'Full traceability from BOM line item to certified supplier and process.',
      'Documentation structured for programme and customer audits.',
    ],
  },
  {
    heading: 'Cost and supplier readiness for long-lifecycle programmes',
    body: 'Aerospace economics differ from high-volume manufacturing; cost models reflect that directly.',
    bullets: [
      'Should-cost models that account for aerospace-grade materials and low-volume process economics.',
      'Supplier capacity and risk visibility across multi-year programme commitments.',
      'Obsolescence and dual-source planning for long-running platforms.',
    ],
  },
  {
    heading: 'Support for both prime and tier supply chains',
    body: 'The same evidence that a prime needs for oversight is the evidence a tier supplier needs to demonstrate readiness.',
    bullets: [
      'Visibility suited to prime contractors managing multi-tier supply chains.',
      'Tier suppliers can demonstrate qualification and cost competitiveness with the same evidence.',
      'A shared data model reduces duplicate qualification work across primes.',
    ],
  },
]

const aerospaceFaqs: SeoLandingPage['faqs'] = [
  { question: 'Does this support AS9100 and NADCAP supplier qualification tracking?', answer: 'Yes. Supplier records track AS9100 and NADCAP status alongside capability and capacity data, so qualification status is visible wherever the supplier is used.' },
  { question: 'Can the platform handle low-volume, high-mix aerospace part families?', answer: 'Yes. Cost models are built to reflect low-volume process economics rather than assuming high-volume amortisation.' },
  { question: 'Is this suited for both prime contractors and tier suppliers?', answer: 'Yes. Primes get multi-tier supply chain visibility, while tier suppliers can use the same models to demonstrate cost competitiveness and qualification readiness.' },
]

const defenseSections: SeoLandingPage['sections'] = [
  {
    heading: 'Sourcing intelligence built for sensitive supply chains',
    body: 'Supplier data is structured to support the additional scrutiny defence sourcing requires.',
    bullets: [
      'Export control and ITAR-relevant supplier attributes tracked alongside qualification data.',
      'Domestic and allied-source flags for programmes with sourcing restrictions.',
      'Access and data handling aligned with defence programme security expectations.',
    ],
  },
  {
    heading: 'Should-cost evidence for sole-source and low-competition parts',
    body: 'A defensible cost estimate is still possible even when there is only one supplier capable of bidding.',
    bullets: [
      'Cost models built even where competitive quotes aren’t available.',
      'Benchmark against process and material data instead of relying on a single supplier’s number.',
      'Documentation suited for government cost-realism reviews.',
    ],
  },
  {
    heading: 'Programme sourcing readiness across long acquisition cycles',
    body: 'Sourcing readiness is tracked against the milestones that actually govern a defence acquisition timeline.',
    bullets: [
      'Track supplier and part readiness against programme milestones.',
      'Flag single-source and capacity risk before they affect a milestone.',
      'Maintain an audit trail across multi-year acquisition timelines.',
    ],
  },
]

const defenseFaqs: SeoLandingPage['faqs'] = [
  { question: 'How does the platform handle export control and ITAR considerations?', answer: 'Supplier and part records can carry export control and ITAR-relevant attributes, and access can be scoped accordingly, so sensitive data is handled within your existing compliance controls.' },
  { question: 'Can should-cost analysis work for sole-source defence parts?', answer: 'Yes. Models are built from process and material assumptions rather than supplier quotes, so a defensible cost estimate can be produced even without a competitive quote.' },
  { question: 'Is this designed for prime contractors, subcontractors, or both?', answer: 'Both. Primes get programme-level sourcing and risk visibility, and subcontractors can use the same should-cost evidence to support their own bids and reviews.' },
]

const supplyChainSections: SeoLandingPage['sections'] = [
  {
    heading: 'Map dependencies down to the BOM line item',
    body: 'Programme-level risk is only as accurate as the part-level data underneath it.',
    bullets: [
      'Trace which suppliers and parts sit behind each programme commitment.',
      'Flag single-source and geographic concentration risk at the part level.',
      'Roll part-level risk up into programme-level exposure views.',
    ],
  },
  {
    heading: 'See risk signals before they become disruptions',
    body: 'Risk signals are tracked continuously rather than reviewed only at scheduled intervals.',
    bullets: [
      'Capacity, financial, and delivery signals tracked per supplier.',
      'Certification and audit status flagged as it changes.',
      'Early visibility into risk concentrated in a single region or process.',
    ],
  },
  {
    heading: 'Plan alternatives before you need them',
    body: 'Having an alternative supplier already mapped turns a disruption into a switch instead of a scramble.',
    bullets: [
      'Pre-qualified alternative suppliers mapped against existing single-source parts.',
      'Should-cost comparisons ready if a sourcing switch becomes necessary.',
      'Dual-source plans documented for the highest-risk components.',
    ],
  },
]

const supplyChainFaqs: SeoLandingPage['faqs'] = [
  { question: 'How is supply chain intelligence different from supplier risk monitoring tools?', answer: 'Generic risk monitoring tools typically score a supplier in isolation. This connects that risk down to the specific BOM line items and programmes it actually affects.' },
  { question: 'Can this map risk down to individual BOM line items?', answer: 'Yes. Risk is tracked at the supplier level and rolled up through the BOM, so you can see exactly which parts and programmes are exposed to a given risk.' },
  { question: 'What data is needed to get supply chain visibility running?', answer: 'BOMs, supplier assignments, and any existing risk or certification data. Coverage expands as more programmes and BOMs are connected.' },
]

const benchmarkingSections: SeoLandingPage['sections'] = [
  {
    heading: 'Compare costs across process, geography, and supplier',
    body: 'The same part can be benchmarked multiple ways to find the most competitive realistic baseline.',
    bullets: [
      'Benchmark the same part costed under different manufacturing processes.',
      'Compare regional cost structures for labor, energy, and logistics.',
      'See how supplier-quoted prices stack up against modeled benchmarks.',
    ],
  },
  {
    heading: 'Benchmarks grounded in real process data',
    body: 'Benchmarks are built from actual cost drivers rather than a generic industry index, so they hold up to scrutiny.',
    bullets: [
      'Cost drivers built from material, cycle time, and overhead assumptions, not generic indices.',
      'Benchmarks updated as process and material data changes.',
      'Transparent assumptions that can be reviewed and adjusted.',
    ],
  },
  {
    heading: 'Use benchmarks to set realistic targets',
    body: 'A benchmark range turns a negotiation from a gut-feel argument into an evidence-based conversation.',
    bullets: [
      'Set should-cost targets informed by benchmark ranges, not guesswork.',
      'Identify when a supplier’s quote is genuinely out of range versus within normal variance.',
      'Support negotiation with evidence instead of opinion.',
    ],
  },
]

const benchmarkingFaqs: SeoLandingPage['faqs'] = [
  { question: 'What’s the difference between benchmarking and should-cost modeling?', answer: 'Should-cost modeling estimates the cost of one specific part. Benchmarking compares that estimate, or a supplier’s quote, against cost ranges seen across processes, regions, or suppliers.' },
  { question: 'How current are the benchmark assumptions?', answer: 'Assumptions are updated as new process, material, and regional cost data becomes available, rather than fixed at a single point in time.' },
  { question: 'Can benchmarks be customized for a specific region or process?', answer: 'Yes. Benchmarks can be scoped to the regions and processes relevant to your supply chain rather than relying on a global average.' },
]

const tcoSections: SeoLandingPage['sections'] = [
  {
    heading: 'Beyond unit price: the full cost picture',
    body: 'Unit price is only one part of what a sourcing decision actually costs over time.',
    bullets: [
      'Logistics, duty, and landed cost layered on top of unit price.',
      'Quality cost, including scrap, rework, and warranty exposure, factored in.',
      'Inventory carrying cost and lead-time risk included where relevant.',
    ],
  },
  {
    heading: 'Compare suppliers on total cost, not quoted price',
    body: 'The lowest quote is not always the lowest total cost once logistics, quality, and risk are accounted for.',
    bullets: [
      'Side-by-side total cost comparison across competing supplier quotes.',
      'Flag cases where the lowest quoted price isn’t the lowest total cost.',
      'Sensitivity views for currency, freight, and duty changes.',
    ],
  },
  {
    heading: 'Make the switching-cost tradeoff explicit',
    body: 'Switching suppliers has a cost too; that cost should be visible alongside the savings it might unlock.',
    bullets: [
      'Requalification and tooling cost factored into any supplier switch decision.',
      'Total cost of staying versus switching shown side by side.',
      'Documentation suited for sourcing decision sign-off.',
    ],
  },
]

const tcoFaqs: SeoLandingPage['faqs'] = [
  { question: 'What cost elements are included in a total cost of ownership calculation?', answer: 'Unit price, logistics and duty, quality cost such as scrap and warranty exposure, inventory carrying cost, and switching or requalification cost where relevant.' },
  { question: 'How does TCO analysis handle currency and freight volatility?', answer: 'Sensitivity views let you see how total cost shifts under different currency and freight assumptions, rather than relying on a single fixed scenario.' },
  { question: 'Can TCO models account for supplier switching and requalification cost?', answer: 'Yes. Switching cost, including requalification and tooling transfer, can be included so a switch decision reflects its true total cost, not just the new unit price.' },
]

const processLibrarySections: SeoLandingPage['sections'] = [
  {
    heading: 'A shared reference for cost-relevant process knowledge',
    body: 'Process cost drivers are documented once and reused, instead of being rebuilt from scratch for every new should-cost model.',
    bullets: [
      'Process-specific cost drivers for machining, casting, forging, sheet metal, PCBA, moulding, welding, and finishing.',
      'Typical cycle time, tooling, and overhead assumptions by process.',
      'Reference points engineering and procurement can both work from.',
    ],
  },
  {
    heading: 'Match parts to the right process and supplier capability',
    body: 'Specifying a process that doesn’t fit the part’s volume or tolerance is a common, expensive mistake.',
    bullets: [
      'Cross-reference part requirements against process capability limits.',
      'Flag when a specified process is a poor fit for the part’s volume or tolerance.',
      'Surface alternative processes worth evaluating.',
    ],
  },
  {
    heading: 'Keep process assumptions consistent across the team',
    body: 'When everyone works from the same process assumptions, should-cost models and RFQs stop disagreeing with each other.',
    bullets: [
      'One shared library instead of process knowledge living in individual spreadsheets.',
      'Assumptions reused consistently across should-cost models and RFQs.',
      'Updated as new process or supplier data becomes available.',
    ],
  },
]

const processLibraryFaqs: SeoLandingPage['faqs'] = [
  { question: 'Which manufacturing processes are covered in the library?', answer: 'CNC machining, sheet metal, casting, forging, PCBA, wire harness, injection moulding, welding, surface finishing, and precision assembly, with more added as coverage expands.' },
  { question: 'How are process cost assumptions kept up to date?', answer: 'Assumptions are reviewed as new process, material, and supplier quote data comes in, so the library reflects current cost conditions rather than a one-time snapshot.' },
  { question: 'Can the process library be used directly inside should-cost models?', answer: 'Yes. Process assumptions from the library feed directly into should-cost models, so a model doesn’t need to redefine cost drivers that already exist in the library.' },
]

const manufacturingIntelligenceSections: SeoLandingPage['sections'] = [
  {
    heading: 'One system connecting BOM, cost, and supplier data',
    body: 'Decisions are traceable back to the underlying engineering and commercial data, instead of being scattered across disconnected files.',
    bullets: [
      'BOM line items linked directly to should-cost models and supplier records.',
      'A single data model instead of disconnected spreadsheets across teams.',
      'Decisions traceable back to the underlying engineering and commercial data.',
    ],
  },
  {
    heading: 'Built for the full sourcing and cost workflow',
    body: 'Each stage of the workflow reuses the same underlying data, rather than starting over with a fresh data pull.',
    bullets: [
      'Supports the workflow from early design cost targets through RFQ, negotiation, and supplier management.',
      'Each module reuses the same underlying BOM and supplier data.',
      'Reduces duplicate data entry across engineering, procurement, and quality.',
    ],
  },
  {
    heading: 'Designed for high-stakes manufacturing programmes',
    body: 'Built specifically for the sectors where a weak data foundation leads to the most expensive late-stage decisions.',
    bullets: [
      'Built for sectors where weak data leads to costly late-stage decisions.',
      'Supports defence, aerospace, space, automotive, and precision manufacturing supply chains.',
      'Structured for audit and programme-level review.',
    ],
  },
]

const manufacturingIntelligenceFaqs: SeoLandingPage['faqs'] = [
  { question: 'What does ‘manufacturing intelligence’ mean in practice?', answer: 'It means BOM, cost, and supplier data living in one connected system, so a sourcing or engineering decision can be traced back to the data behind it rather than reconstructed from memory.' },
  { question: 'Which teams typically use the platform day to day?', answer: 'Procurement, cost engineering, supplier quality, and programme management teams, each working from the same underlying BOM and supplier data.' },
  { question: 'How does this differ from a standard PLM or ERP system?', answer: 'PLM and ERP systems manage design revisions and transactions. This layer focuses specifically on connecting that data to should-cost modelling and supplier intelligence for sourcing decisions.' },
]

const resourceCentreSections: SeoLandingPage['sections'] = [
  {
    heading: 'Practical references, not generic content',
    body: 'Material is organized around the decisions procurement, engineering, and supplier quality teams are actually trying to make.',
    bullets: [
      'Templates and calculators built around real should-cost and sourcing workflows.',
      'Guides written for procurement, engineering, and supplier quality teams specifically.',
      'Material organized by the decisions teams are actually trying to make.',
    ],
  },
  {
    heading: 'Calculators and templates you can use directly',
    body: 'These are working templates, intended to be filled in and used on a real sourcing event, not illustrative examples.',
    bullets: [
      'Should-cost and total-cost-of-ownership calculation templates.',
      'Supplier qualification and scorecard templates ready to adapt.',
      'RFQ preparation checklists covering technical and commercial assumptions.',
    ],
  },
  {
    heading: 'Reports grounded in manufacturing and sourcing data',
    body: 'Reports are linked back to the product capability that produced them, so a useful reference also shows where the underlying data lives.',
    bullets: [
      'Benchmarking and process-cost reports relevant to current sourcing decisions.',
      'Material updated as process and regional cost data changes.',
      'Resources linked back to the relevant product capability for deeper use.',
    ],
  },
]

const resourceCentreFaqs: SeoLandingPage['faqs'] = [
  { question: 'Are the templates and calculators free to use?', answer: 'Yes, the resource centre is open to use without requiring a paid account, though some templates link through to product capabilities that require a demo to access fully.' },
  { question: 'How often is the resource centre updated?', answer: 'New templates, guides, and reports are added as process, regional cost, and sourcing practices evolve, rather than on a fixed publishing schedule.' },
  { question: 'Can resource centre content be used without an Emithran account?', answer: 'Yes. Guides and templates are usable on their own; an account is only needed if you want to connect them directly to your own BOM and supplier data.' },
]

const germanPilotSections: SeoLandingPage['sections'] = [
  {
    heading: 'Benchmarking across Germany and India',
    body: 'The same part and process are compared across two manufacturing bases, using assumptions specific to each market rather than a single blended average.',
    bullets: [
      'Should-cost comparisons between German and Indian manufacturing for the same part and process.',
      'Regional labor, energy, and logistics assumptions specific to each market.',
      'Supplier capability mapped across both regions.',
    ],
  },
  {
    heading: 'Pilot structure built for a focused evaluation',
    body: 'A pilot works best with a defined, representative scope rather than trying to cover an entire BOM at once.',
    bullets: [
      'A defined set of representative parts and processes used for the pilot.',
      'Clear before-and-after comparison of cost and supplier options.',
      'Results documented for internal sourcing strategy decisions.',
    ],
  },
  {
    heading: 'Supplier intelligence across two manufacturing bases',
    body: 'The pilot produces a usable supplier shortlist in both regions, not just a cost comparison on paper.',
    bullets: [
      'Qualified supplier shortlists in both Germany and India for the piloted processes.',
      'Certification and capability comparison across both regions.',
      'Groundwork for a dual-source or shift-sourcing decision.',
    ],
  },
]

const germanPilotFaqs: SeoLandingPage['faqs'] = [
  { question: 'What does the German manufacturing cost pilot actually involve?', answer: 'A defined set of representative parts is modeled and benchmarked across German and Indian manufacturing, with a supplier shortlist produced in both regions for comparison.' },
  { question: 'How long does a typical pilot take to complete?', answer: 'Most pilots run over a few weeks, depending on how many parts and processes are included and how quickly BOM and supplier data can be shared.' },
  { question: 'Can the pilot focus on a specific process or part family only?', answer: 'Yes. The pilot scope is defined around the parts and processes most relevant to your sourcing question, rather than a fixed standard scope.' },
]

export const SEO_LANDING_PAGES: SeoLandingPage[] = [
  page('strategic-sourcing-software', 'Strategic Sourcing Software for Manufacturing | Emithran', 'Strategic sourcing software for defence, aerospace, space, and precision manufacturing teams that need cost evidence, supplier qualification, and RFQ intelligence in one workflow.', 'Strategic sourcing software for manufacturing teams that cannot afford weak supplier decisions.', 'strategic sourcing software', strategicSourcingSections, strategicSourcingFaqs),
  page('should-cost-modeling-software', 'Should-Cost Modeling Software | Emithran', 'Should-cost modeling software that turns drawings, BOMs, process routes, and supplier quotes into auditable target costs for engineered parts and assemblies.', 'Should-cost modeling software for data-backed supplier negotiation.', 'should cost modeling software', shouldCostModelingSections, shouldCostModelingFaqs),
  page('srm-software', 'SRM Software for Manufacturing Suppliers | Emithran', 'Supplier relationship management software for manufacturers that need qualification history, PPAP status, risk signals, and commercial performance in one supplier view.', 'SRM software built around real supplier performance and engineering context.', 'SRM software', srmSections, srmFaqs),
  page('spend-analysis-software', 'Spend Analysis Software for Manufacturing | Emithran', 'Spend analysis software for manufacturing procurement teams that need to find cost leakage across BOMs, suppliers, commodities, programmes, and geographies.', 'Spend analysis software that finds cost leakage inside complex manufacturing supply chains.', 'spend analysis software', spendAnalysisSections, spendAnalysisFaqs),
  page('cost-engineering-software', 'Cost Engineering Software | Emithran', 'Cost engineering software for should-cost models, manufacturing process benchmarks, part-family analysis, and negotiation-ready cost breakdowns.', 'Cost engineering software for teams that need defensible manufacturing cost models.', 'cost engineering software', costEngineeringSections, costEngineeringFaqs),
  page('design-for-manufacturability-software', 'Design for Manufacturability Software | Emithran', 'Design for manufacturability software that helps engineering and procurement teams identify manufacturability, cost, and supplier readiness risks before release.', 'Design for manufacturability software connected to cost and supplier intelligence.', 'design for manufacturability software', dfmSections, dfmFaqs),
  page('procurement-intelligence', 'Procurement Intelligence Platform | Emithran', 'Procurement intelligence for manufacturing teams that need BOM-level cost visibility, supplier qualification, risk tracking, and opportunity assessment.', 'Procurement intelligence for engineered products and mission-critical suppliers.', 'procurement intelligence', procurementIntelligenceSections, procurementIntelligenceFaqs),
  page('rfq-intelligence', 'RFQ Intelligence Software | Emithran', 'RFQ intelligence software that prepares supplier shortlists, target costs, technical assumptions, and negotiation briefs before sourcing teams release an RFQ.', 'RFQ intelligence software for faster, cleaner supplier events.', 'RFQ intelligence', rfqIntelligenceSections, rfqIntelligenceFaqs),
  page('vave-software', 'VAVE Software for Manufacturing | Emithran', 'VAVE software for value analysis and value engineering teams that need to quantify design alternatives, sourcing routes, and should-cost impact.', 'VAVE software that connects engineering ideas to validated cost impact.', 'VAVE software', vaveSections, vaveFaqs),
  page('design-to-cost-software', 'Design-to-Cost Software | Emithran', 'Design-to-cost software that helps manufacturers evaluate cost targets, supplier readiness, and manufacturability tradeoffs while products are still being designed.', 'Design-to-cost software for early product cost control.', 'design to cost software', designToCostSections, designToCostFaqs),
  page('aerospace-manufacturing-software', 'Aerospace Manufacturing Software | Emithran', 'Aerospace manufacturing software for cost engineering, BOM intelligence, supplier qualification, and programme sourcing readiness.', 'Aerospace manufacturing software for cost, supplier, and BOM intelligence.', 'aerospace manufacturing software', aerospaceSections, aerospaceFaqs),
  page('defense-manufacturing-software', 'Defense Manufacturing Software | Emithran', 'Defense manufacturing software for secure BOM validation, supplier intelligence, should-cost modelling, and strategic sourcing workflows.', 'Defense manufacturing software for secure sourcing and cost intelligence.', 'defense manufacturing software', defenseSections, defenseFaqs),
  page('supply-chain-intelligence', 'Supply Chain Intelligence Platform | Emithran', 'Supply chain intelligence for manufacturers that need supplier risk, sourcing alternatives, delivery exposure, and BOM-level dependency visibility.', 'Supply chain intelligence for mission-critical manufacturing programmes.', 'supply chain intelligence', supplyChainSections, supplyChainFaqs),
  page('manufacturing-benchmarking', 'Manufacturing Benchmarking Platform | Emithran', 'Manufacturing benchmarking software for comparing process costs, supplier quotes, geographies, and production routes across engineered parts.', 'Manufacturing benchmarking for cost engineers and sourcing teams.', 'manufacturing benchmarking', benchmarkingSections, benchmarkingFaqs),
  page('total-cost-ownership', 'Total Cost of Ownership Guide for Manufacturing | Emithran', 'A manufacturing total cost of ownership guide covering unit price, logistics, quality, inventory, tooling, risk, and supplier switching cost.', 'Total cost of ownership for manufacturing sourcing decisions.', 'total cost ownership manufacturing', tcoSections, tcoFaqs),
  page('manufacturing-process-library', 'Manufacturing Process Library | Emithran', 'A manufacturing process library for cost engineering teams covering machining, casting, forging, sheet metal, PCBA, moulding, welding, and finishing routes.', 'Manufacturing process library for should-cost and sourcing teams.', 'manufacturing process library', processLibrarySections, processLibraryFaqs),
  page('manufacturing-intelligence', 'Manufacturing Intelligence Platform | Emithran', 'Emithran is an AI-powered manufacturing intelligence platform that connects BOMs, should-cost models, supplier data, and sourcing workflows for precision manufacturing teams.', 'Manufacturing intelligence for the complete product cost and supplier workflow.', 'manufacturing intelligence', manufacturingIntelligenceSections, manufacturingIntelligenceFaqs),
  page('resource-centre', 'Manufacturing Resource Centre | Emithran', 'Templates, calculators, guides, and reports for manufacturing cost engineering, supplier intelligence, BOM management, and sourcing teams.', 'Manufacturing resource centre for cost and sourcing teams.', 'manufacturing resource centre', resourceCentreSections, resourceCentreFaqs),
  page('german-manufacturing-cost-pilot', 'German Manufacturing Cost Pilot | Emithran', 'A Germany-focused pilot page for manufacturing cost benchmarking, supplier comparison, and should-cost workflows across India and Europe.', 'Germany manufacturing cost intelligence pilot.', 'germany manufacturing cost benchmarking', germanPilotSections, germanPilotFaqs),
]

const glossarySeed = [
  'should cost analysis', 'BOM management', 'supplier intelligence', 'strategic sourcing', 'SRM',
  'spend analysis', 'cost engineering', 'design for manufacturability', 'VAVE', 'RFQ',
  'design to cost', 'aerospace manufacturing', 'defence manufacturing', 'supply chain risk',
  'manufacturing benchmarking', 'total cost of ownership', 'process routing', 'machine hourly rate',
  'PPAP', 'APQP', 'landed cost', 'dual sourcing', 'single source risk', 'supplier qualification',
  'cost breakdown analysis', 'MRO spend', 'vendor negotiation', 'AI sourcing', 'global strategic sourcing',
  'aPriori alternative', 'Costimator alternative', 'procurement intelligence', 'supplier radar',
  'BOM validation', 'cost driver', 'manufacturing intelligence', 'digital twin manufacturing',
  'precision manufacturing', 'space manufacturing', 'CMMC manufacturing', 'defence procurement',
  'spend opportunity assessment', 'procurement consulting', 'international procurement',
  'manufacturing process library', 'commodity price index', 'CAD costing', 'sheet metal costing',
  'CNC machining cost', 'casting cost', 'forging cost', 'injection moulding cost', 'PCBA costing',
  'wire harness costing', 'quality cost', 'tooling amortisation', 'batch size', 'cycle time',
  'overhead allocation', 'supplier capacity', 'supplier scorecard', 'NADCAP', 'AS9100',
  'IATF 16949', 'ISO 27001', 'export control', 'ITAR', 'DDP logistics', 'EXW pricing',
  'make vs buy', 'teardown analysis', 'reverse BOM', 'target costing', 'should cost model',
  'procurement savings', 'manufacturing analytics', 'supplier resilience', 'cost avoidance',
  'engineering change cost', 'launch readiness', 'new product introduction', 'programme sourcing',
]

const glossaryDefinitions: Record<string, string> = {
  'should cost analysis': 'An engineering-based estimate of what a part or assembly should cost to produce, built from material, process, labor, and overhead data rather than relying solely on supplier quotes.',
  'BOM management': 'The practice of structuring, validating, and maintaining a bill of materials so that part data, sourcing status, and cost information stay accurate as a product moves through design and production.',
  'supplier intelligence': 'Structured data on supplier capability, certification, capacity, risk, and performance, used to qualify and compare suppliers before and during sourcing decisions.',
  'strategic sourcing': 'A category-level approach to procurement that aligns supplier selection, negotiation, and contracting with longer-term business and programme goals, rather than sourcing parts one RFQ at a time.',
  'SRM': 'Supplier Relationship Management: the ongoing management of supplier qualification, performance, risk, and collaboration after a sourcing decision has been made, covering the full life of the relationship.',
  'spend analysis': 'The process of categorizing and reviewing procurement spend by commodity, supplier, or part family to identify savings opportunities, maverick spend, and pricing inconsistencies.',
  'cost engineering': 'The discipline of building and validating manufacturing cost models from process, material, and labor data to support design, sourcing, and negotiation decisions.',
  'design for manufacturability': 'An engineering practice of designing parts so they can be produced efficiently and at lower cost with available manufacturing processes, reducing scrap, rework, and tooling complexity.',
  'VAVE': 'Value Analysis / Value Engineering: a structured method for evaluating design, material, or process alternatives to reduce cost or improve function without compromising a part’s required performance.',
  'RFQ': 'Request for Quotation: a formal document sent to suppliers asking them to quote price, lead time, and terms for a defined part, assembly, or service, usually based on drawings and technical requirements.',
  'design to cost': 'An approach where a target cost is set early in product design and engineering decisions are made to stay within that target, rather than costing the design only after it is finalized.',
  'aerospace manufacturing': 'Manufacturing for aircraft, spacecraft, and related systems, typically governed by strict certification standards such as AS9100 and NADCAP, low-volume production economics, and long programme lifecycles.',
  'defence manufacturing': 'Manufacturing for military and defence programmes, often subject to export control, security clearance, and qualification requirements specific to government and prime contractor supply chains.',
  'supply chain risk': 'Exposure to disruption from single-source suppliers, geographic concentration, capacity constraints, financial instability, or quality issues anywhere in a product’s supplier network.',
  'manufacturing benchmarking': 'Comparing the cost of producing a part across different manufacturing processes, suppliers, or regions to identify the most competitive and realistic cost baseline.',
  'total cost of ownership': 'The full cost of a sourced part or service over its lifecycle, including unit price, logistics, duty, quality cost, inventory carrying cost, and switching or requalification cost.',
  'process routing': 'The defined sequence of manufacturing operations, such as machining, finishing, and inspection steps, that a part follows from raw material to finished component.',
  'machine hourly rate': 'The cost per hour of operating a specific machine or production line, used as a key input when building should-cost models for machined or processed parts.',
  'PPAP': 'Production Part Approval Process: a standardized set of documentation and testing requirements, common in automotive and precision manufacturing, used to confirm that a supplier’s production process can consistently meet part specifications.',
  'APQP': 'Advanced Product Quality Planning: a structured framework for planning and validating a new product’s design and manufacturing process before full production begins, commonly used alongside PPAP.',
  'landed cost': 'The total cost of a part once it arrives at its destination, including unit price, freight, duty, insurance, and any handling charges incurred in transit.',
  'dual sourcing': 'A sourcing strategy of qualifying two suppliers for the same part or process to reduce dependency on a single source and improve supply continuity.',
  'single source risk': 'The exposure created when only one supplier is qualified or capable of producing a given part, leaving a programme vulnerable if that supplier fails to deliver.',
  'supplier qualification': 'The process of verifying that a supplier meets the certification, capability, capacity, and quality requirements needed to produce a given part or service.',
  'cost breakdown analysis': 'Decomposing a part’s quoted or modeled price into its underlying components, such as material, labor, overhead, tooling, and margin, to evaluate where cost is concentrated.',
  'MRO spend': 'Procurement spend on maintenance, repair, and operations items, such as consumables, tooling, and facility supplies, as distinct from spend on production parts and materials.',
  'vendor negotiation': 'The process of discussing price, terms, and conditions with a supplier, ideally supported by should-cost evidence and clear technical assumptions rather than price alone.',
  'AI sourcing': 'The use of machine learning or AI-assisted tools to support supplier discovery, cost estimation, or risk scoring within a sourcing and procurement workflow.',
  'global strategic sourcing': 'Strategic sourcing extended across multiple countries and regions, weighing cost, capability, risk, and logistics tradeoffs between domestic and international supplier options.',
  'aPriori alternative': 'A should-cost and manufacturing cost modeling option evaluated by teams comparing platforms against aPriori’s automated costing software for similar use cases.',
  'Costimator alternative': 'A should-cost and quoting platform option evaluated by teams comparing tools against Costimator’s estimating software for machining and fabrication cost analysis.',
  'procurement intelligence': 'Data-driven visibility into spend, supplier performance, and sourcing opportunity at the BOM or part level, used to inform procurement strategy and decisions.',
  'supplier radar': 'A capability for continuously scanning and surfacing qualified or potential suppliers based on process, certification, and capacity criteria relevant to a specific sourcing need.',
  'BOM validation': 'Checking a bill of materials for completeness, accuracy, and consistency, such as correct part numbers, quantities, and specifications, before it is used for sourcing or production.',
  'cost driver': 'A specific factor, such as material grade, batch size, or process complexity, that has a measurable effect on the cost of producing a part.',
  'manufacturing intelligence': 'The combination of BOM, cost, and supplier data into a connected system that supports sourcing, cost engineering, and supply chain decisions with consistent, traceable evidence.',
  'digital twin manufacturing': 'Using a virtual model of a part, process, or production line to simulate and evaluate manufacturing or cost outcomes before committing to physical production.',
  'precision manufacturing': 'Manufacturing processes that hold tight tolerances and high repeatability, typically required in aerospace, defence, medical, and other high-reliability industries.',
  'space manufacturing': 'Manufacturing for spacecraft and satellite programmes, characterized by low production volumes, stringent qualification requirements, and high cost of failure.',
  'CMMC manufacturing': 'Manufacturing carried out under the Cybersecurity Maturity Model Certification framework, a U.S. Department of Defense requirement for protecting controlled information across the defence supply chain.',
  'defence procurement': 'The process by which government or prime contractor buyers source parts, systems, or services for military programmes, often under additional security and compliance requirements.',
  'spend opportunity assessment': 'An analysis identifying where procurement spend could be reduced or better managed, typically by comparing current spend against should-cost benchmarks or alternative sourcing options.',
  'procurement consulting': 'Advisory services that help organizations improve sourcing strategy, cost visibility, or supplier management, often as a precursor to or alongside adopting procurement software.',
  'international procurement': 'Sourcing parts, materials, or services from suppliers outside a buyer’s home country, involving additional considerations such as logistics, duty, currency, and regulatory compliance.',
  'manufacturing process library': 'A reference set of manufacturing processes, such as machining, casting, forging, and moulding, along with their typical cost drivers and capability limits, used to inform costing and sourcing decisions.',
  'commodity price index': 'A tracked benchmark of pricing for raw materials or commodities, such as steel, aluminium, or resin, used to adjust cost models and contracts as input prices change.',
  'CAD costing': 'Estimating manufacturing cost directly from a part’s CAD model by analyzing geometry, material, and features relevant to the intended manufacturing process.',
  'sheet metal costing': 'Estimating the cost of producing a sheet metal part based on factors such as material thickness, cutting and forming operations, tooling, and finishing requirements.',
  'CNC machining cost': 'The cost of producing a part via CNC machining, driven by factors such as material removal volume, cycle time, tolerance requirements, and machine type.',
  'casting cost': 'The cost of producing a part via casting, influenced by factors such as tooling cost, material, casting method, and post-cast machining or finishing requirements.',
  'forging cost': 'The cost of producing a part via forging, influenced by tooling and die cost, material, part complexity, and any secondary machining required after forging.',
  'injection moulding cost': 'The cost of producing a plastic part via injection moulding, driven by tooling cost, resin type and volume, cycle time, and part complexity.',
  'PCBA costing': 'Estimating the cost of a populated printed circuit board assembly, factoring in bare board cost, component cost, and assembly and testing labor.',
  'wire harness costing': 'Estimating the cost of a wire harness assembly based on factors such as wire gauge and length, connector types, labor for assembly and termination, and testing requirements.',
  'quality cost': 'The total cost associated with ensuring and failing to ensure quality, including inspection, scrap, rework, warranty claims, and corrective action.',
  'tooling amortisation': 'Spreading the upfront cost of manufacturing tooling, such as moulds or dies, across the expected production volume to determine its per-part cost contribution.',
  'batch size': 'The quantity of parts produced together in a single production run, which directly affects per-part cost through tooling amortisation, setup time, and overhead allocation.',
  'cycle time': 'The time required to complete one full production operation on a part, a key input into machine hourly rate calculations and overall manufacturing cost.',
  'overhead allocation': 'The method by which indirect manufacturing costs, such as facility, utilities, and administrative expense, are distributed across individual parts or production runs.',
  'supplier capacity': 'A supplier’s available production capability and throughput for a given process or part family, relevant to assessing whether they can meet programme volume requirements.',
  'supplier scorecard': 'A structured record tracking a supplier’s performance across dimensions such as quality, delivery, cost, and responsiveness, typically reviewed on a recurring basis.',
  'NADCAP': 'An industry-managed accreditation program for special processes, such as heat treating, welding, and non-destructive testing, widely required of suppliers in aerospace and defence supply chains.',
  'AS9100': 'A quality management system standard specific to the aerospace industry, building on ISO 9001 with additional requirements for safety, reliability, and traceability.',
  'IATF 16949': 'A quality management system standard for the automotive industry, defining requirements for suppliers in vehicle production and related service part supply chains.',
  'ISO 27001': 'An international standard for information security management systems, relevant to suppliers and platforms handling sensitive programme, design, or supplier data.',
  'export control': 'Government regulations restricting the export of certain goods, technology, or technical data, relevant to manufacturers and suppliers working on defence, aerospace, or dual-use programmes.',
  'ITAR': 'International Traffic in Arms Regulations: U.S. government regulations controlling the export of defence-related articles and services, affecting which suppliers and personnel can access certain technical data.',
  'DDP logistics': 'Delivered Duty Paid: a shipping term where the seller is responsible for delivering goods to the buyer’s destination, including all transport, duty, and import costs.',
  'EXW pricing': 'Ex Works: a shipping term where the buyer takes responsibility for transport, insurance, and costs from the seller’s premises onward, with the seller’s price reflecting only the goods themselves.',
  'make vs buy': 'A decision framework for determining whether a part or process should be produced in-house or sourced from an external supplier, typically weighing cost, capability, and capacity.',
  'teardown analysis': 'Disassembling a competitor’s or existing product to evaluate its components, manufacturing methods, and estimated cost, often used to benchmark design and sourcing decisions.',
  'reverse BOM': 'Reconstructing a bill of materials by working backward from a physical product, typically through teardown analysis, when an original BOM is unavailable or needs verification.',
  'target costing': 'Setting a maximum allowable cost for a part or product based on market price and desired margin, then designing and sourcing to meet that target.',
  'should cost model': 'A structured cost estimate built from material, process, labor, and overhead assumptions, used as a reference point for evaluating supplier quotes and negotiation positions.',
  'procurement savings': 'Measurable cost reductions achieved through sourcing actions such as renegotiation, supplier switching, or specification changes, typically tracked against a cost baseline.',
  'manufacturing analytics': 'The use of data analysis across BOM, cost, supplier, and quality information to identify trends, risks, and opportunities within a manufacturing supply chain.',
  'supplier resilience': 'A supplier’s ability to maintain delivery, quality, and capacity through disruptions such as demand spikes, material shortages, or geopolitical events.',
  'cost avoidance': 'Savings achieved by preventing a cost increase before it happens, such as locking in pricing or qualifying an alternative supplier ahead of a price rise, as distinct from a direct cost reduction.',
  'engineering change cost': 'The total cost impact of modifying a part or assembly after initial release, including redesign, requalification, tooling changes, and any resulting schedule delay.',
  'launch readiness': 'The state of having BOMs, suppliers, tooling, and quality processes validated and in place ahead of a planned production start date.',
  'new product introduction': 'The process of moving a product from design through to validated, sourced, and qualified production, encompassing BOM finalization, supplier qualification, and process validation.',
  'programme sourcing': 'Sourcing activity managed at the level of an entire product programme rather than individual parts, coordinating supplier and cost decisions across the full BOM and timeline.',
}

export const GLOSSARY_TERMS = glossarySeed.map((term) => {
  const slug = term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    slug,
    term,
    title: `${term.replace(/\b\w/g, c => c.toUpperCase())} | Emithran Glossary`,
    description: glossaryDefinitions[term] ?? `Definition of ${term} for manufacturing, sourcing, cost engineering, and supplier intelligence teams.`,
  }
})

export const PROGRAMMATIC_SUPPLIER_PAGES = Array.from({ length: 220 }, (_, index) => {
  const processes = ['cnc-machining', 'sheet-metal', 'casting', 'forging', 'pcba', 'wire-harness', 'injection-moulding', 'welding', 'surface-finishing', 'precision-assembly']
  const regions = ['bangalore', 'chennai', 'pune', 'hyderabad', 'coimbatore', 'ahmedabad', 'delhi-ncr', 'mumbai', 'mysuru', 'hosur', 'germany', 'uk', 'uae']
  const process = processes[index % processes.length]
  const region = regions[index % regions.length]
  return {
    slug: `${process}-suppliers-${region}-${index + 1}`,
    title: `${process.replace(/-/g, ' ')} suppliers in ${region.replace(/-/g, ' ')} | Emithran`,
    process,
    region,
  }
})

export interface GermanLandingPage {
  slug: string
  title: string
  description: string
  h1: string
  intro: string
  sections: { heading: string; body: string; bullets: string[] }[]
  faqs: { question: string; answer: string }[]
}

function dePage(
  slug: string,
  title: string,
  description: string,
  h1: string,
  sections: GermanLandingPage['sections'],
  faqs: GermanLandingPage['faqs']
): GermanLandingPage {
  return { slug, title, description, h1, intro: description, sections, faqs }
}

export const DE_PAGES: GermanLandingPage[] = [
  dePage(
    'should-cost-analysis-software',
    'Should-Cost-Analyse Software | Emithran Deutschland',
    'Emithran ist Should-Cost-Analyse-Software, die belastbare Kostenmodelle aus Zeichnungen, Stücklisten und Lieferantenangeboten erstellt – für deutsche Fertigungsteams mit globalen Lieferketten.',
    'Should-Cost-Analyse für belastbare Kostenmodelle – nicht nur Lieferantenangebote.',
    [
      {
        heading: 'Kostenmodelle aus echten Fertigungsdaten',
        body: 'Emithran berechnet Kostenmodelle bottom-up aus Material-, Prozess- und Arbeitszeitdaten – nicht aus pauschalen Schätzwerten.',
        bullets: [
          'Materialpreise und Rohstoffindizes in Echtzeit.',
          'Prozessspezifische Taktzeiten und Maschinenstundensätze.',
          'Werkzeug- und Gemeinkosten nach Losgröße.',
        ],
      },
      {
        heading: 'Lieferantenangebote Zeile für Zeile prüfen',
        body: 'Angebotene Preise werden direkt mit dem Kostenmodell verglichen, damit Abweichungen vor der Verhandlung sichtbar sind.',
        bullets: [
          'Soll-Ist-Vergleich auf Positionsebene.',
          'Automatische Kennzeichnung unplausibler Abweichungen.',
          'Angebotshistorie über mehrere Vergaberunden.',
        ],
      },
      {
        heading: 'Vom Modell zur Verhandlungsgrundlage',
        body: 'Kostenaufschlüsselungen lassen sich direkt für Einkaufsgespräche exportieren – inklusive Sensitivitätsanalysen für Volumen, Material und Standort.',
        bullets: [
          'Exportierbare Kostenaufschlüsselung für Verhandlungen.',
          'Sensitivitätsanalyse für Volumen, Material und Region.',
          'Nachvollziehbare Dokumentation für Engineering und Einkauf.',
        ],
      },
    ],
    [
      { question: 'Was ist Should-Cost-Analyse-Software?', answer: 'Should-Cost-Analyse-Software erstellt eine Bottom-up-Schätzung dessen, was ein Bauteil herstellungstechnisch kosten sollte – basierend auf Material, Prozess, Arbeitszeit und Gemeinkosten, statt sich allein auf das Angebot eines Lieferanten zu verlassen. Emithran verbindet diesen Prozess mit BOM-Validierung und Lieferantenintelligenz.' },
      { question: 'Eignet sich Emithran für deutsche Fertigungsteams mit Sourcing in Indien?', answer: 'Ja. Emithran bildet sowohl deutsche als auch indische Kostenstrukturen (Material, Arbeitszeit, Logistik) ab, sodass Standortvergleiche direkt im selben Modell möglich sind – ohne separate Tabellenkalkulationen für jede Region.' },
      { question: 'Wie schnell lässt sich ein erstes Kostenmodell erstellen?', answer: 'Ein fokussierter Pilot lässt sich in der Regel innerhalb von Tagen starten, sobald repräsentative Zeichnungen, Stücklisten und Ziel-Workflows vorliegen.' },
    ]
  ),
  dePage(
    'supplier-intelligence',
    'Lieferantenintelligenz Plattform | Emithran Deutschland',
    'Emithran ist Lieferantenintelligenz-Software, die qualifizierte Alternativen zwischen Deutschland, Europa und Indien sichtbar macht – mit Qualifizierungs-Scoring, Risikosignalen und Kostenbenchmarks.',
    'Lieferantenintelligenz zwischen Deutschland, Europa und Indien.',
    [
      {
        heading: 'Lieferantendaten an einem Ort statt in Tabellen',
        body: 'Qualifizierung, Zertifizierungen und Leistungsdaten liegen in einem strukturierten Lieferantenprofil – nicht verteilt über Einkauf, Qualität und Engineering.',
        bullets: [
          'Qualifizierungsstatus, Zertifikate und Audit-Historie zentral.',
          'Kapazitäts- und Risikosignale, laufend aktualisiert.',
          'Liefertreue und Qualitätskennzahlen im Zeitverlauf.',
        ],
      },
      {
        heading: 'Alternativen sichtbar machen, bevor es eng wird',
        body: 'Für kritische Bauteile lassen sich qualifizierte Alternativlieferanten in Deutschland, Europa und Indien automatisch ermitteln.',
        bullets: [
          'Dual-Sourcing-Vorschläge für Single-Source-Bauteile.',
          'Kostenvergleich zwischen Standorten auf Basis von Should-Cost-Daten.',
          'Zertifizierungsabgleich (IATF 16949, AS9100, NADCAP) je Standort.',
        ],
      },
      {
        heading: 'Risikosignale, bevor sie zum Problem werden',
        body: 'Finanzielle, geografische und kapazitätsbezogene Risiken werden laufend erfasst, statt nur im jährlichen Lieferantenaudit sichtbar zu werden.',
        bullets: [
          'Frühwarnung bei Zertifizierungsablauf oder Audit-Befunden.',
          'Geografische und Single-Source-Konzentration auf einen Blick.',
          'Risikodaten direkt mit betroffenen Stücklistenpositionen verknüpft.',
        ],
      },
    ],
    [
      { question: 'Was ist Lieferantenintelligenz-Software?', answer: 'Lieferantenintelligenz-Software bündelt Daten zu Lieferantenfähigkeit, Zertifizierung, Kapazität und Risiko, damit Einkaufs- und Engineering-Teams Lieferanten vor einer Sourcing-Entscheidung fundiert vergleichen können. Emithran verbindet dies mit einer Datenbank von über 72.000 Lieferanten in Indien.' },
      { question: 'Kann Emithran deutsche und indische Lieferanten gleichzeitig vergleichen?', answer: 'Ja. Kapazität, Zertifizierung und Kostenbenchmarks werden für beide Regionen im selben System abgebildet, sodass eine Dual-Sourcing- oder Verlagerungsentscheidung auf einer einheitlichen Datenbasis getroffen werden kann.' },
      { question: 'Welche Zertifizierungen werden unterstützt?', answer: 'Unter anderem IATF 16949, AS9100 und NADCAP – je nach Branche und Bauteilanforderung.' },
    ]
  ),
  dePage(
    'bom-management-software',
    'Stücklisten-Management Software | Emithran Deutschland',
    'Emithran ist Stücklisten-Management-Software mit automatischer Validierung, Should-Cost-Integration und Echtzeit-Zusammenarbeit für Engineering-, Einkaufs- und Qualitätsteams.',
    'Stücklisten, die Engineering und Einkauf wirklich vertrauen können.',
    [
      {
        heading: 'Automatische Validierung statt manueller Prüfung',
        body: 'Stücklisten werden automatisch auf Teilenummernfehler, Dubletten und Einheiteninkonsistenzen geprüft – in der Regel in unter zwei Minuten für 500 Positionen.',
        bullets: [
          'Erkennung von Dubletten und inkonsistenten Spezifikationen.',
          'Validierung direkt beim Import aus Excel, CSV oder ERP.',
          'Fehlerkategorisierung nach Schweregrad.',
        ],
      },
      {
        heading: 'Kostendaten direkt auf Positionsebene',
        body: 'Jede Stücklistenposition lässt sich mit einem Should-Cost-Modell verknüpfen – sichtbar wird, was ein Bauteil kosten sollte, nicht nur, was aktuell bezahlt wird.',
        bullets: [
          'Should-Cost-Verknüpfung je Position.',
          'Kostenrollup nach Baugruppe und Programm.',
          'Lieferantenrisiko direkt an betroffenen Positionen sichtbar.',
        ],
      },
      {
        heading: 'Zusammenarbeit mit vollständiger Nachvollziehbarkeit',
        body: 'Engineering, Einkauf und Qualität arbeiten an derselben Stückliste, mit rollenbasierten Rechten und lückenlosem Änderungsprotokoll.',
        bullets: [
          'Rollenbasierte Freigabe- und Kommentarfunktionen.',
          'Vollständiges Änderungsprotokoll für Audits.',
          'Zwei-Wege-Integration mit SAP, Oracle und Infor.',
        ],
      },
    ],
    [
      { question: 'Was ist Stücklisten-Management-Software?', answer: 'Stücklisten-Management-Software gibt Engineering-, Einkaufs- und Lieferketten-Teams ein einheitliches System für jede Komponente eines Produkts – Teilenummern, Mengen, Materialien, Spezifikationen, Kosten und Lieferantendaten. Emithran ergänzt dies um KI-gestützte Validierung und Should-Cost-Integration.' },
      { question: 'Lässt sich Emithran in unser SAP- oder Oracle-System integrieren?', answer: 'Ja. Emithran integriert sich über API oder vorgefertigte Konnektoren mit SAP, Oracle und Infor – Stücklisten lassen sich importieren, validieren und freigegeben zurückspielen, ohne erneute manuelle Eingabe.' },
      { question: 'Welche Dateiformate werden beim Stücklisten-Import unterstützt?', answer: 'Excel (.xlsx, .xls), CSV sowie direkte ERP-Exportformate. Bei abweichenden Formaten unterstützt unser Team bei der Anbindung.' },
    ]
  ),
  dePage(
    'manufacturing-intelligence',
    'Fertigungsintelligenz Plattform | Emithran Deutschland',
    'Emithran ist eine KI-gestützte Fertigungsintelligenz-Plattform, die Stücklisten, Should-Cost-Modelle und Lieferantendaten für Engineering- und Einkaufsteams verbindet.',
    'Fertigungsintelligenz für den gesamten Kosten- und Lieferantenworkflow.',
    [
      {
        heading: 'Ein System statt verteilter Tabellen',
        body: 'Stücklistenpositionen sind direkt mit Should-Cost-Modellen und Lieferantendatensätzen verknüpft – Entscheidungen lassen sich bis zur zugrunde liegenden Engineering- und Kommerzdaten zurückverfolgen.',
        bullets: [
          'Einheitliches Datenmodell für Engineering, Einkauf und Qualität.',
          'Nachvollziehbare Entscheidungsgrundlage statt verteilter Dateien.',
          'Weniger doppelte Dateneingabe zwischen Teams.',
        ],
      },
      {
        heading: 'Für den gesamten Sourcing- und Kostenworkflow gebaut',
        body: 'Von frühen Kostenzielen im Design bis zu Angebotsvergleich, Verhandlung und Lieferantenmanagement – jedes Modul nutzt dieselben Stücklisten- und Lieferantendaten.',
        bullets: [
          'Durchgängiger Workflow von Designkostenziel bis Vergabe.',
          'Gemeinsame Datenbasis über alle Module.',
          'Reduzierter Abstimmungsaufwand zwischen Abteilungen.',
        ],
      },
      {
        heading: 'Gebaut für anspruchsvolle Fertigungsprogramme',
        body: 'Entwickelt für Branchen, in denen unzureichende Datenqualität zu kostspieligen Entscheidungen in späten Projektphasen führt.',
        bullets: [
          'Geeignet für Automotive, Luft- und Raumfahrt sowie Verteidigung.',
          'Strukturiert für Audit- und Programmreviews.',
          'Skalierbar über mehrere Standorte und Lieferketten.',
        ],
      },
    ],
    [
      { question: 'Was bedeutet Fertigungsintelligenz konkret?', answer: 'Fertigungsintelligenz bedeutet, dass Stücklisten-, Kosten- und Lieferantendaten in einem verbundenen System liegen, sodass sich eine Sourcing- oder Engineering-Entscheidung bis zur zugrunde liegenden Datenbasis zurückverfolgen lässt – statt sie aus Gedächtnis oder verteilten Tabellen zu rekonstruieren.' },
      { question: 'Für welche Branchen ist Emithran geeignet?', answer: 'Insbesondere für Automotive-Zulieferer, Luft- und Raumfahrt, Verteidigung sowie präzisionsgefertigte Industriekomponenten – Branchen mit hohen Anforderungen an Kostentransparenz und Lieferantenqualifikation.' },
      { question: 'Wie unterscheidet sich das von einem klassischen ERP- oder PLM-System?', answer: 'ERP- und PLM-Systeme verwalten Transaktionen beziehungsweise Konstruktionsstände. Emithran ergänzt dies um die Verbindung von Should-Cost-Modellierung und Lieferantenintelligenz für konkrete Sourcing-Entscheidungen.' },
    ]
  ),
  dePage(
    'defence-aerospace-manufacturing',
    'Verteidigung & Luftfahrt Fertigungssoftware | Emithran',
    'Emithran ist Fertigungsintelligenz-Software für Verteidigungs- und Luftfahrtprogramme – mit AS9100- und NADCAP-fähiger Lieferantenqualifizierung, Should-Cost-Modellen und mehrstufigem Stücklistenmanagement.',
    'Fertigungsintelligenz für Verteidigung und Luft- und Raumfahrt.',
    [
      {
        heading: 'Lieferantenqualifizierung nach Branchenstandard',
        body: 'Lieferanten werden gegen AS9100, NADCAP und programmspezifische Anforderungen qualifiziert – mit lückenloser, prüfbarer Dokumentation.',
        bullets: [
          'AS9100- und NADCAP-Status je Lieferant und Bauteil.',
          'Audit-Historie und Zertifikatsablauf im Blick.',
          'Dokumentation für Programm- und Kundenaudits.',
        ],
      },
      {
        heading: 'Kostenmodelle für anspruchsvolle Stückzahlen',
        body: 'Should-Cost-Modelle berücksichtigen die Wirtschaftlichkeit kleiner Losgrößen und spezialisierter Werkstoffe – statt automobile Großserienlogik anzunehmen.',
        bullets: [
          'Werkzeug- und Rüstkosten korrekt auf kleine Losgrößen verteilt.',
          'Sondermaterialien und Spezialprozesse abgebildet.',
          'Vergleich Deutschland, Europa und Indien im selben Modell.',
        ],
      },
      {
        heading: 'Mehrstufige Stücklisten mit Konfigurationskontrolle',
        body: 'Komplexe Baugruppen aus Luft- und Raumfahrt- sowie Verteidigungsprogrammen werden mit voller Versions- und Variantenkontrolle verwaltet.',
        bullets: [
          'Versionskontrolle über mehrere Konfigurationsstände.',
          'Änderungsfolgenanalyse über Baugruppengrenzen hinweg.',
          'Eignung für sicherheitsrelevante, dokumentationspflichtige Programme.',
        ],
      },
    ],
    [
      { question: 'Unterstützt Emithran AS9100- und NADCAP-Qualifizierung?', answer: 'Ja. Lieferantendatensätze führen AS9100- und NADCAP-Status zusammen mit Fähigkeits- und Kapazitätsdaten, sodass der Qualifizierungsstatus überall sichtbar ist, wo der Lieferant eingesetzt wird.' },
      { question: 'Eignet sich die Plattform für kleine Stückzahlen in der Luft- und Raumfahrt?', answer: 'Ja. Die Kostenmodelle berücksichtigen explizit die Wirtschaftlichkeit kleiner Losgrößen, statt automobile Großserienannahmen zu übernehmen.' },
      { question: 'Wie werden sensible Programmdaten gehandhabt?', answer: 'Der Zugriff lässt sich nach Programm und Rolle einschränken, und sensible Lieferanten- oder Bauteildaten bleiben innerhalb klar abgegrenzter Programmgrenzen.' },
    ]
  ),
]

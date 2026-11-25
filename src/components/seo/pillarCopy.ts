import type { PillarHubCopy } from './contentTypes'

/**
 * Orientation copy for the 12 pillar hubs at /topics/<slug>.
 * Spoke lists (blog posts, glossary terms, landing pages, case studies,
 * downloads) are generated from content tags; this file holds intro copy only.
 */
export const PILLAR_COPY: PillarHubCopy[] = [
  {
    slug: 'should-cost-analysis',
    id: 'P1',
    name: 'Should-Cost Analysis & Cost Modelling',
    title: 'Should-Cost Analysis & Cost Modelling Guides',
    description:
      'Should-cost analysis explained: cost breakdowns, estimation methods, model building and software selection for procurement and engineering teams.',
    h1: 'Should-Cost Analysis and Cost Modelling',
    summary:
      'Should-cost analysis estimates what a part ought to cost from its material, process, labour, overhead and margin, rather than accepting a supplier’s quote at face value. This hub collects our guides on building, validating and using should-cost models, from first principles through to choosing software for a cost engineering team.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers how to work out a fact-based target price for a manufactured part and how to use it. The material is grouped into four areas: should-cost fundamentals, cost breakdown and drivers, estimation methods, and should-cost software and tools.',
          'Should-cost fundamentals explains the concept, where it sits against benchmarking and price analysis, and how procurement teams in defence and public-sector programmes use it. Cost breakdown and drivers goes line by line through a costed BOM: raw material, machine hour rates, labour, tooling, scrap, overhead, profit and landed cost.',
          'Should-cost is used by buyers and engineers for different reasons. Procurement uses it to set a target price before an RFQ, to test quotes, and to answer price increase requests with a line-by-line breakdown rather than a percentage. Engineering uses it to compare design options and see which features, tolerances or materials drive cost. Defence and public-sector buyers use it where competition is limited and a cost-based price has to be justified. The role and skills pages describe what a cost engineer needs to know, and the team practice guides cover how to run should-cost as a repeatable process rather than a one-off spreadsheet.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'A should-cost model is only as good as its method and its inputs. The estimation methods pages compare process-based costing, parametric estimating and learning curves, and explain when each is accurate enough for the decision in front of you. A bottom-up process model suits a machined bracket with a clear routing; a parametric model suits early-stage space programme hardware where the routing is not yet fixed.',
          'The breakdown pages then show how those methods turn into numbers a buyer can negotiate with. Tooling cost, machine rates and regional labour rates are usually where supplier quotes and should-cost estimates diverge, so they get their own guides.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'Start with the fundamentals if you are new to should-cost or need to explain it to a stakeholder. If you already build models in spreadsheets, go to the breakdown examples and model validation guides, then the software selection pages to judge whether a dedicated tool would shorten your cycle time.',
          'Case studies listed below show should-cost in use on real sourcing decisions, and the glossary entries define the terms you will meet in supplier cost breakdowns.',
        ],
      },
    ],
    moneyPage: { href: '/should-cost-analysis-software', label: 'Should-cost analysis software' },
  },
  {
    slug: 'manufacturing-process-costing',
    id: 'P2',
    name: 'Manufacturing Process Costing',
    title: 'Manufacturing Process Costing by Process Type',
    description:
      'How to cost CNC machining, sheet metal, casting, forging, moulding, PCBA and finishing processes: cycle times, machine rates, tooling and setup explained.',
    h1: 'Manufacturing Process Costing',
    summary:
      'Manufacturing process costing works out what each operation in a part’s routing costs, from cycle time, machine rate, labour, setup, tooling and scrap. This hub groups our process-by-process guides so you can cost a machined, fabricated, cast, moulded or electronic part with the right drivers for that process.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'Every manufacturing process has its own cost drivers, and this topic explains them process by process. The guides are organised into six families: machining (CNC) costs, sheet metal and fabrication, casting and forging, plastics and moulding, electronics (PCBA and wire harness), and additive and surface finishing.',
          'Within each family you will find cost calculation methods, typical setup and programming effort, tooling cost logic and design-for-manufacture notes that change the price. Benchmarks and tools pages show how to sanity-check a supplier’s process cost against an independent estimate.',
          'The same cost structure applies to every process, even though the drivers differ. Process cost is setup spread over the batch, plus cycle time multiplied by machine and labour rates, plus tooling amortised over the expected volume, plus an allowance for scrap and rework. What changes between families is which term dominates. In CNC machining it is usually cycle time and setup; in die casting and injection moulding it is tooling and volume; in PCBA it is component cost and placement count; in surface finishing it is batch size and surface area. Knowing which term dominates tells you where to question a quote.',
        ],
      },
      {
        heading: 'How the process families relate',
        paragraphs: [
          'Most parts pass through more than one family, so process costs stack. A machined aluminium housing may be sand cast or forged first, CNC milled, then anodised or powder coated. A box build combines PCBA, wire harness assembly and sheet metal enclosures.',
          'Process choice is also a cost decision in itself. The casting vs forging and moulding process comparison guides explain where the break-even volumes sit, and why tooling amortisation often decides the answer more than unit cycle time does.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'Start with the family that covers the highest-spend parts in your BOM. For most precision engineering buyers that is CNC machining, followed by sheet metal and electronics. Read the cost calculation guide for that family first, then the hourly rates and tooling pages, then the individual process pages for the operations in your routings.',
        ],
      },
    ],
    moneyPage: { href: '/manufacturing-process-library', label: 'Manufacturing process library' },
  },
  {
    slug: 'design-to-cost-dfm-vave',
    id: 'P3',
    name: 'Design-to-Cost, DFM & VAVE',
    title: 'Design-to-Cost, DFM and VAVE Guides',
    description:
      'Design-to-cost, target costing, DFM/DFMA and VAVE explained: how engineering and procurement teams remove cost from products before and after launch.',
    h1: 'Design-to-Cost, DFM and VAVE',
    summary:
      'Design-to-cost sets a target cost early and designs the product to meet it. DFM and DFMA make parts easier and cheaper to build, and VAVE removes cost from products already in production. This hub brings the three together, with guides for engineers and buyers who share responsibility for product cost.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers the engineering side of cost reduction: decisions that change the part, not just the price paid for it. It is organised into four areas: design-to-cost and target costing, DFM and DFMA, VAVE and cost reduction, and product cost management.',
          'Design-to-cost and target costing explains how to set a cost target from the market price and margin, then allocate it to subsystems. DFM and DFMA cover design rules, tolerance choices, part-count reduction and supplier DFM feedback that cut manufacturing cost before tooling is released.',
          'These methods matter because most of a product’s cost is committed by design decisions, long before a purchase order is placed. Material grade, tolerance bands, part count, fastening method and surface finish set the manufacturing route, and a supplier can only price the route it is given. Design-to-cost gives engineering a number to design against; DFM supplies the rules that keep the design cheap to make; VAVE revisits both once real production costs are known. The roles pages explain who owns each step, since cost targets fail when they belong to nobody in particular.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'The three disciplines apply at different stages of the product lifecycle. Design-to-cost and DFM do most of their work before design freeze, when most of the product cost is still open to change. VAVE applies after launch, through teardown, value engineering workshops and cost-down engineering on parts already being bought.',
          'Product cost management is the data layer under all three. A costed BOM with should-cost estimates per part shows where the cost sits, which ideas are worth pursuing, and how savings should be reported to finance.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'If your product is still in development, start with target costing and DFM basics. If it is in production and margins are under pressure, start with the VAVE process and teardown guides, then the savings reporting pages so the results stand up to review. The case studies below include an aerospace DC-DC converter where VAVE reduced unit cost.',
        ],
      },
    ],
    moneyPage: { href: '/design-to-cost-software', label: 'Design-to-cost software' },
  },
  {
    slug: 'bom-management',
    id: 'P4',
    name: 'BOM Management & Engineering Data',
    title: 'BOM Management and Engineering Data Guides',
    description:
      'BOM management explained: BOM types and structure, part numbering, change and configuration control, PLM/ERP data and NPI readiness for manufacturers.',
    h1: 'BOM Management and Engineering Data',
    summary:
      'BOM management keeps the bill of materials accurate, structured and controlled as a product moves from design through launch to production. This hub covers BOM fundamentals, part numbering and master data, change and configuration control, and NPI readiness, so engineering, procurement and costing teams work from the same data.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'The bill of materials is the record every other function depends on, and this topic covers how to keep it trustworthy. The guides fall into four groups: BOM fundamentals, part numbering and data, change and configuration, and NPI and launch.',
          'BOM fundamentals explains BOM types (engineering, manufacturing, costed), multi-level structure, CAD BOMs and data quality checks. Part numbering and data covers numbering schemes, master data, data cleansing and the hand-off between CAD, PLM and ERP.',
          'BOM quality matters because cost, sourcing and quality decisions inherit every error in it. A missing level, a wrong unit of measure or an outdated revision feeds straight into a should-cost estimate, an RFQ package and an inspection plan. Many teams still assemble BOMs by hand from CAD exports and ERP extracts, which is where duplicates, inconsistent descriptions and orphaned parts creep in. The best practice and data cleansing guides explain how to find and fix those problems, and the tool selection pages compare spreadsheets, PLM and ERP modules and dedicated BOM software for different team sizes.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'A clean BOM is the input to costing, sourcing and quality work. Change and configuration covers revision control, variants, alternates, deviations and obsolescence: the events that make a BOM drift from what is actually built. NPI and launch covers design freeze, RFQ readiness, pilot builds and the move from prototype to production.',
          'Errors compound between these stages. A duplicate part number in master data becomes a split RFQ, which becomes two suppliers for one part. That is why the data guides sit next to the NPI guides rather than in a separate IT topic.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'If your BOMs live in Excel exports from CAD or ERP, start with BOM data quality and part numbering. If you are preparing a new product for sourcing, start with RFQ readiness and NPI costing. Glossary entries below define BOM terms precisely, which helps when engineering and procurement use the same word for different things.',
        ],
      },
    ],
    moneyPage: { href: '/bom-management-software', label: 'BOM management software' },
  },
  {
    slug: 'supplier-intelligence-risk',
    id: 'P5',
    name: 'Supplier Intelligence & Risk',
    title: 'Supplier Intelligence and Supply Chain Risk',
    description:
      'Supplier discovery, qualification, scorecards, relationship management and supply chain risk explained for manufacturing procurement and quality teams.',
    h1: 'Supplier Intelligence and Supply Chain Risk',
    summary:
      'Supplier intelligence is the structured knowledge of who can make your parts, how well they perform and how exposed they are to disruption. This hub covers supplier discovery and qualification, scorecards, supplier relationship management and supply chain risk, written for buyers who need evidence behind every supplier decision.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic follows the supplier lifecycle from first search to ongoing risk monitoring. It is organised into supplier discovery and qualification, supplier performance and scorecards, supplier relationship management, and supply chain risk and resilience.',
          'Discovery and qualification covers how to find capable suppliers, including contract manufacturers and India’s MSME base, and how to evaluate them before an RFQ. Scorecards cover the quality, cost and delivery metrics that track performance once a supplier is approved.',
          'Supplier intelligence matters most where the qualified supplier pool is small. In aerospace, defence and space, a part may have only two or three approved sources, and losing one can stop a programme. In automotive and industrial work the pool is larger but price pressure is higher, so performance data and cost benchmarks carry more weight. The guides cover both situations. They also cover ESG and compliance checks, which increasingly sit alongside quality and delivery in supplier evaluation, and predictive approaches that flag a supplier problem before it shows up as a late delivery.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'Discovery widens the supplier pool; scorecards and SRM decide who stays in it. Supplier relationship management covers development, collaboration and consolidation, and when to change suppliers rather than keep working on one.',
          'Supply chain risk runs across all of it. The risk guides cover due diligence, risk frameworks, tariffs, compliance and continuous monitoring. A supplier with good scorecards can still be a single point of failure, and the resilience pages explain how to find and reduce that exposure.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'If you need new suppliers, start with the discovery workflow and qualification guides. If you manage an established panel, start with scorecard design and risk assessment. The supplier scorecard template in the downloads section gives you a working starting point for quality, cost and delivery tracking.',
        ],
      },
    ],
    moneyPage: { href: '/supplier-intelligence', label: 'Supplier intelligence platform' },
  },
  {
    slug: 'strategic-sourcing-procurement',
    id: 'P6',
    name: 'Strategic Sourcing, Procurement & Negotiation',
    title: 'Strategic Sourcing, Procurement and Negotiation',
    description:
      'Strategic sourcing for manufacturers: sourcing strategy and TCO, RFQ and quoting, spend analysis, negotiation with should-cost data and procurement tech.',
    h1: 'Strategic Sourcing, Procurement and Negotiation',
    summary:
      'Strategic sourcing decides where and how to buy each category based on total cost, risk and supplier capability, not unit price alone. This hub covers sourcing strategy and TCO, RFQ and quoting, spend analysis, negotiation and procurement technology for direct-material buyers in engineered manufacturing.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers the decisions a direct-material procurement team makes between a BOM and a purchase order. It is organised into five areas: sourcing strategy and TCO, RFQ and quoting, spend analysis and savings, negotiation and pricing, and procurement tech and AI.',
          'Sourcing strategy and TCO covers make-or-buy, regional sourcing comparisons and landed cost. RFQ and quoting covers RFQ packages, quote comparison and cycle time. Spend analysis covers how to classify spend and find the categories worth sourcing events.',
          'The guides take a total-cost view throughout. Unit price is only one part of what a part costs to buy: freight, duty, inventory, quality failures, tooling ownership and supplier risk all add to it, and they are often larger when sourcing from a lower-cost region. Total cost of ownership and landed cost models make those items visible, so a regional comparison or make-or-buy decision is made on the full number. The make-vs-buy worksheet and negotiation preparation sheet in the downloads list put that approach into a working format.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'Spend analysis tells you where to focus, sourcing strategy tells you what outcome to aim for, and RFQ and negotiation get you there. The negotiation and pricing guides show how to answer a supplier price increase with a should-cost breakdown, structure long-term agreements and choose negotiation levers by category.',
          'Procurement tech and AI covers the tools behind that workflow: RFQ automation, data foundations and how to build a business case for new software. The guides are clear about which steps are worth automating and which still need a buyer’s judgement.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'If you are preparing for a supplier negotiation, start with the negotiation strategy and price increase guides. If you are planning next year’s sourcing calendar, start with spend analysis and TCO. The case studies below include a landed-cost comparison of HGV chassis rails sourced from India versus Belgium.',
        ],
      },
    ],
    moneyPage: { href: '/strategic-sourcing-software', label: 'Strategic sourcing software' },
  },
  {
    slug: 'aerospace-defence-space',
    id: 'P7',
    name: 'Aerospace, Defence & Space Manufacturing',
    title: 'Aerospace, Defence and Space Manufacturing',
    description:
      'Aerospace, defence and space manufacturing guides: costs, AS9100 and NADCAP, defence procurement, exotic materials and satellite hardware explained.',
    h1: 'Aerospace, Defence and Space Manufacturing',
    summary:
      'Aerospace, defence and space manufacturing combines low volumes, tight tolerances, exotic materials and strict certification, which makes cost and supplier decisions harder to get right. This hub covers manufacturing costs, certifications and compliance, defence procurement, exotic materials and space hardware for programme, engineering and sourcing teams.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers the cost, compliance and sourcing questions specific to high-reliability sectors. It is organised into aerospace manufacturing and costs, certifications and compliance, defence manufacturing and procurement, exotic materials, space and satellite hardware, and industry playbooks.',
          'Certifications and compliance explains AS9100, NADCAP special-process approval and export controls such as ITAR at a practical level: what they require of a supplier and how they affect lead time and price. Defence manufacturing and procurement covers frameworks such as India’s DAP 2020 and the cost-data expectations of defence buyers.',
          'Cost estimating in these sectors also has to account for documentation and traceability. First article inspection, material certificates, special-process records and configuration control add hours to every batch, and suppliers price that effort into their quotes. Learning curves matter more than in high-volume work because production runs are short and the first units carry most of the effort. The aerospace manufacturing and costs guides explain how to include these items in a should-cost estimate, so a low quote can be tested for what it leaves out rather than accepted on price alone.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'In these sectors, cost and qualification are linked. Titanium, Inconel and other exotic materials drive both material cost and machining time, and only certified suppliers can process them for flight hardware. The exotic materials guides explain those cost drivers; the certification guides explain who is allowed to do the work.',
          'Space and satellite hardware adds very low volumes and little cost history, so parametric and analogy-based estimating matter more than in automotive. The industry playbooks bring these threads together for specific programme types.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'Supplier qualification leads start with the certification guides. Programme cost estimators start with aerospace manufacturing costs and the space hardware pages. The case studies below include an aerospace DC-DC converter where VAVE analysis cut unit cost by 22%, and the downloads include an aerospace supplier qualification checklist.',
        ],
      },
    ],
    moneyPage: { href: '/aerospace-manufacturing-software', label: 'Aerospace manufacturing software' },
  },
  {
    slug: 'india-manufacturing',
    id: 'P8',
    name: 'India Manufacturing Ecosystem',
    title: 'India Manufacturing and Sourcing from India',
    description:
      'Sourcing from India explained: Make in India policy, the MSME supplier base, regional clusters, landed cost and sector playbooks for global manufacturers.',
    h1: 'India Manufacturing Ecosystem',
    summary:
      'India’s manufacturing ecosystem combines a large MSME supplier base, government programmes such as Make in India and growing capability in precision, aerospace and electronics work. This hub covers sourcing from India, the MSME and supplier base, policy and sector playbooks for buyers in India and overseas.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers what a buyer needs to know to source from, or manufacture in, India. It is organised into sourcing from India, MSME and supplier base, Make in India and policy, and industry playbooks.',
          'Sourcing from India covers landed cost, logistics, GST and duty at a general level, and how to compare Indian quotes with European, US or Chinese alternatives on a like-for-like basis. MSME and supplier base explains how India’s supplier landscape is structured, where capability clusters sit and how to qualify smaller suppliers.',
          'Comparing an Indian quote with one from another region needs care. The unit price is often lower, but a fair comparison adds freight, duty, packaging, inventory in transit, quality assurance visits and the time needed to qualify a new supplier. The sourcing guides walk through those items one at a time. They also cover the process families most often sourced from India, such as machined and fabricated parts, castings, forgings and wire harnesses, and where qualification takes longer, such as flight-critical aerospace parts that need specific certifications.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'Policy shapes where capacity is being built, the supplier base determines who can make your part today, and sourcing guides turn both into a cost comparison. Make in India and policy pages explain programmes and procurement rules that affect domestic content and defence sourcing.',
          'The industry playbooks apply this to specific sectors, such as automotive, aerospace and electronics, where the supplier mix and certification expectations differ.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'Overseas buyers evaluating India should start with the sourcing from India guides and landed cost pages. Indian OEMs building local supply chains should start with the MSME and supplier base guides. The case studies below include a 38% landed-cost saving on HGV chassis rails sourced from India rather than Belgium.',
        ],
      },
    ],
    moneyPage: { href: '/manufacturing-intelligence', label: 'Manufacturing intelligence platform' },
  },
  {
    slug: 'materials-commodity-costs',
    id: 'P9',
    name: 'Materials & Commodity Cost Intelligence',
    title: 'Materials and Commodity Cost Intelligence',
    description:
      'Materials and commodity costs for manufacturers: metals pricing, inflation indices, index-linked contracts and material selection for cost and performance.',
    h1: 'Materials and Commodity Cost Intelligence',
    summary:
      'Material is often the largest single line in a part’s cost, and commodity prices move faster than supplier contracts. This hub covers metals pricing, inflation and price indices, and material selection, so buyers and engineers can judge material cost changes and choose materials on cost as well as performance.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers how raw material cost is set, how it moves and how to account for it in quotes and contracts. It is organised into three areas: metals pricing, inflation and indices, and material selection and cost.',
          'Metals pricing explains how steel, aluminium, copper, titanium and nickel alloys are priced, including base price, alloy surcharges, form and conversion premiums. Inflation and indices covers the published indices buyers use to track movements and how to write index-linked price clauses.',
          'Material cost is also where supplier quotes most often lag reality, in both directions. When prices rise, increases tend to be passed on quickly; when they fall, reductions tend to arrive late unless a contract requires them. Index-linked pricing addresses this by tying the material element of a price to a published index with an agreed base date, adjustment period and threshold. The inflation and indices guides explain how to set those terms, and how to check that the material weight and scrap allowance in a supplier’s cost breakdown match the part drawing.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'When a supplier asks for a price increase, the first question is how much of the part cost is material and how far that material has moved. The metals pricing guides answer the first part; the indices guides answer the second. Together they let you separate a real commodity movement from a margin request.',
          'Material selection works on the other side of the equation. Changing grade, form or stock size can lower cost without touching the supplier’s margin, and the selection guides show how to weigh that against weight, strength, corrosion and machinability.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'If you are reviewing a price increase, start with metals pricing and the index guides. If you are in design or VAVE, start with material selection. The case studies below include an exhaust component where a titanium-versus-stainless comparison produced an annual saving.',
        ],
      },
    ],
    moneyPage: { href: '/manufacturing-benchmarking', label: 'Manufacturing benchmarking platform' },
  },
  {
    slug: 'quality-compliance-launch',
    id: 'P10',
    name: 'Quality, Compliance & Launch',
    title: 'Quality, Compliance and Product Launch Guides',
    description:
      'Quality and launch guides for manufacturers: PPAP and APQP, cost of quality, inspection planning and quality management systems such as IATF 16949.',
    h1: 'Quality, Compliance and Launch',
    summary:
      'Quality, compliance and launch work makes sure a new part is built right first time and stays that way in production. This hub covers PPAP and APQP, quality cost and inspection, and quality management systems, with a focus on the supplier-facing work that procurement and quality engineers share.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers the processes that take a part from approved design to approved supply. It is organised into three areas: PPAP and APQP, quality cost and inspection, and quality management systems.',
          'PPAP and APQP explains the planning phases, submission levels and evidence a supplier provides before series production. Quality management systems covers frameworks such as ISO 9001, IATF 16949 and AS9100, and what each expects of suppliers and their sub-tier.',
          'Quality is also a cost driver that should-cost models often miss. A supplier serving aerospace or automotive customers carries the cost of audits, calibrated measurement equipment, inspection time, documentation and certification upkeep. Those costs are real and belong in a fair price, but they should be proportionate to the part’s risk. The quality cost guides explain how to judge inspection effort against part criticality, and the launch guides explain how APQP timing affects tooling, pilot builds and first deliveries, so quality and procurement plan to the same launch dates.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'APQP plans quality into a launch, PPAP proves it before production starts, and the quality management system keeps it in place afterwards. Quality cost and inspection covers what that costs: inspection planning, first article inspection, scrap and rework, and the cost of poor quality when problems reach the customer.',
          'These topics connect to sourcing. A supplier’s quote should include the inspection and documentation a launch requires, and the quality cost guides show how to check that it does.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'If you are launching a new part with a supplier, start with the APQP and PPAP guides. If you are trying to reduce scrap, rework or warranty cost, start with the quality cost and inspection guides. Glossary entries below define the core quality terms used in supplier agreements.',
        ],
      },
    ],
    moneyPage: { href: '/products', label: 'Emithran product modules' },
  },
  {
    slug: 'ai-manufacturing-intelligence',
    id: 'P11',
    name: 'AI & Manufacturing Intelligence',
    title: 'AI in Manufacturing, Costing and Procurement',
    description:
      'How AI is used in manufacturing costing, procurement and supplier risk: practical use cases, data requirements, digital twins and analytics.',
    h1: 'AI and Manufacturing Intelligence',
    summary:
      'Manufacturing intelligence connects BOM, cost, supplier and quality data so decisions are made on evidence rather than spreadsheets passed between teams. This hub covers AI in manufacturing and costing, AI in procurement and supplier risk, and digital twins and analytics, with a practical view of what works today and what data it needs.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers where AI and analytics give manufacturers measurable value, and where they do not yet. It is organised into three areas: AI in manufacturing and costing, AI in procurement and supplier risk, and digital twin and analytics.',
          'AI in manufacturing and costing covers BOM parsing, feature recognition, cost estimation and process selection. AI in procurement and supplier risk covers supplier discovery, quote comparison, risk signals and negotiation support. Digital twin and analytics covers how production and cost data are modelled and monitored.',
          'The guides take a sceptical view of AI claims. Many tasks in costing and procurement are repetitive and data-heavy, such as reading BOMs, normalising supplier quotes, matching part descriptions and flagging price outliers, and these suit automation well. Judgements that depend on context, such as whether to dual-source a critical part or how hard to push in a negotiation, still need an experienced person. Each use case guide states the data required, the checks to run on the output, and the point at which a person should review the result before it is acted on.',
        ],
      },
      {
        heading: 'How the sub-topics fit together',
        paragraphs: [
          'All three areas depend on the same foundation: clean, connected data. An AI cost estimate is only as good as the BOM and process data behind it, and a supplier risk model is only as good as its supplier records. That is why these guides link back to the BOM management and supplier intelligence topics.',
          'The guides are written for practitioners. They explain the inputs each use case needs, how to check the output, and which decisions should stay with an engineer or buyer.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'If you are building a business case, start with the AI in manufacturing and costing guides, which describe concrete use cases. If your priority is supply risk, start with AI in procurement and supplier risk. Both sets of guides list the data you need in place before a pilot.',
        ],
      },
    ],
    moneyPage: { href: '/manufacturing-intelligence', label: 'Manufacturing intelligence platform' },
  },
  {
    slug: 'comparisons-templates-tools',
    id: 'P12',
    name: 'Comparisons, Templates & Tools',
    title: 'Cost Tools, Templates and Software Comparisons',
    description:
      'Software comparisons, buyer’s guides, templates and calculators for should-cost, BOM, sourcing and supplier management in manufacturing procurement teams.',
    h1: 'Comparisons, Templates and Tools',
    summary:
      'This hub collects the practical resources: software comparisons, buyer’s guides, templates and calculators for cost engineering, BOM management, sourcing and supplier management. Use it when you need to choose a tool, build a business case or get a working template in front of your team quickly.',
    sections: [
      {
        heading: 'What this topic covers',
        paragraphs: [
          'This topic covers the resources a team uses to evaluate software and run day-to-day cost and sourcing work. It is organised into three areas: alternatives and vs pages, buyer’s guides, and templates and calculators.',
          'Alternatives and vs pages compare approaches and tool categories side by side, such as spreadsheets against dedicated should-cost software, or general procurement suites against manufacturing-specific tools. Buyer’s guides set out the evaluation criteria, questions to ask vendors and how to run a fair trial.',
          'Comparison pages on this site are written from a manufacturing cost perspective. They focus on the questions that matter to cost engineers and direct-material buyers: how a tool handles multi-level BOMs, where its process and rate data come from, whether estimates can be traced back to their assumptions, and how it works alongside existing ERP and PLM systems. Spreadsheets remain a sound option for a small number of parts, and the guides say so. The aim is to help you decide whether a change is worth the effort for your own workload.',
        ],
      },
      {
        heading: 'How the resources fit together',
        paragraphs: [
          'Templates and calculators are where most teams start: a supplier scorecard, a should-cost breakdown sheet, a machine hour rate calculator. They show quickly where a spreadsheet process holds up and where it breaks, usually at version control, shared rates and audit trail.',
          'The buyer’s guides and comparison pages are the next step when a team outgrows its templates. They help you write requirements, shortlist options and estimate the time saved, so the decision rests on your own workload rather than vendor claims.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'If you need something usable today, start with the templates and calculators in the downloads list below. If you are evaluating software, start with the buyer’s guide for your category, then read the comparison pages for the options on your shortlist.',
        ],
      },
    ],
    moneyPage: { href: '/should-cost-analysis-software', label: 'Should-cost analysis software' },
  },
]

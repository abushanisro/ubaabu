export type BlogCategory = 'All' | 'Corporate' | 'Engineering' | 'Industry' | 'Product'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: Exclude<BlogCategory, 'All'>
  author: { name: string; role: string; linkedin: string }
  date: string
  readTime: string
  image: string
  featured?: boolean
}

const AUTHORS = {
  ceo: { name: 'Singaravelan S.', role: 'CEO', linkedin: 'https://www.linkedin.com/in/singaravelan-srinivasan-emuski/' },
  cto: { name: 'Abushan', role: 'CTO', linkedin: 'https://www.linkedin.com/in/abushan/' },
  editorial: { name: 'Emithran Editorial Team', role: 'Editorial', linkedin: 'https://www.linkedin.com/company/emithran/' },
}

const defaultImage = 'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop'
const engineeringImage = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop'

const ROADMAP_POST_ROWS: [string, string, string, BlogPost['category'], string, string][] = [
  ['supplier-intelligence-guide', 'Supplier Intelligence Guide for Manufacturing Teams', 'How supplier intelligence helps procurement teams qualify vendors, reduce single-source risk, and prepare sourcing decisions before RFQs go live.', 'Engineering', 'August 7, 2026', '9 min read'],
  ['strategic-sourcing-software-comparison', 'Strategic Sourcing Software Comparison for Manufacturers', 'A practical comparison of strategic sourcing platforms for BOM-heavy, engineering-led supply chains.', 'Product', 'August 14, 2026', '8 min read'],
  ['srm-software-comparison', 'SRM Software Comparison for Manufacturing Suppliers', 'How to compare supplier relationship management software when quality, capacity, certifications, and engineering context matter.', 'Product', 'September 4, 2026', '8 min read'],
  ['design-for-manufacturability-guide', 'Design for Manufacturability Guide', 'A manufacturing-focused guide to DFM, cost drivers, process selection, and supplier readiness.', 'Engineering', 'September 11, 2026', '10 min read'],
  ['digital-twin-in-manufacturing', 'Digital Twin in Manufacturing: Practical Use Cases', 'Where digital twins help manufacturing teams, and where cost, supplier, and BOM data still need structured workflows.', 'Industry', 'September 18, 2026', '8 min read'],
  ['spend-analysis-software-guide', 'Spend Analysis Software Guide for Manufacturing', 'How spend analysis software identifies leakage across commodities, suppliers, BOMs, programmes, and regions.', 'Product', 'October 2, 2026', '9 min read'],
  ['mro-spend-analysis', 'MRO Spend Analysis for Manufacturing Teams', 'A focused guide to MRO spend analysis, tail spend visibility, supplier consolidation, and operational cost control.', 'Engineering', 'October 9, 2026', '7 min read'],
  ['what-is-vave', 'What Is VAVE? Value Analysis and Value Engineering Guide', 'A full guide to VAVE for product, procurement, and manufacturing teams looking to reduce cost without weakening performance.', 'Engineering', 'October 16, 2026', '10 min read'],
  ['vave-in-aerospace-case-study', 'VAVE in Aerospace: Cost Reduction Case Study', 'How aerospace teams can use value engineering, component substitution, and should-cost analysis to reduce unit cost.', 'Industry', 'October 23, 2026', '8 min read'],
  ['vendor-negotiation-should-cost', 'Vendor Negotiation with Should-Cost Data', 'How sourcing teams can use should-cost models to move negotiations from percentage demands to evidence-based cost discussions.', 'Engineering', 'November 27, 2026', '8 min read'],
  ['ai-sourcing-software-guide', 'AI Sourcing Software Guide for Manufacturers', 'A guide to AI sourcing software for supplier discovery, RFQ preparation, risk scoring, and should-cost-backed negotiations.', 'Product', 'December 4, 2026', '9 min read'],
  ['strategic-procurement-objectives', 'Strategic Procurement Objectives for Manufacturing', 'Practical procurement objectives that connect cost, quality, supplier resilience, launch readiness, and engineering collaboration.', 'Engineering', 'December 11, 2026', '7 min read'],
  ['global-strategic-sourcing', 'Global Strategic Sourcing for Engineered Products', 'How to compare suppliers across India, Germany, the UK, UAE, and other sourcing regions using total cost evidence.', 'Industry', 'December 18, 2026', '9 min read'],
  ['aerospace-manufacturing-in-india', 'Aerospace Manufacturing in India: Supplier and Cost Guide', 'A guide to aerospace manufacturing growth in India, supplier capability, certifications, and sourcing opportunities.', 'Industry', 'January 8, 2027', '9 min read'],
  ['defence-manufacturing-india', 'Defence Manufacturing in India: Procurement and Supplier Guide', 'How Indian defence manufacturing teams can strengthen supplier qualification, cost visibility, and programme sourcing.', 'Industry', 'January 15, 2027', '9 min read'],
  ['supply-chain-risk-management', 'Supply Chain Risk Management for Manufacturing', 'A practical framework for identifying single-source risk, capacity constraints, quality exposure, and delivery vulnerabilities.', 'Engineering', 'February 5, 2027', '8 min read'],
  ['cmmc-compliance-manufacturing', 'CMMC Compliance for Manufacturing Suppliers', 'What manufacturing suppliers need to understand about cybersecurity maturity, defence programmes, and secure data workflows.', 'Industry', 'February 12, 2027', '8 min read'],
  ['manufacturing-intelligence-pillar', 'Manufacturing Intelligence: The Complete Guide', 'A pillar guide to manufacturing intelligence across BOMs, cost models, supplier data, quality signals, and sourcing decisions.', 'Engineering', 'March 5, 2027', '14 min read'],
  ['ai-in-manufacturing-2027-use-cases', 'AI in Manufacturing: 2027 Use Cases', 'The manufacturing AI use cases that matter most in 2027: cost modelling, supplier intelligence, quality prediction, and sourcing automation.', 'Industry', 'March 12, 2027', '10 min read'],
  ['precision-manufacturing-india-benchmarks', 'Precision Manufacturing India Benchmarks', 'Benchmarks for Indian precision manufacturing across process cost, supplier capability, certification, and delivery readiness.', 'Industry', 'March 19, 2027', '8 min read'],
  ['space-manufacturing-supply-chain', 'Space Manufacturing Supply Chain Guide', 'How space manufacturing teams can qualify suppliers, manage cost risk, and build resilient component supply chains.', 'Industry', 'March 26, 2027', '8 min read'],
  ['spend-analytics-consulting', 'Spend Analytics Consulting for Manufacturing', 'How spend analytics consulting can identify savings opportunities and where software creates a repeatable advantage.', 'Product', 'April 9, 2027', '7 min read'],
  ['spend-opportunity-assessment', 'Spend Opportunity Assessment Guide', 'A practical guide to finding and prioritising procurement savings opportunities across BOMs and supplier categories.', 'Engineering', 'April 16, 2027', '7 min read'],
  ['procurement-consulting-techniques', 'Procurement Consulting Techniques for Manufacturers', 'Techniques consultants use to diagnose cost leakage, supplier concentration, sourcing gaps, and negotiation opportunities.', 'Engineering', 'April 23, 2027', '8 min read'],
  ['international-procurement-process', 'International Procurement Process for Manufacturing', 'How to run international procurement processes with landed cost, quality, certification, and logistics risk built in.', 'Industry', 'April 30, 2027', '8 min read'],
  ['defence-procurement-india-guide', 'Defence Procurement India Guide', 'A guide to defence procurement in India for manufacturers, suppliers, and programme sourcing teams.', 'Industry', 'May 7, 2027', '9 min read'],
  ['manufacturing-cost-report-2027', '2027 Manufacturing Cost Report: India, Europe, and Global Sourcing', 'A linkable annual report on manufacturing cost drivers, supplier risk, and sourcing opportunities across key regions.', 'Corporate', 'June 7, 2027', '12 min read'],
  ['manufacturing-cost-estimation-guide', 'Manufacturing Cost Estimation: A Practical Guide', 'How to estimate manufacturing cost for machined, moulded, and fabricated parts, and the accuracy tradeoffs between quick estimates and detailed should-cost models.', 'Engineering', 'June 18, 2027', '8 min read'],
  ['dfm-for-aerospace-defence', 'DFM for Aerospace and Defence Components', 'How design for manufacturability changes for AS9100-certified, mission-critical aerospace and defence components, and what a DFM review should check before release.', 'Industry', 'June 25, 2027', '8 min read'],
  ['dfm-by-process-cnc-injection-sheet-metal', 'DFM Guidelines by Process: CNC, Injection Moulding, and Sheet Metal', 'Process-specific design for manufacturability guidelines for CNC machining, injection moulding, sheet metal, and additive manufacturing.', 'Engineering', 'July 2, 2027', '9 min read'],
  ['what-is-dfma', 'What Is DFMA? Design for Manufacturability and Assembly Explained', 'DFMA extends DFM to assembly-level cost: fastener count, assembly sequence, and error-proofing. How the methodology works and where it applies in aerospace product development.', 'Engineering', 'July 9, 2027', '7 min read'],
  ['design-for-additive-manufacturing-guide', 'Design for Additive Manufacturing (DfAM): A Guide', 'DfAM guidelines for aerospace components, including topology optimisation and metal additive manufacturing design rules.', 'Engineering', 'July 16, 2027', '8 min read'],
  ['supplier-benchmarking-framework', 'Supplier Benchmarking Framework for Manufacturing Teams', 'How to score and compare suppliers on capability, cost, quality, and delivery using a structured benchmarking framework, with an aerospace-specific scoring example.', 'Engineering', 'July 23, 2027', '7 min read'],
  ['sustainable-manufacturing-guide', 'Sustainable Manufacturing: Carbon Footprint and Scope 3 Guide', 'A guide to sustainable manufacturing, carbon footprint reduction, net-zero targets, and Scope 3 emissions visibility across the supplier base.', 'Industry', 'July 30, 2027', '7 min read'],
]

function roadmapPost([slug, title, excerpt, category, date, readTime]: [string, string, string, BlogPost['category'], string, string]): BlogPost {
  return {
    slug,
    title,
    excerpt,
    category,
    author: category === 'Product' ? AUTHORS.ceo : AUTHORS.cto,
    date,
    readTime,
    image: category === 'Engineering' ? engineeringImage : defaultImage,
  }
}

export const POSTS: BlogPost[] = [
  {
    slug: 'what-is-should-cost-analysis',
    title: 'What Is Should Cost Analysis? Complete Guide for Manufacturers',
    excerpt:
      'Discover what should cost analysis is, how it works in manufacturing, and how AI-powered platforms help procurement teams cut part costs by up to 15%.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'July 1, 2026',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/8970688/pexels-photo-8970688.jpeg',
  },
  {
    slug: 'how-to-do-should-cost-analysis',
    title: 'How to Do Should Cost Analysis: Step-by-Step Guide',
    excerpt:
      'Learn exactly how to do should cost analysis in 7 steps — with a real machined part example, cost breakdown template, and common mistakes to avoid.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'July 1, 2026',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/7680744/pexels-photo-7680744.jpeg',
  },
  {
    slug: 'should-cost-analysis-software-comparison',
    title: 'Should Cost Analysis Software: Top Tools Compared (2026)',
    excerpt:
      'Compare the top should cost analysis software platforms for manufacturers in 2026 — aPriori, Costimator, FACTON, and Emithran. Find the right tool for your supply chain.',
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'July 1, 2026',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/34804005/pexels-photo-34804005.jpeg',
  },
  {
    slug: 'should-cost-modeling-methodology-tools-examples',
    title: 'Should Cost Modeling: Methodology, Tools & Examples',
    excerpt:
      'Explore the three main should cost modeling methodologies — parametric, analogical, and bottom-up — with real manufacturing examples for aerospace, EV, and defence.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'July 1, 2026',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/7054368/pexels-photo-7054368.jpeg',
  },
  {
    slug: 'should-cost-modeling-software-buyers-guide',
    title: 'Should Cost Modeling Software: Complete Buyer\'s Guide',
    excerpt:
      "Everything you need to evaluate and select should cost modeling software — evaluation criteria, vendor questions, pilot structure, ROI calculation, and implementation tips.",
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'July 1, 2026',
    readTime: '11 min read',
    image: 'https://images.pexels.com/photos/3912948/pexels-photo-3912948.jpeg',
  },
  {
    slug: 'how-to-build-should-cost-model-excel-ai',
    title: 'How to Build a Should Cost Model: Excel + AI Approach',
    excerpt:
      'Learn how to build a should cost model in Excel — with the right tab structure, formulas, and rate libraries — then see how AI-powered tools take it to full BOM scale.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'July 1, 2026',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1781246435700-afec19012b45?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    slug: 'apriori-vs-emithran-comparison',
    title: 'aPriori vs Emithran: Manufacturing Cost Platform Comparison (2026)',
    excerpt:
      'Comparing aPriori and Emithran for should cost analysis and manufacturing intelligence. See which platform fits your team\'s size, budget, and supply chain geography.',
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'July 1, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    slug: 'costimator-alternatives',
    title: 'Costimator Alternative: Why Manufacturers Are Switching (2026)',
    excerpt:
      'Looking for a Costimator alternative? Compare Costimator\'s quoting-focused approach against AI-powered BOM-level should cost platforms like Emithran.',
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'July 1, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1769147339214-076740872485?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    slug: 'cost-breakdown-analysis',
    title: 'Cost Breakdown Analysis: How to Analyse Manufacturing Costs',
    excerpt:
      'Learn how to perform cost breakdown analysis on supplier quotes — decomposing material, labor, overhead, and margin to find real savings opportunities.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'July 1, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1713557112617-e12d67bddc3a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    slug: 'cost-modeling-in-manufacturing',
    title: 'Cost Modeling in Manufacturing: Methods & Best Practices (2026)',
    excerpt:
      'A complete guide to cost modeling in manufacturing — standard costing, activity-based costing, should cost, and target costing — with best practices for accuracy.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'July 1, 2026',
    readTime: '9 min read',
    image: 'https://plus.unsplash.com/premium_photo-1778917436631-965269aaabb4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    slug: 'cost-engineering-software',
    title: 'Cost Engineering Software: Top Tools for Manufacturers (2026)',
    excerpt:
      'Compare the top cost engineering software platforms for manufacturers — covering should cost, target costing, design-to-cost, and product cost management.',
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'July 1, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1598299803204-b73796f43289?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    slug: 'product-cost-management-best-practices',
    title: 'Product Cost Management: Best Practices for Manufacturers (2026)',
    excerpt:
      'A practical guide to product cost management — covering lifecycle cost tracking, cross-functional ownership, and the systems that make cost discipline stick.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'July 1, 2026',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/33538989/pexels-photo-33538989.jpeg',
  },
  {
    slug: 'what-is-bom-management',
    title: 'What Is BOM Management? Definition & Best Practices (2026)',
    excerpt:
      'Learn what BOM management is, why it matters for manufacturers, and the best practices that prevent costly errors in your bill of materials process.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'July 1, 2026',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/29181490/pexels-photo-29181490.jpeg',
  },
  {
    slug: 'bom-management-software-buyers-guide',
    title: 'BOM Management Software: Complete Buyer\'s Guide (2026)',
    excerpt:
      'Compare the top BOM management software platforms and learn the evaluation criteria that matter — from PLM-native tools to AI-connected cost-aware BOM systems.',
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'July 1, 2026',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/9242852/pexels-photo-9242852.jpeg',
  },
  {
    slug: 'compound-growth-manufacturing-cost-intelligence',
    title: "The Number That Never Stops Moving: What a Homepage Counter Taught Me About Manufacturing Intelligence",
    excerpt:
      "A personal exploration of continuous compound growth, where it applies to manufacturing intelligence, and where the model needs to be treated with care.",
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'June 9, 2026',
    readTime: '14 min read',
    image: engineeringImage,
    featured: true,
  },
  {
    slug: 'should-cost-analysis-supplier-negotiation',
    title: 'How Should-Cost Analysis Is Rewriting the Rules of Supplier Negotiation',
    excerpt:
      "When procurement teams negotiate from real cost intelligence rather than market quotes, win rates improve dramatically. Here is how Emithran's Should-Cost Engine changes the dynamic.",
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'June 2, 2026',
    readTime: '6 min read',
    image: defaultImage,
  },
  {
    slug: 'best-should-cost-software-aerospace-manufacturers',
    title: 'Best Should-Cost Software for Aerospace Manufacturers (2026)',
    excerpt:
      'A buyer-focused look at should-cost platforms for aerospace OEMs and suppliers - what to evaluate, and how Emithran, aPriori, and Costimator compare on certification tracking, process coverage, and rollout time.',
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'July 17, 2026',
    readTime: '9 min read',
    image: defaultImage,
  },
  {
    slug: 'best-supplier-intelligence-tools-defence-oems',
    title: 'Best Supplier Intelligence Tools for Defence OEMs',
    excerpt:
      'How defence OEMs should evaluate supplier intelligence tools - qualification scoring, risk signals, and certification tracking - and where Emithran fits next to ERP-native and manual approaches.',
    category: 'Product',
    author: AUTHORS.cto,
    date: 'July 24, 2026',
    readTime: '8 min read',
    image: engineeringImage,
  },
  {
    slug: 'best-bom-management-software-manufacturing',
    title: 'Best BOM Management Software for Manufacturing Companies',
    excerpt:
      'A practical comparison of BOM management approaches for manufacturing teams - PLM-native, ERP-native, spreadsheet-based, and dedicated platforms like Emithran - and how to choose between them.',
    category: 'Product',
    author: AUTHORS.ceo,
    date: 'July 31, 2026',
    readTime: '8 min read',
    image: defaultImage,
  },
  {
    slug: 'supplier-qualification-guide',
    title: 'Supplier Qualification for Aerospace and Defence Manufacturing: A Complete Guide',
    excerpt:
      'How to find, vet, and qualify suppliers for aerospace and defence programmes - AS9100 and CMMC requirements, capability verification, and a practical qualification checklist.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'August 28, 2026',
    readTime: '9 min read',
    image: engineeringImage,
  },
  {
    slug: 'what-is-strategic-sourcing',
    title: 'What Is Strategic Sourcing? The 7-Step Process Explained',
    excerpt:
      'Strategic sourcing aligns supplier selection and negotiation with long-term programme goals rather than sourcing parts one RFQ at a time. The 7-step process and how it differs from tactical buying.',
    category: 'Engineering',
    author: AUTHORS.cto,
    date: 'September 25, 2026',
    readTime: '8 min read',
    image: engineeringImage,
  },
  ...ROADMAP_POST_ROWS.map(roadmapPost),
]

export type BlogCategory = 'All' | 'Corporate' | 'Engineering' | 'Industry' | 'Product'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: Exclude<BlogCategory, 'All'>
  author: { name: string; role: string }
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export const POSTS: BlogPost[] = [
  {
    slug: 'compound-growth-manufacturing-cost-intelligence',
    title: "The Number That Never Stops Moving: What a Homepage Counter Taught Me About Manufacturing Intelligence",
    excerpt:
      "I was building Emithran's homepage and couldn't decide what number to put on the hero. Static felt dishonest. Random felt cheap. Then I remembered a formula from university - a simple model for how things compound over time: S(t) = S₀ · eʳᵗ. That decision sent me down an unexpected rabbit hole. A personal, honest, and occasionally humbling exploration of continuous compound growth, where it actually applies to manufacturing, and where I was overreaching.",
    category: 'Engineering',
    author: { name: 'Abushan', role: 'CTO' },
    date: 'June 9, 2026',
    readTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop',
    featured: true,
  },
  {
    slug: 'should-cost-analysis-supplier-negotiation',
    title: "How Should-Cost Analysis Is Rewriting the Rules of Supplier Negotiation",
    excerpt:
      "When procurement teams negotiate from real cost intelligence rather than market quotes, win rates improve dramatically. Here is how Emithran's Should-Cost Engine changes the dynamic.",
    category: 'Product',
    author: { name: 'Singaravelan S.', role: 'CEO' },
    date: 'June 2, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'bom-accuracy-tier1-suppliers',
    title: "Why 99.4% BOM Accuracy Matters for Tier-1 Automotive Suppliers",
    excerpt:
      "A single line-item error in a 500-part BOM can cascade into production delays worth millions. We break down how automated BOM validation catches errors before they cost you.",
    category: 'Engineering',
    author: { name: 'Abushan', role: 'CTO' },
    date: 'May 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'supplier-radar-defence-manufacturing',
    title: "Supplier Intelligence for Defence Manufacturing: A New Standard",
    excerpt:
      "Defence contracts demand traceability, certification compliance, and zero-tolerance delivery. Supplier Radar maps your network against all three in real time.",
    category: 'Industry',
    author: { name: 'Singaravelan S.', role: 'CEO' },
    date: 'May 20, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'emithran-series-a-announcement',
    title: "Emithran Raises Series A to Accelerate Manufacturing Intelligence Across India",
    excerpt:
      "We are expanding our platform to serve more precision manufacturers across India and the global OEMs that depend on them. Here is what is next.",
    category: 'Corporate',
    author: { name: 'Singaravelan S.', role: 'CEO' },
    date: 'May 12, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'vave-cost-reduction-aerospace',
    title: "VAVE in Aerospace: Using Value Analysis to Cut 18% Without Compromising Quality",
    excerpt:
      "Value Analysis and Value Engineering is not just a procurement tactic. It is a design philosophy. See how leading aerospace Tier-2s are using Emithran's VAVE Studio.",
    category: 'Engineering',
    author: { name: 'Abushan', role: 'CTO' },
    date: 'April 30, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'otif-logistics-intelligence',
    title: "98.6% OTIF: The Logistics Intelligence Benchmark India's Manufacturers Are Hitting",
    excerpt:
      "On-Time, In-Full delivery is the most unforgiving metric in supply chain. Here is how Emithran's Shipment Hub is helping manufacturers consistently hit world-class OTIF rates.",
    category: 'Product',
    author: { name: 'Abushan', role: 'CTO' },
    date: 'April 18, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'precision-manufacturing-india-global',
    title: "India's Precision Manufacturers Are Going Global: Here's What That Requires",
    excerpt:
      "From Chennai to Stuttgart, Indian Tier-2 suppliers are winning contracts with global OEMs. The infrastructure to support that shift is what Emithran was built to provide.",
    category: 'Industry',
    author: { name: 'Singaravelan S.', role: 'CEO' },
    date: 'April 5, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'launch-tracker-rfq-cycle',
    title: "From RFQ to Production in 40% Less Time: The Launch Tracker Difference",
    excerpt:
      "New product launches fail not from bad engineering but from coordination failures. Launch Tracker gives every stakeholder a single, live timeline with no email chasing required.",
    category: 'Product',
    author: { name: 'Abushan', role: 'CTO' },
    date: 'March 22, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop',
  },
]

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
    slug: 'what-is-should-cost-analysis',
    title: 'What Is Should-Cost Analysis? A Complete Guide for Manufacturers',
    excerpt:
      'Should-cost analysis tells you what a part should cost to manufacture — based on material, labour, machine time, and overhead — rather than what a supplier chooses to quote. For India\'s defence, aerospace, and space OEMs, it is the most powerful tool in procurement. Here is how it works.',
    category: 'Engineering',
    author: { name: 'Singaravelan S.', role: 'CEO' },
    date: 'July 10, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'how-to-do-should-cost-analysis',
    title: 'How to Do Should-Cost Analysis: A Step-by-Step Guide',
    excerpt:
      'Building a should-cost model is not a black art. It follows a clear methodology: understand the part, map the process route, cost every operation, validate against the market, and negotiate. This guide walks through each step — with real manufacturing examples.',
    category: 'Engineering',
    author: { name: 'Abushan', role: 'CTO' },
    date: 'July 3, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop',
  },
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
]

// Per-post hero image + body content + author bio + SEO metadata.
// Layout/design is shared across all posts (see BlogPostPage); only this data changes per topic.

export interface BlogPostFAQ {
  question: string
  answer: string
}

export interface BlogPostSEO {
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  tags: string[]
}

export interface BlogPostContent {
  heroImage: string
  authorBio: string
  content: string
  seo?: BlogPostSEO
  faqs?: BlogPostFAQ[]
}

export const BLOG_CONTENT: Record<string, BlogPostContent> = {
  'should-cost-analysis-supplier-negotiation': {
    heroImage:
      'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    authorBio:
      "<strong>Singaravelan S.</strong> is the co-founder and CEO of Emithran, where he works with procurement and sourcing leaders across India's precision manufacturing sector to bring real cost intelligence into supplier negotiations.",
    seo: {
      metaTitle: 'Should-Cost Analysis: Win Every Supplier Negotiation',
      metaDescription:
        'Learn how should-cost analysis gives OEMs in defence, aerospace and precision manufacturing the data they need to negotiate smarter and cut sourcing risk.',
      ogTitle: "You Shouldn't Be Negotiating Without Should-Cost Analysis",
      ogDescription:
        "Most supplier negotiations start with a quote and a gut feel. Should-cost analysis changes that. Here's how India's defence and aerospace OEMs are using it to negotiate from facts, not guesswork.",
      tags: [
        'should cost analysis',
        'supplier negotiation strategy',
        'manufacturing cost breakdown',
        'cost engineering for OEMs',
        'defence manufacturing cost',
        'aerospace manufacturing cost',
        'AI cost estimation',
      ],
    },
    faqs: [
      {
        question: 'What is should-cost analysis and why does it matter for OEMs?',
        answer:
          'Should-cost analysis is the process of estimating what a manufactured part should cost based on its materials, processes, overhead, and a reasonable supplier margin — independent of what a supplier actually quotes. For OEMs in defence, aerospace, and precision manufacturing, it removes the informational asymmetry in supplier negotiations and enables cost decisions grounded in engineering logic rather than market positioning.',
      },
      {
        question: 'How is should-cost analysis different from cost benchmarking?',
        answer:
          "Benchmarking compares a price against historical or market data for similar parts. Should-cost analysis builds cost from the bottom up — geometry, process, material, labour — for the specific part in question. Benchmarking tells you if a price looks unusual. Should-cost analysis tells you exactly where it's unusual and why.",
      },
      {
        question: 'What data do you need to build a should-cost model?',
        answer:
          'At minimum: part drawing or 3D model, material specification, process route (or an assumed process route based on features), machine hourly rates for the relevant processes, current material prices, and a reasonable overhead and margin assumption. More accurate models also incorporate supplier-specific data like location, certifications, and capacity.',
      },
      {
        question: 'Can should-cost analysis be applied to defence and space manufacturing components?',
        answer:
          'Yes — and it is particularly valuable there. Defence and space components often have small supplier pools and long contract durations, which limits competitive pressure. A bottom-up should-cost model gives procurement teams an objective cost floor that holds up under audit and supports fair-pricing discussions even in single-source situations.',
      },
      {
        question: 'How does should-cost analysis support supplier negotiation strategy?',
        answer:
          'It gives buyers a data-backed target price and a detailed cost breakdown they can table in negotiations. Instead of bargaining by percentage, both parties can discuss specific cost drivers — material grade, cycle time, overhead assumptions. This tends to surface real savings opportunities and produce more durable pricing agreements.',
      },
      {
        question: 'What role does AI cost estimation play in should-cost analysis?',
        answer:
          'Manual should-cost modelling is time-intensive and does not scale well across large part catalogues. AI cost estimation tools can auto-extract geometric and material parameters from CAD files, apply live market pricing, and generate should-cost breakdowns in a fraction of the time. For OEMs running multiple concurrent programmes, this makes should-cost analysis practical as a standard workflow rather than a periodic project.',
      },
      {
        question: 'How often should should-cost models be updated?',
        answer:
          'Should-cost models should be updated at major design milestones, when material prices shift significantly, when production volumes change, and before any contract renewal or re-negotiation. Treating should-cost as a living document rather than a point-in-time estimate keeps it useful across the full product lifecycle.',
      },
    ],
    content: `
      <h2>How Should-Cost Analysis Is Rewriting the Rules of Supplier Negotiation</h2>

      <p>Every procurement team has been there: a supplier sends a quote, you push back 5–10%, they agree, and everyone shakes hands. It feels like a win.</p>

      <p>It usually isn't.</p>

      <p>Without <strong>should-cost analysis</strong>, you have no way to know whether that final price reflects actual manufacturing economics or just how far the supplier was willing to move on the day. In defence, aerospace, and precision manufacturing — where a single machined component can carry ₹2–20 lakh of hidden margin — that gap matters enormously.</p>

      <p>This article explains what should-cost analysis is, how it works in practice, and why forward-thinking OEMs and Tier-1 suppliers in India are treating it as a core procurement discipline — not an optional finance exercise.</p>

      <h3>What Is Should-Cost Analysis?</h3>

      <p>Should-cost analysis is a structured method for estimating what a part or assembly <em>ought</em> to cost based on its actual design, materials, manufacturing processes, overhead, and reasonable profit. The result is an independently derived target cost — built from engineering logic, not vendor pricing.</p>

      <p>A proper should-cost model breaks cost down into its real components:</p>
      <ul>
        <li><strong>Raw material cost</strong> — grade, form factor, weight, buy-to-fly ratio</li>
        <li><strong>Process cost</strong> — machining time, setup, tooling, number of operations</li>
        <li><strong>Labour cost</strong> — operator grade, cycle time, regional wage rate</li>
        <li><strong>Overhead</strong> — machine depreciation, facility cost, utilities</li>
        <li><strong>Scrap and rework allowance</strong> — based on process capability and complexity</li>
        <li><strong>Supplier margin</strong> — reasonable profit for the process type and volume</li>
      </ul>

      <p>When you build this bottom-up, you get a defensible number. Not a wish. Not a benchmark from a catalogue. A cost that reflects what it should actually take to make that part.</p>

      <h3>Why Conventional Supplier Negotiation Falls Short</h3>

      <p>Traditional procurement negotiation relies on three weak levers:</p>
      <ol>
        <li><strong>Competitive quoting</strong> — works only if you have enough qualified suppliers and time to run a proper RFQ process</li>
        <li><strong>Year-on-year price reduction targets</strong> — often arbitrary, and resisted hard by suppliers who have already tightened margins</li>
        <li><strong>Benchmarking against similar parts</strong> — useful directionally, but rarely specific enough to hold up in a negotiation</li>
      </ol>

      <p>None of these give you a cost floor. Without knowing what a part <em>should</em> cost, you're negotiating from a position of informational asymmetry. The supplier knows their cost structure. You don't.</p>

      <p>This problem is especially acute in:</p>
      <ul>
        <li><strong>Defence manufacturing</strong> — where parts often have single or dual qualified sources, making competitive tension low</li>
        <li><strong>Aerospace and space</strong> — where tight tolerances and stringent material certifications limit the supplier pool</li>
        <li><strong>Precision machining</strong> — where process complexity makes it easy for suppliers to hide margin inside cycle-time estimates</li>
      </ul>

      <h3>How Should-Cost Analysis Shifts the Negotiation Dynamic</h3>

      <p>When you arrive at a negotiation with a well-built should-cost model, the conversation changes completely.</p>

      <p>Instead of "your quote is too high, can you do better?", you're saying: "Based on our analysis, the material cost for this Inconel 718 forging is approximately ₹X, 5-axis machining at your setup time should run ₹Y, and your overhead at this volume is likely ₹Z. Our target price is ₹[Total]. Walk us through where our assumptions differ."</p>

      <p>That's a different meeting. The supplier can't simply say "that's our price." They have to engage with your numbers.</p>

      <p>This does three things:</p>
      <ul>
        <li>It exposes genuinely inflated margins you'd never have caught otherwise</li>
        <li>It creates a collaborative frame — you're not accusing, you're analysing</li>
        <li>It builds long-term supplier trust, because data-driven conversations are less adversarial than percentage haggling</li>
      </ul>

      <h4>Real-World Example: Titanium Structural Bracket for a Space Programme</h4>

      <p>Consider a supplier quoting ₹4.2 lakh per unit for a titanium bracket used in a satellite structural assembly. A should-cost model built from the drawing and process route might reveal:</p>
      <ul>
        <li>Material: Ti-6Al-4V billet at current LME-linked prices — ₹85,000</li>
        <li>Machining (5-axis, 3 setups, 14-hour cycle): ₹1,10,000</li>
        <li>Inspection and certification (AS9100 compliance, CMM, FAI): ₹40,000</li>
        <li>Overhead at standard absorption rate: ₹55,000</li>
        <li>Reasonable margin (15%): ₹43,500</li>
      </ul>
      <p>Should-cost total: ~₹3.3 lakh.</p>
      <p>That's a ₹90,000 gap per unit. At a programme quantity of 200 units, you've just found ₹1.8 crore in recoverable savings — with data to back every rupee of it.</p>

      <h3>Should-Cost Analysis in Defence and Aerospace: Why It's Different</h3>

      <p>Commercial procurement can often lean on market forces to keep pricing honest. Defence and aerospace manufacturing in India operates differently:</p>
      <ul>
        <li><strong>Limited qualified sources.</strong> DRDO, ISRO, HAL, and private defence OEMs often have 2–3 qualified suppliers for critical components. Competition alone won't give you fair pricing.</li>
        <li><strong>Long-term contracts.</strong> A component priced 15% above should-cost on a 5-year contract compounds badly.</li>
        <li><strong>Offset and indigenisation pressures.</strong> As India pushes deeper into self-reliance under Atmanirbhar Bharat, OEMs are qualifying new domestic suppliers who may not have mature cost structures. Should-cost analysis helps you price development partnerships correctly from the start.</li>
        <li><strong>DPSU audit expectations.</strong> Defence public sector units and their Tier-1 partners are increasingly required to justify procurement costs. A should-cost model is an auditable artefact — not just a negotiating tool.</li>
      </ul>

      <h4>Example: Qualifying a New Domestic Supplier for a Defence Sub-Assembly</h4>

      <p>An OEM qualifying a new MSME for a hydraulic manifold block used in an armoured vehicle programme has no historical pricing to reference. Should-cost analysis using the supplier's proposed process route, local material sourcing, and labour rates gives the OEM a fair cost target — ensuring the supplier earns a viable margin without embedding excess cost into the programme baseline.</p>

      <p>This isn't just about saving money. It's about building a supplier relationship on a shared understanding of economics.</p>

      <h3>The Manufacturing Cost Breakdown: What to Model and How</h3>

      <p>A rigorous should-cost model for a precision-manufactured part typically includes these layers:</p>

      <h4>1. Design-Driven Cost Inputs</h4>
      <ul>
        <li>Part geometry complexity (derived from CAD/drawing)</li>
        <li>Tolerances, GD&amp;T callouts, surface finish requirements</li>
        <li>Material specification and grade</li>
        <li>Part weight and buy-to-fly ratio</li>
      </ul>
      <p>Modern <a href="/products">CAD to Cost</a> tooling can pull most of these inputs directly from the 3D model — turning a multi-day modelling exercise into a same-day estimate.</p>

      <h4>2. Process Cost Modelling</h4>
      <ul>
        <li>Operation sequence (turning, milling, grinding, EDM, etc.)</li>
        <li>Machine type and hourly rate by process</li>
        <li>Setup time and changeover</li>
        <li>Tooling cost allocation</li>
      </ul>

      <h4>3. Overhead and Burden</h4>
      <ul>
        <li>Machine absorption rate (depreciation, maintenance, utilities)</li>
        <li>Factory overhead (floor space, supervision, quality systems)</li>
        <li>Volume-adjusted burden — costs that shift as quantities change</li>
      </ul>

      <h4>4. Supplier-Side Variables</h4>
      <ul>
        <li>Location-based labour rates (Tier-2 city MSME vs. large precision shop)</li>
        <li>Certifications held (AS9100, NADCAP) — which carry real overhead costs</li>
        <li>Capacity utilisation — a supplier running at 60% has different economics than one at 90%</li>
      </ul>

      <h3>Where Should-Cost Software Changes the Game</h3>

      <p>Building a should-cost model manually in Excel works for one part. It doesn't scale to a programme with 300 unique part numbers, or to a sourcing cycle that needs to move in weeks, not months.</p>

      <p><strong>Should-cost software</strong> that integrates with CAD, PLM, and supplier data can:</p>
      <ul>
        <li>Auto-extract geometry parameters and material specs from 3D models</li>
        <li>Apply current material prices (LME, domestic market indices)</li>
        <li>Run process simulations to estimate machining time</li>
        <li>Generate a cost breakdown automatically, ready for review and refinement</li>
        <li>Track cost variance across revision cycles — so you know when a design change shifts should-cost materially</li>
      </ul>

      <p>For cost engineering teams at OEMs managing multiple simultaneous programmes — space, defence, and commercial — this shift from manual modelling to <a href="/products">AI cost estimation</a> is the difference between should-cost as a project and should-cost as a standard practice.</p>

      <h3>Common Mistakes in Should-Cost Analysis</h3>

      <p>Even well-intentioned teams get this wrong. Here's what to avoid:</p>

      <p><strong>1. Using catalogue or index prices for everything.</strong> Material prices vary by supplier, form, certification level, and lot size. A should-cost model that uses LME spot price for aerospace-grade aluminium without accounting for certified billet premium is going to be off.</p>

      <p><strong>2. Ignoring supplier overhead realities.</strong> An MSME with NADCAP certification for special processes carries real overhead that a non-certified shop doesn't. Your model needs to reflect the right overhead tier — not just the cheapest option available.</p>

      <p><strong>3. Treating should-cost as a one-time exercise.</strong> Parts evolve. Designs change. Material prices move. A should-cost model that isn't updated through the product lifecycle becomes stale and unreliable fast.</p>

      <p><strong>4. Using it as a hammer, not a conversation.</strong> Should-cost is most effective when shared with suppliers as a collaborative tool. Presenting it as a take-it-or-leave-it demand tends to damage relationships and doesn't surface the real cost levers.</p>

      <p><strong>5. Not tying it to <a href="/products">supplier intelligence</a>.</strong> The most accurate should-cost model still needs to be calibrated against what you know about a specific supplier's actual capabilities and cost structure. General assumptions won't reflect the economics of a specific shop floor.</p>

      <h3>Building a Should-Cost-Based Supplier Negotiation Strategy</h3>

      <p>Here's a practical approach for OEM procurement and cost engineering teams:</p>
      <ol>
        <li><strong>Select target parts</strong> — prioritise high-spend, single-source, or high-complexity components</li>
        <li><strong>Build the should-cost model</strong> — bottom-up, using design data and current market inputs</li>
        <li><strong>Run a sanity check</strong> — compare against historical actuals and similar part families</li>
        <li><strong>Identify the gap</strong> — quantify the difference between should-cost and current or quoted price</li>
        <li><strong>Prepare the negotiation brief</strong> — document your assumptions, sources, and reasoning; be ready to show your work</li>
        <li><strong>Engage the supplier</strong> — share your model, invite challenge, focus on cost drivers not just final numbers</li>
        <li><strong>Close with a documented agreement</strong> — price adjustments should trace back to specific cost elements, not just a percentage move</li>
        <li><strong>Revisit at design freeze and <a href="/products">production transitions</a></strong> — should-cost should update when design or volume assumptions change</li>
      </ol>

      <h3>Frequently Asked Questions</h3>

      <h4>What is should-cost analysis and why does it matter for OEMs?</h4>
      <p>Should-cost analysis is the process of estimating what a manufactured part should cost based on its materials, processes, overhead, and a reasonable supplier margin — independent of what a supplier actually quotes. For OEMs in defence, aerospace, and precision manufacturing, it removes the informational asymmetry in supplier negotiations and enables cost decisions grounded in engineering logic rather than market positioning.</p>

      <h4>How is should-cost analysis different from cost benchmarking?</h4>
      <p>Benchmarking compares a price against historical or market data for similar parts. Should-cost analysis builds cost from the bottom up — geometry, process, material, labour — for the specific part in question. Benchmarking tells you if a price looks unusual. Should-cost analysis tells you exactly where it's unusual and why.</p>

      <h4>What data do you need to build a should-cost model?</h4>
      <p>At minimum: part drawing or 3D model, material specification, process route (or an assumed process route based on features), machine hourly rates for the relevant processes, current material prices, and a reasonable overhead and margin assumption. More accurate models also incorporate supplier-specific data like location, certifications, and capacity.</p>

      <h4>Can should-cost analysis be applied to defence and space manufacturing components?</h4>
      <p>Yes — and it's particularly valuable there. Defence and space components often have small supplier pools and long contract durations, which limits competitive pressure. A bottom-up should-cost model gives procurement teams an objective cost floor that holds up under audit and supports fair-pricing discussions even in single-source situations.</p>

      <h4>How does should-cost analysis support supplier negotiation strategy?</h4>
      <p>It gives buyers a data-backed target price and a detailed cost breakdown they can table in negotiations. Instead of bargaining by percentage, both parties can discuss specific cost drivers — material grade, cycle time, overhead assumptions. This tends to surface real savings opportunities and produce more durable pricing agreements.</p>

      <h4>What role does AI cost estimation play in should-cost analysis?</h4>
      <p>Manual should-cost modelling is time-intensive and doesn't scale well across large part catalogues. AI cost estimation tools can auto-extract geometric and material parameters from CAD files, apply live market pricing, and generate should-cost breakdowns in a fraction of the time. For OEMs running multiple concurrent programmes, this makes should-cost analysis practical as a standard workflow rather than a periodic project.</p>

      <h4>How often should should-cost models be updated?</h4>
      <p>Should-cost models should be updated at major design milestones, when material prices shift significantly, when production volumes change, and before any contract renewal or re-negotiation. Treating should-cost as a living document rather than a point-in-time estimate keeps it useful across the full product lifecycle.</p>

      <h3>Conclusion</h3>

      <p>Should-cost analysis closes the knowledge gap that makes supplier negotiations feel like guesswork. When you know what a part should cost — not just what a supplier is asking — you negotiate from facts, not from hope. For India's defence, aerospace, and space OEMs, where supplier pools are limited and contract durations are long, that difference directly affects programme economics and long-term competitiveness.</p>

      <p>The discipline isn't complicated in principle. What makes it hard at scale is the data work: keeping material prices current, modelling process routes accurately, and doing this across hundreds of part numbers without burning out your cost engineering team. That's the problem modern tooling is built to solve.</p>

      <div class="cta-box">
        <h3>See Should-Cost Analysis on Your Own Parts</h3>
        <p>If you want to see how Emithran's Should-Cost Analysis module helps cost engineering and procurement teams build bottom-up cost models directly from CAD data — and turn those models into negotiation-ready breakdowns — <a href="/contact">book a demo</a> and we'll walk you through it with a part from your own programme.</p>
      </div>
    `,
  },
}

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
  'compound-growth-manufacturing-cost-intelligence': {
    heroImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop',
    authorBio:
      '<strong>Abushan</strong> is the CTO of Emithran. He builds the cost intelligence engines that India\'s defence, space, and aerospace manufacturers run their sourcing decisions on. He also occasionally goes down mathematical rabbit holes at 2am and writes about what he finds.',
    seo: {
      metaTitle: 'Compound Growth in Manufacturing Intelligence | Emithran Blog',
      metaDescription:
        'Why Emithran uses a live Manufacturing Intelligence Index instead of a static metric, and what it reveals about how BOM intelligence, supplier data, and should-cost models compound over time.',
      ogTitle: 'The Number That Never Stops Moving',
      ogDescription:
        'I needed a number for our hero page. What I found instead was S(t) = S₀·eʳᵗ, a rabbit hole of continuous compounding, and an honest reckoning with where the model applies to manufacturing and where I was overreaching.',
      tags: [
        'manufacturing cost intelligence',
        'continuous compound growth',
        'cost engineering',
        'Black-Scholes manufacturing',
        'Romer endogenous growth',
        'should cost analysis',
        'procurement savings',
        'exponential growth manufacturing',
        'Emithran platform',
      ],
    },
    faqs: [
      {
        question: 'Does manufacturing cost intelligence really follow exponential growth?',
        answer:
          'Honestly, it is an approximation. Pure exponential growth S(t) = S₀·eʳᵗ assumes the rate of improvement is always proportional to current size with no ceiling. Real manufacturing systems hit diminishing returns, supplier universe limits, and data saturation. A more complete model would use logistic growth, which looks exponential early on and levels off at a carrying capacity. The exponential model is a good approximation for the growth phase of a platform and a useful way to think about compounding intelligence, but it is not a proven law. The mathematics is exact. The application to manufacturing is an informed analogy.',
      },
      {
        question: 'What is continuous compound growth and why does e appear?',
        answer:
          'Continuous compound growth is what happens when you take the concept of interest compounding and push it to its limit: instead of compounding annually, then monthly, then daily, you compound at every instant. As the frequency approaches infinity, the formula converges to S₀·eʳᵗ where e is Euler\'s number (~2.71828). Euler\'s number is not chosen arbitrarily. It falls out of the limit naturally: e = lim(1 + 1/n)ⁿ as n → ∞.',
      },
      {
        question: 'How is this related to Black-Scholes?',
        answer:
          'Black-Scholes starts from the assumption that stock prices follow a continuous stochastic process: dS = μS·dt + σS·dW. The deterministic part of that equation (without the randomness term σS·dW) is just dS = μS·dt, which has the solution S(t) = S₀·e^(μt). So continuous compound growth is the foundation of Black-Scholes. The Nobel insight was building a risk-free hedging strategy on top of that foundation.',
      },
      {
        question: 'Why does the Emithran homepage counter show 8 decimal places?',
        answer:
          'It is a design choice, not a mathematical necessity. The underlying continuous function eʳᵗ has infinite resolution. A 64-bit floating point number (IEEE 754) gives about 15 to 17 significant decimal digits. We chose 8 because it makes the number visibly alive without being meaningless noise. The precise decimal places signal that the value is computed from a formula, not estimated.',
      },
      {
        question: 'What is the honest version of the claim that intelligence compounds?',
        answer:
          'A defensible statement is: if the rate at which a platform discovers new savings opportunities is proportional to the amount of knowledge already accumulated, then the savings trajectory can be approximated by an exponential function S(t) = S₀·eʳᵗ during the growth phase. That is different from saying the platform necessarily follows exponential growth forever. The maths is a model. All models are approximations.',
      },
    ],
    content: `
<p style="font-size:1.1rem;color:#374151;line-height:1.8;font-style:italic;border-left:3px solid #0d9e8a;padding-left:1.25rem;margin-bottom:2rem;">This post started as a 10-minute design decision. It ended three hours later with me reading a Nobel Prize lecture at 2am. But the part that actually matters for manufacturing isn't the formula. It is what the formula revealed about how a platform like Emithran gets smarter over time.</p>

<div style="background:linear-gradient(135deg,#f0fdf8,#e6faf5);border:1px solid #0d9e8a33;border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:2.5rem;">
  <p style="color:#0d1117;font-size:1rem;line-height:1.7;margin:0;"><strong>The short version:</strong> The Manufacturing Intelligence Index on the Emithran homepage is computed, not fabricated. It belongs to the same class of growth model used to describe systems where existing knowledge helps generate new knowledge. The rate is a modelling parameter, not audited customer data. The index represents accumulated manufacturing intelligence, not savings from a ledger. This post explains the formula, why it applies here, and more importantly, why manufacturing knowledge compounds in the first place.</p>
</div>

<h2>The Problem: I Needed a Number That Was Actually True</h2>

<p>I had been staring at the Emithran hero section for about an hour. We had the headline. The typewriter animation cycling through "BOM Intelligence... Should-Cost... Supplier Radar." What we didn't have was a number that felt honest.</p>

<p>A static figure felt like a lie. "Over $2 million saved" sounds like a brochure you never update. A random incrementing counter felt worse. I have seen those on competitor sites. Open the browser console and there is usually a Math.random() call somewhere. It is the digital equivalent of fake reviews.</p>

<p>I wanted something computed. Something where if a visitor looked at the source and asked "how is this calculated?" the answer would be real mathematics.</p>

<p>That is when I remembered a formula from university.</p>

<h2>The Formula and What It Actually Says</h2>

<p>S(t) = S0 * e^(r*t). Continuous compound growth. I wrote it as a comment in the code almost instinctively:</p>

<div style="background:#0d1117;border-radius:12px;padding:1.5rem;margin:1.5rem 0;font-family:monospace;font-size:0.85rem;color:#e5e7eb;line-height:1.8;">
  <p style="color:#6b7280;margin:0 0 0.25rem;">// Global deterministic counter - same value for every visitor</p>
  <p style="color:#6b7280;margin:0 0 0.25rem;">// S(t) = S0 * e^(r*t) - continuous compound growth</p>
  <p style="color:#6b7280;margin:0 0 0.25rem;">// Epoch: June 1 2024 · r = 0.0025/day · today index approx 158,675</p>
  <p style="color:#6b7280;margin:0 0 0.75rem;">// CC_R is a modelling parameter, not a customer-derived metric</p>
  <p style="color:#2dd4bf;margin:0;">const CC_S0 = 25_000</p>
  <p style="color:#2dd4bf;margin:0;">const CC_R  = 0.0025 / 86_400_000</p>
  <p style="color:#2dd4bf;margin:0;">const CC_EPOCH = new Date('2024-06-01T00:00:00Z').getTime()</p>
  <p style="color:#e5e7eb;margin:0.75rem 0 0;">function calcSavings() {</p>
  <p style="color:#e5e7eb;margin:0 0 0 1.5rem;">return CC_S0 * Math.exp(CC_R * (Date.now() - CC_EPOCH))</p>
  <p style="color:#e5e7eb;margin:0;">}</p>
</div>

<p>Every visitor at the same moment sees exactly the same number. The formula is deterministic. Set an epoch, set a rate, compute. The decimal digits keep moving because the function is continuous with no steps or jumps. That is what makes it belong to the same family of models used in Black-Scholes options pricing and Romer's Nobel Prize-winning endogenous growth theory.</p>

<p>To be precise about what this index is: the rate parameter is a modelling choice, not a measured statistic. The index represents accumulated manufacturing intelligence, not a running ledger of confirmed customer savings. An enterprise buyer should not read "158,675" and assume we have invoices to match. We do not yet. What we have is a formula that describes how we believe the platform should grow, with a commitment to replace it with real data as it matures.</p>

<h2>The Insight That Actually Matters: Non-Rivalrous Knowledge</h2>

<p>Here is the part I want every procurement head, engineering director, and sourcing manager to read. This is not about the mathematics of e. It is about why manufacturing intelligence compounds in the first place.</p>

<p>Paul Romer won the 2018 Nobel Prize in Economics for showing that economic growth comes from inside economies, driven by knowledge accumulation. His key insight was that knowledge is <strong>non-rivalrous</strong>. A machine wears out. An idea does not.</p>

<p>When a factory learns a better way to machine a titanium bracket, that knowledge does not get consumed. It applies to the next bracket, and the one after that, shared with colleagues without being diminished. Ideas help generate more ideas. The more you know, the faster you can learn.</p>

<div style="background:linear-gradient(135deg,#f0fdf8,#e6faf5);border:1px solid rgba(13,158,138,0.2);border-radius:12px;padding:1.5rem;margin:1.5rem 0;">
  <p style="color:#0d1117;font-size:1.05rem;line-height:1.75;margin:0;font-style:italic;">"Every should-cost model we build is non-rivalrous knowledge. It does not get consumed when we use it. It trains the engine. It improves the benchmark database. It makes the next model more accurate."</p>
  <p style="color:#0d9e8a;font-size:0.85rem;margin:0.75rem 0 0;">That is Romer's insight operating at the level of a single manufacturing intelligence platform.</p>
</div>

<p>That is Emithran's structural advantage. Not the size of the team or the speed of the roadmap. The fact that every BOM validated, every supplier evaluated, and every cost model run makes the platform better at answering the next question, for every customer on it.</p>

<h2>What This Looks Like in Practice</h2>

<p>Here is how that compounding plays out concretely for procurement and engineering teams:</p>

<div style="overflow-x:auto;margin:1.5rem 0;">
  <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
    <thead>
      <tr style="background:#f0fdf8;border-bottom:2px solid rgba(13,158,138,0.2);">
        <th style="padding:0.75rem 1rem;text-align:left;font-weight:700;color:#0d1117;">Year on Platform</th>
        <th style="padding:0.75rem 1rem;text-align:left;font-weight:700;color:#0d1117;">Knowledge Index</th>
        <th style="padding:0.75rem 1rem;text-align:left;font-weight:700;color:#0d1117;">Illustrative Procurement Impact</th>
        <th style="padding:0.75rem 1rem;text-align:left;font-weight:700;color:#0d1117;">What has compounded</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:0.75rem 1rem;font-weight:600;">Year 1</td>
        <td style="padding:0.75rem 1rem;font-family:monospace;">100</td>
        <td style="padding:0.75rem 1rem;color:#0d1117;font-weight:600;">~$60,000</td>
        <td style="padding:0.75rem 1rem;color:#64748b;font-size:0.85rem;">First should-cost models, baseline BOM validation</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;background:#fafafa;">
        <td style="padding:0.75rem 1rem;font-weight:600;">Year 2</td>
        <td style="padding:0.75rem 1rem;font-family:monospace;">115</td>
        <td style="padding:0.75rem 1rem;color:#0d1117;font-weight:600;">~$72,000</td>
        <td style="padding:0.75rem 1rem;color:#64748b;font-size:0.85rem;">Supplier benchmarks, PPAP history, part-family patterns</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:0.75rem 1rem;font-weight:600;">Year 3</td>
        <td style="padding:0.75rem 1rem;font-family:monospace;">132</td>
        <td style="padding:0.75rem 1rem;color:#0d1117;font-weight:600;">~$87,000</td>
        <td style="padding:0.75rem 1rem;color:#64748b;font-size:0.85rem;">Cross-programme cost models, predictive flags, richer benchmarks</td>
      </tr>
    </tbody>
  </table>
</div>

<p style="font-size:0.8rem;color:#9ca3af;margin-top:-0.75rem;margin-bottom:1.5rem;">Illustrative projections. Actual outcomes depend on programme complexity, data quality, and platform integration depth.</p>

<p><strong>BOM validation:</strong> Each BOM processed teaches the system about a new part family. By year two it catches error classes it could not catch in year one, because it has seen enough variants to recognise the pattern.</p>

<p><strong>Supplier benchmarking:</strong> Each supplier evaluation deepens the capability database. A sourcing manager asking "who in India can machine an Inconel 718 impeller to this tolerance at this volume?" gets a sharper answer in year three than year one.</p>

<p><strong>Should-cost modelling:</strong> Each model run adds a cost data point. Material price curves, machine rate benchmarks, and process time estimates all sharpen as more parts are analysed across more programmes. The model gets better as it gets used.</p>

<h2>Where the Model Is Honest and Where It Is Not</h2>

<p>Pure exponential growth with no ceiling is an approximation. Real platforms hit diminishing returns. The supplier universe is finite. BOM structures saturate. Process routes repeat. A more complete model is logistic growth, which looks exponential early and levels off at a carrying capacity. We are in the early phase. When the curve bends, we will update the model.</p>

<p>The eight decimal places are a design choice, not a mathematical requirement. The function has infinite resolution. We chose eight because it makes the number look computed rather than estimated, and it provides enough visible motion to show the index is live.</p>

<p>The rate 0.25% per day is a modelling parameter. It is not derived from measured customer outcomes. When we have enough longitudinal data to replace the formula with real aggregated metrics, we will.</p>

<h2>The Only Thing That Matters</h2>

<p>The counter on the Emithran homepage is not about the formula. It is about what the formula represents: a platform that gets harder to compete with the longer it runs, because every BOM, every supplier evaluation, and every cost model adds to a knowledge base that no new entrant can replicate overnight.</p>

<p>The maths is exact. The models are imperfect. The underlying idea is this: manufacturing intelligence compounds. That is the actual product.</p>
    `,
  },
  'should-cost-analysis-supplier-negotiation': {
    heroImage:
      'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    authorBio:
      "<strong>Singaravelan S.</strong> is the CEO of Emithran, where he works with procurement and sourcing leaders across India's precision manufacturing sector to bring real cost intelligence into supplier negotiations.",
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
          'Should-cost analysis is the process of estimating what a manufactured part should cost based on its materials, processes, overhead, and a reasonable supplier margin, independently of what a supplier actually quotes. For OEMs in defence, aerospace, and precision manufacturing, it removes the informational asymmetry in supplier negotiations and enables cost decisions grounded in engineering logic rather than market positioning.',
      },
      {
        question: 'How is should-cost analysis different from cost benchmarking?',
        answer:
          "Benchmarking compares a price against historical or market data for similar parts. Should-cost analysis builds cost from the bottom up, covering geometry, process, material, and labour, for the specific part in question. Benchmarking tells you if a price looks unusual. Should-cost analysis tells you exactly where it's unusual and why.",
      },
      {
        question: 'What data do you need to build a should-cost model?',
        answer:
          'At minimum: part drawing or 3D model, material specification, process route (or an assumed process route based on features), machine hourly rates for the relevant processes, current material prices, and a reasonable overhead and margin assumption. More accurate models also incorporate supplier-specific data like location, certifications, and capacity.',
      },
      {
        question: 'Can should-cost analysis be applied to defence and space manufacturing components?',
        answer:
          'Yes, and it is particularly valuable there. Defence and space components often have small supplier pools and long contract durations, which limits competitive pressure. A bottom-up should-cost model gives procurement teams an objective cost floor that holds up under audit and supports fair-pricing discussions even in single-source situations.',
      },
      {
        question: 'How does should-cost analysis support supplier negotiation strategy?',
        answer:
          'It gives buyers a data-backed target price and a detailed cost breakdown they can table in negotiations. Instead of bargaining by percentage, both parties can discuss specific cost drivers: material grade, cycle time, and overhead assumptions. This tends to surface real savings opportunities and produce more durable pricing agreements.',
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

      <p>Without <strong>should-cost analysis</strong>, you have no way to know whether that final price reflects actual manufacturing economics or just how far the supplier was willing to move on the day. In defence, aerospace, and precision manufacturing, where a single machined component can carry $2,500–$25,000 of hidden margin, that gap matters enormously.</p>

      <p>This article explains what should-cost analysis is, how it works in practice, and why forward-thinking OEMs and Tier-1 suppliers in India are treating it as a core procurement discipline rather than an optional finance exercise.</p>

      <h3>What Is Should-Cost Analysis?</h3>

      <p>Should-cost analysis is a structured method for estimating what a part or assembly <em>ought</em> to cost based on its actual design, materials, manufacturing processes, overhead, and reasonable profit. The result is an independently derived target cost built from engineering logic, not vendor pricing.</p>

      <p>A proper should-cost model breaks cost down into its real components:</p>
      <ul>
        <li><strong>Raw material cost:</strong> grade, form factor, weight, buy-to-fly ratio</li>
        <li><strong>Process cost:</strong> machining time, setup, tooling, number of operations</li>
        <li><strong>Labour cost:</strong> operator grade, cycle time, regional wage rate</li>
        <li><strong>Overhead:</strong> machine depreciation, facility cost, utilities</li>
        <li><strong>Scrap and rework allowance:</strong> based on process capability and complexity</li>
        <li><strong>Supplier margin:</strong> reasonable profit for the process type and volume</li>
      </ul>

      <p>When you build this bottom-up, you get a defensible number. Not a wish. Not a benchmark from a catalogue. A cost that reflects what it should actually take to make that part.</p>

      <h3>Why Conventional Supplier Negotiation Falls Short</h3>

      <p>Traditional procurement negotiation relies on three weak levers:</p>
      <ol>
        <li><strong>Competitive quoting:</strong> works only if you have enough qualified suppliers and time to run a proper RFQ process</li>
        <li><strong>Year-on-year price reduction targets:</strong> often arbitrary, and resisted hard by suppliers who have already tightened margins</li>
        <li><strong>Benchmarking against similar parts:</strong> useful directionally, but rarely specific enough to hold up in a negotiation</li>
      </ol>

      <p>None of these give you a cost floor. Without knowing what a part <em>should</em> cost, you're negotiating from a position of informational asymmetry. The supplier knows their cost structure. You don't.</p>

      <p>This problem is especially acute in:</p>
      <ul>
        <li><strong>Defence manufacturing:</strong> parts often have single or dual qualified sources, making competitive tension low</li>
        <li><strong>Aerospace and space:</strong> tight tolerances and stringent material certifications limit the supplier pool</li>
        <li><strong>Precision machining:</strong> process complexity makes it easy for suppliers to hide margin inside cycle-time estimates</li>
      </ul>

      <h3>How Should-Cost Analysis Shifts the Negotiation Dynamic</h3>

      <p>When you arrive at a negotiation with a well-built should-cost model, the conversation changes completely.</p>

      <p>Instead of "your quote is too high, can you do better?", you're saying: "Based on our analysis, the material cost for this Inconel 718 forging is approximately $X, 5-axis machining at your setup time should run $Y, and your overhead at this volume is likely $Z. Our target price is $[Total]. Walk us through where our assumptions differ."</p>

      <p>That's a different meeting. The supplier can't simply say "that's our price." They have to engage with your numbers.</p>

      <p>This does three things:</p>
      <ul>
        <li>It exposes genuinely inflated margins you'd never have caught otherwise</li>
        <li>It creates a collaborative frame: you are analysing costs together, not making accusations</li>
        <li>It builds long-term supplier trust, because data-driven conversations are less adversarial than percentage haggling</li>
      </ul>

      <h4>Real-World Example: Titanium Structural Bracket for a Space Programme</h4>

      <p>Consider a supplier quoting ~$5,000 per unit for a titanium bracket used in a satellite structural assembly. A should-cost model built from the drawing and process route might reveal:</p>
      <ul>
        <li>Material: Ti-6Al-4V billet at current LME-linked prices: $1,000</li>
        <li>Machining (5-axis, 3 setups, 14-hour cycle): $1,300</li>
        <li>Inspection and certification (AS9100 compliance, CMM, FAI): $500</li>
        <li>Overhead at standard absorption rate: $650</li>
        <li>Reasonable margin (15%): $525</li>
      </ul>
      <p>Should-cost total: ~$4,000.</p>
      <p>That's a ~$1,100 gap per unit. At a programme quantity of 200 units, you have just found ~$220,000 in recoverable savings, with data to back every dollar of it.</p>

      <h3>Should-Cost Analysis in Defence and Aerospace: Why It's Different</h3>

      <p>Commercial procurement can often lean on market forces to keep pricing honest. Defence and aerospace manufacturing in India operates differently:</p>
      <ul>
        <li><strong>Limited qualified sources.</strong> DRDO, ISRO, HAL, and private defence OEMs often have 2–3 qualified suppliers for critical components. Competition alone won't give you fair pricing.</li>
        <li><strong>Long-term contracts.</strong> A component priced 15% above should-cost on a 5-year contract compounds badly.</li>
        <li><strong>Offset and indigenisation pressures.</strong> As India pushes deeper into self-reliance under Atmanirbhar Bharat, OEMs are qualifying new domestic suppliers who may not have mature cost structures. Should-cost analysis helps you price development partnerships correctly from the start.</li>
        <li><strong>DPSU audit expectations.</strong> Defence public sector units and their Tier-1 partners are increasingly required to justify procurement costs. A should-cost model is an auditable artefact, not just a negotiating tool.</li>
      </ul>

      <h4>Example: Qualifying a New Domestic Supplier for a Defence Sub-Assembly</h4>

      <p>An OEM qualifying a new MSME for a hydraulic manifold block used in an armoured vehicle programme has no historical pricing to reference. Should-cost analysis using the supplier's proposed process route, local material sourcing, and labour rates gives the OEM a fair cost target, ensuring the supplier earns a viable margin without embedding excess cost into the programme baseline.</p>

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
      <p>Modern <a href="/products">CAD to Cost</a> tooling can pull most of these inputs directly from the 3D model, turning a multi-day modelling exercise into a same-day estimate.</p>

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
        <li>Volume-adjusted burden: costs that shift as quantities change</li>
      </ul>

      <h4>4. Supplier-Side Variables</h4>
      <ul>
        <li>Location-based labour rates (Tier-2 city MSME vs. large precision shop)</li>
        <li>Certifications held (AS9100, NADCAP), which carry real overhead costs</li>
        <li>Capacity utilisation: a supplier running at 60% has different economics than one at 90%</li>
      </ul>

      <h3>Where Should-Cost Software Changes the Game</h3>

      <p>Building a should-cost model manually in Excel works for one part. It doesn't scale to a programme with 300 unique part numbers, or to a sourcing cycle that needs to move in weeks, not months.</p>

      <p><strong>Should-cost software</strong> that integrates with CAD, PLM, and supplier data can:</p>
      <ul>
        <li>Auto-extract geometry parameters and material specs from 3D models</li>
        <li>Apply current material prices (LME, domestic market indices)</li>
        <li>Run process simulations to estimate machining time</li>
        <li>Generate a cost breakdown automatically, ready for review and refinement</li>
        <li>Track cost variance across revision cycles, so you know when a design change shifts should-cost materially</li>
      </ul>

      <p>For cost engineering teams at OEMs managing multiple simultaneous programmes across space, defence, and commercial work, this shift from manual modelling to <a href="/products">AI cost estimation</a> is the difference between should-cost as a project and should-cost as a standard practice.</p>

      <h3>Common Mistakes in Should-Cost Analysis</h3>

      <p>Even well-intentioned teams get this wrong. Here's what to avoid:</p>

      <p><strong>1. Using catalogue or index prices for everything.</strong> Material prices vary by supplier, form, certification level, and lot size. A should-cost model that uses LME spot price for aerospace-grade aluminium without accounting for certified billet premium is going to be off.</p>

      <p><strong>2. Ignoring supplier overhead realities.</strong> An MSME with NADCAP certification for special processes carries real overhead that a non-certified shop doesn't. Your model needs to reflect the right overhead tier for that supplier, not the cheapest option available.</p>

      <p><strong>3. Treating should-cost as a one-time exercise.</strong> Parts evolve. Designs change. Material prices move. A should-cost model that isn't updated through the product lifecycle becomes stale and unreliable fast.</p>

      <p><strong>4. Using it as a hammer, not a conversation.</strong> Should-cost is most effective when shared with suppliers as a collaborative tool. Presenting it as a take-it-or-leave-it demand tends to damage relationships and doesn't surface the real cost levers.</p>

      <p><strong>5. Not tying it to <a href="/products">supplier intelligence</a>.</strong> The most accurate should-cost model still needs to be calibrated against what you know about a specific supplier's actual capabilities and cost structure. General assumptions won't reflect the economics of a specific shop floor.</p>

      <h3>Building a Should-Cost-Based Supplier Negotiation Strategy</h3>

      <p>Here's a practical approach for OEM procurement and cost engineering teams:</p>
      <ol>
        <li><strong>Select target parts:</strong> prioritise high-spend, single-source, or high-complexity components</li>
        <li><strong>Build the should-cost model</strong> bottom-up, using design data and current market inputs</li>
        <li><strong>Run a sanity check:</strong> compare against historical actuals and similar part families</li>
        <li><strong>Identify the gap:</strong> quantify the difference between should-cost and current or quoted price</li>
        <li><strong>Prepare the negotiation brief:</strong> document your assumptions, sources, and reasoning, and be ready to show your work</li>
        <li><strong>Engage the supplier:</strong> share your model, invite challenge, and focus on cost drivers rather than just final numbers</li>
        <li><strong>Close with a documented agreement:</strong> price adjustments should trace back to specific cost elements, not just a percentage move</li>
        <li><strong>Revisit at design freeze and <a href="/products">production transitions</a>:</strong> update should-cost whenever design or volume assumptions change</li>
      </ol>

      <h3>Frequently Asked Questions</h3>

      <h4>What is should-cost analysis and why does it matter for OEMs?</h4>
      <p>Should-cost analysis is the process of estimating what a manufactured part should cost based on its materials, processes, overhead, and a reasonable supplier margin, independently of what a supplier actually quotes. For OEMs in defence, aerospace, and precision manufacturing, it removes the informational asymmetry in supplier negotiations and enables cost decisions grounded in engineering logic rather than market positioning.</p>

      <h4>How is should-cost analysis different from cost benchmarking?</h4>
      <p>Benchmarking compares a price against historical or market data for similar parts. Should-cost analysis builds cost from the bottom up, covering geometry, process, material, and labour, for the specific part in question. Benchmarking tells you if a price looks unusual. Should-cost analysis tells you exactly where it's unusual and why.</p>

      <h4>What data do you need to build a should-cost model?</h4>
      <p>At minimum: part drawing or 3D model, material specification, process route (or an assumed process route based on features), machine hourly rates for the relevant processes, current material prices, and a reasonable overhead and margin assumption. More accurate models also incorporate supplier-specific data like location, certifications, and capacity.</p>

      <h4>Can should-cost analysis be applied to defence and space manufacturing components?</h4>
      <p>Yes, and it is particularly valuable there. Defence and space components often have small supplier pools and long contract durations, which limits competitive pressure. A bottom-up should-cost model gives procurement teams an objective cost floor that holds up under audit and supports fair-pricing discussions even in single-source situations.</p>

      <h4>How does should-cost analysis support supplier negotiation strategy?</h4>
      <p>It gives buyers a data-backed target price and a detailed cost breakdown they can table in negotiations. Instead of bargaining by percentage, both parties can discuss specific cost drivers: material grade, cycle time, and overhead assumptions. This tends to surface real savings opportunities and produce more durable pricing agreements.</p>

      <h4>What role does AI cost estimation play in should-cost analysis?</h4>
      <p>Manual should-cost modelling is time-intensive and doesn't scale well across large part catalogues. AI cost estimation tools can auto-extract geometric and material parameters from CAD files, apply live market pricing, and generate should-cost breakdowns in a fraction of the time. For OEMs running multiple concurrent programmes, this makes should-cost analysis practical as a standard workflow rather than a periodic project.</p>

      <h4>How often should should-cost models be updated?</h4>
      <p>Should-cost models should be updated at major design milestones, when material prices shift significantly, when production volumes change, and before any contract renewal or re-negotiation. Treating should-cost as a living document rather than a point-in-time estimate keeps it useful across the full product lifecycle.</p>

      <h3>Conclusion</h3>

      <p>Should-cost analysis closes the knowledge gap that makes supplier negotiations feel like guesswork. When you know what a part should cost, not just what a supplier is asking, you negotiate from facts, not from hope. For India's defence, aerospace, and space OEMs, where supplier pools are limited and contract durations are long, that difference directly affects programme economics and long-term competitiveness.</p>

      <p>The discipline isn't complicated in principle. What makes it hard at scale is the data work: keeping material prices current, modelling process routes accurately, and doing this across hundreds of part numbers without burning out your cost engineering team. That's the problem modern tooling is built to solve.</p>

    `,
  },

  'what-is-should-cost-analysis': {
    heroImage:
      'https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=870&auto=format&fit=crop',
    authorBio:
      '<strong>Singaravelan S.</strong> is the CEO of Emithran. He has spent over fifteen years in cost engineering and supply chain strategy for automotive, aerospace, and defence OEMs. He founded Emithran to bring rigorous should-cost discipline to India\'s most critical manufacturing programmes.',
    seo: {
      metaTitle: 'What Is Should-Cost Analysis? A Complete Guide | Emithran Blog',
      metaDescription:
        'Should-cost analysis tells you what a part should cost to make — not what a supplier quotes. Learn how it works, when to use it, and how India\'s leading OEMs apply it in defence, aerospace, and space manufacturing.',
      ogTitle: 'What Is Should-Cost Analysis? A Complete Guide for Manufacturers',
      ogDescription:
        'The definitive guide to should-cost analysis for procurement and engineering teams in defence, aerospace, and precision manufacturing.',
      tags: [
        'should cost analysis', 'should cost modelling', 'cost engineering',
        'supplier negotiation', 'manufacturing cost analysis', 'BOM cost',
        'procurement strategy India', 'defence manufacturing cost', 'aerospace cost engineering',
      ],
    },
    faqs: [
      {
        question: 'What is the difference between should-cost analysis and cost benchmarking?',
        answer:
          'Benchmarking compares a supplier\'s price against market data for similar parts. Should-cost analysis builds a cost estimate from the bottom up — material, process, labour, overhead, margin — for your specific part. Benchmarking tells you if a price looks unusual. Should-cost tells you exactly where it is unusual and by how much.',
      },
      {
        question: 'How accurate is a should-cost model?',
        answer:
          'For standard machined, stamped, and cast components, well-built should-cost models are typically accurate to within ±8–12% of actual manufacturing cost. Accuracy improves significantly when you have a detailed CAD file or engineering drawing. Complex multi-process assemblies may have wider variance, and these cases should be flagged explicitly.',
      },
      {
        question: 'When should you use should-cost analysis?',
        answer:
          'Should-cost analysis is most valuable at three moments: before issuing an RFQ (to set a defensible target price), during supplier negotiation (to challenge quotes with specific cost driver data), and at contract renewal (to assess whether pricing has drifted from actual manufacturing cost). It is also useful when qualifying a new supplier or evaluating a sourcing shift between geographies.',
      },
      {
        question: 'Can should-cost analysis be applied to defence and space components?',
        answer:
          'Yes, and it is particularly valuable there. Defence and space components often have limited supplier pools and long contract durations, which reduces competitive pressure on pricing. A bottom-up should-cost model gives procurement teams an objective cost floor that holds up under audit and supports fair-pricing discussions even in single-source situations.',
      },
      {
        question: 'What data do you need to build a should-cost model?',
        answer:
          'At minimum: a part drawing or 3D model, material specification, assumed process route, machine hourly rates for the relevant processes, current material prices, and overhead and margin assumptions. More accurate models also incorporate supplier-specific data such as location, certifications, batch volume, and capacity utilisation.',
      },
    ],
    content: `
<p style="font-size:1.1rem;color:#374151;line-height:1.8;font-style:italic;border-left:3px solid #0d9e8a;padding-left:1.25rem;margin-bottom:2rem;">Should-cost analysis is not a negotiation tactic. It is a discipline. It tells you what a part should cost to manufacture — based on how it is actually made — rather than what a supplier has decided to charge. For procurement and engineering teams in defence, aerospace, and precision manufacturing, it is the most important analytical tool available.</p>

<h2>What Is Should-Cost Analysis?</h2>

<p>Should-cost analysis is a structured method for estimating the true manufacturing cost of a component or assembly from first principles. Instead of treating a supplier's quoted price as the starting point for negotiation, should-cost analysis builds a cost model from the bottom up:</p>

<ul>
  <li><strong>Raw material cost</strong> — driven by material grade, part weight, input weight, and scrap rate</li>
  <li><strong>Process cost</strong> — driven by the manufacturing operations required (turning, milling, stamping, welding), machine hourly rates, and cycle times</li>
  <li><strong>Labour cost</strong> — driven by the number of operators, labour rates at the manufacturing location, and direct labour hours</li>
  <li><strong>Overhead and SG&amp;A</strong> — the factory overhead burden and selling, general &amp; administrative costs, typically expressed as a percentage of direct manufacturing cost</li>
  <li><strong>Profit margin</strong> — the supplier's target margin, which varies by industry, geography, and relationship</li>
</ul>

<p>The result is a cost model that tells you what a competent manufacturer, working at a reasonable volume and using appropriate equipment, should charge for the part — with no padding, no legacy pricing, and no inherited inefficiency baked in.</p>

<h2>Why Should-Cost Analysis Matters for Indian OEMs</h2>

<p>India's defence, aerospace, and space manufacturing ecosystem has a structural challenge that makes should-cost analysis especially critical: limited supplier pools and long contract durations.</p>

<p>When you have three qualified suppliers for a precision casting and a five-year defence programme contract, competitive tension is low. Without an independent cost model, procurement teams are negotiating from a position of significant information asymmetry — the supplier knows exactly what the part costs to make; you are working from market intuition and prior quotes.</p>

<p>Should-cost analysis closes that gap. It gives you a fact-based cost floor — one you can articulate, defend, and use as the basis for structured commercial discussion. Emithran's case studies consistently show that procurement teams using should-cost data in supplier negotiations achieve cost reductions of 20–39% compared to teams negotiating from quote alone.</p>

<h2>How Should-Cost Analysis Works: The Core Method</h2>

<h3>Step 1: Understand the Part</h3>

<p>The starting point is always the engineering drawing or CAD file. From it, you extract:</p>

<ul>
  <li>Part family (machined component, sheet metal fabrication, casting, moulded part)</li>
  <li>Material specification and grade</li>
  <li>Key dimensions and weight</li>
  <li>Tolerances and surface finish requirements</li>
  <li>Critical features that drive process selection (deep holes, tight-tolerance bores, complex profiles)</li>
</ul>

<p>This review also helps identify where a supplier might be using a sub-optimal process — which is often where the biggest cost saving lies.</p>

<h3>Step 2: Map the Manufacturing Process Route</h3>

<p>The process route is the sequence of manufacturing operations required to make the part. For a CNC-machined shaft, this might be: bar stock cutting → rough turning → semi-finish turning → grinding → heat treatment → inspection.</p>

<p>For each operation, you need to determine:</p>
<ul>
  <li>Which machine or process type is appropriate</li>
  <li>The cycle time for the operation at the relevant part size and material</li>
  <li>The machine hourly rate at the manufacturing location</li>
  <li>Setup time amortised over the batch volume</li>
</ul>

<h3>Step 3: Cost Material</h3>

<p>Material cost is the input weight multiplied by the material price per kilogram, adjusted for scrap and rejection rate. Input weight is always higher than finish weight — the difference is machining swarf, trimmed flash, or sprues from casting. A thorough should-cost model accounts for material yield, not just the weight of the finished part.</p>

<p>For bought-out items (bearings, fasteners, seals), the cost is sourced from commodity databases or direct quotation from distributors.</p>

<h3>Step 4: Apply Overheads and Margin</h3>

<p>Overhead rates vary significantly by geography and factory type. Indian precision machining facilities typically run at 80–120% overhead on direct labour. German facilities run higher. Chinese facilities may run lower on paper but carry quality risk and logistics cost.</p>

<p>Supplier margin varies too — 7–15% is typical for standard precision parts in India's defence supply chain. MSME suppliers may run lower margins to win volume; single-source specialists may justify higher margins through technology uniqueness.</p>

<h3>Step 5: Build the Target Price</h3>

<p>Adding material, process, labour, overhead, and margin gives you the should-cost estimate. This becomes your target price — the number you bring to the supplier negotiation table with evidence, not hope.</p>

<h2>What Should-Cost Analysis Is Not</h2>

<p>It is worth being clear about what should-cost analysis does not do:</p>

<p><strong>It does not guarantee a supplier can hit the target.</strong> A should-cost model assumes a competent manufacturer with appropriate equipment. If your supplier is running equipment that is genuinely less efficient, they may legitimately cost more. The should-cost model helps you identify whether this is true — and whether you should be finding a more capable supplier.</p>

<p><strong>It is not a substitute for competitive tendering.</strong> Should-cost analysis is most powerful alongside market competition, not instead of it. When you have competitive quotes and a should-cost model, you can push the best supplier to their cost floor. When you have only a should-cost model, it gives you direction, not certainty.</p>

<p><strong>It does not capture every cost.</strong> First-article inspection, tooling amortisation, quality assurance costs, and programme-specific requirements are sometimes outside the standard should-cost model. A thorough model accounts for them; a quick estimate may not.</p>

<h2>Should-Cost Analysis in Practice: Real Numbers</h2>

<p>To make this concrete: Emithran recently completed a should-cost analysis for a 2T LCV rear drive axle — a $244 assembly manufactured in India at 40,000 units per year. The analysis found:</p>

<ul>
  <li>The Drive Head / Carrier assembly drives 46% of total axle cost ($112 of $244)</li>
  <li>Within the Drive Head, bearings (bought-out) and the Carrier Housing (cast + CNC machined) each account for 16% — the two largest single components</li>
  <li>Forged components (Ring Gear, Half Shaft, Pinion Shaft, Side Gears) together account for 21% of Drive Head cost</li>
</ul>

<p>This level of component-level visibility tells the procurement team exactly where to direct negotiation effort: multi-source the bearings, challenge the Carrier Housing casting yield assumption, and benchmark the forge suppliers against alternatives in the Coimbatore cluster. Without the should-cost model, negotiation would be a flat percentage discussion. With it, it is a targeted, data-backed commercial conversation.</p>

<h2>Should-Cost Analysis and Modern Software</h2>

<p>Manual should-cost modelling is precise but slow. Building a thorough model for a 50-part BOM can take a cost engineering team several weeks. At the scale that modern procurement teams operate — managing hundreds of active part numbers across multiple programmes — this creates a bottleneck.</p>

<p>Modern should-cost software addresses this by automating the most time-consuming parts of the analysis: extracting geometry and material from CAD files, applying live commodity prices, and generating process route cost models based on part family and feature recognition. Emithran's Should-Cost Engine does this for machined, stamped, cast, and sheet metal parts — reducing model build time from days to minutes while maintaining the rigour of first-principles costing.</p>

<h2>Key Takeaways</h2>

<ul>
  <li>Should-cost analysis builds a bottom-up manufacturing cost estimate from material, process, labour, overhead, and margin — independent of supplier quotes</li>
  <li>It is most valuable before RFQ, during negotiation, and at contract renewal</li>
  <li>For Indian OEMs in defence, aerospace, and space, where supplier pools are limited, it closes the information asymmetry that benefits suppliers at procurement's expense</li>
  <li>Typical cost reductions achieved using should-cost data in negotiations range from 20–39%</li>
  <li>Modern should-cost software makes the analysis scalable across large part catalogues without sacrificing analytical rigour</li>
</ul>
    `,
  },

  'how-to-do-should-cost-analysis': {
    heroImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=870&auto=format&fit=crop',
    authorBio:
      '<strong>Abushan</strong> is the CTO of Emithran. He built the Should-Cost Engine that powers cost modelling for Emithran\'s defence, aerospace, and space OEM customers. He has personally run should-cost analyses on everything from injection-moulded plastic covers to 74-line chassis ladder frame assemblies.',
    seo: {
      metaTitle: 'How to Do Should-Cost Analysis: Step-by-Step Guide | Emithran Blog',
      metaDescription:
        'A practical step-by-step guide to building a should-cost model for any manufactured part. Learn how to cost material, process, labour, and overhead — with real examples from precision manufacturing.',
      ogTitle: 'How to Do Should-Cost Analysis: A Step-by-Step Guide',
      ogDescription:
        'From part drawing to negotiation brief: a practical guide to building should-cost models for machined, cast, stamped, and sheet metal parts.',
      tags: [
        'how to do should cost analysis', 'should cost methodology', 'cost engineering steps',
        'manufacturing cost model', 'should cost template', 'process costing',
        'supplier negotiation', 'procurement engineering India',
      ],
    },
    faqs: [
      {
        question: 'What is the first step in a should-cost analysis?',
        answer:
          'The first step is always understanding the part: read the engineering drawing or CAD file to identify the part family, material specification, key dimensions, weight, tolerances, and critical features. This review determines which manufacturing processes are required and flags any features that will drive cost disproportionately.',
      },
      {
        question: 'How do you determine the right process route for a should-cost model?',
        answer:
          'Process route selection follows the part\'s features. A turned shaft with tight-tolerance bores requires CNC turning and possibly cylindrical grinding. A sheet metal bracket requires laser cutting and press braking. If you are unsure, review similar parts in your database, consult a manufacturing engineer, or use a should-cost platform that auto-suggests the process route from CAD geometry.',
      },
      {
        question: 'Where do you get machine hourly rates and material prices?',
        answer:
          'Machine hourly rates (MHR) vary significantly by geography and equipment type. Industry benchmarks are available from cost engineering associations and regional manufacturing databases. Material prices should come from live commodity feeds — LME for metals, resin price indices for plastics. Using outdated material prices is one of the most common errors in should-cost modelling.',
      },
      {
        question: 'How do you handle bought-out items in a should-cost model?',
        answer:
          'Bought-out items (bearings, fasteners, seals, electronic components) are costed from distributor catalogues (Octopart, RS, element14) or direct quotes from multiple suppliers. For high-volume programmes, request distributor pricing at your target annual volume — unit prices at 10,000 pieces can be 30–60% lower than list price.',
      },
      {
        question: 'How do you know if your should-cost model is accurate?',
        answer:
          'Validate your model against actual quotes for similar parts, against known manufacturing costs where available, and by sense-checking individual cost lines against industry benchmarks. Material cost as a percentage of total is a useful sanity check: for machined steel parts, material typically drives 25–45% of total cost; for injection-moulded plastic parts, it often drives 60–80%.',
      },
    ],
    content: `
<p style="font-size:1.1rem;color:#374151;line-height:1.8;font-style:italic;border-left:3px solid #0d9e8a;padding-left:1.25rem;margin-bottom:2rem;">Should-cost analysis has a reputation for being the domain of specialist cost engineers with proprietary databases and years of process knowledge. That is partly true — rigour matters. But the methodology itself is structured and learnable. This guide walks through the complete process, step by step, with real manufacturing examples.</p>

<h2>Step 1: Read the Drawing (or CAD File) Like an Engineer</h2>

<p>Before you open a spreadsheet, you need to understand what you are costing. Pull up the engineering drawing or CAD file and extract:</p>

<ul>
  <li><strong>Part family</strong> — Is this a machined component? A sheet metal fabrication? A casting? A moulded part? A welded assembly? The process family determines everything downstream.</li>
  <li><strong>Material specification</strong> — Note the exact grade: EN24 alloy steel, ADC12 aluminium die cast, SS304, PP+20% GF. Grade determines material price per kilogram, density (for weight calculation), and machinability factor (which affects cycle time).</li>
  <li><strong>Finish weight and envelope dimensions</strong> — These determine material cost and machine time. Note both.</li>
  <li><strong>Critical features</strong> — Deep holes, tight-tolerance bores, thin walls, complex profiles, and tight surface finish requirements (Ra 0.8 or better) all increase process cost. Flag them.</li>
  <li><strong>Tolerance class</strong> — General tolerance (IT7–IT9) vs. precision tolerance (IT5–IT6) changes both process selection and inspection cost.</li>
</ul>

<p>This step takes 15–30 minutes for a single part but pays back many times over in model accuracy.</p>

<h2>Step 2: Map the Manufacturing Process Route</h2>

<p>The process route is the sequence of operations needed to take raw material to finished part. For most part families, there is a standard route with variations:</p>

<p><strong>CNC machined shaft:</strong> Bar stock cutting → Rough turning → Semi-finish turning → Heat treatment → Finish grinding → Inspection</p>

<p><strong>Sheet metal bracket:</strong> Laser cutting → Deburring → Press braking → Spot welding → Powder coating → Inspection</p>

<p><strong>HPDC aluminium casting:</strong> Die casting → Trimming / deflashing → Shot blasting → CNC machining → Anodising → Inspection</p>

<p>For each operation, you need to specify:</p>

<ul>
  <li>Machine or process type (CNC lathe, press brake, HPDC machine, laser cutter)</li>
  <li>Machine tonnage or size class (affects machine hourly rate)</li>
  <li>Estimated cycle time at the part's dimensions and material</li>
  <li>Number of operators required</li>
  <li>Setup time, amortised over the batch size</li>
</ul>

<h2>Step 3: Calculate Material Cost</h2>

<p>Material cost has two components: bought material and wastage.</p>

<p><strong>Formula:</strong> Material cost = Input weight × Material price per kg</p>

<p>Input weight is always higher than finish weight. The difference is:</p>
<ul>
  <li>Machining swarf (turned and milled away)</li>
  <li>Casting sprue and runner (trimmed off)</li>
  <li>Sheet metal skeleton waste (remaining after laser cutting)</li>
  <li>Rejection allowance (typically 1–5% of units)</li>
</ul>

<p>A typical machined part has a material utilisation of 50–70%. A casting might be 80–90%. A laser-cut sheet metal part might be 70–80%, depending on nesting efficiency.</p>

<p><strong>Example:</strong> A steel forged ring gear with finish weight 2.5 kg and input weight 3.8 kg at 0.89 USD/kg gives: 3.8 × 0.89 = $3.38 material cost per part.</p>

<h2>Step 4: Calculate Process Cost for Each Operation</h2>

<p>Process cost is cycle time × machine hourly rate, divided by the number of parts produced per hour.</p>

<p><strong>Formula:</strong> Process cost (per part) = (Cycle time in minutes / 60) × Machine hourly rate ($/hr)</p>

<p>For a CNC turning operation with 8-minute cycle time on a machine running at $3/hr: (8/60) × 3 = $0.40 per part.</p>

<p>Machine hourly rates vary significantly by geography:</p>

<ul>
  <li>CNC turning, India: $2–4/hr</li>
  <li>CNC turning, Germany: $60–90/hr</li>
  <li>Laser cutting (3kW), India: $8–15/hr</li>
  <li>HPDC (250T), India: $12–20/hr</li>
  <li>Gear hobbing, India: $4–6/hr</li>
</ul>

<p>Sum the process cost across all operations to get the total process cost per part.</p>

<h2>Step 5: Add Labour Cost</h2>

<p>In many should-cost models, direct labour is already embedded in the machine hourly rate (particularly for highly automated processes). For labour-intensive operations — manual assembly, wire harness assembly, inspection — add direct labour separately.</p>

<p><strong>Formula:</strong> Labour cost = (Cycle time in hours) × Labour rate ($/hr) × Number of operators</p>

<p>Indian direct labour rates for precision manufacturing: ₹150–300/hr ($1.80–3.60/hr) depending on skill level and region. Wire harness assembly in Bangalore: approximately $2.50/hr fully loaded.</p>

<h2>Step 6: Apply Overhead and SG&A</h2>

<p>Factory overhead covers indirect costs: facility rent, utilities, maintenance, indirect labour, depreciation. It is typically expressed as a percentage of direct manufacturing cost.</p>

<p>Common overhead structures for Indian precision manufacturing:</p>
<ul>
  <li>Inbound logistics: 2% of raw material cost</li>
  <li>Inventory carrying cost: 5% of raw material cost</li>
  <li>Machine overhead: 8% of machine cost</li>
  <li>Labour overhead: 5% of direct labour</li>
  <li>Rejection and rework: 2% of total direct manufacturing cost</li>
  <li>R&amp;D: 2% of direct manufacturing cost (for technology-intensive suppliers)</li>
  <li>SG&amp;A: 1% of (R&amp;D + direct manufacturing cost)</li>
</ul>

<h2>Step 7: Add Supplier Margin</h2>

<p>Supplier margin varies by sector, relationship, and technology complexity:</p>

<ul>
  <li>Standard precision machining, India: 7–10%</li>
  <li>Die casting or moulding (capital-intensive): 10–15%</li>
  <li>Single-source specialist (proprietary process): 15–25%</li>
  <li>MSME sub-tier (high volume, commodity part): 5–7%</li>
</ul>

<p>Apply margin on the total cost (direct + overhead + SG&amp;A), not just on direct manufacturing cost — this is a common modelling error.</p>

<h2>Step 8: Build the Negotiation Brief</h2>

<p>Your should-cost model is now a negotiation tool. Structure the brief to show:</p>

<ol>
  <li><strong>Should-cost estimate</strong> — your bottom-up model result</li>
  <li><strong>Supplier quote</strong> — what they are charging</li>
  <li><strong>Gap analysis</strong> — where the difference is, broken down by cost category</li>
  <li><strong>Target price</strong> — your ask, supported by the model</li>
  <li><strong>Key assumptions</strong> — material price basis, volume, manufacturing location</li>
</ol>

<p>When you share this with a supplier, the conversation changes. Instead of "we need a 15% reduction," you are saying: "our model shows material at $4.20, process at $2.80, and overhead at $1.40 — your quote at $12.50 implies $4.10 of unaccounted cost. Can you walk us through where that sits?" That is a productive, fact-based discussion. It respects the supplier's expertise while challenging assumptions that can't be justified.</p>

<h2>Common Errors to Avoid</h2>

<ul>
  <li><strong>Using finish weight instead of input weight for material cost</strong> — this understates material cost by 20–50% for machined parts</li>
  <li><strong>Using outdated material prices</strong> — commodity prices move significantly; always use current market data</li>
  <li><strong>Ignoring scrap and rejection rate</strong> — a 3% rejection rate adds 3% to effective unit cost</li>
  <li><strong>Applying margin to direct cost only</strong> — margin should be on total cost including overhead</li>
  <li><strong>Assuming a single process route</strong> — suppliers may use different equipment than your model assumes; validate against actual process capability</li>
</ul>

<h2>When to Use Software vs. Manual Modelling</h2>

<p>Manual should-cost modelling in Excel is practical for one-off analyses or for engineers building their cost intuition. At scale — across hundreds of active parts, multiple programmes, and changing commodity prices — it becomes unmanageable.</p>

<p>Should-cost software automates the repeatable parts: CAD parameter extraction, live material pricing, machine hourly rate databases, and cycle time estimation. This lets your cost engineering team focus on the high-value work: process route judgment, supplier challenge, and negotiation strategy. The model runs in minutes; the strategic thinking still requires human expertise.</p>

<p>Emithran's Should-Cost Engine handles the end-to-end workflow — from drawing upload to negotiation brief — for machined, stamped, cast, and sheet metal parts across India, UK, Germany, USA, and China.</p>
    `,
  },
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.18 }) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, opts);

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, seen };
}

function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!seen) return;

    const start = performance.now();
    let raf = 0;
    const step = (time: number) => {
      const progress = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(to * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

const PILLARS = [
  {
    n: "01",
    kicker: "Should-Cost Precision",
    body: "Emithran's Should-Cost Engine generates accurate cost baselines from your part geometry, material specs, and process requirements - before the first supplier quote arrives. Your procurement team negotiates from a position of knowledge, not hope.",
  },
  {
    n: "02",
    kicker: "End-to-End Visibility",
    body: "From design review to final delivery, every stakeholder sees the same live picture. No more chasing updates across email threads and spreadsheets. One shared timeline - with alerts before problems become crises.",
  },
  {
    n: "03",
    kicker: "Intelligent Supplier Matching",
    body: "Supplier Radar evaluates your network by real capability, delivery performance, certification status, and cost alignment - not just familiarity. The right supplier for the right part, every time.",
  },
  {
    n: "04",
    kicker: "Connected Across the Supply Chain",
    body: "Chennai engineering, Stuttgart client, Coimbatore supplier - everyone works from the same intelligence layer. One cloud platform, one ground truth.",
  },
  {
    n: "05",
    kicker: "Full Lifecycle Intelligence",
    body: "Cost and manufacturability analysis at the design stage - not after tooling is committed. Early decisions become informed decisions, reducing redesigns and margin erosion before production begins.",
  },
  {
    n: "06",
    kicker: "AI That Compounds Over Time",
    body: "Every quote, every supplier interaction, every completed project makes Emithran smarter. The platform learns from your data and the wider ecosystem - continuously improving cost models and recommendations.",
  },
];

const STATS = [
  { value: 40, suffix: "%", label: "Reduction in RFQ Cycle Time" },
  {
    value: 99.4,
    suffix: "%",
    decimals: 1,
    label: "BOM Accuracy Across Processed Assemblies",
  },
  {
    value: 98.6,
    suffix: "%",
    decimals: 1,
    label: "On-Time, In-Full (OTIF) Delivery Performance",
  },
  {
    value: 1.2,
    prefix: "Rs ",
    suffix: "Cr+",
    decimals: 1,
    label: "Cost Savings Identified Across Active Projects",
  },
];

export default function AboutReferencePage() {
  return (
    <main className="bg-white text-black antialiased selection:bg-[#0fb5a8]/30">
      <style>{`
        @keyframes em-about-rise {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes em-about-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes em-about-drift {
          0%,100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(0,-6px,0); }
        }
        .em-about-reveal { opacity: 0; }
        .em-about-reveal.is-in { animation: em-about-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
        .em-about-grid {
          background-image:
            linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .em-about-noise::before {
          content:"";
          position:absolute; inset:0; pointer-events:none; opacity:.5; mix-blend-mode:multiply;
          background-image: radial-gradient(rgba(0,0,0,.07) 1px, transparent 1px);
          background-size: 3px 3px;
        }
        .em-about-marker {
          background: linear-gradient(180deg, transparent 62%, rgba(15,181,168,.35) 62%, rgba(15,181,168,.35) 92%, transparent 92%);
          padding: 0 .15em;
        }
        .em-about-tape {
          background: rgba(15,181,168,.22);
          border-left: 1px dashed rgba(15,181,168,.6);
          border-right: 1px dashed rgba(15,181,168,.6);
        }
        .em-about-pull { border-left: 6px solid #0fb5a8; }
        .em-about-underline {
          background-image: linear-gradient(transparent calc(100% - 2px), #0fb5a8 2px);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .em-about-dot { animation: em-about-blink 1.1s steps(2) infinite; }
        .em-about-drift { animation: em-about-drift 6s ease-in-out infinite; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white min-h-[88vh] flex items-center" style={{ paddingTop: '64px' }}>

        {/* Right-half SVG background */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
          <img
            src="/assets/cards/about/about.svg"
            alt=""
            aria-hidden="true"
            className="select-none w-full h-full object-cover object-left"
          />
        </div>

        {/* Mobile: SVG as bottom band */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 lg:hidden overflow-hidden">
          <img
            src="/assets/cards/about/about.svg"
            alt=""
            aria-hidden="true"
            className="select-none w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, white 0%, transparent 100%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-10 py-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — pure white, text on white */}
            <div>
              <Reveal delay={100}>
                <h1 className="text-5xl md:text-6xl xl:text-[72px] font-bold leading-[1.04] tracking-tight text-[#0f1b2d]">
                  Manufacturing<br />intelligence,<br />built on the<br />
                  <span style={{ color: '#0d9488' }}>shop floor.</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-6 max-w-[440px] text-[17px] leading-relaxed text-black/60">
                  Built by engineers who lived the problem — for India&rsquo;s precision manufacturers
                  and the global OEMs they serve.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-10">
                  <a
                    href="/request-demo"
                    className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                    style={{ background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)' }}
                  >
                    Request a Demo <span aria-hidden>&gt;</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right — card floats over the SVG background */}
            <Reveal delay={180}>
              <div
                className="relative rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.10), 0 0 0 1px rgba(20,184,166,0.08)',
                }}
              >
                <HandSchematic />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Story section ────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-black/10 bg-white">
        <div className="em-about-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-16">

          <Reveal delay={120}>
            <h2 className="font-serif text-[36px] leading-[1.05] tracking-tight md:text-[64px]">
              We didn&rsquo;t learn manufacturing
              <br />
              from a <span className="em-about-underline">deck</span>. We learned it
              <br />
              from the <span className="em-about-marker">shop floor</span>.
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <div className="relative mt-10 max-w-3xl">
              <div className="em-about-tape absolute -top-3 left-10 h-6 w-24 rotate-[-4deg]" />
              <div className="em-about-tape absolute -top-3 right-12 h-6 w-20 rotate-[5deg]" />
              <blockquote className="em-about-pull bg-white p-7 font-serif text-xl italic leading-snug text-black md:text-2xl">
                &ldquo;Emithran is rewriting the rules of manufacturing intelligence for the next
                generation of global OEMs.&rdquo;
              </blockquote>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <p className="text-[15.5px] leading-[1.85] text-black/85">
                Emithran wasn&rsquo;t born in a boardroom. It was built on the shop floor. Our
                founders spent years working as costing and manufacturing engineers across
                industries where precision, quality, and delivery are non-negotiable - aerospace
                components, CNC machining, injection molding, sheet metal. We saw talented teams
                spending countless hours generating quotes, navigating supplier uncertainties, and
                managing disconnected communication between customers, engineers, and production
                teams. Critical cost decisions were made too late. Supplier selection relied on
                incomplete information. Visibility across the manufacturing lifecycle stayed
                fragmented.
              </p>
              <p className="mt-5 text-[15.5px] leading-[1.85] text-black/85">
                The tools existed to solve this. What didn&rsquo;t exist was a platform built by
                people who actually understood Indian high-precision manufacturing - the supplier
                ecosystems, the cost structures, the VAVE culture, the gap between what OEM clients
                need and what manufacturers could communicate.
              </p>
              <p className="mt-5 font-serif text-2xl italic text-[#0d8076]">So we built it.</p>
              <p className="mt-6 text-[15.5px] leading-[1.85] text-black/85">
                Emithran is an AI-driven manufacturing intelligence platform that bridges
                end-to-end operations and the clients they serve. We automate the coordination
                overhead, surface cost decisions at the design stage, match the right suppliers to
                the right parts, and give every stakeholder - engineer, procurement lead, client -
                the same ground truth in real time.
              </p>
              <p className="mt-5 text-[15.5px] leading-[1.85] text-black/85">
                We&rsquo;re building for India first because we are India&rsquo;s manufacturing
                engineers.{" "}
                <span className="em-about-marker">But we&rsquo;re building for the world.</span>
              </p>
            </Reveal>

            <Reveal delay={150} className="md:col-span-5">
              <div className="relative pt-12">

                {/* LinkedIn badge — Person 1: Singaravelan */}
                <a
                  href="https://www.linkedin.com/in/singaravelan-srinivasan-emuski/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute z-20 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-md hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ left: '3%', top: -10, background: '#0077b5' }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Singaravelan
                </a>

                {/* LinkedIn badge — Person 2: Abushan */}
                <a
                  href="https://www.linkedin.com/in/abushan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute z-20 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-md hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ left: '24%', top: 24, background: '#0077b5' }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Abushan
                </a>

                {/* Straight vertical dotted arrows */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    <marker id="li-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,1 L6,4 L0,7" fill="none" stroke="#0077b5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </marker>
                  </defs>
                  <line x1="13%" y1="16" x2="13%" y2="38%"
                    stroke="#0077b5" strokeWidth="1.3" strokeDasharray="4 3"
                    markerEnd="url(#li-arrow)" />
                  <line x1="29%" y1="46" x2="29%" y2="28%"
                    stroke="#0077b5" strokeWidth="1.3" strokeDasharray="4 3"
                    markerEnd="url(#li-arrow)" />
                </svg>

                <img
                  src="/assets/cards/about/about-us.png"
                  alt="About Emithran"
                  className="w-full h-auto rounded-xl"
                  style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
                />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      <section className="relative bg-black text-white">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-[#0fb5a8]">
              &sect; 02 &middot; what you get
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] md:text-6xl">
              Our platform delivers intelligence that
              <br />
              manufacturers can <em className="text-[#5fe3d4]">actually use</em>.
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 max-w-2xl text-white/70">
              See what to expect when you partner with Emithran:
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <Reveal key={pillar.n} delay={index * 80}>
                <article
                  className="group relative h-full border border-white/20 bg-white p-7 text-black"
                  style={{
                    boxShadow: "6px 6px 0 0 rgba(15,181,168,1)",
                    transition: "transform .25s ease, box-shadow .25s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translate(-3px,-3px)";
                    event.currentTarget.style.boxShadow = "10px 10px 0 0 #fff";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translate(0,0)";
                    event.currentTarget.style.boxShadow = "6px 6px 0 0 rgba(15,181,168,1)";
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-[#0d8076]">
                      {pillar.n}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#0fb5a8]" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl leading-tight">{pillar.kicker}</h3>
                  <div className="mt-3 h-px w-10 bg-black/80" />
                  <p className="mt-4 text-[14.5px] leading-[1.7] text-black/75">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white">
        <div className="em-about-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="font-mono text-xs uppercase tracking-[0.28em] text-black/60">
                &sect; 03 &middot; the numbers
              </div>
              <h2 className="mt-5 font-serif text-4xl leading-[1.05] md:text-6xl">
                Measurable ROI is the
                <br />
                <span className="em-about-underline">only metric</span> that matters.
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-5">
              <p className="text-[15.5px] leading-[1.85] text-black/75">
                Aerospace and defense component manufacturers, automotive Tier-1 suppliers,
                deep-tech startups - our customers see returns within the first 90 days. Emithran
                isn&rsquo;t a long-term bet. It&rsquo;s an immediate operational upgrade.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-0 border-y-2 border-black md:grid-cols-4">
            {STATS.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 120}
                className={
                  "relative px-6 py-12 " +
                  (index < STATS.length - 1 ? "md:border-r border-black/80" : "") +
                  (index === 0 ? "" : " border-t md:border-t-0 border-black/80")
                }
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0d8076]">
                  Stat / {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-5 font-serif text-5xl leading-none tracking-tight md:text-6xl">
                  <Counter
                    to={stat.value}
                    decimals={stat.decimals ?? 0}
                    prefix={stat.prefix ?? ""}
                    suffix={stat.suffix ?? ""}
                  />
                </div>
                <div className="mt-5 max-w-[18ch] text-sm leading-snug text-black/70">
                  {stat.label}
                </div>
                <div className="mt-6 h-1 w-10 bg-[#0fb5a8]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-black bg-[#f6f5f1]">
        <div className="em-about-noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <div className="font-mono text-xs uppercase tracking-[0.28em] text-black/60">
                &sect; 04 &middot; the field
              </div>
              <h2 className="mt-5 font-serif text-4xl leading-[1.05] md:text-5xl">
                Aerospace. Defense. Industrial equipment.
                <br />
                <span className="em-about-marker">They&rsquo;re already moving.</span>
              </h2>
              <p className="mt-6 text-[15.5px] leading-[1.85] text-black/80">
                Supply chains are under pressure. Clients are demanding faster timelines, tighter
                tolerances, complete traceability. The manufacturers who are winning aren&rsquo;t
                working harder - they&rsquo;re working with better intelligence.
              </p>
              <p className="mt-5 text-[15.5px] leading-[1.85] text-black/80">
                Emithran gives your team the cost visibility, supplier insight, and project control
                to compete at the highest level - whether you&rsquo;re quoting a defense
                sub-assembly, managing a 500-part BOM, or onboarding a new global OEM client.
              </p>
              <Link
                href="/pricing"
                className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#0fb5a8] pb-1 font-mono text-xs uppercase tracking-[0.25em] text-black hover:text-[#0d8076]"
              >
                View case studies <span aria-hidden>&rarr;</span>
              </Link>
            </Reveal>

            <Reveal delay={150} className="md:col-span-6">
              <div className="relative mx-auto max-w-md rotate-[-1.2deg]">
                <div
                  className="relative bg-white p-8"
                  style={{
                    border: "1px solid #111",
                    boxShadow: "12px 12px 0 0 #0fb5a8, 12px 12px 0 1px #000",
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0 31px, rgba(15,181,168,.18) 31px 32px)",
                  }}
                >
                  <div className="absolute inset-y-0 left-12 w-px bg-[#0fb5a8]/70" />
                  <div className="relative pl-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
                      Customer note &middot; pinned
                    </div>
                    <p className="mt-6 font-serif text-2xl leading-[1.35] text-black">
                      &ldquo;We stopped chasing quotes. Emithran told us what the part
                      <em className="text-[#0d8076]"> should </em>
                      cost, and we negotiated from that position - and won.&rdquo;
                    </p>
                    <div className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-black/70">
                      - Procurement Lead
                      <br />
                      <span className="text-black/50">UAV Component Manufacturer</span>
                    </div>
                  </div>
                  <div className="em-about-tape absolute -top-4 left-1/2 h-7 w-28 -translate-x-1/2 rotate-[3deg]" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,181,168,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(15,181,168,.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="em-about-drift absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0fb5a8]/20 blur-3xl" />
        <div className="em-about-drift absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#0fb5a8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-40">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-[#5fe3d4]">
              &sect; 05 &middot; let&rsquo;s build
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.02] md:text-7xl">
              See Emithran in action -
              <br />
              with your own parts,
              <br />
              your own suppliers,
              <br />
              <span className="text-[#5fe3d4]">your own data.</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
              Don&rsquo;t evaluate Emithran on a generic demo. We&rsquo;ll show you exactly where
              the platform finds value in your specific operation - RFQ cycle, cost benchmarking,
              supplier network, or all three.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="/request-demo"
                className="group relative inline-flex items-center gap-3 bg-[#0fb5a8] px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-black transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: "6px 6px 0 0 #fff" }}
              >
                Request a demo
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <a
                href="/contact?source=about&cta=talk-to-an-engineer"
                className="inline-flex items-center gap-3 border border-white/40 px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-white hover:border-[#5fe3d4] hover:text-[#5fe3d4]"
              >
                Talk to an engineer
              </a>
            </div>
          </Reveal>

        </div>
      </section>
    </main>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`em-about-reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function HandSchematic() {
  const { ref, seen } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="relative">
      <div className="absolute -top-3 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
        Sketch &middot; 0042 - &ldquo;the loop&rdquo;
      </div>
      <svg
        viewBox="0 0 480 320"
        className="h-auto w-full"
        style={{ filter: "drop-shadow(4px 4px 0 rgba(0,0,0,0.08))", overflow: 'visible' }}
      >
        <defs>
          <pattern id="about-dotgrid" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.18)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="480" height="320" fill="url(#about-dotgrid)" />

        {[
          { x: 70, y: 90, label: "DESIGN" },
          { x: 340, y: 90, label: "QUOTE" },
          { x: 205, y: 240, label: "SUPPLIER" },
        ].map((node) => (
          <g key={node.label}>
            <rect
              x={node.x - 56}
              y={node.y - 22}
              width="112"
              height="44"
              fill="#fff"
              stroke="#000"
              strokeWidth="1.6"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="12"
              letterSpacing="2"
              fill="#000"
            >
              {node.label}
            </text>
          </g>
        ))}

        <g>
          <circle cx="205" cy="165" r="34" fill="#0fb5a8" stroke="#000" strokeWidth="1.6" />
          <text
            x="205"
            y="170"
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="11"
            letterSpacing="2"
            fill="#000"
          >
            EMITHRAN
          </text>
        </g>

        {["M 126 90 Q 165 130 175 150", "M 284 90 Q 245 130 235 150", "M 205 200 L 205 218"].map(
          (d, index) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="#000"
              strokeWidth="1.6"
              strokeDasharray="600"
              style={{
                strokeDashoffset: seen ? 0 : 600,
                transition: `stroke-dashoffset 1.4s ${index * 0.2 + 0.2}s ease`,
              }}
            />
          ),
        )}

        <g
          style={{
            opacity: seen ? 1 : 0,
            transition: "opacity .8s 1.2s ease",
          }}
        >
          <path
            d="M 360 220 C 320 210 290 200 260 195"
            fill="none"
            stroke="#0d8076"
            strokeWidth="1.4"
          />
          <polygon points="260,195 268,190 268,200" fill="#0d8076" />
          <text
            x="368"
            y="225"
            fontFamily="ui-serif, Georgia, serif"
            fontStyle="italic"
            fontSize="13"
            fill="#0d8076"
          >
            one ground truth
          </text>
        </g>
      </svg>
    </div>
  );
}

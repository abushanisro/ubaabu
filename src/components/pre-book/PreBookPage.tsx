"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PT_Serif } from "next/font/google";
import { ChevronDown, Plus, Check } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { COUNTRIES } from "@/lib/countries";

const serif = PT_Serif({ weight: ["700"], subsets: ["latin"], display: "swap" });

const JOB_TITLES = [
  "CEO / Founder",
  "CTO / Engineering Head",
  "Procurement Manager",
  "Supply Chain Lead",
  "Operations Director",
  "Product Manager",
  "Finance / Costing",
  "Other",
];

type FeaturedItem = { id: string; title: string; frequency: string; description: string };

const FEATURED: FeaturedItem[] = [
  { id: "early-access", title: "Early Access", frequency: "At launch", description: "Be among the first to use the Vendor Management app" },
  { id: "beta-program", title: "Beta Program", frequency: "Limited seats", description: "Help shape the roadmap before general release" },
  { id: "launch-updates", title: "Launch Updates", frequency: "As it ships", description: "Development milestones on the way to launch" },
];

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none py-1">
      <span
        onClick={(e) => { e.preventDefault(); onChange(); }}
        className={`w-5 h-5 shrink-0 border-2 flex items-center justify-center transition-colors ${checked ? "bg-[#0f1b2d] border-[#0f1b2d]" : "border-black/30 bg-white"}`}
      >
        {checked && <Check size={13} className="text-white" strokeWidth={3} />}
      </span>
      <span className="text-[14px] text-[#0f1b2d]">{label}</span>
    </label>
  );
}

function FeaturedCard({
  item, checked, onToggle,
}: { item: FeaturedItem; checked: boolean; onToggle: () => void }) {
  return (
    <section className="bg-white border border-black/[0.08] p-5 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-bold text-[#0f1b2d]">{item.title}</p>
          <p className="text-[12px] italic text-black/40">({item.frequency})</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={checked}
          aria-label={`Interested in ${item.title}`}
          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-[#0d9488] border-[#0d9488] text-white" : "border-black/25 text-black/50 hover:border-[#0d9488]"}`}
        >
          {checked ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
        </button>
      </div>
      <p className="text-[14px] text-[#0f1b2d]/70">{item.description}</p>
    </section>
  );
}

const inputClass =
  "h-11 border border-black/25 px-3.5 text-[14px] text-[#0f1b2d] placeholder:text-black/25 " +
  "focus:outline-none focus:border-[#0f1b2d] transition-colors w-full bg-white";

export default function PreBookPage() {
  const router = useRouter();
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [country, setCountry] = useState("India");
  const [cfToken, setCfToken] = useState("");

  const [interests, setInterests] = useState<Set<string>>(new Set(["early-access"]));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function toggleInterest(id: string) {
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const allInterestsOn = interests.size === FEATURED.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/pre-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, firstName, lastName, jobTitle, organization, country,
          interests: [...interests],
          cfToken,
          source: "vendor-management-app",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to pre-book");
      }
      router.push("/pre-book/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      turnstileRef.current?.reset();
      setCfToken("");
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-white">
      {/* ── Header ── */}
      <div className="border-b border-black/[0.06] px-4 py-14 md:py-20">
        <h1
          className={`${serif.className} whitespace-normal sm:whitespace-nowrap text-center leading-tight text-[#0f1b2d] my-4 text-[28px] sm:[font-size:clamp(1rem,3.7vw,2.75rem)]`}
        >
          Pre-book the Vendor Management app
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ── Step 1: Interests ── */}
        <div className="bg-[#f2f2f2] px-6 py-14 md:py-16">
          <div className="mx-auto max-w-[1040px]">
            <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className={`${serif.className} text-[26px] md:text-[30px] text-[#0f1b2d] mb-2`}>
                  Step 1: Reserve your spot
                </h2>
                <p className="text-[14px] text-black/45 mb-4 max-w-xl">
                  Supplier discovery, evaluation, RFQs, and nomination - the same supplier intelligence your team
                  uses on desktop, built for the field.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-2">
                <div className="relative h-[110px] w-[110px]">
                  <Image
                    src="/assets/home/Emithran-canva.png"
                    alt="Scan to pre-book the Emithran Vendor Management app"
                    fill
                    className="object-contain"
                    sizes="110px"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0f1b2d]">
                  Scan to Pre-book
                </span>
              </div>
            </div>
            <Checkbox
              checked={allInterestsOn}
              onChange={() => setInterests(allInterestsOn ? new Set() : new Set(FEATURED.map((f) => f.id)))}
              label="I'm interested in all of the above"
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {FEATURED.map((item) => (
                <FeaturedCard
                  key={item.id}
                  item={item}
                  checked={interests.has(item.id)}
                  onToggle={() => toggleInterest(item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Step 2: Your information ── */}
        <div className="px-6 py-14 md:py-16">
          <div className="mx-auto max-w-[1040px]">
            <h2 className={`${serif.className} text-[26px] md:text-[30px] text-[#0f1b2d] mb-2`}>
              Step 2: Your information
            </h2>
            <p className="text-[14px] text-black/45 mb-8">
              We&apos;ll email you as soon as the app is ready for early access. (* Required fields)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] text-[#0f1b2d]">Email<span className="text-[#0d9488]">*</span></label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] text-[#0f1b2d]">Organization<span className="text-[#0d9488]">*</span></label>
                <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputClass} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] text-[#0f1b2d]">First name<span className="text-[#0d9488]">*</span></label>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] text-[#0f1b2d]">Last name<span className="text-[#0d9488]">*</span></label>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] text-[#0f1b2d]">Job title<span className="text-[#0d9488]">*</span></label>
                <div className="relative">
                  <select required value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className={`${inputClass} appearance-none pr-9`}>
                    <option value="" disabled>Select your job title</option>
                    {JOB_TITLES.map((j) => <option key={j} value={j}>{j}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] text-[#0f1b2d]">Country<span className="text-[#0d9488]">*</span></label>
                <div className="relative">
                  <select required value={country} onChange={(e) => setCountry(e.target.value)} className={`${inputClass} appearance-none pr-9`}>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[14px] text-[#0f1b2d] block mb-2">Security validation<span className="text-[#0d9488]">*</span></label>
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={setCfToken}
                onExpire={() => setCfToken("")}
                onError={() => setCfToken("")}
                options={{ theme: "light", size: "normal" }}
              />
            </div>

            <p className="text-[12.5px] text-black/45 leading-relaxed mb-6 max-w-[700px]">
              Emithran is committed to protecting your information. Your information will be used in
              accordance with our{" "}
              <a href="/privacy" className="text-[#0d9488] hover:underline">privacy policy</a>{" "}
              and never sold or shared with third parties.
            </p>

            {error && <p className="mb-4 text-[13px] text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting || !cfToken}
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-40 w-full sm:w-auto"
              style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}
            >
              {submitting ? "Submitting…" : "Pre-Book Access"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ChevronDown, Mail, Building2, CalendarCheck } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahrain","Bangladesh","Belarus","Belgium","Belize","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","Brunei",
  "Bulgaria","Burkina Faso","Cambodia","Cameroon","Canada","Chile","China","Colombia","Costa Rica","Croatia",
  "Cyprus","Czech Republic","Denmark","Ecuador","Egypt","El Salvador","Estonia","Ethiopia","Finland","France",
  "Georgia","Germany","Ghana","Greece","Guatemala","Honduras","Hungary","Iceland","India","Indonesia","Iraq",
  "Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Libya","Liechtenstein","Lithuania","Luxembourg","Malaysia","Maldives","Malta","Mexico",
  "Moldova","Monaco","Mongolia","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand",
  "Nicaragua","Nigeria","North Macedonia","Norway","Oman","Pakistan","Panama","Paraguay","Peru","Philippines",
  "Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Singapore",
  "Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland",
  "Taiwan","Tanzania","Thailand","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const INDUSTRIES = [
  "Space & Launch Vehicles",
  "Defence & Armament",
  "Aerospace & Aviation",
  "Automotive",
  "Precision Engineering",
  "Electronics & Semiconductors",
  "Medical Devices",
  "Energy & Power Systems",
  "Other",
];

const ROLES = [
  "CEO / Founder",
  "CTO / Engineering Head",
  "Procurement Manager",
  "Supply Chain Lead",
  "Operations Director",
  "Product Manager",
  "Finance / Costing",
  "Other",
];

type FormData = {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  role: string;
  industry: string;
  message: string;
};

const steps = [
  { id: 1, label: "Your email" },
  { id: 2, label: "Your info" },
  { id: 3, label: "Let's talk" },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

function ProgressTracker({ current }: { current: number }) {
  return (
    <div className="flex items-start gap-0 mb-8">
      {steps.map((step) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  done
                    ? "bg-[#0d9e8a]"
                    : active
                    ? "border-2 border-[#0d9e8a] bg-white"
                    : "border-2 border-black/15 bg-white"
                }`}
              >
                {done ? (
                  <Check size={11} className="text-white" strokeWidth={3} />
                ) : (
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      active ? "bg-[#0d9e8a]" : "bg-black/15"
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  active ? "text-[#0f1b2d]" : done ? "text-[#0d9e8a]" : "text-black/30"
                }`}
              >
                {step.label}
              </span>
            </div>
            <div className="h-[2px] rounded-full overflow-hidden bg-black/8 ml-2.5">
              <motion.div
                className="h-full bg-[#0d9e8a] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: done ? "100%" : active ? "50%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InputField({
  label, type = "text", name, value, onChange, placeholder, required,
}: {
  label: string; type?: string; name: keyof FormData; value: string;
  onChange: (name: keyof FormData, value: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider">
        {label}{required && <span className="text-[#0d9e8a] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="h-10 rounded-lg bg-white border border-black/12 px-3 text-[14px] text-[#0f1b2d] placeholder:text-black/25
          focus:outline-none focus:border-[#0d9e8a]/70 focus:ring-2 focus:ring-[#0d9e8a]/15 transition-all shadow-sm"
      />
    </div>
  );
}

function SelectField({
  label, name, value, onChange, options, required,
}: {
  label: string; name: keyof FormData; value: string;
  onChange: (name: keyof FormData, value: string) => void; options: string[]; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider">
        {label}{required && <span className="text-[#0d9e8a] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-full h-10 rounded-lg bg-white border border-black/12 px-3 pr-8 text-[14px] appearance-none
            text-[#0f1b2d] focus:outline-none focus:border-[#0d9e8a]/70 focus:ring-2 focus:ring-[#0d9e8a]/15 transition-all shadow-sm"
        >
          <option value="" disabled>Select…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/35 pointer-events-none" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [cfToken, setCfToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [data, setData] = useState<FormData>({
    email: "", country: "India", firstName: "", lastName: "",
    phone: "", company: "", role: "", industry: "", message: "",
  });

  const set = (name: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [name]: value }));

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, cfToken }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to send");
      go(4);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const canContinueStep1 = data.email.includes("@") && data.email.includes(".") && data.country;
  const canContinueStep2 = data.firstName && data.lastName && data.company && data.role && data.industry;

  return (
    <div
      className="min-h-screen bg-white flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/blog/blog.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      {/* Column guides — hidden on mobile */}
      <div className="hidden sm:flex pointer-events-none absolute inset-0 justify-between px-16 z-0" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-px bg-black/[0.06] h-full" />
        ))}
      </div>

      {/* Minimal header */}
      <ContactHeader step={step} />

      {/* Page content — grows to push footer down */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-16 relative z-10">

      {/* Card */}
      <div className="w-full max-w-[480px] z-10">
        <div className="rounded-2xl border border-black/[0.07] bg-white shadow-xl shadow-black/[0.07] p-5 sm:p-8">

          <ProgressTracker current={step} />

          <div className="overflow-hidden relative">
            <AnimatePresence mode="wait" custom={dir}>
              {step === 1 && (
                <motion.div
                  key="step1" custom={dir} variants={variants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#0f1b2d] mb-1.5 font-[Sora]">
                      Let's get you to the right place
                    </h1>
                    <p className="text-[14px] text-[#0f1b2d]/50">We just need a few quick details.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <InputField label="Work email" type="email" name="email" value={data.email} onChange={set} placeholder="you@company.com" required />
                    <SelectField label="Country / Region" name="country" value={data.country} onChange={set} options={COUNTRIES} required />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <ContinueButton onClick={() => go(2)} disabled={!canContinueStep1} />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2" custom={dir} variants={variants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#0f1b2d] mb-1.5 font-[Sora]">
                      Tell us about yourself
                    </h1>
                    <p className="text-[14px] text-[#0f1b2d]/50">Help us route you to the right team.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InputField label="First name" name="firstName" value={data.firstName} onChange={set} placeholder="Arjun" required />
                      <InputField label="Last name" name="lastName" value={data.lastName} onChange={set} placeholder="Sharma" required />
                    </div>
                    <InputField label="Phone" type="tel" name="phone" value={data.phone} onChange={set} placeholder="+91 98765 43210" />
                    <InputField label="Company" name="company" value={data.company} onChange={set} placeholder="Acme Aerospace Ltd." required />
                    <SelectField label="Your role" name="role" value={data.role} onChange={set} options={ROLES} required />
                    <SelectField label="Industry" name="industry" value={data.industry} onChange={set} options={INDUSTRIES} required />
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <button onClick={() => go(1)} className="text-[13px] text-black/35 hover:text-black/60 transition-colors">
                      ← Back
                    </button>
                    <ContinueButton onClick={() => go(3)} disabled={!canContinueStep2} />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3" custom={dir} variants={variants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#0f1b2d] mb-1.5 font-[Sora]">
                      Anything else?
                    </h1>
                    <p className="text-[14px] text-[#0f1b2d]/50">Optional: share what you're working on.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider">Message</label>
                      <textarea
                        value={data.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Tell us about your manufacturing use case, team size, or anything specific you'd like to discuss…"
                        rows={4}
                        className="rounded-lg bg-white border border-black/12 px-3 py-2.5 text-[14px] text-[#0f1b2d] placeholder:text-black/25
                          focus:outline-none focus:border-[#0d9e8a]/70 focus:ring-2 focus:ring-[#0d9e8a]/15 transition-all resize-none shadow-sm"
                      />
                    </div>
                    <div className="rounded-xl bg-black/[0.03] border border-black/[0.07] p-4 text-[13px] text-black/45 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Mail size={13} className="text-[#0d9e8a] flex-shrink-0" />
                        <span>{data.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 size={13} className="text-[#0d9e8a] flex-shrink-0" />
                        <span>{data.company} · {data.role}</span>
                      </div>
                    </div>
                  </div>
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={setCfToken}
                    onExpire={() => setCfToken("")}
                    onError={() => setCfToken("")}
                    options={{ theme: "light", size: "normal" }}
                    className="mt-4"
                  />

                  {submitError && (
                    <p className="mt-3 text-[12px] text-red-500 text-center">{submitError}</p>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <button onClick={() => go(2)} className="text-[13px] text-black/35 hover:text-black/60 transition-colors">
                      ← Back
                    </button>
                    <SubmitButton onClick={handleSubmit} loading={submitting} disabled={!cfToken} />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4" custom={dir} variants={variants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="py-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-[#0d9e8a]/10 border border-[#0d9e8a]/30 flex items-center justify-center mx-auto mb-5"
                  >
                    <CalendarCheck size={28} className="text-[#0d9e8a]" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-[#0f1b2d] mb-2 font-[Sora]">You're all set</h2>
                  <p className="text-[14px] text-[#0f1b2d]/50 leading-relaxed max-w-[320px] mx-auto">
                    Thanks, {data.firstName}! Our team will reach out to{" "}
                    <span className="text-[#0f1b2d]/70">{data.email}</span> within one business day.
                  </p>
                  <div className="mt-6 pt-5 border-t border-black/[0.07] text-[12px] text-black/30">
                    Emithran Manufacturing Intelligence · Bangalore, India
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {step < 4 && (
          <p className="text-center text-[11px] text-black/30 mt-5">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-black/55 transition-colors">Terms</a>
            {" "}and{" "}
            <a href="/privacy" className="underline hover:text-black/55 transition-colors">Privacy Policy</a>.
          </p>
        )}
      </div>

      </main>

      <ContactFooter />
    </div>
  );
}

function ContinueButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200
        ${disabled
          ? "bg-black/[0.06] text-black/25 cursor-not-allowed"
          : "bg-[#0d9e8a] text-white hover:bg-[#0bbfa9] active:scale-[0.98] shadow-lg shadow-[#0d9e8a]/20"
        }`}
    >
      Continue
      <ArrowRight size={14} />
    </button>
  );
}

function SubmitButton({ onClick, loading, disabled }: { onClick: () => void | Promise<void>; loading: boolean; disabled: boolean }) {
  const inactive = loading || disabled;
  return (
    <button
      onClick={onClick}
      disabled={inactive}
      className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200
        shadow-lg shadow-[#0d9e8a]/20
        ${inactive ? "bg-[#0d9e8a]/50 cursor-not-allowed text-white/60" : "bg-[#0d9e8a] text-white hover:bg-[#0bbfa9] active:scale-[0.98]"}`}
    >
      {loading ? "Sending…" : "Submit request"}
      {!loading && <ArrowRight size={14} />}
    </button>
  );
}

function ContactHeader({ step }: { step: number }) {
  const progress = Math.min(((step - 1) / 3) * 100, 100);
  return (
    <header className="relative z-20 w-full bg-white/70 backdrop-blur-sm border-b border-black/[0.07]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/assets/infographics/logo/logo-white.png" alt="Emithran" className="h-8 w-auto" />
          <span className="font-display text-lg font-semibold tracking-tight text-[#080808]">EMITHRAN</span>
        </a>

        {/* Sign up */}
        <a
          href="/sign-up"
          className="group inline-flex items-center gap-0 text-[13px] text-[#0d9e8a] hover:opacity-75 transition-opacity"
        >
          Sign up&nbsp;
          <svg className="overflow-visible" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path
              className="origin-left transition-transform duration-200 ease-out translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              d="M0 5h7"
            />
            <path
              className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              d="M1 1l4 4-4 4"
            />
          </svg>
        </a>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/[0.06]">
        <motion.div
          className="h-full bg-[#0d9e8a]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
    </header>
  );
}

function ContactFooter() {
  return (
    <footer className="relative z-10 w-full border-t border-black/[0.08] bg-white/80 backdrop-blur-sm">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-5">
        <nav className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
          {/* Left: logo + visit link */}
          <div className="flex flex-col gap-2">
            <a href="/" className="flex items-center gap-2 w-fit">
              <img src="/assets/infographics/logo/logo-white.png" alt="Emithran" className="h-5 w-auto" />
              <span className="text-[#0f1b2d] text-sm font-bold tracking-widest">EMITHRAN</span>
            </a>
            <a
              href="/"
              className="group flex items-center gap-1 text-[13px] text-black/40 hover:text-[#0d9e8a] transition-colors w-fit"
            >
              Visit our full website
              <svg className="ml-0.5 group-hover:translate-x-0.5 transition-transform" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M0 5h7M6 1l4 4-4 4" />
              </svg>
            </a>
          </div>

          {/* Right: privacy + copyright */}
          <div className="flex items-center gap-3 text-[11px]">
            <a href="/privacy" className="text-black/40 hover:text-black/65 transition-colors whitespace-nowrap">
              Privacy &amp; terms
            </a>
            <span className="text-black/20">·</span>
            <span className="text-black/30 whitespace-nowrap">
              © {new Date().getFullYear()} Emithran Technologies Pvt. Ltd.
            </span>
          </div>
        </nav>
      </div>
    </footer>
  );
}

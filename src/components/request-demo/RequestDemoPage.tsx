"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

interface SelectOption { label: string; value: string; disabled?: boolean }

function CustomSelect({
  id, value, onChange, options, placeholder,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={
          "w-full h-9 rounded-lg bg-white border px-3 pr-8 text-[13.5px] text-left transition-all shadow-sm flex items-center " +
          (open
            ? "border-[#0d9e8a]/60 ring-2 ring-[#0d9e8a]/12"
            : "border-black/10 hover:border-black/20") +
          (value ? " text-[#0f1b2d]" : " text-black/25")
        }
      >
        <span className="truncate">{selected?.label ?? placeholder ?? "Select…"}</span>
        <svg
          className={"pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 transition-transform " + (open ? "rotate-180" : "")}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#0f1b2d" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-xl border border-black/10 bg-white shadow-xl shadow-black/10 overflow-hidden">
          <ul className="max-h-52 overflow-y-auto py-1" role="listbox">
            {options.map((opt, i) =>
              opt.disabled ? (
                <li key={i} className="px-3 py-1 text-[11px] text-black/25 select-none border-t border-black/[0.06] mt-1 pt-1.5" role="separator" />
              ) : (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={value === opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={
                    "px-3 py-2 text-[13px] cursor-pointer transition-colors " +
                    (value === opt.value
                      ? "bg-[#0d9e8a]/8 text-[#0d9e8a] font-medium"
                      : "text-[#0f1b2d] hover:bg-black/[0.04]")
                  }
                >
                  {opt.label}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

const TEAM_SIZES = ["Just me", "2–10", "11–50", "51–200", "201–500", "500+"];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

const COUNTRIES = [
  "India",
  "------",
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belgium", "Brazil",
  "Bulgaria", "Cambodia", "Canada", "Chile", "China", "Colombia", "Croatia",
  "Cyprus", "Czech Republic", "Denmark", "Egypt", "Estonia", "Ethiopia",
  "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Hungary",
  "Iceland", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon",
  "Lithuania", "Luxembourg", "Malaysia", "Mexico", "Morocco", "Myanmar",
  "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman",
  "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia",
  "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden",
  "Switzerland", "Taiwan", "Thailand", "Tunisia", "Turkey", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uzbekistan",
  "Venezuela", "Vietnam", "Yemen",
];

const base =
  "w-full rounded-lg bg-white border border-black/10 px-3 text-[13.5px] text-[#0f1b2d] " +
  "placeholder:text-black/25 focus:outline-none focus:border-[#0d9e8a]/60 " +
  "focus:ring-2 focus:ring-[#0d9e8a]/12 transition-all";
const inputCls = base + " h-9 shadow-sm";
const labelCls = "text-[11px] font-semibold text-[#0f1b2d]/50 uppercase tracking-wider mb-1 block";


function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  if (d.getDay() === 6) d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

export default function RequestDemoPage() {
  const minDate = useMemo(() => getMinDate(), []);

  const countryOptions: SelectOption[] = useMemo(() =>
    COUNTRIES.map((c) =>
      c.startsWith("-")
        ? { label: c, value: "__sep__", disabled: true }
        : { label: c, value: c }
    ), []);

  const teamOptions: SelectOption[] = TEAM_SIZES.map((s) => ({ label: s, value: s }));
  const timeOptions: SelectOption[] = TIME_SLOTS.map((t) => ({ label: t, value: t }));
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "",
    country: "", teamSize: "", date: "", time: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [cfToken, setCfToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const canSubmit =
    form.name.trim().length > 1 && form.email.includes("@") &&
    form.company.trim().length > 1 && form.role.trim().length > 1 &&
    form.date.length > 0 && form.time.length > 0 &&
    !!cfToken && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cfToken }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#f4f6f8]">
      <div aria-hidden className="absolute inset-0 z-0">
        <img src="/assets/auth/requestdemo.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full bg-white/90 backdrop-blur border-b border-black/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-13 flex items-center justify-between" style={{ height: 52 }}>
          <a href="/" className="flex items-center gap-2">
            <img src="/assets/infographics/logo/logo-white.png" alt="Emithran" className="h-7 w-auto" />
            <span className="font-display text-[15px] font-semibold tracking-tight text-[#080808]">EMITHRAN</span>
          </a>
          <a href="/" className="group inline-flex items-center gap-0 text-[13px] text-[#0d9e8a] hover:opacity-75 transition-opacity">
            Home&nbsp;
            <svg className="overflow-visible" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path className="origin-left transition-transform duration-200 ease-out -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" d="M0 5h7" />
              <path className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]" d="M1 1l4 4-4 4" />
            </svg>
          </a>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[460px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="rounded-2xl border border-black/[0.07] bg-white shadow-2xl shadow-black/[0.09]">

              {/* Header band */}
              <div className="px-6 pt-5 pb-4 rounded-t-2xl" style={{ background: "linear-gradient(135deg, #0f1b2d 0%, #1a3352 100%)" }}>
                <div className="inline-flex items-center gap-1.5 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
                  <span className="text-[10.5px] font-semibold text-white/60 uppercase tracking-wider">30-min live walkthrough</span>
                </div>
                <h1 className="font-display text-[20px] font-bold text-white leading-tight tracking-tight">
                  See Emithran in action
                </h1>
                <p className="text-[12.5px] text-white/50 mt-1 leading-relaxed">
                  Fill in your details and pick a slot - we'll tailor the demo to your workflow.
                </p>
              </div>

              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="py-3 text-center"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#f0fdf9] border border-[#0d9e8a]/25 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle size={20} className="text-[#0d9e8a]" strokeWidth={2.2} />
                      </div>
                      <h2 className="font-display text-[17px] font-bold text-[#0f1b2d] mb-1.5 tracking-tight">Demo scheduled!</h2>
                      <p className="text-[12.5px] text-[#0f1b2d]/50 leading-relaxed mb-4">
                        Confirmation sent to <span className="font-medium text-[#0f1b2d]/70">{form.email}</span>.
                      </p>
                      <div className="rounded-xl bg-[#f0fdf9] border border-[#0d9e8a]/15 px-4 py-3 mb-4 space-y-2 text-left">
                        <div className="flex items-center gap-2.5">
                          <Calendar size={13} className="text-[#0d9e8a] flex-shrink-0" />
                          <span className="text-[13px] font-medium text-[#0f1b2d]">{formatDate(form.date)}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Clock size={13} className="text-[#0d9e8a] flex-shrink-0" />
                          <span className="text-[13px] font-medium text-[#0f1b2d]">{form.time} IST · 30 min</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-[#f8fafc] border border-black/[0.06] px-4 py-3 text-left space-y-2">
                        {["Confirmation email sent to your inbox", "Team reviews your profile & preps demo", "Tailored 30-min walkthrough of the platform"].map((s, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-4.5 h-4.5 rounded-full bg-[#0d9e8a]/10 border border-[#0d9e8a]/20 flex items-center justify-center flex-shrink-0 mt-px" style={{ width: 18, height: 18 }}>
                              <span className="text-[9px] font-bold text-[#0d9e8a]">{i + 1}</span>
                            </div>
                            <span className="text-[12px] text-[#0f1b2d]/55 leading-snug">{s}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-3" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {error && (
                        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-3.5 py-2.5 text-[12.5px] text-red-600">{error}</div>
                      )}

                      {/* Row 1: Name + Email */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label htmlFor="rd-name" className={labelCls}>Full name</label>
                          <input id="rd-name" type="text" autoComplete="name" value={form.name} onChange={set("name")} placeholder="Sarah Chen" required className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="rd-email" className={labelCls}>Work email</label>
                          <input id="rd-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} placeholder="sarah@company.com" required className={inputCls} />
                        </div>
                      </div>

                      {/* Row 2: Company + Role */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label htmlFor="rd-company" className={labelCls}>Company</label>
                          <input id="rd-company" type="text" autoComplete="organization" value={form.company} onChange={set("company")} placeholder="Acme Mfg." required className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="rd-role" className={labelCls}>Job title</label>
                          <input id="rd-role" type="text" autoComplete="organization-title" value={form.role} onChange={set("role")} placeholder="Head of Ops" required className={inputCls} />
                        </div>
                      </div>

                      {/* Row 3: Country + Team Size */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label htmlFor="rd-country" className={labelCls}>Country</label>
                          <CustomSelect
                            id="rd-country"
                            value={form.country}
                            onChange={(v) => setForm((p) => ({ ...p, country: v }))}
                            options={countryOptions}
                            placeholder="Select…"
                          />
                        </div>
                        <div>
                          <label htmlFor="rd-team" className={labelCls}>Team size</label>
                          <CustomSelect
                            id="rd-team"
                            value={form.teamSize}
                            onChange={(v) => setForm((p) => ({ ...p, teamSize: v }))}
                            options={teamOptions}
                            placeholder="Select…"
                          />
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-2.5 py-0.5">
                        <div className="flex-1 h-px bg-black/[0.07]" />
                        <span className="text-[10px] font-semibold text-[#0f1b2d]/30 uppercase tracking-widest">Pick a slot</span>
                        <div className="flex-1 h-px bg-black/[0.07]" />
                      </div>

                      {/* Row 4: Date + Time */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label htmlFor="rd-date" className={labelCls}>Date</label>
                          <input id="rd-date" type="date" min={minDate} value={form.date} onChange={set("date")} required className={inputCls + " cursor-pointer"} />
                        </div>
                        <div>
                          <label htmlFor="rd-time" className={labelCls}>Time (IST)</label>
                          <CustomSelect
                            id="rd-time"
                            value={form.time}
                            onChange={(v) => setForm((p) => ({ ...p, time: v }))}
                            options={timeOptions}
                            placeholder="Select…"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="rd-message" className={labelCls}>
                          What are you looking to solve?{" "}
                          <span className="normal-case font-normal opacity-60">(optional)</span>
                        </label>
                        <textarea
                          id="rd-message" rows={2} value={form.message} onChange={set("message")}
                          placeholder="e.g. BOM management, supplier sourcing, cost reduction…"
                          className={base + " py-2 resize-none leading-relaxed"}
                        />
                      </div>

                      {/* Turnstile */}
                      <Turnstile
                        ref={turnstileRef}
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                        onSuccess={setCfToken}
                        onExpire={() => setCfToken("")}
                        onError={() => setCfToken("")}
                        options={{ theme: "light", size: "normal" }}
                      />

                      {/* Submit */}
                      <button
                        type="submit" disabled={!canSubmit}
                        className="mt-0.5 w-full h-10 rounded-lg text-[13.5px] font-semibold text-white transition-all
                          disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-85 active:scale-[0.99]"
                        style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}
                      >
                        {submitting ? "Scheduling…" : "Schedule Demo →"}
                      </button>

                      <p className="text-center text-[11px] text-black/25 -mt-1">
                        No spam. We'll only contact you about your demo.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-20 w-full border-t border-black/[0.06] bg-white/80 backdrop-blur">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-5">
          <nav className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex flex-col gap-2">
              <a href="/" className="flex items-center gap-2 w-fit">
                <img src="/assets/infographics/logo/logo-white.png" alt="Emithran" className="h-5 w-auto" />
                <span className="text-[#0f1b2d] text-sm font-bold tracking-widest">EMITHRAN</span>
              </a>
              <a href="/" className="group flex items-center gap-1 text-[13px] text-black/40 hover:text-[#0d9e8a] transition-colors w-fit">
                Visit our full website
                <svg className="ml-0.5 group-hover:translate-x-0.5 transition-transform" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M0 5h7M6 1l4 4-4 4" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <a href="/privacy" className="text-black/40 hover:text-black/65 transition-colors whitespace-nowrap">Privacy &amp; terms</a>
              <span className="text-black/20">·</span>
              <span className="text-black/30 whitespace-nowrap">© 2026 Emithran Technologies Pvt. Ltd.</span>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  );
}

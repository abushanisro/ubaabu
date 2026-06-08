"use client";

import { useState, useRef } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { motion } from "framer-motion";
import { AuthHeader } from "./AuthLayout";
import { createClient } from "@/lib/supabase/client";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahrain","Bangladesh","Belarus","Belgium","Belize","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","Brunei",
  "Bulgaria","Cambodia","Cameroon","Canada","Chile","China","Colombia","Costa Rica","Croatia","Cyprus",
  "Czech Republic","Denmark","Ecuador","Egypt","Estonia","Ethiopia","Finland","France","Georgia","Germany",
  "Ghana","Greece","Guatemala","Honduras","Hungary","Iceland","India","Indonesia","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Latvia","Lebanon",
  "Lithuania","Luxembourg","Malaysia","Malta","Mexico","Moldova","Monaco","Mongolia","Morocco","Myanmar",
  "Nepal","Netherlands","New Zealand","Nigeria","Norway","Oman","Pakistan","Panama","Peru","Philippines",
  "Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia","Serbia","Singapore","Slovakia","Slovenia",
  "South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland","Taiwan","Thailand","Turkey",
  "Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabwe",
];

function getPasswordStrength(pw: string): "weak" | "medium" | "strong" {
  if (pw.length === 0) return "weak";
  const score = [
    pw.length >= 8,
    /[A-Z]/.test(pw),
    /[a-z]/.test(pw),
    /\d/.test(pw),
    /[^A-Za-z0-9]/.test(pw),
  ].filter(Boolean).length;
  if (score <= 2) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

const inputCls =
  "h-10 w-full rounded-lg bg-white border border-black/[0.12] px-3 text-[14px] text-[#0f1b2d] " +
  "placeholder:text-black/25 focus:outline-none focus:border-[#0d9e8a]/70 " +
  "focus:ring-2 focus:ring-[#0d9e8a]/15 transition-all";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("India");
  const [showPassword, setShowPassword] = useState(false);
  const [cfToken, setCfToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const strength = getPasswordStrength(password);

  const canSubmit =
    email.includes("@") &&
    fullName.trim().length > 1 &&
    password.length >= 8 &&
    country.length > 0 &&
    cfToken.length > 0 &&
    !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName.trim(), country },
        },
      });
      if (authError) {
        setError(authError.message ?? "Unable to create account. Please try again.");
        turnstileRef.current?.reset();
        setCfToken("");
        return;
      }
      window.location.href = "/sign-in?registered=1";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Blurred dashboard background */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/auth/sign-up.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-105"
          style={{ filter: "blur(8px)" }}
        />
      </div>

      <AuthHeader rightLink={{ href: "/sign-in", label: "Sign in" }} />

      {/* Centered modal card */}
      <div className="flex-1 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[560px] mx-auto px-4 py-6 sm:py-0"
      >
        <div className="rounded-2xl bg-white border border-black/[0.07] shadow-xl shadow-black/[0.10] p-6 sm:p-8">

          <h1 className="font-display text-[22px] font-bold text-[#0f1b2d] mb-1 tracking-tight">
            Create your account
          </h1>
          <p className="text-[14px] text-[#0f1b2d]/45 mb-5">
            Start your Emithran journey today.
          </p>

          {error && (
            <div role="alert" className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-[13px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
            {/* Email + Full name side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="su-email" className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider">
                  Email <span className="text-[#0d9e8a]">*</span>
                </label>
                <input
                  id="su-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="su-name" className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider">
                  Full name <span className="text-[#0d9e8a]">*</span>
                </label>
                <input
                  id="su-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Chen"
                  required
                  className={inputCls}
                />
              </div>
            </div>

            {/* Password + Country side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="su-password" className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider">
                  Password <span className="text-[#0d9e8a]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="su-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 chars"
                    required
                    className={inputCls + " pr-10"}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/55 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex gap-1 flex-1">
                      {(["weak", "medium", "strong"] as const).map((level, i) => {
                        const active = { weak: 0, medium: 1, strong: 2 }[strength] >= i;
                        const color = strength === "weak" ? "bg-red-400" : strength === "medium" ? "bg-amber-400" : "bg-[#0d9e8a]";
                        return <div key={level} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${active ? color : "bg-black/10"}`} />;
                      })}
                    </div>
                    <span className={`text-[11px] font-medium capitalize ${strength === "weak" ? "text-red-500" : strength === "medium" ? "text-amber-500" : "text-[#0d9e8a]"}`}>
                      {strength}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="su-country" className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider">
                  Country <span className="text-[#0d9e8a]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="su-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={inputCls + " appearance-none pr-8 cursor-pointer"}
                  >
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/35 pointer-events-none" />
                </div>
              </div>
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
              type="submit"
              disabled={!canSubmit}
              className="w-full h-10 rounded-lg text-[14px] font-semibold text-white transition-opacity
                disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-85 active:scale-[0.99]"
              style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-black/[0.08]" />
            <span className="text-[11px] font-medium text-black/30 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-black/[0.08]" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-2.5 h-10 rounded-lg border border-black/15
              text-[14px] font-medium text-[#0f1b2d]/70 hover:bg-black/[0.03] hover:border-black/25 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" fill="none">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.233 17.64 11.925 17.64 9.2z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Footer link */}
          <p className="text-center text-[13px] text-black/40 mt-4">
            Already have an account?{" "}
            <a href="/sign-in" className="group inline-flex items-center gap-0 text-[#0d9e8a] font-medium hover:opacity-75 transition-opacity">
              Sign in&nbsp;
              <svg className="overflow-visible" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path className="origin-left transition-transform duration-200 ease-out translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" d="M0 5h7" />
                <path className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]" d="M1 1l4 4-4 4" />
              </svg>
            </a>
          </p>
        </div>
      </motion.div>

      {/* Bottom copyright */}
      <div className="relative z-10 pb-5 pt-3 flex items-center gap-3 text-[11px]">
        <a href="/privacy" className="text-black/40 hover:text-black/65 transition-colors">Privacy &amp; terms</a>
        <span className="text-black/20">·</span>
        <span className="text-black/30">© {new Date().getFullYear()} Emithran Technologies Pvt. Ltd.</span>
      </div>
      </div>
    </div>
  );
}

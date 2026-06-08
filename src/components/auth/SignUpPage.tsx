"use client";

import { useState, useRef } from "react";
import { Eye, EyeOff, ChevronDown, Info } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { motion } from "framer-motion";
import { AuthHeader } from "./AuthLayout";
import { createClient } from "@/lib/supabase/client";

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

function getPasswordStrength(pw: string): "weak" | "medium" | "strong" {
  if (pw.length === 0) return "weak";
  const score = [pw.length >= 8, /[A-Z]/.test(pw), /[a-z]/.test(pw), /\d/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length;
  if (score <= 2) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

const inputCls =
  "h-10 w-full rounded-md bg-white px-3 text-[14px] text-[#0f1b2d] " +
  "placeholder:text-black/20 focus:outline-none transition-all " +
  "[box-shadow:0_0_0_1px_rgba(60,66,87,0.16)] " +
  "focus:[box-shadow:0_0_0_1px_rgba(13,158,138,0.6),0_0_0_3px_rgba(13,158,138,0.12)]";

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
    email.includes("@") && fullName.trim().length > 1 &&
    password.length >= 8 && country.length > 0 &&
    cfToken.length > 0 && !submitting;

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
        options: { data: { full_name: fullName.trim(), country } },
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
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      {/* Background SVG — full page, no blur, no overlay */}
      <div aria-hidden className="absolute inset-0 z-0">
        <img
          src="/assets/auth/sign-up.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <AuthHeader rightLink={{ href: "/sign-in", label: "Sign in" }} />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-[460px]"
        >
          <div className="rounded-2xl border border-black/[0.07] bg-white overflow-hidden"
            style={{ boxShadow: "0 0 0 1px rgba(60,66,87,0.06), 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}
          >
            {/* Title */}
            <div className="px-5 pt-6 pb-2">
              <h1 className="font-display text-[21px] font-bold text-[#0f1b2d] tracking-tight leading-snug">
                Create your Emithran account
              </h1>
            </div>

            {error && (
              <div role="alert" className="mx-5 mt-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-[13px] text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="px-5 pt-4 pb-3">
                <label htmlFor="su-email" className="block mb-2 text-[14px] font-medium text-[#0f1b2d]">
                  Email
                </label>
                <input
                  id="su-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputCls}
                />
              </div>

              {/* Full name */}
              <div className="px-5 pt-3 pb-3 border-t border-black/[0.06]">
                <label htmlFor="su-name" className="block mb-2 text-[14px] font-medium text-[#0f1b2d]">
                  Full name
                </label>
                <input
                  id="su-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={inputCls}
                />
              </div>

              {/* Password */}
              <div className="px-5 pt-3 pb-3 border-t border-black/[0.06]">
                <label htmlFor="su-password" className="block mb-2 text-[14px] font-medium text-[#0f1b2d]">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="su-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1 flex-1">
                      {(["weak", "medium", "strong"] as const).map((level, i) => {
                        const active = { weak: 0, medium: 1, strong: 2 }[strength] >= i;
                        const color = strength === "weak" ? "bg-red-400" : strength === "medium" ? "bg-amber-400" : "bg-[#0d9e8a]";
                        return (
                          <div key={level} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${active ? color : "bg-black/10"}`} />
                        );
                      })}
                    </div>
                    <span className={`text-[11px] font-medium capitalize ${strength === "weak" ? "text-red-500" : strength === "medium" ? "text-amber-500" : "text-[#0d9e8a]"}`}>
                      {strength}
                    </span>
                  </div>
                )}
              </div>

              {/* Country */}
              <div className="px-5 pt-3 pb-3 border-t border-black/[0.06]">
                <div className="flex items-center gap-1.5 mb-2">
                  <label htmlFor="su-country" className="text-[14px] font-medium text-[#0f1b2d]">
                    Country
                  </label>
                  <Info size={12} className="text-[#6b7280]" />
                </div>
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

              {/* Turnstile + Submit */}
              <div className="px-5 pt-3 pb-5 border-t border-black/[0.06]">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={setCfToken}
                  onExpire={() => setCfToken("")}
                  onError={() => setCfToken("")}
                  options={{ theme: "light", size: "normal" }}
                  className="mb-4"
                />

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full h-11 rounded-lg text-[15px] font-semibold text-white transition-all
                    disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))",
                    boxShadow: "0 0 0 1px rgba(13,158,138,0.6), 0 1px 1px rgba(0,0,0,0.1), 0 2px 5px rgba(60,66,87,0.08)",
                  }}
                >
                  {submitting ? "Creating account…" : "Create account"}
                </button>

                {/* Divider */}
                <div className="relative flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-black/[0.08]" />
                  <span className="text-[12px] text-black/35 font-medium">Or</span>
                  <div className="flex-1 h-px bg-black/[0.08]" />
                </div>

                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex w-full items-center justify-center gap-2 h-10 rounded-lg bg-white
                    text-[14px] font-medium text-[#3c4257] transition-all"
                  style={{ boxShadow: "0 0 0 1px rgba(60,66,87,0.16), 0 1px 1px rgba(0,0,0,0.04), 0 2px 5px rgba(60,66,87,0.06)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 0 1px rgba(60,66,87,0.28), 0 1px 1px rgba(0,0,0,0.06), 0 2px 5px rgba(60,66,87,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 1px rgba(60,66,87,0.16), 0 1px 1px rgba(0,0,0,0.04), 0 2px 5px rgba(60,66,87,0.06)")}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13.8824 7.41113H8.11768V9.72516H11.4231C11.3564 10.0945 11.2134 10.4465 11.0029 10.7595C10.7925 11.0726 10.5191 11.34 10.1995 11.5454V13.051H12.1665C12.7703 12.4802 13.2452 11.7912 13.5605 11.0286C14.0327 9.88636 14.0878 8.62111 13.8824 7.41113Z" fill="#4285F4"/>
                    <path d="M8.11765 14.4996C9.76488 14.4996 11.1599 13.9718 12.1665 13.0506L10.1995 11.545C9.58012 11.9375 8.85452 12.1373 8.11765 12.1181C7.35471 12.1088 6.61379 11.8656 5.99848 11.4224C5.38317 10.9793 4.92424 10.3584 4.68585 9.64648H2.65015V11.1856C3.15915 12.1814 3.94 13.0187 4.9055 13.604C5.87099 14.1892 6.98311 14.4992 8.11765 14.4996Z" fill="#34A853"/>
                    <path d="M4.68589 9.64706C4.42873 8.90009 4.42873 8.09081 4.68589 7.34384V5.79395H2.65019C2.22264 6.63065 2 7.55387 2 8.49004C2 9.42621 2.22264 10.3494 2.65019 11.1861L4.68589 9.64706Z" fill="#FBBC04"/>
                    <path d="M8.11765 4.87211C8.98898 4.85751 9.83116 5.18027 10.4621 5.77064L12.2126 4.05185C11.5147 3.43218 10.6808 2.9789 9.77551 2.72723C8.87026 2.47556 7.91812 2.43227 6.99307 2.60073C6.06803 2.76919 5.19498 3.14487 4.44177 3.69857C3.68856 4.25226 3.07548 4.96907 2.65015 5.7933L4.68585 7.34371C4.92424 6.63182 5.38317 6.0109 5.99848 5.56776C6.61379 5.12461 7.35471 4.8814 8.11765 4.87211Z" fill="#EA4335"/>
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </form>

            {/* Sign in link */}
            <div className="px-5 py-4 border-t border-black/[0.06] text-center">
              <span className="text-[13px] text-[#3c4257]/70">
                Already have an account?{" "}
                <a href="/sign-in" className="text-[#0d9e8a] font-medium hover:opacity-75 transition-opacity">
                  Sign in
                </a>
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

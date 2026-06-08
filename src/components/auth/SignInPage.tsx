"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { AuthHeader, AuthFooter } from "./AuthLayout";
import { createClient } from "@/lib/supabase/client";

const inputCls =
  "h-10 w-full rounded-lg bg-white border border-black/12 px-3 text-[14px] text-[#0f1b2d] " +
  "placeholder:text-black/25 focus:outline-none focus:border-[#0d9e8a]/70 " +
  "focus:ring-2 focus:ring-[#0d9e8a]/15 transition-all shadow-sm";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        // Generic message — prevents user enumeration (OWASP A07)
        setError("Invalid email or password. Please try again.");
        return;
      }
      window.location.href = "/";
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

  const canSubmit = email.length > 0 && password.length > 0 && !submitting;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 z-0">
        <img
          src="/assets/auth/authbg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <AuthHeader rightLink={{ href: "/sign-up", label: "Create account" }} />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-[400px]"
        >
          <div className="rounded-2xl border border-black/[0.07] bg-white shadow-xl shadow-black/[0.07] p-5 sm:p-8">
            <h1 className="font-display text-[22px] font-bold text-[#0f1b2d] mb-1 tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-[14px] text-[#0f1b2d]/45 mb-6">
              Welcome back to Emithran.
            </p>

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-[13px] text-red-600"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="signin-email"
                  className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  id="signin-email"
                  type="email"
                  autoComplete="username email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className={inputCls}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="signin-password"
                    className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-[12px] text-[#0d9e8a] hover:opacity-75 transition-opacity"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={inputCls + " pr-10"}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/35 hover:text-black/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-black/20 accent-[#0d9e8a] cursor-pointer"
                />
                <span className="text-[13px] text-[#0f1b2d]/55">Remember me on this device</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-1 w-full h-10 rounded-lg text-[14px] font-semibold text-white transition-opacity
                  disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-85 active:scale-[0.99]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))",
                }}
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-black/[0.08]" />
              <span className="text-[11px] font-medium text-black/30 uppercase tracking-wider whitespace-nowrap">
                Or sign in with
              </span>
              <div className="flex-1 h-px bg-black/[0.08]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-2.5 h-10 rounded-lg border border-black/15
                text-[14px] font-medium text-[#0f1b2d]/70 hover:bg-black/[0.03] hover:border-black/25 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.233 17.64 11.925 17.64 9.2z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-[13px] text-black/40 mt-4">
            New to Emithran?{" "}
            <a href="/sign-up" className="group inline-flex items-center gap-0 text-[#0d9e8a] font-medium hover:opacity-75 transition-opacity">
              Sign up&nbsp;
              <svg className="overflow-visible" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path className="origin-left transition-transform duration-200 ease-out translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" d="M0 5h7" />
                <path className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]" d="M1 1l4 4-4 4" />
              </svg>
            </a>
          </p>
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
}

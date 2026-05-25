'use client'
import { useState } from 'react'

const roles = [
  'Design Engineer',
  'Cost & Value Engineer',
  'Category Manager',
  'Manufacturing Engineer',
  'Estimator',
  'Quality Team',
  'Leadership',
  'Other',
]

export default function FinalCTA() {
  const [form, setForm] = useState({ name: '', company: '', role: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="demo" className="relative overflow-hidden bg-[#080808] py-24 text-white md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(60% 50% at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-6 md:grid-cols-2 md:items-start">
        <div>
          <p className="chip mb-6 bg-white/10 text-white/80">Request a Demo</p>
          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Transform Manufacturing from Design&nbsp;to&nbsp;Delivery.
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-md leading-relaxed">
            Emithran helps space, defence, aerospace, and precision manufacturing teams cost better,
            source smarter, plan faster, and deliver with confidence.
          </p>
          <ul className="mt-8 flex flex-col gap-3 text-sm text-white/60">
            {[
              'Should-cost models ready in days, not weeks',
              'Supplier intelligence built on real Indian market data',
              'Data stays in India — full sovereignty guaranteed',
              'NDA signed before every demo',
            ].map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <span className="mt-1 text-white/30">—</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>

        <div>
          {submitted ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 flex items-center justify-center min-h-[320px]">
              <p className="font-display text-3xl text-center leading-tight">
                We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col gap-5 backdrop-blur"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={onChange('name')}
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-white/30 text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </Field>
                <Field label="Company">
                  <input
                    required
                    value={form.company}
                    onChange={onChange('company')}
                    type="text"
                    placeholder="Your organisation"
                    className="w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-white/30 text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </Field>
              </div>

              <Field label="Role">
                <select
                  required
                  value={form.role}
                  onChange={onChange('role')}
                  className="w-full rounded-xl border border-white/15 bg-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors appearance-none"
                >
                  <option value="" disabled className="bg-gray-900">Select your role</option>
                  {roles.map((r) => (
                    <option key={r} value={r} className="bg-gray-900">
                      {r}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Email">
                  <input
                    required
                    value={form.email}
                    onChange={onChange('email')}
                    type="email"
                    placeholder="work@company.in"
                    className="w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-white/30 text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    value={form.phone}
                    onChange={onChange('phone')}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-white/30 text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-white text-[#080808] text-sm font-medium py-3.5 hover:bg-white/90 transition-all mt-2"
              >
                Request Demo →
              </button>

              <p className="text-xs text-white/40 text-center">
                Your data is secure. We sign NDAs before every demo. Data stays in India.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs tracking-widest uppercase text-white/50">{label}</span>
      {children}
    </label>
  )
}

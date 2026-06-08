'use client'

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { AnimateIn } from '@/components/ui/AnimateIn'

function RoiSlider(props: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className="relative flex w-full touch-none select-none items-center"
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#0d9488]/20">
        <SliderPrimitive.Range className="absolute h-full bg-[#0d9488]" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-[#0d9488]/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0d9488] disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
}

const SURPRISE_LABELS = ['Rare', 'Occasional', 'Frequent', 'Very Frequent']
const SURPRISE_FACTORS = [0.003, 0.006, 0.0108, 0.018]

function fmt(l: number) {
  return `₹${l % 1 === 0 ? l : l.toFixed(1)}L`
}

function compute(projects: number, avgCost: number, rfqWeeks: number, surprises: number) {
  const costSavings         = +(projects * avgCost * 0.018).toFixed(1)
  const timeSavings         = +(projects * avgCost * 0.018).toFixed(1)
  const qualityImprovements = +(projects * avgCost * SURPRISE_FACTORS[surprises]).toFixed(1)
  const fasterLaunches      = +(projects * rfqWeeks * 0.4).toFixed(1)
  const total               = +(costSavings + timeSavings + qualityImprovements + fasterLaunches).toFixed(1)

  let pkg: { name: string; cost: number }
  if (total < 60)       pkg = { name: 'Design Optimization',      cost: 5  }
  else if (total < 100) pkg = { name: 'Intelligent Sourcing',     cost: 10 }
  else                  pkg = { name: 'Supply Chain Intelligence', cost: 18 }

  const net     = +(total - pkg.cost).toFixed(1)
  const payback = Math.round(pkg.cost / (total / 12))

  return { costSavings, timeSavings, qualityImprovements, fasterLaunches, total, pkg, net, payback }
}

export default function PricingROI() {
  const [projects,  setProjects]  = useState(20)
  const [avgCost,   setAvgCost]   = useState(100)
  const [rfqWeeks,  setRfqWeeks]  = useState(3)
  const [surprises, setSurprises] = useState(2)

  const r = compute(projects, avgCost, rfqWeeks, surprises)

  return (
    <section id="roi" className="pricing-section bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-14">

        {/* Header */}
        <AnimateIn>
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-medium text-[#0d9488]">ROI Calculator</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0f1b2d] md:text-4xl">
              {"What's your ROI?"}
            </h2>
            <p className="mt-4 text-base text-[#0f1b2d]/55">
              Most customers achieve ROI in 3–6 months. Adjust the inputs to model yours.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">

          {/* Sliders */}
          <div className="rounded-2xl border border-black/[0.08] bg-white p-8">
            <div className="space-y-9">

              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label className="text-sm font-medium text-[#0f1b2d]">Annual project count</label>
                  <span className="text-sm font-semibold tabular-nums text-[#0d9488]">{projects} projects</span>
                </div>
                <RoiSlider min={5} max={100} step={1} value={[projects]} onValueChange={([v]) => setProjects(v)} />
              </div>

              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label className="text-sm font-medium text-[#0f1b2d]">Average project cost</label>
                  <span className="text-sm font-semibold tabular-nums text-[#0d9488]">₹{avgCost}L</span>
                </div>
                <RoiSlider min={50} max={1000} step={10} value={[avgCost]} onValueChange={([v]) => setAvgCost(v)} />
              </div>

              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label className="text-sm font-medium text-[#0f1b2d]">Current RFQ cycle time</label>
                  <span className="text-sm font-semibold tabular-nums text-[#0d9488]">{rfqWeeks} weeks</span>
                </div>
                <RoiSlider min={2} max={6} step={1} value={[rfqWeeks]} onValueChange={([v]) => setRfqWeeks(v)} />
              </div>

              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label className="text-sm font-medium text-[#0f1b2d]">Frequency of cost surprises</label>
                  <span className="text-sm font-semibold tabular-nums text-[#0d9488]">{SURPRISE_LABELS[surprises]}</span>
                </div>
                <RoiSlider min={0} max={3} step={1} value={[surprises]} onValueChange={([v]) => setSurprises(v)} />
              </div>

            </div>
          </div>

          {/* Results */}
          <div className="overflow-hidden rounded-2xl border border-[#0f1b2d] bg-[#0f1b2d] text-white">

            <div className="border-b border-white/10 px-8 py-6">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">Annual savings potential</p>
              <p className="mt-2 text-5xl font-semibold tabular-nums tracking-tight transition-all">
                {fmt(r.total)}
              </p>
            </div>

            <dl className="divide-y divide-white/10 px-8 py-2">
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-white/70">Cost savings (RFQ optimization)</dt>
                <dd className="font-medium tabular-nums">{fmt(r.costSavings)}</dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-white/70">Time savings (procurement team)</dt>
                <dd className="font-medium tabular-nums">{fmt(r.timeSavings)}</dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-white/70">Quality improvements</dt>
                <dd className="font-medium tabular-nums">{fmt(r.qualityImprovements)}</dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-white/70">Faster launches</dt>
                <dd className="font-medium tabular-nums">{fmt(r.fasterLaunches)}</dd>
              </div>
            </dl>

            <div className="border-t border-white/10 bg-white/[0.03] px-8 py-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Recommended package</span>
                <span className="font-medium">{r.pkg.name}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-white/60">Package cost (annual)</span>
                <span className="font-medium">₹{r.pkg.cost}L</span>
              </div>
              <div className="mt-5 flex items-end justify-between gap-6 border-t border-white/10 pt-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/60">Net benefit</p>
                  <p className="mt-1 text-3xl font-semibold tabular-nums text-[#2dd4bf]">{fmt(r.net)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-white/60">Payback</p>
                  <p className="mt-1 text-3xl font-semibold tabular-nums">{r.payback} mo</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        </AnimateIn>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-xs text-[#0f1b2d]/40">
            Based on typical Emithran customer profile. Actual savings vary by company size, supply chain complexity, and current baseline.
          </p>
          <a href="/contact?source=pricing&cta=download-roi-model" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0d9488] hover:underline">
            Download detailed ROI model <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </div>

      </div>
    </section>
  )
}

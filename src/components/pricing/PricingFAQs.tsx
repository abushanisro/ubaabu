'use client'

import { ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { AnimateIn } from '@/components/ui/AnimateIn'

const FAQS = [
  {
    q: 'Can we start with one package and upgrade later?',
    a: 'Yes. All packages are designed to be modular and stackable. You can start with the Design Optimization package and expand to Intelligent Sourcing or Supply Chain Intelligence as your needs grow - without any data migration or re-implementation.',
  },
  {
    q: 'Do you charge per user?',
    a: 'No. Emithran pricing is outcome-based, not seat-based. Each package is sized for a typical team range (e.g. 5–8 engineers for Design, 8–12 for Sourcing), and the full team within that range is included. There are no per-seat add-ons or surprise overages.',
  },
  {
    q: 'Do you offer free trials?',
    a: 'We offer a structured 30-day pilot on your own data instead of a generic sandbox trial. This gives you a real ROI signal - not just a feature tour. Contact sales to schedule your pilot.',
  },
  {
    q: 'Is implementation cost included?',
    a: 'Yes, for standard deployments. Emithran includes onboarding, data ingestion, and a 4–8 week go-live programme in the package price. Complex ERP integrations or multi-site rollouts may carry a one-time setup fee - this is scoped and quoted transparently before signing.',
  },
  {
    q: 'Can packages be customized?',
    a: 'Yes. The Custom tier is purpose-built for manufacturers who need bespoke scoping - high project volumes, multi-site operations, or specialized compliance workflows. Talk to sales and we will design a package around your exact requirements.',
  },
]

export default function PricingFAQs() {
  return (
    <section id="faqs" className="pricing-section bg-white">
      <div className="mx-auto max-w-[1000px] px-6 py-12">

        {/* Header */}
        <AnimateIn>
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-medium text-[#0d9488]">FAQs</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0f1b2d] md:text-4xl">
              Common questions.
            </h2>
          </div>
        </AnimateIn>

        {/* Accordion */}
        <AnimateIn delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-black/[0.07] last:border-b-0"
              >
                <AccordionTrigger className="group py-5 text-left text-base font-medium text-[#0f1b2d] hover:no-underline [&>svg]:hidden">
                  <span>{faq.q}</span>
                  <ChevronDown className="size-5 shrink-0 text-[#0d9488] transition-transform duration-300 group-data-[state=open]:rotate-180" aria-hidden />
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pb-5 text-sm leading-relaxed text-[#0f1b2d]/60">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateIn>

      </div>
    </section>
  )
}

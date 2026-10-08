import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

const EMUSKI_SITE = 'https://www.emuski.com/'

type Pillar = {
  image: string
  title: string
  description: string
  links: string[]
}

const PILLARS: Pillar[] = [
  {
    image: '/assets/element-bg/manufaturing.png',
    title: 'Manufacturing Excellence',
    description:
      "Through EMUSKI's NPD Innovation Centre, product concepts become market-ready parts with rapid prototyping and on-demand manufacturing - precision, speed, and scalability across automotive, aerospace, and industrial applications.",
    links: ['On-Demand Manufacturing', 'Rapid Prototyping', 'Custom Manufacturing', 'Production Scaling'],
  },
  {
    image: '/assets/element-bg/egineering.png',
    title: 'Engineering Innovation',
    description:
      'Deep engineering expertise to optimize costs, validate designs, and strategically source components with precision and efficiency - data-driven insights for a competitive advantage.',
    links: ['Product Cost Estimation', 'VAVE - Teardown & Benchmarking', 'Strategic Sourcing Support', 'Expert Engineer Support'],
  },
]

const SUCCESS_STORIES = [
  {
    title: '75 Units to the USA in Just 3 Days: Delivering Against the Clock',
    summary:
      'A leading aerospace company needed 75 precision components delivered to the USA within 3 days. After other vendors failed, EMUSKI completed end-to-end manufacturing in 24 hours with zero defects.',
  },
  {
    title: 'Satellite Broadcast & Sensor Components',
    summary:
      'EMUSKI prototyped a space-grade satellite barrel with 1mm wall thickness and complex grooves in 3 days, leading to a full manufacturing partnership.',
  },
  {
    title: 'Advanced Graphite Machining',
    summary:
      'EMUSKI sourced proprietary Tokai Carbon within India, ran 9 mechanical tests, and delivered final components where no local supplier could.',
  },
  {
    title: 'Defence Sector Zero-Zero Tolerance',
    summary:
      'EMUSKI achieved zero-zero tolerance on defence components by controlling anodization thickness, enabling flawless assembly after other suppliers failed.',
  },
]

export default function EmuskiPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[#080808] pt-28 pb-20 md:pt-36 md:pb-28"
        style={{
          backgroundImage: 'url(/assets/element-bg/background.png)',
          backgroundSize: '100% 103%',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[#2dd4bf]">
            In-house NPD &amp; Manufacturing Centre
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            EMUSKI - You Design It, We Build It
          </h1>
          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-white/65 mb-8">
            EMUSKI is Emithran&apos;s in-house engineering and manufacturing arm - turning product ideas into real
            parts at the right cost and quality, delivered from our NPD Innovation Centre straight to your door.
            It&apos;s the live manufacturing plant behind Emithran&apos;s cost and supplier intelligence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/request-demo?source=emuski&cta=request-demo"
              className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
            >
              Request a Demo
            </Link>
            <Link
              href="/contact?source=emuski&cta=contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.08] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[#f8fafc] py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mx-auto grid max-w-[820px] grid-cols-1 gap-6 md:grid-cols-2">
            {PILLARS.map(({ image, title, description, links }) => (
              <div key={title} className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
                <div className="relative h-44 w-full">
                  <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                </div>
                <div className="p-7">
                  <h2 className="mb-3 text-[18px] font-bold text-[#0f1b2d]">{title}</h2>
                  <p className="mb-5 text-[14px] leading-relaxed text-black/60">{description}</p>
                  <ul className="space-y-2">
                    {links.map((l) => (
                      <li key={l}>
                        <a
                          href={EMUSKI_SITE}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 text-[13px] text-black/50 hover:text-[#0d9488] transition-colors"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-[#0d9488]" />
                          <span className="group-hover:underline">{l}</span>
                          <AnimatedArrow />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="mb-2 text-center text-2xl md:text-3xl font-bold tracking-tight text-[#0f1b2d]">
            Success Stories
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-[14px] text-black/50">
            A few of the manufacturing challenges the EMUSKI team has solved.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SUCCESS_STORIES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-black/[0.07] p-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">Case Study</p>
                <h3 className="mb-2 text-[16px] font-bold leading-snug text-[#0f1b2d]">{s.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-black/55">{s.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://emuski.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d9488] hover:underline"
            >
              Check out EMUSKI <AnimatedArrow />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#080808] py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tight text-white">
            Our Manufacturing Team
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2dd4bf]">Headquarters</p>
              <p className="flex items-center justify-center gap-2 text-[14px] text-white/60">
                <MapPin size={14} className="text-[#2dd4bf] shrink-0" />
                126, RNS Plaza, Electronic City Phase 2, Bangalore
              </p>
              <p className="flex items-center justify-center gap-2 text-[14px] text-white/60">
                <Phone size={14} className="text-[#2dd4bf] shrink-0" />
                +91 86670 88060
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2dd4bf]">Manufacturing</p>
              <p className="flex items-center justify-center gap-2 text-[14px] text-white/60">
                <MapPin size={14} className="text-[#2dd4bf] shrink-0" />
                Hosur, Tamil Nadu
              </p>
              <p className="flex items-center justify-center gap-2 text-[14px] text-white/60">
                <Mail size={14} className="text-[#2dd4bf] shrink-0" />
                enquiries@emuski.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

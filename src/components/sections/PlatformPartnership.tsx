import Link from 'next/link'
import Image from 'next/image'
import { AnimatedArrow } from '@/components/ui/animated-arrow'
import { Inter } from 'next/font/google'

const light = Inter({ weight: ['300'], subsets: ['latin'], display: 'swap' })

const CARDS = [
  {
    image: '/assets/home/expertegineerign%20suport.png',
    title: 'Expert Engineering Support',
    body: 'A dedicated costing engineer is deployed with your team, working directly with engineering, sourcing, and procurement to build, validate, and refine costing models using your real parts, BOMs, processes, suppliers, and manufacturing data.',
    href: '/why-emithran',
  },
  {
    image: '/assets/home/customize.png',
    title: 'Beyond the Software Layer',
    body: 'Customized for your commodity, region, and manufacturing process - connecting Emithran AI with your existing ERP, BOM structures, and supplier records without a rip-and-replace approach.',
    href: '/why-emithran',
  },
  {
    image: '/assets/home/npdhuman1.png',
    title: 'In-house NPD Centre - EMUSKI',
    body: 'Backed by EMUSKI, our in-house NPD innovation centre and live manufacturing plant, Emithran is built from real engineering and manufacturing experience across precision programmes.',
    href: '/emuski',
  },
]

export default function PlatformPartnership() {
  return (
    <section
      className="relative overflow-hidden py-10 md:py-14"
      style={{
        backgroundImage: [
          'repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 5px)',
          'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))',
        ].join(', '),
      }}
    >
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-widest text-white/80">
          Why Emithran
        </p>
        <h2 className={`${light.className} mx-auto mb-8 md:mb-10 max-w-3xl text-center text-[26px] leading-tight text-white md:text-[38px]`}>
          Emithran combines manufacturing software with expert engineering support.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map(({ image, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col rounded-2xl p-5 transition-colors hover:bg-white/10"
            >
              <div className="relative mb-5 h-44 w-full overflow-hidden rounded-xl">
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
              </div>
              <h3 className="mb-3 flex items-center gap-1.5 text-[17px] font-bold text-white">
                {title}
                <AnimatedArrow />
              </h3>
              <p className="text-[14px] leading-relaxed text-white/80">{body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

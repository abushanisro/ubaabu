'use client'
import {
  Sparkles, FileText, Users2, MessageSquare,
  LayoutGrid, Workflow, Link2, Send, ExternalLink, X,
} from 'lucide-react'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'

function FeatureCard({
  icon: Icon, title, desc, active,
}: { icon: typeof Sparkles; title: string; desc: string; active?: boolean }) {
  return (
    <div className={`group flex items-start gap-3 rounded-xl border p-3 shadow-sm transition hover:shadow-md bg-white ${
      active ? 'border-[#0d9e8a]/40 ring-1 ring-[#0d9e8a]/20' : 'border-black/10'
    }`}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0d1117] text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-[#0d1117]">{title}</div>
        <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748b]">{desc}</p>
      </div>
      <div className="text-[#94a3b8] text-sm shrink-0 transition group-hover:translate-x-0.5">›</div>
    </div>
  )
}

export default function FlowCards() {
  return (
    <div className="w-full">
      <div className="relative grid grid-cols-12 gap-3 lg:gap-5 lg:items-start">

        {/* ── LEFT: feature list + Team Collaboration ── */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          {/* Feature cards group */}
          <div className="space-y-2">
            <FeatureCard active icon={Sparkles} title="Chat with Emithran AI"
              desc="Get instant answers about sourcing, costing, and suppliers." />
            <FeatureCard icon={FileText} title="View Cost Data"
              desc="Explore should-cost breakdowns and benchmark insights." />
            <FeatureCard icon={Workflow} title="Collaborate & Take Action"
              desc="Work with procurement and engineering teams in real time." />
            <FeatureCard icon={MessageSquare} title="View & Comment on 3D Models"
              desc="Interact with CAD assemblies and manufacturing views." />
          </div>

          {/* Team Collaboration — below feature cards, same style as 3D Model Comments */}
          <div className="w-fit rounded-xl border border-black/10 bg-white p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Users2 className="h-3.5 w-3.5 shrink-0 text-[#0d9e8a]" />
              <div>
                <div className="text-xs font-semibold text-[#0d1117]">Team Collaboration</div>
                <div className="text-[10px] text-[#64748b]">Real-time updates</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTER: image with 4 corner floating cards ── */}
        <div className="col-span-12 lg:col-span-6 lg:mt-4">
          {/*
            py-24 creates 96px above & below the image.
            The 4 corner cards are absolute at top-0 / bottom-0,
            so they float in that 96px band outside the image edges.
          */}
          <div className="relative">

            {/* ── Dashboard video ── */}
            <div className="relative z-10 overflow-hidden rounded-2xl border border-black/10 bg-[#0b1220] shadow-xl">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="/videos/emuski.mp4"
                thumbnailSrc="/assets/cards/videocard.svg"
                thumbnailAlt="Watch Emithran in action"
              />
            </div>

            {/* ── Mobile: 2×2 card grid below image ── */}
            <div className="grid grid-cols-2 gap-2 mt-3 lg:hidden">
              <div className="rounded-xl border border-black/10 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0d9e8a]/10 text-[#0d9e8a]">
                    <LayoutGrid className="h-3 w-3" />
                  </div>
                  <div className="text-xs font-semibold text-[#0d1117]">Cost Data</div>
                </div>
                <div className="text-[10px] text-[#64748b]">Live should-cost analysis</div>
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3 w-3 text-[#0d9e8a]" />
                  <div className="text-xs font-semibold text-[#0d1117]">AI Negotiation</div>
                </div>
                <div className="text-lg font-bold text-[#0d1117]">$145K</div>
                <div className="text-[10px] text-[#64748b]">Potential savings</div>
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f1f5f9]">
                    <Users2 className="h-3 w-3 text-[#64748b]" />
                  </div>
                  <div className="text-xs font-semibold text-[#0d1117]">Team Collab</div>
                </div>
                <div className="text-[10px] text-[#64748b]">Real-time updates</div>
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="h-3 w-3 text-[#0d9e8a]" />
                  <div className="text-xs font-semibold text-[#0d1117]">3D Comments</div>
                </div>
                <div className="flex -space-x-1.5 mt-1">
                  {['/assets/infographics/logo/abushan.png', '/assets/infographics/logo/sinigi.png', '/assets/infographics/logo/emuski.png'].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-5 w-5 rounded-full border-2 border-white object-cover" />
                  ))}
                  <div className="flex h-5 items-center rounded-full border-2 border-white bg-[#f1f5f9] px-1 text-[9px] font-medium text-[#64748b]">+8</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Emithran AI chat panel + 3D Model Comments ── */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <div className="rounded-xl border border-black/10 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-black/10 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#0d9e8a]" />
                <span className="text-xs font-semibold text-[#0d1117]">Emithran AI</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#94a3b8]">
                <ExternalLink className="h-3 w-3" />
                <X className="h-3 w-3" />
              </div>
            </div>
            <div className="space-y-2.5 px-3 py-3 text-[11px]">
              <p className="text-[#0d1117]/75 leading-relaxed">
                Negotiation summary for Project Alpha across four key areas:
              </p>
              <div>
                <div className="mb-1 text-xs font-semibold text-[#0d1117]">Key Cost Drivers</div>
                <ul className="space-y-1 pl-3 text-[#0d1117]/75" style={{ listStyleType: 'disc' }}>
                  <li>CNC milling = 63% of manufacturing cost</li>
                  <li>Material utilization below threshold</li>
                  <li>Tooling setup adds batch overhead</li>
                  <li>Variance in aluminum pricing</li>
                </ul>
              </div>
              <div>
                <div className="mb-1.5 text-xs font-semibold text-[#0d1117]">Recommendations</div>
                <div className="space-y-1">
                  {([
                    [LayoutGrid, 'Reduce wall thickness 0.4mm'],
                    [MessageSquare, 'Standardize thread pitch'],
                    [FileText, 'Switch to Al-6061 grade'],
                    [Link2, 'Consolidate machining ops'],
                  ] as [typeof Sparkles, string][]).map(([Ic, text], i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[#0d1117]/75">
                      <Ic className="h-3 w-3 shrink-0 text-[#0d9e8a]/70" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-black/10 px-3 py-2">
              <input
                className="flex-1 bg-transparent text-[11px] outline-none placeholder:text-[#94a3b8]"
                placeholder="Ask Emithran AI anything..."
              />
              <button className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0d9e8a] text-white">
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* 3D Model Comments — below AI panel */}
          <div className="w-fit rounded-xl border border-black/10 bg-white p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 shrink-0 text-[#0d9e8a]" />
              <div>
                <div className="text-xs font-semibold text-[#0d1117]">3D Model Comments</div>
                <div className="text-[10px] text-[#64748b]">12 new comments</div>
              </div>
            </div>
            <div className="mt-1 flex -space-x-1.5">
              {['/assets/infographics/logo/abushan.png', '/assets/infographics/logo/sinigi.png', '/assets/infographics/logo/emuski.png'].map((src, i) => (
                <img key={i} src={src} alt="" className="h-6 w-6 rounded-full border-2 border-white object-cover" />
              ))}
              <div className="flex h-6 items-center rounded-full border-2 border-white bg-[#f1f5f9] px-1.5 text-[9px] font-medium text-[#64748b]">
                +8
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

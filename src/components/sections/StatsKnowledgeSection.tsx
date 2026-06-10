'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import type { KGNode, KGLink } from '@/components/ui/KnowledgeGraph'

const KnowledgeGraph = dynamic(() => import('@/components/ui/KnowledgeGraph'), { ssr: false })

const ManufacturingViz = dynamic(
  () => import('@/components/ManufacturingViz').then(m => ({ default: m.ManufacturingViz })),
  { ssr: false }
)

// ── Data ─────────────────────────────────────────────────────────────────────

const GRAPHS: Record<number, { title: string; sub: string; nodes: KGNode[]; links: KGLink[] }> = {
  // $72B+ - Indian defence procurement
  0: {
    title: 'Defence Procurement Intelligence Graph',
    sub: '$72B+ annual spend - currently managed on spreadsheets & legacy ERP',
    nodes: [
      { id: 'procurement', label: 'Defence\nProcurement', group: 'core', radius: 28 },
      { id: '72b',         label: '$72B+\nAnnual',        group: 'metric', radius: 22 },
      { id: 'suppliers',   label: '3,000+\nSuppliers',    group: 'metric', radius: 18 },
      { id: 'spreadsheet', label: 'Spreadsheets',          group: 'problem' },
      { id: 'erp',         label: 'Legacy ERP',            group: 'problem' },
      { id: 'manual',      label: 'Manual Entry',          group: 'problem' },
      { id: 'silos',       label: 'Data Silos',            group: 'problem' },
      { id: 'multiyear',   label: 'Multi-year\nProjects', group: 'layer' },
      { id: 'emithran',    label: 'Emithran',              group: 'solution', radius: 22 },
      { id: 'shouldcost',  label: 'Should-Cost\nEngine',  group: 'solution' },
      { id: 'rfq',         label: 'RFQ\nAutomation',      group: 'solution' },
      { id: 'faster',      label: '40% Faster\nTurnaround', group: 'metric' },
      { id: 'savings',     label: 'Cost Savings\nUnlocked', group: 'metric' },
      { id: 'visibility',  label: 'Real-time\nVisibility', group: 'solution' },
    ],
    links: [
      { source: 'procurement', target: '72b',         type: 'scale' },
      { source: 'procurement', target: 'suppliers',   type: 'manages' },
      { source: 'procurement', target: 'spreadsheet', type: 'managed via' },
      { source: 'procurement', target: 'erp',         type: 'runs on' },
      { source: 'procurement', target: 'multiyear',   type: 'involves' },
      { source: 'spreadsheet', target: 'manual',      type: 'causes' },
      { source: 'erp',         target: 'silos',       type: 'creates' },
      { source: 'emithran',    target: 'procurement',  type: 'transforms' },
      { source: 'emithran',    target: 'shouldcost',  type: 'includes' },
      { source: 'emithran',    target: 'rfq',         type: 'includes' },
      { source: 'emithran',    target: 'visibility',  type: 'delivers' },
      { source: 'emithran',    target: 'faster',      type: 'delivers' },
      { source: 'emithran',    target: 'savings',     type: 'delivers' },
      { source: 'shouldcost',  target: 'savings',     type: 'drives' },
      { source: 'rfq',         target: 'faster',      type: 'drives' },
    ],
  },

  // 99.4% - BOM Accuracy
  2: {
    title: 'BOM Accuracy Knowledge Graph',
    sub: '99.4% accuracy across 47 active defence & aerospace programmes',
    nodes: [
      { id: 'bom',         label: 'BOM System',         group: 'core',      radius: 28 },
      { id: 'accuracy',    label: '99.4%\nAccuracy',    group: 'metric',    radius: 24 },
      { id: 'nodes_count', label: '14.5K\nBOM Nodes',  group: 'metric',    radius: 18 },
      { id: 'programmes',  label: '47 Active\nProgrammes', group: 'metric', radius: 18 },
      { id: 'tejas',       label: 'LCA Tejas Mk2',      group: 'programme' },
      { id: 'amca',        label: 'AMCA\nProgramme',    group: 'programme' },
      { id: 'aesa',        label: 'AESA Radar\nSuite',  group: 'programme' },
      { id: 'alh',         label: 'HAL ALH-WSI',        group: 'programme' },
      { id: 'drdo',        label: 'DRDO AEW&CS',        group: 'programme' },
      { id: 'subassy',     label: 'Sub-assemblies',     group: 'layer' },
      { id: 'materials',   label: 'Materials',          group: 'layer' },
      { id: 'processes',   label: 'Processes',          group: 'layer' },
      { id: 'ai_verify',   label: 'AI\nVerification',  group: 'solution',  radius: 20 },
      { id: 'sync',        label: 'Real-time\nSync',   group: 'solution' },
      { id: 'quality',     label: 'Quality\nGuard',    group: 'solution' },
    ],
    links: [
      { source: 'bom',       target: 'accuracy',    type: 'achieves' },
      { source: 'bom',       target: 'nodes_count', type: 'tracks' },
      { source: 'bom',       target: 'programmes',  type: 'covers' },
      { source: 'bom',       target: 'tejas',       type: 'manages' },
      { source: 'bom',       target: 'amca',        type: 'manages' },
      { source: 'bom',       target: 'aesa',        type: 'manages' },
      { source: 'bom',       target: 'alh',         type: 'manages' },
      { source: 'bom',       target: 'drdo',        type: 'manages' },
      { source: 'bom',       target: 'subassy',     type: 'contains' },
      { source: 'subassy',   target: 'materials',   type: 'uses' },
      { source: 'subassy',   target: 'processes',   type: 'requires' },
      { source: 'bom',       target: 'ai_verify',   type: 'powered by' },
      { source: 'ai_verify', target: 'accuracy',    type: 'enables' },
      { source: 'ai_verify', target: 'quality',     type: 'feeds' },
      { source: 'sync',      target: 'bom',         type: 'updates' },
    ],
  },
}

// ── Legend pill ───────────────────────────────────────────────────────────────

const LEGEND = [
  { color: '#0d9e8a', label: 'Core / Solution' },
  { color: '#2dd4bf', label: 'Programme' },
  { color: '#f59e0b', label: 'Metric' },
  { color: 'rgba(45,212,191,0.55)', label: 'Layer' },
  { color: '#f87171', label: 'Problem' },
]

// ── Component ─────────────────────────────────────────────────────────────────

type Time = 'pre-dawn' | 'sunrise' | 'daytime' | 'dusk' | 'sunset' | 'night'

interface Props {
  active: number
  time: Time
  playing: boolean
}

export default function StatsKnowledgeSection({ active, time, playing }: Props) {
  const graph = GRAPHS[active]

  return (
    <div className="relative w-full" style={{ minHeight: 480 }}>
      {/* subtle top fade to blend into stats text area */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 z-10 h-16"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)' }}
      />

      <AnimatePresence mode="wait">
        {graph ? (
          <motion.div
            key={active}
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between px-6 md:px-12 pt-5 pb-3 shrink-0">
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: '#0d9e8a' }}
                >
                  Knowledge Graph
                </p>
                <h3 className="text-sm font-semibold text-white/80">{graph.title}</h3>
                <p className="text-[11px] text-white/40 mt-0.5 max-w-md">{graph.sub}</p>
              </div>

              {/* Legend */}
              <div className="hidden md:flex flex-wrap gap-x-4 gap-y-1 justify-end mt-1">
                {LEGEND.map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
                    <span className="text-[10px] text-white/35">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Graph canvas */}
            <div className="flex-1 relative">
              <KnowledgeGraph
                nodes={graph.nodes}
                links={graph.links}
                active={true}
                className="absolute inset-0"
              />
            </div>

            {/* Bottom hint */}
            <div className="shrink-0 px-6 md:px-12 pb-4">
              <span className="text-[10px] text-white/25 font-medium tracking-wide">
                ● Drag nodes to simulate physics &nbsp;·&nbsp; Scroll to zoom
              </span>
            </div>
          </motion.div>
        ) : (
          // Stat 1 (40%) - ManufacturingViz
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <ManufacturingViz index={active as 0 | 1 | 2 | 3} time={time} playing={playing} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

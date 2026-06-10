'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export interface KGNode {
  id: string
  label: string
  group: 'core' | 'metric' | 'programme' | 'layer' | 'problem' | 'solution'
  radius?: number
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

export interface KGLink {
  source: string | KGNode
  target: string | KGNode
  type: string
}

interface Props {
  nodes: KGNode[]
  links: KGLink[]
  active: boolean
  className?: string
}

const GROUP_COLOR: Record<KGNode['group'], string> = {
  core:      '#0d9e8a',
  solution:  '#0d9e8a',
  programme: '#2dd4bf',
  layer:     'rgba(45,212,191,0.65)',
  metric:    '#f59e0b',
  problem:   '#f87171',
}

const GROUP_RADIUS: Record<KGNode['group'], number> = {
  core:      36,
  metric:    26,
  solution:  22,
  programme: 19,
  layer:     15,
  problem:   17,
}

export default function KnowledgeGraph({ nodes, links, active, className = '' }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const simRef = useRef<d3.Simulation<KGNode, KGLink> | null>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const { width, height } = svg.getBoundingClientRect()
    const cx = width / 2
    const cy = height / 2

    // Clone data - seed ALL nodes at centre so they burst outward
    const nodeData: KGNode[] = nodes.map(n => ({
      ...n,
      radius: n.radius ?? GROUP_RADIUS[n.group],
      x: cx + (Math.random() - 0.5) * 8,
      y: cy + (Math.random() - 0.5) * 8,
    }))
    const linkData: KGLink[] = links.map(l => ({ ...l }))

    d3.select(svg).selectAll('*').remove()

    // ── Defs: glow ─────────────────────────────────────────────────
    const defs = d3.select(svg).append('defs')
    const f = defs.append('filter').attr('id', 'kg-glow').attr('x', '-60%').attr('y', '-60%').attr('width', '220%').attr('height', '220%')
    f.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', '4.5').attr('result', 'blur')
    const fm = f.append('feMerge')
    fm.append('feMergeNode').attr('in', 'blur')
    fm.append('feMergeNode').attr('in', 'SourceGraphic')

    // ── Zoomable group ─────────────────────────────────────────────
    const g = d3.select(svg).append('g')
    d3.select(svg).call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.2, 4])
        .on('zoom', e => g.attr('transform', e.transform.toString()))
    )

    // ── Force simulation - strong spread from centre ───────────────
    const sim = d3.forceSimulation<KGNode>(nodeData)
      .force('link',      d3.forceLink<KGNode, KGLink>(linkData).id(d => d.id).distance(d => {
        const s = d.source as KGNode
        const t = d.target as KGNode
        if (s.group === 'core' || t.group === 'core') return Math.min(width, height) * 0.48
        return Math.min(width, height) * 0.32
      }))
      .force('charge',    d3.forceManyBody().strength(-680))
      .force('center',    d3.forceCenter(cx, cy).strength(0.03))
      .force('collision', d3.forceCollide<KGNode>().radius(d => (d.radius ?? 15) + 26))
      .alpha(1)
      .alphaDecay(0.018)

    simRef.current = sim

    // ── Links ──────────────────────────────────────────────────────
    const linkSel = g.append('g')
      .selectAll<SVGLineElement, KGLink>('line')
      .data(linkData)
      .join('line')
      .attr('stroke', 'rgba(45,212,191,0.18)')
      .attr('stroke-width', 1.2)

    const linkLabelSel = g.append('g')
      .selectAll<SVGTextElement, KGLink>('text')
      .data(linkData)
      .join('text')
      .text(d => d.type)
      .attr('fill', 'rgba(255,255,255,0.18)')
      .attr('font-size', '8.5')
      .attr('text-anchor', 'middle')
      .attr('pointer-events', 'none')

    // ── Nodes ──────────────────────────────────────────────────────
    const nodeG = g.append('g')
      .selectAll<SVGGElement, KGNode>('g')
      .data(nodeData)
      .join('g')
      .style('cursor', 'grab')
      .call(
        d3.drag<SVGGElement, KGNode>()
          .on('start', (ev, d) => { if (!ev.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
          .on('drag',  (ev, d) => { d.fx = ev.x; d.fy = ev.y })
          .on('end',   (ev, d) => { if (!ev.active) sim.alphaTarget(0); d.fx = null; d.fy = null })
      )

    // Outer glow halo
    nodeG.append('circle')
      .attr('r', d => (d.radius ?? 13) + 10)
      .attr('fill', d => GROUP_COLOR[d.group])
      .attr('opacity', 0.1)
      .attr('filter', 'url(#kg-glow)')

    // Main filled circle
    nodeG.append('circle')
      .attr('r', d => d.radius ?? 13)
      .attr('fill', d => GROUP_COLOR[d.group])
      .attr('stroke', d => d.group === 'core' ? 'rgba(255,255,255,0.5)' : GROUP_COLOR[d.group])
      .attr('stroke-width', d => d.group === 'core' ? 1.5 : 0.6)
      .attr('opacity', d => d.group === 'layer' ? 0.75 : 1)

    // Animated pulse ring on core & metric nodes
    nodeG.filter(d => d.group === 'core' || d.group === 'metric')
      .append('circle')
      .attr('r', d => (d.radius ?? 13) + 6)
      .attr('fill', 'none')
      .attr('stroke', d => GROUP_COLOR[d.group])
      .attr('stroke-width', 0.8)
      .attr('opacity', 0.35)

    // Label
    nodeG.append('text')
      .each(function(d) {
        const el = d3.select(this)
        const lines = d.label.split('\n')
        const r = d.radius ?? 13
        const baseY = r + 13
        if (lines.length === 1) {
          el.attr('dy', baseY)
            .text(d.label)
        } else {
          lines.forEach((line, i) => {
            el.append('tspan')
              .attr('x', 0)
              .attr('dy', i === 0 ? baseY : '1.1em')
              .text(line)
          })
        }
      })
      .attr('fill', 'rgba(255,255,255,0.82)')
      .attr('font-size', d => d.group === 'core' ? '10.5' : '8.5')
      .attr('font-weight', d => (d.group === 'core' || d.group === 'metric') ? '600' : '400')
      .attr('text-anchor', 'middle')
      .attr('pointer-events', 'none')

    // ── Tick ───────────────────────────────────────────────────────
    sim.on('tick', () => {
      linkSel
        .attr('x1', d => (d.source as KGNode).x ?? 0)
        .attr('y1', d => (d.source as KGNode).y ?? 0)
        .attr('x2', d => (d.target as KGNode).x ?? 0)
        .attr('y2', d => (d.target as KGNode).y ?? 0)

      linkLabelSel
        .attr('x', d => (((d.source as KGNode).x ?? 0) + ((d.target as KGNode).x ?? 0)) / 2)
        .attr('y', d => (((d.source as KGNode).y ?? 0) + ((d.target as KGNode).y ?? 0)) / 2 - 4)

      nodeG.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`)
    })

    // ── Resize ─────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const { width: w, height: h } = svg.getBoundingClientRect()
      sim.force('center', d3.forceCenter(w / 2, h / 2).strength(0.04))
      sim.alpha(0.3).restart()
    })
    ro.observe(svg)

    return () => { sim.stop(); ro.disconnect() }
  }, [nodes, links])

  // Re-burst when stat becomes active
  useEffect(() => {
    if (active && simRef.current) simRef.current.alpha(0.85).restart()
  }, [active])

  return (
    <svg
      ref={svgRef}
      className={`w-full h-full ${className}`}
      style={{ background: 'transparent', display: 'block' }}
    />
  )
}

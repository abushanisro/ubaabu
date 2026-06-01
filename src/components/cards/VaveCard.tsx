'use client'
import { useRef, useCallback, useEffect } from "react";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";

// Node positions aligned to CpuArchitecture path start points (viewBox 0 0 200 100)
const NODES = [
  { id: "ai",       label: "AI",       cx: 100, cy: 50,  r: 12, isCenter: true  },
  { id: "scamper",  label: "SCAMPER",  cx: 10,  cy: 20,  r: 8,  isCenter: false },
  { id: "triz",     label: "TRIZ",     cx: 180, cy: 10,  r: 8,  isCenter: false },
  { id: "quality",  label: "Quality",  cx: 130, cy: 20,  r: 7,  isCenter: false },
  { id: "delivery", label: "Delivery", cx: 170, cy: 80,  r: 7,  isCenter: false },
  { id: "cost",     label: "Cost",     cx: 148, cy: 65,  r: 7,  isCenter: false },
  { id: "value",    label: "Value",    cx: 95,  cy: 91,  r: 7,  isCenter: false },
  { id: "bom",      label: "BOM",      cx: 72,  cy: 83,  r: 6.5, isCenter: false },
  { id: "supply",   label: "Supply",   cx: 30,  cy: 30,  r: 7,  isCenter: false },
] as const;

type NodeId = (typeof NODES)[number]["id"];
const SATELLITE_IDS: NodeId[] = ["scamper","triz","quality","delivery","cost","value","bom","supply"];

export function VaveCard() {
  const svgRef        = useRef<SVGSVGElement>(null);
  const nodeRefs      = useRef<Map<string, SVGGElement>>(new Map());
  const edgeRefs      = useRef<Map<string, SVGLineElement>>(new Map());
  const rafRef        = useRef<number | null>(null);
  const mouseRef      = useRef({ x: -999, y: -999, active: false });

  // Physics state — kept in a ref so we never re-render from RAF
  const physRef = useRef(
    NODES.map(n => ({ x: n.cx, y: n.cy, vx: 0, vy: 0, ox: n.cx, oy: n.cy }))
  );

  // Convert client coords → SVG user-space coords (viewBox 0 0 200 100)
  const toSVG = useCallback((cx: number, cy: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: -999, y: -999 };
    const r = svg.getBoundingClientRect();
    return {
      x: ((cx - r.left)  / r.width)  * 200,
      y: ((cy - r.top)   / r.height) * 100,
    };
  }, []);

  const tick = useCallback(() => {
    const mouse = mouseRef.current;
    const phys  = physRef.current;
    let moving  = false;

    phys.forEach((p, i) => {
      const node = NODES[i];

      // Repulsion from cursor / touch point
      if (mouse.active) {
        const dx   = p.x - mouse.x;
        const dy   = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const R    = node.isCenter ? 22 : 28; // repulsion radius in SVG units

        if (dist < R) {
          const force = (1 - dist / R) * (node.isCenter ? 2.5 : 4);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Spring back to origin
      p.vx += (p.ox - p.x) * 0.09;
      p.vy += (p.oy - p.y) * 0.09;

      // Damping
      p.vx *= 0.78;
      p.vy *= 0.78;

      // Integrate
      p.x += p.vx;
      p.y += p.vy;

      if (
        Math.abs(p.vx) > 0.005 || Math.abs(p.vy) > 0.005 ||
        Math.abs(p.x - p.ox) > 0.03 || Math.abs(p.y - p.oy) > 0.03
      ) moving = true;

      // Direct DOM update — no React re-render
      const el = nodeRefs.current.get(node.id);
      if (el) el.setAttribute("transform", `translate(${p.x},${p.y})`);
    });

    // Update edge endpoints
    SATELLITE_IDS.forEach((sid) => {
      const si   = NODES.findIndex(n => n.id === sid);
      const ai   = NODES.findIndex(n => n.id === "ai");
      const sp   = phys[si];
      const ap   = phys[ai];
      const line = edgeRefs.current.get(sid);
      if (line) {
        line.setAttribute("x1", String(sp.x));
        line.setAttribute("y1", String(sp.y));
        line.setAttribute("x2", String(ap.x));
        line.setAttribute("y2", String(ap.y));
      }
    });

    rafRef.current = (moving || mouse.active)
      ? requestAnimationFrame(tick)
      : null;
  }, []);

  const startTick = useCallback(() => {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const coords = toSVG(e.clientX, e.clientY);
    mouseRef.current = { ...coords, active: true };
    startTick();
  }, [toSVG, startTick]);

  const onPointerLeave = useCallback(() => {
    mouseRef.current.active = false;
    startTick();
  }, [startTick]);

  // Touch support
  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    const coords = toSVG(t.clientX, t.clientY);
    mouseRef.current = { ...coords, active: true };
    startTick();
  }, [toSVG, startTick]);

  const onTouchEnd = useCallback(() => {
    mouseRef.current.active = false;
    startTick();
  }, [startTick]);

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="h-56 relative overflow-hidden rounded-xl select-none touch-none"
      style={{ background: "radial-gradient(ellipse at 55% 45%, oklch(0.88 0.08 280 / 0.6) 0%, oklch(0.94 0.04 200) 55%, oklch(0.97 0.015 180) 100%)" }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Circuit trace layer — CpuArchitecture paths + traveling light blobs */}
      <div className="absolute inset-0" style={{ opacity: 0.38 }}>
        <CpuArchitecture
          text="AI"
          showCpuConnections={false}
          animateText={false}
          animateMarkers={false}
          animateLines={true}
          className="text-violet-400/60"
        />
      </div>

      {/* Knowledge-graph SVG — interactive nodes + elastic edges */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 100"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* AI center sphere — teal */}
          <radialGradient id="vave-ai" cx="35%" cy="30%">
            <stop offset="0%"   stopColor="oklch(0.88 0.10 175)" />
            <stop offset="55%"  stopColor="oklch(0.68 0.13 180)" />
            <stop offset="100%" stopColor="oklch(0.45 0.14 185)" />
          </radialGradient>
          {/* Satellite nodes — black gradient */}
          <radialGradient id="vave-node" cx="35%" cy="30%">
            <stop offset="0%"   stopColor="#4a4a4a" />
            <stop offset="55%"  stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          {/* Glow filter for AI */}
          <filter id="vave-glow-ai" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Subtle glow for satellites */}
          <filter id="vave-glow-node" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Elastic edges — initial positions match path starts → AI center */}
        {SATELLITE_IDS.map((sid) => {
          const s = NODES.find(n => n.id === sid)!;
          const a = NODES.find(n => n.id === "ai")!;
          return (
            <line
              key={sid}
              ref={(el) => {
                if (el) edgeRefs.current.set(sid, el);
                else    edgeRefs.current.delete(sid);
              }}
              x1={s.cx} y1={s.cy} x2={a.cx} y2={a.cy}
              stroke="oklch(0.55 0.18 280)"
              strokeWidth="0.45"
              strokeOpacity="0.30"
              strokeDasharray="2.5 3.5"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => (
          <g
            key={node.id}
            ref={(el) => {
              if (el) nodeRefs.current.set(node.id, el);
              else    nodeRefs.current.delete(node.id);
            }}
            transform={`translate(${node.cx},${node.cy})`}
          >
            {node.isCenter ? (
              <>
                {/* Pulsing outer ring */}
                <circle r={node.r + 7} fill="oklch(0.68 0.13 180 / 0.12)" />
                <circle r={node.r + 4} fill="none"
                  stroke="oklch(0.68 0.13 180)" strokeWidth="0.5" strokeOpacity="0.4"
                  strokeDasharray="3 4" />
                {/* Main sphere */}
                <circle r={node.r} fill="url(#vave-ai)" filter="url(#vave-glow-ai)" />
                {/* Glare */}
                <ellipse cx="-3" cy="-3.5" rx="3.5" ry="2.5"
                  fill="white" fillOpacity="0.30" />
                <text
                  textAnchor="middle" dominantBaseline="central"
                  fontSize="5.5" fontWeight="700" fill="white" letterSpacing="0.08em"
                >AI</text>
              </>
            ) : (
              <>
                <circle r={node.r} fill="url(#vave-node)" fillOpacity="0.88"
                  filter="url(#vave-glow-node)" />
                <circle r={node.r} fill="none"
                  stroke="rgba(120,120,120,0.5)" strokeWidth="0.4" strokeOpacity="0.6" />
                {/* Tiny glare */}
                <ellipse cx={-(node.r * 0.28)} cy={-(node.r * 0.32)} rx={node.r * 0.32} ry={node.r * 0.22}
                  fill="white" fillOpacity="0.28" />
                <text
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={node.r > 7 ? "3.8" : "3.4"} fontWeight="600"
                  fill="white" fillOpacity="0.92"
                >{node.label}</text>
              </>
            )}
          </g>
        ))}
      </svg>

      {/* Footer */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-mono pointer-events-none">
        <span className="text-muted-foreground">SCAMPER · TRIZ</span>
        <span className="text-gradient font-bold">-23.4% cost</span>
      </div>
    </div>
  );
}

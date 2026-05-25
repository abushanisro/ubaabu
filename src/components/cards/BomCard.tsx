'use client'
import { useEffect, useRef, useState } from "react";

function CubeIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 1L9 3.5V7L5 9.5L1 7V3.5L5 1Z" stroke="currentColor" strokeWidth="1" />
      <path d="M5 1V9.5M1 3.5L9 3.5" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
    </svg>
  );
}

function HierarchyIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <rect x="3" y="0.5" width="2" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="0.5" y="5" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.7" />
      <rect x="5.5" y="5" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.7" />
      <path d="M4 2V3.5M4 3.5H1.5V5M4 3.5H6.5V5" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

const PARTS = [
  { id: "back-cover",    label: "Back Cover",    w: 18, h: 18, type: "circle",   color: "oklch(0.68 0.13 180)" },
  { id: "bearing-ring",  label: "Bearing Ring",  w: 26, h: 26, type: "ring",     color: "oklch(0.58 0.14 180)" },
  { id: "spacer",        label: "Spacer",        w: 20, h: 14, type: "ring-oval", color: "oklch(0.72 0.10 175)" },
  { id: "main-housing",  label: "Main Housing",  w: 48, h: 44, type: "housing",  color: "oklch(0.62 0.15 180)" },
  { id: "inner-bearing", label: "Inner Bearing", w: 22, h: 22, type: "ring",     color: "oklch(0.55 0.16 185)" },
  { id: "seal-ring",     label: "Seal Ring",     w: 18, h: 12, type: "ring-oval", color: "oklch(0.70 0.11 178)" },
  { id: "front-cover",   label: "Front Cover",   w: 20, h: 20, type: "circle",   color: "oklch(0.65 0.13 180)" },
];

function PartShape({ type, w, h, color, small }: { type: string; w: number; h: number; color: string; small?: boolean }) {
  const scale = small ? 0.6 : 1;
  const sw = w * scale;
  const sh = h * scale;

  if (type === "circle") {
    return (
      <div style={{
        width: sw, height: sw,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, oklch(0.82 0.10 175), ${color})`,
        boxShadow: `0 4px 12px -3px ${color}80`,
        flexShrink: 0,
      }} />
    );
  }
  if (type === "ring" || type === "ring-oval") {
    const bw = Math.max(2, sw * 0.18);
    return (
      <div style={{
        width: sw, height: sh,
        borderRadius: "50%",
        border: `${bw}px solid ${color}`,
        boxShadow: `0 0 8px ${color}60`,
        flexShrink: 0,
        background: "transparent",
      }} />
    );
  }
  // housing
  return (
    <div style={{
      width: sw, height: sh,
      borderRadius: "30%",
      background: `linear-gradient(135deg, oklch(0.75 0.12 175), ${color})`,
      boxShadow: `0 6px 16px -4px ${color}90, inset 0 -3px 8px oklch(0.3 0.12 200 / 0.3)`,
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      <div style={{ position: "absolute", top: "15%", left: "15%", width: "30%", height: "20%", borderRadius: "50%", background: "rgba(255,255,255,0.35)", filter: "blur(2px)" }} />
    </div>
  );
}

function ConnectorArcs({ visible }: { visible: boolean }) {
  const centers = [14, 42, 66, 104, 150, 179, 204];
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease 200ms" }}
      viewBox="0 0 220 60" preserveAspectRatio="none"
    >
      <defs>
        <marker id="bom-arrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <path d="M0,0 L4,2 L0,4 Z" fill="oklch(0.68 0.13 180 / 0.6)" />
        </marker>
      </defs>
      {centers.slice(0, -1).map((cx, i) => {
        const x1 = cx + 6;
        const x2 = centers[i + 1] - 6;
        const mx = (x1 + x2) / 2;
        return (
          <path key={i}
            d={`M${x1},30 Q${mx},14 ${x2},30`}
            fill="none"
            stroke="oklch(0.68 0.13 180 / 0.5)"
            strokeWidth="1"
            strokeDasharray="3 4"
            markerEnd="url(#bom-arrow)"
          />
        );
      })}
    </svg>
  );
}

function MechanicalHousing({ visible }: { visible: boolean }) {
  const bolts = Array.from({ length: 6 }, (_, i) => (i * Math.PI * 2) / 6);
  return (
    <div
      className="scene"
      style={{
        transform: visible ? "scale(1)" : "scale(0.75)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
      }}
    >
      <div
        className="preserve-3d"
        style={{
          width: 136, height: 100,
          transform: "rotateX(22deg) rotateY(-28deg)",
          animation: "drift 5s ease-in-out infinite",
        }}
      >
        {/* extruded side walls — stacked depth layers */}
        {Array.from({ length: 10 }).map((_, d) => (
          <svg key={d} width="136" height="100" viewBox="-68 -50 136 100"
            style={{ position: "absolute", top: 0, left: 0, transform: `translateZ(${-d * 1.6}px)` }}>
            <path
              d="M-50,-30 L-50,-17 L-63,-17 L-63,17 L-50,17 L-50,30 L50,30 L50,17 L63,17 L63,-17 L50,-17 L50,-30 Z"
              fill={`oklch(${0.44 - d * 0.02} 0.11 184)`}
            />
            <circle cx="0" cy="0" r="21" fill={`oklch(${0.16 - d * 0.008} 0.06 200)`} />
          </svg>
        ))}

        {/* front face */}
        <svg width="136" height="100" viewBox="-68 -50 136 100"
          style={{ position: "absolute", top: 0, left: 0, transform: "translateZ(16px)" }}>
          <defs>
            <linearGradient id="mh-face" x1="0" y1="0" x2="0.65" y2="1">
              <stop offset="0%" stopColor="oklch(0.74 0.13 175)" />
              <stop offset="55%" stopColor="oklch(0.60 0.14 182)" />
              <stop offset="100%" stopColor="oklch(0.46 0.14 188)" />
            </linearGradient>
            <radialGradient id="mh-bore" cx="38%" cy="34%">
              <stop offset="0%" stopColor="oklch(0.22 0.08 200)" />
              <stop offset="100%" stopColor="#05050f" />
            </radialGradient>
            <linearGradient id="mh-flange-l" x1="0" y1="0.5" x2="1" y2="0.5">
              <stop offset="0%" stopColor="oklch(0.52 0.13 183)" />
              <stop offset="100%" stopColor="oklch(0.60 0.13 180)" />
            </linearGradient>
            <linearGradient id="mh-flange-r" x1="0" y1="0.5" x2="1" y2="0.5">
              <stop offset="0%" stopColor="oklch(0.60 0.13 180)" />
              <stop offset="100%" stopColor="oklch(0.52 0.13 183)" />
            </linearGradient>
          </defs>

          {/* main body */}
          <rect x="-50" y="-30" width="100" height="60" rx="3" fill="url(#mh-face)" />
          {/* left flange */}
          <rect x="-63" y="-17" width="15" height="34" rx="2.5" fill="url(#mh-flange-l)" />
          {/* right flange */}
          <rect x="48" y="-17" width="15" height="34" rx="2.5" fill="url(#mh-flange-r)" />

          {/* surface ribbing */}
          {[-12, 0, 12].map((y) => (
            <line key={y} x1="-48" y1={y} x2="48" y2={y}
              stroke="oklch(0.78 0.09 176 / 0.20)" strokeWidth="0.7" />
          ))}
          {/* vertical centre line */}
          <line x1="0" y1="-28" x2="0" y2="28" stroke="oklch(0.78 0.09 176 / 0.12)" strokeWidth="0.6" />

          {/* central bore */}
          <circle cx="0" cy="0" r="21" fill="url(#mh-bore)" />
          <circle cx="0" cy="0" r="21" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="15.5" fill="none" stroke="oklch(0.68 0.13 180 / 0.45)" strokeWidth="1" />
          <circle cx="0" cy="0" r="8"   fill="none" stroke="oklch(0.68 0.13 180 / 0.25)" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="3.5" fill="oklch(0.58 0.14 185)" />

          {/* bolt holes */}
          {bolts.map((a, i) => (
            <g key={i}>
              <circle cx={Math.cos(a) * 35} cy={Math.sin(a) * 23} r="4"
                fill="url(#mh-bore)" stroke="oklch(0.68 0.13 180 / 0.65)" strokeWidth="1.2" />
              <circle cx={Math.cos(a) * 35} cy={Math.sin(a) * 23} r="1.8"
                fill="oklch(0.30 0.10 185 / 0.9)" />
            </g>
          ))}

          {/* flange bolt holes */}
          {[-9, 0, 9].map((y) => (
            <g key={y}>
              <circle cx="-59" cy={y} r="2.5" fill="url(#mh-bore)" stroke="oklch(0.68 0.13 180 / 0.5)" strokeWidth="0.9" />
              <circle cx="59"  cy={y} r="2.5" fill="url(#mh-bore)" stroke="oklch(0.68 0.13 180 / 0.5)" strokeWidth="0.9" />
            </g>
          ))}

          {/* top face highlight */}
          <path d="M-48,-28 L48,-28 L45,-22 L-45,-22 Z" fill="rgba(255,255,255,0.17)" />
          {/* left highlight */}
          <path d="M-62,-15 L-51,-15 L-51,15 L-62,15 Z" fill="rgba(255,255,255,0.10)" />
          {/* subtle rim glow */}
          <circle cx="0" cy="0" r="21" fill="none"
            stroke="oklch(0.88 0.10 175 / 0.25)" strokeWidth="1.5"
            style={{ filter: "blur(1px)" }} />
        </svg>
      </div>
    </div>
  );
}

function ExplodedSilhouette() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, flexWrap: "wrap", opacity: 0.55 }}>
      {PARTS.map((p) => (
        <PartShape key={p.id} type={p.type} w={p.w} h={p.h} color={p.color} small />
      ))}
    </div>
  );
}

function AssembledView({ visible }: { visible: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", borderRadius: "inherit", overflow: "hidden" }}>
      {/* left dark panel */}
      <div style={{
        width: "50%", background: "#1a1a1a", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", position: "relative", padding: "8px",
      }}>
        <div style={{
          position: "absolute", top: 8, left: 8,
          fontSize: 8, fontFamily: "monospace", color: "oklch(0.68 0.13 180)",
          background: "oklch(0.68 0.13 180 / 0.15)", padding: "2px 6px", borderRadius: 4,
          letterSpacing: "0.05em", textTransform: "uppercase",
        }}>3D Model</div>
        <MechanicalHousing visible={visible} />
      </div>
      {/* right teal panel */}
      <div style={{
        width: "50%",
        background: "linear-gradient(135deg, oklch(0.94 0.06 180) 0%, oklch(0.98 0.01 200) 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative", padding: "8px",
      }}>
        <div style={{
          position: "absolute", top: 8, left: 8,
          fontSize: 8, fontFamily: "monospace", color: "oklch(0.52 0.14 180)",
          background: "oklch(0.68 0.13 180 / 0.15)", padding: "2px 6px", borderRadius: 4,
          letterSpacing: "0.05em", textTransform: "uppercase",
        }}>Exploded View</div>
        <ExplodedSilhouette />
      </div>
    </div>
  );
}

function ExplodedView({ visible, exploded }: { visible: boolean; exploded: boolean }) {
  return (
    <div style={{
      position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden",
      background: "linear-gradient(135deg, oklch(0.92 0.06 180) 0%, #ffffff 60%, oklch(0.92 0.06 180) 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, paddingInline: 12 }}>
        <ConnectorArcs visible={exploded} />
        {PARTS.map((p, i) => (
          <div key={p.id} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            transform: exploded ? "translateX(0)" : `translateX(${(i - 3) * 0.3 * 32}px)`,
            transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms`,
            opacity: visible ? 1 : 0,
          }}>
            <PartShape type={p.type} w={p.w} h={p.h} color={p.color} />
            <span style={{ fontSize: 7, color: "oklch(0.45 0.10 185)", fontFamily: "monospace", whiteSpace: "nowrap" }}>{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsBar({ exploded }: { exploded: boolean }) {
  const teal = "oklch(0.52 0.14 180)";
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 32,
      display: "flex", alignItems: "center", paddingInline: 12, gap: 6,
      justifyContent: exploded ? "center" : "space-between",
      background: exploded ? "oklch(0.95 0.04 180 / 0.6)" : "transparent",
      backdropFilter: exploded ? "blur(4px)" : "none",
      transition: "background 0.4s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, color: exploded ? teal : "oklch(0.5 0.03 200)" }}>
        <CubeIcon />
        <span style={{ fontSize: 10, fontFamily: "monospace" }}>204 parts</span>
      </div>
      {exploded && <div style={{ width: 1, height: 14, background: "oklch(0.68 0.13 180 / 0.4)" }} />}
      <div style={{ display: "flex", alignItems: "center", gap: 4, color: exploded ? teal : "oklch(0.5 0.03 200)" }}>
        <HierarchyIcon />
        <span style={{ fontSize: 10, fontFamily: "monospace" }}>12 assemblies</span>
      </div>
    </div>
  );
}

export function BomCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-56 relative rounded-xl overflow-hidden"
      onMouseEnter={() => setExploded(true)}
      onMouseLeave={() => setExploded(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        cursor: "default",
      }}
    >
      {/* assembled view */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden",
        opacity: exploded ? 0 : 1, transition: "opacity 0.35s ease",
        pointerEvents: "none",
      }}>
        <AssembledView visible={visible} />
      </div>

      {/* exploded view */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden",
        opacity: exploded ? 1 : 0, transition: "opacity 0.35s ease",
        pointerEvents: "none",
      }}>
        <ExplodedView visible={visible} exploded={exploded} />
      </div>

      <StatsBar exploded={exploded} />
    </div>
  );
}

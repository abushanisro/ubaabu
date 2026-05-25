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

// Round to 4 dp so SSR and client produce identical attribute strings
const r4 = (n: number) => Math.round(n * 10000) / 10000;

const PARTS = [
  { id: "housing",    label: "Housing",    type: "housing" },
  { id: "outer-ring", label: "Outer Ring", type: "outer-ring" },
  { id: "disc",       label: "Cover",      type: "disc" },
  { id: "spacer",     label: "Spacer",     type: "spacer" },
  { id: "bearing",    label: "Bearing",    type: "bearing" },
  { id: "seal",       label: "Seal",       type: "seal" },
  { id: "cap",        label: "End Cap",    type: "cap" },
];

function renderPart(type: string, s = 1, pfx = "ep") {
  const D = "#05050f";
  switch (type) {
    case "housing": {
      const g = `${pfx}-hf`;
      return (
        <svg width={52 * s} height={40 * s} viewBox="-26 -20 52 40">
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="0.65" y2="1">
              <stop offset="0%" stopColor="oklch(0.70 0.13 176)" />
              <stop offset="100%" stopColor="oklch(0.47 0.14 187)" />
            </linearGradient>
          </defs>
          <rect x="-18" y="-13" width="36" height="26" rx="2" fill={`url(#${g})`} />
          <rect x="-25" y="-8" width="9" height="16" rx="1.5" fill="oklch(0.55 0.13 183)" />
          <rect x="16" y="-8" width="9" height="16" rx="1.5" fill="oklch(0.55 0.13 183)" />
          <circle cx="0" cy="0" r="8" fill={D} stroke="oklch(0.68 0.13 180)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5.5" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.7" strokeOpacity="0.4" />
          <circle cx="0" cy="0" r="2.5" fill="oklch(0.58 0.14 185)" />
          {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((a, i) => (
            <circle key={i} cx={r4(Math.cos(a) * 14)} cy={r4(Math.sin(a) * 9)} r="2"
              fill={D} stroke="oklch(0.68 0.13 180)" strokeWidth="0.8" strokeOpacity="0.6" />
          ))}
          <rect x="-17" y="-12" width="34" height="4" rx="1" fill="white" fillOpacity="0.15" />
        </svg>
      );
    }
    case "outer-ring": {
      return (
        <svg width={36 * s} height={36 * s} viewBox="-18 -18 36 36">
          <circle cx="0" cy="0" r="16" fill="oklch(0.60 0.14 181)" />
          <circle cx="0" cy="0" r="10" fill={D} />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i * Math.PI) / 3;
            return (
              <circle key={i} cx={r4(Math.cos(a) * 13.5)} cy={r4(Math.sin(a) * 13.5)} r="1.8"
                fill={D} stroke="oklch(0.68 0.13 180)" strokeWidth="0.8" strokeOpacity="0.6" />
            );
          })}
          <circle cx="0" cy="0" r="16" fill="none" stroke="oklch(0.78 0.12 175)" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="10" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.8" strokeOpacity="0.45" />
          <path d="M-15,-10 A16,16 0 0,1 10,-13" fill="white" fillOpacity="0.15" />
        </svg>
      );
    }
    case "disc": {
      const g = `${pfx}-dc`;
      return (
        <svg width={28 * s} height={28 * s} viewBox="-14 -14 28 28">
          <defs>
            <radialGradient id={g} cx="38%" cy="35%">
              <stop offset="0%" stopColor="oklch(0.76 0.12 175)" />
              <stop offset="100%" stopColor="oklch(0.52 0.14 184)" />
            </radialGradient>
          </defs>
          <circle cx="0" cy="0" r="13" fill={`url(#${g})`} />
          <circle cx="0" cy="0" r="9" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.8" strokeOpacity="0.4" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.6" strokeOpacity="0.3" />
          <circle cx="0" cy="0" r="2" fill="oklch(0.55 0.14 185)" />
          <circle cx="0" cy="0" r="13" fill="none" stroke="oklch(0.78 0.12 175)" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d="M-12,-8 A13,13 0 0,1 8,-10" fill="white" fillOpacity="0.18" />
        </svg>
      );
    }
    case "spacer": {
      return (
        <svg width={26 * s} height={18 * s} viewBox="-13 -9 26 18">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="oklch(0.62 0.13 180)" />
          <ellipse cx="0" cy="0" rx="7" ry="4.5" fill={D} />
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="none" stroke="oklch(0.78 0.12 175)" strokeWidth="0.8" strokeOpacity="0.5" />
          <ellipse cx="0" cy="0" rx="7" ry="4.5" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.7" strokeOpacity="0.45" />
          <path d="M-10,-6 A12,8 0 0,1 10,-6" fill="white" fillOpacity="0.18" />
        </svg>
      );
    }
    case "bearing": {
      return (
        <svg width={30 * s} height={30 * s} viewBox="-15 -15 30 30">
          <circle cx="0" cy="0" r="13.5" fill="oklch(0.58 0.14 182)" />
          <circle cx="0" cy="0" r="8.5" fill={D} />
          <circle cx="0" cy="0" r="13.5" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.7" strokeOpacity="0.4" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = (i * Math.PI) / 4;
            return (
              <circle key={i} cx={r4(Math.cos(a) * 10.5)} cy={r4(Math.sin(a) * 10.5)} r="1.6"
                fill="oklch(0.72 0.11 178)" stroke="oklch(0.52 0.14 185)" strokeWidth="0.5" strokeOpacity="0.6" />
            );
          })}
          <circle cx="0" cy="0" r="5" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.7" strokeOpacity="0.4" />
          <circle cx="0" cy="0" r="2.5" fill="oklch(0.55 0.14 185)" />
          <path d="M-12,-9 A13.5,13.5 0 0,1 9,-10" fill="white" fillOpacity="0.15" />
        </svg>
      );
    }
    case "seal": {
      return (
        <svg width={24 * s} height={12 * s} viewBox="-12 -6 24 12">
          <ellipse cx="0" cy="0" rx="11" ry="5" fill="oklch(0.65 0.12 179)" />
          <ellipse cx="0" cy="0" rx="6.5" ry="3" fill={D} />
          <ellipse cx="0" cy="0" rx="11" ry="5" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.8" strokeOpacity="0.6" />
          <ellipse cx="0" cy="0" rx="6.5" ry="3" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.6" strokeOpacity="0.5" />
          <path d="M-9,-4 A11,5 0 0,1 9,-4" fill="white" fillOpacity="0.2" />
        </svg>
      );
    }
    case "cap": {
      const g = `${pfx}-cp`;
      return (
        <svg width={24 * s} height={24 * s} viewBox="-12 -12 24 24">
          <defs>
            <radialGradient id={g} cx="40%" cy="36%">
              <stop offset="0%" stopColor="oklch(0.74 0.12 176)" />
              <stop offset="100%" stopColor="oklch(0.50 0.14 186)" />
            </radialGradient>
          </defs>
          <circle cx="0" cy="0" r="11" fill={`url(#${g})`} />
          <circle cx="0" cy="0" r="7" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.7" strokeOpacity="0.35" />
          <circle cx="0" cy="0" r="3" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="0.6" strokeOpacity="0.25" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="oklch(0.78 0.12 175)" strokeWidth="0.9" strokeOpacity="0.5" />
          <path d="M-10,-7 A11,11 0 0,1 7,-8" fill="white" fillOpacity="0.2" />
        </svg>
      );
    }
    default:
      return null;
  }
}

function ConnectorArcs({ visible }: { visible: boolean }) {
  const centers = [22, 58, 90, 120, 152, 182, 210];
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
        opacity: visible ? 1 : 0, transition: "opacity 0.3s ease 200ms" }}
      viewBox="0 0 232 52" preserveAspectRatio="none"
    >
      <defs>
        <marker id="bom-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0.5 L4.5,2.5 L0,4.5 Z" fill="oklch(0.68 0.13 180 / 0.7)" />
        </marker>
      </defs>
      {centers.slice(0, -1).map((cx, i) => {
        const x1 = cx + 9;
        const x2 = centers[i + 1] - 9;
        const mx = (x1 + x2) / 2;
        return (
          <path key={i}
            d={`M${x1},26 Q${mx},10 ${x2},26`}
            fill="none"
            stroke="oklch(0.68 0.13 180 / 0.55)"
            strokeWidth="1.1"
            strokeDasharray="3 4"
            markerEnd="url(#bom-arr)"
          />
        );
      })}
    </svg>
  );
}

function ExplodedSilhouette() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, flexWrap: "wrap", opacity: 0.55 }}>
      {PARTS.map((p) => (
        <div key={p.id}>{renderPart(p.type, 0.5, "sil")}</div>
      ))}
    </div>
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
          <rect x="-50" y="-30" width="100" height="60" rx="3" fill="url(#mh-face)" />
          <rect x="-63" y="-17" width="15" height="34" rx="2.5" fill="url(#mh-flange-l)" />
          <rect x="48" y="-17" width="15" height="34" rx="2.5" fill="url(#mh-flange-r)" />
          {[-12, 0, 12].map((y) => (
            <line key={y} x1="-48" y1={y} x2="48" y2={y} stroke="oklch(0.78 0.09 176 / 0.20)" strokeWidth="0.7" />
          ))}
          <line x1="0" y1="-28" x2="0" y2="28" stroke="oklch(0.78 0.09 176 / 0.12)" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="21" fill="url(#mh-bore)" />
          <circle cx="0" cy="0" r="21" fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="15.5" fill="none" stroke="oklch(0.68 0.13 180 / 0.45)" strokeWidth="1" />
          <circle cx="0" cy="0" r="8" fill="none" stroke="oklch(0.68 0.13 180 / 0.25)" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="3.5" fill="oklch(0.58 0.14 185)" />
          {bolts.map((a, i) => (
            <g key={i}>
              <circle cx={r4(Math.cos(a) * 35)} cy={r4(Math.sin(a) * 23)} r="4"
                fill="url(#mh-bore)" stroke="oklch(0.68 0.13 180 / 0.65)" strokeWidth="1.2" />
              <circle cx={r4(Math.cos(a) * 35)} cy={r4(Math.sin(a) * 23)} r="1.8"
                fill="oklch(0.30 0.10 185 / 0.9)" />
            </g>
          ))}
          {[-9, 0, 9].map((y) => (
            <g key={y}>
              <circle cx="-59" cy={y} r="2.5" fill="url(#mh-bore)" stroke="oklch(0.68 0.13 180 / 0.5)" strokeWidth="0.9" />
              <circle cx="59" cy={y} r="2.5" fill="url(#mh-bore)" stroke="oklch(0.68 0.13 180 / 0.5)" strokeWidth="0.9" />
            </g>
          ))}
          <path d="M-48,-28 L48,-28 L45,-22 L-45,-22 Z" fill="rgba(255,255,255,0.17)" />
          <path d="M-62,-15 L-51,-15 L-51,15 L-62,15 Z" fill="rgba(255,255,255,0.10)" />
          <circle cx="0" cy="0" r="21" fill="none"
            stroke="oklch(0.88 0.10 175 / 0.25)" strokeWidth="1.5"
            style={{ filter: "blur(1px)" }} />
        </svg>
      </div>
    </div>
  );
}

function AssembledView({ visible }: { visible: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", borderRadius: "inherit", overflow: "hidden" }}>
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
      background: "linear-gradient(135deg, oklch(0.92 0.06 180) 0%, #ffffff 58%, oklch(0.93 0.05 180) 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 5, paddingInline: 8 }}>
        <ConnectorArcs visible={exploded} />
        {PARTS.map((p, i) => (
          <div key={p.id} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            transform: exploded ? "translateX(0)" : `translateX(${(i - 3) * 0.3 * 32}px)`,
            transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms`,
            opacity: visible ? 1 : 0,
          }}>
            {renderPart(p.type, 1, "exv")}
            <span style={{ fontSize: 7, color: "oklch(0.45 0.10 185)", fontFamily: "monospace", whiteSpace: "nowrap" }}>
              {p.label}
            </span>
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
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden",
        opacity: exploded ? 0 : 1, transition: "opacity 0.35s ease",
        pointerEvents: "none",
      }}>
        <AssembledView visible={visible} />
      </div>
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

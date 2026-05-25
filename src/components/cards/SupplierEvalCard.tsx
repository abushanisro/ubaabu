'use client'
import { useCallback, useEffect, useRef, useState } from "react";

const BASE = [
  { name: "Supplier A", score: 92, color: "oklch(0.68 0.13 180)" },
  { name: "Supplier B", score: 78, color: "oklch(0.55 0.16 185)" },
  { name: "Supplier C", score: 85, color: "oklch(0.45 0.14 175)" },
  { name: "Supplier D", score: 64, color: "oklch(0.35 0.10 180)" },
];

// slight random fluctuation around base score
function fluctuate(base: number) {
  return Math.min(99, Math.max(50, base + Math.round((Math.random() - 0.5) * 8)));
}

function FactoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="8" width="16" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 8l4-4v4M9 8l4-4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="6" y="11" width="2.5" height="3" rx="0.4" fill="currentColor" opacity="0.5" />
      <rect x="9.5" y="11" width="2.5" height="3" rx="0.4" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function SupplierEvalCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scores, setScores] = useState(BASE.map(s => s.score));
  const replayTimer = useRef<ReturnType<typeof setTimeout>>();

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

  const replay = useCallback(() => {
    clearTimeout(replayTimer.current);
    setVisible(false);
    replayTimer.current = setTimeout(() => setVisible(true), 40);
  }, []);

  useEffect(() => () => clearTimeout(replayTimer.current), []);

  // continuously adjust scores every 1.8s once visible
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setScores(BASE.map(s => fluctuate(s.score)));
    }, 1800);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <div ref={ref} className="h-56 relative rounded-xl overflow-hidden" onMouseEnter={replay}
      style={{ background: "linear-gradient(135deg, oklch(0.97 0.02 180) 0%, oklch(0.99 0.005 200) 100%)" }}>

      <div className="absolute inset-0 flex flex-col justify-center px-4 gap-2.5">
        {BASE.map((s, i) => (
          <div
            key={s.name}
            className="flex items-center gap-2.5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.5s ease ${i * 90}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`,
              animation: visible ? `drift ${3.5 + i * 0.4}s ${i * 0.15}s ease-in-out infinite` : "none",
            }}
          >
            {/* icon */}
            <span className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-white"
              style={{ background: s.color }}>
              <FactoryIcon />
            </span>

            {/* name */}
            <span className="text-[11px] font-semibold text-gray-700 w-20 flex-shrink-0">{s.name}</span>

            {/* bar track */}
            <div className="flex-1 h-2 rounded-full bg-black/8 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: visible ? `${scores[i]}%` : "0%",
                  background: `linear-gradient(90deg, ${s.color}, oklch(0.78 0.13 175))`,
                  transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: `0 0 8px ${s.color}80`,
                }}
              />
            </div>

            {/* score */}
            <span className="text-[11px] font-bold flex-shrink-0 w-6 text-right tabular-nums"
              style={{ color: s.color, transition: "color 0.3s" }}>
              {scores[i]}
            </span>
          </div>
        ))}
      </div>

      {/* bottom label */}
      <div className="absolute bottom-2 left-4 right-4 flex justify-between"
        style={{ opacity: visible ? 0.5 : 0, transition: "opacity 0.6s ease 400ms" }}>
        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Feasibility Score</span>
        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">/ 100</span>
      </div>
    </div>
  );
}

'use client'
import { useCallback, useEffect, useRef, useState } from "react";

const steps = [
  { label: "ISIR",  done: true,  hue: 180 },
  { label: "PPAP",  done: true,  hue: 185 },
  { label: "Batch", done: true,  hue: 190 },
  { label: "Mass",  done: false, hue: 180 },
];

export function ProductionCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const stepTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runSteps = useCallback(() => {
    stepTimers.current.forEach(clearTimeout);
    setShown(0);
    stepTimers.current = steps.map((_, i) =>
      setTimeout(() => setShown(i + 1), 40 + i * 420)
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { obs.disconnect(); runSteps(); } },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [runSteps]);

  useEffect(() => () => stepTimers.current.forEach(clearTimeout), []);

  return (
    <div ref={ref} className="h-56 relative flex flex-col justify-center gap-3 py-2" onMouseEnter={runSteps}>
      {steps.map((s, i) => {
        const visible = i < shown;
        return (
          <div
            key={s.label}
            className="flex items-center gap-3 relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* step number badge */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{
                background: s.done
                  ? `linear-gradient(135deg, oklch(0.78 0.13 ${s.hue}), oklch(0.55 0.16 ${s.hue}))`
                  : "oklch(0.93 0.01 200)",
                color: s.done ? "white" : "oklch(0.55 0.04 220)",
                boxShadow: s.done ? `0 4px 12px -3px oklch(0.55 0.16 ${s.hue} / 0.5)` : "none",
              }}
            >
              {i + 1}
            </div>

            {/* step row */}
            <div
              className="flex-1 h-10 rounded-xl overflow-hidden relative"
              style={{
                background: s.done
                  ? `linear-gradient(90deg, oklch(0.94 0.06 ${s.hue}), oklch(0.84 0.10 ${s.hue} / 0.7))`
                  : "oklch(0.96 0.005 200)",
                boxShadow: s.done
                  ? `inset 0 -2px 6px oklch(0.55 0.14 ${s.hue} / 0.2), 0 4px 10px -3px oklch(0.55 0.12 ${s.hue} / 0.25)`
                  : "inset 0 0 0 1px var(--border)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-3">
                <span className={`text-xs font-semibold ${s.done ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label} Production
                </span>
                <span className={`text-[10px] font-mono ${s.done ? "text-foreground/70" : "text-muted-foreground"}`}>
                  {s.done ? "✓ Complete" : "○ Planning"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

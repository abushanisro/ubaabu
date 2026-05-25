const suppliers = [
  { name: "A", score: 92, hue: 180 },
  { name: "B", score: 78, hue: 195 },
  { name: "C", score: 85, hue: 260 },
  { name: "D", score: 64, hue: 300 },
];

export function SupplierEvalCard() {
  return (
    <div className="h-56 relative">
      <div className="scene h-44 flex items-end justify-center gap-5">
        {suppliers.map((s, i) => {
          const h = (s.score / 100) * 130;
          return (
            <div key={s.name} className="preserve-3d relative" style={{ transform: "rotateX(20deg) rotateY(-15deg)", animation: `drift 4s ${i * 0.2}s ease-in-out infinite` }}>
              <div
                className="w-10 relative rounded-t-md"
                style={{
                  height: h,
                  background: `linear-gradient(180deg, oklch(0.85 0.14 ${s.hue}), oklch(0.55 0.16 ${s.hue}))`,
                  boxShadow: `0 14px 30px -8px oklch(0.55 0.16 ${s.hue} / 0.6), inset -6px 0 8px oklch(0 0 0 / 0.15)`,
                  animation: `growUp 0.9s ${i * 100}ms both`,
                }}
              >
                <div className="absolute -top-1.5 left-0 right-0 h-3 rounded-sm" style={{ background: `oklch(0.92 0.1 ${s.hue})`, transform: "skewX(-30deg) translateX(2px)" }} />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-card border border-border shadow">
                  {s.score}
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full" style={{ background: `oklch(0.55 0.16 ${s.hue} / 0.3)`, filter: "blur(4px)" }} />
              <div className="text-center text-[11px] mt-3 font-medium">{`Supplier ${s.name}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

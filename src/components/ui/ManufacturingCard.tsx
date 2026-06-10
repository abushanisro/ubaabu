'use client'
import { useRef, useState, type ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ManufacturingCard({ title, description, children, className = "", onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(1100px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`,
    });
  };
  const reset = () => setStyle({ transform: "perspective(1100px) rotateX(0) rotateY(0)" });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={style}
      className={`card-3d card-shadow hover:card-shadow-hover rounded-2xl bg-card p-6 border border-gray-200/60 hover:border-black relative overflow-hidden group cursor-pointer transition-colors duration-300 ${className}`}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      {/* teal corner accent - top-left, extends to 50% of each edge */}
      <span className="absolute top-0 left-0 w-1/2 h-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <span className="absolute top-0 left-0 w-full h-[2px]" style={{ background: "linear-gradient(to right, oklch(0.68 0.13 180), transparent)" }} />
        <span className="absolute top-0 left-0 h-full w-[2px]" style={{ background: "linear-gradient(to bottom, oklch(0.68 0.13 180), transparent)" }} />
      </span>
      <div className="mb-2 relative flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground tracking-tight">{title}</h3>
        {/* Enterprise-style icon container */}
        <span
          className="relative flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(45,212,191,0.22)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: '0 0 0 6px rgba(20,184,166,0.08)' }}
          />
          <svg width="12" height="12" fill="none" strokeWidth="2" viewBox="0 0 12 12" style={{ color: '#0d9488' }} stroke="currentColor">
            <path d="M7 1h4v4M11 1L6.5 5.5M5 11H1V7M1 11l4.5-4.5" />
          </svg>
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-5 max-w-[90%] relative">{description}</p>
      <div className="relative">{children}</div>
    </div>
  );
}

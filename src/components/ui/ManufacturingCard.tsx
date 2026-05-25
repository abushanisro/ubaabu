'use client'
import { useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function ManufacturingCard({ title, description, children, className = "" }: Props) {
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
      style={style}
      className={`card-3d card-shadow hover:card-shadow-hover rounded-2xl bg-card p-6 border border-border/40 relative overflow-hidden group ${className}`}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between mb-2 relative">
        <h3 className="text-lg font-semibold text-foreground tracking-tight">{title}</h3>
        <button className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-5 max-w-[90%] relative">{description}</p>
      <div className="relative">{children}</div>
    </div>
  );
}

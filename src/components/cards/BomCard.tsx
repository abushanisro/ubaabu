'use client'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function BomCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <Image
        src="/assets/home/bom.png"
        alt="Bill of materials"
        fill
        className="object-cover"
      />
    </div>
  );
}

'use client'
import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";

// reaviz (+ its d3 deps) is the heaviest library on the homepage; keep it out of
// the initial bundle and only fetch/mount the chart once the card nears the viewport.
const QualityAreaChartCard = dynamic(() => import("@/components/ui/area-chart-1"), {
  ssr: false,
  loading: () => null,
});

export function QualityCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "300px" });

  return (
    <div ref={ref} className="h-56 relative">
      {inView && <QualityAreaChartCard />}
    </div>
  );
}

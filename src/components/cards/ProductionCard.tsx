'use client'
import { AgentTrace, type TraceSpan } from "@/components/ui/agent-trace";

const SPANS: TraceSpan[] = [
  { id: "isir", label: "ISIR Submission", kind: "tool", start: 0, end: 900, detail: "Sample approved" },
  { id: "ppap", label: "PPAP Lot", kind: "tool", start: 950, end: 2200, detail: "18 elements closed" },
  { id: "batch", label: "Batch Production", kind: "tool", start: 2250, end: 3600, detail: "Lot released" },
  { id: "mass", label: "Mass Production", kind: "agent", start: 3650, end: 5200, detail: "In progress" },
];

const TOTAL = 5200;

export function ProductionCard() {
  return (
    <div className="h-56 relative flex items-center">
      <AgentTrace
        spans={SPANS}
        duration={TOTAL}
        runId="lot_2026Q1"
        model="Line A"
        autoPlay
        loop
        holdMs={1400}
        showRuler={false}
        showTokens={false}
        rowHeight={22}
        className="border-0 shadow-none bg-transparent"
      />
    </div>
  );
}

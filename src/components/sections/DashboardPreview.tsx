import { Home, Folder, Building2, FileText, Truck, Settings, Search, Bell, Box, Users, ClipboardList } from "lucide-react";

const stats = [
  { icon: Folder, label: "Projects", value: 24 },
  { icon: Building2, label: "Suppliers", value: 128 },
  { icon: FileText, label: "POs", value: 56 },
  { icon: Truck, label: "Deliveries", value: 32 },
];

const rows = [
  { p: "Project Alpha", stage: "Production", pct: 75, status: "On Track", amber: false },
  { p: "Project Beta", stage: "Quality", pct: 90, status: "On Track", amber: false },
  { p: "Project Gamma", stage: "Delivery", pct: 60, status: "At Risk", amber: true },
  { p: "Project Delta", stage: "Planning", pct: 30, status: "On Track", amber: false },
  { p: "Project Epsilon", stage: "VAVE", pct: 80, status: "On Track", amber: false },
];

export function DashboardPreview() {
  return (
    <div className="rounded-2xl bg-card border border-border/40 card-shadow overflow-hidden flex">
      <div className="w-14 bg-slate-900 flex flex-col items-center py-4 gap-3">
        {[Home, Folder, Box, Building2, ClipboardList, Truck, Users, Settings].map((Icon, i) => (
          <button key={i} className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
            i === 0 ? "gradient-primary text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}>
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
      <div className="flex-1 p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="bg-transparent outline-none text-xs flex-1 text-muted-foreground">Search anything...</span>
          </div>
          <button className="relative w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">2</span>
          </button>
          <div className="w-9 h-9 rounded-full gradient-primary" />
        </div>
        <div className="grid grid-cols-4 gap-3 mb-5">
          {stats.map((s) => (
            <div key={s.label} className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                <s.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
                <div className="text-lg font-bold tabular-nums text-foreground">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs font-semibold mb-2 text-foreground">Recent Activity</div>
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <div className="grid grid-cols-5 gap-2 px-3 py-2 bg-muted/40 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <div>Project</div><div>Stage</div><div>Progress</div><div>Status</div><div>Updated</div>
          </div>
          {rows.map((r) => (
            <div key={r.p} className="grid grid-cols-5 gap-2 px-3 py-2.5 text-xs border-t border-border/50 items-center">
              <div className="font-medium text-foreground">{r.p}</div>
              <div className="text-muted-foreground">{r.stage}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-primary" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="tabular-nums text-[10px] text-foreground">{r.pct}%</span>
              </div>
              <div className={`font-medium ${r.amber ? "text-amber-600" : "text-primary"}`}>
                {r.amber ? "⚠ " : "✓ "}{r.status}
              </div>
              <div className="text-muted-foreground text-[10px]">May 23, 2025</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

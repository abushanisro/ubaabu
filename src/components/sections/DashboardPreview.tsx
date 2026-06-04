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
      {/* Sidebar — hidden below lg */}
      <div className="hidden lg:flex w-14 bg-slate-900 flex-col items-center py-4 gap-3">
        {[Home, Folder, Box, Building2, ClipboardList, Truck, Users, Settings].map((Icon, i) => (
          <button key={i} className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
            i === 0 ? "gradient-primary text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}>
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="bg-transparent outline-none text-xs flex-1 text-muted-foreground truncate">Search anything...</span>
          </div>
          <button className="relative shrink-0 w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">2</span>
          </button>
          <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-black/10 bg-white flex items-center justify-center">
            <img src="/assets/infographics/logo/logo-black.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
          </div>
        </div>

        {/* Stats — 2 cols on mobile, 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {stats.map((s) => (
            <div key={s.label} className="p-2.5 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-2">
              <div className="shrink-0 w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                <s.icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-muted-foreground truncate">{s.label}</div>
                <div className="text-base font-bold tabular-nums text-foreground">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs font-semibold mb-2 text-foreground">Recent Activity</div>

        {/* Table */}
        <div className="rounded-xl border border-border/50 overflow-hidden">
          {/* Header — 3 cols on mobile, 5 on md+ */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 px-3 py-2 bg-muted/40 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <div>Project</div>
            <div className="hidden md:block">Stage</div>
            <div>Progress</div>
            <div>Status</div>
            <div className="hidden md:block">Updated</div>
          </div>
          {rows.map((r) => (
            <div key={r.p} className="grid grid-cols-3 md:grid-cols-5 gap-2 px-3 py-2 text-xs border-t border-border/50 items-center">
              <div className="font-medium text-foreground truncate">{r.p}</div>
              <div className="hidden md:block text-muted-foreground">{r.stage}</div>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-primary" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="tabular-nums text-[10px] text-foreground shrink-0">{r.pct}%</span>
              </div>
              <div className={`font-medium text-[11px] ${r.amber ? "text-amber-600" : "text-primary"}`}>
                {r.amber ? "⚠ " : "✓ "}{r.status}
              </div>
              <div className="hidden md:block text-muted-foreground text-[10px]">May 23, 2025</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/_core/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Activity, ArrowUpRight, Bell, Bot, Boxes, CheckCircle2, ChevronRight, CircleAlert, CloudCog, Command, ExternalLink, FileCheck2, LayoutDashboard, LifeBuoy, LogIn, Menu, PackageCheck, PanelLeft, RefreshCw, Search, Settings2, ShieldCheck, Sparkles, Users, X } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";

const nav = [
  { label: "Command center", icon: LayoutDashboard, active: true },
  { label: "Product pipeline", icon: PackageCheck },
  { label: "Review queue", icon: FileCheck2, count: 7 },
  { label: "Market signals", icon: Activity },
];

const secondaryNav = [
  { label: "Integrations", icon: Boxes },
  { label: "Team & access", icon: Users },
  { label: "Workspace settings", icon: Settings2 },
];

const statusMeta: Record<string, { label: string; className: string }> = {
  review: { label: "In review", className: "bg-amber-50 text-amber-700 border-amber-200" },
  in_development: { label: "In development", className: "bg-sky-50 text-sky-700 border-sky-200" },
  blocked: { label: "Blocked", className: "bg-rose-50 text-rose-700 border-rose-200" },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  draft: { label: "Draft", className: "bg-slate-50 text-slate-600 border-slate-200" },
};

function formatRelative(date: Date | string) {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(date).getTime()) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <>
    {open && <button aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" />}
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[252px] -translate-x-full flex-col border-r border-slate-200 bg-[#fbfcfd] transition-transform lg:static lg:translate-x-0", open && "translate-x-0")}>
      <div className="flex h-[78px] items-center justify-between border-b border-slate-200 px-5">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#162b4d] text-white shadow-sm"><Sparkles className="h-4 w-4" /></div><div><p className="text-sm font-semibold tracking-tight text-slate-900">RetailForge</p><p className="text-[10px] uppercase tracking-[0.19em] text-slate-400">AI workspace</p></div></div>
        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 lg:hidden" onClick={onClose}><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
        <nav className="space-y-1">{nav.map((item) => <button key={item.label} className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors", item.active ? "bg-[#e8eef7] font-semibold text-[#1c3f70]" : "text-slate-600 hover:bg-slate-100")}><span className="flex items-center gap-3"><item.icon className="h-4 w-4" />{item.label}</span>{item.count && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">{item.count}</span>}</button>)}</nav>
        <p className="px-3 pb-2 pt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Manage</p>
        <nav className="space-y-1">{secondaryNav.map((item) => <button key={item.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-slate-600 transition-colors hover:bg-slate-100"><item.icon className="h-4 w-4" />{item.label}</button>)}</nav>
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><div className="flex items-center gap-2 text-xs font-semibold text-slate-800"><ShieldCheck className="h-4 w-4 text-emerald-600" />Safe mode active</div><p className="mt-2 text-[11px] leading-relaxed text-slate-500">AI suggestions are validated before they can reach your product records.</p><button className="mt-3 text-[11px] font-semibold text-[#1c5d9e]">View policy <ArrowUpRight className="ml-1 inline h-3 w-3" /></button></div>
      </div>
      <div className="border-t border-slate-200 p-4"><div className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#dce9f7] text-xs font-bold text-[#1c5d9e]">MC</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-800">Maya Chen</p><p className="truncate text-[11px] text-slate-400">Product operations</p></div><button className="text-slate-400 hover:text-slate-700"><Settings2 className="h-4 w-4" /></button></div></div>
    </aside>
  </>;
}

export default function Home() {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch, isFetching } = trpc.dashboard.overview.useQuery();
  const [mobileNav, setMobileNav] = useState(false);
  const overview = data;
  const metricCards: Array<[string, string | number, string, LucideIcon, string]> = [
    ["Active products", overview?.metrics.activeProducts ?? 0, "Across 4 categories", PackageCheck, "text-[#1c5d9e]"],
    ["Needs your review", overview?.metrics.needsReview ?? 0, "2 critical · 5 standard", FileCheck2, "text-amber-600"],
    ["Signals this week", overview?.metrics.weeklySignals ?? 0, "+18% vs last week", Activity, "text-violet-600"],
    ["Readiness score", `${overview?.metrics.readiness ?? 0}%`, "Target: 85%", CheckCircle2, "text-emerald-600"],
  ];
  return <div className="min-h-screen bg-[#f5f7fa] text-slate-900">
    <div className="flex min-h-screen">
      <Sidebar open={mobileNav} onClose={() => setMobileNav(false)} />
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-slate-200 bg-[#f5f7fa]/90 px-4 backdrop-blur sm:px-6 lg:px-10"><div className="flex items-center gap-3"><button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 lg:hidden" onClick={() => setMobileNav(true)}><Menu className="h-4 w-4" /></button><div><div className="flex items-center gap-2 text-xs text-slate-400"><span>Workspace</span><ChevronRight className="h-3 w-3" /><span className="text-slate-600">Command center</span></div><h1 className="mt-1 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">Good morning, Maya</h1></div></div><div className="flex items-center gap-2"><button className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 sm:flex sm:items-center sm:gap-2"><Search className="h-3.5 w-3.5" />Search <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-400">⌘ K</kbd></button><button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm hover:bg-slate-50"><Bell className="h-4 w-4" /></button>{!user && <Button variant="outline" size="sm" onClick={() => startLogin()}><LogIn className="mr-1.5 h-3.5 w-3.5" />Sign in</Button>}</div></header>
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Here’s the pulse of your product workspace.</p><div className="mt-2 flex items-center gap-2 text-xs text-slate-400"><span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />{overview?.tenant.name ?? "Loading workspace"}{overview?.tenant.demo && <Badge variant="outline" className="ml-1 border-amber-200 bg-amber-50 text-[10px] text-amber-700">Demo data</Badge>}</div></div><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}><RefreshCw className={cn("mr-2 h-3.5 w-3.5", isFetching && "animate-spin")} />Refresh</Button><Button size="sm" className="bg-[#1c5d9e] hover:bg-[#164b80]"><Command className="mr-2 h-3.5 w-3.5" />New product brief</Button></div></div>
          {isError && <div className="mb-5 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"><span className="flex items-center gap-2"><CircleAlert className="h-4 w-4" />Unable to load live workspace data. Showing the last safe view.</span><button className="font-semibold underline" onClick={() => refetch()}>Retry</button></div>}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metricCards.map(([label, value, note, Icon, color]) => <Card key={String(label)} className="border-slate-200/80 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]"><CardContent className="p-4"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isLoading ? "—" : value}</p><p className="mt-1 text-[11px] text-slate-400">{note}</p></div><div className={cn("rounded-lg bg-slate-50 p-2", color as string)}><Icon className="h-4 w-4" /></div></div></CardContent></Card>)}</div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
            <Card className="overflow-hidden border-slate-200/80 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]"><CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-5 py-4"><div><CardTitle className="text-sm font-semibold">Product pipeline</CardTitle><p className="mt-1 text-xs text-slate-400">The latest work across your active assortment.</p></div><button className="text-xs font-semibold text-[#1c5d9e] hover:underline">View all <ArrowUpRight className="ml-1 inline h-3 w-3" /></button></CardHeader><CardContent className="p-0"><div className="hidden grid-cols-[minmax(0,1.5fr)_1fr_110px_120px] gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 sm:grid"><span>Product</span><span>Status</span><span>Completion</span><span>Confidence</span></div>{overview?.products.map((product) => { const meta = statusMeta[product.status] ?? statusMeta.draft; return <div key={product.id} className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-0 sm:grid-cols-[minmax(0,1.5fr)_1fr_110px_120px] sm:items-center sm:gap-4"><div className="min-w-0"><div className="flex items-center gap-2"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#edf3fa] text-[#1c5d9e]"><PackageCheck className="h-4 w-4" /></div><div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-800">{product.name}</p><p className="mt-0.5 truncate text-[11px] text-slate-400">{product.category} · {product.ownerName}</p></div></div></div><Badge variant="outline" className={cn("w-fit text-[10px] font-medium", meta.className)}>{meta.label}</Badge><div><div className="mb-1 flex justify-between text-[10px] text-slate-400"><span>Progress</span><span className="font-semibold text-slate-600">{product.completion}%</span></div><Progress value={product.completion} className="h-1.5 bg-slate-100" /></div><div className="flex items-center gap-2"><div className="h-1.5 flex-1 rounded-full bg-slate-100"><div className={cn("h-1.5 rounded-full", product.confidence >= 95 ? "bg-emerald-500" : product.confidence >= 85 ? "bg-amber-400" : "bg-rose-400")} style={{ width: `${product.confidence}%` }} /></div><span className="text-[11px] font-semibold text-slate-600">{product.confidence}%</span></div></div>})}</CardContent></Card>
            <Card className="border-slate-200/80 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]"><CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-5 py-4"><div><CardTitle className="text-sm font-semibold">Review queue</CardTitle><p className="mt-1 text-xs text-slate-400">AI proposals that need a human decision.</p></div><button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100"><ExternalLink className="h-4 w-4" /></button></CardHeader><CardContent className="p-0">{overview?.reviewItems.map((item) => <div key={item.id} className="border-b border-slate-100 px-5 py-4 last:border-0"><div className="flex items-start gap-3"><div className={cn("mt-0.5 rounded-md p-1.5", item.severity === "critical" ? "bg-rose-50 text-rose-600" : item.severity === "high" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500")}><CircleAlert className="h-3.5 w-3.5" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-xs font-semibold text-slate-800">{item.title}</p><span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-slate-400">{item.severity}</span></div><p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500">{item.reason}</p><div className="mt-2 flex items-center justify-between text-[10px] text-slate-400"><span>{formatRelative(item.createdAt)}</span><span className="font-semibold text-slate-600">{item.confidence}% confidence</span></div></div></div></div>)}</CardContent></Card>
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"><Card className="border-slate-200/80 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]"><CardHeader className="px-5 py-4"><div className="flex items-center justify-between"><div><CardTitle className="text-sm font-semibold">Integration health</CardTitle><p className="mt-1 text-xs text-slate-400">Your connected workflow surface at a glance.</p></div><CloudCog className="h-4 w-4 text-slate-400" /></div></CardHeader><CardContent className="grid gap-3 px-5 pb-5 sm:grid-cols-2">{overview?.integrations.map((item) => <div key={item.kind} className="rounded-xl border border-slate-200 p-3"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className={cn("h-2 w-2 rounded-full", item.state === "connected" ? "bg-emerald-500" : item.state === "needs_attention" ? "bg-amber-500" : item.state === "demo" ? "bg-sky-500" : "bg-slate-300")} /><p className="text-xs font-semibold text-slate-800">{item.kind}</p></div><span className="text-[10px] capitalize text-slate-400">{item.state.replace("_", " ")}</span></div><p className="mt-2 text-[11px] text-slate-500">{item.provider}</p><div className="mt-2 flex flex-wrap gap-1">{item.capabilities.map((cap) => <span key={cap} className="rounded bg-slate-50 px-1.5 py-0.5 text-[9px] text-slate-500">{cap}</span>)}</div></div>)}</CardContent></Card><Card className="border-slate-200/80 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]"><CardHeader className="px-5 py-4"><div className="flex items-center justify-between"><div><CardTitle className="text-sm font-semibold">Recent activity</CardTitle><p className="mt-1 text-xs text-slate-400">A lightweight audit trail for the workspace.</p></div><Activity className="h-4 w-4 text-slate-400" /></div></CardHeader><CardContent className="px-5 pb-5">{overview?.activities.map((event, index) => <div key={`${event.subject}-${index}`} className="flex gap-3"><div className="flex flex-col items-center"><div className={cn("mt-1 h-2 w-2 rounded-full", event.tone === "warning" ? "bg-amber-400" : event.tone === "positive" ? "bg-emerald-500" : "bg-slate-300")} />{index < (overview.activities.length - 1) && <div className="my-1 h-full w-px bg-slate-200" />}</div><div className="pb-4"><p className="text-xs leading-relaxed text-slate-600"><span className="font-semibold text-slate-800">{event.actorName}</span> {event.action} <span className="font-medium text-slate-800">{event.subject}</span></p><p className="mt-1 text-[10px] text-slate-400">{formatRelative(event.createdAt)}</p></div></div>)}</CardContent></Card></div>
          <Separator className="my-8" /><div className="flex flex-col justify-between gap-3 pb-4 text-[11px] text-slate-400 sm:flex-row"><p className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />Every AI suggestion is validated before it can change a record.</p><p>RetailForge AI · Pilot workspace · <button className="font-medium text-slate-600 hover:underline">Open support</button></p></div>
        </div>
      </main>
    </div>
  </div>;
}

import { ReactNode, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Map,
  TrendingUp,
  ShieldAlert,
  Settings,
  FileText,
  Database,
  HelpCircle,
  Bell,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: any;
  group: "Core" | "Operations";
  badge?: number;
};

const NAV: NavItem[] = [
  { to: "/", label: "Dashboard", icon: Activity, group: "Core" },
  { to: "/heatmap", label: "Heatmap", icon: Map, group: "Core" },
  { to: "/trends", label: "Trends", icon: TrendingUp, group: "Core" },
  { to: "/alerts", label: "Alerts", icon: ShieldAlert, group: "Core", badge: 3 },

  { to: "/reports", label: "Reports", icon: FileText, group: "Operations" },
  { to: "/data", label: "Data Ingest", icon: Database, group: "Operations" },
  { to: "/help", label: "Help", icon: HelpCircle, group: "Operations" },
  { to: "/settings", label: "Settings", icon: Settings, group: "Operations" },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </div>
  );
}

function NavGroupTitle({ title, collapsed }: { title: string; collapsed: boolean }) {
  return (
    <div className={cx("px-3 pt-4 pb-2 text-xs font-semibold tracking-wider text-white/45", collapsed && "hidden")}>
      {title.toUpperCase()}
    </div>
  );
}

function SidebarItem({
  item,
  collapsed,
  onClick,
}: {
  item: NavItem;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        cx(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
          "text-white/70 hover:text-white hover:bg-white/6",
          isActive && "text-white bg-white/10"
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="navGlow"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/18 to-cyan-400/12"
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            />
          )}

          <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-black/20">
            <Icon className="h-4 w-4" />
          </div>

          {!collapsed && <span className="relative">{item.label}</span>}

          {!collapsed && typeof item.badge === "number" && item.badge > 0 && (
            <span className="relative ml-auto rounded-full bg-rose-500/20 border border-rose-400/20 px-2 py-0.5 text-[11px] font-bold text-rose-200">
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const pageTitle = useMemo(() => {
    const hit = NAV.find((n) => n.to === location.pathname);
    return hit?.label ?? "Dashboard";
  }, [location.pathname]);

  const mode = String(import.meta.env.VITE_DATA_MODE || "MOCK").toUpperCase();
  const api = String(import.meta.env.VITE_API_BASE_URL || "http://localhost:8000");

  const core = NAV.filter((n) => n.group === "Core");
  const ops = NAV.filter((n) => n.group === "Operations");

  return (
    <div className="min-h-screen text-white">
      {/* Premium background (no custom tailwind tokens required) */}
      <div className="fixed inset-0 -z-10 bg-[#05070c]">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_500px_at_20%_10%,rgba(56,189,248,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_80%_25%,rgba(168,85,247,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_92%,rgba(34,197,94,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_35%)]" />
      </div>

      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/25 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 transition"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-white/85" />
            </button>

            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/6 border border-white/12">
              <Bell className="h-5 w-5 text-sky-200" />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide text-white/95">
                AI Early Warning System
              </div>
              <div className="text-xs text-white/55">Water-borne Disease Surveillance</div>
            </div>
          </div>

          {/* Center: Search (desktop) */}
          <div className="hidden lg:flex flex-1 max-w-lg items-center justify-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                placeholder={`Search areas, alerts, reports…`}
                className="w-full rounded-2xl border border-white/12 bg-white/5 pl-10 pr-4 py-2 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-sky-400/30"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Pill>
              <span className="text-white/50">Mode</span>
              <span className={cx("h-2 w-2 rounded-full", mode === "API" ? "bg-emerald-400" : "bg-amber-400")} />
              <span className="font-semibold text-white">{mode}</span>
            </Pill>

            <Pill>
              <Building2 className="h-4 w-4 text-white/55" />
              <span className="font-semibold">District</span>
              <span className="text-white/75">Demo</span>
            </Pill>

            <button
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 transition"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="h-5 w-5 text-white/85" />
              <span className="absolute -right-1 -top-1 rounded-full bg-rose-500/90 px-1.5 py-0.5 text-[10px] font-extrabold">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              placeholder="Search…"
              className="w-full rounded-2xl border border-white/12 bg-white/5 pl-10 pr-4 py-2 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-sky-400/30"
            />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-6">
        {/* Desktop Sidebar */}
        <aside className={cx("hidden lg:block", collapsed ? "lg:col-span-1" : "lg:col-span-3")}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between px-2 py-2">
              {!collapsed && (
                <div className="text-xs font-semibold tracking-wider text-white/55">CONTROL PANEL</div>
              )}
              <button
                className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 transition"
                onClick={() => setCollapsed((v) => !v)}
                aria-label="Toggle sidebar"
                title="Toggle sidebar"
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
            </div>

            <NavGroupTitle title="Core" collapsed={collapsed} />
            <div className="space-y-1 px-1">
              {core.map((item) => (
                <SidebarItem key={item.to} item={item} collapsed={collapsed} />
              ))}
            </div>

            <NavGroupTitle title="Operations" collapsed={collapsed} />
            <div className="space-y-1 px-1 pb-2">
              {ops.map((item) => (
                <SidebarItem key={item.to} item={item} collapsed={collapsed} />
              ))}
            </div>

            {!collapsed && (
              <div className="mt-2 border-t border-white/10 p-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs font-semibold text-white/75">API Base</div>
                  <div className="mt-1 text-xs text-white/55 break-all">{api}</div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main */}
        <main className={cx("col-span-12", collapsed ? "lg:col-span-11" : "lg:col-span-9")}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold tracking-tight">{pageTitle}</div>
              <div className="text-xs text-white/55">
                Real-time monitoring & decision support (demo)
              </div>
            </div>
          </div>

          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              className="fixed left-0 top-0 z-[60] h-full w-[320px] border-r border-white/10 bg-[#070a12]/90 backdrop-blur-xl"
              initial={{ x: -360 }}
              animate={{ x: 0 }}
              exit={{ x: -360 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="leading-tight">
                  <div className="text-sm font-extrabold">AI Early Warning</div>
                  <div className="text-xs text-white/55">Dashboard</div>
                </div>
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 transition"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-white/85" />
                </button>
              </div>

              <div className="p-3">
                <div className="space-y-1">
                  {NAV.map((item) => (
                    <SidebarItem key={item.to} item={item} collapsed={false} onClick={() => setMobileOpen(false)} />
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs font-semibold text-white/70">Status</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                    <span className="h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_18px_rgba(34,197,94,0.35)]" />
                    Monitoring enabled (demo)
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

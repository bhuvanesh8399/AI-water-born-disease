import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bell, Map, Settings, TrendingUp, ShieldAlert, Menu, X, Dot } from "lucide-react";
import { useMemo, useState } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: Activity },
  { to: "/heatmap", label: "Heatmap", icon: Map },
  { to: "/trends", label: "Trends", icon: TrendingUp },
  { to: "/alerts", label: "Alerts", icon: ShieldAlert },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Pill({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70">
      <span className="text-white/50">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  onClick,
}: {
  to: string;
  label: string;
  icon: any;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
          "text-white/70 hover:text-white hover:bg-white/6",
          isActive ? "text-white bg-white/10" : "",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="navGlow"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/18 to-cyan-400/12"
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            />
          )}
          <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-black/20">
            <Icon className="h-4 w-4" />
          </div>
          <span className="relative">{label}</span>

          {/* right mini indicator */}
          <span className="relative ml-auto hidden text-white/30 group-hover:text-white/60 lg:inline">
            <Dot className="h-5 w-5" />
          </span>
        </>
      )}
    </NavLink>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const hit = nav.find((n) => n.to === location.pathname);
    return hit?.label ?? "Dashboard";
  }, [location.pathname]);

  const mode = (import.meta.env.VITE_DATA_MODE || "MOCK").toUpperCase();
  const district = "Demo"; // later: dropdown

  return (
    <div className="min-h-screen text-white">
      {/* Premium background */}
      <div className="fixed inset-0 -z-10 bg-[#05070c]">
        <div className="absolute inset-0 bg-mesh opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(168,85,247,0.10),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_92%,rgba(34,197,94,0.08),transparent_60%)]" />
      </div>

      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/25 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 transition"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-white/85" />
            </button>

            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/6 border border-white/12 shadow-glow">
              <Bell className="h-5 w-5 text-sky-200" />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide text-white/95">
                AI Early Warning System
              </div>
              <div className="text-xs text-white/55">Water-borne Disease Surveillance</div>
            </div>
          </div>

          {/* Center: page title (desktop) */}
          <div className="hidden lg:block">
            <div className="text-sm font-semibold text-white/80">{pageTitle}</div>
          </div>

          {/* Right: pills */}
          <div className="flex items-center gap-2">
            <Pill
              label="Mode"
              value={
                <span className="inline-flex items-center gap-1">
                  <span
                    className={[
                      "h-2 w-2 rounded-full",
                      mode === "API" ? "bg-emerald-400" : "bg-amber-400",
                    ].join(" ")}
                  />
                  {mode}
                </span>
              }
            />
            <Pill label="District" value={district} />
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-soft">
            <div className="px-3 py-3">
              <div className="text-xs font-semibold tracking-wider text-white/55">NAVIGATION</div>
            </div>

            <div className="space-y-1 px-1 pb-2">{nav.map((item) => <NavItem key={item.to} {...item} />)}</div>

            <div className="mt-2 border-t border-white/10 p-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs font-semibold text-white/70">Live Status</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_18px_rgba(34,197,94,0.35)]" />
                  Monitoring enabled (demo)
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="col-span-12 lg:col-span-9">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              className="fixed left-0 top-0 z-50 h-full w-[320px] border-r border-white/10 bg-[#070a12]/90 backdrop-blur-xl"
              initial={{ x: -360 }}
              animate={{ x: 0 }}
              exit={{ x: -360 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div>
                  <div className="text-sm font-extrabold">AI Early Warning</div>
                  <div className="text-xs text-white/55">Control Dashboard</div>
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
                  {nav.map((item) => (
                    <NavItem key={item.to} {...item} onClick={() => setMobileOpen(false)} />
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs font-semibold text-white/70">Quick Info</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Pill label="Mode" value={mode} />
                    <Pill label="District" value={district} />
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

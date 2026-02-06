import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, TrendingUp, Sparkles, MapPin } from "lucide-react";
import { getAlerts, getRiskSummary } from "../../services/dataSource";
import type { AlertItem, RiskSummary } from "../../types/domain";
import { RiskBadge } from "../../components/ui/Badge";

/* ---------- Premium Reusable UI Blocks ---------- */

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  right,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-2">
          <Icon className="h-5 w-5 text-sky-300" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border border-white/15 
      bg-gradient-to-br from-white/10 to-white/5 
      backdrop-blur-xl 
      shadow-[0_25px_60px_rgba(0,0,0,0.6)]
      ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Page ---------- */

export function DashboardPage() {
  const [summary, setSummary] = useState<RiskSummary | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [s, a] = await Promise.all([getRiskSummary(), getAlerts()]);
      setSummary(s);
      setAlerts(a);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-8">
      {/* ---------- HERO ---------- */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">District Overview</h1>
        <p className="text-sm text-white/60 max-w-3xl">
          AI-powered early warning dashboard for monitoring water-borne disease risk and enabling
          proactive public-health response.
        </p>
      </div>

      {/* ---------- KPI ROW ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <GlassCard className="p-6 lg:col-span-2">
          <SectionHeader
            icon={Activity}
            title="Overall Risk Score"
            subtitle="Combined signals: cases, rainfall, complaints"
            right={summary && <RiskBadge level={summary.riskLevel} />}
          />

          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="text-5xl font-extrabold">
                {loading ? "—" : summary?.riskScore}
                <span className="text-xl text-white/40">/100</span>
              </div>
              <div className="mt-1 text-sm text-white/60">
                Confidence:{" "}
                <span className="font-semibold text-white">
                  {loading ? "—" : Math.round((summary?.confidence ?? 0) * 100)}%
                </span>
              </div>
            </div>

            <div className="text-right text-sm text-white/55">
              Last updated
              <div className="font-semibold text-white">
                {summary ? new Date(summary.updatedAt).toLocaleString() : "—"}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${summary?.riskScore ?? 0}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400"
            />
          </div>
        </GlassCard>

        {/* Explainability */}
        <GlassCard className="p-6">
          <SectionHeader icon={Sparkles} title="Why Risk Increased" subtitle="Explainable signals" />

          <ul className="mt-4 space-y-3">
            {(summary?.topReasons ?? (loading ? ["Loading signals…"] : [])).map((r, i) => (
              <li
                key={i}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/75"
              >
                • {r}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* ---------- HOTSPOTS ---------- */}
      <GlassCard className="p-6">
        <SectionHeader
          icon={MapPin}
          title="Top Hotspots"
          subtitle="Highest-risk villages / wards"
          right={<span className="text-xs text-white/60">See Heatmap →</span>}
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {summary?.hotspots.map((h) => (
            <motion.div
              key={h.areaId}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/15 bg-black/40 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{h.name}</div>
                <RiskBadge level={h.riskLevel} />
              </div>

              <div className="mt-3 text-3xl font-extrabold">
                {h.riskScore}
                <span className="text-base text-white/40">/100</span>
              </div>

              <div className="mt-1 text-xs text-white/50">Area ID: {h.areaId}</div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* ---------- ALERTS ---------- */}
      <GlassCard className="p-6">
        <SectionHeader icon={ShieldAlert} title="Latest Alerts" subtitle="Acknowledge & escalation-ready" />

        <div className="mt-6 space-y-3">
          {alerts.slice(0, 3).map((a) => (
            <div key={a.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{a.areaName}</div>
                <RiskBadge level={a.severity} />
              </div>

              <div className="mt-1 text-xs text-white/60">{new Date(a.createdAt).toLocaleString()}</div>

              <p className="mt-2 text-sm text-white/75">{a.message}</p>

              <div className="mt-2 text-xs text-white/55">
                Status: <span className="font-semibold text-white">{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

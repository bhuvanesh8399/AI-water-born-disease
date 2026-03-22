import { useEffect, useState } from "react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import { RiskBadge } from "../../components/ui/Badge";
import type { AlertItem } from "../../types/domain";
import { acknowledgeAlert, getAlerts } from "../../services/dataSource";

export function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    setAlerts(await getAlerts());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function ack(id: string) {
    setBusyId(id);
    await acknowledgeAlert(id);
    setBusyId(null);
    // In MOCK mode, this won't change server-side; still acts like real UI
    refresh();
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Alerts</h1>
        <p className="text-sm text-white/60">Acknowledge + escalation-friendly workflow.</p>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-white/60">
              <tr className="border-b border-white/10">
                <th className="py-3 pr-4">Alert ID</th>
                <th className="py-3 pr-4">Area</th>
                <th className="py-3 pr-4">Severity</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Created</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <>
                  <tr>
                    <td colSpan={6} className="py-3">
                      <div className="animate-pulse h-10 w-full rounded bg-white/10" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6} className="py-3">
                      <div className="animate-pulse h-10 w-full rounded bg-white/10" />
                    </td>
                  </tr>
                </>
              )}
              {!loading &&
                alerts.map((a) => (
                  <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-3 pr-4 font-semibold">{a.id}</td>
                    <td className="py-3 pr-4">{a.areaName}</td>
                    <td className="py-3 pr-4">
                      <RiskBadge level={a.severity} />
                    </td>
                    <td className="py-3 pr-4 text-white/80">{a.status}</td>
                    <td className="py-3 pr-4 text-white/70">
                      {new Date(a.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3">
                      <Button
                        disabled={busyId === a.id}
                        onClick={() => ack(a.id)}
                        className="px-3 py-2"
                      >
                        {busyId === a.id ? "Working…" : "Acknowledge"}
                      </Button>
                    </td>
                  </tr>
                ))}
              {!loading && !alerts.length && (
                <tr>
                  <td className="py-4 text-white/60" colSpan={6}>
                    No alerts.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {alerts[0]?.message && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-white/75">
            <div className="text-sm font-semibold text-white/80">Selected Alert Message (sample)</div>
            <div className="mt-2 text-sm">{alerts[0].message}</div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

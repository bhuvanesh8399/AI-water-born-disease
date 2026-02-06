import { motion } from "framer-motion";
import { FileText, Download, Calendar } from "lucide-react";

export function ReportsPage() {
  const reports = [
    { name: "Weekly Surveillance Report", period: "2026-W05", status: "Generated" },
    { name: "Hotspot Summary", period: "Last 14 days", status: "Generated" },
    { name: "Alert Escalation Audit", period: "Monthly", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/12 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-white/12 bg-black/20 p-2">
              <FileText className="h-5 w-5 text-sky-200" />
            </div>
            <div>
              <div className="text-xl font-extrabold">Reports</div>
              <div className="text-sm text-white/60">Export summaries for officials (demo format).</div>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition">
            <Calendar className="h-4 w-4" />
            Select Period
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-white/60">
              <tr className="border-b border-white/10">
                <th className="py-3 pr-4">Report</th>
                <th className="py-3 pr-4">Period</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.name} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-3 pr-4 font-semibold">{r.name}</td>
                  <td className="py-3 pr-4 text-white/75">{r.period}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-white/12 bg-black/20 px-2 py-1 text-xs text-white/75">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <motion.button
                      whileHover={{ y: -1 }}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/90 to-cyan-400/80 px-4 py-2 text-xs font-extrabold shadow-[0_0_35px_rgba(56,189,248,0.20)]"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

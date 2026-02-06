import { Database, Upload, Info } from "lucide-react";

export function DataIngestPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/12 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-white/12 bg-black/20 p-2">
            <Database className="h-5 w-5 text-emerald-200" />
          </div>
          <div>
            <div className="text-xl font-extrabold">Data Ingestion</div>
            <div className="text-sm text-white/60">
              Upload weekly case counts / complaints (demo UI).
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/12 bg-black/20 p-5">
            <div className="text-sm font-bold">Upload Weekly Cases</div>
            <div className="text-xs text-white/55 mt-1">
              CSV format: area_id, week, diarrhea_cases, fever_cases
            </div>

            <button className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition">
              <Upload className="h-4 w-4" />
              Upload CSV
            </button>
          </div>

          <div className="rounded-2xl border border-white/12 bg-black/20 p-5">
            <div className="text-sm font-bold">Upload Water Complaints</div>
            <div className="text-xs text-white/55 mt-1">
              CSV format: area_id, date, complaint_type, count
            </div>

            <button className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition">
              <Upload className="h-4 w-4" />
              Upload CSV
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-4 text-sm text-white/70">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 text-sky-200" />
            <p>
              In backend phase, this page will call FastAPI endpoints and store data in PostgreSQL.
              For now, it’s UI-first for demo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

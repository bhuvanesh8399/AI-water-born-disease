import { useEffect, useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { getRiskSummary } from "../../services/dataSource";
import type { RiskSummary } from "../../types/domain";
import { RiskMap } from "../../components/maps/RiskMap";

export function HeatmapPage() {
  const [summary, setSummary] = useState<RiskSummary | null>(null);

  useEffect(() => {
    (async () => setSummary(await getRiskSummary()))();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Heatmap</h1>
        <p className="text-sm text-white/60">Village/Ward markers with risk-level drilldown.</p>
      </div>

      <GlassCard>
        {summary ? (
          <RiskMap hotspots={summary.hotspots} />
        ) : (
          <div className="animate-pulse h-[420px] w-full rounded-2xl bg-white/10" />
        )}
      </GlassCard>
    </div>
  );
}

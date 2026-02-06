import { useEffect, useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { getTrends } from "../../services/dataSource";
import type { TrendPoint } from "../../types/domain";
import { RiskTrendChart } from "../../components/charts/RiskTrendChart";

export function TrendsPage() {
  const [data, setData] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setData(await getTrends());
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Trends</h1>
        <p className="text-sm text-white/60">Weekly signals vs risk score (explainable monitoring).</p>
      </div>

      <GlassCard>
        {loading ? (
          <div className="animate-pulse h-[320px] w-full rounded-2xl bg-white/10" />
        ) : (
          <RiskTrendChart data={data} />
        )}
      </GlassCard>
    </div>
  );
}

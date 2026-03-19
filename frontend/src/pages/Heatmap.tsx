import { RiskMapPanel } from '../components/heatmap/RiskMapPanel'
import { useHeatmap } from '../features/heatmap/hooks'

export function HeatmapPage() {
  const { data, loading, error } = useHeatmap()

  if (loading) return <div className="glass-card">Loading heatmap…</div>
  if (error || !data) return <div className="glass-card">{error ?? 'No map data available'}</div>

  return (
    <div className="page-grid">
      <RiskMapPanel items={data.items} />
    </div>
  )
}

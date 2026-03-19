import type { HeatmapPoint } from '../../types/api'
import { RiskMap } from '../../maps/RiskMap'

export function RiskMapPanel({ items }: { items: HeatmapPoint[] }) {
  return (
    <div className="glass-card">
      <div className="section-title">District risk map</div>
      <RiskMap items={items} />
    </div>
  )
}

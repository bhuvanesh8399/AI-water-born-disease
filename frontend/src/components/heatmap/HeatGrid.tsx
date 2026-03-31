import { StatusPill } from '../ui/StatusPill'
import type { HeatmapPoint } from '../../types/domain'

export function HeatGrid({ items }: { items: HeatmapPoint[] }) {
  return (
    <div className="grid cards-grid">
      {items.map((item) => (
        <div key={item.district_id} className="card">
          <div className="row">
            <strong>{item.district_name}</strong>
            <StatusPill level={item.risk_level}>{item.risk_level}</StatusPill>
          </div>
          <div className="muted">{item.state_name}</div>
          <div className="muted">{item.zone_type}</div>
          <div className="score">{item.risk_score.toFixed(3)}</div>
          <div className="muted">
            {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
          </div>
        </div>
      ))}
    </div>
  )
}

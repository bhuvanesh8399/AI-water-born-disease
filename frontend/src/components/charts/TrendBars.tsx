import { StatusPill } from '../ui/StatusPill'
import type { TrendPoint } from '../../types/domain'

export function TrendBars({ points }: { points: TrendPoint[] }) {
  return (
    <div className="card">
      <h2>Last 30 Observations</h2>
      <div className="trend-list">
        {points.map((point) => (
          <div key={point.date} className="trend-row">
            <div className="trend-meta">
              <span>{point.date}</span>
              <StatusPill level={point.risk_level}>{point.risk_level}</StatusPill>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${Math.round(point.risk_score * 100)}%` }} />
            </div>
            <div className="score">{point.risk_score.toFixed(3)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

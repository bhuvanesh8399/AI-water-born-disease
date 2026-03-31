import { StatusPill } from '../ui/StatusPill'
import type { AlertItem } from '../../types/domain'

export function AlertList({ items }: { items: AlertItem[] }) {
  return (
    <div className="grid cards-grid">
      {items.map((item) => (
        <div key={item.id} className="card">
          <div className="row">
            <strong>{item.title}</strong>
            <StatusPill level="high">{item.status}</StatusPill>
          </div>
          <div className="muted">{item.district_name}</div>
          <p>{item.message}</p>
          <div className="row">
            <span className="score">{item.risk_score.toFixed(3)}</span>
            <span className="muted">{new Date(item.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

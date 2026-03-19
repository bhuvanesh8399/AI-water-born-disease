import type { DashboardAlert } from '../../types/api'
import { Badge } from '../ui/Badge'
import { formatDateTime } from '../../lib/format'

export function AlertsPreview({ alerts }: { alerts: DashboardAlert[] }) {
  return (
    <div className="glass-card">
      <div className="section-title">Recent alerts</div>
      <div className="page-grid">
        {alerts.map((alert) => (
          <div key={alert.id} className="row justify-between">
            <div>
              <strong>{alert.title}</strong>
              <div className="muted">
                {alert.district_code} · {formatDateTime(alert.created_at)}
              </div>
            </div>
            <Badge tone={alert.severity}>{alert.severity}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

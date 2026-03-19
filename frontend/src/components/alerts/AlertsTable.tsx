import type { AlertItem } from '../../types/api'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatDateTime } from '../../lib/format'

interface AlertsTableProps {
  alerts: AlertItem[]
  onStatusChange: (id: number, status: string) => void
}

export function AlertsTable({ alerts, onStatusChange }: AlertsTableProps) {
  return (
    <div className="glass-card">
      <div className="section-title">Active alerts</div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>
                <strong>{alert.title}</strong>
                <div className="muted">{alert.message}</div>
              </td>
              <td>
                <Badge tone={alert.severity}>{alert.severity}</Badge>
              </td>
              <td>{alert.status}</td>
              <td>{formatDateTime(alert.created_at)}</td>
              <td>
                <div className="row">
                  <Button variant="secondary" onClick={() => onStatusChange(alert.id, 'in_review')}>
                    Review
                  </Button>
                  <Button variant="primary" onClick={() => onStatusChange(alert.id, 'resolved')}>
                    Resolve
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

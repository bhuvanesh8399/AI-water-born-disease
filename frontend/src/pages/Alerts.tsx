import { AlertsTable } from '../components/alerts/AlertsTable'
import { useAlerts } from '../features/alerts/hooks'

export function AlertsPage() {
  const { alerts, loading, error, updateStatus } = useAlerts()

  if (loading) return <div className="glass-card">Loading alerts…</div>
  if (error) return <div className="glass-card">{error}</div>

  return (
    <div className="page-grid">
      <AlertsTable alerts={alerts} onStatusChange={(id, status) => void updateStatus(id, status)} />
    </div>
  )
}

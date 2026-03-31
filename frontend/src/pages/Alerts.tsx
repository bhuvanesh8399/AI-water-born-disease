import { useEffect, useState } from 'react'
import { getAlerts } from '../services/dataSource'
import type { AlertItem } from '../types/domain'

export function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    void getAlerts()
      .then(setAlerts)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error) {
    return <div>Failed to load alerts: {error}</div>
  }

  if (!alerts.length) {
    return <div>No active alerts right now.</div>
  }

  return (
    <div>
      <h1>Alerts</h1>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>
            <strong>{alert.title}</strong> - {alert.district_name} - {alert.risk_level} - {alert.risk_score.toFixed(3)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AlertsPage

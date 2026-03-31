import { useEffect, useState } from 'react'
import { getDashboardSummary } from '../services/dataSource'
import type { DashboardResponse } from '../types/domain'

export function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    void getDashboardSummary()
      .then(setData)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error) {
    return <div>Failed to load dashboard: {error}</div>
  }

  if (!data) {
    return <div>Loading dashboard...</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total districts: {data.summary.total_districts}</p>
      <p>High risk: {data.summary.high_risk_count}</p>
      <p>Medium risk: {data.summary.medium_risk_count}</p>
      <p>Low risk: {data.summary.low_risk_count}</p>
      <p>Last updated: {new Date(data.summary.last_updated).toLocaleString()}</p>

      <h2>Top hotspots</h2>
      <ul>
        {data.hotspots.map((spot) => (
          <li key={spot.district_id}>
            {spot.district_name} - {spot.risk_level} ({spot.risk_score.toFixed(3)})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DashboardPage

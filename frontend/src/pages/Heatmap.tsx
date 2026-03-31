import { useEffect, useState } from 'react'
import { getHeatmapPoints } from '../services/dataSource'
import type { HeatmapPoint } from '../types/domain'

export function HeatmapPage() {
  const [points, setPoints] = useState<HeatmapPoint[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    void getHeatmapPoints()
      .then(setPoints)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error) {
    return <div>Failed to load heatmap: {error}</div>
  }

  if (!points.length) {
    return <div>Loading heatmap...</div>
  }

  return (
    <div>
      <h1>Heatmap</h1>
      <ul>
        {points.slice(0, 50).map((point) => (
          <li key={point.district_id}>
            {point.district_name} - {point.risk_level} - {point.risk_score.toFixed(3)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HeatmapPage

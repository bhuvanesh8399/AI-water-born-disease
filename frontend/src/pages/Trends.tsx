import { useEffect, useMemo, useState } from 'react'
import { getHeatmapPoints, getTrends } from '../services/dataSource'
import type { HeatmapPoint, TrendsResponse } from '../types/domain'

export function TrendsPage() {
  const [districts, setDistricts] = useState<HeatmapPoint[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<number>(1)
  const [data, setData] = useState<TrendsResponse | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    void getHeatmapPoints()
      .then((items) => {
        setDistricts(items)
        if (items.length) {
          setSelectedDistrict(items[0].district_id)
        }
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  useEffect(() => {
    if (!selectedDistrict) return

    void getTrends(selectedDistrict, 30)
      .then(setData)
      .catch((err: Error) => setError(err.message))
  }, [selectedDistrict])

  const selectedName = useMemo(
    () => districts.find((item) => item.district_id === selectedDistrict)?.district_name ?? 'District',
    [districts, selectedDistrict],
  )

  if (error) {
    return <div>Failed to load trends: {error}</div>
  }

  return (
    <div>
      <h1>Trends</h1>

      <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(Number(e.target.value))}>
        {districts.map((district) => (
          <option key={district.district_id} value={district.district_id}>
            {district.district_name}
          </option>
        ))}
      </select>

      <h2>{selectedName}</h2>

      {!data ? (
        <p>Loading trends...</p>
      ) : (
        <ul>
          {data.points.map((point) => (
            <li key={point.date}>
              {point.date} - {point.risk_level} - {point.risk_score.toFixed(3)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TrendsPage

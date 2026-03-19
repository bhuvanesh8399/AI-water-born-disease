import { useState } from 'react'
import { RiskTrendChart } from '../components/charts/RiskTrendChart'
import { useTrends } from '../features/trends/hooks'

export function TrendsPage() {
  const [district, setDistrict] = useState('D001')
  const [days, setDays] = useState(14)
  const { data, loading, error } = useTrends(district, days)

  return (
    <div className="page-grid">
      <div className="glass-card row">
        <label style={{ flex: 1 }}>
          <div className="muted">District</div>
          <select className="select" value={district} onChange={(event) => setDistrict(event.target.value)}>
            <option value="D001">D001</option>
            <option value="D002">D002</option>
            <option value="D003">D003</option>
            <option value="D004">D004</option>
          </select>
        </label>
        <label style={{ width: 160 }}>
          <div className="muted">Days</div>
          <input className="input" type="number" value={days} onChange={(event) => setDays(Number(event.target.value))} />
        </label>
      </div>

      {loading ? <div className="glass-card">Loading trends…</div> : null}
      {error ? <div className="glass-card">{error}</div> : null}
      {data ? (
        <div className="glass-card">
          <div className="section-title">{data.district_name} risk trend</div>
          <p className="muted">{data.summary}</p>
          <RiskTrendChart points={data.points} />
        </div>
      ) : null}
    </div>
  )
}

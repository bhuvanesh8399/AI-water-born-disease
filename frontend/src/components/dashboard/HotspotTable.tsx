import { StatusPill } from '../ui/StatusPill'
import type { Hotspot } from '../../types/domain'

export function HotspotTable({ items }: { items: Hotspot[] }) {
  return (
    <div className="card">
      <h2>Top Hotspots</h2>
      <table className="table">
        <thead>
          <tr>
            <th>District</th>
            <th>State</th>
            <th>Zone</th>
            <th>Score</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.district_id}>
              <td>{item.district_name}</td>
              <td>{item.state_name}</td>
              <td>{item.zone_type}</td>
              <td>{item.risk_score.toFixed(3)}</td>
              <td>
                <StatusPill level={item.risk_level}>{item.risk_level}</StatusPill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

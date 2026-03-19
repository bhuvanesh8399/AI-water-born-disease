import type { DashboardKpi } from '../../types/api'

export function KPIGrid({ items }: { items: DashboardKpi[] }) {
  return (
    <div className="kpi-grid">
      {items.map((item) => (
        <div key={item.label} className="glass-card">
          <div className="muted">{item.label}</div>
          <div className="kpi-value">{item.value}</div>
          <small className="muted">{item.trend}</small>
        </div>
      ))}
    </div>
  )
}

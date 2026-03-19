import { AlertsPreview } from '../components/dashboard/AlertsPreview'
import { ContributingFactorsCard } from '../components/dashboard/ContributingFactorsCard'
import { DecisionSummary } from '../components/dashboard/DecisionSummary'
import { KPIGrid } from '../components/dashboard/KPIGrid'
import { useDashboardSummary } from '../features/dashboard/hooks'

export function DashboardPage() {
  const { data, loading, error } = useDashboardSummary()

  if (loading) return <div className="glass-card">Loading dashboard…</div>
  if (error || !data) return <div className="glass-card">{error ?? 'No data available'}</div>

  return (
    <div className="page-grid">
      <KPIGrid items={data.kpis} />
      <div className="inline-grid">
        <DecisionSummary summary={data.decision_summary} />
        <ContributingFactorsCard factors={data.contributing_factors} />
      </div>
      <AlertsPreview alerts={data.recent_alerts} />
    </div>
  )
}

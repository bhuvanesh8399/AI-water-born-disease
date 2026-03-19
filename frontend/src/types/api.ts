export interface DashboardKpi {
  label: string
  value: string
  trend: string
}

export interface DashboardAlert {
  id: number
  title: string
  severity: string
  status: string
  district_code: string
  created_at: string
}

export interface DashboardResponse {
  generated_at: string
  kpis: DashboardKpi[]
  top_hotspots: Array<{
    district_code: string
    district_name: string
    risk_score: number
    risk_level: string
  }>
  recent_alerts: DashboardAlert[]
  decision_summary: string
  contributing_factors: string[]
}

export interface HeatmapPoint {
  district_code: string
  district_name: string
  latitude: number
  longitude: number
  risk_score: number
  risk_level: string
  confidence_score: number
}

export interface HeatmapResponse {
  items: HeatmapPoint[]
}

export interface TrendPoint {
  date: string
  risk_score: number
  risk_level: string
  confidence_score: number
}

export interface TrendsResponse {
  district_code: string
  district_name: string
  points: TrendPoint[]
  summary: string
}

export interface AlertItem {
  id: number
  district_id: number
  title: string
  message: string
  severity: string
  status: string
  source: string
  created_at: string
  updated_at: string
}

export interface AlertsResponse {
  items: AlertItem[]
  total: number
}

export interface SettingsResponse {
  values: Record<string, string>
}

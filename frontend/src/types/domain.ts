export type RiskLevel = 'low' | 'medium' | 'high'

export interface SummaryCard {
  total_districts: number
  high_risk_count: number
  medium_risk_count: number
  low_risk_count: number
  last_updated: string
}

export interface Hotspot {
  district_id: number
  district_name: string
  state_name: string
  latitude: number
  longitude: number
  risk_score: number
  risk_level: RiskLevel
  trend_direction: 'up' | 'down' | 'stable' | string
  zone_type?: string
}

export interface DashboardResponse {
  summary: SummaryCard
  hotspots: Hotspot[]
}

export interface TrendPoint {
  date: string
  risk_score: number
  risk_level: RiskLevel
}

export interface TrendsResponse {
  district_id: number
  district_name: string
  points: TrendPoint[]
}

export interface AlertItem {
  id: number
  district_id: number
  district_name: string
  title: string
  message: string
  risk_score: number
  risk_level: RiskLevel
  status: string
  created_at: string
  acknowledged: boolean
}

export interface HeatmapPoint {
  district_id: number
  district_name: string
  latitude: number
  longitude: number
  state_name: string
  zone_type?: string
  risk_score: number
  risk_level: RiskLevel
}

export interface SettingsState {
  risk_low_threshold: number
  risk_high_threshold: number
  alerting_enabled: boolean
  updated_at: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  email: string
  role: string
}

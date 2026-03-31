import { api } from '../lib/api'
import type {
  AlertItem,
  DashboardResponse,
  HeatmapPoint,
  LoginResponse,
  SettingsState,
  TrendsResponse,
} from '../types/domain'
import type {
  AlertsResponse as LegacyAlertsResponse,
  DashboardResponse as LegacyDashboardResponse,
  HeatmapResponse as LegacyHeatmapResponse,
  SettingsResponse as LegacySettingsResponse,
  TrendsResponse as LegacyTrendsResponse,
} from '../types/api'

type BackendDashboardSummary = {
  total_districts: number
  high_risk_count: number
  medium_risk_count: number
  low_risk_count: number
  updated_at: string | null
  hotspots: Array<{
    district_id: number
    district_name: string
    state_name: string
    zone_type: string
    latitude: number
    longitude: number
    score: number
    risk_level: 'low' | 'medium' | 'high'
  }>
}

type BackendTrendResponse = {
  district_id: number
  district_name: string
  points: Array<{ date: string; score: number; risk_level: 'low' | 'medium' | 'high' }>
}

type BackendAlert = {
  id: number
  district_id: number
  district_name: string
  title: string
  message: string
  score: number
  severity: string
  status: string
  created_at: string
}

type BackendSettings = {
  values: Record<string, string>
}

const toTrendDirection = (riskLevel: string): string => {
  if (riskLevel === 'high') return 'up'
  if (riskLevel === 'medium') return 'stable'
  return 'down'
}

const toRiskLevelFromScore = (score: number): 'low' | 'medium' | 'high' => {
  if (score >= 0.7) return 'high'
  if (score >= 0.4) return 'medium'
  return 'low'
}

const mapHotspot = (item: BackendDashboardSummary['hotspots'][number]): HeatmapPoint => ({
  district_id: item.district_id,
  district_name: item.district_name,
  latitude: item.latitude,
  longitude: item.longitude,
  state_name: item.state_name,
  zone_type: item.zone_type,
  risk_score: item.score,
  risk_level: item.risk_level,
})

const mapAlert = (item: BackendAlert): AlertItem => ({
  id: item.id,
  district_id: item.district_id,
  district_name: item.district_name,
  title: item.title,
  message: item.message,
  risk_score: item.score,
  risk_level: toRiskLevelFromScore(item.score),
  status: item.status,
  created_at: item.created_at,
  acknowledged: item.status !== 'active',
})

export const getDashboardSummary = async (): Promise<DashboardResponse> => {
  const response = await api.get<BackendDashboardSummary>('/api/dashboard/summary')
  return {
    summary: {
      total_districts: response.total_districts,
      high_risk_count: response.high_risk_count,
      medium_risk_count: response.medium_risk_count,
      low_risk_count: response.low_risk_count,
      last_updated: response.updated_at ?? new Date().toISOString(),
    },
    hotspots: response.hotspots.map((item) => ({
      ...mapHotspot(item),
      trend_direction: toTrendDirection(item.risk_level),
    })),
  }
}

export const getHeatmapPoints = async (): Promise<HeatmapPoint[]> => {
  const response = await api.get<BackendDashboardSummary['hotspots']>('/api/hotspots')
  return response.map(mapHotspot)
}

export const getTrends = async (districtId: number, days = 30): Promise<TrendsResponse> => {
  const response = await api.get<BackendTrendResponse>(`/api/trends?district_id=${districtId}&days=${days}`)
  return {
    district_id: response.district_id,
    district_name: response.district_name,
    points: response.points.map((point) => ({
      date: point.date,
      risk_score: point.score,
      risk_level: point.risk_level,
    })),
  }
}

export const getAlerts = async (): Promise<AlertItem[]> => {
  const response = await api.get<BackendAlert[]>('/api/alerts')
  return response.map(mapAlert)
}

export const getSettings = async (): Promise<SettingsState> => {
  const response = await api.get<BackendSettings>('/api/settings')
  return {
    risk_low_threshold: Number(response.values.risk_low_threshold ?? '0.4'),
    risk_high_threshold: Number(response.values.risk_high_threshold ?? '0.7'),
    alerting_enabled: response.values.read_only_demo !== 'true',
    updated_at: new Date().toISOString(),
  }
}

export const login = (email: string, password: string) =>
  api.post<LoginResponse>('/api/auth/login', { email, password })

export const dataSource = {
  mode: 'api' as const,
  getDashboardSummary: async (): Promise<LegacyDashboardResponse> => {
    const data = await getDashboardSummary()
    return {
      generated_at: data.summary.last_updated,
      kpis: [
        { label: 'Total districts', value: String(data.summary.total_districts), trend: 'Live API' },
        { label: 'High risk', value: String(data.summary.high_risk_count), trend: 'Live API' },
        { label: 'Medium risk', value: String(data.summary.medium_risk_count), trend: 'Live API' },
      ],
      top_hotspots: data.hotspots.map((item) => ({
        district_code: String(item.district_id),
        district_name: item.district_name,
        risk_score: item.risk_score,
        risk_level: item.risk_level,
      })),
      recent_alerts: (await getAlerts()).slice(0, 5).map((item) => ({
        id: item.id,
        title: item.title,
        severity: item.risk_level,
        status: item.status,
        district_code: String(item.district_id),
        created_at: item.created_at,
      })),
      decision_summary: 'Live dashboard summary from backend integration.',
      contributing_factors: ['water level', 'drainage', 'sanitation', 'vulnerability', 'density', 'alerts'],
    }
  },
  getHeatmap: async (): Promise<LegacyHeatmapResponse> => ({
    items: (await getHeatmapPoints()).map((item) => ({
      district_code: String(item.district_id),
      district_name: item.district_name,
      latitude: item.latitude,
      longitude: item.longitude,
      risk_score: item.risk_score,
      risk_level: item.risk_level,
      confidence_score: item.risk_score,
    })),
  }),
  getTrends: async (district: string, days: number): Promise<LegacyTrendsResponse> => {
    const response = await getTrends(Number(district) || 1, days)
    return {
      district_code: String(response.district_id),
      district_name: response.district_name,
      points: response.points.map((point) => ({
        date: point.date,
        risk_score: point.risk_score,
        risk_level: point.risk_level,
        confidence_score: point.risk_score,
      })),
      summary: `Live trends for ${response.district_name}`,
    }
  },
  getAlerts: async (): Promise<LegacyAlertsResponse> => {
    const items = await getAlerts()
    return {
      items: items.map((item) => ({
        id: item.id,
        district_id: item.district_id,
        title: item.title,
        message: item.message,
        severity: item.risk_level,
        status: item.status,
        source: 'api',
        created_at: item.created_at,
        updated_at: item.created_at,
      })),
      total: items.length,
    }
  },
  patchAlert: async (_id: number, _status: string): Promise<LegacyAlertsResponse['items'][number]> => {
    throw new Error('Write actions are disabled in read-only demo mode')
  },
  getSettings: async (): Promise<LegacySettingsResponse> => {
    const settings = await getSettings()
    return {
      values: {
        risk_low_threshold: String(settings.risk_low_threshold),
        risk_high_threshold: String(settings.risk_high_threshold),
        alerting_enabled: String(settings.alerting_enabled),
        updated_at: settings.updated_at,
      },
    }
  },
  putSettings: async (_values: Record<string, string>): Promise<LegacySettingsResponse> => {
    throw new Error('Write actions are disabled in read-only demo mode')
  },
  ingestCsv: async (_file: File): Promise<{ message: string }> => {
    throw new Error('Write actions are disabled in read-only demo mode')
  },
}

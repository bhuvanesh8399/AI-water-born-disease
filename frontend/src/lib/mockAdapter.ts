import alerts from '../mock/alerts.json'
import dashboard from '../mock/dashboard.json'
import heatmap from '../mock/heatmap.json'
import settings from '../mock/settings.json'
import trends from '../mock/trends.json'
import type {
  AlertItem,
  AlertsResponse,
  DashboardResponse,
  HeatmapResponse,
  SettingsResponse,
  TrendsResponse,
} from '../types/api'

export const mockAdapter = {
  getDashboardSummary: async (): Promise<DashboardResponse> => dashboard as DashboardResponse,
  getHeatmap: async (): Promise<HeatmapResponse> => heatmap as HeatmapResponse,
  getTrends: async (_district?: string, _days?: number): Promise<TrendsResponse> => trends as TrendsResponse,
  getAlerts: async (): Promise<AlertsResponse> => ({ items: alerts as AlertItem[], total: alerts.length }),
  patchAlert: async (id: number, status: string): Promise<AlertItem> => {
    const item = alerts.find((entry) => entry.id === id)
    if (!item) throw new Error('Alert not found')
    item.status = status
    return item as AlertItem
  },
  getSettings: async (): Promise<SettingsResponse> => settings as SettingsResponse,
  putSettings: async (values: Record<string, string>): Promise<SettingsResponse> => ({ values }),
  ingestCsv: async (_file?: File): Promise<{ message: string }> => ({ message: 'CSV ingested in mock mode' }),
}

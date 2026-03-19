import { mockAdapter } from '../lib/mockAdapter'
import type { AlertsResponse, DashboardResponse, HeatmapResponse, SettingsResponse, TrendsResponse } from '../types/api'
import { endpoints } from './endpoints'
import { httpGet, httpPatch, httpPostForm, httpPut } from './http'

const mode = (import.meta.env.VITE_DATA_MODE ?? 'mock') as 'api' | 'mock'

export const dataSource = {
  mode,
  getDashboardSummary: async (): Promise<DashboardResponse> => {
    if (mode === 'mock') return mockAdapter.getDashboardSummary() as Promise<DashboardResponse>
    return httpGet<DashboardResponse>(endpoints.dashboardSummary)
  },
  getHeatmap: async (): Promise<HeatmapResponse> => {
    if (mode === 'mock') return mockAdapter.getHeatmap() as Promise<HeatmapResponse>
    return httpGet<HeatmapResponse>(endpoints.heatmap)
  },
  getTrends: async (district: string, days: number): Promise<TrendsResponse> => {
    if (mode === 'mock') return mockAdapter.getTrends(district, days) as Promise<TrendsResponse>
    return httpGet<TrendsResponse>(endpoints.trends(district, days))
  },
  getAlerts: async (params?: { status?: string; severity?: string; district?: string; limit?: number }): Promise<AlertsResponse> => {
    if (mode === 'mock') return mockAdapter.getAlerts() as Promise<AlertsResponse>
    return httpGet<AlertsResponse>(endpoints.alerts(params))
  },
  patchAlert: async (id: number, status: string) => {
    if (mode === 'mock') return mockAdapter.patchAlert(id, status)
    return httpPatch(endpoints.patchAlert(id), { status })
  },
  getSettings: async (): Promise<SettingsResponse> => {
    if (mode === 'mock') return mockAdapter.getSettings() as Promise<SettingsResponse>
    return httpGet<SettingsResponse>(endpoints.settings)
  },
  putSettings: async (values: Record<string, string>): Promise<SettingsResponse> => {
    if (mode === 'mock') return mockAdapter.putSettings(values) as Promise<SettingsResponse>
    return httpPut<SettingsResponse>(endpoints.settings, { values })
  },
  ingestCsv: async (file: File) => {
    if (mode === 'mock') return mockAdapter.ingestCsv(file)
    const form = new FormData()
    form.append('file', file)
    return httpPostForm<{ message: string }>(endpoints.ingestCsv, form)
  },
}

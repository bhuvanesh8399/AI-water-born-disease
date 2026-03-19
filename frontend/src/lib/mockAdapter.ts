import alerts from '../mock/alerts.json'
import dashboard from '../mock/dashboard.json'
import heatmap from '../mock/heatmap.json'
import settings from '../mock/settings.json'
import trends from '../mock/trends.json'

export const mockAdapter = {
  getDashboardSummary: async () => dashboard,
  getHeatmap: async () => heatmap,
  getTrends: async () => trends,
  getAlerts: async () => ({ items: alerts, total: alerts.length }),
  patchAlert: async (id: number, status: string) => {
    const item = alerts.find((entry) => entry.id === id)
    if (!item) throw new Error('Alert not found')
    item.status = status
    return item
  },
  getSettings: async () => settings,
  putSettings: async (values: Record<string, string>) => ({ values }),
  ingestCsv: async () => ({ message: 'CSV ingested in mock mode' }),
}

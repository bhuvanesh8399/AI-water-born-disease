export const endpoints = {
  authLogin: '/api/auth/login',
  dashboardSummary: '/api/dashboard/summary',
  heatmap: '/api/heatmap',
  trends: (district: string, days: number) => `/api/trends?district=${encodeURIComponent(district)}&days=${days}`,
  alerts: (params?: { status?: string; severity?: string; district?: string; limit?: number }) => {
    const search = new URLSearchParams()
    if (params?.status) search.set('status', params.status)
    if (params?.severity) search.set('severity', params.severity)
    if (params?.district) search.set('district', params.district)
    if (params?.limit) search.set('limit', String(params.limit))
    return `/api/alerts${search.toString() ? `?${search.toString()}` : ''}`
  },
  patchAlert: (id: number) => `/api/alerts/${id}`,
  settings: '/api/settings',
  ingestCsv: '/api/ingest/observations/csv',
  reportAlertsCsv: '/api/reports/alerts.csv',
  reportAlertsPdf: '/api/reports/alerts.pdf',
}

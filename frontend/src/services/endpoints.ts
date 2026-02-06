export const endpoints = {
  riskSummary: "/api/risk/summary",
  alerts: "/api/alerts",
  trends: "/api/risk/trends",
  ackAlert: (id: string) => `/api/alerts/${id}/ack`,
};

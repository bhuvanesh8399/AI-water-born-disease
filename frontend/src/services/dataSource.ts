import riskSummaryMock from "../mock/riskSummary.json";
import alertsMock from "../mock/alerts.json";
import trendsMock from "../mock/trends.json";
import type { AlertItem, RiskSummary, TrendPoint } from "../types/domain";
import { api } from "./api";
import { endpoints } from "./endpoints";

export type DataMode = "MOCK" | "API";

// Toggle here (later we’ll also expose it in Settings UI)
const mode: DataMode = (import.meta.env.VITE_DATA_MODE as DataMode) || "MOCK";

export async function getRiskSummary(): Promise<RiskSummary> {
  if (mode === "MOCK") return riskSummaryMock as RiskSummary;
  const res = await api.get(endpoints.riskSummary);
  return res.data;
}

export async function getAlerts(): Promise<AlertItem[]> {
  if (mode === "MOCK") return alertsMock as AlertItem[];
  const res = await api.get(endpoints.alerts);
  return res.data;
}

export async function getTrends(): Promise<TrendPoint[]> {
  if (mode === "MOCK") return trendsMock as TrendPoint[];
  const res = await api.get(endpoints.trends);
  return res.data;
}

export async function acknowledgeAlert(id: string): Promise<{ ok: boolean }> {
  if (mode === "MOCK") return { ok: true };
  const res = await api.post(endpoints.ackAlert(id));
  return res.data;
}

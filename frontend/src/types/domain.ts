export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type AlertStatus = "NEW" | "ACK" | "ESCALATED" | "RESOLVED";

export type Hotspot = {
  areaId: string;
  name: string;
  riskScore: number;
  riskLevel: RiskLevel;
  lat: number;
  lng: number;
};

export type RiskSummary = {
  district: string;
  updatedAt: string; // ISO
  riskScore: number; // 0-100 (overall)
  riskLevel: RiskLevel;
  confidence: number; // 0-1
  topReasons: string[];
  hotspots: Hotspot[];
};

export type AlertItem = {
  id: string;
  areaId: string;
  areaName: string;
  severity: RiskLevel;
  status: AlertStatus;
  createdAt: string; // ISO
  message: string;
};

export type TrendPoint = {
  week: string; // e.g. 2026-W05
  cases: number;
  rainfall: number;
  complaints: number;
  riskScore: number;
};

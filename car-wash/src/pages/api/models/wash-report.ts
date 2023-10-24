import { Wash } from "./wash";

export interface WashReport {
  data: Partial<Wash>[];
  totalRate: number;
}

export interface MonthlyReportResponse {
  data: MonthlyReport[];
  totalBalance: number;
}

export interface MonthlyReport {
  week: string;
  washerCount: number;
  total: number;
}
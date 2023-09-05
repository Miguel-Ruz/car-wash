import { Wash } from "./wash";

export interface WashReport {
  data: Partial<Wash>[];
  totalRate: number;
}

export interface MonthlyReport {
  week: string;
  washerCount: number;
  total: number;
}
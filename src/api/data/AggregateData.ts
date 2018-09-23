export interface DayData {
  morning: number;
  noon: number;
  evening: number;
  other: number;
  Male: number;
  Female: number;
  Other: number;
  totalAge: number;
  numTransactions: number;
  totalSpent: number;
}

export interface AggregateData {
  min_lat: number;
  max_lat: number;
  min_lon: number;
  max_lon: number;
  totalIncome: number;
  Monday: DayData;
  Tuesday: DayData;
  Wednesday: DayData;
  Thursday: DayData;
  Friday: DayData;
  Saturday: DayData;
  Sunday: DayData;
}

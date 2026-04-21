export interface Habit {
  id: string;
  name: string;
  color: string;
  createdAt: number;
  completedDates: string[]; // ISO format YYYY-MM-DD
}

export interface WeeklyProgress {
  day: string;
  count: number;
  percentage: number;
}

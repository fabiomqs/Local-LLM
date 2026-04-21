export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
}

export interface WeeklyProgressPoint {
  date: string;
  completed: number;
  total: number;
}

export interface WeeklyCompletionStats {
  completed: number;
  possible: number;
  rate: number;
}

export interface ConsistentHabitStat {
  habitId: string;
  name: string;
  rate: number;
  streak: number;
}

export interface WeekdayStat {
  weekday: string;
  completed: number;
  possible: number;
  rate: number;
}

import { Habit } from './habit';

export interface HabitStats {
  mostConsistent: Habit | null;
  currentStreak: number;
  weeklyCompletionRate: number;
  bestDay: { day: string; rate: number };
  worstDay: { day: string; rate: number };
  weeklyData: { day: string; label: string; completed: number; total: number; rate: number }[];
}
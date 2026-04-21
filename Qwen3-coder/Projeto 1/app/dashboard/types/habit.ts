export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'custom';
  createdAt: string;
  completedDates: string[];
  streak: number;
  longestStreak: number;
  goal: number;
  unit: string;
  color: string;
  category: string;
  isArchived: boolean;
  isDeleted: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
}
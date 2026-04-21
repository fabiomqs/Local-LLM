export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
}

export interface HabitStore {
  habits: Habit[];
  lastUpdated: string;
}
export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
}

export interface HabitsData {
  habits: Habit[];
}

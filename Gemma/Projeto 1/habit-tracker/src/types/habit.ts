export interface Habit {
  id: string;
  name: string;
  completedDates: string[]; // Array of ISO strings (YYYY-MM-DD)
  createdAt: string;
}

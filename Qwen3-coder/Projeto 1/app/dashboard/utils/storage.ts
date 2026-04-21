import { Habit } from "../types/habit";

const STORAGE_KEY = 'habit-tracker';

export function loadHabits(): Habit[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const data = JSON.parse(stored);
    // Ensure backwards compatibility with old storage format
    if (!data.habits && Array.isArray(data)) {
      return data;
    }
    return data.habits || [];
  } catch (error) {
    console.error('Failed to load habits:', error);
    return [];
  }
}

export function saveHabits(habits: Habit[]): boolean {
  try {
    const storage = {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      habits: habits
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    return true;
  } catch (error) {
    console.error('Failed to save habits:', error);
    return false;
  }
}

export function addHabit(habit: Habit): boolean {
  const habits = loadHabits();
  habits.push(habit);
  return saveHabits(habits);
}

export function updateHabit(habitId: string, updates: Partial<Habit>): boolean {
  const habits = loadHabits();
  const index = habits.findIndex(h => h.id === habitId);
  
  if (index !== -1) {
    habits[index] = { ...habits[index], ...updates };
    return saveHabits(habits);
  }
  
  return false;
}

export function removeHabit(habitId: string): boolean {
  const habits = loadHabits();
  const updatedHabits = habits.filter(h => h.id !== habitId);
  return saveHabits(updatedHabits);
}

export function completeHabit(habitId: string, date: Date = new Date()): boolean {
  const habits = loadHabits();
  const habitIndex = habits.findIndex(h => h.id === habitId);
  
  if (habitIndex === -1) return false;
  
  const habit = habits[habitIndex];
  const dateString = date.toISOString().split('T')[0]; // yyyy-MM-dd
  
  // Add date to completed dates if not already there
  if (!habit.completedDates.includes(dateString)) {
    habit.completedDates.push(dateString);
    habit.streak = calculateStreak(habit, date);
    
    // Update longest streak if needed
    if (habit.streak > habit.longestStreak) {
      habit.longestStreak = habit.streak;
    }
  }
  
  return saveHabits(habits);
}

function calculateStreak(habit: Habit, referenceDate: Date = new Date()): number {
  // Get all completed dates (for active habits)
  const completedDates = habit.completedDates.map(dateStr => new Date(dateStr));
  
  // Sort dates in descending order
  completedDates.sort((a, b) => b.getTime() - a.getTime());
  
  // Handle case of no completions
  if (completedDates.length === 0) return 0;
  
  let streak = 0;
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  
  // Iterate backwards to count consecutive days
  for (let i = 0; i < completedDates.length; i++) {
    const currentDate = completedDates[i];
    const expectedPreviousDate = new Date(today);
    expectedPreviousDate.setDate(expectedPreviousDate.getDate() - i);
    
    if (currentDate.getTime() === expectedPreviousDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}
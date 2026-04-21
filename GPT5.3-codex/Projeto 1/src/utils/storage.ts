import type { Habit } from "../types";

const STORAGE_KEY = "habit_tracker_v1";

interface PersistedData {
  habits: Habit[];
}

function isHabitShape(value: unknown): value is Habit {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Habit;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.createdAt === "string" &&
    Array.isArray(candidate.completedDates) &&
    candidate.completedDates.every((date) => typeof date === "string")
  );
}

export function loadHabits(): Habit[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as PersistedData;
    if (!parsed || !Array.isArray(parsed.habits)) {
      return [];
    }

    return parsed.habits.filter(isHabitShape);
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  const payload: PersistedData = { habits };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

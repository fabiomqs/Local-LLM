import type {
  ConsistentHabitStat,
  Habit,
  WeekdayStat,
  WeeklyCompletionStats,
  WeeklyProgressPoint
} from "../types";
import { addDays, getLastNDays, todayLocalDate } from "./date-utils";

const WEEKDAYS_MONDAY_FIRST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekdayLabel(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const jsDay = new Date(year, month - 1, day).getDay();
  const mondayFirstIndex = jsDay === 0 ? 6 : jsDay - 1;
  return WEEKDAYS_MONDAY_FIRST[mondayFirstIndex];
}

export function getHabitStreak(habit: Habit): number {
  if (habit.completedDates.length === 0) {
    return 0;
  }

  const uniqueDates = Array.from(new Set(habit.completedDates)).sort((a, b) =>
    a < b ? 1 : -1
  );

  let streak = 1;
  let cursor = uniqueDates[0];

  for (let index = 1; index < uniqueDates.length; index += 1) {
    const expectedPreviousDate = addDays(cursor, -1);
    if (uniqueDates[index] !== expectedPreviousDate) {
      break;
    }
    streak += 1;
    cursor = uniqueDates[index];
  }

  return streak;
}

export function isHabitDoneToday(habit: Habit): boolean {
  const today = todayLocalDate();
  return habit.completedDates.includes(today);
}

export function getWeeklySeries(habits: Habit[]): WeeklyProgressPoint[] {
  const days = getLastNDays(7);
  const totalHabits = habits.length;

  return days.map((date) => {
    const completed = habits.reduce((count, habit) => {
      return habit.completedDates.includes(date) ? count + 1 : count;
    }, 0);

    return {
      date,
      completed,
      total: totalHabits
    };
  });
}

export function getWeeklyCompletionRate(habits: Habit[]): number {
  return getWeeklyCompletionStats(habits).rate;
}

export function getWeeklyCompletionStats(habits: Habit[]): WeeklyCompletionStats {
  if (habits.length === 0) {
    return { completed: 0, possible: 0, rate: 0 };
  }

  const series = getWeeklySeries(habits);
  const completed = series.reduce((sum, day) => sum + day.completed, 0);
  const possible = habits.length * 7;
  const rate = possible === 0 ? 0 : Math.round((completed / possible) * 100);
  return { completed, possible, rate };
}

export function getMostConsistentHabit(habits: Habit[]): ConsistentHabitStat | null {
  if (habits.length === 0) {
    return null;
  }

  const last7Days = new Set(getLastNDays(7));
  const sorted = habits
    .map((habit) => {
      const completedInWindow = habit.completedDates.reduce((count, date) => {
        return last7Days.has(date) ? count + 1 : count;
      }, 0);
      const rate = Math.round((completedInWindow / 7) * 100);

      return {
        habitId: habit.id,
        name: habit.name,
        rate,
        streak: getHabitStreak(habit)
      };
    })
    .sort((a, b) => {
      if (b.rate !== a.rate) {
        return b.rate - a.rate;
      }
      if (b.streak !== a.streak) {
        return b.streak - a.streak;
      }
      return a.name.localeCompare(b.name);
    });

  return sorted[0];
}

export function getBestAndWorstWeekday(habits: Habit[]): {
  best: WeekdayStat | null;
  worst: WeekdayStat | null;
  series: WeekdayStat[];
} {
  const dates = getLastNDays(7);
  const totalHabits = habits.length;
  const weekdayMap = new Map<string, WeekdayStat>();

  WEEKDAYS_MONDAY_FIRST.forEach((weekday) => {
    weekdayMap.set(weekday, {
      weekday,
      completed: 0,
      possible: 0,
      rate: 0
    });
  });

  dates.forEach((date) => {
    const weekday = getWeekdayLabel(date);
    const current = weekdayMap.get(weekday);
    if (!current) {
      return;
    }

    const completed = habits.reduce((count, habit) => {
      return habit.completedDates.includes(date) ? count + 1 : count;
    }, 0);

    current.completed += completed;
    current.possible += totalHabits;
  });

  const series = WEEKDAYS_MONDAY_FIRST.map((weekday) => {
    const stat = weekdayMap.get(weekday)!;
    return {
      ...stat,
      rate: stat.possible === 0 ? 0 : Math.round((stat.completed / stat.possible) * 100)
    };
  });

  const ranked = [...series].sort((a, b) => {
    if (b.rate !== a.rate) {
      return b.rate - a.rate;
    }
    if (b.completed !== a.completed) {
      return b.completed - a.completed;
    }
    return a.weekday.localeCompare(b.weekday);
  });

  return {
    best: ranked[0] ?? null,
    worst: ranked[ranked.length - 1] ?? null,
    series
  };
}

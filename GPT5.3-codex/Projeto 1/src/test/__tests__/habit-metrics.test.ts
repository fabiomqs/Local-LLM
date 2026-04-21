import { describe, expect, it } from "vitest";
import type { Habit } from "../../types";
import { getHabitStreak } from "../../utils/habit-metrics";

function createHabit(completedDates: string[]): Habit {
  return {
    id: "habit-1",
    name: "Test Habit",
    createdAt: "2026-04-21T00:00:00.000Z",
    completedDates
  };
}

describe("getHabitStreak", () => {
  it("returns 0 when habit has no completions", () => {
    const habit = createHabit([]);

    expect(getHabitStreak(habit)).toBe(0);
  });

  it("calculates consecutive days from latest completion", () => {
    const habit = createHabit([
      "2026-04-19",
      "2026-04-21",
      "2026-04-20",
      "2026-04-17",
      "2026-04-21"
    ]);

    expect(getHabitStreak(habit)).toBe(3);
  });
});

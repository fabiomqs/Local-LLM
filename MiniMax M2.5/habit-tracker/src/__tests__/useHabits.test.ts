import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "@testing-library/react";
import { useHabits } from "../hooks/useHabits";
import { renderHook } from "@testing-library/react";

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("useHabits", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();
  });

  it("deve iniciar com hábitos vazios", () => {
    const { result } = renderHook(() => useHabits());
    expect(result.current.habits).toEqual([]);
  });

  it("deve adicionar um novo hábito", async () => {
    const { result } = renderHook(() => useHabits());

    await act(async () => {
      result.current.addHabit("Estudar TypeScript");
    });

    expect(result.current.habits).toHaveLength(1);
    expect(result.current.habits[0].name).toBe("Estudar TypeScript");
  });

  it("deve remover um hábito", async () => {
    const { result } = renderHook(() => useHabits());

    await act(async () => {
      result.current.addHabit("Estudar TypeScript");
    });

    const habitId = result.current.habits[0].id;

    await act(async () => {
      result.current.removeHabit(habitId);
    });

    expect(result.current.habits).toHaveLength(0);
  });

  it("deve marcar hábito como feito no dia atual", async () => {
    const today = new Date().toISOString().split("T")[0];
    const { result } = renderHook(() => useHabits());

    await act(async () => {
      result.current.addHabit("Academia");
    });

    const habitId = result.current.habits[0].id;

    await act(async () => {
      result.current.toggleCompletion(habitId, today);
    });

    expect(result.current.habits[0].completedDates).toContain(today);
  });

  it("deve desmarcar hábito quando já marcado", async () => {
    const today = new Date().toISOString().split("T")[0];
    const { result } = renderHook(() => useHabits());

    await act(async () => {
      result.current.addHabit("Academia");
    });

    const habitId = result.current.habits[0].id;

    await act(async () => {
      result.current.toggleCompletion(habitId, today);
    });

    await act(async () => {
      result.current.toggleCompletion(habitId, today);
    });

    expect(result.current.habits[0].completedDates).not.toContain(today);
  });

  it("deve calcular streak corretamente", async () => {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000);
    const dayBeforeYesterday = new Date(today.getTime() - 2 * 86400000);

    const todayStr = today.toISOString().split("T")[0];
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const dayBeforeYesterdayStr = dayBeforeYesterday.toISOString().split("T")[0];

    const { result } = renderHook(() => useHabits());

    await act(async () => {
      result.current.addHabit("Leitura");
    });

    const habitId = result.current.habits[0].id;

    await act(async () => {
      result.current.toggleCompletion(habitId, dayBeforeYesterdayStr);
      result.current.toggleCompletion(habitId, yesterdayStr);
      result.current.toggleCompletion(habitId, todayStr);
    });

    const { calculateStreak } = result.current;
    const streak = calculateStreak(result.current.habits[0]);

    expect(streak).toBe(3);
  });

  it("deve retornar streak zero quando nada completado", () => {
    const { result } = renderHook(() => useHabits());

    const habit = {
      id: "1",
      name: "Teste",
      createdAt: "2024-01-01",
      completedDates: [],
    };

    const streak = result.current.calculateStreak(habit);
    expect(streak).toBe(0);
  });

  it("deve quebrar streak quando não completar dia anterior", async () => {
    const today = new Date();
    const dayBeforeYesterday = new Date(today.getTime() - 2 * 86400000);

    const todayStr = today.toISOString().split("T")[0];
    const dayBeforeYesterdayStr = dayBeforeYesterday.toISOString().split("T")[0];

    const { result } = renderHook(() => useHabits());

    await act(async () => {
      result.current.addHabit("Leitura");
    });

    const habitId = result.current.habits[0].id;

    await act(async () => {
      result.current.toggleCompletion(habitId, dayBeforeYesterdayStr);
      result.current.toggleCompletion(habitId, todayStr);
    });

    const streak = result.current.calculateStreak(result.current.habits[0]);
    expect(streak).toBe(1);
  });
});
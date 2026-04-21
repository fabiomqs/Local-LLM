import { renderHook, act } from '@testing-library/react';
import { useHabits } from './useHabits';
import { expect, it, describe, beforeEach } from 'vitest';

describe('useHabits Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with an empty habits array', () => {
    const { result } = renderHook(() => useHabits());
    expect(result.current.habits).toEqual([]);
  });

  it('should add a new habit', () => {
    const { result } = renderHook(() => useHabits());
    
    act(() => {
      result.current.addHabit('Correr', '#ff0000');
    });

    expect(result.current.habits).toHaveLength(1);
    expect(result.current.habits[0].name).toBe('Correr');
  });

  it('should remove a habit', () => {
    const { result } = renderHook(() => useHabits());
    
    act(() => {
      result.current.addHabit('Correr', '#ff0000');
    });
    
    const habitId = result.current.habits[0].id;
    
    act(() => {
      result.current.removeHabit(habitId);
    });

    expect(result.current.habits).toHaveLength(0);
  });

  it('should toggle a habit as completed', () => {
    const { result } = renderHook(() => useHabits());
    const today = new Date().toISOString().split('T')[0];
    
    act(() => {
      result.current.addHabit('Meditar', '#00ff00');
    });
    
    const habitId = result.current.habits[0].id;
    
    act(() => {
      result.current.toggleHabit(habitId, today);
    });

    expect(result.current.habits[0].completedDates).toContain(today);
    
    act(() => {
      result.current.toggleHabit(habitId, today);
    });

    expect(result.current.habits[0].completedDates).not.toContain(today);
  });

  it('should calculate streak correctly', () => {
    const { result } = renderHook(() => useHabits());
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];

    act(() => {
      result.current.addHabit('Estudar', '#0000ff');
    });

    const habitId = result.current.habits[0].id;

    // Test 3 days streak
    act(() => {
      result.current.toggleHabit(habitId, todayStr);
      result.current.toggleHabit(habitId, yesterdayStr);
      result.current.toggleHabit(habitId, twoDaysAgoStr);
    });

    const streak = result.current.calculateStreak(result.current.habits[0]);
    expect(streak).toBe(3);
  });

  it('should maintain streak if completed yesterday but not today yet', () => {
    const { result } = renderHook(() => useHabits());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    act(() => {
      result.current.addHabit('Ler', '#ffffff');
    });

    const habitId = result.current.habits[0].id;

    act(() => {
      result.current.toggleHabit(habitId, yesterdayStr);
    });

    const streak = result.current.calculateStreak(result.current.habits[0]);
    expect(streak).toBe(1);
  });
});

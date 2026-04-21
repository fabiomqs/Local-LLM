import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useHabits } from './useHabits'

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

vi.stubGlobal('localStorage', mockLocalStorage)

describe('useHabits', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
  })

  describe('initialization', () => {
    it('loads habits from localStorage', () => {
      const storedData = { habits: [{ id: '1', name: 'Test', createdAt: '2024-01-01', completedDates: [] }] }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedData))

      const { result } = renderHook(() => useHabits())
      
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('habits-data')
    })

    it('initializes with empty array when no data', () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      const { result } = renderHook(() => useHabits())
      
      expect(result.current.habits).toEqual([])
    })
  })

  describe('addHabit', () => {
    it('adds a new habit', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const { result } = renderHook(() => useHabits())

      await act(async () => {
        result.current.addHabit('Exercise')
      })

      expect(result.current.habits).toHaveLength(1)
      expect(result.current.habits[0].name).toBe('Exercise')
    })

    it('does not add empty habit', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const { result } = renderHook(() => useHabits())

      await act(async () => {
        result.current.addHabit('   ')
      })

      expect(result.current.habits).toHaveLength(0)
    })

    it('generates unique id for each habit', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const { result } = renderHook(() => useHabits())

      await act(async () => {
        result.current.addHabit('Habit 1')
        result.current.addHabit('Habit 2')
      })

      expect(result.current.habits[0].id).not.toBe(result.current.habits[1].id)
    })

    it('trims whitespace from habit name', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const { result } = renderHook(() => useHabits())

      await act(async () => {
        result.current.addHabit('  Exercise  ')
      })

      expect(result.current.habits[0].name).toBe('Exercise')
    })
  })

  describe('removeHabit', () => {
    it('removes habit by id', async () => {
      const storedData = { habits: [{ id: '1', name: 'Test', createdAt: '2024-01-01', completedDates: [] }] }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedData))

      const { result } = renderHook(() => useHabits())

      await act(async () => {
        result.current.removeHabit('1')
      })

      expect(result.current.habits).toHaveLength(0)
    })

    it('does not affect other habits', async () => {
      const storedData = { 
        habits: [
          { id: '1', name: 'Test 1', createdAt: '2024-01-01', completedDates: [] },
          { id: '2', name: 'Test 2', createdAt: '2024-01-01', completedDates: [] },
        ] 
      }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedData))

      const { result } = renderHook(() => useHabits())

      await act(async () => {
        result.current.removeHabit('1')
      })

      expect(result.current.habits).toHaveLength(1)
      expect(result.current.habits[0].name).toBe('Test 2')
    })
  })

  describe('toggleHabit', () => {
    it('marks habit as done today', async () => {
      const storedData = { habits: [{ id: '1', name: 'Test', createdAt: '2024-01-01', completedDates: [] }] }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedData))

      const { result } = renderHook(() => useHabits())
      const today = new Date().toISOString().split('T')[0]

      await act(async () => {
        result.current.toggleHabit('1')
      })

      expect(result.current.habits[0].completedDates).toContain(today)
    })

    it('unmarks habit if already done today', async () => {
      const today = new Date().toISOString().split('T')[0]
      const storedData = { habits: [{ id: '1', name: 'Test', createdAt: '2024-01-01', completedDates: [today] }] }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedData))

      const { result } = renderHook(() => useHabits())

      await act(async () => {
        result.current.toggleHabit('1')
      })

      expect(result.current.habits[0].completedDates).not.toContain(today)
    })
  })

  describe('persistence', () => {
    it('saves to localStorage when habits change', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const { result } = renderHook(() => useHabits())

      await act(async () => {
        result.current.addHabit('Test')
      })

      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })
  })
})
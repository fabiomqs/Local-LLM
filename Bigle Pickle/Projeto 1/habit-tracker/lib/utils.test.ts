import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  generateId,
  getToday,
  getDateString,
  getLast7Days,
  calculateStreak,
  getDayName,
} from './utils'

describe('utils', () => {
  describe('getToday', () => {
    it('returns today in YYYY-MM-DD format', () => {
      const today = getToday()
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  describe('getDateString', () => {
    it('returns date in YYYY-MM-DD format', () => {
      const date = new Date('2024-01-15T12:00:00Z')
      expect(getDateString(date)).toBe('2024-01-15')
    })
  })

  describe('getLast7Days', () => {
    it('returns array of 7 days', () => {
      const days = getLast7Days()
      expect(days).toHaveLength(7)
    })

    it('returns dates in descending order from today to 6 days ago', () => {
      const days = getLast7Days()
      const today = getToday()
      expect(days[6]).toBe(today)
      expect(days[0]).not.toBe(today)
    })
  })

  describe('calculateStreak', () => {
    it('returns 0 for empty array', () => {
      expect(calculateStreak([])).toBe(0)
    })

    it('returns 1 for habit completed today', () => {
      const today = getToday()
      expect(calculateStreak([today])).toBe(1)
    })

    it('returns streak for consecutive days', () => {
      const today = getToday()
      const yesterday = getDateString(new Date(Date.now() - 86400000))
      const day2 = getDateString(new Date(Date.now() - 172800000))

      expect(calculateStreak([today, yesterday, day2])).toBe(3)
    })

    it('returns correct streak for non-consecutive days', () => {
      const today = getToday()
      const yesterday = getDateString(new Date(Date.now() - 86400000))
      const day3 = getDateString(new Date(Date.now() - 259200000))

      expect(calculateStreak([today, day3])).toBe(1)
    })

    it('returns 1 if completed only today with gap', () => {
      const today = getToday()
      const day3 = getDateString(new Date(Date.now() - 259200000))

      expect(calculateStreak([today, day3])).toBe(1)
    })
  })

  describe('generateId', () => {
    it('generates unique ids', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('generates non-empty string', () => {
      expect(generateId()).toBeTruthy()
    })
  })

  describe('getDayName', () => {
    it('returns short weekday name', () => {
      const dayName = getDayName('2024-01-15')
      expect(dayName).toBe('Mon')
    })
  })
})
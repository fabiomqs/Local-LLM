import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HabitItem } from './HabitItem'
import { Habit } from '@/types/habit'

const mockHabit: Habit = {
  id: '1',
  name: 'Exercise',
  createdAt: '2024-01-01',
  completedDates: [],
}

describe('HabitItem', () => {
  it('renders habit name', () => {
    render(
      <HabitItem
        habit={mockHabit}
        streak={0}
        isCompletedToday={false}
        onToggle={() => {}}
        onRemove={() => {}}
      />
    )
    
    expect(screen.getByText('Exercise')).toBeTruthy()
  })

  it('displays streak count', () => {
    render(
      <HabitItem
        habit={mockHabit}
        streak={5}
        isCompletedToday={false}
        onToggle={() => {}}
        onRemove={() => {}}
      />
    )
    
    expect(screen.getByText('5')).toBeTruthy()
  })

  it('calls onToggle when checkbox is clicked', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    
    render(
      <HabitItem
        habit={mockHabit}
        streak={0}
        isCompletedToday={false}
        onToggle={onToggle}
        onRemove={() => {}}
      />
    )
    
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('calls onRemove when delete button is clicked', async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()
    
    render(
      <HabitItem
        habit={mockHabit}
        streak={0}
        isCompletedToday={false}
        onToggle={() => {}}
        onRemove={onRemove}
      />
    )
    
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])
    
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('shows different styling when completed today', () => {
    const { container } = render(
      <HabitItem
        habit={mockHabit}
        streak={1}
        isCompletedToday={true}
        onToggle={() => {}}
        onRemove={() => {}}
      />
    )
    
    const span = container.querySelector('span')
    expect(span?.className).toContain('line-through')
  })
})
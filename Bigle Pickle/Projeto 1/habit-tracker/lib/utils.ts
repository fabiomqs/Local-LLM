export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(getDateString(date));
  }
  return days;
}

export function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sorted = [...completedDates].sort().reverse();
  const today = getToday();
  const yesterday = getDateString(new Date(Date.now() - 86400000));

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 0;
  let currentDate = sorted[0] === today ? new Date() : new Date(Date.now() - 86400000);

  for (const dateStr of sorted) {
    const expected = getDateString(currentDate);
    if (dateStr === expected) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (dateStr < expected) {
      break;
    }
  }

  return streak;
}

export function getDayName(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

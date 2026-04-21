const MS_IN_DAY = 24 * 60 * 60 * 1000;

export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function todayLocalDate(): string {
  return formatLocalDate(new Date());
}

export function addDays(dateString: string, offsetDays: number): string {
  const date = parseLocalDate(dateString);
  date.setDate(date.getDate() + offsetDays);
  return formatLocalDate(date);
}

export function daysDiff(from: string, to: string): number {
  const fromDate = parseLocalDate(from);
  const toDate = parseLocalDate(to);
  return Math.round((toDate.getTime() - fromDate.getTime()) / MS_IN_DAY);
}

export function getLastNDays(days: number): string[] {
  const today = todayLocalDate();
  const result: string[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    result.push(addDays(today, -i));
  }
  return result;
}

export function formatDayMonth(dateString: string): string {
  const [, month, day] = dateString.split("-");
  return `${day}/${month}`;
}

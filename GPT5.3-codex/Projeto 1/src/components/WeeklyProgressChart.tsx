import type { Habit } from "../types";
import { getWeeklyCompletionRate, getWeeklySeries } from "../utils/habit-metrics";

interface WeeklyProgressChartProps {
  habits: Habit[];
}

function dayLabel(dateString: string): string {
  const [, month, day] = dateString.split("-");
  return `${day}/${month}`;
}

export function WeeklyProgressChart({ habits }: WeeklyProgressChartProps) {
  const data = getWeeklySeries(habits);
  const completionRate = getWeeklyCompletionRate(habits);
  const totalHabits = habits.length;

  return (
    <section className="card">
      <div className="weekly-header">
        <h2>Weekly Progress</h2>
        <span className="weekly-rate">{completionRate}%</span>
      </div>
      <div className="chart">
        {data.map((point) => {
          const fill = point.total === 0 ? 0 : Math.round((point.completed / point.total) * 100);
          return (
            <div className="bar-col" key={point.date}>
              <div className="bar-track" title={`${point.completed}/${totalHabits} habits`}>
                <div className="bar-fill" style={{ height: `${fill}%` }} />
              </div>
              <span className="bar-label">{dayLabel(point.date)}</span>
            </div>
          );
        })}
      </div>
      <p className="chart-caption">
        Completion in last 7 days: each bar represents concluded habits / total habits.
      </p>
    </section>
  );
}

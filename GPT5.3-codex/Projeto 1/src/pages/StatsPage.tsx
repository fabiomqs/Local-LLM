import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { Habit } from "../types";
import { formatDayMonth } from "../utils/date-utils";
import {
  getBestAndWorstWeekday,
  getMostConsistentHabit,
  getWeeklyCompletionStats,
  getWeeklySeries
} from "../utils/habit-metrics";

interface StatsPageProps {
  habits: Habit[];
}

export function StatsPage({ habits }: StatsPageProps) {
  const weeklyStats = getWeeklyCompletionStats(habits);
  const mostConsistent = getMostConsistentHabit(habits);
  const weeklySeries = getWeeklySeries(habits).map((point) => ({
    ...point,
    label: formatDayMonth(point.date),
    rate: point.total === 0 ? 0 : Math.round((point.completed / point.total) * 100)
  }));
  const weekdayStats = getBestAndWorstWeekday(habits);

  return (
    <main className="page">
      <section className="hero">
        <h1>Habit Stats</h1>
        <p className="subtitle">Weekly insights from your consistency.</p>
      </section>

      {habits.length === 0 ? (
        <section className="card stats-empty-card">
          <h2>No data yet</h2>
          <p className="empty-state">Add and complete habits on the dashboard to populate stats.</p>
        </section>
      ) : (
        <>
          <section className="stats-kpi-grid">
            <article className="card kpi-card">
              <h2>Most Consistent Habit</h2>
              <p className="kpi-title">{mostConsistent ? mostConsistent.name : "-"}</p>
              <p className="kpi-caption">
                {mostConsistent ? `${mostConsistent.rate}% completion in last 7 days` : "No habit data"}
              </p>
            </article>

            <article className="card kpi-card">
              <h2>Weekly Completion Rate</h2>
              <p className="kpi-title">{weeklyStats.rate}%</p>
              <p className="kpi-caption">
                {weeklyStats.completed}/{weeklyStats.possible} completions
              </p>
            </article>

            <article className="card kpi-card">
              <h2>Best / Worst Weekday</h2>
              <p className="kpi-title">
                {weekdayStats.best?.weekday ?? "-"} / {weekdayStats.worst?.weekday ?? "-"}
              </p>
              <p className="kpi-caption">
                {weekdayStats.best?.rate ?? 0}% best and {weekdayStats.worst?.rate ?? 0}% worst
              </p>
            </article>
          </section>

          <section className="grid stats-grid">
            <article className="card chart-card">
              <h2>Completion by Day (Last 7 Days)</h2>
              <div className="recharts-wrap">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weeklySeries}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="label" stroke="#9eaabe" />
                    <YAxis stroke="#9eaabe" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: "#0f1623",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px"
                      }}
                    />
                    <Bar dataKey="rate" fill="#33d7a0" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="card chart-card">
              <h2>Weekday Performance</h2>
              <div className="recharts-wrap">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weekdayStats.series}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="weekday" stroke="#9eaabe" />
                    <YAxis stroke="#9eaabe" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: "#0f1623",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px"
                      }}
                    />
                    <Bar dataKey="rate" fill="#6a8cff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>
        </>
      )}
    </main>
  );
}

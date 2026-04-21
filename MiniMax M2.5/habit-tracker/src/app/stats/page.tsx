"use client";

import { useHabits } from "@/hooks/useHabits";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getWeekDates(): string[] {
  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}

export default function StatsPage() {
  const { habits, isLoaded, calculateStreak } = useHabits();

  if (!isLoaded) {
    return (
<div className="min-h-screen bg-[#121212] p-4 md:p-8 flex items-start justify-center pt-24">
        <div className="text-[#9E9E9E]">Carregando...</div>
      </div>
    );
  }

  const today = getTodayDate();
  const weekDates = getWeekDates();

  const getCompletedCount = (date: string) =>
    habits.filter((h) => h.completedDates.includes(date)).length;

  const weeklyData = weekDates.map((date) => ({
    date,
    completed: getCompletedCount(date),
    label: new Date(date).toLocaleDateString("pt-BR", { weekday: "short" }),
  }));

  const totalPossible = habits.length * 7;
  const totalCompleted = weeklyData.reduce((sum, d) => sum + d.completed, 0);
  const completionRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  const bestDay = [...weeklyData].reduce((best, day) =>
    day.completed > best.completed ? day : best
  );
  const worstDay = [...weeklyData].reduce((worst, day) =>
    day.completed < worst.completed ? day : worst
  );

  const habitConsistency = habits.map((habit) => ({
    name: habit.name,
    streak: calculateStreak(habit),
    weekCompleted: weekDates.filter((d) => habit.completedDates.includes(d)).length,
  }));

  const mostConsistent =
    habitConsistency.length > 0
      ? habitConsistency.reduce((best, h) => (h.streak > best.streak ? h : best))
      : null;

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8 flex items-start justify-center pt-[20px]">
      <div className="max-w-2xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#E0E0E0] mb-2">
            Estatísticas (MiniMax M2.5)
          </h1>
        </header>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg p-4 text-center">
            <p className="text-[#9E9E9E] text-sm mb-1">Taxa de Conclusão</p>
            <p className="text-3xl font-bold text-[#10B981]">{completionRate}%</p>
            <p className="text-[#6B7280] text-xs">esta semana</p>
          </div>
          <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg p-4 text-center">
            <p className="text-[#9E9E9E] text-sm mb-1">Hábito Mais Consistentemente</p>
            <p className="text-lg font-bold text-[#E0E0E0]">
              {mostConsistent?.name || "-"}
            </p>
            <p className="text-[#6B7280] text-xs">
              {mostConsistent?.streak || 0} dias consecutivos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg p-4 text-center">
            <p className="text-[#9E9E9E] text-sm mb-1">Melhor Dia</p>
            <p className="text-xl font-bold text-[#10B981]">
              {bestDay.label}
            </p>
            <p className="text-[#6B7280] text-xs">{bestDay.completed}concluídos</p>
          </div>
          <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg p-4 text-center">
            <p className="text-[#9E9E9E] text-sm mb-1">Pior Dia</p>
            <p className="text-xl font-bold text-[#EF4444]">{worstDay.label}</p>
            <p className="text-[#6B7280] text-xs">{worstDay.completed}concluídos</p>
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg p-4 mb-8">
          <h2 className="text-[#E0E0E0] font-semibold mb-4">Conclusão Diária</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis
                dataKey="label"
                stroke="#9E9E9E"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#9E9E9E"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #2D2D2D",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#E0E0E0" }}
                itemStyle={{ color: "#10B981" }}
              />
              <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {habitConsistency.length > 0 && (
          <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg p-4">
            <h2 className="text-[#E0E0E0] font-semibold mb-4">
              Consistência por Hábito
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={habitConsistency.map((h, i) => ({
                    name: h.name,
                    value: h.weekCompleted,
                    color: COLORS[i % COLORS.length],
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {habitConsistency.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E1E1E",
                    border: "1px solid #2D2D2D",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#E0E0E0" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {habitConsistency.map((h, i) => (
                <div key={h.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-[#9E9E9E] text-sm">{h.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
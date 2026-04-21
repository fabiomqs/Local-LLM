"use client";

interface WeeklyChartProps {
  data: { date: string; label: string; count: number }[];
  totalHabits: number;
}

export function WeeklyChart({ data, totalHabits }: WeeklyChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), totalHabits || 1);

  return (
    <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg p-4">
      <h3 className="text-[#E0E0E0] font-semibold mb-4">Progresso Semanal</h3>
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((day) => {
          const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
          return (
            <div
              key={day.date}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div className="w-full flex flex-col items-center justify-end h-24">
                <div
                  className="w-full max-w-8 bg-[#10B981] rounded-t transition-all"
                  style={{ height: `${height}%`, minHeight: day.count > 0 ? "4px" : "0" }}
                />
              </div>
              <span className="text-xs text-[#9E9E9E]">{day.label}</span>
              <span className="text-xs text-[#6B7280]">{day.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
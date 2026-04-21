'use client';

import { useEffect, useState } from 'react';
import { loadHabits } from '../utils/storage';
import { Habit } from '../types/habit';

interface WeeklyProgressChartProps {
  habits: Habit[];
}

export default function WeeklyProgressChart({ habits }: WeeklyProgressChartProps) {
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [totalCompletion, setTotalCompletion] = useState(0);

  useEffect(() => {
    const today = new Date();
    const weekData = [];
    let total = 0;
    let completedDays = 0;

    // Get data for the last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      let completedCount = 0;
      let habitCount = 0;

      habits.forEach(habit => {
        // Check if habit was completed on this date
        if (habit.completedDates.includes(dateStr)) {
          completedCount++;
        }
        // Count all active habits for this day
        habitCount++;
      });

      const completion = habitCount > 0 ? (completedCount / habitCount) * 100 : 0;
      if (completion > 0) completedDays++;
      total += completion;

      weekData.push({
        date: dateStr,
        day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        completion,
        completedCount,
        habitCount
      });
    }

    setWeeklyData(weekData);
    setTotalCompletion(weekData.length > 0 ? Math.round(total / weekData.length) : 0);
  }, [habits]);

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-white">Progresso Semanal</h3>
      <div className="flex items-end justify-between h-32 mb-4">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex flex-col items-center flex-1 mx-1">
            <div className="text-xs text-gray-400 mb-1">{day.day}</div>
            <div 
              className="w-full bg-gray-700 rounded-t-lg transition-all duration-300 ease-in-out"
              style={{ 
                height: `${day.completion}%`,
                backgroundColor: day.completion === 0 ? '#374151' : 
                               day.completion < 50 ? '#f59e0b' : 
                               day.completion < 100 ? '#3b82f6' : '#10b981'
              }}
            >
              {day.completion > 0 && (
                <div className="text-xs text-white text-center pt-1">
                  {day.completion > 0 ? Math.round(day.completion) : ''}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-white font-medium">Média semanal: {totalCompletion}%</span>
      </div>
    </div>
  );
}
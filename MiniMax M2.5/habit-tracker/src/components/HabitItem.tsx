"use client";

import { Habit } from "@/types/habit";

interface HabitItemProps {
  habit: Habit;
  onToggle: () => void;
  onRemove: () => void;
  streak: number;
  isCompletedToday: boolean;
}

export function HabitItem({
  habit,
  onToggle,
  onRemove,
  streak,
  isCompletedToday,
}: HabitItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
        isCompletedToday
          ? "bg-[#1a2e1a] border-[#2d4a2d]"
          : "bg-[#1E1E1E] border-[#2D2D2D]"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
            isCompletedToday
              ? "bg-[#10B981] border-[#10B981]"
              : "border-[#4B5563] hover:border-[#6B7280]"
          }`}
        >
          {isCompletedToday && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
        <span
          className={`text-lg ${
            isCompletedToday ? "text-[#E0E0E0]" : "text-[#E0E0E0]"
          }`}
        >
          {habit.name}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-[#9E9E9E]">
          <span className="text-[#10B981] font-semibold">{streak}</span>
          <span>dias</span>
        </div>
        <button
          onClick={onRemove}
          className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
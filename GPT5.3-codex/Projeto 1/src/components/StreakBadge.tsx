interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  const label = streak === 1 ? "day" : "days";
  return (
    <span className="streak-badge" title="Current streak">
      {streak} {label}
    </span>
  );
}

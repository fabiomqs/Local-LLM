<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Habit Tracker (Gemini 3)

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (CSS-first config in `globals.css`)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Language**: TypeScript

## Core Architecture
- **State Management**: Custom hook `src/hooks/useHabits.ts`.
- **Persistence**: `localStorage` using the key `habit_tracker_data`.
- **SSR Handling**: Interactive components are marked with `"use client"`. Avoid using `localStorage` outside of `useEffect` to prevent hydration mismatches.

## Data Structures (`src/types/habit.ts`)
```typescript
interface Habit {
  id: string;
  name: string;
  color: string;
  createdAt: number;
  completedDates: string[]; // ISO format YYYY-MM-DD
}
```

## Key Files & Logic
- **`src/hooks/useHabits.ts`**:
  - `calculateStreak`: Logic checks if a habit was completed today or yesterday to determine the current streak.
  - `stats`: Analytical object containing `mostConsistent` habit, `bestDay`, `worstDay`, and `weeklyTrends`.
- **`src/app/globals.css`**: Contains the Tailwind v4 `@theme` block and glassmorphism utilities (`.glass`, `.glass-hover`).
- **`src/components/`**: Modularized UI components. `ProgressChart` handles client-side mounting for Recharts.

## Navigation
- `/`: Main Dashboard with daily tracking and summary.
- `/stats`: Deep dive into habit performance and trends.

## Design System
- **Theme**: Dark Modern / Obsidian.
- **Palette**: Background (#09090b), Primary (#8b5cf6), Accent (#10b981).
- **Aesthetics**: Glassmorphism, smooth transitions (300ms), and Inter typography.

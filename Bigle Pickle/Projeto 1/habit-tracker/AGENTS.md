# Habit Tracker (Big Pickle)

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build (typecheck + static gen)
npm run lint     # ESLint check
```

## Project Structure

```
habit-tracker/
├── app/
│   ├── page.tsx          # Main dashboard
│   ├── stats/page.tsx   # Statistics page
│   └── globals.css      # Tailwind + dark theme
├── components/           # React components
├── hooks/useHabits.ts   # State + localStorage
├── types/               # TypeScript interfaces
└── lib/utils.ts         # Date helpers, streak calc
```

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Recharts (charts)
- Chart.js (backup charts)
- Lucide React (icons)
- localStorage (persistence)

## Key Conventions

- All interactive components use `'use client'`
- Dark theme: `bg-slate-900`, `text-slate-100`, accent `indigo-500`
- Dates stored as `YYYY-MM-DD` strings
- Streaks calculated from completedDates array

## Pages

- `/` - Habit list with checkboxes, streak counter, weekly chart
- `/stats` - Statistics: most consistent, weekly %, best/worst day

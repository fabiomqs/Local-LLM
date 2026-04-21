# Habit Tracker (MiniMax M2.5)

## Commands

```bash
npm run dev      # Development server (has Turbopack issues on Windows)
npm run build    # Production build
npm run start   # Production server (recommended on Windows)
npm run lint   # ESLint
npm run test   # Vitest watch mode
npm run test:run # Vitest single run
```

## Windows Dev Server Issue

Turbopack crashes on Windows with Tailwind v4 CSS. Use production mode instead:

```bash
npm run build && npm run start
```

## Stack

- Next.js 16.2.4 (App Router)
- React 19.2.4
- Tailwind CSS v4 (uses `@import "tailwindcss"` in globals.css)
- TypeScript
- Recharts for charts
- localStorage for persistence

## Project Structure

```
src/
├── app/
│   ├── page.tsx        # Main dashboard (/)
│   ├── stats/page.tsx   # Statistics page (/stats)
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles + Tailwind
├── components/          # React components
├── hooks/
│   └── useHabits.ts    # Habit state + localStorage
└── types/
    └── habit.ts        # TypeScript interfaces
```

## Key Files

- `src/hooks/useHabits.ts` - Core logic for habits, streaks, localStorage
- `src/components/WeeklyChart.tsx` - Weekly progress bar chart
- `src/app/stats/page.tsx` - Statistics with Recharts (BarChart, PieChart)

## Port Management

Port 3000 may have zombie processes. Kill with:

```bash
netstat -ano | grep 3000
taskkill //F //PID <PID>
```
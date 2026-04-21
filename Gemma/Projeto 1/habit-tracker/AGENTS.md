# Agent Instructions: Habit Tracker

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State/Persistence:** `localStorage` (client-side)
- **Key Libraries:** `date-fns` (date logic), `recharts` (charts), `lucide-react` (icons)

## Core Architecture & Gotchas
- **Hydration Mismatch:** Since the app relies on `localStorage`, always use a `useEffect` hook or an `isMounted` state pattern in Client Components to ensure `window` or `localStorage` access happens only after the component mounts to the DOM.
- **Client Components:** Components using `useLocalStorage` or browser APIs MUST use the `'use client'` directive.
- **Data Flow:** The `Habit` interface is defined in `src/types/habit.ts`. Always use this shared type for consistency.

## Development Commands
- `npm run dev`: Start development server.
- `npm run build`: Create production build.
  
# AGENTS.md

This file contains essential information for agents working with this repository. It helps avoid mistakes and enables rapid ramp-up.

## Project Structure
- This is a Next.js 14.2.3 application using TypeScript
- Uses Tailwind CSS for styling
- Main entrypoint is `app/page.tsx` (home page)
- Application structure follows Next.js convention with `app` directory

## Key Commands
- `npm run dev` - Start development server (default: http://localhost:3000)
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Framework Details
- Framework: Next.js 14.2.3
- Language: TypeScript
- Styling: Tailwind CSS with `@/*` path alias
- Component structure: Uses React functional components with hooks
- State management: React useState and useEffect hooks

## Special Notes
- The application uses localStorage for persistence via `./dashboard/utils/storage.ts`
- All components are in `app/dashboard/components/`
- The project follows Next.js App Router conventions
- Uses client-side rendering with 'use client' directive
- No external test runner or build scripts defined beyond standard Next.js

## Architecture
- Entry point: `app/page.tsx` (Home page)
- Layout: `app/layout.tsx`
- State management: Local React state with useEffect for data fetching
- Data persistence: localStorage via custom `loadHabits` utility
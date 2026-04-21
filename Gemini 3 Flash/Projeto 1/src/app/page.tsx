import Dashboard from '@/components/Dashboard';

export const metadata = {
  title: 'Habit Tracker (Gemini 3) | Modern Habit Dashboard',
  description: 'Track your habits, build streaks, and visualize your progress with our modern habit tracker.',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Dashboard />
    </main>
  );
}

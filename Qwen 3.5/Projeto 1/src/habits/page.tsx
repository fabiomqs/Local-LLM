import HabitCard from "./components/HabitCard";
import AddHabitModal from "./components/AddHabitModal";
import WeeklyChart from "./components/WeeklyChart";
import Header from "./components/Header";
import { Plus } from "lucide-react";

type Habit = {
	id: string;
	name: string;
	completed: boolean[];
	streak: number;
	maxStreak: number;
	createdAt: string;
};

export default function HabitsPage() {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [isEditing, setIsEditing] = useState(false);

	const saveHabits = () => {
		localStorage.setItem("habits", JSON.stringify(habits));
	};

	useEffect(() => {
		const saved = localStorage.getItem("habits");
		if (saved) setHabits(JSON.parse(saved));
	}, []);

	const addHabit = () => setIsEditing(true);

	const submitHabit = (name: string) => {
		setHabits((prev) => [
			...prev,
			{
				id: Date.now().toString(),
				name,
				completed: [],
				streak: 0,
				maxStreak: 0,
				createdAt: new Date().toISOString(),
			},
		]);
		saveHabits();
		isEditing;
	};

	const deleteHabit = (id: string) => {
		const updated = habits.filter((h) => h.id !== id);
		setHabits(updated);
		saveHabits();
	};

	const toggleComplete = (id: string) => {
		setHabits((prev) =>
			prev.map((h) => {
				if (h.id !== id) return h;

				// Calcular streak
				const completed = h.completed;
				const today = new Date().toISOString().split("T")[0];
				const lastCompleted = completed.at(-1);

				let newCompleted = [...completed];
				let newStreak = h.streak;

				if (!completed.includes(today)) {
					const lastDate = new Date(
						new Date(lastCompleted).getTime() - 86400000 * h.streak
					).toISOString();
					const yesterday = new Date(lastDate).toISOString();
					const isTodayBeforeLast = new Date(today).getTime() < new Date(yesterday).getTime();
					const isTodayAfterLast = new Date(today).getTime() > new Date(h.completed[0]).getTime();

					if (isTodayBeforeLast || isTodayAfterLast) {
						newStreak = 0;
					} else if (h.completed.includes(yesterday)) {
						newStreak = Math.max(h.streak, newStreak);
					}
				}

				newCompleted.push(today);
				newCompleted.sort();

				return { ...h, completed: newCompleted, streak: newStreak };
			})
		);
		saveHabits();
	};

	return (
		<div className="min-h-screen bg-background p-6">
			<Header totalHabits={habits.length} />
			<main className="max-w-2xl mx-auto space-y-8">
				<WeeklyChart habits={habits} />
				<div className="space-y-4">
					{habits.map((habit) => (
						<HabitCard key={habit.id} habit={habit} onToggle={toggleComplete} onDelete={deleteHabit} />
					))}
				</div>
				<AddHabitModal onSubmit={submitHabit} isOpen={isEditing} onClose={() => setIsEditing(false)} />
			</main>
		</div>
	);
}

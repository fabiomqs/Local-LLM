import { Flame, CheckCircle2, TrendingUp } from "lucide-react";

export const Header = ({ totalHabits }: { totalHabits: number }) => {
	return (
		<header className="mb-8">
			<h1 className="text-3xl font-bold text-foreground mb-2">
				Seus Hábitos
			</h1>
			<p className="text-secondary mb-4">
				Acompanhe sua jornada diária e construa hábitos sustentáveis
			</p>

			<div className="flex items-center space-x-6">
				{totalHabits > 0 && (
					<div className="flex items-center space-x-2">
						<TrendingUp className="w-5 h-5 text-primary" />
						<span className="text-foreground">
							Total: <strong>{totalHabits}</strong> hábitos
						</span>
					</div>
				)}
			</div>
		</header>
	);
};

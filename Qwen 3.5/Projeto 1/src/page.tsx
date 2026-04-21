import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Habit Tracker - Dashboard de Hábitos</title>
				<meta name="description" content="Acompanhe e mantenha seus hábitos com nosso dashboard moderno" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center p-6">
				<Link href="/habits">
					<h1 className={`${inter.className} text-3xl font-bold bg-gradient-to-r from-primary to-primary-muted bg-clip-text text-transparent`}>
						Habit Tracker
					</h1>
				</Link>
				<p className="mt-4 text-secondary">
					Acompanhe seus hábitos diários e construa rotinas sustentáveis
				</p>
				<Link href="/habits">
					<button className="mt-6 px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg font-medium transition-colors">
						Ver Dashboard
					</button>
				</Link>
			</main>
		</>
	);
}

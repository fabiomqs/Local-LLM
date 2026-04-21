import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
	title: "Habit Tracker - Dashboard de Hábitos",
	description: "Acompanhe e mantenha seus hábitos com nosso dashboard de tracking moderno",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={inter.variable}>
				{children}
			</body>
		</html>
	);
}

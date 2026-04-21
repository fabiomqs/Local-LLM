import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#0a0a0a",
				foreground: "#f9fafb",
				card: "#111111",
				"card-border": "#27272a",
				primary: "#8b5cf6",
				"primary-muted": "#7c3aed",
				success: "#10b981",
				gray: "#6b7280",
				border: "#3f3f46",
			},
			fontFamily: {
				sans: ["var(--font-inter)", "system-ui"],
			},
		},
	},
	plugins: [],
};

export default config;

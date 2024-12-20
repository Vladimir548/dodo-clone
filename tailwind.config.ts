import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},

			borderRadius: {
				lg: 'var(--radius)',
			},
			boxShadow: {
				default: ' 0px 0px 5px 2px rgba(0, 0, 0, 0.10)',
				'inner-default': 'inset 0px 0px 5px 2px rgba(0, 0, 0, 0.10)',
				'sm-card': '0px 0px 2px #0605323d',
				'sm-card-dark': '0px 0px 2px #8e8be487',
				'sm-card-inner': 'inset  0px 0px 4px #0605323d',
				'sm-card-dark-inner': 'inset  0px 0px 4px #8e8be487',
			},
			colors: {
				background: 'hsl(var(--background))',
				'dark-background': 'hsl(var(--dark-background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				'secondary-white': '#dbdbdb',
				'secondary-black': '#1a1a1a',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
		},
	},

	plugins: [require('tailwindcss-animate')],
}
export default config

import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			gridTemplateColumns: {
				main: 'repeat(4, minmax(72px, 1fr))'
			}
		}
	},
	plugins: []
} satisfies Config

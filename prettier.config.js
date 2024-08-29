/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: ['prettier-plugin-tailwindcss'],
	arrowParens: 'avoid',
	bracketSameLine: true,
	jsxSingleQuote: true,
	quoteProps: 'consistent',
	semi: false,
	singleQuote: true,
	trailingComma: 'none',
	useTabs: true
}

export default config

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			fontFamily: {
				lato: ['Helvetica', 'Arial', 'sans-serif'],
			},
			boxShadow: {
				custom: '0px 4px 4px 0px #00000040',
				cus: 'inset 0px 8px 8px rgba(0, 0, 0, 0.25)',
			},
		},
	},
	plugins: [],
}

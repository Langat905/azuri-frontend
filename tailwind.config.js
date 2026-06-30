/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'sans': ['"Jost"', 'sans-serif'],
      },
      colors: {
        'gold': {
          50: '#fdfbf0',
          100: '#faf5d8',
          200: '#f5e9a8',
          300: '#edd970',
          400: '#e3c53d',
          500: '#c9a84c',
          600: '#a8823a',
          700: '#86632c',
          800: '#6b4e25',
          900: '#4a3318',
        },
        'cream': '#faf8f3',
        'charcoal': '#1a1a1a',
        'muted': '#6b6560',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#09090b',
        'bg-card': '#111113',
        'bg-card-hover': '#1a1a1d',
        'accent': '#22c55e',
        'accent-dim': '#16a34a',
        'accent-muted': 'rgba(34,197,94,0.08)',
        'text-primary': '#fafafa',
        'text-secondary': '#a1a1aa',
        'text-muted': '#52525b',
        'border': '#27272a',
        'border-subtle': '#1e1e21',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

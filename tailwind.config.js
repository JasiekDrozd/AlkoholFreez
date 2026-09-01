/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a1a',
        'bg-card': '#13132b',
        'bg-card-hover': '#1a1a3e',
        'accent-green': '#10b981',
        'accent-green-light': '#34d399',
        'accent-purple': '#8b5cf6',
        'accent-blue': '#3b82f6',
        'accent-amber': '#f59e0b',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#475569',
        'border': '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

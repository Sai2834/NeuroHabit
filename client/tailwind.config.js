/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // The "Void" Background (Darker, richer)
        background: '#09090b', 
        // The Cards (Slightly lighter)
        surface: '#18181b', 
        // Primary: Neon Emerald (Success/Growth)
        primary: '#10b981', 
        // Secondary: Electric Violet (Mind/Psychology)
        secondary: '#8b5cf6', 
        // Accent: Hot Orange (Streaks)
        accent: '#f59e0b',
        // Text muted
        muted: '#71717a'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
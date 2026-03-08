/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', // Enable dark mode by class for the theme switcher
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1E293B',   // Dark Slate
        'brand-secondary': '#3B82F6', // Blue
        'brand-accent': '#F59E0B',    // Amber
        'brand-light': '#F8FAFC',     // Light layout background
        'brand-dark': '#0F172A',      // Dark layout background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Premium font
      }
    },
  },
  plugins: [],
}

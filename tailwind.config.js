/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', // Enable dark mode by class for the theme switcher
  theme: {
    extend: {
      colors: {
        'brand-primary': '#005B8C',   // Azul Petróleo / Azul Cerúleo Oscuro
        'brand-secondary': '#3B82F6', // Blue
        'brand-accent': '#F59E0B',    // Amber
        'brand-light': '#F8FAFC',     // Light layout background
        'brand-dark': '#003D5E',      // Darker version of petroleum for deep dark mode backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['DM Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',  // Enables dark mode support
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',   // Dark Navy Blue
        secondary: '#1e293b', // Darker Shade
        accent: '#14b8a6'     // Teal for contrast
      }
    },
  },
  plugins: [],
}

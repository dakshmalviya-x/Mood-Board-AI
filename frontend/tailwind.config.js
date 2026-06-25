/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C6FF7",
        secondary: "#F4A7B9",
        dark: "#1A1A2E",
        card: "#16213E",
        surface: "#0F3460",
        muted: "#A0A3BD",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
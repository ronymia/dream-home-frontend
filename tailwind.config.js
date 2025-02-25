/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // COLORS
      colors: {
        primary: "var(--primary-color)", // Using CSS variable
        secondary: "var(--secondary-color)", // Using CSS variable
        gray: "var(--gray-color)", // Using CSS variable
        error: "var(--danger-color)", // Using CSS variable
      },
      // FONTS
      fontFamily: {
        Nunito: ["Nunito", "serif"],
      },
    },
  },
  plugins: [],
};

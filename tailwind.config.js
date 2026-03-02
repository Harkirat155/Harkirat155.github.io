/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        glow: "#22d3ee",
        pulse: "#38bdf8"
      },
      boxShadow: {
        aura: "0 0 40px rgba(56, 189, 248, 0.25)"
      }
    }
  },
  plugins: []
};

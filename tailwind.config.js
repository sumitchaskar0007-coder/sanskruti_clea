/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ================= COLORS ================= */
      colors: {
        primary: "#0b6790",
        gold: "#fcd34d",
      },

      /* ================= ANIMATIONS ================= */
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },

      animation: {
        scroll: "scroll 20s linear infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
      },
      colors: {
        blackWithOpacity: "rgba(0, 0, 0, 0.5)",
        whiteWithOpacity: "rgba(255, 255, 255, 0.5)",
        background: {
          primary: "var(--background)",
          secondary: "var(--background-secondary)",
        },
        text: {
          primary: "var(--text)",
          secondary: "var(--text-secondary)",
        },
        border: "var(--border)",
        highlight: "var(--highlight)",
        blue: {
          600: "var(--blue-600)",
          700: "var(--blue-700)",
        },
        gray: {
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          600: "var(--gray-600)",
          900: "var(--gray-900)",
        },
        black: "var(--black)",
        white: "var(--white)",
      },
    },
  },
  plugins: [],
};

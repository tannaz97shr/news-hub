/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include your file extensions
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Color Emoji"', "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        text: {
          primary: "var(--text)",
          secondary: "var(--text-secondary)",
        },
      },
    },
  },
  plugins: [],
};

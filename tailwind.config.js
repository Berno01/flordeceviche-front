/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "shell-pink": {
          DEFAULT: "#3498db",
          50: "#d2b48c",
          100: "#d2b48c",
          200: "#2ecc71",
          300: "#2ecc71",
          400: "#3498db",
          500: "#3498db",
          600: "#2c3e50",
        },
        pink: {
          50: "#d2b48c",
          100: "#d2b48c",
          200: "#2ecc71",
          300: "#2ecc71",
          400: "#2ecc71",
          500: "#3498db",
          600: "#2ecc71",
          700: "#e74c3c",
          800: "#2c3e50",
          900: "#2c3e50",
        },
      },
    },
  },
  plugins: [],
};

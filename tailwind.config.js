/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#275B15",
        secondary: "#AFE89C",
        accent: "#F8FAF7",
      },
    },
  },
  darkMode: "selector",
  plugins: [require("daisyui"), require("@tailwindcss/forms"), require("preline/plugin")],
};

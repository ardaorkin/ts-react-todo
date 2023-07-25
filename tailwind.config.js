/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        generalLighter: "#b7c9f5",
        general: "#4a77e5",
        generalDarker: "#0f2a6a",
        link: "#4a77e5",
      },
    },
  },
  plugins: [],
};

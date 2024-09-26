/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#984D9F",
        secondary: "#CC775D",
      },
    },
  },
  plugins: [],
};

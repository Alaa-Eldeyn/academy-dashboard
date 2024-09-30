/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#984D9F",
        secondary: "#CC775D",
        fontColor:"#EC8AB3",
        textColor:"#E2508D",
        bgFontColor:"#59248E",
        bgColor:"#842ABC"
      },
    },
  },
  plugins: [],
};

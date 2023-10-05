/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131417",
        secondary: "#1E1F26",
        primaryText: "#868CA0",
        text555: "#555",
        TwodashColor: "rgba(255, 255, 255, 0.2)",
        FourdashColor: "rgba(255, 255, 255, 0.4)",
      },
    },
  },
  plugins: [],
};


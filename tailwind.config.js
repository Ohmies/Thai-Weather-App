/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./views/**/*.{html,ejs}"],
  theme: {
    extend: {
      backgroundImage: {
        "weather-gradient": "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
        "night-gradient": "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#F5EDFA",
        "primary-2": "#DAC1F1",
        "primary-3": "#A26EDA",
        "primary-4": "#7C3AED",
        "primary-5": "#6D28D9",
      },
    },
  },
  plugins: [],
};

// "secondary-1": "#5B21B6", 100, 200, 400, 600, 700
// "secondary-2": "#4C1D95",
// "secondary-3": "#243c5a",
// "tertiary-1": "#243c5a",
// "tertiary-2": "#243c5a",
// "tertiary-3": "#5b21b6",

const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your JS/TS/JSX/TSX files
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}", // Material Tailwind components
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}", // Material Tailwind theme
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1f8e9",
          100: "#dcedc8",
          200: "#c5e1a5",
          300: "#aed581",
          400: "#9ccc65",
          500: "#8bc34a",
          600: "#7cb342",
          700: "#689f38",
          800: "#558b2f",
          900: "#33691e",
          main: "#7cb342", // 200
          light: "#c5e1a5", // 500
          text: "#5e655a", // 800
        },
      },
    },
  },
  plugins: [],
});

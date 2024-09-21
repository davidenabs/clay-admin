/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: "#4B260D",
        beige: "#C78C61",
        orange: "#FD8208",
        blue: "#444683",
        lightBrown: "#D97E37",
        clayGray: "#8A92A6",
        clayBlue: "#444683",

        /*
         * body, modal, drawer background & ring-offset-color
         */
        background: colors.white,

        /*
         * body text color
         */
        foreground: colors.gray[600],

        /*
         * border, default flat bg color for input components, tab & dropdown hover color
         */
        muted: colors.gray[200],

        /*
         * primary colors
         */
        primary: {
          lighter: colors.gray[200],
          DEFAULT: colors.gray[800],
          dark: colors.gray[950],
          foreground: colors.white,
        },

        /*
         * secondary colors
         */
        secondary: {
          lighter: colors.indigo[200],
          DEFAULT: colors.indigo[500],
          dark: colors.indigo[700],
          foreground: colors.white,
        },

        /*
         * danger colors
         */
        red: {
          lighter: colors.rose[200],
          DEFAULT: colors.rose[500],
          dark: colors.rose[700],
        },

        /*
         * warning colors
         */
        orange: {
          lighter: colors.amber[200],
          DEFAULT: colors.amber[500],
          dark: colors.amber[700],
        },

        /*
         * info colors
         */
        blue: {
          lighter: colors.sky[200],
          DEFAULT: colors.sky[500],
          dark: colors.sky[700],
        },

        /*
         * success colors
         */
        green: {
          lighter: colors.emerald[200],
          DEFAULT: colors.emerald[500],
          dark: colors.emerald[700],
        },

        clayDefault: {
          lighter: colors.emerald[200],
          DEFAULT: "#D97E37",
          dark: colors.emerald[700],
        },
      },
      backgroundImage: {
        "header-bg": "url('/src/assets/bg/header.svg')",
        "dashboard-bg": "url('/src/assets/bg/dashboard-bg.svg')",
      },
      fontFamily: {
        workSan: ["Work Sans", "sans-serif"],
        disket: ["Disket Mono", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")], // ⚠️ Required @tailwindcss/forms plugin.
};

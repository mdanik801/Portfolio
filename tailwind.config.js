const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            Acme: ["Acme", "sans-serif"],
            Nunito: ["Nunito Sans", " sans-serif"],
         },
         keyframes: {
            float: {
               "0%, 100%": { transform: "translateY(0)" },
               "50%": { transform: "translateY(-10px)" },
            },
         },
         animation: {
            float: "float 3s ease-in-out infinite",
         },
         textShadow: {
            sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
            xl: "4px 4px 8px rgba(0, 0, 0, 0.5)",
            none: "none",
         },
         backgroundImage: {
            "custom-image": "url('./src/assets/images/erth.jpg')",
         },
      },
   },
   plugins: [
      function ({ addUtilities }) {
         const newUtilities = {
            ".text-shadow-sm": {
               textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            },
            ".text-shadow-md": {
               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            },
            ".text-shadow-lg": {
               textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
            },
            ".text-shadow-xl": {
               textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
            },
            ".text-shadow-none": {
               textShadow: "none",
            },
            backdropBlur: {
               xs: "2px",
            },
         };
         addUtilities(newUtilities, ["responsive", "hover"]);
      },
      addVariablesForColors,
   ],
};

function addVariablesForColors({ addBase, theme }) {
   let allColors = flattenColorPalette(theme("colors"));
   let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
   );

   addBase({
      ":root": newVars,
   });
}

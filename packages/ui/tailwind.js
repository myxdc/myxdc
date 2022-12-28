const defaultTheme = require('tailwindcss/defaultTheme')

// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    extend: {
    },
    fontFamily: {
      sans: ['Manrope', ...defaultTheme.fontFamily.sans],
    },
  },
}
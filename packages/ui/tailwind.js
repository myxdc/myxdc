const defaultTheme = require('tailwindcss/defaultTheme')

// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['Manrope', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: {
          50: '#f2f8ff',
          100: '#e6f1ff',
          200: '#c8e0ff',
          300: '#a9ceff',
          400: '#7db8ff',
          500: '#4fa2ff',
          600: '#0080ff',
          700: '#0060cc',
          800: '#004099',
          900: '#002266',
        },
      },
      maxWidth: {
        1: '1rem',
        2: '2rem',
        3: '3rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
        7: '7rem',
        8: '8rem',
        9: '9rem',
        10: '10rem',
      },
    },
  },
}

// const colors = require('tailwindcss/colors')
// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#39d0d8',
        black: '#1a1a1b'
      }
    }
  },
  variants: {},
  plugins: []
};

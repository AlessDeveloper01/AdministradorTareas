/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-bean': {
          '50': '#ecfdf3',
          '100': '#d1fadf',
          '200': '#a7f3c6',
          '300': '#6de8a6',
          '400': '#33d483',
          '500': '#0fba6a',
          '600': '#049755',
          '700': '#037947',
          '800': '#065f3a',
          '900': '#064e31',
          '950': '#011910',
        },
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


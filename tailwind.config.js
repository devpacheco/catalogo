/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'bege': '#eaccad',
      'marrom': '#5b2614',
      'white' : '#FFFFFF'
    },
    fontFamily: {
      fontFamily: {
        'poppins': ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


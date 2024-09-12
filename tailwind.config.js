/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f1f1f1',
        secondary: '#b7ff00',
        accent: '#c0c0c0',
        bgColor: '#b7ff00',
      },
      fontFamily: {
        primary: ['StretchPro', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss')],
}

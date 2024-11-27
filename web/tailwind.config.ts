/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22ad78',
        secondary: '#1b1b34',
        accent: '#c3e7d9',
        neutral: '#1c6953',
        background: '#F8F9FA',
      },
    },
  },
  plugins: [],
}

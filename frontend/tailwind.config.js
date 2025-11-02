/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { // <-- Add this
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('public/images/hero.jpg')",
        'hero-world': "url('public/images/book-world.png')",
      },
    },
    plugins: [],
  }
}

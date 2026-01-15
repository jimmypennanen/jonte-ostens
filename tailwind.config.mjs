/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF5E6',
        beige: '#F5EFE3',
        'soft-yellow': '#FDF3C3',
        'dark-brown': '#3D2817',
        'dark-green': '#2D5F4F',
        'light-green': '#B8C9C1'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      }
    }
  },
  plugins: []
};

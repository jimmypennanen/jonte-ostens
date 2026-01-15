/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dark-brown': '#6B4423',
        'soft-yellow': '#F5E6D3',
        'light-green': '#D4E8D4',
        'dark-green': '#2D5016',
        'cream': '#FFF8F0',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

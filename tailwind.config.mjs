/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdf6e3',
          100: '#eee8d5',
          200: '#d4c5a9',
        },
        coffee: {
          500: '#8b7355',
          700: '#5b4636',
        },
        accent: {
          DEFAULT: '#d97706',
          dark: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

const { transform } = require('next/dist/build/swc');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideToLeft: {
          '0%': {
            transform: 'translateX(400%)'
          },
          '100%': {
            transform: 'translateX(-20%)'
          }
        },
        slideToBottom: {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(5%)'
          }
        }
      },
      animation:{
        slideToLeft:'slideToLeft 1s linear 1',
        slideToBottom:'slideToBottom 1s linear 1',
      }

    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};

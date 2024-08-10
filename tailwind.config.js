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
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      // keyframes: {
      //   slideToLeft: {
      //     wiggle: {
      //       from: { translateX: '0' },
      //       to: { translateX: '-100%' }
      //     }
      //   }
      // },
      keyframes: {
        slideToLeft: {
          '0%':{
            transform:'translateX(400%)'
          },
          '100%':{
            transform:'translateX(-10%)'
          }
        },
        slideToBottom: {
          '0%':{
            transform:'translateY(-100%)'
          },
          '100%':{
            transform:'translateY(5%)'
          }
        },
      },
      animation: {
        slideToLeft: 'slideToLeft 1.5s linear 1',
        slideToBottom: 'slideToBottom 1.5s linear 1',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};

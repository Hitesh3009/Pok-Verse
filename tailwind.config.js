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
            transform: 'translateX(0%)'
          }
        },
        slideToRight: {
          '0%': {
            transform: 'translateX(-20%)',
            backgroundColor: 'white',
            opacity:0
          },
          '100%': {
            transform: 'translateX(0%)',
            backgroundColor: 'white',
            opacity:1
          }
        },
        slideToBottom: {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(0%)'
          }
        },
        fadeIn: {
          '0%': { backgroundColor: 'white',opacity:0 },
          '100%': { backgroundColor:'white',opacity:1 },
        },
      },
      animation:{
        slideToLeft:'slideToLeft 0.75s linear 1',
        slideToBottom:'slideToBottom 0.8s linear 1',
        slideToRight:'slideToRight 5s ease',
        fade: 'fadeIn 6s ease',
      }

    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};

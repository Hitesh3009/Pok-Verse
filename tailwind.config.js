
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
        // animation for the card sliding towards left
        slideToLeft: {
          '0%': {
            transform: 'translateX(400%)'
          },
          '100%': {
            transform: 'translateX(0%)'
          }
        },

        // animation for the table sliding towards right with fading effect
        slideToRight: {
          '0%': {
            transform: 'translateX(-20%)',
            opacity: 0
          },
          '100%': {
            transform: 'translateX(0%)',
            opacity: 1
          }
        },

        // animation for the card sliding towards bottom
        slideToBottom: {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(0%)'
          }
        },

        // fading effect for displaying the pokemon information
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },

      animation: {
        // gives the name to the animation to access them on the page with various transition effects
        slideToLeft: 'slideToLeft 0.75s linear 1',
        slideToBottom: 'slideToBottom 0.8s linear 1',
        slideToRight: 'slideToRight 5s ease',
        fade: 'fadeIn 5.5s ease-in',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')//hides the overflow scrollbar
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {      
    extend: {
      colors: {
        'primary': '#3b82f6', // Example primary color 
        'secondary': '#8b5cf6', // Example secondary color 
        'dark': '#0f172a', // Example dark color
        'light': '#f8fafc ', // Example light color
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in',
          'slide-up': 'slideUp 0.5s ease-in-out',
          'slide-down': 'slideDown 0.5s ease-out',
        },  
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' }, 
            '100%': { opacity: '1' },
          },
          slideUp: {    
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
         slideDown: {    
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
    },
  },
  plugins: [],
}
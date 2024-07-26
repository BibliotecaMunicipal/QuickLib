/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'border-spin': 'border-spin 5s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        'border-spin': {
          '0%, 100%': { borderColor: 'rgba(0, 255, 0, 0.5)' },   // Verde
          '20%': { borderColor: 'rgba(0, 0, 255, 0.5)' },        // Azul
          '40%': { borderColor: 'rgba(255, 0, 0, 0.5)' },        // Rojo
          '60%': { borderColor: 'rgba(128, 0, 128, 0.5)' },      // Morado
          '80%': { borderColor: 'rgba(255, 255, 0, 0.5)' },      // Amarillo
          '100%': { borderColor: 'rgba(184, 134, 11, 0.5)' }     // Guindo
        },
      },
    },
  },
  plugins: [],
}

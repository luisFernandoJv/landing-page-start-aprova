/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-fundo': {
          top: '#0a1e3f',
          bot: '#020c1b',
        },
        'laranja': {
          DEFAULT: '#ff6a00',
          dark: '#e65100',
        },
        'verde-wpp': '#25d366',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 20s infinite ease-in-out',
        'pulse-badge': 'badge-pulse 2s infinite',
        'shine': 'shine 5s infinite',
        'rocket-bounce': 'rocket-bounce 2s ease-in-out infinite',
        'border-shimmer': 'border-shimmer 3s linear infinite',
        'glow-pulse': 'glow-pulse 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translate(50px, -50px) scale(1.1)', opacity: '0.5' },
        },
        'badge-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shine: {
          '0%': { left: '-100%' },
          '20%': { left: '150%' },
          '100%': { left: '150%' },
        },
        'rocket-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'border-shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 106, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 106, 0, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

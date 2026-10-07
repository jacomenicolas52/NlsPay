/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: '#050811',
          subtle: '#090D1A',
          card: '#0D1322',
          cardHover: '#121A2E',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          glass: 'rgba(255, 255, 255, 0.10)',
          highlight: 'rgba(20, 241, 149, 0.25)',
        },
        brand: {
          emerald: '#10B981',
          teal: '#14F195',
          cyan: '#06B6D4',
          accent: '#00F2FE',
          darkTeal: '#0E3B33',
          glow: 'rgba(20, 241, 149, 0.15)',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-card': '0 4px 24px -1px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
        'glow-teal': '0 0 25px -4px rgba(20, 241, 149, 0.25)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.25)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}

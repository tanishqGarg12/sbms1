/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbf5',
          100: '#d5f6e5',
          200: '#aeeccf',
          300: '#79ddb2',
          400: '#43c690',
          500: '#029c78',
          600: '#028a6b',
          700: '#026e56',
          800: '#045745',
          900: '#04473a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        glow: { from: { boxShadow: '0 0 20px rgba(2,156,120,0.15)' }, to: { boxShadow: '0 0 40px rgba(2,156,120,0.3)' } },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};

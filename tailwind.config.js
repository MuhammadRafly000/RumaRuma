import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFA',
          100: '#FAF7F2',
          200: '#F3EDE3',
          300: '#E8DFD0',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E4EDE8',
          200: '#C5D9CE',
          300: '#9BB8A8',
          400: '#6F9A85',
          500: '#4F7D68',
          600: '#3D6352',
          700: '#324F42',
          800: '#243A30',
          900: '#1B2C24',
        },
        teal: {
          accent: '#2A9D8F',
          dark: '#1D6F65',
        },
        charcoal: {
          50: '#F7F7F7',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#A8A8A8',
          400: '#6B6B6B',
          500: '#4A4A4A',
          600: '#333333',
          700: '#1F1F1F',
          800: '#141414',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(0, 0, 0, 0.08)',
        card: '0 8px 32px -8px rgba(0, 0, 0, 0.1)',
        elevated: '0 18px 48px -16px rgba(20, 20, 20, 0.18)',
        glow: '0 0 40px -10px rgba(42, 157, 143, 0.25)',
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 1 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(60% 70% at 20% 20%, rgba(197,217,206,0.55) 0%, rgba(253,252,250,0) 60%), radial-gradient(50% 60% at 80% 30%, rgba(42,157,143,0.18) 0%, rgba(253,252,250,0) 60%)',
      },
    },
  },
  plugins: [typography],
};

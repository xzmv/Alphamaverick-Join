import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        am: {
          dark: '#060501',
          warm: '#161614',
          light: '#F3F4F6',
          amber: '#F5A64A',
          gold: '#F2C24F',
          charcoal: '#2B2B2B',
          muted: '#7C7C7C',
        },
      },
      boxShadow: {
        glow: '0 0 35px rgba(245, 166, 74, 0.22), 0 0 70px rgba(242, 194, 79, 0.08)',
      },
      backgroundImage: {
        'grid-dark': 'linear-gradient(rgba(245,166,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,74,0.06) 1px, transparent 1px)',
        'gold-sheen': 'linear-gradient(120deg, #F5A64A 0%, #F2C24F 55%, #F5A64A 100%)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;

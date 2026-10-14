/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '375px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        bodyfont: ['Inter', 'sans-serif'],
        titleFont: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bodyColor: '#0a0a0b',
        bodyLight: '#141416',
        surface: '#1a1a1e',
        surfaceHover: '#232326',
        textColor: 'rgba(255, 255, 255, 0.92)',
        textMuted: 'rgba(255, 255, 255, 0.55)',
        textFaint: 'rgba(255, 255, 255, 0.35)',
        designColor: '#edff20',
        designColorHover: '#e0f01c',
        accent: '#78cc6d',
        accentDark: '#5ab34e',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'reverse-spin': 'reverse-spin 15s linear infinite',
        gradient: 'gradient 8s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        'border-spin': 'border-spin 3s linear infinite',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
        'border-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        greenShadow: '0px 0px 40px -10px rgba(237,255,32,0.4)',
        glow: '0 0 20px rgba(237,255,32,0.15)',
        card: '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset',
        'card-hover': '0 16px 48px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset',
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(at 20% 30%, rgba(237,255,32,0.15) 0%, transparent 50%), radial-gradient(at 80% 70%, rgba(120,204,109,0.12) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(237,255,32,0.05) 0%, transparent 70%)',
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-gradient-green': {
          background: 'linear-gradient(90deg, #edff20 0%, #78cc6d 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass-premium': {
          background: 'rgba(255,255,255,0.06)',
          'backdrop-filter': 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

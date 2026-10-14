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
        bodyfont: ['Poppins', 'sans-serif'],
        titleFont: ['Montserrat', 'sans-serif'],
      },
      colors: {
        bodyColor: '#191919',
        textColor: 'rgba(255, 255, 255, 0.85)',
        designColor: '#edff20',
        titleRoundBg: 'linear-gradient(135deg,rgba(120,204,109,.15) 0%,rgba(120,204,109,1%) 100%)',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'reverse-spin': 'reverse-spin 15s linear infinite',
        gradient: 'gradient 8s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)',
          },
        },
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'slide-up': {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
      boxShadow: {
        greenShadow: '0px 0px 188px -14px rgba(237,255,32,1)',
        testShwdow: '11px 0px 13px -15px rgba(0,0,0,1)',
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
      };
      addUtilities(newUtilities);
    },
  ],
};

/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: {
            primary: '#121212',
            secondary: '#1E1E1E',
            tertiary: '#2D2D2D',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#E0E0E0',
            muted: '#A0A0A0',
          },
          accent: {
            blue: '#7EB6FF',
            purple: '#B39DDB',
            green: '#81C784',
            yellow: '#FFE082',
            pink: '#F48FB1',
          },
        },
        light: {
          bg: {
            primary: '#FFFFFF',
            secondary: '#F5F5F5',
            tertiary: '#EEEEEE',
          },
          text: {
            primary: '#121212',
            secondary: '#424242',
            muted: '#757575',
          },
          accent: {
            blue: '#2196F3',
            purple: '#7E57C2',
            green: '#4CAF50',
            yellow: '#FFC107',
            pink: '#EC407A',
          },
        },
        status: {
          success: '#4CAF50',
          warning: '#FF9800',
          error: '#F44336',
          info: '#2196F3',
        },
        surface: {
          dark: {
            default: 'rgba(30, 30, 30, 0.95)',
            hover: 'rgba(45, 45, 45, 0.95)',
            active: 'rgba(60, 60, 60, 0.95)',
          },
          light: {
            default: 'rgba(255, 255, 255, 0.95)',
            hover: 'rgba(245, 245, 245, 0.95)',
            active: 'rgba(238, 238, 238, 0.95)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        logo: ['Modak', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        450: '450ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [
    forms,
    typography,
    function ({ addBase }) {
      addBase({
        'html.dark': {
          transition: 'background-color 350ms ease-in-out',
        },
      });
    },
  ],
};

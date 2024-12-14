/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme 1: Dark Mode (Black Background)
        dark: {
          bg: {
            primary: '#121212', // Main background
            secondary: '#1E1E1E', // Slightly lighter black for cards/sections
            tertiary: '#2D2D2D', // Elevated elements
          },
          text: {
            primary: '#FFFFFF', // High contrast white text
            secondary: '#E0E0E0', // Slightly muted white
            muted: '#A0A0A0', // Low emphasis text
          },
          // Pastel accents with good contrast on dark
          accent: {
            blue: '#7EB6FF', // Pastel blue
            purple: '#B39DDB', // Pastel purple
            green: '#81C784', // Pastel green
            yellow: '#FFE082', // Pastel yellow
            pink: '#F48FB1', // Pastel pink
          },
        },

        // Theme 2: Light Mode (White Background)
        light: {
          bg: {
            primary: '#FFFFFF', // Main background
            secondary: '#F5F5F5', // Slightly darker white for cards/sections
            tertiary: '#EEEEEE', // Elevated elements
          },
          text: {
            primary: '#121212', // High contrast black text
            secondary: '#424242', // Slightly muted black
            muted: '#757575', // Low emphasis text
          },
          // Darker pastel accents for good contrast on light
          accent: {
            blue: '#2196F3', // Stronger blue
            purple: '#7E57C2', // Stronger purple
            green: '#4CAF50', // Stronger green
            yellow: '#FFC107', // Stronger yellow
            pink: '#EC407A', // Stronger pink
          },
        },

        // Shared semantic colors
        status: {
          success: '#4CAF50',
          warning: '#FF9800',
          error: '#F44336',
          info: '#2196F3',
        },

        // Surface colors for cards and overlays
        surface: {
          // Dark mode surfaces
          dark: {
            default: 'rgba(30, 30, 30, 0.95)',
            hover: 'rgba(45, 45, 45, 0.95)',
            active: 'rgba(60, 60, 60, 0.95)',
          },
          // Light mode surfaces
          light: {
            default: 'rgba(255, 255, 255, 0.95)',
            hover: 'rgba(245, 245, 245, 0.95)',
            active: 'rgba(238, 238, 238, 0.95)',
          },
        },
      },

      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        logo: ['Modak', 'system-ui', 'sans-serif'],
      },

      // Custom spacing for consistent layout
      spacing: {
        18: '4.5rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },

      // Animation durations
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        450: '450ms',
      },

      // Animation timing functions
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Backdrop blur values
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
    // Add custom plugin for dark mode transitions
    function ({ addBase }) {
      addBase({
        'html.dark': {
          transition: 'background-color 350ms ease-in-out',
        },
      });
    },
  ],
};

/**
 * Tailwind CSS configuration.
 *
 * The entire visual identity of dogsplace. is encoded here.
 * Never hardcode palette values in component files — always reference
 * a ceramic-* token or a CSS variable so the theme stays consistent.
 *
 * Key decisions:
 *   - `ceramic` colour scale mirrors the warm cream-to-charcoal tones of fired stoneware.
 *     950 (#1A1908) is used for all primary text, buttons, and the brand mark.
 *     50  (#FAFAF8) is the page background — warm white, not pure white.
 *   - Three font families are registered so components can reference them via
 *     font-display, font-body, font-handwritten Tailwind classes.
 *   - spin-slow (20s) drives the rotating "New Arrival" SVG badge.
 *   - marquee drives the infinite ticker strip without a JS scroll handler.
 */
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ceramic: {
          50: '#FAFAF8',   // page background
          100: '#F5F3EF',  // section / surface background
          200: '#E8E2D9',  // borders, dividers
          300: '#D4C4B0',  // muted borders
          400: '#C4B89A',  // warm mid-tone accents
          500: '#A89880',  // muted labels, secondary text
          600: '#8C8372',  // body copy
          700: '#6B6358',  // darker muted
          800: '#4A443E',  // dark button hover
          900: '#2D2924',  // near-black
          950: '#1A1908',  // primary text, buttons, brand mark
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',        // rotating "New Arrival" badge
        'marquee': 'marquee 20s linear infinite',        // infinite text ticker
        'ugc-scroll': 'marquee 40s linear infinite',    // UGC photo strip — slower, wider cards
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
          // -50% works because the marquee-track renders the text twice side-by-side,
          // so sliding to -50% perfectly loops back to the start position.
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
} satisfies Config

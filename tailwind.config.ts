import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        blob: {
          '0': {
            borderRadius: '5% 5% 5% 5% / 40% 60% 70% 30%',
          },
          '15%': {
            borderRadius: '40% 60% 70% 30% / 60% 40% 60% 40%',
            transform: 'rotate(30deg) scale(1.1)',
          },
          '25%': {
            borderRadius: '60% 40% 40% 60% / 50% 50% 50% 50%',
            transform: 'rotate(45deg) scale(1.2)',
          },
          '50%': {
            borderRadius: '50% 50% 50% 50% / 60% 30% 70% 40%',
            transform: 'rotate(90deg) scale(1)',
          },
          '60%': {
            borderRadius: '40% 60% 50% 50% / 60% 30% 70% 40%',
            transform: 'rotate(90deg) scale(0.9)',
          },
          '75%': {
            borderRadius: '70% 30% 60% 40% / 40% 60% 30% 70%',
            transform: 'rotate(135deg) scale(1.1)',
          },
          '100%': {
            borderRadius: '40% 60% 70% 30% / 0% 0% 0% 0%',
            transform: 'rotate(360deg) scale(1)',
          },
        },
        glow: {
          '0%, 100%': { opacity: '0.2' }, // Dim glow at start and end
          '50%': { opacity: '1' }, // Bright glow at midpoint
        },
        rotateLoop: {
          '0': {
            transform: 'rotate(0deg)',
          },
          '15%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        blob: 'blob 4s infinite ease-in-out',
        particleGlow: 'glow 2s infinite ease-in-out',
        rotate10Loop: 'rotateLoop 4s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;

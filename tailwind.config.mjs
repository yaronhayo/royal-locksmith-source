/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  
  theme: {
    // Container configuration
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },

    extend: {
      // Color System - Fully customizable brand colors
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#fff8eb',
          100: '#fbeab9',
          200: '#f8de87',
          300: '#f4d255',
          400: '#f0c623',
          500: '#eca413',
          600: '#c0850f',
          700: '#94660b',
          800: '#684708',
          900: '#4a3306',
          950: '#2d1f04',
        },
        
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#f4f3f0',
          100: '#e2e1de',
          200: '#d0cfcc',
          300: '#bfbeba',
          400: '#3f3c36',
          500: '#2e2a23',
          600: '#221c10',
          700: '#1d1a14',
          800: '#181611',
          900: '#121009',
          950: '#0a0906',
        },
        
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },

        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },

        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },

      // Typography - Royal Locksmith Design System
      fontFamily: {
        sans: ['Inter', 'Inter Variable', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // Spacing
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      // Border Radius
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // Box Shadow - Royal Locksmith gold glow
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(24, 22, 17, 0.2), 0 10px 20px -2px rgba(24, 22, 17, 0.1)',
        'soft-lg': '0 10px 40px -15px rgba(24, 22, 17, 0.25)',
        'soft-xl': '0 20px 50px -20px rgba(24, 22, 17, 0.3)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(24, 22, 17, 0.1)',
        'glow': '0 0 20px rgba(236, 164, 19, 0.4)',
        'glow-lg': '0 0 40px rgba(236, 164, 19, 0.3)',
      },

      // Animations
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 1s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      // Backdrop Blur
      backdropBlur: {
        xs: '2px',
      },

      // Z-Index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Aspect Ratio
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },

      // Typography Plugin Customization
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.secondary.700'),
            '--tw-prose-headings': theme('colors.secondary.900'),
            '--tw-prose-links': theme('colors.primary.600'),
            '--tw-prose-bold': theme('colors.secondary.900'),
            '--tw-prose-counters': theme('colors.secondary.500'),
            '--tw-prose-bullets': theme('colors.secondary.300'),
            '--tw-prose-hr': theme('colors.secondary.200'),
            '--tw-prose-quotes': theme('colors.secondary.900'),
            '--tw-prose-quote-borders': theme('colors.primary.500'),
            '--tw-prose-captions': theme('colors.secondary.500'),
            '--tw-prose-code': theme('colors.secondary.900'),
            '--tw-prose-pre-code': theme('colors.secondary.200'),
            '--tw-prose-pre-bg': theme('colors.secondary.900'),
            '--tw-prose-th-borders': theme('colors.secondary.300'),
            '--tw-prose-td-borders': theme('colors.secondary.200'),
            maxWidth: 'none',
            a: {
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              fontWeight: '800',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h3: {
              fontWeight: '600',
            },
          },
        },
        dark: {
          css: {
            '--tw-prose-body': theme('colors.secondary.300'),
            '--tw-prose-headings': theme('colors.secondary.50'),
            '--tw-prose-links': theme('colors.primary.400'),
            '--tw-prose-bold': theme('colors.secondary.50'),
            '--tw-prose-counters': theme('colors.secondary.400'),
            '--tw-prose-bullets': theme('colors.secondary.600'),
            '--tw-prose-hr': theme('colors.secondary.700'),
            '--tw-prose-quotes': theme('colors.secondary.100'),
            '--tw-prose-quote-borders': theme('colors.primary.500'),
            '--tw-prose-captions': theme('colors.secondary.400'),
            '--tw-prose-code': theme('colors.secondary.50'),
            '--tw-prose-pre-code': theme('colors.secondary.300'),
            '--tw-prose-pre-bg': theme('colors.secondary.950'),
            '--tw-prose-th-borders': theme('colors.secondary.600'),
            '--tw-prose-td-borders': theme('colors.secondary.700'),
          },
        },
      }),
    },
  },

  plugins: [
    typography,
    forms({
      strategy: 'class',
    }),
    containerQueries,
  ],
};

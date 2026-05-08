import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand — del Sistema de Identidad NEXE v1.0
        navy: '#1B2C46', // Azul NEXE — base institucional
        'navy-ink': '#0E1623', // Negro tinta
        blue: {
          DEFAULT: '#2C5F8A', // mid-blue (transicional, hover de navy)
          light: '#5BA3DD', // Celeste pivote — acento puntual
        },
        // Cuadrados / motivo gráfico
        'plane-tint': '#EBF3FA', // Plano 01
        'plane-solid': '#CFE2F2', // Plano 02
        // Neutros marfil
        marfil: {
          DEFAULT: '#FBFAF7', // superficie principal
          dark: '#F4F2EC', // secciones alternadas
        },
        // Gris medio (etiquetas, secundarios)
        'gray-medium': '#7B8597',
        // Escala neutra (mantengo gray-* tailwindish para compatibilidad)
        gray: {
          50: '#FBFAF7',
          100: '#F4F2EC',
          200: '#E5E2DA',
          300: '#D4D0C6',
          400: '#A8AEBA',
          500: '#7B8597',
          600: '#5C6679',
          700: '#3F4858',
          800: '#26303F',
          900: '#0E1623',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala alineada al manual NEXE (Archivo)
        display: ['clamp(3rem, 6.5vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'h1-fluid': ['clamp(2rem, 4vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'h2-fluid': ['clamp(1.5rem, 2.6vw, 2rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        lead: ['1.0625rem', { lineHeight: '1.55' }],
        eyebrow: ['0.625rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      letterSpacing: {
        widest: '0.18em',
      },
      boxShadow: {
        'nexe-sm': '0 1px 2px rgba(14,22,35,0.04)',
        'nexe-md': '0 4px 12px rgba(14,22,35,0.06)',
        'nexe-lg': '0 12px 32px rgba(14,22,35,0.08)',
        'nexe-xl': '0 24px 64px rgba(27,44,70,0.12)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 400ms ease-out both',
      },
    },
  },
  plugins: [],
}

export default config

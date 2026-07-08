import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        muted: '#475569',
        subtle: '#64748B',
        surface: '#F8FAFC',
        border: '#E2E8F0',
        brand: {
          start: '#4F46E5',
          mid: '#6D5BF6',
          end: '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4F46E5 0%, #6D5BF6 50%, #06B6D4 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(6,182,212,0.08) 100%)',
        'grid-pattern':
          'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, -30px) scale(1.08)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-24' },
        },
        typing: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        blob: 'blob 12s infinite ease-in-out',
        float: 'float 5s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
        'dash-flow': 'dash-flow 1.2s linear infinite',
        typing: 'typing 1s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 0 40px rgba(79, 70, 229, 0.18)',
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      '#F8FAFC',
          sidebar: '#0F172A',
          primary: '#2563EB',
          security:'#16A34A',
          costs:   '#F59E0B',
          alert:   '#DC2626',
          text:    '#1E293B',
          muted:   '#64748B',
          border:  '#E2E8F0',
          card:    '#FFFFFF',
        },
      },
      borderRadius: {
        xl:  '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,.07), 0 1px 2px -1px rgba(0,0,0,.05)',
      },
    },
  },
  plugins: [],
}

const defaultTheme = require('tailwindcss/defaultTheme')



/** @type { import('tailwindcss').Config } */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'logotype': [ 'Pacifico', 'cursive' ],
        'sans': [ 'Open Sans', ...defaultTheme.fontFamily.sans ]
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#0284c7',
          'secondary': '#4b5563',
          'accent': '#db2777',
          'neutral': '#1E293B',
          'base-100': '#ffffff',
          'info': '#0891b2',
          'success': '#059669',
          'warning': '#f59e0b',
          'error': '#ef4444'
        },
        dark: {
          'primary': '#38BDF8',
          'secondary': '#9ca3af',
          'accent': '#F471B5',
          'neutral': '#1E293B', // night: #1E293B, dark: #191D24
          'base-100': '#101b2b', // night: #0F172A, dark: #2A303C
          'base-200': '#0e1526',
          'base-300': '#0b111f',
          'info': '#22d3ee',
          'success': '#4ade80',
          'warning': '#fbbf24',
          'error': '#f87171'
        }
      }
    ]
  }
}

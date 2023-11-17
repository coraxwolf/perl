import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sunshine': '#FFB819',      // Primary
        'bluebonnet': '#0075C9',    // Secondary
        'iron': '#55565A',          // Background Shadows
        'battleship': '#8A8A8C',   // Accent
        'peridot': '#6CC04A',       // Success
        'rocket': '#D9272E',       // Warning, Danger
        'houstonsky': '#0093C9',   // Accent 2
        'white': '#FFFFFF',
        'black': '#000000',
        'monarch': '#EF7622',
        'azalea': '#E56385',
        'mauveine': '#4A0D66',
        'memorialgreen': '#009D4E'
      },
      fontFamily: {
        avenir: ['Avenir-Medium'],
        avenirLight: ['Avenir-Light'],
        avenirHeavy: ['Avenir-Heavy'],
        heading: ['Avenir-Heavy'],
        italic: ['Avenir-Light'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

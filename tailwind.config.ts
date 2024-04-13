import type { Config } from 'tailwindcss'
import LineClampPlugin from '@tailwindcss/line-clamp'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
          colors: {
          'primary': {
            '50': '#fef9ec',
            '100': '#fcedc9',
            '200': '#f8da8f',
            '300': '#f4bb44', // main
            '400': '#f2a92d',
            '500': '#ec8914',
            '600': '#d0650f',
            '700': '#ad4610',
            '800': '#8d3613',
            '900': '#742d13',
            '950': '#421606',
        },
          'secondary': {
            '50': '#eff5ff',
            '100': '#dbe8fe',
            '200': '#c0d8fd',
            '300': '#94bffc',
            '400': '#629df8',
            '500': '#447df4', // main
            '600': '#2859e8',
            '700': '#1f45d6',
            '800': '#2039ad',
            '900': '#1f3589',
            '950': '#182253',
        },
        'white': '#f1f1f1', 
        'black': '#202020',
      },
    },
  },
  plugins: [],
} satisfies Config


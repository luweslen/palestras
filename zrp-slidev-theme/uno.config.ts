import { defineConfig } from 'unocss';
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    colors: {
      background: {
        DEFAULT: '#ffffff',
      },
      primary: {
        // oxford
        DEFAULT: '#f6a848',
        50: '#B7C4D3',
        100: '#A7B7C9',
        200: '#879DB6',
        300: '#6784A3',
        400: '#516A86',
        500: '#3E5166',
        600: '#2B3846',
        700: '#171F27',
        800: '#040507',
        900: '#000000',
      },
    },
  },
});

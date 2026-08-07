import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Paleta derivada del logo corporativo (public/logo/):
      // navy #062636 (aro y montaña), teal #2d9cb1 (lago), naranja #fba44f (cielo).
      // Los acentos se usan como texto sobre crema, así que van oscurecidos
      // respecto del logo para alcanzar contraste legible; los tonos "light"
      // conservan el valor original del logo y se reservan para fondos oscuros.
      colors: {
        'bg-primary': '#F5F0E8',    // crema cálida — base de página
        'bg-dark':    '#062636',    // navy profundo del logo — secciones oscuras
        'bg-card':    '#ECE8DE',    // crema ligeramente más profunda
        'bg-light':   '#FAFAF5',    // casi blanco para máximo contraste
        cream:        '#F5F0E8',
        gold:         '#CE7D24',    // ámbar del cielo del logo (2.8:1 sobre crema)
        'gold-light': '#F5A94F',    // naranja del logo — sobre fondos oscuros
        lake:         '#17606F',    // teal del logo oscurecido — acento principal
        'lake-light': '#2D9CB1',    // teal exacto del logo
        'lake-dark':  '#0E4654',
        navy:         '#062636',    // alias para secciones oscuras
        ink:          '#0B2430',    // tinta azulada para texto sobre crema
      },
      fontFamily: {
        // Cinzel — títulos y detalles. Lora — cuerpo de texto.
        // Bromello — acentos manuscritos; ver @font-face en globals.css.
        serif:  ['var(--font-cinzel)', 'Georgia', 'serif'],
        sans:   ['var(--font-lora)', 'Georgia', 'serif'],
        script: ['Bromello', 'var(--font-lora)', 'cursive'],
      },
      letterSpacing: {
        ultra: '0.35em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;

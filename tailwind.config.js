/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'active-color': '#009FFF',
      'active-color2': '#FF7A52',
      'text-color': '#222',
      'gray-dark':'#878787',
      'gray-light': '#fafafa',
      'gray-light2': '#f2f2f2',
      'gray-light3': '#dddddd',
      'white-color': '#fff',
      'yellow-color':'#fdbc00',
      'blue-light':'#4490c7',
      'blue-dark':'#5856d6',
      'orage': '#f28c17',
      'error-color' : '#fd3f61',
    },
    fontFamily: {
      heading: ['Space Grotesk', 'sans-serif'],
      para: ['Inters','sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      translate: {
        // defaults to {}
        '0': '0%',
        '1px': '1px',
        '1/2': '50%',
        full: '100%',
        '-full': '-100%',
        'right-up': ['100%', '-100%'],
        '3d': ['40px', '-60px', '-130px']
      },
      flex: {
        '2': '0 49%'
      },
      colors: {
        deepblue: {
          '700': '#3a3663',
          '600': '#414977',
          '500': '#476589',
          '400': '#4c7c9a',
          '300': '#50919b'
        }
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      },
      minWidth: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      },
      maxHeight: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      }
    }
  },
  variants: {
    margin: ['responsive', 'first', 'odd', 'hover', 'focus']
  },
  plugins: [
    require('tailwindcss-transforms')({ '3d': false }),
    require('tailwindcss-transitions')()
  ]
};

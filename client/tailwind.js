module.exports = {
  theme: {
    extend: {
      flex: {
        '2': '0 45%'
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
    margin: ['responsive', 'odd', 'hover', 'focus']
  },
  plugins: []
};

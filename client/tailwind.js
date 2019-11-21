module.exports = {
  theme: {
    extend: {
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
    borderWidth: ['responsive', 'first', 'hover', 'focus']
  },
  plugins: []
};

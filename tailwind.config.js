module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'wy-red': '#ec4141',
        'wy-deep-red': '#d83b3b',
        'wy-deep-red2': '#e13e3e',
        'header-active-gray': '#f7d7d7',
        'header-unactive-gray': '#e16969',
        'leftMenu-hover': '#f6f6f7'
      },
      minWidth: {
        'wy-minWidth': '1060px'
      },
      minHeight: {
        'wy-minHeight': '680px'
      },
      maxWidth: {
        '40': '10rem',
        '50': '12.5rem'
      },
      backgroundImage: {
        'header-logo': 'url("./src/assets/images/logo.png")'
      },
      lineHeight: {
        '4rem': '4rem'
      },
      backgroundSize: {
        '70%': '70%'
      },
      width: {
        '90': '22.5rem',
        'bigScreen': '1100px'
      },
      height: {
        '120': '30rem',
        '132': '33rem',
        '90': '22.5rem'
      },
      margin: {
        // 'auto': '0 auto'
      },
      boxShadow: {
        'dialog': '0 0px 5px 4px rgba(0, 0, 0, 0.2)'
      },
      borderWidth: {
        '28': '28px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

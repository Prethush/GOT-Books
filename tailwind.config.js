module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        heading: ["Roboto"]
      },
      flex: {
        20: "0 1 18%",
        25: "0 1 22%",
        30: "0 1 28%",
        50: "0 1 42%",
        100: "0 1 100%"
      },
      colors: {
        "primary": "#d9b48fff"
      },
      height: {
        custom: "85vh",
        secondary: "78vh"
      },
      minWidth: {
        custom: "200px"
      },
      margin: {
        custom: "30rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

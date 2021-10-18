import { createTheme } from "@material-ui/core/styles"

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3695EC",
    },
    secondary: {
      main: "#ED574E",
    },
    background: {
      paper: "#303030",
      default: "#202020",
    },
    header: {
      main: "#1D1D1D",
    },
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.025em",
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 400,
    },
    subtitle2: {
      fontWeight: 400,
    },
    body1: {
      fontWeight: 400,
      letterSpacing: "0.02em",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.9rem",
      letterSpacing: "0.02em",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 700,
      fontSize: "0.9rem",
      letterSpacing: "0.02em",
    },
    caption: {
      fontWeight: 700,
    },
    overline: {
      fontWeight: 600,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

export default theme

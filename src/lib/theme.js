import { createMuiTheme } from '@material-ui/core/styles'
import cssVars from 'Assets/css/variables.scss'

const theme = createMuiTheme({
  props: {
    MuiSwitch: {
      color: 'primary',
    },
    MuiRadio: {
      color: 'primary',
    },
  },
  palette: {
    primary: {
      main: cssVars.primaryColor,
      contrastText: '#ffffff',
    },
    secondary: {
      main: cssVars.secondaryColor,
      contrastText: '#ffffff',
    },
    error: {
      main: cssVars.errorColor,
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    htmlFontSize: 12,
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 30,
        fontWeight: 800,
        fontSize: 14,
      },
      text: {
        padding: '6px 16px 6px 12px',
      },
      contained: {
        boxShadow: 'none',
      },
    },
    MuiListItem: {
      button: {
        '&:focus': {
          backgroundColor: 'unset',
        },
      },
    },
    MuiIconButton: {
      root: {
        color: 'black',
      },
    },
    MuiBackdrop: {
      root: {
        backdropFilter: 'blur(1px)',
        backgroundColor: 'rgba(43, 43, 43, 0.8)',
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 10,
      },
    },
  },
})

export default theme

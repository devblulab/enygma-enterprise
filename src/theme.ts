// src/theme.ts
import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Tema principal
const theme = createTheme({
  palette: {
    type: 'light', // Muda para 'dark' se quiser modo escuro
    primary: {
      main: '#3f51b5', // Azul padrão
    },
    secondary: {
      main: '#f50057', // Rosa
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f7fa',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Nunito, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 16,
      },
    },
  },
});

export default theme;

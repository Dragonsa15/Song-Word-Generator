import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4500', // Red color for primary elements
    },
    secondary: {
      main: '#228B22', // Green color for secondary elements
    },
    text: {
      primary: '#333',
      secondary: '#FFD700', // Gold for emphasis
    }
  },
  typography: {
    fontFamily: 'Mukta, sans-serif', // Traditional font
  },
  components: {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
              backgroundImage: 'url(/assets/flower_background.jpg)', // Ensure the correct path
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              minHeight: '100vh',
              width: '100%',
              backgroundAttachment: 'fixed',
            },
            html: {
              height: '100%',
            },
            '#root': {
              height: '100%',
            },
        },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          padding: '10px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: '#FFD700', // Gold border for cards
          backgroundColor: '#FFF8DC', // Light golden background
        },
      },
    },
  },
});

export default theme;

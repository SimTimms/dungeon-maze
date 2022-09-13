import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    secondary: { main: '#575d6b', dark: '#343740', light: '#727887' },
    primary: { main: '#33cdcd' },
  },
  typography: {
    body2: { fontFamily: `'Courier Prime', monospace`, fontSize: '0.8rem' },
    h2: { fontFamily: `'Courier Prime', monospace`, fontSize: '1.8rem' },
    h3: { fontFamily: `'Courier Prime', monospace`, fontSize: '1.4rem' },
    h4: {
      fontFamily: `'Courier Prime', monospace`,
      fontSize: '1.2rem',
      marginTop: 60,
      marginBottom: 10,
    },
    h5: {
      fontFamily: `'Courier Prime', monospace`,
      fontSize: '1rem',
      marginTop: 5,
    },
  },
});

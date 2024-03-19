import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    footer?: {
      main?: string,
      contrastText?: string,
    };
  }

  // interface PaletteOptions {
  //   footer?: {
  //     main?: string,
  //     contrastText?: string,
  //   };
  // }
}

const themeTypography = {
  fontFamily: [
    'Noto Sans',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  h1: {
    fontWeight: 600,
  },
  h2: {
    fontWeight: 600,
  },
};

export const light = createTheme({
  palette: {
    primary: {
      main: '#4A89BF',
      light: '#689CCA',
      dark: '#3A74A6',
      contrastText: '#FAFAFA',
    },
    secondary: {
      main: '#E6C960',
      light: '#ECD583',
      dark: '#E1BD3D',
    },
    text: {
      primary: '#1B2021',
      secondary: '#1B2021CC',
    },
    background: {
      default: '#F8F8FC',
      paper: '#F8F8FC',
    },
    footer: {
      main: '#1B2021',
      contrastText: '#FAFAFA',
    },
  },
  typography: themeTypography,
});

export const dark = createTheme({
  palette: {
    primary: {
      main: '#4A89BF',
      light: '#689CCA',
      dark: '#3A74A6',
      contrastText: '#FAFAFA',
    },
    secondary: {
      main: '#E6C960',
      light: '#ECD583',
      dark: '#E1BD3D',
    },
    text: {
      primary: '#1B2021',
      secondary: '#1B2021CC',
    },
    background: {
      default: '#252B2D',
      paper: '#FAFAFA',
    },
  },
  typography: themeTypography,
});

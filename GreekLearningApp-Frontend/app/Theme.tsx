'use client';

import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    footer?: {
      main?: string,
      contrastText?: string,
    };
  }
  interface TypeBackground {
    default: string,
    secondary?: string,
    tertiary?: string,
    paper: string,
  }
  interface TypographyVariants {
    readerBody: React.CSSProperties;
    readerHelp: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    readerBody?: React.CSSProperties;
    readerHelp?: React.CSSProperties;
  }
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
  greekFontFamily: ['Noto Serif', 'serif'].join(''),
  h1: {
    fontWeight: 600,
  },
  h2: {
    fontWeight: 600,
  },
  readerBody: {
    fontFamily: ['Noto Serif', 'serif'].join(''),
    fontSize: '1.1rem',
    lineHeight: '1.2rem',
  },
  readerHelp: {
    fontFamily: ['Noto Serif', 'serif'].join(''),
    fontSize: '1rem',
    lineHeight: '1.2rem',
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
      secondary: '#F1F1F9',
      tertiary: '#EAEAF6',
      paper: '#FFFFFF',
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

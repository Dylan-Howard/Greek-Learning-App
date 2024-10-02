'use client';

import { ReactNode } from 'react';

import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export function ReaderPageUnitHelp({ children } : { children: ReactNode }) {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        display: 'inline-block',
        color: theme.palette.text.primary,
        fontFamily: 'Noto Serif, serif',
        fontSize: theme.typography.readerHelp.fontSize,
        lineHeight: theme.typography.readerHelp.lineHeight,
        mr: 1,
      }}
    >
      {children}
    </Typography>
  );
}

export function ReaderPageUnit({ children } : { children: ReactNode }) {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        color: theme.palette.text.primary,
        cursor: 'pointer',
        fontFamily: 'Noto Serif, serif',
        fontSize: theme.typography.readerBody.fontSize,
        lineHeight: theme.typography.readerBody.lineHeight,
        mr: 1,
        '&:hover': { color: theme.palette.primary.main },
      }}
    >
      {children}
    </Typography>
  // <Box
  //   role="button"
  //   tabIndex={0}
  //   onClick={() => handleClick()}
  //   sx={{ display: 'inline-block' }}
  // >

  //   {
  //     helpText
  //       ? (
  //         <Typography
  //           sx={{
  //             display: 'inline-block',
  //             color: theme.palette.text.primary,
  //             fontFamily: 'Noto Serif, serif',
  //             fontSize: theme.typography.readerHelp.fontSize,
  //             lineHeight: theme.typography.readerHelp.lineHeight,
  //             mr: 1,
  //           }}
  //         >
  //           {helpText}
  //         </Typography>
  //       )
  //       : ''
  //     }
  // </Box>
  );
}

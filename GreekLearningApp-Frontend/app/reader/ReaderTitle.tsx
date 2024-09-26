'use client';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function TextTitle(props: { children: any }) {
  const theme = useTheme();
  const { children } = props;

  return (
    <Typography
      variant="h2"
      sx={{
        fontFamily: 'Noto Serif, serif',
        fontSize: 48,
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1.8,
        textAlign: 'center',
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

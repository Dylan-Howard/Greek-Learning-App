'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { Unitv2 } from '../modules/Text';

export default function TextUnit({ unit }: { unit: Unitv2 }) {
  const theme = useTheme();
  const { morphologyId, content, helpText } = unit;

  if (morphologyId) {
    return (
      <Box
        role="button"
        tabIndex={0}
        sx={{ display: 'inline-block' }}
      >
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
          {content}
        </Typography>
        {
          helpText
            ? (
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
                {helpText}
              </Typography>
            )
            : ''
          }
      </Box>
    );
  }

  return <span className="TextUnit">{`${content}`}</span>;
}

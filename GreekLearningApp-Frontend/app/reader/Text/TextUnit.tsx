/**
 * Text Unit
 */
import Typography from '@mui/material/Typography';
import { Box, useTheme } from '@mui/material';
import { Unitv2 } from '../LanguageData/Text';

function TextUnit({ unit, onClick }: { unit: Unitv2, onClick: Function }) {
  const theme = useTheme();
  const { morphologyId, content, helpText } = unit;
  if (morphologyId) {
    return (
      <Box
        onClick={(e) => onClick(e)}
        onKeyUp={(e) => onClick(e)}
        onTouchEnd={(e) => onClick(e)}
        role="button"
        tabIndex={0}
        sx={{
          display: 'inline-block',
          cursor: 'pointer',
        }}
      >
        <Typography
          sx={{
            display: 'inline-block',
            color: theme.palette.text.primary,
            fontFamily: 'Noto Serif, serif',
            fontSize: theme.typography.readerBody.fontSize,
            lineHeight: theme.typography.readerBody.lineHeight,
            mr: 1,
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

export default TextUnit;

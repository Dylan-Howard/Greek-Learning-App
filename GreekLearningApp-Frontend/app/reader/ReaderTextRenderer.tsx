'use server';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Unitv2 } from '../modules/Text';

import TextControls from './ReaderControls';
import TextSelectionControls from './ReaderSelectControls';
import ReaderTextUnit from './ReaderTextUnit';
import TextTitle from './ReaderTitle';

export default async function TextRenderer({
  text,
  selections,
  title,
  units,
  position,
} : {
  text: { bookId: number, chapterId: number },
  selections: {
    texts: { textId: number, title: string }[],
    chapters: { chapterId: number, title: string }[],
  }
  title: string,
  units: Unitv2[],
  position: string | undefined,
}) {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        height: 'calc(100vh - env(safe-area-inset-bottom))',
        width: '100%',
        ml: { xs: 0, sm: 10 },
      }}
    >
      <Stack direction="row" justifyContent="center" sx={{ mt: 4, pb: 2 }}>
        <TextSelectionControls selections={selections} text={text} />
      </Stack>
      <Box sx={{ height: { xs: 'calc(100% - 160.5px)', sm: 'calc(100% - 88px)' }, overflowY: 'scroll' }}>
        <Container maxWidth="sm">
          <TextTitle>{title}</TextTitle>
          <Box sx={{ mb: 4 }}>
            { units.map((unt) => (<ReaderTextUnit unit={unt} />)) }
          </Box>
          <TextControls chapterId={text.chapterId} chapterPosition={position} />
        </Container>
      </Box>
    </Box>
  );
}

import NextLink from 'next/link';
// import { useUser } from '@clerk/nextjs';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import * as AzureReaderService from '../services/AzureReaderService';
import { Unitv2 } from '../modules/Text';

import { TextRendererSkeleton } from '../modules/Skeletons';
import TextControls from './ReaderControls';
import TextSelectionControls from './ReaderSelectControls';
import TextUnit from './ReaderTextUnit';
import TextTitle from './ReaderTitle';

export default async function TextRenderer(
  { text } : { text: { bookId: number, chapterId: number } },
) {
  const user = { id: 'guest' };
  const selections = {
    texts: [{ textId: 1, title: '' }],
    chapters: [{ chapterId: 1, chapterNumber: 1 }],
  };
  let title = '';
  let units: any[] = [];

  const data = await AzureReaderService.fetchPage(text.chapterId, user?.id || '');
  if (!data) {
    throw new Error('Error fetching the reader page.');
  }

  selections.texts = data.selection.texts;
  selections.chapters = data.selection.chapters;
  title = data.title;
  units = data.text;

  const isSelectionLoaded = selections.texts.length && selections.texts[0].title !== '';

  /* Determines the position of the active chapter within the active text */
  let chapterPosition;
  if (selections.chapters[0].chapterId === text.chapterId) {
    chapterPosition = 'first';
  }
  if (selections.chapters[selections.chapters.length - 1].chapterId === text.chapterId) {
    chapterPosition = 'last';
  }

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
        {
          isSelectionLoaded
            ? <TextSelectionControls selections={selections} text={text} />
            : <Skeleton variant="rounded" width={260} height={40} />
          }
      </Stack>
      <Box sx={{ height: { xs: 'calc(100% - 160.5px)', sm: 'calc(100% - 88px)' }, overflowY: 'scroll' }}>
        <Container maxWidth="sm">
          <TextTitle>{title}</TextTitle>
          <Box sx={{ mb: 4 }}>
            {
                units.length
                  ? units.map((unt: Unitv2) => (
                    <NextLink href={`/reader?bookId=${text.bookId}&chapterId=${text.chapterId}&tabId=2&morphologyId=${unt.morphologyId}`}>
                      <TextUnit key={`unit-${unt.verseNumber}-${unt.unitId}`} unit={unt} />
                    </NextLink>
                  ))
                  : <TextRendererSkeleton />
                }
          </Box>
          {
            isSelectionLoaded
              ? <TextControls chapterId={text.chapterId} chapterPosition={chapterPosition} />
              : ''
          }
        </Container>
      </Box>
    </Box>
  );
}

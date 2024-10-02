'use server';

import { currentUser } from '@clerk/nextjs/server';
import NextLink from 'next/link';

import * as AzureReaderService from 'app/services/AzureReaderService';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ReaderInterface from '../ReaderPage/ReaderInterface';
import Nav from '../Nav/Nav';
import Sidebar from '../Nav/Sidebar';
import ReaderSelectionControl from '../ReaderPage/ReaderPageSelect';
import TextTitle from '../ReaderPage/ReaderPageTitle';
import ReaderPageUnitControl from '../ReaderPage/ReaderPageUnitControl';
import { ReaderPageUnit, ReaderPageUnitHelp } from '../ReaderPage/ReaderPageUnit';

const DEFAULT_BOOK_ID = 1;
const DEFAULT_CHAPTER_ID = 1;

export default async function ReaderPage({ params } : { params: { page: string[] } }) {
  const user = await currentUser();
  const userId = user?.id || 'guest';

  /* Text data */
  const [bookId, chapterId] = params.page ? params.page : ['1', '1'];
  const page = {
    bookId: parseInt(bookId, 10) || DEFAULT_BOOK_ID,
    chapterId: parseInt(chapterId, 10) || DEFAULT_CHAPTER_ID,
  };

  const data = await AzureReaderService.fetchPage(page.chapterId, userId);
  if (!data) {
    throw new Error('Error fetching the reader page.');
  }

  const { selection, title, text } = data;

  /* Determines the position of the active chapter within the active text */
  let chapterPosition;
  if (selection.chapters[0].chapterId === page.chapterId) {
    chapterPosition = 'first';
  }
  if (selection.chapters[selection.chapters.length - 1].chapterId === page.chapterId) {
    chapterPosition = 'last';
  }

  return (
    <Stack
      sx={{
        bgcolor: 'background.default',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        height: 'calc(100vh - env(safe-area-inset-bottom))',
        overflow: 'hidden',
      }}
    >
      <ReaderInterface bookId={page.bookId} chapterId={page.chapterId}>
        {/* Navigation */}
        <Box
          component="nav"
          sx={{
            boxSizing: 'border-box',
            position: 'fixed',
            height: { xs: 'auto', sm: '100vh' },
            width: { xs: '100vw', sm: 'auto' },
            bottom: { xs: 0 },
            zIndex: 1150,
            bgcolor: 'background.secondary',
            pt: { xs: 'calc(env(safe-area-inset-top) + 16px)', sm: 0 },
            pl: { xs: 2, sm: 0 },
            pr: { xs: 2, sm: 0 },
            pb: { xs: 'calc(env(safe-area-inset-bottom) + 16px)', sm: 0 },
          }}
        >
          <Nav />
        </Box>
        <Sidebar />
        {/* Reader Page */}
        <Box
          sx={{
            bgcolor: 'background.default',
            height: 'calc(100vh - env(safe-area-inset-bottom))',
            width: '100%',
            ml: { xs: 0, sm: 10 },
          }}
        >
          <Stack direction="row" justifyContent="center" sx={{ mt: 4, pb: 2 }}>
            <FormControl size="small">
              <InputLabel id="reader-select-book-label">Book</InputLabel>
              <ReaderSelectionControl
                id="reader-select-book"
                labelId="reader-select-book-label"
                label="Book"
                reference="book"
                page={page}
              >
                {
                  selection.texts.map((txt) => (
                    <MenuItem value={txt.textId} key={`text-${txt.textId}`}>{txt.title}</MenuItem>
                  ))
                }
              </ReaderSelectionControl>
            </FormControl>
            <FormControl size="small">
              <InputLabel id="reader-select-chapter-label">Chapter</InputLabel>
              <ReaderSelectionControl
                id="reader-select-chapter"
                labelId="reader-select-chapter-label"
                label="Chapter"
                reference="chapter"
                page={page}
              >
                {
                  selection.chapters.map((chp) => (
                    <MenuItem value={chp.chapterId} key={`chapter-${chp.chapterId}`}>{chp.chapterNumber}</MenuItem>
                  ))
                }
              </ReaderSelectionControl>
            </FormControl>
          </Stack>
          <Box sx={{ height: { xs: 'calc(100% - 160.5px)', sm: 'calc(100% - 88px)' }, overflowY: 'scroll' }}>
            <Container maxWidth="sm">
              <TextTitle>{title}</TextTitle>
              <Box sx={{ mb: 4 }}>
                {
                  text.map((unt) => (
                    <ReaderPageUnitControl morphologyId={unt.morphologyId}>
                      <ReaderPageUnit>{unt.content}</ReaderPageUnit>
                      <ReaderPageUnitHelp>{unt.helpText}</ReaderPageUnitHelp>
                    </ReaderPageUnitControl>
                  ))
                }
              </Box>
              <Stack
                direction={chapterPosition === 'first' ? 'row-reverse' : 'row'}
                justifyContent="space-between"
                sx={{ m: 4, mt: 0 }}
              >
                {
                  chapterPosition !== 'first'
                    ? (
                      <NextLink href={`/reader/${page.bookId}/${page.chapterId - 1}`}>
                        <Fab color="primary" aria-label="navigate-back">
                          <ChevronLeftIcon />
                        </Fab>
                      </NextLink>
                    )
                    : ''
                }
                {
                  chapterPosition !== 'last'
                    ? (
                      <NextLink href={`/reader/${page.bookId}/${page.chapterId + 1}`}>
                        <Fab color="primary" aria-label="navigate-forward">
                          <ChevronRightIcon />
                        </Fab>
                      </NextLink>
                    )
                    : ''
                }
              </Stack>
            </Container>
          </Box>
        </Box>
      </ReaderInterface>
    </Stack>
  );
}

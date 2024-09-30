'use server';

import * as AzureReaderService from 'app/services/AzureReaderService';
import Stack from '@mui/material/Stack';
import ReaderInterface from '../ReaderInterface';
import Nav from '../Nav/Nav';
import Sidebar from '../Nav/Sidebar';
import ReaderTextRenderer from '../ReaderTextRenderer';

const DEFAULT_BOOK_ID = 1;
const DEFAULT_CHAPTER_ID = 1;

export default async function ReaderPage({ params } : { params: { page: string[] } }) {
/* Text data */
  const [bookId, chapterId] = params.page ? params.page : ['1', '1'];
  const text = {
    bookId: parseInt(bookId, 10) || DEFAULT_BOOK_ID,
    chapterId: parseInt(chapterId, 10) || DEFAULT_CHAPTER_ID,
  };

  const user = { id: 'guest' };

  const data = await AzureReaderService.fetchPage(text.chapterId, user?.id || '');
  if (!data) {
    throw new Error('Error fetching the reader page.');
  }

  const { selection, title } = data;

  /* Determines the position of the active chapter within the active text */
  let chapterPosition;
  if (selection.chapters[0].chapterId === text.chapterId) {
    chapterPosition = 'first';
  }
  if (selection.chapters[selection.chapters.length - 1].chapterId === text.chapterId) {
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
      <ReaderInterface bookId={text.bookId} chapterId={text.chapterId}>
        <Nav />
        <Sidebar />
        <ReaderTextRenderer
          selections={selection}
          title={title}
          text={text}
          units={data.text}
          position={chapterPosition}
        />
      </ReaderInterface>
    </Stack>
  );
}

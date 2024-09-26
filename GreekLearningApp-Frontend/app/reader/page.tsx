import Stack from '@mui/material/Stack';

import TextRenderer from './ReaderTextRenderer';
import Nav from './Nav/Nav';
import Sidebar from './Nav/Sidebar';

const DEFAULT_BOOK_ID = 1;
const DEFAULT_CHAPTER_ID = 1;

export default function ReaderPage({
  searchParams,
} : {
  searchParams: {
    bookId?: string,
    chapterId?: string,
    tabId?: string,
    morphologyId?: string,
  },
}) {
  /* Variables primarily for text rendering */
  const text = {
    bookId: searchParams.bookId ? parseInt(searchParams.bookId, 10) : DEFAULT_BOOK_ID,
    chapterId: searchParams.chapterId ? parseInt(searchParams.chapterId, 10) : DEFAULT_CHAPTER_ID,
  };

  /* Variables for Sidebar */
  const { tabId, morphologyId } = searchParams;

  const activeTabIndex = tabId !== undefined ? parseInt(tabId, 10) : undefined;
  const activeMorphologyId = morphologyId !== undefined ? parseInt(morphologyId, 10) : undefined;

  return (
    <Stack
      sx={{
        bgcolor: 'background.default',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        height: 'calc(100vh - env(safe-area-inset-bottom))',
        overflow: 'hidden',
      }}
    >
      <Nav activeTabIndex={activeTabIndex} />
      <Sidebar tabId={activeTabIndex} morphologyId={activeMorphologyId} />
      <TextRenderer text={text} />
    </Stack>
  );
}

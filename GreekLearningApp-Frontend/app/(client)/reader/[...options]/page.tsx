import Stack from '@mui/material/Stack';

import TextRenderer from '../TextRenderer';
import Nav from '../Nav/Nav';
import Sidebar from '../Nav/Sidebar';

const DEFAULT_BOOK_ID = 1;
const DEFAULT_CHAPTER_ID = 1;

export default function Reader({ params }: { params: { options?: string[] } }) {
  const options = params.options || [];
  const [bookId, chapterId, tabId, morphologyId] = options;

  /* Variables primarily for text rendering */
  const text = {
    bookId: parseInt(bookId, 10) || DEFAULT_BOOK_ID,
    chapterId: parseInt(chapterId, 10) || DEFAULT_CHAPTER_ID,
  };

  /* Variables for Sidebar */
  const activeMorphologyId = parseInt(morphologyId, 10);
  const activeTabIndex = parseInt(tabId, 10);

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

// import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';

// import { TextContext } from '../../../modules/Text';
import TextRenderer from '../TextRenderer';
import Nav from '../Nav/Nav';
import SettingsMenu from '../Nav/SettingsMenu';
import DetailsMenu from '../Nav/DetailsMenu';

const DEFAULT_BOOK_ID = 1;
const DEFAULT_CHAPTER_ID = 1;

export default function Reader({ params }: { params: { options?: string[] } }) {
  const options = params.options || [];
  const [bookId, chapterId, tabId, morphologyId] = options;

  // const gt600px = useMediaQuery('(min-width:600px)');

  /* Variables primarily for text rendering */
  const activeText = {
    bookId: parseInt(bookId, 10) || DEFAULT_BOOK_ID,
    chapterId: parseInt(chapterId, 10) || DEFAULT_CHAPTER_ID,
  };

  /* Variables for side bar */
  const activeMorphologyId = parseInt(morphologyId, 10);
  const activeTabIndex = parseInt(tabId, 10);

  let tabs = [
    { title: 'Lessons', iconName: 'lessons' },
    { title: 'Dictionary', iconName: 'dictionary' },
  ];

  if (!Number.isNaN(activeMorphologyId)) {
    tabs = [...tabs, { title: 'Details', iconName: 'details' }];
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
      <Nav activeTabIndex={activeTabIndex} />
      {/* Render below in client? */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 'calc(72.5px + env(safe-area-inset-bottom))', sm: 'auto' },
          left: { xs: 'auto', sm: 80 },
          zIndex: 1100,
          maxWidth: { xs: 'auto', sm: 350 },
        }}
      >
        <Slide
          // direction={gt600px ? 'right' : 'up'}
          direction="right"
          in={!Number.isNaN(activeTabIndex)}
          timeout={200}
          mountOnEnter
          unmountOnExit
        >
          <Paper
            sx={{
              bgcolor: 'background.default',
              borderTopLeftRadius: { xs: 24, sm: 0 },
              borderTopRightRadius: { xs: 24, sm: 0 },
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px -2px 8px 0px',
            }}
          >
            {
              activeTabIndex === 2
                ? (
                  <DetailsMenu activeMorphologyId={activeMorphologyId} />
                )
                : (
                  <SettingsMenu
                    title={tabs[activeTabIndex] ? tabs[activeTabIndex].title : ''}
                    activeMorphologyId={activeMorphologyId}
                  />
                )
            }
          </Paper>
        </Slide>
      </Box>
      <TextRenderer activeText={activeText} />
    </Stack>
  );
}

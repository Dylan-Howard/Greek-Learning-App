import './Reader.css';
import { useState, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';

import { TextContext } from '../LanguageData/Text';
import TextRenderer from '../Text/TextRenderer';
import Nav from '../Nav/Nav';
import SettingsMenu from '../Nav/SettingsMenu';
import DetailsMenu from '../Nav/DetailsMenu';

const DEFAULT_BOOK_ID = 1;
const DEFAULT_CHAPTER_ID = 1;

function Reader() {
  /* States primarily for text rendering */
  const [activeText, setActiveText] = useState({
    bookId: DEFAULT_BOOK_ID,
    chapterId: DEFAULT_CHAPTER_ID,
  });
  const gt600px = useMediaQuery('(min-width:600px)');

  /* States for side bar */
  const [activeMorphologyId, setActiveMorphologyId] = useState(-1);
  const [activeTabIndex, setActiveTabIndex] = useState(-1);

  const changeActiveMorphology = (morphologyId: number) => {
    setActiveMorphologyId(morphologyId);
    if (morphologyId === -1) { setActiveTabIndex(0); }
    if (morphologyId !== -1 && activeTabIndex !== 3) { setActiveTabIndex(3); }
  };

  let tabs = [
    { title: 'Lessons', iconName: 'lessons' },
    { title: 'Dictionary', iconName: 'dictionary' },
  ];

  if (activeMorphologyId !== -1) {
    tabs = [...tabs, { title: 'Details', iconName: 'details' }];
  }

  const closeMenu = () => setActiveTabIndex(-1);

  return (
    <TextContext.Provider
      value={useMemo(() => ({ text: activeText, setText: setActiveText }), [activeText])}
    >
      <Stack
        sx={{
          bgcolor: 'background.default',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          height: 'calc(100vh - env(safe-area-inset-bottom))',
          overflow: 'hidden',
        }}
      >
        <Nav activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 72.5, sm: 'auto' },
            left: { xs: 'auto', sm: 80 },
            zIndex: 1100,
            maxWidth: { xs: 'auto', sm: 350 },
          }}
        >
          <Slide
            direction={gt600px ? 'right' : 'up'}
            in={activeTabIndex !== -1}
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
                activeTabIndex === 3
                  ? (
                    <DetailsMenu
                      activeMorphologyId={activeMorphologyId}
                      handleMouseClose={closeMenu}
                      handleTouchClose={closeMenu}
                    />
                  )
                  : (
                    <SettingsMenu
                      title={tabs[activeTabIndex] ? tabs[activeTabIndex].title : ''}
                      activeMorphologyId={activeMorphologyId}
                      handleMouseClose={closeMenu}
                      handleTouchClose={closeMenu}
                    />
                  )
              }
            </Paper>
          </Slide>
        </Box>
        <TextRenderer changeActiveMorphology={changeActiveMorphology} />
      </Stack>
    </TextContext.Provider>
  );
}

export default Reader;

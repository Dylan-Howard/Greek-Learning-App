import './Reader.css';
import { useState, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';

import { TextContext } from '../LanguageData/Text';
import TextRenderer from '../TextRenderer/TextRenderer';
import Nav from '../Nav/Nav';
import SettingsMenu from '../Nav/SettingsMenu';

const DEFAULT_BOOK_ID = 1;
const DEFAULT_CHAPTER_ID = 1;

// const icon = (
//   <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
//     <svg>
//       <Box
//         component="polygon"
//         points="0,100 50,00, 100,100"
//         sx={{
//           fill: (theme) => theme.palette.common.white,
//           stroke: (theme) => theme.palette.divider,
//           strokeWidth: 1,
//         }}
//       />
//     </svg>
//   </Paper>
// );

function Reader() {
  /* States primarily for text rendering */
  const [activeText, setActiveText] = useState({
    bookId: DEFAULT_BOOK_ID,
    chapterId: DEFAULT_CHAPTER_ID,
  });

  /* States for side bar */
  const [activeMorphologyId, setActiveMorphologyId] = useState(-1);
  const [activeTabIndex, setActiveTabIndex] = useState(-1);

  const changeActiveDeclension = (morphologyId: number) => {
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
          height: '100vh',
        }}
      >
        <Nav
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
        <Slide
          direction="up"
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
            <SettingsMenu
              title={tabs[activeTabIndex] ? tabs[activeTabIndex].title : ''}
              activeMorphologyId={activeMorphologyId}
              handleClose={closeMenu}
            />
          </Paper>
        </Slide>
        {activeTabIndex === 10
          ? (
            <SettingsMenu
              title={tabs[activeTabIndex] ? tabs[activeTabIndex].title : ''}
              activeMorphologyId={activeMorphologyId}
              handleClose={closeMenu}
            />
          )
          : ''}
        <TextRenderer
          changeActiveDeclension={changeActiveDeclension}
        />
      </Stack>
    </TextContext.Provider>
  );
}

export default Reader;

'use client';

import {
  MouseEventHandler,
  Suspense,
  TouchEventHandler,
  useState,
} from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';

import { SettingsMenuTabSkeleton } from 'app/modules/Skeletons';
import DetailsMenu from './DetailsMenu';
import SettingsMenu from './SettingsMenu';
import { useReaderContext } from '../ReaderPage/ReaderPageContext';

function MenuHandle({ onTouchClose }: { onTouchClose: TouchEventHandler }) {
  const [swipe, setSwipe] = useState({ start: 0 });
  const swipeCloseDistance = 50;

  const handleTouchStart = (e: any) => {
    setSwipe({ start: e.touches[0].clientY });
  };

  const handleTouchEnd = (e: any) => {
    const swipeDistance = e.changedTouches[0].clientY - swipe.start;
    if (swipeCloseDistance < swipeDistance) {
      onTouchClose(e);
    }
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      onTouchStart={(e: any) => handleTouchStart(e)}
      onTouchEnd={(e: any) => handleTouchEnd(e)}
      sx={{ pt: 2, pb: 2 }}
    >
      <Box
        sx={{
          border: '#333 1px solid',
          borderColor: 'text.primary',
          width: 48,
        }}
      />
    </Stack>
  );
}

function MenuCloseButton({ onClose }: { onClose: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Stack flexDirection="row" justifyContent="end" sx={{ pt: 2, pb: 2 }}>
      <IconButton aria-label="close" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}

export default function Sidebar() {
  const { page, setPage } = useReaderContext();
  const gt600px = useMediaQuery('(min-width:600px)');

  let tabs = [
    { title: 'Lessons', iconName: 'lessons' },
    { title: 'Dictionary', iconName: 'dictionary' },
  ];
  tabs = !Number.isNaN(page?.morphologyId) ? [...tabs, { title: 'Details', iconName: 'details' }] : tabs;
  const title = page?.tabId !== undefined && tabs[page.tabId - 1] ? tabs[page.tabId - 1].title : '';

  const handleClose = () => setPage({ ...page, tabId: 0, morphologyId: 0 });

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 'calc(72.5px + env(safe-area-inset-bottom))', sm: 'auto' },
        left: { xs: 'auto', sm: 80 },
        zIndex: 1100,
        maxWidth: { xs: 'none', sm: 350 },
      }}
    >
      <Slide
        direction={gt600px ? 'right' : 'up'}
        in={page?.tabId !== 0}
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
          <Container sx={{
            bgcolor: 'background.tertiary',
            height: gt600px ? '100vh' : 100,
            pr: { xs: 4, sm: 2 },
            pl: { xs: 4, sm: 2 },
            borderTopLeftRadius: { xs: 24, sm: 0 },
            borderTopRightRadius: { xs: 24, sm: 0 },
            width: { xs: '100vw', sm: 'auto' },
          }}
          >
            {
              gt600px
                ? <MenuCloseButton onClose={() => handleClose()} />
                : <MenuHandle onTouchClose={() => handleClose()} />
            }
            {/* <Suspense fallback={<SettingsMenuTabSkeleton />}> */}
            {
                page?.tabId === 3
                  ? <DetailsMenu />
                  : <SettingsMenu title={title} />
              }
            {/* </Suspense> */}
          </Container>
        </Paper>
      </Slide>
    </Box>
  );
}

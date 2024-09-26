'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';

import * as AzureUserService from '../../services/AzureUserService';

import DetailsMenu from './DetailsMenu';
import SettingsMenu from './SettingsMenu';

export default function Sidebar(
  { tabId, morphologyId } : { tabId: number | undefined, morphologyId: number | undefined },
) {
  const gt600px = useMediaQuery('(min-width:600px)');

  let tabs = [
    { title: 'Lessons', iconName: 'lessons' },
    { title: 'Dictionary', iconName: 'dictionary' },
  ];
  tabs = !Number.isNaN(morphologyId) ? [...tabs, { title: 'Details', iconName: 'details' }] : tabs;
  const title = tabId !== undefined && tabs[tabId] ? tabs[tabId].title : '';

  return (
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
        direction={gt600px ? 'right' : 'up'}
        in={tabId !== undefined && !Number.isNaN(tabId)}
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
            tabId === 2
              ? <DetailsMenu activeMorphologyId={morphologyId} />
              : <SettingsMenu title={title} activeMorphologyId={morphologyId} />
          }
        </Paper>
      </Slide>
    </Box>
  );
}

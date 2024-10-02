'use client';

import React from 'react';
import { useAuth } from '@clerk/nextjs';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import AbcIcon from '@mui/icons-material/Abc';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';

import { useReaderContext } from '../ReaderPage/ReaderPageContext';

export default function Nav() {
  const { page, setPage } = useReaderContext();
  const { isLoaded, userId } = useAuth();

  const handleChange = (_e: any, newTab: number) => {
    if (newTab === 4) {
      return;
    }
    setPage({ ...page, tabId: newTab });
  };

  return (
    <BottomNavigation
      showLabels
      value={page?.tabId}
      onChange={(e, newValue) => handleChange(e, newValue)}
      sx={{
        flexDirection: { xs: 'row', sm: 'column' },
        height: { xs: 'auto', sm: '100vh' },
        maxHeight: { xs: 600, sm: 300 },
        mt: { xs: 0, sm: 4 },
        bgcolor: 'background.secondary',
      }}
    >
      {
        isLoaded && userId
          ? (
            <BottomNavigationAction
              value={1}
              label="Lessons"
              icon={<LibraryBooksIcon />}
            />
          )
          : ''
      }
      {
        isLoaded && userId
          ? (
            <BottomNavigationAction
              value={2}
              label="Vocab"
              icon={<AbcIcon />}
            />
          )
          : ''
      }
      {
        page && page.morphologyId
          ? (
            <BottomNavigationAction
              value={3}
              label="Details"
              icon={<LibraryBooksIcon />}
            />
          )
          : ''
      }
      {
        isLoaded && userId
          ? (
            <BottomNavigationAction
              value={4}
              label="Profile"
              icon={<PersonIcon />}
              href="/profile"
            />
          )
          : ''
      }
      {
        isLoaded && !userId
          ? (
            <BottomNavigationAction
              value={4}
              label="Sign in"
              icon={<PersonIcon />}
              href="/welcome"
            />
          )
          : ''
      }
    </BottomNavigation>
  );
}

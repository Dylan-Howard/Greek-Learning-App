'use client';

import { ReactNode } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import { useReaderContext } from '../ReaderPage/ReaderPageContext';

export default function Nav({ children }: { children: ReactNode }) {
  const { page, setPage } = useReaderContext();

  const handleChange = (_e: any, newTab: number) => {
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
      {children}
    </BottomNavigation>
  );
}

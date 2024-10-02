'use client';

import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { useReaderContext } from './ReaderPageContext';

export default function ReaderTextUnit(
  { children, morphologyId } : { children: ReactNode, morphologyId: number },
) {
  const { page, setPage } = useReaderContext();
  const handleClick = () => setPage({ ...page, tabId: 3, morphologyId });

  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={() => handleClick()}
      sx={{ display: 'inline-block' }}
    >
      {children}
    </Box>
  );
}

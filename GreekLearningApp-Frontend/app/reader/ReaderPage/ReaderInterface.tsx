'use client';

import { ReactNode, useMemo, useState } from 'react';
import { ReaderContext } from './ReaderPageContext';

export default function ReaderInterface(
  { children, bookId, chapterId } : { children: ReactNode, bookId: number, chapterId: number },
) {
  const [page, setPage] = useState({
    bookId,
    chapterId,
    tabId: 0,
    morphologyId: 0,
  });

  return (
    <ReaderContext.Provider value={useMemo(() => ({ page, setPage }), [page])}>
      {children}
    </ReaderContext.Provider>
  );
}

import { createContext, useContext } from 'react';

type ReaderPage = {
  bookId: number,
  chapterId: number,
  tabId: number,
  morphologyId: number,
};

export const ReaderContext = createContext<{ page: ReaderPage | undefined, setPage: Function }>({
  page: undefined,
  setPage: () => {},
});

export function useReaderContext() {
  const context = useContext(ReaderContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be within TodoProvider');
  }

  return context;
}

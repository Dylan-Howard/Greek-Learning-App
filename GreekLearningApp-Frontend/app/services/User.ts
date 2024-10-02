/**
 * User class
 */
import { createContext, useContext } from 'react';

export type UserProgress = {
  lessons: {
    lessonId: number,
    isComplete: boolean,
  }[],
  vocabulary: {
    wordId: number,
    isComplete: boolean,
  }[],
};

export interface UserSettings {
  prefersDarkMode: boolean,
  translation: string,
}

export type User = {
  id: string,
  name: string,
  progress: UserProgress,
  settings: UserSettings,
};

export const UserContext = createContext<{ user: User | undefined, setUser: Function }>({
  user: undefined,
  setUser: () => {},
});

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be within TodoProvider');
  }

  return context;
}

/**
 * User class
 */
import { createContext, useContext } from 'react';

export type UserProgress = {
  lessons: {
    id: number,
    isComplete: boolean,
  }[] | undefined,
  vocabulary: {
    id: number,
    isComplete: boolean,
  }[] | undefined,
};

export interface UserSettings {
  isOnboarded: string,
  theme: string,
  translation: string,
  [key: string]: string | undefined,
}

export type User = {
  id: number,
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

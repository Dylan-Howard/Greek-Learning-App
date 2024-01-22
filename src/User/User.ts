/**
 * User class
 */
import { createContext, useContext } from 'react';
import userData from '../data/userData.json';

type UserProgress = {
  lessons: {
    id: number,
    isComplete: boolean,
  }[] | undefined,
  vocabulary: {
    id: number,
    isComplete: boolean,
  }[] | undefined,
};

// type UserSettings = {
//   alwaysShowFullDetails: boolean,
//   prefersDarkMode: boolean,
// };

interface UserSettings {
  alwaysShowFullDetails: boolean,
  prefersDarkMode: boolean,
  [key: string]: any,
}

type User = {
  progress: UserProgress,
  settings: UserSettings,
};

function fetchUserProgressData(userId: string, progressArea: string):
{ id: number, isComplete: boolean }[] | undefined {
  const userProgress = userData.users.find(({ id }: { id: string }) => id === userId)?.progress;

  if (!userProgress) {
    return undefined;
  }
  if (progressArea === 'lessons') {
    return userProgress[progressArea];
  }
  if (progressArea === 'vocabulary') {
    return userProgress[progressArea];
  }
  return undefined;
}

function fetchUserSettings(userId: string): UserSettings | undefined {
  return userData.users.find(({ id }: { id: string }) => id === userId)?.settings;
}

const fetchUser = (userId: string) : User => {
  const progress: UserProgress = {
    lessons: fetchUserProgressData(userId, 'lessons'),
    vocabulary: fetchUserProgressData(userId, 'vocabulary'),
  };
  const settings: UserSettings = fetchUserSettings(userId) || {
    alwaysShowFullDetails: false,
    prefersDarkMode: true,
  };
  return { progress, settings };
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

export default fetchUser;

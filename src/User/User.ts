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

type User = {
  progress: UserProgress,
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

const fetchUser = (userId: string) : User => {
  const progress: UserProgress = {
    lessons: fetchUserProgressData(userId, 'lessons'),
    vocabulary: fetchUserProgressData(userId, 'vocabulary'),
  };
  return { progress };
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

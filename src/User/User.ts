/**
 * User class
 */
// import LanguageData from '../LanguageData/LanguageData';
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

class User {
  progress: UserProgress;

  constructor(userId: string) {
    this.progress = {
      lessons: fetchUserProgressData(userId, 'lessons'),
      vocabulary: fetchUserProgressData(userId, 'vocabulary'),
    };
  }
}

export const UserContext = createContext<User | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be within TodoProvider');
  }

  return context;
}

export default User;

import { Declension } from '../LanguageData/Text';
import { User, UserSettings, UserProgress } from './User';
import userData from '../data/userData.json';

// eslint-disable-next-line import/prefer-default-export
export const doesUserRecognize = (declension: Declension, user: User) => {
  if (!user || !user.progress.lessons || !user.progress.vocabulary) { return 'unrecognizable'; }
  const { lessons, vocabulary } = user.progress;

  if (!declension) { return 'unrecognizable'; }
  const {
    caseId,
    degreeId,
    numberId,
    genderId,
    tenseId,
    voiceId,
    moodId,
    personId,
    patternId,
    wordId,
  } = declension;

  const progressCheck = [
    caseId ? lessons.find(({ id }) => id === caseId)?.isComplete : true,
    degreeId ? lessons.find(({ id }) => id === degreeId)?.isComplete : true,
    numberId ? lessons.find(({ id }) => id === numberId)?.isComplete : true,
    genderId ? lessons.find(({ id }) => id === genderId)?.isComplete : true,
    tenseId ? lessons.find(({ id }) => id === tenseId)?.isComplete : true,
    voiceId ? lessons.find(({ id }) => id === voiceId)?.isComplete : true,
    moodId ? lessons.find(({ id }) => id === moodId)?.isComplete : true,
    personId ? lessons.find(({ id }) => id === personId)?.isComplete : true,
    patternId ? lessons.find(({ id }) => id === patternId)?.isComplete : true,
    wordId ? vocabulary.find(({ id }) => id === wordId)?.isComplete : true,
  ];

  if (progressCheck.some((prg) => !prg)) {
    return progressCheck[7] ? 'needsHelps' : 'unrecognizable';
  }

  return 'recognizable';
};

export function getUserSettingById(userId: number, settingId: number) {
  return userId === settingId;
}

function fetchUserProgressData(userId: number, progressArea: string) :
{ id: number, isComplete: boolean }[] | undefined {
  if (userId in userData.users) {
    // @ts-ignore
    const { progress } = userData.users[`${userId}`];

    if (progressArea === 'lessons') {
      return progress[progressArea];
    }
    if (progressArea === 'vocabulary') {
      return progress[progressArea];
    }
  }

  return undefined;
}

function fetchUserSettings(userId: number): UserSettings | undefined {
  if (userId in userData.users) {
    // @ts-ignore
    return userData.users[`${userId}`].settings;
  }

  return undefined;
}

export const fetchUser = (userId: number) : User => {
  const progress: UserProgress = {
    lessons: fetchUserProgressData(userId, 'lessons'),
    vocabulary: fetchUserProgressData(userId, 'vocabulary'),
  };
  const settings: UserSettings = fetchUserSettings(userId) || {
    alwaysShowFullDetails: false,
    prefersDarkMode: true,
  };
  return { id: userId, progress, settings };
};

export const getLocalUser = () => {
  const localUser = localStorage.getItem('koineUser');
  return localUser ? JSON.parse(localUser) : undefined;
};

export const saveLocalUser = (toSaveUser: User) => {
  // console.log('Saving: ');
  // console.log(userData);
  // localStorage.setItem('koineUser', userData);
  localStorage.setItem('koineUser', JSON.stringify(toSaveUser));
};

export const clearLocalUser = () => {
  console.log('Clearing');
  localStorage.clear();
};

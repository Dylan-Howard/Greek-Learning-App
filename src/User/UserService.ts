import { Declension } from '../LanguageData/Text';
import { User, UserSettings, UserProgress } from './User';
import userData from '../data/userData.json';
// import { fetchLessonByFormId } from '../LanguageData/LanguageData';

export const getLocalUser = () : User | undefined => {
  const localUser = localStorage.getItem('koineUser');
  return localUser ? JSON.parse(localUser) : undefined;
};

export const saveLocalUser = (toSaveUser: User) => {
  localStorage.setItem('koineUser', JSON.stringify(toSaveUser));
};

export const clearLocalUser = () => {
  localStorage.removeItem('koineUser');
};

export const doesUserRecognize = (declension: Declension, user: User) => {
  if (!user || !user.progress.lessons || !user.progress.vocabulary) { return 'unrecognizable'; }
  // const { lessons, vocabulary } = user.progress;

  if (!declension) { return 'unrecognizable'; }
  // const {
  //   posId,
  //   caseId,
  //   degreeId,
  //   numberId,
  //   genderId,
  //   tenseId,
  //   voiceId,
  //   moodId,
  //   personId,
  //   patternId,
  //   wordId,
  // } = declension;

  // const lessonIds = {
  //   pos: posId ? fetchLessonByFormId(posId).lessonId : undefined,
  //   case: caseId ? AzureTextService.fetchLessonByForm(caseId).lessonId : undefined,
  //   degree: degreeId ? AzureTextService.fetchLessonByForm(degreeId).lessonId : undefined,
  //   number: numberId ? AzureTextService.fetchLessonByForm(numberId).lessonId : undefined,
  //   gender: genderId ? AzureTextService.fetchLessonByForm(genderId).lessonId : undefined,
  //   tense: tenseId ? AzureTextService.fetchLessonByForm(tenseId).lessonId : undefined,
  //   voice: voiceId ? AzureTextService.fetchLessonByForm(voiceId).lessonId : undefined,
  //   mood: moodId ? AzureTextService.fetchLessonByForm(moodId).lessonId : undefined,
  //   person: personId ? AzureTextService.fetchLessonByForm(personId).lessonId : undefined,
  //   pattern: patternId ? AzureTextService.fetchLessonByForm(patternId).lessonId : undefined,
  // };

  // const progressCheck = {
  //   case: lessonIds.case
  //     ? lessons.find(({ id }) => id === lessonIds.case)?.isComplete : true,
  //   degree: lessonIds.degree
  //     ? lessons.find(({ id }) => id === lessonIds.degree)?.isComplete : true,
  //   number: lessonIds.number
  //     ? lessons.find(({ id }) => id === lessonIds.number)?.isComplete : true,
  //   gender: lessonIds.gender
  //     ? lessons.find(({ id }) => id === lessonIds.gender)?.isComplete : true,
  //   tense: lessonIds.tense
  //     ? lessons.find(({ id }) => id === lessonIds.tense)?.isComplete : true,
  //   voice: lessonIds.voice
  //     ? lessons.find(({ id }) => id === lessonIds.voice)?.isComplete : true,
  //   mood: lessonIds.mood
  //     ? lessons.find(({ id }) => id === lessonIds.mood)?.isComplete : true,
  //   person: lessonIds.person
  //     ? lessons.find(({ id }) => id === lessonIds.person)?.isComplete : true,
  //   pattern: lessonIds.pattern
  //     ? lessons.find(({ id }) => id === lessonIds.pattern)?.isComplete : true,
  //   word: wordId ? vocabulary.find((vcb) => vcb.id === wordId)?.isComplete : true,
  // };

  // if (Object.values(progressCheck).some((prg) => !prg)) {
  //   return Object.values(progressCheck)[7] ? 'needsHelps' : 'unrecognizable';
  // }

  return 'recognizable';
};

export function getUserSettingById(userId: number, settingId: number) {
  return userId === settingId;
}

function fetchUserProgressData(progressArea: string) :
{ id: number, isComplete: boolean }[] | undefined {
  const user = getLocalUser();
  if (user) {
    const { progress } = user;

    if (progressArea === 'lessons') {
      return progress[progressArea];
    }
    if (progressArea === 'vocabulary') {
      return progress[progressArea];
    }
  }

  return undefined;
}

function fetchUserSettings(): UserSettings | undefined {
  const user = getLocalUser();
  if (user) {
    return user.settings;
  }

  return undefined;
}

export const fetchUser = (userId: string) : User => {
  const progress: UserProgress = {
    lessons: fetchUserProgressData('lessons'),
    vocabulary: fetchUserProgressData('vocabulary'),
  };
  const settings: UserSettings = fetchUserSettings() || {
    prefersDarkMode: false,
    translation: 'esv',
  };
  return { id: userId, progress, settings };
};

export const fetchUserTemplate = (userTemplateId: number) : User => (
  // @ts-ignore
  userData.users[`${userTemplateId}`]
);

export const createUser = () => ({
  id: 4,
  progress: {
    lessons: [],
    vocabulary: [],
  },
  settings: {
    isOnboarded: 'false',
    theme: 'light',
    translation: 'esv',
  },
});

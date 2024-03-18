import { Declension } from '../typescript/Text';
import { User } from '../User/User';

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

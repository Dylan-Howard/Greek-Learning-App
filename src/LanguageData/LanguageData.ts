import lessons from '../data/lessons.json';
import vocabulary from '../data/vocabulary.json';
import morphology from '../data/declensions.json';
import texts from '../data/texts.json';
import { Word } from '../Common/Word';
import { Lesson } from '../Common/Lesson';

/* Assumes that morphIds is a sorted array of morphIds */
/* Assumes that all ids in morphIds exist */
const fetchVocabIdsByMorphIds = (morphIds: string[]) => {
  if (!morphIds.length) {
    return [];
  }

  const vocabIds = [];
  let currentId = morphIds.shift();

  for (let i = 0; i < morphology.length; i += 1) {
    if (currentId === morphology[i].morphId) {
      vocabIds.push(morphology[i].vocabId);
      currentId = morphIds.shift();
    }
  }

  return [...new Set(vocabIds)];
};

export const fetchMorphology = (lng: string) => {
  if (vocabulary && lng === 'gk') {
    return morphology;
  }
  return [];
};

export const fetchLessons = (lng: string): Lesson[] => {
  if (lessons && lng === 'gk') {
    return lessons.gk;
  }
  return [];
};

export const fetchVocabularyByChapter = (
  lng: string,
  textId: number,
  chapterId: string,
): Word[] => {
  if (!vocabulary || lng !== 'gk') {
    return [];
  }

  const activeChapters = texts.texts[textId].chapters;

  if (!(chapterId in activeChapters)) {
    return vocabulary.gk;
  }

  // @ts-ignore
  const activeVerses = activeChapters[chapterId].verses;

  /* Pull all vocabulary in the active chapter's units */
  /* Tracks appendedIds to ensure morphIds contains only unique ids */
  const appendedIds = new Map<string, boolean>();
  appendedIds.set('0', true);
  appendedIds.set('', true);

  const activeMorphIds = [];

  for (let i = 1; i <= Object.values(activeVerses).length; i += 1) {
    const verse = activeVerses[i];
    for (let j = 0; j < verse.units.length; j += 1) {
      if (!appendedIds.has(verse.units[j].morphologyId)) {
        activeMorphIds.push(verse.units[j].morphologyId);
        appendedIds.set(verse.units[j].morphologyId, true);
      }
    }
  }

  /* Sort the active vocabulary by morphID */
  activeMorphIds.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  /* Get vocabIDs by morphID */
  const vocabIds = fetchVocabIdsByMorphIds(activeMorphIds);
  vocabIds.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  const activeVocabulary = [];
  let currentId = vocabIds.shift();

  for (let i = 0; i < vocabulary.gk.length; i += 1) {
    if (currentId === vocabulary.gk[i].wordId) {
      activeVocabulary.push(vocabulary.gk[i]);
      currentId = vocabIds.shift();
    }
  }

  activeVocabulary.sort();

  return activeVocabulary;
};

export const fetchVocabulary = (lng: string): Word[] => {
  if (vocabulary && lng === 'gk') {
    return vocabulary.gk;
  }
  return [];
};

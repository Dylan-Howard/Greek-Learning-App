import lessons from '../data/lessons.json';
import vocabulary from '../data/vocabulary.json';
import { Word } from '../Common/Word';
import { Lesson } from '../Common/Lesson';

export const fetchLessons = (lng: string): Lesson[] => {
  if (lessons && lng === 'gk') {
    return lessons.gk;
  }
  return [];
};

export const fetchVocabulary = (lng: string): Word[] => {
  if (vocabulary && lng === 'gk') {
    return vocabulary.gk;
  }
  return [];
};

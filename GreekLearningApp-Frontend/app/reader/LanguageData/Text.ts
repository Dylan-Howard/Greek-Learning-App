import { createContext, useContext } from 'react';
// import * as TextService from './LanguageData';

/**
 * Types used for Text Rendering
 */
type MorphologicalForm = {
  grammarId: number;
  name: string;
  abreviation: string;
  lessonId: number;
};

export type Declension = {
  content: string;
  morphologyId: number;
  posId: number;
  caseId?: number;
  tenseId?: number;
  voiceId?: number;
  moodId?: number;
  personId?: number;
  numberId?: number;
  genderId?: number;
  patternId?: number;
  degreeId?: number;
  wordId: number;
};

export type DeclensionDetails = {
  content: string;
  pos: MorphologicalForm;
  tense: MorphologicalForm | undefined | null;
  voice: MorphologicalForm | undefined | null;
  mood: MorphologicalForm | undefined | null;
  person: MorphologicalForm | undefined | null;
  number: MorphologicalForm | undefined | null;
  gender: MorphologicalForm | undefined | null;
  case: MorphologicalForm | undefined | null;
  degree: MorphologicalForm | undefined | null;
  pattern: MorphologicalForm | undefined | null;
  root: { name: string } | undefined;
  gloss: { name: string } | undefined;
};

type FormKey = keyof Form;

type LessonKey = keyof Lesson;

type Lesson = {
  lessonId: LessonKey,
  grammerId: FormKey,
  title: string,
  tag: string,
};

export type Form = {
  grammarId: number;
  name: string;
  abreviation: string;
  lessonId: number;
};

export type Vocab = {
  wordId: number;
  content: string;
  gloss: string;
  occurances: number;
  gkRef: string;
};

export type Unit = {
  unitId: number;
  content: string;
  morphologyId: number;
  en?: string;
  verseId: number;
};

export type Unitv2 = {
  unitId: number;
  content: string;
  helpText: string;
  morphologyId: number;
  verseNumber: number;
};

export type Verse = {
  verseId: number;
  verseNumber: number;
  chapterId: number;
  unitIndicies: {
    start: number;
    end: number;
  };
};

export type Chapter = {
  chapterId: number;
  chapterNumber: number;
  title: string;
  bookId: number;
  verseIndicies: {
    start: number;
    end: number;
  };
};

export type Book = {
  bookId: number;
  bookNumber: number;
  title: string;
  chapterIndicies: {
    start: number;
    end: number;
  };
};

type Text = {
  bookId: number;
  chapterId: number;
};

/* Should be a unique combination of unitId and langauge */
export type Translation = {
  unitId: number;
  content: string;
  language: string;
};

/**
 * Functions used for Text Context
 */
const DEFAULT_BOOK_ID = 0;
const DEFAULT_CHAPTER_ID = 0;

export const TextContext = createContext<{ text: Text, setText: Function }>({
  text: {
    bookId: DEFAULT_BOOK_ID,
    chapterId: DEFAULT_CHAPTER_ID,
  },
  setText: () => {},
});

export function useTextContext() {
  const context = useContext(TextContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be within TodoProvider');
  }

  return context;
}

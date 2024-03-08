/**
 * Types used for Text Rendering
 */

export type Unit = {
  unitId: string,
  content: string;
  morphologyId: string,
  en: string,
};

export interface Verse {
  [key: string]: Unit[] | string | null;
  verseNumber: string;
  content: string;
  units: Unit[] | null;
}

type VerseCollection = {
  [key: string]: Verse | undefined;
};

export interface Chapter {
  [key: string]: VerseCollection | string;
  chapterNumber: string;
  verses: VerseCollection;
}

type ChapterCollection = {
  [key: string]: Chapter | undefined;
};

export interface Text {
  [key: string]: ChapterCollection | string;
  title: string;
  label: string;
  chapters: ChapterCollection;
}

export type Vocab = {
  wordId: number;
  content: string;
  gloss: string;
  occurances: string | number;
};

type MorphologicalForm = {
  grammarId: number;
  name: string;
  abreviation: string;
  lessonId: number;
};

export type Declension = {
  morphId: string;
  tenseId?: string;
  voiceId?: string;
  moodId?: string;
  personId?: string;
  countId?: string;
  genderId?: string;
  patternId?: string;
  vocabId: string;
};

export type DeclensionDetails = {
  type: {
    name: string;
  } | undefined,
  tense: MorphologicalForm | undefined | null,
  voice: MorphologicalForm | undefined | null,
  mood: MorphologicalForm | undefined | null,
  person: MorphologicalForm | undefined | null,
  count: MorphologicalForm | undefined | null,
  gender: MorphologicalForm | undefined | null,
  pattern: MorphologicalForm | undefined | null,
  root: {
    name: string
  } | undefined,
  gloss: {
    name: string
  } | undefined,
};

type FormKey = keyof Form;

type Form = {
  formId: FormKey;
  name: string;
  abreviation: string;
  lessonId: LessonKey;
};

type LessonKey = keyof Lesson;

type Lesson = {
  lessonId: LessonKey,
  grammerId: FormKey,
  title: string,
  tag: string,
};

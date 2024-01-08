export type Unit = {
  unitId: number,
  content: string;
  declensionId?: number,
  en?: string,
};

export type Verse = {
  verseNumber: number;
  content: string;
  units: Unit[] | null;
};

export type Chapter = {
  chapterNumber: number;
  verses: Verse[];
};

export type Text = {
  title: string;
  chapters: Chapter[];
};

export type Vocab = {
  wordId: number;
  content: string;
  gloss: string;
  occurances: string | number;
};

// type DeclensionKey = keyof Declension;

export type Declension = {
  tenseId?: number;
  voiceId?: number;
  moodId?: number;
  personId?: number;
  countId?: number;
  genderId?: number;
  patternId?: number;
  vocabId: number;
};

export type DeclensionDetails = {
  type: {
    name: string
  } | undefined,
  tense: {
    name: string
  } | undefined,
  voice: {
    name: string
  } | undefined,
  mood: {
    name: string
  } | undefined,
  person: {
    name: string
  } | undefined,
  count: {
    name: string
  } | undefined,
  gender: {
    name: string
  } | undefined,
  pattern: {
    name: string
  } | undefined,
  root: {
    name: string
  } | undefined,
  gloss: {
    name: string
  } | undefined,
};

type FormKey = keyof Form;

type Form = {
  formId: FormKey,
  name: string,
  short: string,
  lessonId: LessonKey
};

type LessonKey = keyof Lesson;

type Lesson = {
  lessonId: LessonKey,
  grammerId: FormKey,
  title: string,
  tag: string,
};

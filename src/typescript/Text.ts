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
    name: string;
  } | undefined,
  tense: {
    name: string;
    short: string;
    lessonId: number;
  } | undefined,
  voice: {
    name: string;
    short: string;
    lessonId: number;
  } | undefined,
  mood: {
    name: string;
    short: string;
    lessonId: number;
  } | undefined,
  person: {
    name: string;
    short: string;
    lessonId: number;
  } | undefined,
  count: {
    name: string;
    short: string;
    lessonId: number;
  } | undefined,
  gender: {
    name: string;
    short: string;
    lessonId: number;
  } | undefined,
  pattern: {
    name: string;
    short: string;
    lessonId: number;
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

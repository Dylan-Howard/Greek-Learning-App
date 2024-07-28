/**
 * Defines Row of Data
 */
export type CsvData = string[][];

export type Row = {
  index: number;
  uniqueIdentifier: string;
  values: string[];
};

export type DataFile = {
  fileName: string;
  headers: string[];
  rows: Row[];
};

export type ComparisonResult = {
  isSame: boolean;
  reason?: string;
  uniqueIdentifier?: string,
  variantIndex?: number,
  controlValue?: string,
  variantValue?: string,
};

export type TextItem = {
  bookId: string;
  chapterNumber: string;
  verseNumber: string;
  unitId: string;
  content: string,
  morphology: string,
  en?: string | undefined,
  vocab: string,
};

export type FeaturesItem = {
  bookId: string;
  chapterNumber: string;
  verseNumber: string;
  unitId: string;
  pos: string;
  gender: string | undefined;
  case: string | undefined;
  number: string | undefined;
  voice: string | undefined;
  mood: string | undefined;
  tense: string | undefined;
  person: string | undefined;
  degree: string | undefined;
};

export type VocabularyItem = {
  gk: number;
  strongs: string[];
  lemma: string;
  ntFrequency: number;
  definition: string;
};

export type TranslationItem = {
  bookId: number;
  chapterId: number;
  verseId: number;
  unitId: number;
  content: string;
  esv: string;
  csb: string;
};

export type Word = {
  bookId: string;
  chapterNumber: string;
  verseNumber: string;
  unitId: string;
  content: string;
  morphologyId: string;
  en: string;
  vocab?: string;
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
  unitId: string;
  content: string;
  morphologyId: string;
  en?: string;
  verseId: string;
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

/* Should be a unique combination of unitId and langauge */
export type Translation = {
  unitId: number;
  content: string;
  language: string;
};

export default Row;

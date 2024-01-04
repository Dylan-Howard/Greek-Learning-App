export type Unit = {
  unitId: number,
  content?: string;
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

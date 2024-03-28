export type Word = {
  wordId: number;
  content: string;
  gloss: string;
  occurance?: number;
  gkRef?: string;
};

export type Wordv2 = {
  rootId: number;
  content: string;
  gloss: string;
  occurance?: number;
  gkRef?: string;
};

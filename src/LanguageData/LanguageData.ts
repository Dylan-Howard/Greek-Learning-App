import lessons from '../data/lessons.json';
import vocabulary from '../data/vocabulary.json';
import morphology from '../data/morphology.json';
import forms from '../data/grammaticalForms.json';
import units from '../data/units.json';
import verses from '../data/verses.json';
import chapters from '../data/chapters.json';
import books from '../data/books.json';
import { Word } from '../Common/Word';
import { Lesson } from '../Common/Lesson';
import {
  Book, Declension, DeclensionDetails, Unit,
} from '../typescript/Text';

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

export const fetchVocabulary = (lng: string): Word[] => {
  if (vocabulary && lng === 'gk') {
    return Object.values(vocabulary.gk);
  }
  return [];
};

function fetchVocabularyById(wordId: number): Word {
  // @ts-ignore
  return vocabulary.gk[wordId];
}

// @ts-ignore
export const fetchBookById = (bookId: number) : Book => books[`${bookId}`];

// @ts-ignore
export const fetchChapterById = (chapterId: number) : Chapter => chapters[`${chapterId}`];

// @ts-ignore
export const fetchVerseById = (verseId: number) : Verse => verses[`${verseId}`];

// @ts-ignore
export const fetchUnitById = (unitId: number) : Unit => units[`${unitId}`];

export const fetchUnitsByVerseId = (verseId: number) : Unit[] => {
  const verse = fetchVerseById(verseId);
  const { start, end } : { start: number, end: number } = verse.unitIndicies;

  const unitSet = [];
  for (let i = start; i <= end; i += 1) {
    // @ts-ignore
    unitSet.push(units[`${i}`]);
  }

  return unitSet;
};

export const fetchUnitsByChapterId = (chapterId: number) : Unit[] => {
  const chapter = fetchChapterById(chapterId);
  const { start, end } : { start: number, end: number } = chapter.verseIndicies;

  const unitSet = [];
  for (let i = start; i <= end; i += 1) {
    unitSet.push(...fetchUnitsByVerseId(i));
  }

  return unitSet;
};

export const fetchBookSelectionOptions = () : { id: number, label: string }[] => {
  const booksValues = Object.values(books);

  return booksValues.map((book: Book) => ({
    id: book.bookId,
    label: book.title,
  }));
};

export const fetchChapterSelectionOptionsByBookId = (bookId: number) => {
  const book = fetchBookById(bookId);

  const chapterNumbers = [];
  const { start, end } : { start: number, end: number } = book.chapterIndicies;

  for (let i = start; i <= end; i += 1) {
    const chapter = fetchChapterById(i);
    chapterNumbers.push({
      id: chapter.chapterId,
      label: chapter.chapterNumber,
    });
  }

  return chapterNumbers;
};

export const fetchMorphologyById = (morphologyId: number) : Declension => (
  // @ts-ignore
  morphology[`${morphologyId}`]
);

export const fetchMorphologyByUnitId = (unitId: number) : Declension => {
  const unit = fetchUnitById(unitId);

  // @ts-ignore
  return morphology[unit.morphologyId];
};

function fetchFormById(formId: number) {
  // @ts-ignore
  return forms[`${formId}`];
}

export const fetchMorphologyDetailsByMorphologyId = (morphologyId: number) : DeclensionDetails => {
  const {
    content,
    posId,
    tenseId,
    voiceId,
    moodId,
    personId,
    numberId,
    genderId,
    patternId,
    degreeId,
    caseId,
    wordId,
  } : {
    content: string,
    posId: number,
    tenseId?: number,
    voiceId?: number,
    moodId?: number,
    personId?: number,
    numberId?: number,
    genderId?: number,
    patternId?: number,
    degreeId?: number,
    caseId?: number,
    wordId: number,
  } = fetchMorphologyById(morphologyId);

  const vocab = fetchVocabularyById(wordId);

  return ({
    content,
    pos: fetchFormById(posId),
    tense: tenseId ? fetchFormById(tenseId) : undefined,
    voice: voiceId ? fetchFormById(voiceId) : undefined,
    mood: moodId ? fetchFormById(moodId) : undefined,
    person: personId ? fetchFormById(personId) : undefined,
    number: numberId ? fetchFormById(numberId) : undefined,
    gender: genderId ? fetchFormById(genderId) : undefined,
    pattern: patternId ? fetchFormById(patternId) : undefined,
    degree: degreeId ? fetchFormById(degreeId) : undefined,
    case: caseId ? fetchFormById(caseId) : undefined,
    root: {
      name: vocab ? vocab.content : 'Not yet defined',
    },
    gloss: {
      name: vocab ? vocab.gloss : 'Not yet defined',
    },
  });
};

export const stringifyShorthandDetails = (details: DeclensionDetails | undefined) => {
  if (!details) { return ''; }
  const {
    root, tense, voice, mood, person, number, gender, pattern,
  } = details;
  const shorthand = [];
  if (root) { shorthand.push(`${root}: `); }
  /* Verb Details */
  if (tense) { shorthand.push(`${tense.abreviation}`); }
  if (voice) { shorthand.push(`${voice.abreviation}`); }
  if (mood) { shorthand.push(`${mood.abreviation}`); }
  if (person) { shorthand.push(`${person.abreviation}`); }
  if (tense && person) { shorthand.push(']'); }
  /* Noun Details */
  if (number) { shorthand.push(`${number.abreviation}`); }
  if (gender) { shorthand.push(`${gender.abreviation}`); }
  if (pattern) { shorthand.push(`${pattern.abreviation}`); }

  return `[${shorthand.join('')}]`;
};

export const fetchVocabularyByChapterId = (chapterId: number): Word[] => {
  const { verseIndicies } = fetchChapterById(chapterId);
  // const activeVerses = activeChapters[chapterId].verses;

  const vocabularyList = [];

  /* Pull all vocabulary in the active chapter's units */
  /* Tracks appendedIds to ensure morphIds contains only unique ids */
  const appendedIds = new Map<number, boolean>();
  appendedIds.set(0, true);
  // appendedIds.set('', true);

  for (let i = verseIndicies.start; i <= verseIndicies.end; i += 1) {
    const { unitIndicies } = fetchVerseById(i);

    for (let j = unitIndicies.start; j <= unitIndicies.end; j += 1) {
      const { wordId } = fetchMorphologyByUnitId(j);

      if (!appendedIds.has(wordId)) {
        const vocab = fetchVocabularyById(wordId);
        vocabularyList.push(vocab);
        appendedIds.set(wordId, true);
      }
    }
  }

  return vocabularyList;
};

export function fetchMaxChapterId() {
  const { length } = Object.values(chapters);
  return length - 1;
}

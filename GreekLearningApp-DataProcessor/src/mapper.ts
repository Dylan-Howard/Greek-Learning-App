import {
  Book,
  Chapter,
  DataFile,
  FeaturesItem,
  Form,
  TextItem,
  TranslationItem,
  Verse,
  Vocab,
  VocabularyItem,
} from './types/types';

import grammaticalForms from './grammaticalForms';
// const featureLabelMap = {
//   bookId: 'bookId',
//   chapterNumber: 'chapterNumber',
//   verseNumber: 'verseNumber',
//   unitId: 'unitId',
//   content: 'content',
//   morphologyId: 'morphologyId',
//   en: 'en',
//   pos: 'pos',
//   gender: 'genderId',
//   case: 'caseId',
//   number: 'numberId',
//   voice: 'voiceId',
//   mood: 'moodId',
//   tense: 'tenseId',
//   person: 'personId',
//   degree: 'degreeId',
// };

export function mapTextDataToJSON(data: DataFile) {
  if (!data || !data.rows.length) {
    return { title: 'error' };
  }

  const text = {
    title: '',
    label: data.rows[0].values[0],
    chapters: {},
  };

  // @ts-ignore
  const units = data.rows
    .map(({ values }) => ({
      chapterNumber: values[1],
      verseNumber: values[2],
      unitId: values[3],
      content: values[4],
      morphologyId: values[5],
      // translationId: values[6],
      en: values[6],
    }));

  units.forEach((unt) => {
    /* Checks for chapter existence */
    if (!(unt.chapterNumber in text.chapters)) {
      // @ts-ignore
      text.chapters[unt.chapterNumber] = {
        chapterNumber: unt.chapterNumber,
        verses: {},
      };
    }

    /* Checks for verse existence */
    // @ts-ignore
    if (!(unt.verseNumber in text.chapters[unt.chapterNumber].verses)) {
      // @ts-ignore
      text.chapters[unt.chapterNumber].verses[unt.verseNumber] = {
        verseNumber: unt.verseNumber,
        content: '',
        units: [],
      };
    }

    // @ts-ignore
    text
      .chapters[unt.chapterNumber]
      .verses[unt.verseNumber]
      .units
      .push({
        unitId: unt.unitId,
        content: unt.content,
        morphologyId: unt.morphologyId,
        // translationId: unt.translationId,
        en: unt.en,
      });
  });

  return text;
}

const isMorphField = (field: string) => (
  field !== 'function'
    && field !== 'lemma'
    && field !== 'domains'
    && field !== 'subdomains'
);

function parseOpenTextFeaturesItem(
  item: { top: string, def: string },
  index: number,
) : FeaturesItem {
  const location = item.top.split('.');
  const details = item.def.split('<br>')
    .map((dtl: any) => {
      const parts = dtl.split('=');

      return {
        detailName: parts[0],
        detailValue: parts[1].substring(1, parts[1].length - 1),
      };
    });

  const word = {
    bookId: location[0],
    chapterNumber: location[1],
    verseNumber: location[2],
    unitId: (index + 1).toString(),
    content: details.find((dtl) => dtl.detailName === 'lemma')?.detailValue || '#N/A#',
    pos: '',
    gender: undefined,
    case: undefined,
    number: undefined,
    voice: undefined,
    mood: undefined,
    tense: undefined,
    person: undefined,
    degree: undefined,
  };

  for (let j = 0; j < details.length; j += 1) {
    const field = details[j].detailName;
    if (isMorphField(field)) {
      // @ts-ignore
      word[`${field}`] = details[j].detailValue;
    }
  }

  return word;
}

export function parseOpenTextFeatures(data: { top: string, def: string }[]) : FeaturesItem[] {
  if (!data || !data.length) {
    return [];
  }

  const words = [];
  for (let i = 0; i < data.length; i += 1) {
    words.push(parseOpenTextFeaturesItem(data[i], i));
  }

  return words;
}

function parseOpenTextDataRow(
  dataRow: { values: string[] },
  unitIdColumn: number,
  locColumn: number,
  featuresColumn: number,
): TextItem {
  const unitId = dataRow.values[unitIdColumn];
  const location = dataRow.values[locColumn]
    .split('｜');
  const features = dataRow.values[featuresColumn]
    .trim()
    .split('｜');

  return {
    unitId: parseInt(unitId, 10).toString(),
    bookId: location[0].substring(1),
    chapterNumber: location[1],
    verseNumber: location[2].substring(0, location[2].length - 1),
    content: features[2],
    morphology: features[4],
    vocab: features[5].substring(0, features[5].length - 1),
  };
}

export function parseOpenTextData(data: DataFile) {
  const unitIdColumn = data.headers.indexOf('OGNTsort') || 0;
  const locColumn = data.headers.indexOf('〔Book｜Chapter｜Verse〕') || 0;
  const featuresColumn = data.headers.indexOf('〔OGNTk｜OGNTu｜OGNTa｜lexeme｜rmac｜sn〕') || 0;

  if (unitIdColumn === 0 && locColumn === 0 && featuresColumn === 0) {
    return [];
  }

  const rows = [];

  for (let i = 0; i < data.rows.length; i += 1) {
    rows.push(
      parseOpenTextDataRow(
        data.rows[i],
        unitIdColumn,
        locColumn,
        featuresColumn,
      ),
    );
  }

  return rows;
}

function parseOpenVocabDataRow(
  dataRow: { values: string[] },
  idColumn: number,
  nameColumn: number,
  dataColumn: number,
) : VocabularyItem {
  const data = JSON.parse(`{"${dataRow.values[dataColumn]}}`);
  return {
    gk: data.gk,
    // strongs: `G${data.strongs[0]}`,
    strongs: data.strongs.map((str: number) => `G${str}`),
    lemma: data.lemma,
    ntFrequency: data.frequencyCount,
    definition: data.definition,
  };
}

export function parseOpenVocabData(data: DataFile) : VocabularyItem[] {
  const idColumn = data.headers.indexOf('id') || 0;
  const nameColumn = data.headers.indexOf('name') || 0;
  const dataColumn = data.headers.indexOf('data') || 0;

  if (idColumn === 0 && nameColumn === 0 && dataColumn === 0) {
    return [];
  }

  const rows = [];

  for (let i = 0; i < data.rows.length; i += 1) {
    rows.push(
      parseOpenVocabDataRow(
        data.rows[i],
        idColumn,
        nameColumn,
        dataColumn,
      ),
    );
  }

  return rows;
}

export function generateKoineFiles(
  textData: TextItem[],
  featureData: FeaturesItem[],
  vocabularyData: VocabularyItem[],
  translationData: TranslationItem[],
) {
  const units = new Map<number, Object>();
  let unitsIndex = 0;

  /* Contains morpholofy data */
  const morphology = new Map<number, Object>();
  const morphologyLinks = new Map<string, number>();
  let morphologyIndex = 0;
  const vocabulary = new Map<number, Vocab>();
  const vocabularyLinks = new Map<string, number>();
  let vocabularyIndex = 0;
  // const forms = new Map<number, Form>();
  // const formLinks = new Map<string, number>();
  // const fromIndex = 0;

  /* Contains text structure data */
  const books = new Map<number, Book>();
  const bookLinks = new Map<string, number>();
  let bookIndex = 0;
  const chapters = new Map<number, Chapter>();
  const chapterLinks = new Map<string, number>();
  let chapterIndex = 0;
  const verses = new Map<number, Verse>();
  const verseLinks = new Map<string, number>();
  let verseIndex = 0;

  for (let i = 0; i < textData.length; i += 1) {
    /* Selects current book and creates one if it does not exist */
    if (!bookLinks.has(textData[i].bookId)) {
      const book = {
        bookId: bookIndex,
        bookNumber: parseInt(textData[i].bookId, 10),
        title: '',
        chapterIndicies: {
          start: chapterIndex,
          end: chapterIndex,
        },
      };
      bookLinks.set(textData[i].bookId, bookIndex);
      books.set(bookIndex, book);
      bookIndex += 1;
    }

    const currBookId = bookLinks.get(textData[i].bookId);
    if (currBookId === undefined) {
      throw new Error('Mapping error: Book not found');
    }
    const currBook = books.get(currBookId);
    if (!currBook) {
      throw new Error('Mapping error: Book not found');
    }

    /* Selects current chapter and creates one if it does not exist */
    if (!chapterLinks.has(`${textData[i].bookId}-${textData[i].chapterNumber}`)) {
      const chapter = {
        chapterId: chapterIndex,
        chapterNumber: parseInt(textData[i].chapterNumber, 10),
        title: '',
        bookId: currBook.bookId,
        verseIndicies: {
          start: verseIndex,
          end: verseIndex,
        },
      };
      chapterLinks.set(`${textData[i].bookId}-${textData[i].chapterNumber}`, chapterIndex);
      chapters.set(chapterIndex, chapter);
      /* Increment ending chapter index of current book */
      if (currBook.chapterIndicies.end < chapterIndex) {
        currBook.chapterIndicies.end = chapterIndex;
      }
      chapterIndex += 1;
    }

    const currChapterId = chapterLinks.get(`${textData[i].bookId}-${textData[i].chapterNumber}`);
    if (currChapterId === undefined) {
      throw new Error('Mapping error: Chapter not found');
    }
    const currChapter = chapters.get(currChapterId);
    if (!currChapter) {
      throw new Error('Mapping error: Chapter not found');
    }

    /* Selects current verse and creates one if it does not exist */
    if (!verseLinks.has(`${textData[i].bookId}-${textData[i].chapterNumber}-${textData[i].verseNumber}`)) {
      const verse = {
        verseId: verseIndex,
        verseNumber: parseInt(textData[i].verseNumber, 10),
        chapterId: currChapter.chapterId,
        unitIndicies: {
          start: unitsIndex,
          end: unitsIndex - 1,
        },
      };
      verseLinks.set(`${textData[i].bookId}-${textData[i].chapterNumber}-${textData[i].verseNumber}`, verseIndex);
      verses.set(verseIndex, verse);
      /* Increment ending chapter index of current book */
      if (currChapter.verseIndicies.end < verseIndex) {
        currChapter.verseIndicies.end = verseIndex;
      }
      verseIndex += 1;
    }

    const currVerseId = verseLinks.get(`${textData[i].bookId}-${textData[i].chapterNumber}-${textData[i].verseNumber}`);
    if (currVerseId === undefined) {
      throw new Error('Mapping error: Verse not found');
    }
    const currVerse = verses.get(currVerseId);
    if (!currVerse) {
      throw new Error('Mapping error: Verse not found');
    }

    /* Creates vocabulary unit if it does not exist */
    if (!vocabularyLinks.has(textData[i].vocab)) {
      let currVocab = vocabularyData.find((vcb) => (
        !!vcb.strongs.find((ref) => ref === textData[i].vocab)));
      if (!currVocab) {
        // console.log(`Error matching vocab: ${textData[i].vocab}`);
        // throw new Error(`Error matching vocab: ${textData[i].vocab}`);
        currVocab = {
          gk: 0,
          strongs: [],
          lemma: 'Unknown',
          definition: 'Unknown',
          ntFrequency: 0,
        };
      }
      const vocab = {
        wordId: vocabularyIndex,
        content: currVocab.lemma,
        gloss: '',
        definition: currVocab.definition,
        occurances: currVocab.ntFrequency,
        gkRef: textData[i].vocab,
      };
      vocabulary.set(vocabularyIndex, vocab);
      vocabularyLinks.set(textData[i].vocab, vocabularyIndex);
      vocabularyIndex += 1;
    }

    const vocabularyId = vocabularyLinks.get(textData[i].vocab);
    if (vocabularyId === undefined) {
      throw new Error('Mapping error: Verse not found');
    }
    const currVocabulary = vocabulary.get(vocabularyId);
    if (!currVocabulary) {
      throw new Error('Mapping error: Verse not found');
    }

    currVocabulary.occurances += 1;

    /* Creates morphology unit if it does not exist */
    if (!morphologyLinks.has(`${textData[i].vocab}-${textData[i].morphology}`)) {
      const form = {
        morphologyId: morphologyIndex,
        content: textData[i].content,
        posId: grammaticalForms.get(featureData[i].pos)?.grammarId,
        genderId: grammaticalForms.get(featureData[i].gender || '')?.grammarId,
        caseId: grammaticalForms.get(featureData[i].case || '')?.grammarId,
        numberId: grammaticalForms.get(featureData[i].number || '')?.grammarId,
        voiceId: grammaticalForms.get(featureData[i].voice || '')?.grammarId,
        moodId: grammaticalForms.get(featureData[i].mood || '')?.grammarId,
        tenseId: grammaticalForms.get(featureData[i].tense || '')?.grammarId,
        personId: grammaticalForms.get(featureData[i].person || '')?.grammarId,
        degreeId: grammaticalForms.get(featureData[i].degree || '')?.grammarId,
        wordId: currVocabulary.wordId,
      };
      morphology.set(morphologyIndex, form);
      morphologyLinks.set(`${textData[i].vocab}-${textData[i].morphology}`, morphologyIndex);
      morphologyIndex += 1;
    }

    const morphologyId = morphologyLinks.get(`${textData[i].vocab}-${textData[i].morphology}`);
    if (morphologyId === undefined) {
      throw new Error('Error finding morphology');
    }

    // @ts-ignore
    const currTranslation = translationData[textData[i].unitId];

    /* Creates text unit */
    const unit = {
      bookId: currBook.bookId,
      chapterId: currChapter.chapterId,
      verseId: currVerse.verseId,
      unitId: i,
      content: textData[i].content,
      morphologyId,
      // en: textData[i].en,
      en: currTranslation ? currTranslation.esv : '',
    };
    units.set(unitsIndex, unit);
    currVerse.unitIndicies.end += 1;
    unitsIndex += 1;
  }

  return {
    textUnits: Object.fromEntries(units),
    morphology: Object.fromEntries(morphology),
    vocabulary: Object.fromEntries(vocabulary),
    books: Object.fromEntries(books),
    chapters: Object.fromEntries(chapters),
    verses: Object.fromEntries(verses),
  };
}

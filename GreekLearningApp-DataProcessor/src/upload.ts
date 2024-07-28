import axios from 'axios';
import { readJSON } from './io';

const DATA_PATH = './export';
const FILES = {
  texts: 'books.json',
  chapters: 'chapters.json',
  verses: 'verses.json',
  units: 'units.json',
  vocabulary: 'vocabulary.json',
  forms: 'grammaticalForms.json',
  morphology: 'morphology.json',
};
const RETRY_THRESHOLD = 10;

// eslint-disable-next-line no-console
const log = (message: any) => console.log(message);

const url = 'http://127.0.0.1:7071/api';

async function get(resource: string) {
  const response = await axios.get(`${url}/${resource}`);

  return response.data;
}

async function upload(resource: string, item: any) {
  try {
    const response = await axios.post(`${url}/${resource}`, item);

    return response;
  } catch (err) {
    throw new Error('Encountered error when uploading');
  }

  return { message: 'error' };
}

async function uploadItems(resource: string, items: any[]) {
  let retryCount = 0;
  for (let i = 0; i < items.length; i += 1) {
    let uploadComplete = false;
    do {
      if (retryCount > RETRY_THRESHOLD) {
        throw new Error('Reached maximum number of retries.');
      }
      log(`Uploading ${resource} (${i + 1} of ${items.length})`);
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await upload(resource, items[i]);

        if ('status' in response && response.status === 201) {
          uploadComplete = true;
          retryCount = 0;
        }
      } catch (err) {
        log('Encountered an error. Retrying...');
        retryCount += 1;
      }
    } while (!uploadComplete);
  }
  return true;
}

(async () => {
  /* Upload Texts */
  const texts = readJSON(`${DATA_PATH}/${FILES.texts}`);
  const textValues = Object.values(texts)
    .map((itm: any) => ({ title: itm.title }));

  // const textUploadResults = await uploadItems('texts', textValues);

  // if (!textUploadResults) {
  //   log('Texts not uploaded!');
  //   return;
  // }

  /* Build TextIdMap */
  const uploadedTexts = await get('texts');

  const textIdMap = new Map<number, number>();
  Object.values(texts).forEach((txt: any) => {
    const upTextId = uploadedTexts.find((upTexts: any) => upTexts.title === txt.title)?.textId;
    textIdMap.set(txt.bookId, upTextId);
  });

  /* Upload Chapters */
  const chapters = readJSON(`${DATA_PATH}/${FILES.chapters}`);
  const chapterValues = Object.values(chapters)
    .map((chp: any) => ({
      chapterNumber: chp.chapterNumber,
      textId: textIdMap.get(chp.bookId) || 0,
    }));

  // const chapterUploadResults = await uploadItems('chapters', chapterValues);

  // if (!chapterUploadResults) {
  //   log('Chapters not uploaded!');
  //   return;
  // }

  /* Build ChapterIdMap */
  const uploadedChapters = await get('chapters');

  const chapterIdMap = new Map<number, number>();
  Object.values(chapters).forEach((chp: any) => {
    const upTextId = textIdMap.get(chp.bookId);
    const upChapterId = uploadedChapters.find((upChapters: any) => (
      upChapters.textId === upTextId
        && upChapters.chapterNumber === chp.chapterNumber
    ))?.chapterId;

    chapterIdMap.set(chp.chapterId, upChapterId);
  });

  /* Upload Verses */
  const verses = readJSON(`${DATA_PATH}/${FILES.verses}`);
  const verseValues = Object.values(verses)
    .map((vrs: any) => ({
      verseNumber: vrs.verseNumber,
      chapterId: chapterIdMap.get(vrs.chapterId) || 0,
    }));

  // const verseUploadResults = await uploadItems('verses', verseValues);

  // if (!verseUploadResults) {
  //   log('Verses not uploaded!');
  //   return;
  // }

  /* Build VerseIdMap */
  const uploadedVerses = await get('verses');

  const verseIdMap = new Map<number, number>();
  Object.values(verses).forEach((vrs: any) => {
    const upChapterId = chapterIdMap.get(vrs.chapterId);
    const upVerseId = uploadedVerses.find((upVerse: any) => (
      upVerse.chapterId === upChapterId
        && upVerse.verseNumber === vrs.verseNumber
    ))?.verseId;

    verseIdMap.set(vrs.verseId, upVerseId);
  });

  /* Upload Vocabulary */
  const words = readJSON(`${DATA_PATH}/${FILES.vocabulary}`);
  const wordValues = Object.values(words)
    .map((wrd: any) => ({
      content: wrd.content,
      occurances: wrd.occurances,
    }));

  // const wordUploadResults = await uploadItems('words', wordValues);

  // if (!wordUploadResults) {
  //   log('Words not uploaded!');
  //   return;
  // }

  /* Build WordIdMap */
  const uploadedWords = await get('words');

  const wordIdMap = new Map<number, number>();
  Object.values(words).forEach((wrd: any) => {
    const upWordId = uploadedWords.find((upWord: any) => upWord.content === wrd.content)?.rootId;
    wordIdMap.set(wrd.wordId, upWordId);
  });

  /* Upload Grammatical Forms */
  const forms = readJSON(`${DATA_PATH}/${FILES.forms}`);
  const formValues = Object.values(forms)
    .map((form: any) => ({
      name: form.name,
      abreviation: form.abreviation,
      lessonId: form.lessonId,
    }));

  // const formUploadResults = await uploadItems('grammaticalForms', formValues);

  // if (!formUploadResults) {
  //   log('Forms not uploaded!');
  //   return;
  // }

  /* Build FormIdMap */
  const uploadedForms = await get('grammaticalForms');

  const formIdMap = new Map<number, number>();
  Object.values(forms).forEach((form: any) => {
    const upFormId = uploadedForms.find((upForm: any) => upForm.name === form.name)?.grammarId;
    formIdMap.set(form.grammarId, upFormId);
  });

  /* Upload Morphology */
  const morphology = readJSON(`${DATA_PATH}/${FILES.morphology}`);
  const morphologyValues = Object.values(morphology)
    .map((morph: any) => ({
      content: morph.content,
      posId: formIdMap.get(morph.posId),
      caseId: formIdMap.get(morph.caseId) || null,
      tenseId: formIdMap.get(morph.tenseId) || null,
      voiceId: formIdMap.get(morph.voiceId) || null,
      moodId: formIdMap.get(morph.moodId) || null,
      personId: formIdMap.get(morph.personId) || null,
      numberId: formIdMap.get(morph.numberId) || null,
      genderId: formIdMap.get(morph.genderId) || null,
      patternId: formIdMap.get(morph.patternId) || null,
      degreeId: formIdMap.get(morph.degreeId) || null,
      rootId: wordIdMap.get(morph.wordId),
      basePOS: morph.posId,
    }));

  // const morphologyUploadResults = await uploadItems('morphologies', morphologyValues);

  // if (!morphologyUploadResults) {
  //   log('Morphologies not uploaded!');
  //   return;
  // }

  /* Build MorphologyIdMap */
  const uploadedMorphologies = await get('morphologies');

  const morphologyIdMap = new Map<number, number>();
  Object.values(morphology).forEach((morph: any) => {
    const upMorphId = uploadedMorphologies.find(
      (upMorph: any) => upMorph.content === morph.content,
    )?.morphologyId;
    morphologyIdMap.set(morph.morphologyId, upMorphId);
  });

  /* Upload Units */
  const units = readJSON(`${DATA_PATH}/${FILES.units}`);
  const unitValues = Object.values(units)
    .map((unit: any) => ({
      unitPlacement: unit.unitId,
      verseId: verseIdMap.get(unit.verseId),
      content: unit.content,
      morphologyId: morphologyIdMap.get(unit.morphologyId),
    }));

  // const unitUploadResults = await uploadItems('units', unitValuesPartition);

  // if (!unitUploadResults) {
  //   log('Units not uploaded!');
  //   return;
  // }

  log('Finished');
})();

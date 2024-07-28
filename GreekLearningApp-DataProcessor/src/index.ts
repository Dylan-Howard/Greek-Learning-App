import grammaticalForms from './grammaticalForms';
import {
  fetchDataFile,
  readJSON,
  writeJSONToFile,
} from './io';
import {
  generateKoineFiles,
  parseOpenTextData,
  parseOpenTextFeatures,
  parseOpenVocabData,
} from './mapper';

const IMPORT_PATH = './import';
const EXPORT_PATH = './export';
const FEATURES_FILE = 'WordDict';
const TEXT_FILE = 'WordsByVerse';
const VOCAB_FILE = 'MounceGithubTouched';
const TRANSLATIONS_FILE = 'translations';

// eslint-disable-next-line no-console
const log = (message: any) => console.log(message);

(() => {
  const features = readJSON(`${IMPORT_PATH}/${FEATURES_FILE}.json`);

  if (!features) { throw new Error('Error parsing features file'); }
  const featuresData = parseOpenTextFeatures(features);

  /* uniqueIdentitfer is stringified unitId of word */
  const text = fetchDataFile(`${IMPORT_PATH}/${TEXT_FILE}.csv`, '\t', '\n');
  if (!text) { throw new Error('Error parsing text file'); }
  const textData = parseOpenTextData(text);

  const vocab = fetchDataFile(`${IMPORT_PATH}/${VOCAB_FILE}.csv`, '\t', '\n');
  if (!vocab) { throw new Error('Error parsing text file'); }
  const vocabData = parseOpenVocabData(vocab);

  const translations = readJSON(`${IMPORT_PATH}/${TRANSLATIONS_FILE}.json`);
  if (!translations) { throw new Error('Error parsing text file'); }

  /* Generates Koine files from input data */
  const files = generateKoineFiles(textData, featuresData, vocabData, translations);

  /* Saves Koine files */
  const unitsSaveResults = writeJSONToFile(`${EXPORT_PATH}/units.json`, files.textUnits);
  log(`Is TextUnit JSON saved? ${unitsSaveResults}`);

  const morphologySaveResults = writeJSONToFile(`${EXPORT_PATH}/morphology.json`, files.morphology);
  log(`Is TextUnit JSON saved? ${morphologySaveResults}`);

  const vocabularySaveResults = writeJSONToFile(`${EXPORT_PATH}/vocabulary.json`, files.vocabulary);
  log(`Is TextUnit JSON saved? ${vocabularySaveResults}`);

  const booksSaveResults = writeJSONToFile(`${EXPORT_PATH}/books.json`, files.books);
  log(`Is TextUnit JSON saved? ${booksSaveResults}`);

  const chaptersSaveResults = writeJSONToFile(`${EXPORT_PATH}/chapters.json`, files.chapters);
  log(`Is TextUnit JSON saved? ${chaptersSaveResults}`);

  const versesSaveResults = writeJSONToFile(`${EXPORT_PATH}/verses.json`, files.verses);
  log(`Is TextUnit JSON saved? ${versesSaveResults}`);

  const formsSaveResults = writeJSONToFile(`${EXPORT_PATH}/grammaticalForms.json`, Object.fromEntries(grammaticalForms));
  log(`Is TextUnit JSON saved? ${formsSaveResults}`);
})();

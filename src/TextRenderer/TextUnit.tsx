/**
 * Text Unit
 */

import declensions from '../data/declensions.json';
import forms from '../data/grammaticalForms.json';
import vocab from '../data/vocabulary.json';
import { Unit, Declension, DeclensionDetails } from '../typescript/Text';
import { useUserContext } from '../User/User';

const fetchDeclensionDetails = (declension: Declension) : DeclensionDetails => {
  // @ts-ignore
  const {
    tenseId,
    voiceId,
    moodId,
    personId,
    countId,
    genderId,
    patternId,
    vocabId,
  } : {
    tenseId: keyof typeof forms,
    voiceId: keyof typeof forms,
    moodId: keyof typeof forms,
    personId: keyof typeof forms,
    countId: keyof typeof forms,
    genderId: keyof typeof forms,
    patternId: keyof typeof forms,
    vocabId: keyof typeof vocab,
  } = declension;

  return ({
    type: tenseId ? { name: 'verb' } : { name: 'noun' },
    tense: tenseId ? forms[tenseId] : undefined,
    voice: voiceId ? forms[voiceId] : undefined,
    mood: moodId ? forms[moodId] : undefined,
    person: personId ? forms[personId] : undefined,
    count: countId ? forms[countId] : undefined,
    gender: genderId ? forms[genderId] : undefined,
    pattern: patternId ? forms[patternId] : undefined,
    root: vocabId
    // @ts-ignore
      ? { name: vocab.gk.filter(({ wordId }) => wordId === vocabId)[0].content }
      : undefined,
    gloss: vocabId
      // @ts-ignore
      ? { name: vocab.gk.filter(({ wordId }) => wordId === vocabId)[0].content }
      : undefined,
  });
};

const stringifyShorthandDetails = (details: DeclensionDetails | undefined) => {
  if (!details) { return ''; }
  const {
    root, tense, voice, mood, person, count, gender, pattern,
  } = details;
  const shorthand = [];
  if (root) { shorthand.push(`[${root.name}: `); }
  /* Verb Details */
  if (tense) { shorthand.push(`${tense.short}`); }
  if (voice) { shorthand.push(`${voice.short}`); }
  if (mood) { shorthand.push(`${mood.short}`); }
  if (person) { shorthand.push(`${person.short}`); }
  if (tense && person) { shorthand.push(']'); }
  /* Noun Details */
  if (count) { shorthand.push(`${count.short}`); }
  if (gender) { shorthand.push(`${gender.short}`); }
  if (pattern) { shorthand.push(`${pattern.short}]`); }

  return shorthand.join('');
};

const fetchDeclension = ({ declensionId }: Unit) => (
  declensions.declensions.find((dcl) => dcl.declensionId === declensionId)
);

function TextUnit({ unit, onClick }: { unit: Unit, onClick: Function }) {
  const declension = fetchDeclension(unit);

  const isRecognizable = (dcl: Declension) => {
    const { user } = useUserContext();
    if (!user || !user.progress.lessons || !user.progress.vocabulary) { return 'unrecognizable'; }
    const { lessons, vocabulary } = user.progress;

    if (!dcl) { return 'unrecognizable'; }
    const {
      countId,
      genderId,
      tenseId,
      voiceId,
      moodId,
      personId,
      patternId,
      vocabId,
    } = dcl;

    const progressCheck = [
      countId ? lessons.find(({ id }) => id === countId)?.isComplete : true,
      genderId ? lessons.find(({ id }) => id === genderId)?.isComplete : true,
      tenseId ? lessons.find(({ id }) => id === tenseId)?.isComplete : true,
      voiceId ? lessons.find(({ id }) => id === voiceId)?.isComplete : true,
      moodId ? lessons.find(({ id }) => id === moodId)?.isComplete : true,
      personId ? lessons.find(({ id }) => id === personId)?.isComplete : true,
      patternId ? lessons.find(({ id }) => id === patternId)?.isComplete : true,
      vocabId ? vocabulary.find(({ id }) => id === vocabId)?.isComplete : true,
    ];

    if (progressCheck.some((prg) => !prg)) {
      return progressCheck[7] ? 'needsHelps' : 'unrecognizable';
    }

    return 'recognizable';
  };

  const details = declension ? fetchDeclensionDetails(declension) : undefined;

  const textContentMap = {
    unrecognizable: unit.en || unit.content,
    needsHelps: `${unit.content} ${stringifyShorthandDetails(details)}`,
    recognizable: unit.content,
  };
  const isKnown = declension ? isRecognizable(declension) : 'recognizable';
  const textContent = textContentMap[isKnown];

  if (unit && details) {
    return (
      <span
        className={details ? 'TextUnit HiglightOnHover' : 'TextUnit'}
        onClick={(e) => onClick(e)}
        onKeyUp={(e) => onClick(e)}
        onTouchEnd={(e) => onClick(e)}
        role="button"
        tabIndex={0}
      >
        {` ${textContent}`}
      </span>
    );
  }
  return <span className="TextUnit">{`${textContent}`}</span>;
}

export default TextUnit;

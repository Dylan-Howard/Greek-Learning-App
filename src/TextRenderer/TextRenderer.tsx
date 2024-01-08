/**
 * TextRenderer
 */
import './TextRenderer.css';
import { ChangeEvent, useState } from 'react';
import TextUnit from './TextUnit';
import texts from '../data/text.json';
/** @TODO Consider renaming declesnions to morphology */
import declensions from '../data/declensions.json';
import forms from '../data/grammaticalForms.json';
import vocab from '../data/vocabulary.json';
import { Declension, DeclensionDetails } from '../typescript/Text';
import TextDetails from './TextDetails';

const DEFAULT_TEXT_ID = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(message);
};

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
    vocabId: keyof typeof forms,
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
    root: vocabId ? { name: vocab.gk[vocabId].content } : undefined,
    gloss: vocabId ? { name: vocab.gk[vocabId].gloss } : undefined,
  });
};

// const stringifyDeclensionDetails = ({
//   tense,
//   voice,
//   mood,
//   person,
//   count,
//   gender,
//   pattern,
//   root,
// }: DeclensionDetails) => {
//   const details = [];
//   if (root) { details.push(`[${root.name}:`); }
//   /* Verb Details */
//   if (tense) { details.push(`${tense.name} `); }
//   if (voice) { details.push(`${voice.name} `); }
//   if (mood) { details.push(`${mood.name} `); }
//   if (person) { details.push(`${person.name}`); }
//   if (tense && person) { details.push(']'); }
//   /* Noun Details */
//   if (count) { details.push(`${count.name} `); }
//   if (gender) { details.push(`${gender.name} `); }
//   if (pattern) { details.push(`${pattern.name}]`); }

//   return details.join('');
// };

// const stringifyShorthandDeclensionDetails = ({
//   tense, voice, mood, person, count, gender, pattern, root
// }) => {
//   const details = [];
//   if (root) { details.push(`[${root.name}: `); }
//   /* Verb Details */
//   if (tense) { details.push(`${tense.short}`); }
//   if (voice) { details.push(`${voice.short}`); }
//   if (mood) { details.push(`${mood.short}`); }
//   if (person) { details.push(`${person.short}`); }
//   if (tense && person) { details.push(']'); }
//   /* Noun Details */
//   if (count) { details.push(`${count.short}`); }
//   if (gender) { details.push(`${gender.short}`); }
//   if (pattern) { details.push(`${pattern.short}]`); }

//   return details.join('');
// };

function TextRenderer() {
  const [activeText, setActiveText] = useState(texts.texts[DEFAULT_TEXT_ID]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);
  /* Used to track selected unit to render declension data */
  const [activeUnitId, setActiveUnitId] = useState(0);

  const handleTextChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const targetText = texts.texts.find((txt) => txt.title === e.target.value);
    if (targetText) {
      setActiveText(targetText);
      /** @TODO - update the select box with this state change. */
      setActiveChapterIndex(1);
    }
  };
  const handleChapterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedChapter = parseInt(e.target.value, 10);
    if (selectedChapter) {
      setActiveChapterIndex(selectedChapter);
    } else {
      e.target.value = activeChapterIndex.toString();
    }
  };

  const handleUnitClick = (e: any, declensionId: number | undefined) => {
    setActiveUnitId(declensionId || 0);
  };

  const heading = activeText?.title;

  const activeDeclension = declensions.declensions.find((dcl) => dcl.declensionId === activeUnitId);

  return (
    <div className="TextContainer">
      <form className="TextRendererRow TextForm">
        <select
          className="TextSelect"
          onChange={(e) => handleTextChange(e)}
        >
          {
            texts.texts.map((txt) => (
              <option key={txt.label}>{txt.title}</option>
            ))
          }
        </select>
        <select
          className="TextSelect"
          onChange={(e) => handleChapterChange(e)}
        >
          {
            activeText.chapters.map((chp) => (
              <option key={`chapter-${chp.chapterNumber}`}>{chp.chapterNumber}</option>
            ))
          }
        </select>
      </form>
      <div className="TextRendererRow">
        <div id="RenderedText">
          {
            activeText ? (
              <span className="TextHeading">{heading}</span>
            ) : ''
          }
          {
            activeText.chapters[activeChapterIndex - 1].verses
              .map((vrs) => (
                vrs.units
                  ? vrs.units.map((unt) => (
                    <TextUnit
                      key={`unit-${unt.unitId}`}
                      unit={unt}
                      onClick={(e: Event) => handleUnitClick(e, unt.declensionId)}
                    />
                  ))
                  : <span key={`unit-c${activeChapterIndex}v${vrs.verseNumber}`}>{`${vrs.verseNumber} ${vrs.content} `}</span>
              ))
          }
        </div>
      </div>
      <div className="TextRendererPopup">
        {
          activeDeclension
            ? (
              <TextDetails
                // @ts-ignore
                details={fetchDeclensionDetails(activeDeclension)}
              />
            )
            : <span />
        }
      </div>
    </div>
  );
}

export default TextRenderer;

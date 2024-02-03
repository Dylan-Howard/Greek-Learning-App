/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * TextRenderer
 */
import './TextRenderer.css';
import { useContext, useState } from 'react';
import TextUnit from './TextUnit';
import texts from '../data/texts.json';
import TextSelect from './TextSelect';
import { UserContext } from '../User/User';
import { Text, Verse } from '../typescript/Text';
/** @TODO Consider renaming declesnions to morphology */

const DEFAULT_TEXT_ID = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(message);
};

function TextRenderer({ changeActiveDeclension } : { changeActiveDeclension: Function }) {
  const { user } = useContext(UserContext);
  const [activeTextIndex, setActiveTextIndex] = useState(DEFAULT_TEXT_ID);
  const [activeChapterIndex, setActiveChapterIndex] = useState('1');

  const activeTheme = user?.settings.prefersDarkMode ? 'dark' : 'light';

  const activeText: Text = texts.texts[activeTextIndex];
  const isRightToLeftText = !!(activeText.title === 'Ruth');

  const handleTextChange = (targetTextIndex: number) => {
    const targetText = texts.texts[targetTextIndex];
    if (!targetText) { return; }

    setActiveTextIndex(targetTextIndex);
    setActiveChapterIndex('1');
  };

  const handleChapterChange = (targetChapterIndex: string) => {
    const chapterId = `${targetChapterIndex + 1}`;
    const targetChapter = activeText.chapters[chapterId];
    if (!targetChapter) { return; }

    setActiveChapterIndex(chapterId);
  };

  const handleUnitClick = (e: any, morphologyId: string | undefined) => {
    console.log(morphologyId);
    changeActiveDeclension(morphologyId || 0);
  };

  const heading = activeText?.title;

  let activeVerses: Verse[] | [] = [];

  if (activeChapterIndex.toString() in activeText.chapters) {
    const chapterVerses = activeText.chapters[activeChapterIndex.toString()]?.verses;
    // @ts-ignore
    activeVerses = Object.values(chapterVerses);
  } else {
    activeVerses = [];
  }

  return (
    <div className={`TextContainer Text${activeTheme === 'light' ? 'Light' : 'Dark'}`}>
      <form className="TextRendererRow TextForm">
        <TextSelect
          activeOption={texts.texts[activeTextIndex].title}
          setOptionIndex={handleTextChange}
          options={texts.texts.map((txt) => txt.title)}
        />
        <TextSelect
          activeOption={activeChapterIndex}
          setOptionIndex={handleChapterChange}
          options={
            Object.keys(texts.texts[activeTextIndex].chapters).map((chp) => chp.toString())
          }
        />
      </form>
      <div className="TextRendererRow">
        <div className="TextRendererColumn">
          <div className={isRightToLeftText ? 'TextDisplay HebrewText' : 'TextDisplay'}>
            {
              activeText ? (
                <h1 className="TextHeading">{heading}</h1>
              ) : ''
            }
            {
              activeVerses.map((vrs: Verse) => (
                vrs.units
                  ? vrs.units.map((unt) => (
                    // <span key={unt.unitId}>{`${unt.content}`}</span>
                    <TextUnit
                      key={`unit-${unt.unitId}`}
                      unit={unt}
                      onClick={(e: Event) => handleUnitClick(e, unt.morphologyId)}
                    />
                  ))
                  : <span key={vrs.verseNumber}>{`${vrs.content}`}</span>

                // <span key={vrs.verseNumber}>{`${vrs.content}`}</span>

                // vrs.units
                //   ? vrs.units.map((unt) => (
                //     <TextUnit
                //       key={`unit-${unt.unitId}`}
                //       unit={unt}
                //       onClick={(e: Event) => handleUnitClick(e, parseInt(unt.morphologyId, 10))}
                //     />
                //   ))
                //   : <span key={`unit-c${activeChapterIndex}v${vrs.verseNumber}`}>
                //  {`${vrs.verseNumber} ${vrs.content} `}
                // </span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextRenderer;

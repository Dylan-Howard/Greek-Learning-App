/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * TextRenderer
 */
import './TextRenderer.css';
import { ChangeEvent, useContext, useState } from 'react';
import TextUnit from './TextUnit';
import texts from '../data/text.json';
import TextSelect from './TextSelect';
import { UserContext } from '../User/User';
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
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const activeTheme = user?.settings.prefersDarkMode ? 'dark' : 'light';
  const activeText = texts.texts[activeTextIndex];

  const handleTextChange = (targetTextIndex: number) => {
    const targetText = texts.texts[targetTextIndex];
    if (!targetText) { return; }

    setActiveTextIndex(targetTextIndex);
    setActiveChapterIndex(0);
  };

  const handleChapterChange = (targetChapterIndex: number) => {
    const targetChapter = texts.texts[targetChapterIndex];
    if (!targetChapter) { return; }

    setActiveChapterIndex(targetChapterIndex);
  };

  const handleUnitClick = (e: any, declensionId: number | undefined) => {
    changeActiveDeclension(declensionId || 0);
  };

  const heading = activeText?.title;

  return (
    <div className={`TextContainer Text${activeTheme === 'light' ? 'Light' : 'Dark'}`}>
      <form className="TextRendererRow TextForm">
        <TextSelect
          activeOption={texts.texts[activeTextIndex].title}
          setOptionIndex={handleTextChange}
          options={texts.texts.map((txt) => txt.title)}
        />
        <TextSelect
          activeOption={(activeChapterIndex + 1).toString()}
          setOptionIndex={handleChapterChange}
          options={
            texts.texts[activeTextIndex].chapters.map((chp) => chp.chapterNumber.toString())
          }
        />
      </form>
      <div className="TextRendererRow">
        <div className="TextRendererColumn">
          <div className="TextDisplay">
            {
              activeText ? (
                <h1 className="TextHeading">{heading}</h1>
              ) : ''
            }
            {
              activeText.chapters[activeChapterIndex].verses
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
      </div>
    </div>
  );
}

export default TextRenderer;

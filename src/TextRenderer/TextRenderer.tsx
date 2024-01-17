/**
 * TextRenderer
 */
import './TextRenderer.css';
import { ChangeEvent, useState } from 'react';
import TextUnit from './TextUnit';
import texts from '../data/text.json';
/** @TODO Consider renaming declesnions to morphology */

const DEFAULT_TEXT_ID = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(message);
};

function TextRenderer({ changeActiveDeclension } : { changeActiveDeclension: Function }) {
  const [activeText, setActiveText] = useState(texts.texts[DEFAULT_TEXT_ID]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);

  const handleTextChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const targetText = texts.texts.find((txt) => txt.title === e.target.value);
    if (targetText) {
      setActiveText(targetText);
      setActiveChapterIndex(1);
    }
  };

  const handleChapterChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const selectedChapter = parseInt(target.value, 10);
    if (selectedChapter) {
      setActiveChapterIndex(selectedChapter);
    } else {
      target.setAttribute('value', activeChapterIndex.toString());
    }
  };

  const handleUnitClick = (e: any, declensionId: number | undefined) => {
    changeActiveDeclension(declensionId || 0);
  };

  const heading = activeText?.title;

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
        <div className="TextRendererColumn">
          <div className="TextDisplay">
            {
              activeText ? (
                <h1 className="TextHeading">{heading}</h1>
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
      </div>
    </div>
  );
}

export default TextRenderer;

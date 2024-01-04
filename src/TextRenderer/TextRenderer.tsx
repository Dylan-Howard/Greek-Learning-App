/**
 * TextRenderer
 */
import './TextRenderer.css';
import { ChangeEvent, useState } from 'react';
import TextUnit from './TextUnit';
import texts from '../data/text.json';

const DEFAULT_TEXT_ID = 0;

const log = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(message);
};

function TextRenderer() {
  const [activeText, setActiveText] = useState(texts.texts[DEFAULT_TEXT_ID]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);

  const handleTextChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const targetText = texts.texts.find((txt) => txt.title === e.target.value);
    log(targetText);
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
                  ? vrs.units.map((unt) => (<TextUnit key={`unit-${unt.unitId}`} unit={unt} />))
                  : <span key={`unit-c${activeChapterIndex}v${vrs.verseNumber}`}>{`${vrs.verseNumber} ${vrs.content} `}</span>
              ))
          }
        </div>
      </div>
      {/* <div id="popup-container"></div> */}
    </div>
  );
}

export default TextRenderer;

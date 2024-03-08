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

const DEFAULT_TEXT_ID = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(message);
};

function TextRenderer(
  {
    activeTextIndex,
    setActiveTextIndex,
    activeChapterIndex,
    setActiveChapterIndex,
    changeActiveDeclension,
  } : {
    activeTextIndex: number,
    setActiveTextIndex: Function,
    activeChapterIndex: string,
    setActiveChapterIndex: Function,
    changeActiveDeclension: Function,
  },
) {
  const { user } = useContext(UserContext);

  /* Sets the theme based on the user setting */
  const activeTheme = user?.settings.prefersDarkMode ? 'dark' : 'light';

  /* Sets the active text */
  const activeText: Text = texts.texts[activeTextIndex];

  /* Determines whether the text is Left-Right or Right-Left */
  const isRightToLeftText = !!(activeText.title === 'Ruth');

  /* Determines the position of the active chapter within the active text */
  let chapterPosition;
  const chaptersInActiveText = Object.keys(activeText.chapters);

  if (activeChapterIndex === '1') {
    chapterPosition = 'first';
  }
  if (chaptersInActiveText.indexOf(activeChapterIndex) === chaptersInActiveText.length) {
    chapterPosition = 'last';
  }

  const heading = activeText?.title;

  /* Compiles all verses in the active chapter */
  let activeVerses: Verse[] | [] = [];

  if (activeChapterIndex.toString() in activeText.chapters) {
    const chapterVerses = activeText.chapters[activeChapterIndex.toString()]?.verses;
    // @ts-ignore
    activeVerses = Object.values(chapterVerses);
  } else {
    activeVerses = [];
  }

  const handleTextChange = (targetTextIndex: number) => {
    const targetText = texts.texts[targetTextIndex];
    if (!targetText) { return; }

    setActiveTextIndex(targetTextIndex);
    setActiveChapterIndex('1');
  };

  const handleChapterChange = (targetChapterIndex: number) => {
    log(targetChapterIndex);

    const chapterId = `${targetChapterIndex}`;

    /* Determines if the targetChapterIndex is within the current text.
     * If not, the chapter change with also change the text.
    */
    if (targetChapterIndex === 0) {
      log('Changing to last chapter of previous text');
      return;
    }
    if (targetChapterIndex > chaptersInActiveText.length) {
      log('Changing to first chapter of next text');
      return;
    }

    const targetChapter = activeText.chapters[chapterId];
    if (!targetChapter) { return; }

    setActiveChapterIndex(chapterId);
  };

  const handleUnitClick = (e: any, morphologyId: string | undefined) => {
    changeActiveDeclension(morphologyId || 0);
  };

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
                    <TextUnit
                      key={`unit-${unt.unitId}`}
                      unit={unt}
                      onClick={(e: Event) => handleUnitClick(e, unt.morphologyId)}
                    />
                  ))
                  : <span key={vrs.verseNumber}>{`${vrs.content} `}</span>
              ))
            }
          </div>
        </div>
      </div>
      <div className="TextRendererRow">
        <div className="TextRendererColumn">
          <div className="TextControls">
            <button
              className="TextControlButton ButtonLeft"
              type="button"
              onClick={() => handleChapterChange(parseInt(activeChapterIndex, 10) - 1)}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              className="TextControlButton ButtonRight"
              type="button"
              onClick={() => handleChapterChange(parseInt(activeChapterIndex, 10) + 1)}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextRenderer;

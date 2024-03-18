/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * TextRenderer
 */
import './TextRenderer.css';
import { useContext, useState } from 'react';
import TextUnit from './TextUnit';
// import texts from '../data/texts.json';
import TextSelect from './TextSelect';
import { UserContext } from '../User/User';
import { Text, Unit, Verse } from '../typescript/Text';
import * as TextService from '../LanguageData/LanguageData';

const DEFAULT_TEXT_ID = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(message);
};

function TextRenderer(
  {
    activeBookId,
    setActiveBookId,
    activeChapterId,
    setActiveChapterId,
    changeActiveDeclension,
  } : {
    activeBookId: number,
    setActiveBookId: Function,
    activeChapterId: number,
    setActiveChapterId: Function,
    changeActiveDeclension: Function,
  },
) {
  const { user } = useContext(UserContext);
  // const [textUnits, setTextUnits] : [ Unit[], Function ] = useState([]);

  /* Sets the theme based on the user setting */
  const activeTheme = user?.settings.prefersDarkMode ? 'dark' : 'light';

  /* Sets the active text */
  const activeBook = TextService.fetchBookById(activeBookId);
  const activeChapter = TextService.fetchChapterById(activeChapterId);
  const activeUnits = TextService.fetchUnitsByChapterId(activeChapterId);

  /* Determines whether the text is Left-Right or Right-Left */
  const isRightToLeftText = !!(activeBook.title === 'Ruth');

  /* Determines the position of the active chapter within the active text */
  let chapterPosition;
  if (activeChapterId === 0) {
    chapterPosition = 'first';
  }
  if (activeChapterId === TextService.fetchMaxChapterId()) {
    chapterPosition = 'last';
  }

  const handleTextChange = (targetBookId: number) => {
    const targetBook = TextService.fetchBookById(targetBookId);
    if (!targetBook) { return; }

    setActiveBookId(targetBookId);
    setActiveChapterId(targetBook.chapterIndicies.start);
  };

  const handleChapterChange = (targetChapterId: number) => {
    // log(targetChapterId);

    /* Determines if the targetChapterIndex is within the current text.
     * If not, the chapter change should only change the text.
     */
    if (targetChapterId < activeBook.chapterIndicies.start) {
      // log('Changing to last chapter of the piror book');
      setActiveBookId(activeBookId - 1);
    }
    if (targetChapterId > activeBook.chapterIndicies.end) {
      // log('Changing to first chapter of the next book');
      setActiveBookId(activeBookId + 1);
    }

    setActiveChapterId(targetChapterId);
  };

  const handleUnitClick = (morphologyId: number | undefined) => {
    changeActiveDeclension(morphologyId);
  };

  return (
    <div className={`TextContainer Text${activeTheme === 'light' ? 'Light' : 'Dark'}`}>
      <form className="TextRendererRow TextForm">
        <TextSelect
          activeOption={TextService.fetchBookById(activeBookId).title}
          setOptionIndex={handleTextChange}
          options={TextService.fetchBookSelectionOptions()}
        />
        <TextSelect
          activeOption={activeChapter.chapterNumber}
          setOptionIndex={handleChapterChange}
          options={TextService.fetchChapterSelectionOptionsByBookId(activeBookId)}
        />
      </form>
      <div className="TextRendererRow">
        <div className="TextRendererColumn">
          <div className={isRightToLeftText ? 'TextDisplay HebrewText' : 'TextDisplay'}>
            <h1 className="TextHeading">{`${activeBook.title} ${activeChapter.chapterNumber}`}</h1>
            {
              activeUnits.map((unt: Unit) => (
                <TextUnit
                  key={`unit-${unt.verseId}-${unt.unitId}`}
                  unit={unt}
                  onClick={() => handleUnitClick(unt.morphologyId)}
                />
              ))
            }
          </div>
        </div>
      </div>
      <div className="TextRendererRow">
        <div className="TextRendererColumn">
          <div className={chapterPosition === 'first' ? 'TextControls InvertDirection' : 'TextControls'}>
            {
              chapterPosition !== 'first'
                ? (
                  <button
                    className="TextControlButton ButtonLeft"
                    type="button"
                    onClick={() => handleChapterChange(activeChapterId - 1)}
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                )
                : ''
            }
            {
              chapterPosition !== 'last'
                ? (
                  <button
                    className="TextControlButton ButtonRight"
                    type="button"
                    onClick={() => handleChapterChange(activeChapterId + 1)}
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                )
                : ''
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextRenderer;

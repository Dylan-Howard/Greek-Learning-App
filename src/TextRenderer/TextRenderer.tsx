/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * TextRenderer
 */
import './TextRenderer.css';
import { useContext } from 'react';
import {
  Container,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextUnit from './TextUnit';
import TextSelect from './TextSelect';
import { UserContext } from '../User/User';
import { TextContext, Unit } from '../LanguageData/Text';
import * as TextService from '../LanguageData/LanguageData';

function TextControls(
  {
    chapterId,
    chapterPosition,
    onChange,
  }: {
    chapterId: number,
    chapterPosition: string | undefined,
    onChange: Function
  },
) {
  return (
    <div className={chapterPosition === 'first' ? 'TextControls InvertDirection' : 'TextControls'}>
      {
        chapterPosition !== 'first'
          ? (
            <Fab
              color="primary"
              aria-label="navigate-back"
              onClick={() => onChange(chapterId - 1)}
            >
              <ChevronLeftIcon />
            </Fab>
          )
          : ''
      }
      {
        chapterPosition !== 'last'
          ? (
            <Fab
              color="primary"
              aria-label="navigate-back"
              onClick={() => onChange(chapterId + 1)}
            >
              <ChevronRightIcon />
            </Fab>
          )
          : ''
      }
    </div>
  );
}

function TextRenderer({ changeActiveDeclension } : { changeActiveDeclension: Function }) {
  const { user } = useContext(UserContext);
  const { text, setText } = useContext(TextContext);

  /* Sets the theme based on the user setting */
  const activeTheme = user?.settings.theme;

  /* Sets the active text */
  const activeBook = TextService.fetchBookById(text.bookId);
  const activeChapter = TextService.fetchChapterById(text.chapterId);
  const activeUnits = TextService.fetchUnitsByChapterId(text.chapterId);

  /* Determines whether the text is Left-Right or Right-Left */
  const isRightToLeftText = !!(activeBook.title === 'Ruth');

  /* Determines the position of the active chapter within the active text */
  let chapterPosition;
  if (text.chapterId === 0) {
    chapterPosition = 'first';
  }
  if (text.chapterId === TextService.fetchMaxChapterId()) {
    chapterPosition = 'last';
  }

  const handleTextChange = (event: SelectChangeEvent) => {
    const targetBook = TextService.fetchBookById(parseInt(event.target.value, 10));
    if (!targetBook) { return; }

    setText({
      bookId: parseInt(event.target.value, 10),
      chapterId: targetBook.chapterIndicies.start,
    });
  };

  const handleChapterChange = (event: SelectChangeEvent) => {
    const targetChapterId = parseInt(event.target.value, 10);
    /* Determines if the targetChapterIndex is within the current text.
     * If not, the chapter change should only change the text.
     */
    let targetBookId = text.bookId;
    if (targetChapterId < activeBook.chapterIndicies.start) {
      targetBookId -= 1;
    }
    if (targetChapterId > activeBook.chapterIndicies.end) {
      targetBookId += 1;
    }
    setText({
      bookId: targetBookId,
      chapterId: targetChapterId,
    });
  };

  const handleUnitClick = (morphologyId: number | undefined) => {
    changeActiveDeclension(morphologyId);
  };

  return (
    <div className={`TextContainer Text${activeTheme === 'light' ? 'Light' : 'Dark'}`}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="center">
          <FormControl>
            <InputLabel id="text-select-book-label">Book</InputLabel>
            <Select
              labelId="text-select-book-label"
              id="text-select-book"
              value={`${activeBook.bookId}`}
              label="Text"
              onChange={handleTextChange}
              sx={{ width: 180 }}
            >
              {
                TextService.fetchBookSelectionOptions()
                  .map((book) => (
                    <MenuItem value={book.id} key={`book-${book.id}`}>{book.label}</MenuItem>
                  ))
              }
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="text-select-book-label">Chapter</InputLabel>
            <Select
              labelId="text-select-chapter-label"
              id="text-select-chapter"
              value={`${activeChapter.chapterId}`}
              label="Chapter"
              onChange={handleChapterChange}
              sx={{ width: 80 }}
            >
              {
                TextService.fetchChapterSelectionOptionsByBookId(activeBook.bookId)
                  .map((chp) => (
                    <MenuItem value={chp.id} key={`chapter-${chp.id}`}>{chp.label}</MenuItem>
                  ))
              }
            </Select>
          </FormControl>
        </Stack>
      </Container>
      {/* <form className="TextRendererRow TextForm">
        <TextSelect
          activeOption={TextService.fetchBookById(activeBook.bookId).title}
          setOptionIndex={handleTextChange}
          options={TextService.fetchBookSelectionOptions()}
        />
        <TextSelect
          activeOption={activeChapter.chapterNumber}
          setOptionIndex={handleChapterChange}
          options={TextService.fetchChapterSelectionOptionsByBookId(activeBook.bookId)}
        />
      </form> */}
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
          <TextControls
            chapterId={text.chapterId}
            chapterPosition={chapterPosition}
            onChange={handleChapterChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TextRenderer;

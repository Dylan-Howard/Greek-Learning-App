/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * TextRenderer
 */
import './TextRenderer.css';
import {
  ReactNode, useContext, useEffect, useState,
} from 'react';
import {
  Container,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextUnit from './TextUnit';
import { UserContext } from '../User/User';
import { TextContext, Unit } from '../LanguageData/Text';
// import * as TextService from '../LanguageData/LanguageData';
import * as AzureTextService from '../LanguageData/AzureTextService';
import { TextRendererSkeleton } from '../Skeletons/Skeletons';

function TextSelectionControls(
  {
    selections,
    text,
    handleTextChange,
    handleChapterChange,
  } : {
    selections: { texts: any[], chapters: any[] },
    text: { bookId: number, chapterId: number },
    handleTextChange: (event: SelectChangeEvent<`${number}`>, child: ReactNode) => void,
    handleChapterChange: (event: SelectChangeEvent<`${number}`>, child: ReactNode) => void,
  },
) {
  return (
    <>
      <FormControl size="small">
        <InputLabel id="text-select-book-label">Text</InputLabel>
        <Select
          labelId="text-select-book-label"
          id="text-select-book"
          value={`${text.bookId}`}
          label="Text"
          onChange={handleTextChange}
          sx={{ width: 180 }}
        >
          {
            selections.texts.map(({ textId, title }) => (
              <MenuItem value={textId} key={`text-${textId}`}>{title}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="text-select-book-label">Chapter</InputLabel>
        <Select
          labelId="text-select-chapter-label"
          id="text-select-chapter"
          value={`${text.chapterId}`}
          label="Chapter"
          onChange={handleChapterChange}
          sx={{ width: 80 }}
        >
          {
            selections.chapters.map(({ chapterId, chapterNumber }) => (
              <MenuItem value={chapterId} key={`chapter-${chapterId}`}>{chapterNumber}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  );
}

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
  const [selections, setSelections] = useState({
    texts: [{ textId: 0, title: '' }],
    chapters: [{ chapterId: 0, chapterNumber: '' }],
  });
  const [units, setUnits] = useState([]);

  /* Sets the theme based on the user setting */
  const activeTheme = user?.settings.theme;

  /* Sets the chapter title */
  const title = selections.texts.find((txt) => txt.textId === text.bookId)?.title || '';
  title.concat(selections.chapters.find((chp) => chp.chapterId === text.chapterId)?.chapterNumber || '');

  /* Determines the position of the active chapter within the active text */
  let chapterPosition;
  if (selections.chapters[0].chapterId === text.chapterId) {
    chapterPosition = 'first';
  }
  if (selections.chapters[selections.chapters.length - 1].chapterId === text.chapterId) {
    chapterPosition = 'last';
  }

  useEffect(() => {
    AzureTextService.fetchTextSelectionOptions(text.bookId)
      .then((data) => setSelections(data));
    AzureTextService.fetchUnitsByChapter(text.chapterId)
      .then((data) => setUnits(data));
  }, [text]);

  const isSelectionLoaded = selections.texts.length && selections.chapters.length;

  const handleTextChange = (event: SelectChangeEvent) => {
    const targetTextId = parseInt(event.target.value, 10);
    AzureTextService.fetchChaptersByText(targetTextId)
      .then((chapters) => {
        setText({
          bookId: parseInt(event.target.value, 10),
          chapterId: chapters[0].chapterId,
        });
      });
  };

  const handleChapterChange = (event: SelectChangeEvent) => {
    const targetChapterId = parseInt(event.target.value, 10);
    AzureTextService.fetchChapter(targetChapterId)
      .then(({ textId }) => {
        setText({
          bookId: textId,
          chapterId: targetChapterId,
        });
      });
  };

  const handleUnitClick = (morphologyId: number | undefined) => {
    changeActiveDeclension(morphologyId);
  };

  return (
    <div className={`TextContainer Text${activeTheme === 'light' ? 'Light' : 'Dark'}`}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="center">
          {
            isSelectionLoaded
              ? (
                <TextSelectionControls
                  selections={selections}
                  text={text}
                  handleTextChange={handleTextChange}
                  handleChapterChange={handleChapterChange}
                />
              )
              : <Skeleton variant="rounded" width={260} height={40} />
          }
        </Stack>
      </Container>
      <div className="TextRendererRow">
        <div className="TextRendererColumn">
          <div className="TextDisplay">
            <h1 className="TextHeading">{title}</h1>
            {
              units.length
                ? units.map((unt: Unit) => (
                  <TextUnit
                    key={`unit-${unt.verseId}-${unt.unitId}`}
                    unit={unt}
                    onClick={() => handleUnitClick(unt.morphologyId)}
                  />
                ))
                : <TextRendererSkeleton />
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

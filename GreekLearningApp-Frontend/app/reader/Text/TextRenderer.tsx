/**
 * TextRenderer
 */
import {
  ReactNode, useContext, useEffect, useState,
} from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  // Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextUnit from './TextUnit';
import { UserContext } from '../User/User';
import { TextContext, Unitv2 } from '../LanguageData/Text';
import * as AzureTextService from '../LanguageData/AzureTextService';
import * as AzureReaderService from '../LanguageData/AzureReaderService';
import { TextRendererSkeleton } from '../Skeletons/Skeletons';
import notFoundImage from '../../not-found.svg';

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
    <Stack
      direction={chapterPosition === 'first' ? 'row-reverse' : 'row'}
      justifyContent="space-between"
      sx={{ m: 4, mt: 0 }}
    >
      {chapterPosition !== 'first'
        ? (
          <Fab
            color="primary"
            aria-label="navigate-back"
            onClick={() => onChange(chapterId - 1)}
          >
            <ChevronLeftIcon />
          </Fab>
        )
        : ''}
      {chapterPosition !== 'last'
        ? (
          <Fab
            color="primary"
            aria-label="navigate-back"
            onClick={() => onChange(chapterId + 1)}
          >
            <ChevronRightIcon />
          </Fab>
        )
        : ''}
    </Stack>
  );
}

function TextRenderer({ changeActiveMorphology } : { changeActiveMorphology: Function }) {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const { text, setText } = useContext(TextContext);
  const [selections, setSelections] = useState({
    texts: [{ textId: 1, title: '' }],
    chapters: [{ chapterId: 1, chapterNumber: 1 }],
  });
  const [title, setTitle] = useState('');
  const [units, setUnits] = useState([]);
  const [loadingError, setLoadingError] = useState(false);

  const handlePageFetch = () => {
    AzureReaderService.fetchPage(text.chapterId, user?.id || '')
      .then((data) => {
        if (!data) {
          setLoadingError(true);
          return;
        }
        setSelections(data.selection);
        setTitle(data.title);
        setUnits(data.text);
        setLoadingError(false);
      });
  };

  useEffect(() => { handlePageFetch(); }, [text, user]);

  const handleReloadClick = () => {
    setLoadingError(false);
    handlePageFetch();
  };

  const isSelectionLoaded = selections.texts.length && selections.texts[0].title !== '';

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

  const handleChapterChange = (targetChapterId: number) => {
    AzureTextService.fetchChapter(targetChapterId)
      .then(({ textId }) => {
        setText({
          bookId: textId,
          chapterId: targetChapterId,
        });
      });
  };

  const handleChapterSelect = (event: SelectChangeEvent) => {
    const targetChapterId = parseInt(event.target.value, 10);
    handleChapterChange(targetChapterId);
  };

  const handleUnitClick = (morphologyId: number | undefined) => {
    changeActiveMorphology(morphologyId);
  };

  /* Determines the position of the active chapter within the active text */
  let chapterPosition;
  if (selections.chapters[0].chapterId === text.chapterId) {
    chapterPosition = 'first';
  }
  if (selections.chapters[selections.chapters.length - 1].chapterId === text.chapterId) {
    chapterPosition = 'last';
  }

  if (loadingError) {
    return (
      <Box
        sx={{
          bgcolor: 'background.default',
          height: { xs: 'calc(100% - 160.5px)', sm: 'calc(100% - 88px)' },
          ml: { xs: 0, sm: 10 },
        }}
      >
        <Stack flexDirection="column" justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: '90%',
              maxWidth: 400,
              mt: 8,
              mb: 8,
            }}
          >
            <Image src={notFoundImage} alt="Resources not found" width={500} />
          </Box>
          <Typography textAlign="center" sx={{ m: 4 }}>
            Hmmm, it likes like we&lsquo;re having trouble finding our texts.
          </Typography>
          <Stack flexDirection="row" justifyContent="center">
            <Button variant="contained" onClick={handleReloadClick} sx={{ mr: 2 }}>Look again</Button>
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        height: 'calc(100vh - env(safe-area-inset-bottom))',
        width: '100%',
        ml: { xs: 0, sm: 10 },
      }}
    >
      <Stack direction="row" justifyContent="center" sx={{ mt: 4, pb: 2 }}>
        {isSelectionLoaded
          ? (
            <TextSelectionControls
              selections={selections}
              text={text}
              handleTextChange={handleTextChange}
              handleChapterChange={handleChapterSelect}
            />
          )
          : <Skeleton variant="rounded" width={260} height={40} />}
      </Stack>
      <Box sx={{ height: { xs: 'calc(100% - 160.5px)', sm: 'calc(100% - 88px)' }, overflowY: 'scroll' }}>
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Noto Serif, serif',
              fontSize: 48,
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: 1.8,
              textAlign: 'center',
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Box sx={{ mb: 4 }}>
            {
              units.length
                ? units.map((unt: Unitv2) => (
                  <TextUnit
                    key={`unit-${unt.verseNumber}-${unt.unitId}`}
                    unit={unt}
                    onClick={() => handleUnitClick(unt.morphologyId)}
                  />
                ))
                : <TextRendererSkeleton />
              }
          </Box>
          {isSelectionLoaded
            ? (
              <TextControls
                chapterId={text.chapterId}
                chapterPosition={chapterPosition}
                onChange={handleChapterChange}
              />
            )
            : '' }
        </Container>
      </Box>
    </Box>
  );
}

export default TextRenderer;

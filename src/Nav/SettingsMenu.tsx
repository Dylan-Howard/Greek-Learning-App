import './SettingsMenu.css';

import {
  ChangeEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as AzureTextService from '../LanguageData/AzureTextService';
import * as AzureUserService from '../User/AzureUserService';
import { User, UserContext } from '../User/User';
import { Lesson } from '../Common/Lesson';
import { Wordv2 } from '../Common/Word';
import transliterateGreek from '../typescript/Transliterate';
import OptionCheckbox from './OptionCheckbox';
import { TextContext } from '../LanguageData/Text';
import { SettingsMenuTabSkeleton } from '../Skeletons/Skeletons';

function mapLessons(lessons: Lesson[], user: User | undefined, filter: string) {
  return lessons.filter((lsn: Lesson) => (
    filter === lsn.title.substring(0, filter.length)
  )).map((lsn : Lesson) => ({
    id: lsn.lessonId,
    name: lsn.title,
    type: 'Lesson',
    isActive: !!user?.progress.lessons?.find(
      (prg) => prg.lessonId === lsn.lessonId,
    )?.isComplete,
  }));
}

function mapVocabulary(vocabulary: Wordv2[], user: User | undefined, filter: string) {
  return vocabulary
    .filter((vcb: Wordv2) => (
      filter === transliterateGreek(vcb.content.substring(0, filter.length))
    )).map((vcb : Wordv2) => ({
      id: vcb.rootId,
      name: vcb.content,
      type: 'Word',
      isActive: !!user?.progress.vocabulary?.find(
        (prg) => prg.wordId === vcb.rootId,
      )?.isComplete,
    }));
}

function SettingsLink({ resource }: { resource: string }) {
  return (
    <Link to={`/${resource}`}>
      <Button sx={{ textTransform: 'none', mb: 2 }}>
        {`See all ${resource}`}
      </Button>
    </Link>
  );
}

function SettingsMenu(
  {
    title,
    activeMorphologyId,
    handleClose,
  } : {
    title: string,
    activeMorphologyId: number,
    handleClose: MouseEventHandler<HTMLButtonElement>,
  },
) {
  const { user, setUser } = useContext(UserContext);
  const { text } = useContext(TextContext);
  const [filter, setFilter] = useState('');
  const [options, setOptions] = useState([{
    id: 0,
    type: '',
    name: '',
    isActive: false,
  }]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  // const activeTheme = !user?.settings.prefersDarkMode ? 'light' : 'dark';
  const theme = useTheme();

  let resource;
  if (title === 'Dictionary') {
    resource = 'vocabulary';
  }
  if (title === 'Lessons') {
    resource = 'lessons';
  }

  const handleLessonsFetch = () => AzureTextService
    .fetchLessons()
    .then((lessons) => {
      if (lessons) {
        setOptions(mapLessons(lessons, user, filter));
        setOptionsLoading(false);
      }
    });

  const handleVocabularyFetch = () => AzureTextService
    .fetchVocabularyByChapter(text.chapterId)
    .then((vocabulary) => {
      if (vocabulary) {
        setOptions(mapVocabulary(vocabulary, user, filter));
        setOptionsLoading(false);
      }
    });

  const handleDetailsFetch = () => {
    setOptions([{
      id: 1,
      type: 'Details',
      name: activeMorphologyId.toString(),
      isActive: true,
    }]);
    setOptionsLoading(false);
  };

  /* Loads the settings */
  useEffect(() => {
    setOptionsLoading(true);
    if (title === 'Lessons') {
      handleLessonsFetch();
    }
    if (title === 'Dictionary') {
      handleVocabularyFetch();
    }
    if (title === 'Details') {
      handleDetailsFetch();
    }
  }, [title, filter, user]);

  const handleTextboxChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter(e.target.value);
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    settingId: number,
    settingType: string,
  ) => {
    /* Guards if no active user is set */
    if (!user || user.id === 'guest') { return; }

    const updatedUser = {
      id: user.id,
      name: user.name,
      progress: {
        ...user.progress,
      },
      settings: {
        ...user.settings,
      },
    };

    /* Guards from non-existant settings */
    if (settingType !== 'Lesson' && settingType !== 'Word') {
      return;
    }
    /* Handles each type by adding or updating entry */
    if (settingType === 'Lesson') {
      const targetProgressList = updatedUser.progress.lessons;
      const targetProgressItem = targetProgressList.find((prg) => prg.lessonId === settingId);

      if (!targetProgressItem) {
        targetProgressList.push({ lessonId: settingId, isComplete: e.target.checked });
      } else {
        targetProgressItem.isComplete = e.target.checked;
      }
    } else {
      const targetProgressList = updatedUser.progress.vocabulary;
      const targetProgressItem = targetProgressList.find((prg) => prg.wordId === settingId);

      if (!targetProgressItem) {
        targetProgressList.push({ wordId: settingId, isComplete: e.target.checked });
      } else {
        targetProgressItem.isComplete = e.target.checked;
      }
    }
    AzureUserService.updateUser(updatedUser)
      .catch((err) => {
        // setUser(updatedUser);
        // eslint-disable-next-line no-console
        console.log(err);
      });
    setUser(updatedUser);
  };

  if (title === 'Home') { return <span />; }

  return (
    <Container sx={{
      bgcolor: 'background.tertiary',
      pt: 2,
      borderTopLeftRadius: { xs: 24, sm: 0 },
      borderTopRightRadius: { xs: 24, sm: 0 },
      borderColor: 'text.primary',
    }}
    >
      <Stack flexDirection="row" justifyContent="end">
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack
        sx={{
          height: {
            xs: 500,
            sm: '100vh',
          },
          overflowY: 'scroll',
        }}
      >
        {!optionsLoading
          ? (
            <>
              <Typography variant="h2" color={theme.palette.text.primary} sx={{ fontSize: 48, mb: 2 }}>
                {title || ''}
              </Typography>
              { resource ? <SettingsLink resource={resource} /> : ''}
              <TextField
                label="Search"
                type="search"
                variant="outlined"
                onChange={(e) => handleTextboxChange(e)}
                size="small"
                sx={{ bgcolor: 'background.default', mb: 2 }}
              />
              <Divider sx={{ mb: 2 }} />
              {
                options.length !== 0
                  ? options.map(({
                    id,
                    type,
                    name,
                    isActive,
                  }) => (
                    <OptionCheckbox
                      id={`option-${type}-${id}`}
                      key={`option-${type}-${id}`}
                      name={name}
                      value={isActive}
                      onCheck={(e) => handleCheckboxChange(e, id, type)}
                    />
                  ))
                  : <Typography variant="body1">No options match this search filter</Typography>
              }
            </>
          )
          : <SettingsMenuTabSkeleton />}
      </Stack>
    </Container>
  );
}

export default SettingsMenu;

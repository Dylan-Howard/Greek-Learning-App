'use client';

import {
  ChangeEvent,
  MouseEventHandler,
  TouchEvent,
  TouchEventHandler,
  useEffect,
  useState,
} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as AzureTextService from '../../services/AzureTextService';
import * as AzureUserService from '../../services/AzureUserService';
import { User } from '../../services/User';
import { Lesson } from '../../modules/Lesson';
import { Wordv2 } from '../../modules/Word';
import transliterateGreek from '../Transliterate';
import OptionCheckbox from './OptionCheckbox';
import { SettingsMenuTabSkeleton } from '../../modules/Skeletons';

function mapLessons(lessons: Lesson[], user: User | undefined, filter: string) {
  return lessons.filter((lsn: Lesson) => (
    lsn.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
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
      filter.toLowerCase() === transliterateGreek(
        vcb.content.substring(0, filter.length),
      ).toLowerCase()
    )).map((vcb : Wordv2) => ({
      id: vcb.rootId,
      name: vcb.content,
      type: 'Word',
      isActive: !!user?.progress.vocabulary?.find(
        (prg) => prg.wordId === vcb.rootId,
      )?.isComplete,
    }));
}

function MenuHandle({ onTouchClose }: { onTouchClose: TouchEventHandler }) {
  const [swipe, setSwipe] = useState({ start: 0 });
  const swipeCloseDistance = 50;

  const handleTouchStart = (e: any) => {
    setSwipe({ start: e.touches[0].clientY });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const swipeDistance = e.changedTouches[0].clientY - swipe.start;
    if (swipeCloseDistance < swipeDistance) {
      onTouchClose(e);
    }
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{ pt: 2, pb: 2 }}
    >
      <Box
        sx={{
          border: '#333 1px solid',
          borderColor: 'text.primary',
          width: 48,
        }}
      />
    </Stack>
  );
}

function MenuCloseButton({ onClose }: { onClose: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Stack flexDirection="row" justifyContent="end" sx={{ pt: 2, pb: 2 }}>
      <IconButton aria-label="close" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}

function SettingsLink({ resource }: { resource: string }) {
  return (
    <Link href={`/${resource}`}>
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
  } : {
    title: string,
    activeMorphologyId: number | undefined,
  },
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, isSignedIn, isLoaded } = useUser();
  const [activeUser, setActiveUser] = useState(AzureUserService.getDefaultUserState());

  const [filter, setFilter] = useState('');
  const [options, setOptions] = useState([{
    id: 0,
    type: '',
    name: '',
    isActive: false,
  }]);
  const [loading, setLoading] = useState({
    user: true,
    options: true,
  });

  const gt600px = useMediaQuery('(min-width:600px)');
  const theme = useTheme();

  if (!searchParams.has('bookId') || !searchParams.has('chapterId')) {
    throw new Error('Invalid URL request');
  }
  const text = {
    bookId: searchParams.get('bookId'),
    chapterId: searchParams.get('chapterId'),
  };

  let resource;
  if (title === 'Dictionary') {
    resource = 'vocabulary';
  }
  if (title === 'Lessons') {
    resource = 'lessons';
  }

  const handleLessonsFetch = () => {
    if (loading.user) {
      return;
    }

    AzureTextService
      .fetchLessons()
      .then((lessons) => {
        if (lessons) {
          setOptions(mapLessons(lessons, activeUser, filter));
          setLoading({ ...loading, options: false });
        }
      });
  };

  const handleVocabularyFetch = () => {
    if (loading.user) {
      return;
    }

    const chapterId = text.chapterId ? parseInt(text.chapterId, 10) : 1;
    AzureTextService
      .fetchVocabularyByChapter(chapterId)
      .then((vocabulary) => {
        if (vocabulary) {
          setOptions(mapVocabulary(vocabulary, activeUser, filter));
          setLoading({ ...loading, options: false });
        }
      });
  };

  const handleDetailsFetch = () => {
    setOptions([{
      id: 1,
      type: 'Details',
      name: activeMorphologyId?.toString() || '',
      isActive: true,
    }]);
    setLoading({ ...loading, options: false });
  };

  useEffect(() => {
    setLoading({ ...loading, user: true });
    if (!isSignedIn && !isLoaded) {
      return;
    }
    if (!user) {
      return;
    }
    AzureUserService.fetchUser(user.id).then((usr) => {
      setActiveUser(usr);
      setLoading({ ...loading, user: false });
    });
  }, [user]);

  /* Loads the settings */
  useEffect(() => {
    if (!user && !isSignedIn && !isLoaded) {
      return;
    }

    setLoading({ ...loading, options: true });
    if (title === 'Lessons') {
      handleLessonsFetch();
    }
    if (title === 'Dictionary') {
      handleVocabularyFetch();
    }
    if (title === 'Details') {
      handleDetailsFetch();
    }
    setLoading({ ...loading, options: false });
  }, [title, filter, activeUser]);

  const handleTextboxChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter(e.target.value);
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    settingId: number,
    settingType: string,
  ) => {
    /* Guards if no active user is set */
    if (!activeUser || activeUser.id === 'guest') { return; }

    const updatedUser = {
      id: activeUser.id,
      name: activeUser.name,
      progress: {
        ...activeUser.progress,
      },
      settings: {
        ...activeUser.settings,
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
        setActiveUser(updatedUser);
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const handleClose = () => {
    const bookId = searchParams.get('bookId') || 1;
    const chapterId = searchParams.get('chapterId') || 1;

    router.push(`/reader?bookId=${bookId}&chapterId=${chapterId}`);
  };

  if (title === 'Home') { return <span />; }

  return (
    <Container sx={{
      bgcolor: 'background.tertiary',
      pr: { xs: 4, sm: 2 },
      pl: { xs: 4, sm: 2 },
      borderTopLeftRadius: { xs: 24, sm: 0 },
      borderTopRightRadius: { xs: 24, sm: 0 },
      width: { xs: '100vw', sm: 'auto' },
    }}
    >
      {
        gt600px
          ? <MenuCloseButton onClose={handleClose} />
          : <MenuHandle onTouchClose={handleClose} />
      }
      <Stack sx={{ height: { xs: 500, sm: 'calc(100vh - 72px)' }, overflowY: 'scroll', pr: 1 }}>
        {!loading.options && !loading.user
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

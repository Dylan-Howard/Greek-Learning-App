import './SettingsMenu.css';

import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import * as AzureTextService from '../LanguageData/AzureTextService';
import * as AzureUserService from '../User/AzureUserService';
import { User, UserContext } from '../User/User';
import { Tab } from '../Common/Tab';
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
      <Button fullWidth sx={{ textTransform: 'none' }}>
        {`See all ${resource}`}
      </Button>
    </Link>
  );
}

function SettingsMenu(
  {
    tab: { title },
    activeMorphologyId,
  } : {
    tab: Tab,
    activeMorphologyId: number,
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

  const activeTheme = !user?.settings.prefersDarkMode ? 'light' : 'dark';

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
      .then(() => setUser(updatedUser));
  };

  if (title === 'Home') { return <span />; }

  if (optionsLoading) {
    return (
      <div className={activeTheme === 'light' ? 'SettingsMenu MenuLight' : 'SettingsMenu MenuDark'}>
        <div id={`${title}-menu`} className="SettingsMenuTab MenuActive">
          <SettingsMenuTabSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className={activeTheme === 'light' ? 'SettingsMenu MenuLight' : 'SettingsMenu MenuDark'}>
      <div id={`${title}-menu`} className="SettingsMenuTab MenuActive">
        <h1 className="MenuTabTitle">{title}</h1>
        { resource ? <SettingsLink resource={resource} /> : ''}
        <TextField
          label="Search"
          type="search"
          variant="outlined"
          onChange={(e) => handleTextboxChange(e)}
          size="small"
          sx={{
            backgroundColor: 'background.paper',
            width: '.9',
            m: 'auto',
            mt: 1,
            mb: 1,
          }}
        />
        {
          options.length !== 0
            ? options.map(({
              id,
              type,
              name,
              isActive,
            }) => (
              <OptionCheckbox
                id={id}
                key={`option-${type}-${id}`}
                type={type}
                name={name}
                value={isActive}
                onChange={(e) => handleCheckboxChange(e, id, type)}
              />
            ))
            : <span className="SettingsNotice">No options match this search filter</span>
        }
      </div>
    </div>
  );
}

export default SettingsMenu;

import './SettingsMenu.css';

import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Button, Skeleton, TextField } from '@mui/material';
import * as AzureTextService from '../LanguageData/AzureTextService';
import * as UserService from '../User/UserService';
import {
  User,
  UserContext,
} from '../User/User';
import { Tab } from '../Common/Tab';
import { Lesson } from '../Common/Lesson';
import { Wordv2 } from '../Common/Word';
import transliterateGreek from '../typescript/Transliterate';
import OptionCheckbox from './OptionCheckbox';
import { TextContext } from '../LanguageData/Text';

function mapLessons(lessons: Lesson[], user: User | undefined, filter: string) {
  return lessons.filter((lsn: Lesson) => (
    filter === lsn.title.substring(0, filter.length)
  ))
    .map((lsn : Lesson) => ({
      id: lsn.lessonId,
      name: lsn.title,
      type: 'Lesson',
      isActive: !!user?.progress.lessons?.find(
        (prg) => prg.id === lsn.lessonId,
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
        (prg) => prg.id === vcb.rootId,
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
  const [options, setOptions] = useState([
    {
      id: 0,
      type: '',
      name: '',
      isActive: false,
    },
  ]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const activeTheme = !user?.settings.prefersDarkMode ? 'light' : 'dark';

  let resource;

  if (title === 'Dictionary') {
    resource = 'vocabulary';
  }
  if (title === 'Lessons') {
    resource = 'lessons';
  }

  useEffect(() => {
    setOptionsLoading(true);
    if (title === 'Lessons') {
      AzureTextService.fetchLessons()
        .then((lessons) => {
          setOptions(mapLessons(lessons, user, filter));
          setOptionsLoading(false);
        });
    }
    if (title === 'Dictionary') {
      AzureTextService.fetchVocabularyByChapter(text.chapterId)
        .then((vocabulary) => {
          setOptions(mapVocabulary(vocabulary, user, filter));
          setOptionsLoading(false);
        });
    }
    if (title === 'Details') {
      setOptions([{
        id: 1,
        type: 'Details',
        name: activeMorphologyId.toString(),
        isActive: true,
      }]);
      setOptionsLoading(false);
    }
  }, [title, filter]);

  const handleTextboxChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter(e.target.value);
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    settingId: number,
    settingType: string,
  ) => {
    /* Guards if no active user is set */
    if (!user) { return; }
    const updatedUser = {
      id: user.id,
      progress: {
        ...user.progress,
      },
      settings: {
        ...user.settings,
      },
    };
    /* Guards from non-existant settings */
    if (
      settingType !== 'Lesson'
      && settingType !== 'Word'
    ) { return; }
    const settingsTypeMap = { Lesson: 'lessons', Word: 'vocabulary' };
    const targetSettingType = settingsTypeMap[settingType];

    /* Selects the target list */
    if (
      targetSettingType !== 'lessons'
      && targetSettingType !== 'vocabulary'
    ) { return; }
    const targetProgressList = updatedUser.progress[targetSettingType];
    if (!targetProgressList) { return; }

    const targetProgressItem = targetProgressList.find((prg) => prg.id === settingId);
    if (!targetProgressItem) {
      targetProgressList.push({
        id: settingId,
        isComplete: e.target.checked,
      });
    } else {
      targetProgressItem.isComplete = e.target.checked;
    }

    setUser(updatedUser);
    UserService.saveLocalUser(updatedUser);
  };

  if (title === 'Home') { return <span />; }

  if (optionsLoading) {
    return (
      <div className={activeTheme === 'light' ? 'SettingsMenu MenuLight' : 'SettingsMenu MenuDark'}>
        <div id={`${title}-menu`} className="SettingsMenuTab MenuActive">
          <Skeleton variant="rounded" width={256} height={64} sx={{ m: 2, mb: 8 }} />
          <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
          <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
          <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
          <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
          <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
          <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
          <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
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

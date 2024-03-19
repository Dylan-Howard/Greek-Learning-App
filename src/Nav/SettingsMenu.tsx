import './SettingsMenu.css';

import {
  ChangeEvent,
  useContext,
  useState,
} from 'react';
import { fetchLessons, fetchVocabulary, fetchVocabularyByChapterId } from '../LanguageData/LanguageData';
import { UserContext } from '../User/User';
import { Tab } from '../Common/Tab';
import { Lesson } from '../Common/Lesson';
import { Word } from '../Common/Word';
import transliterateGreek from '../typescript/Transliterate';
import OptionCheckbox from './OptionCheckbox';

const LANGUAGE = 'gk';

function SettingsMenu(
  {
    tab: { title },
    activeMorphologyId,
    activeText,
  } : {
    tab: Tab,
    activeMorphologyId: number,
    activeText: { bookId: number, chapterId: number },
  },
) {
  const { user, setUser } = useContext(UserContext);
  const [filter, setFilter] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(true);

  const activeTheme = !user?.settings.prefersDarkMode ? 'light' : 'dark';

  if (title === 'Home') { return <span />; }
  const options : {
    id: number,
    name: string,
    type: string,
    isActive: boolean,
  }[] = [];

  if (title === 'Lessons') {
    const lessons = fetchLessons(LANGUAGE);

    options.push(
      ...lessons
        .filter((lsn: Lesson) => (
          filter === lsn.title.substring(0, filter.length)
        ))
        .map((lsn : Lesson) => ({
          id: lsn.lessonId,
          name: lsn.title,
          type: 'Lesson',
          isActive: !!user?.progress.lessons?.find(
            (prg) => prg.id === lsn.lessonId,
          )?.isComplete,
        })),
    );
  }
  if (title === 'Dictionary') {
    let vocabulary;
    if (showOnlyActive) {
      vocabulary = fetchVocabularyByChapterId(activeText.chapterId);
    } else {
      vocabulary = fetchVocabulary(LANGUAGE);
    }

    options.push(
      ...vocabulary
        .filter((vcb: Word) => (
          (filter === transliterateGreek(
            vcb.content.substring(0, filter.length),
          ))))
        .map((vcb : Word) => ({
          id: vcb.wordId,
          name: vcb.content,
          type: 'Word',
          isActive: !!user?.progress.vocabulary?.find(
            (prg) => prg.id === vcb.wordId,
          )?.isComplete,
        })),
    );
  }
  if (title === 'Settings') {
    if (user) {
      const { settings } = user;

      const keys = Object.keys(settings);

      options.push(
        ...keys
          .filter((setting: string) => (
            filter === setting.substring(0, filter.length)
          ))
          .map((setting: string) => ({
            id: keys.indexOf(setting),
            name: setting,
            type: 'setting',
            isActive: !!settings[setting],
          })),
      );
    }
  }
  if (title === 'Details') {
    options.push({
      id: 1,
      type: 'Details',
      name: activeMorphologyId.toString(),
      isActive: true,
    });
  }

  const handleButtonClick = () => {
    setShowOnlyActive(!showOnlyActive);
  };

  const handleTextboxChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleSettingChange = (
    e: ChangeEvent<HTMLInputElement>,
    settingId: number,
  ) => {
    /* Guards if no active user is set */
    if (!user) { return; }
    const updatedUser = {
      progress: {
        ...user.progress,
      },
      settings: {
        ...user.settings,
      },
    };
    /* Guards from non-existant settings */
    const { settings } = updatedUser;

    const keys = Object.keys(settings);
    if (!keys[settingId]) { return; }
    /* Updates the setting */
    settings[keys[settingId]] = e.target.checked;

    setUser(updatedUser);
  };

  return (
    <div className={activeTheme === 'light' ? 'SettingsMenu MenuLight' : 'SettingsMenu MenuDark'}>
      <div id={`${title}-menu`} className="SettingsMenuTab MenuActive">
        <h1 className="MenuTabTitle">{title}</h1>
        {
          title === 'Dictionary'
            ? (
              <button
                className="SettingsButton"
                type="button"
                onClick={() => handleButtonClick()}
              >
                {
                  showOnlyActive ? 'Show all vocabulary?' : 'Only show current chapter\'s vocabulary?'
                }
              </button>
            )
            : ''
        }
        <input
          className="SettingsSearchBox"
          placeholder="Search"
          onChange={(e) => handleTextboxChange(e)}
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
                onChange={
                  type === 'setting'
                    ? (e) => handleSettingChange(e, id)
                    : (e) => handleCheckboxChange(e, id, type)
                }
              />
            ))
            : <span className="SettingsNotice">No options match this search filter</span>
        }
      </div>
    </div>
  );
}

export default SettingsMenu;

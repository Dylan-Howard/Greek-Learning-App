import './SettingsMenu.css';

import {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useState,
} from 'react';
import { fetchLessons, fetchVocabulary } from '../LanguageData/LanguageData';
import { UserContext } from '../User/User';
import { Tab } from '../Common/Tab';
import { Lesson } from '../Common/Lesson';
import { Word } from '../Common/Word';
import transliterateGreek from '../typescript/Transliterate';

const LANGUAGE = 'gk';

function OptionCheckbox(
  {
    id,
    type,
    name,
    value,
    onChange,
  }: {
    id: number,
    type: string,
    name: string,
    value: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>,
  },
) {
  return (
    <>
      <input
        key={`${type}-${id}`}
        id={`${type}-${id}`}
        className="SettingsOption"
        checked={value}
        type="checkbox"
        onChange={onChange}
      />
      <label htmlFor={`${type}-${id}`} className="SettingsLabel">{name}</label>
    </>
  );
}

function SettingsMenu(
  { tab: { title } } : { tab: Tab },
) {
  const { user, setUser } = useContext(UserContext);
  const [filter, setFilter] = useState('');

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
    const vocabulary = fetchVocabulary(LANGUAGE);

    options.push(
      ...vocabulary
        .filter((vcb: Word) => (
          filter === transliterateGreek(
            vcb.content.substring(0, filter.length),
          )))
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
    };
    /* Guards from non-existant settings */
    if (settingType !== 'Lesson' && settingType !== 'Word') { return; }
    const settingsTypeMap = { Lesson: 'lessons', Word: 'vocabulary' };
    const targetSettingType = settingsTypeMap[settingType];

    /* Selects the target list */
    if (targetSettingType !== 'lessons' && targetSettingType !== 'vocabulary') { return; }
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

  return (
    <div className="SettingsMenu">
      <div id={`${title}-menu`} className="SettingsMenuTab MenuActive">
        <span className="MenuTabTitle">{title}</span>
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
                onChange={(e) => handleCheckboxChange(e, id, type)}
              />
            ))
            : <span>No options match this search filter</span>
        }
      </div>
    </div>
  );
}

export default SettingsMenu;

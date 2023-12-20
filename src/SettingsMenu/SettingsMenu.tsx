import './SettingsMenu.css';
// import { useContext } from 'react';
import { fetchLessons, fetchVocabulary } from '../LanguageData/LanguageData';
import { useUserContext } from '../User/User';
import { Tab } from '../Common/Tab';
import { Lesson } from '../Common/Lesson';
import { Word } from '../Common/Word';

const LANGUAGE = 'gk';

function OptionButton(
  {
    id,
    type,
    name,
    isActive,
  }: {
    id: number,
    type: string,
    name: string,
    isActive: boolean,
  },
) {
  return (
    <button
      key={`${type}-${id}`}
      className={isActive ? 'SettingsOption SettingsActive' : 'SettingsOption'}
      type="button"
    >
      {name}
    </button>
  );
}

function SettingsMenu({ tab: { title } } : { tab: Tab }) {
  const activeUser = useUserContext();
  const options = [];
  if (title === 'Lessons') {
    const lessons = fetchLessons(LANGUAGE);

    options.push(
      ...lessons.map((lsn : Lesson) => ({
        id: lsn.lessonId,
        name: lsn.title,
        type: 'Lesson',
        isActive: !!activeUser.progress.lessons?.find(
          (prg) => prg.id === lsn.lessonId,
        )?.isComplete,
      })),
    );
  }
  if (title === 'Dictionary') {
    const vocabulary = fetchVocabulary(LANGUAGE);

    options.push(
      ...vocabulary.map((vcb : Word) => ({
        id: vcb.wordId,
        name: vcb.content,
        type: 'Word',
        isActive: !!activeUser.progress.vocabulary?.find(
          (prg) => prg.id === vcb.wordId,
        )?.isComplete,
      })),
    );
  }

  return (
    <div className="SettingsMenu">
      <div id={`${title}-menu`} className={options.length !== 0 ? 'SettingsMenuTab MenuActive' : 'SettingsMenuTab'}>
        <span className="MenuTabTitle">{title}</span>
        {
          options.map(({
            id,
            type,
            name,
            isActive,
          }) => (
            <OptionButton
              id={id}
              key={id}
              type={type}
              name={name}
              isActive={isActive}
            />
          ))
        }
      </div>
    </div>
  );
}

export default SettingsMenu;

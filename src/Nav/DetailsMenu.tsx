import './DetailsMenu.css';
import { useContext } from 'react';
import { Declension, DeclensionDetails } from '../typescript/Text';
import declensions from '../data/declensions.json';
import forms from '../data/grammaticalForms.json';
import vocab from '../data/vocabulary.json';
import { UserContext } from '../User/User';

const fetchDeclensionDetails = (declension: Declension) : DeclensionDetails => {
  // @ts-ignore
  const {
    tenseId,
    voiceId,
    moodId,
    personId,
    countId,
    genderId,
    patternId,
    vocabId,
  } : {
    tenseId: keyof typeof forms,
    voiceId: keyof typeof forms,
    moodId: keyof typeof forms,
    personId: keyof typeof forms,
    countId: keyof typeof forms,
    genderId: keyof typeof forms,
    patternId: keyof typeof forms,
    vocabId: keyof typeof vocab,
  } = declension;

  return ({
    type: tenseId ? { name: 'verb' } : { name: 'noun' },
    tense: tenseId ? forms[tenseId] : undefined,
    voice: voiceId ? forms[voiceId] : undefined,
    mood: moodId ? forms[moodId] : undefined,
    person: personId ? forms[personId] : undefined,
    count: countId ? forms[countId] : undefined,
    gender: genderId ? forms[genderId] : undefined,
    pattern: patternId ? forms[patternId] : undefined,
    root: vocabId
    // @ts-ignore
      ? { name: vocab.gk.filter(({ wordId }) => wordId === vocabId)[0].content }
      : undefined,
    gloss: vocabId
      // @ts-ignore
      ? { name: vocab.gk.filter(({ wordId }) => wordId === vocabId)[0].gloss }
      : undefined,
  });
};

function DetailsMenu({ activeDeclensionId } : { activeDeclensionId: string }) {
  const { user, setUser } = useContext(UserContext);
  // const { user } = useContext(UserContext);
  const activeTheme = !user?.settings.prefersDarkMode ? 'light' : 'dark';

  const unitForm = declensions.filter(
    ({ morphId }) => morphId === activeDeclensionId,
  );
  if (!unitForm) {
    return <span>No active declension</span>;
  }

  const details = fetchDeclensionDetails(unitForm[0]);
  const keys = Object.keys(details);
  const isComplete = user?.progress
    .vocabulary?.find((vcb) => vcb.id === unitForm[0].vocabId)?.isComplete;

  const handleButtonClick = (settingId: string, settingType: string) => {
    console.log(settingId);

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
    if (settingType !== 'Word') { return; }
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
        isComplete: !isComplete,
      });
    } else {
      targetProgressItem.isComplete = !isComplete;
    }

    setUser(updatedUser);
  };

  return (
    <div className={activeTheme === 'light' ? 'SettingsMenu MenuLight' : 'SettingsMenu MenuDark'}>
      <div id="details-menu" className="SettingsMenuTab MenuActive">
        {
          details.root ? <h1 className="MenuTabTitle GreekText">{`${details.root.name}`}</h1> : ''
        }
        <div className="DetailsSection">
          {
          // @ts-ignore
          keys.filter((key) => !!details[key])
            .map((key) => (
              <div className="DetailsItem" key={`detail-${key}`}>
                <span className="DetailsLabel">{key}</span>
                <span className={`DetailsValue ${key === 'root' ? 'GreekText' : ''}`}>
                  {
                    // @ts-ignore
                    details[key].name
                  }
                </span>
              </div>
            ))
          }
        </div>
        <div className="DetailsSection">
          <button
            className="SettingsButton"
            type="button"
            onClick={() => handleButtonClick(unitForm[0].vocabId, 'Word')}
          >
            {
              isComplete ? 'I don’t know this word' : 'Don’t translate this word anymore?'
            }
          </button>
          {/* <h2>Relevant Links</h2> */}
        </div>
      </div>
    </div>
  );
}

export default DetailsMenu;

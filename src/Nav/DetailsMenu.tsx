import './DetailsMenu.css';
import { useContext } from 'react';
import { UserContext } from '../User/User';
import { fetchMorphologyById, fetchMorphologyDetailsByMorphologyId } from '../LanguageData/LanguageData';

function DetailsMenu({ activeMorphologyId } : { activeMorphologyId: number }) {
  const { user, setUser } = useContext(UserContext);
  const activeTheme = !user?.settings.prefersDarkMode ? 'light' : 'dark';

  const unitForm = fetchMorphologyById(activeMorphologyId);
  if (!unitForm) {
    return <span>No active declension</span>;
  }

  const details = fetchMorphologyDetailsByMorphologyId(activeMorphologyId);
  const detailKeys = Object.keys(details);
  const isComplete = user?.progress
    .vocabulary?.find((vcb) => vcb.id === unitForm.wordId)?.isComplete;

  const handleButtonClick = (settingId: number, settingType: string) => {
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
          details.root ? <h1 className="MenuTabTitle GreekText">{`${details.root}`}</h1> : ''
        }
        <div className="DetailsSection">
          {
          // @ts-ignore
          detailKeys.filter((key) => !!details[key])
            .map((key) => (
              <div className="DetailsItem" key={`detail-${key}`}>
                <span className="DetailsLabel">{key}</span>
                <span className={`DetailsValue ${key === 'root' ? 'GreekText' : ''}`}>
                  {
                    // @ts-ignore
                    // details[key].name
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
            onClick={() => handleButtonClick(unitForm.wordId, 'Word')}
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

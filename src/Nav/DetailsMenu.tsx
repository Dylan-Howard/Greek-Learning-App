import './DetailsMenu.css';
import { useContext, useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import { UserContext } from '../User/User';
import * as AzureTextService from '../LanguageData/AzureTextService';
import { DetailsSkeleton } from '../Skeletons/Skeletons';
// import * as UserService from '../User/UserService';

function DetailsMenu({ activeMorphologyId } : { activeMorphologyId: number }) {
  // const { user, setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [morphology, setMorphology] = useState({
    content: null,
    details: [
      { field: '', value: '' },
    ],
  });

  const activeTheme = !user?.settings.prefersDarkMode ? 'light' : 'dark';

  const unitForm = AzureTextService.fetchMorphologyDetails(activeMorphologyId);
  if (!unitForm) {
    return <span>No active declension</span>;
  }

  useEffect(() => {
    setIsLoading(true);
    AzureTextService.fetchMorphologyDetails(activeMorphologyId)
      .then((dtl) => {
        const details: { field: string, value: string }[] = [];
        details.push({ field: 'Part of Speech', value: dtl.posName });
        if (dtl.caseName) { details.push({ field: 'Case', value: dtl.caseName }); }
        if (dtl.tenseName) { details.push({ field: 'Tense', value: dtl.tenseName }); }
        if (dtl.voiceName) { details.push({ field: 'Voice', value: dtl.voiceName }); }
        if (dtl.moodName) { details.push({ field: 'Mood', value: dtl.moodName }); }
        if (dtl.personName) { details.push({ field: 'Person', value: dtl.peronName }); }
        if (dtl.numberName) { details.push({ field: 'Number', value: dtl.numberName }); }
        if (dtl.genderName) { details.push({ field: 'Gender', value: dtl.genderName }); }
        if (dtl.patternName) { details.push({ field: 'Pattern', value: dtl.patternName }); }
        if (dtl.degreeName) { details.push({ field: 'Degree', value: dtl.degreeName }); }
        details.push({ field: 'Root', value: dtl.rootName });

        setMorphology({
          content: dtl.content,
          details,
        });
        setIsLoading(false);
      });
  }, [activeMorphologyId]);

  // const detailKeys = Object.keys(details);

  // @TODO - calc isComplete to toggle by word
  // const isComplete = user?.progress
  //   .vocabulary?.find((vcb) => vcb.id === unitForm.wordId)?.isComplete;

  // const handleButtonClick = (settingId: number, settingType: string) => {
  //   /* Guards if no active user is set */
  //   if (!user) { return; }
  //   const updatedUser = {
  //     progress: {
  //       ...user.progress,
  //     },
  //     settings: {
  //       ...user.settings,
  //     },
  //   };
  //   /* Guards from non-existant settings */
  //   if (settingType !== 'Word') { return; }
  //   const settingsTypeMap = { Lesson: 'lessons', Word: 'vocabulary' };
  //   const targetSettingType = settingsTypeMap[settingType];

  //   /* Selects the target list */
  //   if (
  //     targetSettingType !== 'lessons'
  //     && targetSettingType !== 'vocabulary'
  //   ) { return; }
  //   const targetProgressList = updatedUser.progress[targetSettingType];
  //   if (!targetProgressList) { return; }

  //   const targetProgressItem = targetProgressList.find((prg) => prg.id === settingId);
  //   if (!targetProgressItem) {
  //     targetProgressList.push({
  //       id: settingId,
  //       isComplete: !isComplete,
  //     });
  //   } else {
  //     targetProgressItem.isComplete = !isComplete;
  //   }

  //   setUser(updatedUser);
  //   UserService.saveLocalUser(user);
  // };

  if (isLoading) {
    return (
      <div className={activeTheme === 'light' ? 'SettingsMenu MenuLight' : 'SettingsMenu MenuDark'}>
        <DetailsSkeleton />
      </div>
    );
  }

  return (
    <div className={activeTheme === 'light' ? 'SettingsMenu MenuLight' : 'SettingsMenu MenuDark'}>
      { isLoading ? <DetailsSkeleton /> : '' }
      <div id="details-menu" className="SettingsMenuTab MenuActive">
        <h1 className="MenuTabTitle GreekText">{`${morphology.content}`}</h1>
        <div className="DetailsSection">
          {
            morphology.details.map(({ field, value }) => (
              <div className="DetailsItem" key={`detail-${field}`}>
                <span className="DetailsLabel">{field}</span>
                <span className={`DetailsValue ${field === 'root' ? 'GreekText' : ''}`}>{value}</span>
              </div>
            ))
          }
        </div>
        <div className="DetailsSection">
          {/* @TODO - calc isComplete to toggle by word */}
          {/* <Button
            size="small"
            fullWidth
            onClick={() => handleButtonClick(unitForm.wordId, 'Word')}
            sx={{ textTransform: 'none' }}
          >
            { isComplete ? 'I don’t know this word' : 'I know this word' }
          </Button> */}
          {/* <h2>Relevant Links</h2> */}
        </div>
      </div>
    </div>
  );
}

export default DetailsMenu;

/**
 * Text Unit
 */
import { useEffect, useState } from 'react';
import { Unit } from '../LanguageData/Text';
import { useUserContext } from '../User/User';
import * as AzureTextService from '../LanguageData/AzureTextService';
import * as UserService from '../User/UserService';

function TextUnit({ unit, onClick }: { unit: Unit, onClick: Function }) {
  const { user } = useUserContext();
  const [morphology, setMorphology] = useState({
    content: '',
    morphologyId: 0,
    posId: 0,
    caseId: 0,
    tenseId: 0,
    voiceId: 0,
    moodId: 0,
    personId: 0,
    numberId: 0,
    genderId: 0,
    patternId: 0,
    degreeId: 0,
    wordId: 0,
  });
  const [details, setDetails] = useState({});
  const [abbreviation, setAbbreviation] = useState('');

  useEffect(() => {
    AzureTextService.fetchMorphology(unit.morphologyId)
      .then((mph) => { setMorphology(mph); });
    AzureTextService.fetchMorphologyDetails(unit.morphologyId)
      .then((dtl) => { setDetails(dtl); });
    AzureTextService.fetchMorphologyAbbreviation(unit.morphologyId)
      .then((abb) => { setAbbreviation(abb); });
  }, []);

  let isRecognizable = 'recognizable';
  if (user) {
    isRecognizable = UserService.doesUserRecognize(morphology, user);
  }

  const primaryText = isRecognizable === 'unrecognizable' ? (unit.en || unit.content) : unit.content;
  const helpText = morphology && isRecognizable === 'needsHelps' ? `[${abbreviation}]` : '';

  if (unit && details) {
    return (
      <span
        className={details ? 'TextUnit HiglightOnHover' : 'TextUnit'}
        onClick={(e) => onClick(e)}
        onKeyUp={(e) => onClick(e)}
        onTouchEnd={(e) => onClick(e)}
        role="button"
        tabIndex={0}
      >
        <span className="TextUnitPrimary">{` ${primaryText}`}</span>
        { helpText ? <span className="TextUnitHelp">{` ${helpText}`}</span> : '' }
      </span>
    );
  }
  return <span className="TextUnit">{`${primaryText}`}</span>;
}

export default TextUnit;

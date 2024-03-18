/**
 * Text Unit
 */

import { Unit } from '../typescript/Text';
import { useUserContext } from '../User/User';
import * as TextService from '../LanguageData/LanguageData';
import * as UserService from '../LanguageData/UserService';

function TextUnit({ unit, onClick }: { unit: Unit, onClick: Function }) {
  const declension = TextService.fetchMorphologyByUnitId(unit.unitId);
  const { user } = useUserContext();

  let isRecognizable = 'recognizable';
  if (user) {
    isRecognizable = UserService.doesUserRecognize(declension, user);
  }

  const details = declension
    ? TextService.fetchMorphologyDetailsByMorphologyId(unit.morphologyId)
    : undefined;

  let textContent;
  if (declension && isRecognizable === 'recognizable') {
    textContent = unit.content;
  } else if (declension && isRecognizable === 'needsHelps') {
    textContent = `${unit.content} ${TextService.stringifyShorthandDetails(details)}`;
  } else {
    textContent = unit.en || unit.content;
  }

  // console.log(unit);
  // console.log(textContent);

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
        {` ${textContent}`}
      </span>
    );
  }
  return <span className="TextUnit">{`${textContent}`}</span>;
}

export default TextUnit;

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

  const primaryText = isRecognizable === 'unrecognizable' ? (unit.en || unit.content) : unit.content;
  let helpText;
  if (declension && isRecognizable === 'needsHelps') {
    helpText = TextService.stringifyShorthandDetails(details);
  }

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
        {
          helpText ? <span className="TextUnitHelp">{` ${helpText}`}</span> : ''
        }
      </span>
    );
  }
  return <span className="TextUnit">{`${primaryText}`}</span>;
}

export default TextUnit;

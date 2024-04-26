/**
 * Text Unit
 */
import { Unitv2 } from '../LanguageData/Text';

function TextUnit({ unit, onClick }: { unit: Unitv2, onClick: Function }) {
  const { morphologyId, content, helpText } = unit;
  if (morphologyId) {
    return (
      <span
        className="TextUnit HiglightOnHover"
        onClick={(e) => onClick(e)}
        onKeyUp={(e) => onClick(e)}
        onTouchEnd={(e) => onClick(e)}
        role="button"
        tabIndex={0}
      >
        <span className="TextUnitPrimary">{` ${content}`}</span>
        { helpText ? <span className="TextUnitHelp">{` ${helpText}`}</span> : '' }
      </span>
    );
  }
  return <span className="TextUnit">{`${content}`}</span>;
}

export default TextUnit;

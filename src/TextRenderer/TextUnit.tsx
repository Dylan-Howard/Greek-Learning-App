/**
 * Text Unit
 */

import declensions from '../data/declensions.json';
import { Unit } from '../typescript/Text';
import { useUserContext } from '../User/User';

function TextUnit({ unit, onClick }: { unit: Unit, onClick: Function }) {
  const fetchDeclension = (unt: Unit) => (
    declensions.declensions.find((dcl) => dcl.declensionId === unt.declensionId)
  );

  const isRecognizable = (unt: Unit) => {
    const { user } = useUserContext();
    if (!user || !user.progress.lessons || !user.progress.vocabulary) { return 'unrecognizable'; }
    const { lessons, vocabulary } = user.progress;

    const declension = fetchDeclension(unt);
    if (!declension) { return 'unrecognizable'; }
    const {
      countId,
      genderId,
      tenseId,
      voiceId,
      moodId,
      personId,
      patternId,
      vocabId,
    } = declension;

    const progressCheck = [
      countId ? lessons.find(({ id }) => id === countId)?.isComplete : true,
      genderId ? lessons.find(({ id }) => id === genderId)?.isComplete : true,
      tenseId ? lessons.find(({ id }) => id === tenseId)?.isComplete : true,
      voiceId ? lessons.find(({ id }) => id === voiceId)?.isComplete : true,
      moodId ? lessons.find(({ id }) => id === moodId)?.isComplete : true,
      personId ? lessons.find(({ id }) => id === personId)?.isComplete : true,
      patternId ? lessons.find(({ id }) => id === patternId)?.isComplete : true,
      vocabId ? vocabulary.find(({ id }) => id === vocabId)?.isComplete : true,
    ];

    if (progressCheck.some((prg) => !prg)) {
      return progressCheck[7] ? 'needsHelps' : 'unrecognizable';
    }

    return 'recognizable';
  };

  const textContentMap = {
    unrecognizable: unit.en || unit.content,
    needsHelps: `${unit.content} []`,
    recognizable: unit.content,
  };
  const textContent = textContentMap[isRecognizable(unit)];

  if (unit) {
    return (
      <span
        className="TextUnit HiglightOnHover"
        onClick={(e) => onClick(e)}
        onKeyUp={(e) => onClick(e)}
        role="button"
        tabIndex={0}
      >
        {`${textContent} `}
      </span>
    );
  }
  return <span className="TextUnit HiglightOnHover">test</span>;
}

export default TextUnit;

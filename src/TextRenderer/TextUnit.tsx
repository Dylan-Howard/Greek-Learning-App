/**
 * Text Unit
 */

import declensions from '../data/declensions.json';
import { Unit } from '../typescript/Text';
import { useUserContext } from '../User/User';

function TextUnit({ unit }: { unit: Unit | undefined }) {
  const fetchDeclension = (unt: Unit) => (
    declensions.declensions.find((dcl) => dcl.declensionId === unt.declensionId)
  );

  const isRecognizable = (unt: Unit) => {
    const { user } = useUserContext();
    if (!user || !user.progress.lessons) { return true; }

    const { lessons } = user.progress;
    const declension = fetchDeclension(unt);

    const progressCheck = [
      declension?.countId
        ? lessons.find((lsn) => lsn.id === declension.countId)?.isComplete
        : false,
      declension?.genderId
        ? lessons.find((lsn) => lsn.id === declension.genderId)?.isComplete
        : false,
      declension?.tenseId
        ? lessons.find((lsn) => lsn.id === declension.tenseId)?.isComplete
        : false,
      declension?.voiceId
        ? lessons.find((lsn) => lsn.id === declension.voiceId)?.isComplete
        : false,
      declension?.moodId
        ? lessons.find((lsn) => lsn.id === declension.moodId)?.isComplete
        : false,
      declension?.personId
        ? lessons.find((lsn) => lsn.id === declension.personId)?.isComplete
        : false,
      declension?.patternId
        ? lessons.find((lsn) => lsn.id === declension.patternId)?.isComplete
        : false,
    ];

    // console.log(unt);
    // console.log(progressCheck);

    return progressCheck.includes(false);
  };

  if (unit) {
    return (
      <span className="TextUnit HiglightOnHover">
        {`${isRecognizable(unit) ? unit.content : unit.en} `}
      </span>
    );
  }
  return <span className="TextUnit HiglightOnHover">test</span>;
}

export default TextUnit;

import './DetailsMenu.css';
import { Declension, DeclensionDetails } from '../typescript/Text';
import declensions from '../data/declensions.json';
import forms from '../data/grammaticalForms.json';
import vocab from '../data/vocabulary.json';

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

function DetailsMenu({ activeDeclensionId } : { activeDeclensionId: number }) {
  const unitForm = declensions.declensions.filter(
    ({ declensionId }) => declensionId === activeDeclensionId,
  );
  if (!unitForm) {
    return <span>No active Declension</span>;
  }

  const details = fetchDeclensionDetails(unitForm[0]);

  const keys = Object.keys(details);
  return (
    <div className="SettingsMenu">
      <div id="details-menu" className="SettingsMenuTab MenuActive">
        {
          details.root ? <h1 className="MenuTabTitle GreekText">{`${details.root.name}`}</h1> : ''
        }
        <div className="DetailsSection">
          {
          // @ts-ignore
          keys.filter((key) => !!details[key])
            .map((key) => (
            // @ts-ignore
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
          {/* <h2>Relevant Links</h2> */}
        </div>
      </div>
    </div>
  );
}

export default DetailsMenu;

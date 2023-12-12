
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import vocab from "../data/vocab.json" assert { type: "json" };
import declensions from "../data/declensions.json" assert { type: "json" };
import grammaticalForms from "../data/grammaticalForms.json" assert { type: "json" };

const dictionary = vocab.dictionary;
const forms = grammaticalForms.grammaticalForms;

const fetchDeclensionDetails = (declension) => ({
  type: declension.tenseId ? { name: "verb" } : { name: "noun" },
  tense: declension.tenseId ? forms.find((form) => declension.tenseId === form.formId) : undefined,
  voice: declension.voiceId ? forms.find((form) => declension.voiceId === form.formId) : undefined,
  mood: declension.moodId ? forms.find((form) => declension.moodId === form.formId) : undefined,
  person: declension.personId ? forms.find((form) => declension.personId === form.formId) : undefined,
  count: declension.countId ? forms.find((form) => declension.countId === form.formId) : undefined,
  gender: declension.genderId ? forms.find((form) => declension.genderId === form.formId) : undefined,
  pattern: declension.patternId ? forms.find((form) => declension.patternId === form.formId) : null,
  root: declension.vocabId ? { name: dictionary.find((vocab) => declension.vocabId === vocab.vocabId).content } : undefined,
  gloss: declension.vocabId ? { name: dictionary.find((vocab) => declension.vocabId === vocab.vocabId).gloss } : undefined,
});

const stringifyDeclensionDetails = ({
  tense, voice, mood, person, count, gender, pattern, root
}) => {
  const details = [];
  if (root) { details.push(`[${root.name}:`) }
  /* Verb Details */
  if (tense) { details.push(`${tense.name} `); }
  if (voice) { details.push(`${voice.name} `); }
  if (mood) { details.push(`${mood.name} `) }
  if (person) { details.push(`${person.name}`) }
  if (tense && person) { details.push("]") }
  /* Noun Details */
  if (count) { details.push(`${count.name} `) }
  if (gender) { details.push(`${gender.name} `) }
  if (pattern) { details.push(`${pattern.name}]`) }

  return details.join('');
};

const stringifyShorthandDeclensionDetails = ({
  tense, voice, mood, person, count, gender, pattern, root
}) => {
  const details = [];
  if (root) { details.push(`[${root.name}: `) }
  /* Verb Details */
  if (tense) { details.push(`${tense.short}`); }
  if (voice) { details.push(`${voice.short}`); }
  if (mood) { details.push(`${mood.short}`) }
  if (person) { details.push(`${person.short}`) }
  if (tense && person) { details.push("]") }
  /* Noun Details */
  if (count) { details.push(`${count.short}`) }
  if (gender) { details.push(`${gender.short}`) }
  if (pattern) { details.push(`${pattern.short}]`) }

  return details.join('');
};

const renderDetailsPopup = (details) => {
  const popupContainer = document.getElementById("popup-container");
  popupContainer.innerHTML = "";

  if (!popupContainer) {
    console.error("Could not locate the element: #popup-container");
    return undefined;
  }

  // const labels = Object.getOwnPropertyNames(details)
  Object.getOwnPropertyNames(details)
    .filter((lbl) => !!details[lbl])
    .forEach((dtl) => {
      const detailsSection = document.createElement("div");

      detailsSection.classList.add("details-section");
      const detailsLabel = document.createElement("span");
      detailsLabel.classList.add("details-label");
      detailsLabel.textContent = dtl;
      detailsSection.appendChild(detailsLabel);

      const detailsContent = document.createElement("span");
      detailsContent.classList.add("details-content");
      detailsContent.textContent = details[dtl].name;
      detailsSection.appendChild(detailsContent);

      popupContainer.appendChild(detailsSection);
  });
};

const renderVerse = (verse, userDictionary, userLessons) => {
  /* Creates text conatiner */
  const textContainer = document.getElementById("renderedText");
  textContainer.textContent = "";

  /* Creates verse indicator */
  const verseIndicator = document.createElement("span");
  verseIndicator.textContent = verse.verseNumber;
  textContainer.appendChild(verseIndicator);

  /* Creates span element for each literary unit */
  verse.units.forEach((unit) => {
    const unitElement = document.createElement("span");
    unitElement.classList.add("text-unit");

    /**
     * @TODO insert content based on userLessons
     * @TODO add hover class if is a literary unit and 
     */
    const declension = declensions.declensions.find((declension) => declension.declensionId == unit.declensionId);
    // let isUnitRecognizable = true;
    let unitContent = '';

    if (declension) {
      console.log("Rendering Declension");
      const userVocab = userDictionary.find((vcb) => vcb.vocabId == declension.vocabId);

      if (userVocab && userVocab.isComplete) {
        unitContent = unit.content;
        const details = fetchDeclensionDetails(declension);

        const detailFields = Object.keys(details)
          .filter((fld) => !!details[fld]);

        const userProgress = detailFields.map(
          (dtl) => {
              if (details[dtl].lessonId) {
                const userLesson = userLessons.find((lsn) => lsn.lessonId === details[dtl].lessonId);
                if (userLesson) {
                  return userLesson.isComplete;
                }
              }
              return true;
            }
          );
        const isGrammarRecognizable = userProgress.every((prg) => !!prg);
        console.log(details);
        unitContent = isGrammarRecognizable ? unit.content : stringifyShorthandDeclensionDetails(details);
        console.log(unitContent);
      } else {
        unitContent = unit.en;
      }
    }
    unitElement.textContent = unitContent;

    if (unit.declensionId) {
      unitElement.dataset.declensionId = unit.declensionId;
    }

    /** @TODO remove space from innerHTML if punctuation. */
    textContainer.innerHTML = textContainer.innerHTML + " ";
    
    textContainer.appendChild(unitElement);
  });
};

const renderText = (text, userDictionary, userLessons) => {
  console.log("Rendering text");
  // console.log(userLessons);
  const testChapter = text.chapters[0];
  const testVerse = testChapter.verses[0];
  renderVerse(testVerse, userDictionary, userLessons);

  /* Attaches listener for click events on text units */
  const units = document.querySelectorAll("span.text-unit");
  units.forEach((el) => el.addEventListener(
    "click",
    (e) => {
      /* Matches delcension document for the literary unit */
      const declensionId = e.currentTarget.dataset.declensionId;
      /* Matches delcension document for the literary unit */
      const declension = declensions.declensions.find((declension) => declension.declensionId == declensionId);
      if (declension) {
        const details = fetchDeclensionDetails(declension);
        renderDetailsPopup(details);
        return details;
      }
      console.log("Could not match unit to declension details.");
      renderDetailsPopup({
        error: {
          name: "Could not match literary unit to declension details.",
        },
      });
      return null;
    }
  ));
};

export default renderText;

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
  tense, voice, mood, person, count, gender, pattern, root, gloss
}) => {
  const details = [];
  /* Verb Details */
  if (tense) { details.push(`${tense.name} `); }
  if (voice) { details.push(`${voice.name} `); }
  if (mood) { details.push(`${mood.name} `) }
  if (person) { details.push(`${person.name} `) }
  /* Noun Details */
  if (count) { details.push(`${count.name} `) }
  if (gender) { details.push(`${gender.name} `) }
  if (pattern) { details.push(`${pattern.name} `) }
  if (root) { details.push(`(${root.name}): `) }
  if (vocab) { details.push(gloss.name) }
  // if (vocab) { details.push(`(${vocab.content}): ${vocab.gloss}`) }

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

const renderVerse = (vrs) => {
  /* Creates text conatiner */
  const textContainer = document.getElementById("renderedText");
  textContainer.textContent = "";

  /* Creates verse indicator */
  const verseIndicator = document.createElement("span");
  verseIndicator.textContent = vrs.verseNumber;
  textContainer.appendChild(verseIndicator);

  /* Creates span element for each literary unit */
  vrs.units.forEach((unit) => {
    const unitElement = document.createElement("span");
    unitElement.classList.add("text-unit");

    /**
     * @TODO insert content based on userLessons
     * @TODO add hover class if is a literary unit and 
     */
    unitElement.textContent = unit.content;

    if (unit.declensionId) {
      unitElement.dataset.declensionId = unit.declensionId;
    }

    /** @TODO remove space from innerHTML if punctuation. */
    textContainer.innerHTML = textContainer.innerHTML + " ";
    
    textContainer.appendChild(unitElement);
  });
};

const renderText = (text) => {
  const testChapter = text.chapters[0];
  const testVerse = testChapter.verses[0];
  renderVerse(testVerse);

  /* Attaches listener for click events on text units */
  const units = document.querySelectorAll("span.text-unit");
  units.forEach((el) => el.addEventListener(
    "click",
    (e) => {
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
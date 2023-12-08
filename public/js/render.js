
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import text from "../data/text.json" assert { type: "json" };
import vocab from "../data/vocab.json" assert { type: "json" };
import declensions from "../data/declensions.json" assert { type: "json" };
import grammaticalForms from "../data/grammaticalForms.json" assert { type: "json" };

const dictionary = vocab.dictionary;
const forms = grammaticalForms.grammaticalForms;

const testText = text.texts[0];
const testChapter = testText.chapters[0];
const testVerse = testChapter.verses[0];

const fetchDeclensionDetails = (declension) => ({
  type: declension.tenseId ? "verb" : "noun",
  tense: declension.tenseId ? forms.find((form) => declension.tenseId === form.formId) : undefined,
  voice: declension.voiceId ? forms.find((form) => declension.voiceId === form.formId) : undefined,
  mood: declension.moodId ? forms.find((form) => declension.moodId === form.formId) : undefined,
  person: declension.personId ? forms.find((form) => declension.personId === form.formId) : undefined,
  count: declension.countId ? forms.find((form) => declension.countId === form.formId) : undefined,
  gender: declension.genderId ? forms.find((form) => declension.genderId === form.formId) : undefined,
  pattern: declension.patternId ? forms.find((form) => declension.patternId === form.formId) : null,
  vocab: declension.vocabId ? dictionary.find((vocab) => declension.vocabId === vocab.vocabId) : undefined,
});

const stringifyDeclensionDetails = (declension) => {
  const details = [];
  /* Verb Details */
  if (declension.tense) { details.push(`${declension.tense.name} `) }
  if (declension.voice) { details.push(`${voice.name} `) }
  if (declension.mood) { details.push(`${mood.name} `) }
  if (declension.person) { details.push(`${person.name} `) }
  /* Noun Details */
  if (declension.count) { details.push(`${declension.count.name} `) }
  if (declension.gender) { details.push(`${declension.gender.name} `) }
  if (declension.pattern) { details.push(`${declension.pattern.name} `) }
  if (declension.vocab) { details.push(`(${declension.vocab.content}): ${declension.vocab.gloss}`) }

  return details.join('');
};

const renderDetailsPopup = (details) => {
  const popupContainer = document.getElementById("popup-container");
  popupContainerContainer.innerHTML = "";

  const detailsSection = document.createElement("div");
  
  detailsSection.classList.add("details-section");
    // unitElement.dataset.declensionId = unit.declensionId;
  const detailsLabel = document.createElement("span");
  detailsLabel.classList.add("details-label");
  detailsLabel.textContent = "testLabel";

  const detailsContent = document.createElement("span");
  detailsContent.classList.add("details-content");
  detailsContent.textContent = "testContent";
  // <div class="details-section">
  //         <span class="details-label">Unit Type</span>
  //         <span class="details-content">Verb</span>
  //       </div>
  //       <div class="details-section">
  //         <span class="details-label">Tense</span>
  //         <span class="details-content">Verb</span>
  //       </div>
  //       <div class="details-section">
  //         <span class="details-label">Voice</span>
  //         <span class="details-content">Verb</span>
  //       </div>
  //       <div class="details-section">
  //         <span class="details-label">Mood</span>
  //         <span class="details-content">Verb</span>
  //       </div>
  //       <div class="details-section">
  //         <span class="details-label">Person</span>
  //         <span class="details-content">Verb</span>
  //       </div>
  //       <div class="details-section">
  //         <span class="details-label">Count</span>
  //         <span class="details-content">Verb</span>
  //       </div>
};

/**
 * Initiate Text Rendering
 */
(() => {
  const textContainer = document.getElementById("renderedText");
  textContainer.textContent = "";

  const verseIndicator = document.createElement("span");
  verseIndicator.textContent = testVerse.verseNumber;
  textContainer.appendChild(verseIndicator);

  testVerse.units.forEach((unit) => {
    /* Creates span element for each literary unit */
    const unitElement = document.createElement("span");
    unitElement.textContent = unit.content;
    unitElement.classList.add("text-unit");
    unitElement.dataset.declensionId = unit.declensionId;

    textContainer.innerHTML = textContainer.innerHTML + "&nbsp;";
    textContainer.appendChild(unitElement);
  });
  /* Attaches listener for click events on text units */
  const units = document.querySelectorAll("span.text-unit");
  units.forEach((el) => el.addEventListener(
    "click",
    (e) => {
      const declensionId = e.currentTarget.dataset.declensionId;
      // console.log(`declensionId: ${declensionId}`);
      /* Matches delcension document for the literary unit */
      const declension = declensions.declensions.find((declension) => declension.declensionId == declensionId);
      // console.log(declension);
      if (declension) {
        // const details = renderDeclensionDetails(declension);
        const details = fetchDeclensionDetails(declension);
        const detailsString = stringifyDeclensionDetails(details);
        console.log(detailsString);
        return details;
      }
      console.log("Could not match unit to declension details.");
      return null;
    }
  ));
})();

// document.createRange()
// createContextualFragment()

/**
 * 
 * Backup
 * 
 */

// const renderVerse = (vrs) => {
//   const textUnits = vrs.units;

//   const unitAttributes = 'class="text-unit" onclick="renderUntiDetails()"';
//   const unitContent = textUnits.map((unit) => `<span ${unitAttributes}>${unit.content}</span>`);
//   console.log(unitContent);
//   unitContent.splice(0, 0, `<span>${vrs.verseNumber}</span>`);
//   // unitContent.push();

//   // document.getElementById("renderedText").setHTML(unitContent);
//   return unitContent.join(' ');
// }
// document.getElementById("renderedText").innerHTML = renderVerse(testVerse);

// const unit = {
//   content: "Ὃ",
//   declensionId: 1,
// };

// const declesion = {
//   declensionId: 1,
//   rootId: 1,
//   lessonId: 1,
// };

// const root = {
//   rootId: 1,
//   vocabId: 1,
// };

// const vocab = {
//   vocabId: 1,
//   content: "ὁ, ἡ, τό",
//   gloss: "the",
//   occurances: 19864,
// };

// const userLessons = {
//   userId: 1,
//   lessons: [
//     {
//       lessonId: 1,
//       isComplete: true,
//     },
//   ],
// };

// const userVocabulary = {
//   userId: 1,
//   vocabulary: [
//     {
//       vocabId: 1,
//       correct: 50,
//       remindDate: "2023-12-30",
//     },
//   ],
// };

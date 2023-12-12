
import vocab from "../data/vocab.json" assert { type: "json" };

// /** Initiates user without any lessons complete */
const USER_DICTIONARY = vocab.dictionary;
USER_DICTIONARY.forEach((vcb) => vcb.isComplete = true);

/**
 * Initiate Text Rendering
 */
(() => {
  const settingsMenu = document.getElementById("settings-menu");
  settingsMenu.textContent = "";

  const menuLabel = document.createElement("span");
  menuLabel.classList.add("menu-label");
  menuLabel.textContent = "Dictionary";
  settingsMenu.appendChild(menuLabel);

  vocab.dictionary.forEach((vcb) => {
    /* Creates span element for each literary unit */
    const settingsOption = document.createElement("input");
    settingsOption.setAttribute("type","checkbox");
    settingsOption.setAttribute("id",`vocab-${vcb.vocabId}`);
    settingsOption.setAttribute(
      "checked",
      USER_DICTIONARY.find((dic) => dic.vocabId == vcb.vocabId).isComplete,
    )
    settingsOption.classList.add("settings-option");
    settingsOption.dataset.vocabId = vcb.vocabId;

    settingsMenu.innerHTML = settingsMenu.innerHTML;
    settingsMenu.appendChild(settingsOption);

    const settingsLabel = document.createElement("label");
    settingsLabel.setAttribute("for",`vocab-${vcb.vocabId}`);
    settingsLabel.classList.add("settings-label");
    settingsLabel.textContent = vcb.content;

    settingsMenu.innerHTML = settingsMenu.innerHTML;
    settingsMenu.appendChild(settingsLabel);
  });
  /* Attaches listener for click events on text units */
  const settings = document.querySelectorAll('#settings-menu > input[type="checkbox"]');
  // console.log(settings)
  // const units = document.querySelectorAll("#testCheck");
  
  /* On change, update `userLessons` based on checkbox */
  settings.forEach((el) => el.addEventListener(
    "change",
    ({ currentTarget }) => {
      userDictionary.find(
        (vcb) => vcb.vocabId == currentTarget.dataset.vocabId
      ).isComplete = currentTarget.checked;
    }
  ));
})();
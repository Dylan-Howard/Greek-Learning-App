/**
 * Initiate Vocab Settings Menu Rendering
 */
const vocabMenu = (appDictionary, userDictionary, menuId) => {
  const settingsMenu = document.getElementById(menuId);
  if (!settingsMenu) {
    console.log(`No menu found: ${menuId}`);
    return;
  }
  settingsMenu.textContent = "";

  const menuLabel = document.createElement("span");
  menuLabel.classList.add("menu-label");
  menuLabel.textContent = "Dictionary";
  settingsMenu.appendChild(menuLabel);

  appDictionary.forEach((vcb) => {
    /* Creates span element for each literary unit */
    const settingsOption = document.createElement("input");
    settingsOption.setAttribute("type", "checkbox");
    settingsOption.setAttribute("id", `vocab-${vcb.vocabId}`);
    settingsOption.setAttribute(
      "checked",
      userDictionary.find((dic) => dic.vocabId === vcb.vocabId).isComplete,
    );
    settingsOption.classList.add("settings-option");
    settingsOption.dataset.vocabId = vcb.vocabId;

    settingsMenu.appendChild(settingsOption);

    const settingsLabel = document.createElement("label");
    settingsLabel.setAttribute("for", `vocab-${vcb.vocabId}`);
    settingsLabel.classList.add("settings-label");
    settingsLabel.textContent = vcb.content;

    settingsMenu.appendChild(settingsLabel);
  });

  /* Attaches listener for click events on text units */
  const settings = document.querySelectorAll(
    `#${menuId} > input[type="checkbox"]`,
  );

  /* On change, update `userDictionary` based on checkbox */
  settings.forEach((el) =>
    el.addEventListener("change", ({ currentTarget }) => {
      const userVocab = userDictionary.find(
        (vcb) => vcb.vocabId === parseInt(currentTarget.dataset.vocabId, 10),
      );
      userVocab.isComplete = currentTarget.checked;
    }),
  );
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export default vocabMenu;

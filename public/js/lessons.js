/**
 *
 */
const lessonsMenu = (appLessons, userLessons, menuId) => {
  const settingsMenu = document.getElementById(menuId);
  settingsMenu.textContent = "";

  const menuLabel = document.createElement("span");
  menuLabel.classList.add("menu-label");
  menuLabel.textContent = "Lessons";
  settingsMenu.appendChild(menuLabel);

  appLessons.forEach((lsn) => {
    /* Creates span element for each literary unit */
    const settingsOption = document.createElement("input");
    settingsOption.setAttribute("type", "checkbox");
    settingsOption.setAttribute("id", `lesson-${lsn.lessonId}`);
    settingsOption.setAttribute(
      "checked",
      userLessons.find((usl) => usl.lessonId === lsn.lessonId).isComplete,
    );
    settingsOption.classList.add("settings-option");
    settingsOption.dataset.lessonId = lsn.lessonId;

    settingsMenu.appendChild(settingsOption);

    const settingsLabel = document.createElement("label");
    settingsLabel.setAttribute("for", `lesson-${lsn.lessonId}`);
    settingsLabel.classList.add("settings-label");
    settingsLabel.textContent = lsn.title;

    settingsMenu.appendChild(settingsLabel);
  });
  /* Attaches listener for click events on text units */
  const settings = document.querySelectorAll(
    `#${menuId} > input[type="checkbox"]`,
  );

  /* On change, update `userLessons` based on checkbox */
  settings.forEach((el) =>
    el.addEventListener("change", ({ currentTarget }) => {
      const userLesson = userLessons.find(
        (lsn) => lsn.lessonId === parseInt(currentTarget.dataset.lessonId, 10),
      );
      userLesson.isComplete = currentTarget.checked;
    }),
  );
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export default lessonsMenu;

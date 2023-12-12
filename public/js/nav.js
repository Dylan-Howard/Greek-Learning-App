// eslint-disable-next-line node/no-unsupported-features/es-syntax
import vocabMenu from "../js/vocab.js";
import lessonsMenu from "../js/lessons.js";

const mainNav = () => {
  /* Attaches listener for click events on text units */
  const navIcons = document.querySelectorAll(".nav-bar > .nav-icon");

  /* On change, update `userLessons` based on checkbox */
  navIcons.forEach((el) =>
    el.addEventListener("click", () => {
      if (el.classList.contains("nav-active")) {
        el.classList.remove("nav-active");
      } else {
        el.classList.add("nav-active");
      }
    }),
  );
};

/**
 * Initiate Nav Bar
 */
const navbar = (
  appDictionary,
  userDictionary,
  appLessons,
  userLessons,
  { dictionaryMenuId, lessonsMenuId },
) => {
  /* Initializes main navbar */
  mainNav();
  vocabMenu(appDictionary, userDictionary, dictionaryMenuId);
  lessonsMenu(appLessons, userLessons, lessonsMenuId);
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export default navbar;

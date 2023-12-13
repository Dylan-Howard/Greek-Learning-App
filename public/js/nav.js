// eslint-disable-next-line node/no-unsupported-features/es-syntax, import/extensions
import vocabMenu from "./vocab.js";
// eslint-disable-next-line node/no-unsupported-features/es-syntax, import/extensions
import lessonsMenu from "./lessons.js";

const mainNav = () => {
  /* Attaches listener for click events on text units */
  const navIcons = document.querySelectorAll(".nav-bar > .nav-icon");

  /* On change, update `userLessons` based on checkbox */
  navIcons.forEach((el) =>
    el.addEventListener("click", () => {
      /* Deactivate all other navbar icons */
      Array.from(document.getElementsByClassName("nav-active"))
        .filter((nav) => nav.id !== el.id)
        .forEach((nav) => nav.classList.remove("nav-active"));
      /* Deactivate all menu tabs */
      Array.from(document.getElementsByClassName("menu-active"))
        .filter((men) => men.id !== el.dataset.menu)
        .forEach((men) => men.classList.remove("menu-active"));
      /* Toggle navbar icon */
      if (el.classList.contains("nav-active")) {
        el.classList.remove("nav-active");
      } else {
        el.classList.add("nav-active");
      }
      /* Get target menu */
      const targetMenu = document.getElementById(el.dataset.menu);
      if (!targetMenu) {
        return undefined;
      }
      /* Toggle target menu */
      if (targetMenu.classList.contains("menu-active")) {
        targetMenu.classList.remove("menu-active");
      } else {
        targetMenu.classList.add("menu-active");
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

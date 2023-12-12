
import navbar from "../js/nav.js";
import renderText from "../js/render.js";
import vocab from "../data/vocab.json" assert { type: "json" };
import lessons from "../data/lessons.json" assert { type: "json" };
import text from "../data/text.json" assert { type: "json" };

/** Initiates user with all vocab and lessons complete */
const USER_DICTIONARY = vocab.dictionary;
USER_DICTIONARY.forEach((vcb) => vcb.isComplete = true);

const USER_LESSONS = lessons.lessons;
USER_LESSONS.forEach((lsn) => lsn.isComplete = true);

const MENU_CLASS = "settings-menu-tab";

(() => {
  /* Renders Navbar and Settings Menu */
  navbar(
    vocab.dictionary,
    USER_DICTIONARY,
    lessons.lessons,
    USER_LESSONS,
    {
      dictionaryMenuId: "dictionary-menu",
      lessonsMenuId: "lessons-menu"
    }
  );

  /* Renders text */
  const testText = text.texts[0];
  renderText(testText, USER_DICTIONARY, USER_LESSONS);

  /* Attaches listener for click events on text units */
  const settings = document.querySelectorAll(
    `.${MENU_CLASS} > input[type="checkbox"]`,
  );
  /* On change, update `userDictionary` based on checkbox */
  settings.forEach((el) => el.addEventListener(
    "change",
    () => renderText(testText, USER_DICTIONARY, USER_LESSONS),
  ));
})();

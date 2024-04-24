import './Reader.css';
import { useState, useMemo } from 'react';

import { TextContext } from '../LanguageData/Text';
import TextRenderer from '../TextRenderer/TextRenderer';
import Nav from '../Nav/Nav';

const DEFAULT_BOOK_ID = 1;
const DEFAULT_CHAPTER_ID = 1;

function App() {
  /* Context for user details */
  // const { user } = useContext(UserContext);
  // const isOnboarded = user?.settings.isOnboarded === 'true';

  /* States primarily for text rendering */
  const [activeText, setActiveText] = useState({
    bookId: DEFAULT_BOOK_ID,
    chapterId: DEFAULT_CHAPTER_ID,
  });

  /* States for side bar */
  const [activeMorphologyId, setActiveMorphologyId] = useState(-1);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const changeActiveDeclension = (morphologyId: number) => {
    setActiveMorphologyId(morphologyId);
    if (morphologyId === -1) { setActiveTabIndex(0); }
    if (morphologyId !== -1 && activeTabIndex !== 3) { setActiveTabIndex(3); }
  };

  let tabs = [
    { title: 'Home', iconName: 'home' },
    { title: 'Lessons', iconName: 'lessons' },
    { title: 'Dictionary', iconName: 'dictionary' },
  ];

  if (activeMorphologyId !== -1) {
    tabs = [...tabs, { title: 'Details', iconName: 'details' }];
  }

  return (
    <TextContext.Provider
      value={useMemo(() => ({ text: activeText, setText: setActiveText }), [activeText])}
    >
      <div className="Reader">
        <Nav
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          activeMorphologyId={activeMorphologyId}
        />
        <TextRenderer
          changeActiveDeclension={changeActiveDeclension}
        />
      </div>
    </TextContext.Provider>
  );
}

export default App;

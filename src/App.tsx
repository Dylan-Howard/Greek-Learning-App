import './App.css';
import { useState } from 'react';
import fetchUser, { UserContext } from './User/User';
import TextRenderer from './TextRenderer/TextRenderer';
import Nav from './Nav/Nav';

// const TEST_USER_ID = 'user1';
const TEST_USER_ID = 'user2';
const DEFAULT_TEXT_ID = 0;

// eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
const log = (message: any) => console.log(message);

function App() {
  /* State for user details */
  const [activeUser, setActiveUser] = useState(
    fetchUser(TEST_USER_ID),
  );
  /* States for side bar */
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeDeclensionId, setActiveDeclensionId] = useState('0');

  /* States primarily for text rendering */
  const [activeTextIndex, setActiveTextIndex] = useState(DEFAULT_TEXT_ID);
  const [activeChapterIndex, setActiveChapterIndex] = useState('1');

  const tabs = [
    { title: 'Home', iconName: 'home' },
    { title: 'Lessons', iconName: 'play_lesson' },
    { title: 'Dictionary', iconName: 'dictionary' },
    { title: 'Settings', iconName: 'settings' },
  ];

  const changeActiveDeclension = (declensionId: string) => {
    setActiveDeclensionId(declensionId);
    if (!declensionId) { setActiveTabIndex(0); }
    if (declensionId && activeTabIndex !== 4) { setActiveTabIndex(4); }
  };

  if (activeDeclensionId! !== '0') {
    tabs.push({ title: 'Details', iconName: 'chat_info' });
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user: activeUser, setUser: setActiveUser }}>
      <div className="App">
        <Nav
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          activeTextIndex={activeTextIndex}
          activeChapterIndex={activeChapterIndex}
          activeDeclensionId={activeDeclensionId}
        />
        <TextRenderer
          activeTextIndex={activeTextIndex}
          setActiveTextIndex={setActiveTextIndex}
          activeChapterIndex={activeChapterIndex}
          setActiveChapterIndex={setActiveChapterIndex}
          changeActiveDeclension={changeActiveDeclension}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;

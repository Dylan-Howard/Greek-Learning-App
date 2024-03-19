import './Reader.css';
import { useState } from 'react';
import { UserContext } from './User/User';
import TextRenderer from './TextRenderer/TextRenderer';
import Nav from './Nav/Nav';
import * as UserService from './User/UserService';

// const TEST_USER_ID = 'user1';
const TEST_USER_ID = 'user2';
const DEFAULT_BOOK_ID = 0;
const DEFAULT_CHAPTER_ID = 0;

// eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
const log = (message: any) => console.log(message);

const tabs = [
  { title: 'Home', iconName: 'home' },
  { title: 'Lessons', iconName: 'play_lesson' },
  { title: 'Dictionary', iconName: 'dictionary' },
  { title: 'Settings', iconName: 'settings' },
];

const getUser = () => {
  const localUser = localStorage.getItem('koineUser');

  console.log(localUser);

  return localUser ? JSON.parse(localUser) : UserService.fetchUser(TEST_USER_ID);
};

const saveUser = (userData: any) => {
  localStorage.setItem('koineUser', userData);
};

// const clearUserData = () => {
//   localStorage.clear();
// };

function App() {
  /* State for user details */
  const [activeUser, setActiveUser] = useState(getUser());

  /* States for side bar */
  const [activeMorphologyId, setActiveMorphologyId] = useState(-1);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  /* States primarily for text rendering */
  const [activeText, setActiveText] = useState({
    bookId: DEFAULT_BOOK_ID,
    chapterId: DEFAULT_CHAPTER_ID,
  });

  const changeActiveDeclension = (morphologyId: number) => {
    setActiveMorphologyId(morphologyId);
    if (morphologyId === -1) { setActiveTabIndex(0); }
    if (morphologyId !== -1 && activeTabIndex !== 4) { setActiveTabIndex(4); }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUserUpdate = (user: any) => {
    setActiveUser(user);
    saveUser(activeUser);
  };

  if (activeMorphologyId !== -1) {
    tabs.push({ title: 'Details', iconName: 'chat_info' });
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user: activeUser, setUser: setActiveUser }}>
      <div className="Reader">
        <Nav
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          activeText={activeText}
          activeMorphologyId={activeMorphologyId}
        />
        <TextRenderer
          activeText={activeText}
          setActiveText={setActiveText}
          changeActiveDeclension={changeActiveDeclension}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;

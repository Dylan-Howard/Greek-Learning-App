import './Reader.css';
import { useState, useMemo } from 'react';
import { UserContext } from './User/User';
import { TextContext } from './LanguageData/Text';
import TextRenderer from './TextRenderer/TextRenderer';
import Nav from './Nav/Nav';
import * as UserService from './User/UserService';
import OnboardingDialog from './Onboarding/Onboarding';

// const TEST_USER_ID = 'user1';
const DEFAULT_USER_ID = 0;
const DEFAULT_BOOK_ID = 0;
const DEFAULT_CHAPTER_ID = 0;

// eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
const log = (message: any) => console.log(message);

function App() {
  /* State for user details */
  const [activeUser, setActiveUser] = useState(
    UserService.getLocalUser() || UserService.fetchUser(DEFAULT_USER_ID),
  );

  let isOnboarded = false;
  if (UserService.getLocalUser()) { isOnboarded = true; }
  if (!isOnboarded) { log('user is not onboarded'); }

  const createUser = (userTemplateId: number) => {
    log(`Setting user to template id ${userTemplateId}`);
    setActiveUser(UserService.fetchUser(userTemplateId));
    UserService.saveLocalUser(activeUser);
  };

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
    if (morphologyId !== -1 && activeTabIndex !== 4) { setActiveTabIndex(4); }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUserUpdate = (user: any) => {
    setActiveUser(user);
    UserService.saveLocalUser(activeUser);
  };

  let tabs = [
    { title: 'Home', iconName: 'home' },
    { title: 'Lessons', iconName: 'play_lesson' },
    { title: 'Dictionary', iconName: 'dictionary' },
    { title: 'Settings', iconName: 'settings' },
  ];

  if (activeMorphologyId !== -1) {
    tabs = [...tabs, { title: 'Details', iconName: 'chat_info' }];
  }

  return (
    <UserContext.Provider
      value={useMemo(() => ({ user: activeUser, setUser: setActiveUser }), [activeUser])}
    >
      <TextContext.Provider
        value={useMemo(() => ({ text: activeText, setText: setActiveText }), [activeText])}
      >
        <div className="Reader">
          <OnboardingDialog
            show={!isOnboarded}
            onSubmit={createUser}
          />
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
    </UserContext.Provider>
  );
}

export default App;

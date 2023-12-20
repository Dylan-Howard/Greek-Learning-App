import './App.css';
import { useState } from 'react';
import texts from './data/text.json';
import User, { UserContext } from './User/User';
import Nav from './Nav/Nav';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TextRenderer from './TextRenderer/TextRenderer';

const TEST_USER_ID = 'user1';
const TEST_TEXT_ID = 0;

// eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
const log = (message: any) => console.log(message);

function App() {
  const [activeUser, setActiveUser] = useState(
    new User(TEST_USER_ID),
  );

  if (!activeUser) {
    setActiveUser(activeUser);
  }

  const tabs = [
    { title: 'Home', iconName: 'home' },
    { title: 'Lessons', iconName: 'play_lesson' },
    { title: 'Dictionary', iconName: 'dictionary' },
    { title: 'Settings', iconName: 'settings' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const activeText = texts.texts[TEST_TEXT_ID] ? texts.texts[TEST_TEXT_ID] : undefined;

  return (
    <UserContext.Provider value={activeUser}>
      <div className="App">
        <Nav tabs={tabs} />
        <TextRenderer text={activeText} />
      </div>
    </UserContext.Provider>
  );
}

export default App;

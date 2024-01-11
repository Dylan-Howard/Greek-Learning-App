import './App.css';
import { useState } from 'react';
import fetchUser, { UserContext } from './User/User';
import Nav from './Nav/Nav';
import TextRenderer from './TextRenderer/TextRenderer';

// const TEST_USER_ID = 'user1';
const TEST_USER_ID = 'user2';

// eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
const log = (message: any) => console.log(message);

function App() {
  const [activeUser, setActiveUser] = useState(
    fetchUser(TEST_USER_ID),
  );

  const tabs = [
    { title: 'Home', iconName: 'home' },
    { title: 'Lessons', iconName: 'play_lesson' },
    { title: 'Dictionary', iconName: 'dictionary' },
    // { title: 'Settings', iconName: 'settings' },
    // { title: 'Details', iconName: 'chat_info' },
  ];

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user: activeUser, setUser: setActiveUser }}>
      <div className="App">
        <Nav tabs={tabs} />
        <TextRenderer />
      </div>
    </UserContext.Provider>
  );
}

export default App;

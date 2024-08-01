// import { useMemo, useState } from 'react';

import { ThemeProvider } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { dark, light } from './Theme';
import Reader from './reader/page';
// import Vocabulary from './Vocabulary/Vocabulary';
// import VocabularySet from './Vocabulary/VocabularySet';
// import SettingsPage from './User/SettingsPage';
// import About from './About/About';
// import { UserContext } from './reader/User/User';
// import * as AzureUserService from './reader/User/AzureUserService';

// import AuthPrompt from './Onboarding/Onboarding';
// import Lessons from './Lessons/Lessons';
// import { loginRequest } from './Auth/authConfig';

// eslint-disable-next-line no-empty-pattern
export function generateStaticParams({}) {
  return [{ slug: [''] }];
}

function App() {
  /* States for user details */
  // const [activeUser, setActiveUser] = useState(AzureUserService.getDefaultUserState());

  // const theme = activeUser.settings.prefersDarkMode ? 'dark' : 'light';

  return (
  // <UserContext.Provider
  //   value={useMemo(() => ({ user: activeUser, setUser: setActiveUser }), [activeUser])}
  // >
    <ThemeProvider theme={light}>
      <Reader />
    </ThemeProvider>
  // </UserContext.Provider>
  );
}

export default App;

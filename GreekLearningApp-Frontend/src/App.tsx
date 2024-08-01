import { useMemo, useState } from 'react';

import { ThemeProvider } from '@mui/material';

import { dark, light } from './Theme';
import Reader from './Reader/Reader';
// import Vocabulary from './Vocabulary/Vocabulary';
// import VocabularySet from './Vocabulary/VocabularySet';
// import SettingsPage from './User/SettingsPage';
// import About from './About/About';
import { UserContext } from './User/User';
import * as AzureUserService from './User/AzureUserService';

// import AuthPrompt from './Onboarding/Onboarding';
// import Lessons from './Lessons/Lessons';
// import { loginRequest } from './Auth/authConfig';

function App() {
  /* States for user details */
  const [activeUser, setActiveUser] = useState(AzureUserService.getDefaultUserState());

  const theme = activeUser.settings.prefersDarkMode ? 'dark' : 'light';

  return (
    <UserContext.Provider
      value={useMemo(() => ({ user: activeUser, setUser: setActiveUser }), [activeUser])}
    >
      <ThemeProvider theme={theme === 'dark' ? dark : light}>
        <Reader />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;

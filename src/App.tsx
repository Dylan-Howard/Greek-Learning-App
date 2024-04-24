import './App.css';
import { useMemo, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { PublicClientApplication } from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  MsalProvider,
  useIsAuthenticated,
} from '@azure/msal-react';
import { msalConfig } from './authConfig';

import { dark, light } from './Theme';
import Reader from './Reader/Reader';
import Vocabulary from './Vocabulary/Vocabulary';
import VocabularySet from './Vocabulary/VocabularySet';
import SettingsPage from './User/SettingsPage';
import About from './About/About';
import ProfilePage from './User/ProfilePage';
// import * as UserService from './User/UserService';
import { UserContext } from './User/User';
import AuthPrompt from './Onboarding/Onboarding';
import * as AzureUserService from './User/AzureUserService';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  /* States for user details */
  const isAuthenticated = useIsAuthenticated();
  const [activeUser, setActiveUser] = useState(AzureUserService.getDefaultUserState());
  // const [user, setUser] = useContext();

  const theme = activeUser.settings.prefersDarkMode ? 'dark' : 'light';

  console.log(activeUser.settings.prefersDarkMode);

  console.log(isAuthenticated);
  console.log(activeUser.id);

  if (isAuthenticated && activeUser.id === 'guest') {
    const account = msalInstance.getActiveAccount();
    console.log('Signing in');
    if (account) {
      AzureUserService.fetchUser(account.localAccountId)
        .then((usr) => {
          if (usr) {
            setActiveUser(usr);
          }
        });
    }
  }

  console.log(activeUser);

  return (
    <MsalProvider instance={msalInstance}>
      <UserContext.Provider
        value={useMemo(() => ({ user: activeUser, setUser: setActiveUser }), [activeUser])}
      >
        <ThemeProvider theme={theme === 'dark' ? dark : light}>
          <AuthenticatedTemplate>
            <BrowserRouter basename="/DynamicInterlinear">
              <Routes>
                <Route path="/" element={<Reader />} />
                {/* <Route path="/lessons" element={<LessonsPage />} /> */}
                <Route path="/vocabulary" element={<Vocabulary />} />
                <Route path="/sets" element={<VocabularySet />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </BrowserRouter>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <AuthPrompt show={!isAuthenticated} />
          </UnauthenticatedTemplate>
        </ThemeProvider>
      </UserContext.Provider>
    </MsalProvider>
  );
}

export default App;

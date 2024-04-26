import './App.css';
import { useMemo, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

import { dark, light } from './Theme';
import Reader from './Reader/Reader';
import Vocabulary from './Vocabulary/Vocabulary';
import VocabularySet from './Vocabulary/VocabularySet';
import SettingsPage from './User/SettingsPage';
import About from './About/About';
import { UserContext } from './User/User';
import * as AzureUserService from './User/AzureUserService';

import AuthPrompt from './Onboarding/Onboarding';
import Lessons from './Lessons/Lessons';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  /* States for user details */
  const [activeUser, setActiveUser] = useState(AzureUserService.getDefaultUserState());

  const theme = activeUser.settings.prefersDarkMode ? 'dark' : 'light';

  if (activeUser.id === 'guest') {
    const account = msalInstance.getActiveAccount();
    if (account) {
      AzureUserService.fetchUser(account.localAccountId)
        .then((usr) => {
          if (!usr) {
            return;
          }
          setActiveUser(usr);
        });
    }
  }

  return (
    <UserContext.Provider
      value={useMemo(() => ({ user: activeUser, setUser: setActiveUser }), [activeUser])}
    >
      <MsalProvider instance={msalInstance}>
        <ThemeProvider theme={theme === 'dark' ? dark : light}>
          <BrowserRouter basename="/DynamicInterlinear">
            <Routes>
              <Route path="/" element={<Reader />} />
              <Route path="/welcome" element={activeUser.id === 'guest' ? <AuthPrompt /> : <Navigate to="/" />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/sets" element={<VocabularySet />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
          {/* <AuthenticatedTemplate>
            <BrowserRouter basename="/DynamicInterlinear">
              <Routes>
                <Route path="/" element={<Reader />} />
                <Route path="/vocabulary" element={<Vocabulary />} />
                <Route path="/sets" element={<VocabularySet />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </BrowserRouter>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <AuthPrompt show={!isAuthenticated} />
          </UnauthenticatedTemplate> */}
        </ThemeProvider>
      </MsalProvider>
    </UserContext.Provider>
  );
}

export default App;

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
import Reader from './Reader';
import VocabPage from './Vocabulary/Vocabulary';
import SettingsPage from './User/SettingsPage';
import About from './About/About';
import ProfilePage from './User/ProfilePage';
import * as UserService from './User/UserService';
import { UserContext } from './User/User';
import SignInDialog from './Onboarding/SignInDialog';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  /* States for user details */
  const [activeUser, setActiveUser] = useState(
    UserService.getLocalUser() || UserService.createUser(),
  );

  const { theme } = activeUser.settings;
  const isAuthenticated = useIsAuthenticated();

  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme === 'dark' ? dark : light}>
        <AuthenticatedTemplate>
          <UserContext.Provider
            value={useMemo(() => ({ user: activeUser, setUser: setActiveUser }), [activeUser])}
          >
            <BrowserRouter basename="/DynamicInterlinear">
              <Routes>
                <Route path="/" element={<Reader />} />
                <Route path="/vocabulary" element={<VocabPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <SignInDialog show={!isAuthenticated} />
          <p>
            <center>
              Please sign-in to see your profile information.
            </center>
          </p>
        </UnauthenticatedTemplate>
      </ThemeProvider>
    </MsalProvider>
  );
}

export default App;

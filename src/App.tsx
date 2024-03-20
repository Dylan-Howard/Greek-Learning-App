import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import { dark, light } from './Theme';
import Reader from './Reader';
import SettingsPage from './User/SettingsPage';
import About from './About/About';
import * as UserService from './User/UserService';
import { UserContext } from './User/User';

// const DEFAULT_USER_ID = 0;

function App() {
  /* State for user details */
  const [activeUser, setActiveUser] = useState(
    UserService.getLocalUser() || UserService.createUser(),
  );

  const { theme } = activeUser.settings;

  return (
    <UserContext.Provider
      value={useMemo(() => ({ user: activeUser, setUser: setActiveUser }), [activeUser])}
    >
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <BrowserRouter basename="/DynamicInterlinear">
          <Routes>
            <Route path="/" element={<Reader />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;

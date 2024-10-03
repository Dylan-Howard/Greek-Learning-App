'use client';

import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserContext } from 'app/services/User';
import * as UserService from '../services/AzureUserService';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [activeUser, setActiveUser] = useState(UserService.getDefaultUserState());
  const { isLoaded, isSignedIn, user } = useUser();
  // const theme = activeUser.settings.prefersDarkMode ? 'dark' : 'light';

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    const userId = user.id;

    UserService.fetchUser(userId)
      .then((usr) => {
        setActiveUser(usr);
      });
  }, [user]);

  return (
    <UserContext.Provider
      value={useMemo(() => ({ user: activeUser, setUser: setActiveUser }), [activeUser])}
    >
      {/* <ThemeProvider theme={theme === 'dark' ? dark : light}> */}
      { children }
      {/* </ThemeProvider> */}
    </UserContext.Provider>
  );
}

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
      console.log('preventing user data error');
      return;
    }

    console.log('updating user data');

    const userId = user.id;

    UserService.fetchUser(userId)
      .then((usr) => {
        console.log(usr);
        setActiveUser(usr);
      });
  }, [user]);

  console.log(activeUser);
  console.log(user);

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

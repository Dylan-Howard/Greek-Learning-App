'use client';

import { SyntheticEvent, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Link,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AbcIcon from '@mui/icons-material/Abc';
import { UserContext } from 'app/services/User';

export default function Nav({ activeTabIndex } : { activeTabIndex: number }) {
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useContext(UserContext);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    const baseUrl = pathName.split('/')
      .slice(0, 4)
      .join('/');
    router.push(`${baseUrl}/${newValue}`);
  };

  return (
    <Box
      component="nav"
      sx={{
        boxSizing: 'border-box',
        position: 'fixed',
        height: { xs: 'auto', sm: '100vh' },
        width: { xs: '100vw', sm: 'auto' },
        bottom: { xs: 0 },
        zIndex: 1150,
        bgcolor: 'background.secondary',
        pt: { xs: 'calc(env(safe-area-inset-top) + 16px)', sm: 0 },
        pl: { xs: 2, sm: 0 },
        pr: { xs: 2, sm: 0 },
        pb: { xs: 'calc(env(safe-area-inset-bottom) + 16px)', sm: 0 },
      }}
    >
      <BottomNavigation
        showLabels
        value={activeTabIndex}
        onChange={handleChange}
        sx={{
          flexDirection: { xs: 'row', sm: 'column' },
          height: { xs: 'auto', sm: '100vh' },
          maxHeight: { xs: 600, sm: 300 },
          mt: { xs: 0, sm: 4 },
          bgcolor: 'background.secondary',
        }}
      >
        <BottomNavigationAction label="Lessons" icon={<LibraryBooksIcon />} />
        <BottomNavigationAction label="Vocab" icon={<AbcIcon />} />
        <BottomNavigationAction label="Details" icon={<LibraryBooksIcon />} />
        {
          user && user.id !== 'guest'
            ? (
              <BottomNavigationAction
                label="Profile"
                icon={<PersonIcon />}
                component={Link}
                href="/profile"
              />
            )
            : (
              <BottomNavigationAction
                label="Sign In"
                icon={<LoginIcon />}
                component={Link}
                href="/welcome"
              />
            )
        }
      </BottomNavigation>
    </Box>
  );
}

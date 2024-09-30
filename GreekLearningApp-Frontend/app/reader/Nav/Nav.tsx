'use client';

// import { SignedIn, SignedOut } from '@clerk/nextjs';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';

// import LoginIcon from '@mui/icons-material/Login';
// import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AbcIcon from '@mui/icons-material/Abc';
import { useReaderContext } from '../ReaderPageContext';

export default function Nav() {
  const { page, setPage } = useReaderContext();

  const handleClick = (newTab: number) => {
    setPage({ ...page, tabId: newTab });
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
        value={page?.tabId}
        sx={{
          flexDirection: { xs: 'row', sm: 'column' },
          height: { xs: 'auto', sm: '100vh' },
          maxHeight: { xs: 600, sm: 300 },
          mt: { xs: 0, sm: 4 },
          bgcolor: 'background.secondary',
        }}
      >
        <BottomNavigationAction
          value={1}
          label="Lessons"
          icon={<LibraryBooksIcon />}
          onClick={() => handleClick(1)}
        />
        <BottomNavigationAction
          value={2}
          label="Vocab"
          icon={<AbcIcon />}
          onClick={() => handleClick(2)}
        />
        <BottomNavigationAction
          value={3}
          label="Details"
          icon={<LibraryBooksIcon />}
          onClick={() => handleClick(3)}
        />
        {/* <SignedIn>
          <BottomNavigationAction
            value={4}
            label="Profile"
            icon={<PersonIcon />}
            component={Link}
            href="/profile"
          />
        </SignedIn>
        <SignedOut>
          <BottomNavigationAction
            label="Sign In"
            icon={<LoginIcon />}
            component={Link}
            href="/welcome"
          />
        </SignedOut> */}
      </BottomNavigation>
    </Box>
  );
}

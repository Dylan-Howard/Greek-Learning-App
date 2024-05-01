import './Nav.css';
import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AbcIcon from '@mui/icons-material/Abc';

function Nav({
  activeTabIndex,
  setActiveTabIndex,
} : {
  activeTabIndex: number,
  setActiveTabIndex: Function,
}) {
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  return (
    <Box
      component="nav"
      sx={{
        height: { xs: 'auto', sm: '100vh' },
        bgcolor: 'background.secondary',
        pt: {
          xs: 1,
          sm: 0,
        },
        pl: { xs: 2, sm: 0 },
        pr: { xs: 2, sm: 0 },
        pb: 'calc(env(safe-area-inset-bottom) + 8px)',
      }}
    >
      <BottomNavigation
        value={activeTabIndex}
        onChange={handleChange}
        sx={{
          flexDirection: {
            xs: 'row',
            sm: 'column',
          },
          height: {
            xs: 'auto',
            sm: '100vh',
          },
          maxHeight: 600,
          bgcolor: 'background.secondary',
        }}
      >
        <BottomNavigationAction
          label="Lessons"
          icon={<LibraryBooksIcon />}
        />
        <BottomNavigationAction
          label="Vocab"
          icon={<AbcIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          component={Link}
          to="/profile"
        />
        <BottomNavigationAction
          label="Sign In"
          icon={<LoginIcon />}
          component={Link}
          to="/welcome"
        />
      </BottomNavigation>
    </Box>
  );
}

export default Nav;

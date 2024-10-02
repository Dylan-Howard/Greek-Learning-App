'use client';

import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { SignOutButton } from '@clerk/nextjs';

import {
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  // useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';

import { UserContext } from '../../services/User';
import * as AzureUserService from '../../services/AzureUserService';

function UserSettings() {
  const { user, setUser } = useContext(UserContext);
  // const theme = useTheme();

  const [settings, setSettings] = useState({
    isOnboarded: 'true',
    prefersDarkMode: user ? user.settings.prefersDarkMode : false,
    translation: user ? user.settings.translation : 'esv',
  });

  const username = user?.name;

  const handleSelectChange = (event: SelectChangeEvent, setting: string) => {
    if (!(setting in settings)) {
      return;
    }
    const updatedSettings = { ...settings };
    // @ts-ignore
    updatedSettings[setting] = event.target.value;
    setSettings(updatedSettings);
  };

  const handleSignOut = () => {
    // instance.logoutPopup();
  };

  const handleSave = () => {
    if (!user) { return; }
    AzureUserService.updateUser({ ...user, settings });
    setUser(user);
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item sm={11}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            href="/reader"
            component={NextLink}
            color="text.primary"
            sx={{ textDecoration: 'none' }}
          >
            Koine Reader
          </Link>
          <Typography color="primary.main">Profile</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item sm={8} sx={{ mt: 8 }}>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {`User: ${username || 'No user active'}`}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="settings-label-theme">Theme</InputLabel>
              <Select
                labelId="settings-label-theme"
                id="settings-theme"
                value={settings.prefersDarkMode ? 'dark' : 'light'}
                label="Theme"
                onChange={(e) => handleSelectChange(e, 'theme')}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="settings-label-translation">Preferred Translation</InputLabel>
              <Select
                labelId="settings-label-translation"
                id="settings-translation"
                value={settings.translation}
                label="Preferred Translation"
                onChange={(e) => handleSelectChange(e, 'translation')}
              >
                <MenuItem value="esv">English Standard Version</MenuItem>
                <MenuItem value="csb">Christian Standard Bible</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" justifyContent="end" sx={{ mt: 2 }}>
            {
              user?.id !== 'guest'
                ? (
                  <Button
                    variant="outlined"
                    type="submit"
                    startIcon={<LogoutIcon />}
                    onClick={handleSignOut}
                    sx={{ mr: 2 }}
                  >
                    Sign Out
                  </Button>
                )
                : ''
            }
            <Button
              variant="contained"
              type="submit"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </Paper>
        <Stack sx={{ mt: 2 }}>
          <SignOutButton>
            <Button variant="contained" type="button">
              Sign Out
            </Button>
          </SignOutButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default UserSettings;

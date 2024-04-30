import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

import {
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';

import { UserContext } from './User';
import './SettingsPage.css';
import * as AzureUserService from './AzureUserService';

function UserSettings() {
  const { user, setUser } = useContext(UserContext);

  const { instance } = useMsal();

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
    instance.logoutPopup();
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
            to="/"
            className="SettingsBreadcrumb SecondaryBreadcrumb"
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
              user?.id === 'guest'
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
      </Grid>
    </Grid>
  );
}

export default UserSettings;

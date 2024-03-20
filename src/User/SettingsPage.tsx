import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
import SaveIcon from '@mui/icons-material/Save';
import { UserContext } from './User';
import './SettingsPage.css';
import * as UserService from './UserService';

function UserSettings() {
  const { user } = useContext(UserContext);
  const [settings, setSettings] = useState({
    theme: user ? user.settings.theme : 'light',
    translation: user ? user.settings.translation : 'esv',
    textbook: user ? user.settings.textbook : 'mounce',
  });

  const handleSelectChange = (event: SelectChangeEvent, setting: string) => {
    if (!(setting in settings)) {
      return;
    }
    const updatedSettings = { ...settings };
    // @ts-ignore
    updatedSettings[setting] = event.target.value;
    setSettings(updatedSettings);
  };

  const handleButtonClick = () => {
    if (!user) { return; }
    UserService.saveLocalUser({ ...user, settings });
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
          <Typography color="primary.main">Settings</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item sm={8} sx={{ mt: 8 }}>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {`User: ${user ? user.id : 'No user active'}`}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="settings-label-theme">Theme</InputLabel>
              <Select
                labelId="settings-label-theme"
                id="settings-theme"
                value={settings.theme}
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
            <FormControl fullWidth>
              <InputLabel id="settings-label-textbook">Preferred Textbook</InputLabel>
              <Select
                labelId="settings-label-textbook"
                id="settings-textbook"
                value={settings.textbook}
                label="Preferred Textbook"
                onChange={(e) => handleSelectChange(e, 'textbook')}
              >
                <MenuItem value="mounce">Mounce</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button
              variant="text"
              onClick={() => UserService.clearLocalUser()}
            >
              Clear User Data
            </Button>
            <Button
              variant="contained"
              type="submit"
              startIcon={<SaveIcon />}
              onClick={handleButtonClick}
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

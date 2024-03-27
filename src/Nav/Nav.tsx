import './Nav.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import { Tab } from '../Common/Tab';
import { UserContext } from '../User/User';
import { NavButton } from './NavButton';
import DetailsMenu from './DetailsMenu';
import SettingsMenu from './SettingsMenu';

function Nav({
  tabs,
  activeTabIndex,
  setActiveTabIndex,
  activeMorphologyId,
} : {
  tabs: Tab[],
  activeTabIndex: number,
  setActiveTabIndex: Function,
  activeMorphologyId: number,
}) {
  const { user } = useContext(UserContext);
  const activeTheme = user?.settings.prefersDarkMode ? 'dark' : 'light';

  const [tabIndex, setTabIndex] = useState(0);
  console.log({
    activeTabIndex,
    activeMorphologyId,
  });

  const toggleDrawer = (newTab: number) => () => {
    setTabIndex(newTab);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(0)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Stack
      component="nav"
      direction={{ xs: 'column-reverse', sm: 'row' }}
      justifyContent="start"
      className={activeTheme === 'light' ? 'Navbar NavLight' : 'Navbar NavDark'}
    >
      <div className="NavButtons">
        {/* <div className="NavLogo">
          <img src="/static/img/icon-500x500.png" alt="Scriptura Logo" />
        </div> */}
        {
          tabs.map(({ title, iconName }, i) => (
            <NavButton
              key={title}
              title={title}
              iconName={iconName}
              isActive={activeTabIndex === i}
              onClick={() => setActiveTabIndex(i)}
            />
          ))
        }
        <IconButton
          className="NavIcon"
          aria-label="delete"
          sx={{ color: 'primary.contrastText' }}
        >
          <Link to="/settings" className="NavLink">
            <SettingsIcon />
            <span className="NavIconTitle">Settings</span>
          </Link>
        </IconButton>
        <IconButton
          className="NavIcon"
          aria-label="delete"
          sx={{ color: 'primary.contrastText' }}
        >
          <Link to="/about" className="NavLink">
            <InfoIcon />
            <span className="NavIconTitle">About</span>
          </Link>
        </IconButton>
      </div>
      <Drawer open={tabIndex !== 0} onClose={toggleDrawer(0)}>
        {/* { DrawerList } */}
        {
          tabs[activeTabIndex].title === 'Details'
            ? <DetailsMenu activeMorphologyId={activeMorphologyId} />
            : (
              <SettingsMenu
                tab={tabs[activeTabIndex]}
                activeMorphologyId={activeMorphologyId}
              />
            )
        }
      </Drawer>
      {/* {
          tabs[activeTabIndex].title === 'Details'
            ? <DetailsMenu activeMorphologyId={activeMorphologyId} />
            : (
              <SettingsMenu
                tab={tabs[activeTabIndex]}
                activeMorphologyId={activeMorphologyId}
              />
            )
        } */}
    </Stack>
  );
}

export default Nav;

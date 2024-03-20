import './Nav.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Stack } from '@mui/material';
import SettingsMenu from './SettingsMenu';
import { Tab } from '../Common/Tab';
import { NavButton } from './NavButton';
import DetailsMenu from './DetailsMenu';
import { UserContext } from '../User/User';

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
              onShow={() => setActiveTabIndex(i)}
            />
          ))
        }
        <IconButton className="NavIcon" aria-label="delete" sx={{ color: 'primary.contrastText' }}>
          <Link to="/settings" className="NavLink">
            <SettingsIcon />
            <span className="NavIconTitle">Settings</span>
          </Link>
        </IconButton>
        <IconButton className="NavIcon" aria-label="delete" sx={{ color: 'primary.contrastText' }}>
          <Link to="/about" className="NavLink">
            <InfoIcon />
            <span className="NavIconTitle">About</span>
          </Link>
        </IconButton>
      </div>
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
    </Stack>
  );
}

export default Nav;

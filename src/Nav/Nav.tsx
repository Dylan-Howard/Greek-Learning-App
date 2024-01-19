import './Nav.css';
import SettingsMenu from './SettingsMenu';
import { Tab } from '../Common/Tab';
import { NavButton } from './NavButton';
import DetailsMenu from './DetailsMenu';

function Nav({
  tabs,
  activeTabIndex,
  setActiveTabIndex,
  activeDeclensionId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setActiveDeclensionId,
} : {
  tabs: Tab[],
  activeTabIndex: number,
  setActiveTabIndex: Function,
  activeDeclensionId: number,
  setActiveDeclensionId: Function,
}) {
  return (
    <nav className="Navbar">
      <div className="NavButtons">
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
      </div>
      {
        tabs[activeTabIndex].title === 'Details'
          ? <DetailsMenu activeDeclensionId={activeDeclensionId} />
          : (
            <SettingsMenu
              tab={tabs[activeTabIndex]}
              activeDeclensionId={activeDeclensionId}
            />
          )
      }
    </nav>
  );
}

export default Nav;

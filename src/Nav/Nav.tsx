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
} : {
  tabs: Tab[],
  activeTabIndex: number,
  setActiveTabIndex: Function,
  activeDeclensionId: string,
}) {
  return (
    <nav className="Navbar">
      <div className="NavButtons">
        {/* <div className="NavLogo">
          <img src="/static/img/icon-500x500.png." alt="Scriptura Logo" />
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
      </div>
      {
        tabs[activeTabIndex].title === 'Details'
          ? <DetailsMenu activeDeclensionId={activeDeclensionId} />
          : (
            <SettingsMenu
              tab={tabs[activeTabIndex]}
              activemorphologyId={activeDeclensionId}
            />
          )
      }
    </nav>
  );
}

export default Nav;

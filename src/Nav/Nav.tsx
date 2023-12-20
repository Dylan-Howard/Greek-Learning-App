import { MouseEventHandler, useState } from 'react';
import './Nav.css';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import { Tab } from '../Common/Tab';

function NavButton(
  {
    title,
    iconName,
    isActive,
    onShow,
  } : {
    title: string,
    iconName: string,
    isActive: boolean,
    onShow: MouseEventHandler<HTMLButtonElement>
  },
) {
  return (
    <button
      id={title}
      key={title}
      type="button"
      className={isActive ? 'NavIcon NavActive' : 'NavIcon'}
      data-menu={`${title}-menu`}
      onClick={onShow}
    >
      <span className="material-symbols-outlined">{iconName}</span>
    </button>
  );
}

function Nav({ tabs } : { tabs: Tab[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <nav className="Navbar">
        {
          tabs.map(({ title, iconName }, i) => (
            <NavButton
              key={title}
              title={title}
              iconName={iconName}
              isActive={activeIndex === i}
              onShow={() => setActiveIndex(i)}
            />
          ))
        }
      </nav>
      <SettingsMenu tab={tabs[activeIndex]} />
    </>
  );
}

export default Nav;

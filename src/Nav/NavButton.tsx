import { MouseEventHandler } from 'react';

export function NavButton(
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

export default NavButton;

import IconButton from '@mui/material/IconButton';
import AbcIcon from '@mui/icons-material/Abc';
import HomeIcon from '@mui/icons-material/Home';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import TranslateIcon from '@mui/icons-material/Translate';
import { MouseEventHandler } from 'react';

const iconMap = {
  home: <HomeIcon />,
  lessons: <PlayLessonIcon />,
  dictionary: <AbcIcon />,
  details: <TranslateIcon />,
};

export function NavButton(
  {
    title,
    iconName,
    isActive,
    onClick,
  } : {
    title: string,
    iconName: string,
    isActive: boolean,
    onClick: MouseEventHandler<HTMLButtonElement>
  },
) {
  return (
    <IconButton
      id={title}
      key={title}
      type="button"
      className={isActive ? 'NavIcon NavActive' : 'NavIcon'}
      data-menu={`${title}-menu`}
      onClick={onClick}
      aria-label={iconName}
      sx={{ color: 'primary.contrastText' }}
    >
      {
        // @ts-ignore
        iconMap[iconName] || <HomeIcon />
      }
      <span className="NavIconTitle">{title}</span>
    </IconButton>
  );
}

export default NavButton;

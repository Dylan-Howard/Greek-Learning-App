import { styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

const OptionSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 28,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(4px)',
    '&.Mui-checked': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      transform: 'translateX(24px)',
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 -960 960 960"><path fill="${encodeURIComponent('#fff')}" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.grey[800],
    width: 26,
    height: 26,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 -960 960 960"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: '.2',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[900],
    borderRadius: 20 / 2,
  },
}));

function OptionCheckbox(
  {
    id,
    // type,
    name,
    value,
    onCheck,
  }: {
    id: string,
    // type: string,
    name: string,
    value: boolean,
    onCheck: ChangeEventHandler<HTMLInputElement>,
  },
) {
  const [checked, setChecked] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    onCheck(e);
  };

  return (
    <FormControlLabel
      id={id}
      control={<OptionSwitch checked={checked} onChange={handleChange} />}
      label={name}
      sx={{ mb: 1 }}
    />
  );
}

export default OptionCheckbox;

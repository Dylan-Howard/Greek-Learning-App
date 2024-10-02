import { ChangeEventHandler } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  OnboardingIllustration1,
  OnboardingIllustration2,
  OnboardingIllustration3,
} from './OnboardingIllustrations';

type IllustrationMap = { [index: number]: () => JSX.Element };
const illustrationMap: IllustrationMap = {
  1: OnboardingIllustration1,
  2: OnboardingIllustration2,
  3: OnboardingIllustration3,
};

export default function OnboardingOptionBox({
  title,
  value,
  checked,
  onChange,
} : {
  title: string,
  value: number,
  checked: boolean,
  onChange: ChangeEventHandler,
}) {
  const illustration = illustrationMap[value] || OnboardingIllustration1;
  return (
    <label htmlFor={`onboarding-radio-${value}`} className="OptionContainer">
      <input
        className="OptionRadio"
        type="radio"
        id={`onboarding-radio-${value}`}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <Box className="OptionContent">
        {illustration()}
        <Typography className="OptionTitle">{title}</Typography>
      </Box>
    </label>
  );
}

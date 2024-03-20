import { ChangeEventHandler, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import './Onboarding.css';

function OnboardingOptionBox({
  title,
  description,
  imgURL,
  value,
  checked,
  onChange,
} : {
  title: string,
  description: string,
  imgURL: string,
  value: number,
  checked: boolean,
  onChange: ChangeEventHandler,
}) {
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
        <img src={imgURL} alt={title} />
        <Typography className="OptionTitle">{title}</Typography>
        <Typography className="OptionDescription">{description}</Typography>
      </Box>
    </label>
  );
}

export default function OnboardingDialog(
  { show, onSubmit }: { show: boolean, onSubmit: Function },
) {
  const [open, setOpen] = useState(show);
  const [userLevel, setUserLevel] = useState(0);

  if (!show) { return <span />; }

  const submitDisabled = userLevel === 0;

  const onOptionChange = (value: number) => {
    setUserLevel(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit(userLevel);
          handleClose();
        },
      }}
      sx={{ p: 2 }}
    >
      <DialogTitle>Welcome, Scholoar!</DialogTitle>
      <DialogContent sx={{ mb: 2 }}>
        <DialogContentText sx={{ pb: 2 }}>
          To get you started on your learning journey, let us know how comfortable you already
          feel with Koine Greek.
        </DialogContentText>
        <Grid
          container
          spacing={0}
          justifyContent="space-between"
          alignItems="stretch"
          columns={10}
        >
          <Grid item sm={3}>
            <OnboardingOptionBox
              title="Newcomer"
              description="I know a litle, but I&lsquo;m excited to learn more!"
              imgURL="/DynamicInterlinear/static/img/OnboardingLevel1.png"
              value={1}
              checked={userLevel === 1}
              onChange={() => onOptionChange(1)}
            />
          </Grid>
          <Grid item sm={3}>
            <OnboardingOptionBox
              title="Verse Voyager"
              description="I&lsquo;ve taken a class or two."
              imgURL="/DynamicInterlinear/static/img/OnboardingLevel2.png"
              value={2}
              checked={userLevel === 2}
              onChange={() => onOptionChange(2)}
            />
          </Grid>
          <Grid item sm={3}>
            <OnboardingOptionBox
              title="Textual Titan"
              description="I&lsquo;ve studied for years."
              imgURL="/DynamicInterlinear/static/img/OnboardingLevel3.png"
              value={3}
              checked={userLevel === 3}
              onChange={() => onOptionChange(3)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          type="submit"
          disabled={submitDisabled}
        >
          Let&lsquo;s start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

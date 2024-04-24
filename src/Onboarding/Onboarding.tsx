import { ChangeEventHandler, useContext, useState } from 'react';
import { useMsal } from '@azure/msal-react';
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

import { loginRequest } from '../authConfig';

import { UserContext } from '../User/User';
// import * as UserService from '../User/UserService';
import * as AzureUserService from '../User/AzureUserService';

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

function OnboardingContent({
  userLevel,
  setUserLevel,
} : {
  userLevel: number,
  setUserLevel: Function,
}) {
  const onOptionChange = (value: number) => {
    setUserLevel(value);
  };

  const submitDisabled = userLevel === 0;

  return (
    <>
      <DialogTitle>Welcome, Scholar!</DialogTitle>
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
              description="I&lsquo;m new and excited to learn!"
              imgURL="/DynamicInterlinear/static/img/OnboardingLevel1.png"
              value={1}
              checked={userLevel === 1}
              onChange={() => onOptionChange(1)}
            />
          </Grid>
          <Grid item sm={3}>
            <OnboardingOptionBox
              title="Verse Voyager"
              description="I understand the grammar and know the most common words."
              imgURL="/DynamicInterlinear/static/img/OnboardingLevel2.png"
              value={2}
              checked={userLevel === 2}
              onChange={() => onOptionChange(2)}
            />
          </Grid>
          <Grid item sm={3}>
            <OnboardingOptionBox
              title="Textual Titan"
              description="I&lsquo;ve learned every word that occurs more than 15 times."
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
    </>
  );
}

function SignInContent() {
  return (
    <>
      <DialogTitle>Welcome, Scholar!</DialogTitle>
      <DialogContent sx={{ mb: 2 }}>
        <DialogContentText sx={{ pb: 2 }}>
          Sign in below
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          type="submit"
        >
          Sign in
        </Button>
      </DialogActions>
    </>
  );
}

export default function AuthPrompt({ show }: { show: boolean }) {
  const [open, setOpen] = useState(show);

  const { setUser } = useContext(UserContext);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userLevel, setUserLevel] = useState(0);

  const { instance } = useMsal();

  if (!show) { return <span />; }

  const toggleNewUser = () => setIsNewUser(!isNewUser);

  const handleLogin = () => {
    instance.loginPopup(loginRequest)
      .then(({ account }) => {
        AzureUserService.fetchUser(account.localAccountId)
          .then((usr) => {
            if (usr) {
              setUser(usr);
            } else {
              console.log('User not found. Let\'s register.');
              toggleNewUser();
              instance.logoutRedirect({ account });
            }
          });
      });
  };

  const handleRegistration = () => {
    instance.loginPopup(loginRequest)
      .then(({ account }) => {
        AzureUserService.fetchUser(account.localAccountId)
          .then((tst) => {
            if (!tst) {
              AzureUserService.createUser(
                account.localAccountId,
                account.name || '',
                userLevel,
              ).then((usr) => setUser(usr));
            } else {
              console.log('It looks like this user is already registered. Signing in');
              AzureUserService.fetchUser(account.localAccountId)
                .then((usr) => setUser(usr));
            }
          });
      });
  };

  if (!show) { return <span />; }

  const handleClose = (_event: any, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  // const createLocalUser = (userTemplateId: number) => {
  //   const updatedUser = UserService.fetchUserTemplate(userTemplateId);
  //   setUser(updatedUser);
  //   UserService.saveLocalUser(updatedUser);
  // };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (isNewUser) {
            // createUser(userLevel);
            handleRegistration();
          } else {
            handleLogin();
            handleClose(event, 'submit');
          }
        },
      }}
      sx={{ p: 2 }}
    >
      {
        isNewUser
          ? <OnboardingContent userLevel={userLevel} setUserLevel={setUserLevel} />
          : <SignInContent />
      }
      <Button onClick={toggleNewUser}>{isNewUser ? 'Already have an account?' : 'Need to create an account?'}</Button>
    </Dialog>
  );
}

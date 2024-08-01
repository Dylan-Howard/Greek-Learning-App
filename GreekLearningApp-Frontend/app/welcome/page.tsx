'use client';

import {
  ChangeEventHandler,
  MouseEventHandler,
  // useContext,
  useState,
} from 'react';
import { useMsal } from '@azure/msal-react';
import { AccountInfo } from '@azure/msal-browser';
// import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import { loginRequest } from '../Auth/authConfig';
// import { UserContext } from '../User/User';
// import * as AzureUserService from '../User/AzureUserService';
import './Onboarding.css';
import {
  WelcomeIllustration,
  OnboardingIllustration1,
  OnboardingIllustration2,
  OnboardingIllustration3,
} from './WelcomeIllustration';

type IllustrationMap = { [index: number]: () => JSX.Element };
const illustrationMap: IllustrationMap = {
  1: OnboardingIllustration1,
  2: OnboardingIllustration2,
  3: OnboardingIllustration3,
};

function OnboardingOptionBox({
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

const userLevelContent = [
  {
    title: 'Newcomer',
    description: "I'm new and excited to learn!",
    imageUrl: '/DynamicInterlinear/static/img/Onboarding-1.svg',
  },
  {
    title: 'Verse Voyager',
    description: 'I most of the grammar and know every word that occures more than 50 times.',
    imageUrl: '/DynamicInterlinear/static/img/Onboarding-2.svg',
  },
  {
    title: 'Textual Titan',
    description: "I'm fluent in the grammar and I've learned every word that occurs more than 15 times.",
    imageUrl: '/DynamicInterlinear/static/img/Onboarding-3.svg',
  },
];

function RegisterContent({
  toggleNewUser,
  handleRegistration,
  userLevel,
  setUserLevel,
} : {
  toggleNewUser: MouseEventHandler<HTMLButtonElement>,
  handleRegistration: MouseEventHandler<HTMLButtonElement>,
  userLevel: number,
  setUserLevel: Function,
}) {
  const onOptionChange = (value: number) => setUserLevel(value);

  const submitDisabled = userLevel === 0;

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: 42,
          textAlign: 'center',
          mt: 8,
          mb: 2,
        }}
      >
        Welcome, Scholar!
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 6 }}>To get you started on your learning journey, let us know how comfortable you already feel with Koine Greek.</Typography>
      <Grid
        container
        spacing={0}
        justifyContent="space-between"
        alignItems="stretch"
        columns={10}
        sx={{ mb: 5 }}
      >
        {
          userLevelContent.map(({ title }, i) => (
            <Grid item sm={3} key={`onboarding-${title}`}>
              <OnboardingOptionBox
                title={title}
                value={i + 1}
                checked={userLevel === i + 1}
                onChange={() => onOptionChange(i + 1)}
              />
            </Grid>
          ))
        }
      </Grid>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 6 }}>
        {
          userLevel
            ? userLevelContent[userLevel - 1].description
            : ''
        }
      </Typography>
      <Stack flexDirection="row" justifyContent="center" sx={{ mb: 2 }}>
        <Button variant="contained" type="submit" disabled={submitDisabled} onClick={handleRegistration}>Create Account</Button>
      </Stack>
      <Stack flexDirection="row" justifyContent="center">
        <Button type="button" size="small" onClick={toggleNewUser} sx={{ color: '#333' }}>Already have an account?</Button>
      </Stack>
    </Box>
  );
}

function SignInContent({
  toggleNewUser,
  handleLogin,
} : {
  toggleNewUser: MouseEventHandler<HTMLButtonElement>,
  handleLogin: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Box>
      <Box sx={{
        height: '128px',
        width: '128px',
        mt: 24,
        ml: 'auto',
        mr: 'auto',
        mb: 4,
      }}
      >
        <img
          src="/DynamicInterlinear/static/img/koine-logo.svg"
          alt="Koine"
          className="SignInLogo"
        />
      </Box>
      <Typography variant="h2" sx={{ fontSize: 42, textAlign: 'center', mb: 2 }}>Welcome, Scholar!</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 6 }}>Start reading by by signing into your account below.</Typography>
      <Stack flexDirection="row" justifyContent="center" sx={{ mb: 2 }}>
        <Button variant="outlined" type="button" onClick={toggleNewUser} sx={{ mr: 2 }}>Create Account</Button>
        <Button variant="contained" type="submit" onClick={handleLogin}>Sign In</Button>
      </Stack>
      <Stack flexDirection="row" justifyContent="center">
        <Link href="reader">
          <Button type="button" size="small" sx={{ color: '#333' }}>Continue as guest</Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default function AuthPrompt() {
  // const { setUser } = useContext(UserContext);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userLevel, setUserLevel] = useState(0);
  const [authError, setAuthError] = useState(false);
  const theme = useTheme();

  const { instance } = useMsal();

  const toggleNewUser = () => setIsNewUser(!isNewUser);

  const getLoginHint = () => {
    const ids = instance.getAllAccounts().map((acc) => acc.localAccountId);
    return ids.length ? ids[0] : undefined;
  };

  const handleLogin = () => {
    const request = {
      ...loginRequest,
      loginHint: getLoginHint(),
    };

    instance.loginPopup(request)
      .then(({ account }) => {
        if (!account) { return; }
        AzureUserService.fetchUser(account.localAccountId)
          .then((usr) => {
            if (usr) {
              setUser(usr);
            } else {
              // If the user doesn't exits, initiate onboarding.
              toggleNewUser();
              // instance.logoutPopup({ account });
            }
          });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  const handleCreate = (account: AccountInfo) => {
    // AzureUserService.createUser(
    //   account.localAccountId,
    //   account.name || '',
    //   userLevel,
    // )
    //   .then((usr) => {
    //     AzureUserService.fetchUser(usr.id)
    //       .then((azu) => setUser(azu));
    //   })
    //   .catch(() => {
    //     setAuthError(true);
    //     console.log('We should handle an auth error by asking if the user wants to continue as a guest.');
    //   });
  };

  const handleRegistration = () => {
    // const activeAccounts = instance.getAllAccounts();
    // if (activeAccounts.length) {
    //   handleCreate(activeAccounts[0]);
    //   return;
    // }

    // const request = {
    //   ...loginRequest,
    //   loginHint: getLoginHint(),
    // };

    // instance.loginPopup(request)
    //   .then(({ account }) => {
    //     AzureUserService.fetchUser(account.localAccountId)
    //       .then((tst) => {
    //         if (!tst) {
    //           handleCreate(account);
    //         } else {
    //           setUser(tst); // If the user is already registered, initiate the sign in.
    //         }
    //       });
    //   });
  };

  if (authError) { return <span />; }

  return (
    <Grid container sx={{ backgroundColor: '#F5E4CC' }}>
      <Grid
        item
        sm={6}
        sx={{
          background: theme.palette.background.default,
          borderTopRightRadius: { xs: 0, sm: '1rem' },
          borderBottomRightRadius: { xs: 0, sm: '1rem' },
          boxShadow: 3,
          height: 'calc(100vh - env(safe-area-inset-bottom))',
          p: 3,
          pb: 'calc(16px + env(safe-area-inset-bottom))',
        }}
      >
        <Stack flexDirection="column" justifyContent="space-between" sx={{ height: '100%' }}>
          {
              isNewUser && !authError
                ? (
                  <RegisterContent
                    toggleNewUser={toggleNewUser}
                    handleRegistration={handleRegistration}
                    userLevel={userLevel}
                    setUserLevel={setUserLevel}
                  />
                )
                : <SignInContent toggleNewUser={toggleNewUser} handleLogin={handleLogin} />
              }
          <Link to="/about">
            <Button fullWidth size="small" sx={{ color: 'text.primary' }}>About Koine</Button>
          </Link>
        </Stack>
      </Grid>
      <Grid item sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Stack flexDirection="column" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <WelcomeIllustration />
        </Stack>
      </Grid>
    </Grid>
  );
}

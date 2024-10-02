import NextLink from 'next/link';
import NextImage from 'next/image';
import {
  Box,
  Button,
  Link,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import './Onboarding.css';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';
import WelcomeIllustration from './WelcomeIllustration';

export default function WelcomePage() {
  return (
    <Grid container sx={{ backgroundColor: '#F5E4CC' }}>
      <Grid
        item
        sm={6}
        sx={{
          background: '#F8F8FC',
          borderTopRightRadius: { xs: 0, sm: '1rem' },
          borderBottomRightRadius: { xs: 0, sm: '1rem' },
          boxShadow: 3,
          height: 'calc(100vh - env(safe-area-inset-bottom))',
          p: 3,
          pb: 'calc(16px + env(safe-area-inset-bottom))',
        }}
      >
        <Stack flexDirection="column" justifyContent="space-between" sx={{ height: '100%' }}>
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
              <NextImage src="/static/img/koine-logo.svg" alt="Koine Logo" width="128" height="128" />
            </Box>
            <Typography variant="h2" sx={{ fontSize: 42, textAlign: 'center', mb: 2 }}>Welcome, Scholar!</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 6 }}>Start reading by by signing into your account below.</Typography>

            <SignedIn>
              <Stack flexDirection="row" justifyContent="center" sx={{ mb: 2 }}>
                <NextLink href="/reader">
                  <Button variant="contained" type="button">Start Reading</Button>
                </NextLink>
              </Stack>
            </SignedIn>
            <SignedOut>
              <Stack flexDirection="row" justifyContent="center" sx={{ mb: 2 }}>
                <SignUpButton>
                  <Button variant="outlined" type="button" sx={{ mr: 2 }}>Create Account</Button>
                </SignUpButton>
                <SignInButton>
                  <Button variant="contained" type="button">Sign In</Button>
                </SignInButton>
              </Stack>
              <Stack flexDirection="row" justifyContent="center">
                <Link href="reader">
                  <Button type="button" size="small" sx={{ color: '#333' }}>Continue as guest</Button>
                </Link>
              </Stack>
            </SignedOut>
          </Box>
          <NextLink href="/about">
            <Button fullWidth size="small" sx={{ color: 'text.primary' }}>About Koine</Button>
          </NextLink>
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

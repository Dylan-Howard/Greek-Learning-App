'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import WelcomeIllustration from 'app/welcome/WelcomeIllustration';
import * as AzureUserService from '../services/AzureUserService';
import completeOnboarding from './_actions';
import OnboardingOptionBox from './OnboardingOptionBox';

const userLevelContent = [
  {
    title: 'Newcomer',
    description: "I'm new and excited to learn!",
    imageUrl: '/DynamicInterlinear/static/img/Onboarding-1.svg',
  },
  {
    title: 'Verse Voyager',
    description: 'I know most of the grammar and know every word that occures more than 50 times.',
    imageUrl: '/DynamicInterlinear/static/img/Onboarding-2.svg',
  },
  {
    title: 'Textual Titan',
    description: "I'm fluent in the grammar and I've learned every word that occurs more than 15 times.",
    imageUrl: '/DynamicInterlinear/static/img/Onboarding-3.svg',
  },
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [userLevel, setUserLevel] = useState(0);
  const [error, setError] = useState('');

  const onOptionChange = (value: number) => setUserLevel(value);
  const submitDisabled = userLevel === 0;

  const handleSubmit = async () => {
    if (!user) {
      return;
    }

    const userCreateResult = await AzureUserService.createUser(
      user.id,
      user.fullName || '',
      userLevel,
    );

    if (!userCreateResult) {
      return;
    }

    const res = await completeOnboarding();
    if (res?.message) {
      // Reloads the user's data from Clerk's API
      await user?.reload();
      router.push('/');
    }
    if (res?.error) {
      setError(res?.error);
    }
  };

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
        <form action={handleSubmit}>
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
          userLevel ? userLevelContent[userLevel - 1].description : ''
        }
          </Typography>
          <Stack flexDirection="row" justifyContent="center" sx={{ mb: 2 }}>
            {
          error && (
            <p>
              Error:
              {error}
            </p>
          )
        }
            <Button variant="contained" type="submit" disabled={submitDisabled}>Create Account</Button>
          </Stack>
        </form>
      </Grid>
      <Grid item sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Stack flexDirection="column" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <WelcomeIllustration />
        </Stack>
      </Grid>
    </Grid>
  );
}

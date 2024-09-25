'use client';

import {
  MouseEventHandler,
  TouchEvent,
  TouchEventHandler,
  useEffect,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import * as AzureTextService from '../../../services/AzureTextService';
import { DetailsSkeleton } from '../../../modules/Skeletons';

function MenuHandle({ onTouchClose }: { onTouchClose: TouchEventHandler }) {
  const [swipe, setSwipe] = useState({ start: 0 });
  const swipeCloseDistance = 50;

  const handleTouchStart = (e: any) => {
    setSwipe({ start: e.touches[0].clientY });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const swipeDistance = e.changedTouches[0].clientY - swipe.start;
    if (swipeCloseDistance < swipeDistance) {
      onTouchClose(e);
    }
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{ pt: 2, pb: 2 }}
    >
      <Box
        sx={{
          border: '#333 1px solid',
          borderColor: 'text.primary',
          width: 48,
        }}
      />
    </Stack>
  );
}

function MenuCloseButton({ onClose }: { onClose: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Stack flexDirection="row" justifyContent="end" sx={{ pt: 2, pb: 2 }}>
      <IconButton aria-label="close" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}

function DetailsItem({ label, value } : { label: string, value: string }) {
  return (
    <Box sx={{ mr: 2, mb: 2 }}>
      <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }}>{label}</Typography>
      <Typography sx={{ color: 'text.primary' }}>{value}</Typography>
    </Box>
  );
}

function DetailsMenu({ activeMorphologyId } : { activeMorphologyId: number }) {
  const router = useRouter();
  const pathName = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [morphology, setMorphology] = useState({
    content: null,
    details: [
      { field: '', value: '' },
    ],
  });

  const gt600px = useMediaQuery('(min-width:600px)');

  const unitForm = AzureTextService.fetchMorphologyDetails(activeMorphologyId);
  if (!unitForm) {
    return <span>No active declension</span>;
  }

  useEffect(() => {
    setIsLoading(true);
    AzureTextService.fetchMorphologyDetails(activeMorphologyId)
      .then((dtl) => {
        const details: { field: string, value: string }[] = [];
        details.push({ field: 'Part of Speech', value: dtl.posName });
        if (dtl.caseName) { details.push({ field: 'Case', value: dtl.caseName }); }
        if (dtl.tenseName) { details.push({ field: 'Tense', value: dtl.tenseName }); }
        if (dtl.voiceName) { details.push({ field: 'Voice', value: dtl.voiceName }); }
        if (dtl.moodName) { details.push({ field: 'Mood', value: dtl.moodName }); }
        if (dtl.personName) { details.push({ field: 'Person', value: dtl.peronName }); }
        if (dtl.numberName) { details.push({ field: 'Number', value: dtl.numberName }); }
        if (dtl.genderName) { details.push({ field: 'Gender', value: dtl.genderName }); }
        if (dtl.patternName) { details.push({ field: 'Pattern', value: dtl.patternName }); }
        if (dtl.degreeName) { details.push({ field: 'Degree', value: dtl.degreeName }); }
        details.push({ field: 'Root', value: dtl.rootName });

        setMorphology({
          content: dtl.content,
          details,
        });
        setIsLoading(false);
      });
  }, [activeMorphologyId]);

  const handleClose = () => {
    const baseUrl = pathName.split('/')
      .slice(0, 4)
      .join('/');
    router.push(baseUrl);
  };

  return (
    <Container sx={{
      bgcolor: 'background.tertiary',
      pr: { xs: 4, sm: 2 },
      pl: { xs: 4, sm: 2 },
      borderTopLeftRadius: { xs: 24, sm: 0 },
      borderTopRightRadius: { xs: 24, sm: 0 },
      width: { xs: '100vw', sm: 'auto' },
    }}
    >
      {
        gt600px
          ? <MenuCloseButton onClose={handleClose} />
          : <MenuHandle onTouchClose={handleClose} />
      }
      <Stack sx={{ height: { xs: 500, sm: '100vh' }, overflowY: 'scroll' }}>
        {!isLoading
          ? (
            <Box>
              <Typography
                variant="h2"
                sx={{ fontSize: 48, mb: 2, fontFamily: 'Noto Serif' }}
              >
                {morphology.content}
              </Typography>
              <Grid container>
                {
                  morphology.details.map(({ field, value }) => (
                    <Grid item xs={6} key={`detail-${field}`}>
                      <DetailsItem label={field} value={value} />
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
          )
          : <DetailsSkeleton />}
      </Stack>
    </Container>
  );
}

export default DetailsMenu;

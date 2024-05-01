import './DetailsMenu.css';
import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { UserContext } from '../User/User';
import * as AzureTextService from '../LanguageData/AzureTextService';
import { DetailsSkeleton } from '../Skeletons/Skeletons';

function DetailsItem({ label, value } : { label: string, value: string }) {
  return (
    <Box sx={{ mr: 2, mb: 2 }}>
      <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }}>{label}</Typography>
      <Typography sx={{ color: 'text.primary' }}>{value}</Typography>
    </Box>
  );
}

function DetailsMenu({ activeMorphologyId } : { activeMorphologyId: number }) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [morphology, setMorphology] = useState({
    content: null,
    details: [
      { field: '', value: '' },
    ],
  });

  const activeTheme = !user?.settings.prefersDarkMode ? 'light' : 'dark';

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

  if (isLoading) {
    return (
      <div className={activeTheme === 'light' ? 'SettingsMenu MenuLight' : 'SettingsMenu MenuDark'}>
        <DetailsSkeleton />
      </div>
    );
  }

  return (
    <Container sx={{
      bgcolor: 'background.tertiary',
      pt: 4,
      height: '100vh',
      overflowY: 'scroll',
    }}
    >
      <Stack>
        { isLoading ? <DetailsSkeleton /> : '' }
        <Typography
          variant="h2"
          color="theme.palette.text.primary"
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
        {/* <Button
          size="small"
          fullWidth
          onClick={() => handleButtonClick(unitForm.wordId, 'Word')}
          sx={{ textTransform: 'none' }}
        >
          { isComplete ? 'I don’t know this word' : 'I know this word' }
        </Button> */}
      </Stack>
    </Container>
  );
}

export default DetailsMenu;

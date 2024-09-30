'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import * as AzureTextService from '../../services/AzureTextService';
import { useReaderContext } from '../ReaderPageContext';

function DetailsItem({ label, value } : { label: string, value: string }) {
  return (
    <Box sx={{ mr: 2, mb: 2 }}>
      <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }}>{label}</Typography>
      <Typography sx={{ color: 'text.primary' }}>{value}</Typography>
    </Box>
  );
}

async function DetailsMenu() {
  const { page } = useReaderContext();

  /* Fetch morphology details */
  if (!page || !page.morphologyId) {
    return <span>No active declension</span>;
  }

  const unitForm = await AzureTextService.fetchMorphologyDetails(page.morphologyId);
  if (!unitForm || !unitForm.content) {
    return <span>No active declension</span>;
  }

  const content = unitForm.content || '';
  const details: { field: string, value: string }[] = [];
  details.push({ field: 'Part of Speech', value: unitForm.posName });
  if (unitForm.caseName) { details.push({ field: 'Case', value: unitForm.caseName }); }
  if (unitForm.tenseName) { details.push({ field: 'Tense', value: unitForm.tenseName }); }
  if (unitForm.voiceName) { details.push({ field: 'Voice', value: unitForm.voiceName }); }
  if (unitForm.moodName) { details.push({ field: 'Mood', value: unitForm.moodName }); }
  if (unitForm.personName) { details.push({ field: 'Person', value: unitForm.peronName }); }
  if (unitForm.numberName) { details.push({ field: 'Number', value: unitForm.numberName }); }
  if (unitForm.genderName) { details.push({ field: 'Gender', value: unitForm.genderName }); }
  if (unitForm.patternName) { details.push({ field: 'Pattern', value: unitForm.patternName }); }
  if (unitForm.degreeName) { details.push({ field: 'Degree', value: unitForm.degreeName }); }
  details.push({ field: 'Root', value: unitForm.rootName });

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ fontSize: 48, mb: 2, fontFamily: 'Noto Serif' }}
      >
        {content}
      </Typography>
      <Grid container>
        {
          details.map(({ field, value }) => (
            <Grid item xs={6} key={`detail-${field}`}>
              <DetailsItem label={field} value={value} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}

export default DetailsMenu;

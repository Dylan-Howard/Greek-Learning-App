'use client';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DetailsSkeleton } from 'app/modules/Skeletons';
import * as AzureTextService from 'app/services/AzureTextService';
import { useReaderContext } from '../ReaderPage/ReaderPageContext';

function DetailsItem({ label, value } : { label: string, value: string }) {
  return (
    <Box sx={{ mr: 2, mb: 2 }}>
      <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }}>{label}</Typography>
      <Typography sx={{ color: 'text.primary' }}>{value}</Typography>
    </Box>
  );
}

function DetailsMenu() {
  const { page } = useReaderContext();
  const [content, setContent] = useState({
    title: '',
    formDetails: [{ field: '', value: '' }],
    loading: true,
  });

  /* Fetch morphology details */
  if (!page || !page.morphologyId) {
    return <DetailsSkeleton />;
  }

  useEffect(() => {
    setContent({ ...content, loading: true });
    AzureTextService.fetchMorphologyDetails(page.morphologyId)
      .then((frm) => {
        if (!frm) {
          return;
        }

        const newContent: {
          title: string,
          formDetails: { field: string, value: string }[],
          loading: boolean,
        } = {
          title: frm.content || '',
          formDetails: [],
          loading: false,
        };
        newContent.formDetails.push({ field: 'Part of Speech', value: frm.posName });
        if (frm.caseName) { newContent.formDetails.push({ field: 'Case', value: frm.caseName }); }
        if (frm.tenseName) { newContent.formDetails.push({ field: 'Tense', value: frm.tenseName }); }
        if (frm.voiceName) { newContent.formDetails.push({ field: 'Voice', value: frm.voiceName }); }
        if (frm.moodName) { newContent.formDetails.push({ field: 'Mood', value: frm.moodName }); }
        if (frm.personName) { newContent.formDetails.push({ field: 'Person', value: frm.peronName }); }
        if (frm.numberName) { newContent.formDetails.push({ field: 'Number', value: frm.numberName }); }
        if (frm.genderName) { newContent.formDetails.push({ field: 'Gender', value: frm.genderName }); }
        if (frm.patternName) { newContent.formDetails.push({ field: 'Pattern', value: frm.patternName }); }
        if (frm.degreeName) { newContent.formDetails.push({ field: 'Degree', value: frm.degreeName }); }
        newContent.formDetails.push({ field: 'Root', value: frm.rootName });

        setContent(newContent);
      });
  }, [page]);

  if (content.loading) {
    return <DetailsSkeleton />;
  }

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ fontSize: 48, mb: 2, fontFamily: 'Noto Serif' }}
      >
        {content.title}
      </Typography>
      <Grid container>
        {
          content.formDetails.map(({ field, value }) => (
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

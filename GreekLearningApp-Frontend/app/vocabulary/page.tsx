import NextLink from 'next/link';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import * as AzureTextService from '../services/AzureTextService';
import VocabularySetCard from './VocabularySetCard';
import VocabularyTable from './VocabularyTable';

export default async function Vocabulary() {
  let words: any[] = [];
  // let page = 0;
  // let rowsPerPage = 10;

  const data = await AzureTextService.fetchVocabulary();
  words = data;

  // console.log(words);

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item sm={11} sx={{ mb: 8 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            href="/reader"
            component={NextLink}
            color="text.primary"
            sx={{ textDecoration: 'none' }}
          >
            Koine Reader
          </Link>
          <Typography color="primary.main">Vocabulary</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h2" sx={{ mb: 4 }}>Vocabulary Sets</Typography>
      </Grid>
      <Grid item sm={3} sx={{ mb: 4 }}>
        <VocabularySetCard
          title="1 John"
          description="All vocabulary in the book of 1 John"
          link="sets/1John"
          progress={40}
        />
      </Grid>
      <Grid item sm={3} sx={{ mb: 4 }}>
        <VocabularySetCard
          title="2 John"
          description="All vocabulary in the book of 2 John"
          link="sets/2John"
          progress={22}
        />
      </Grid>
      <Grid item sm={3} sx={{ mb: 4 }}>
        <VocabularySetCard
          title="3 John"
          description="All vocabulary in the book of 3 John"
          link="sets/3John"
          progress={8}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center">
          <Button sx={{ mb: 8 }}>
            <Link href="/sets">See More</Link>
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h2" sx={{ mb: 4 }}>All Vocabulary</Typography>
      </Grid>
      <Grid item sm={8} sx={{ mb: 8 }}>
        <VocabularyTable words={words} />
      </Grid>
    </Grid>
  );
}

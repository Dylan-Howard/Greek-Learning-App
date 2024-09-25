import NextLink from 'next/link';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';

function VocabularySet() {
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
          <Typography color="primary.main">Vocabulary Sets</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 4 }}>Coming Soon</Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>We&#39;re working hard to build this page for our users.</Typography>
        <Stack flexDirection="row" justifyContent="center">
          <Link href="/reader"><Button variant="contained">Return to reader</Button></Link>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default VocabularySet;

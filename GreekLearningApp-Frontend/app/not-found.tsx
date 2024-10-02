import NextLink from 'next/link';

import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Error() {
  return (
    <Box sx={{ bgcolor: 'background.default', height: '100%' }}>
      <Stack flexDirection="column" justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: '90%',
            maxWidth: 400,
            mt: 8,
            mb: 8,
          }}
        >
          <Image src="/not-found.svg" alt="Resources not found" width={500} height={500} />
        </Box>
        <Typography textAlign="center" sx={{ m: 4 }}>
          Hmmm, it likes like we&lsquo;re having trouble finding our texts.
        </Typography>
        <Stack flexDirection="row" justifyContent="center">
          <NextLink href="/reader">
            <Button variant="contained" sx={{ mr: 2 }}>Look again</Button>
          </NextLink>
        </Stack>
      </Stack>
    </Box>
  );
}

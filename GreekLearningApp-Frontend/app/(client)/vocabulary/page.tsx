'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  TablePagination,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as AzureTextService from '../../services/AzureTextService';
import VocabularySetCard from './VocabularySetCard';

function Vocabulary() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    AzureTextService.fetchVocabulary()
      .then((data: any) => setWords(data));
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = words.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

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
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Lemma</TableCell>
                <TableCell align="right">NT Occurances</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map(({ rootId, content, occurances }) => (
                <TableRow
                  key={`word-${rootId}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{rootId}</TableCell>
                  <TableCell>{content}</TableCell>
                  <TableCell align="right">{occurances}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={words.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}

export default Vocabulary;

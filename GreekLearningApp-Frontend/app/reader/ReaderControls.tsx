'use client';

import { useRouter } from 'next/navigation';

import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import * as AzureTextService from '../services/AzureTextService';

export default function TextControls(
  { chapterId, chapterPosition }: { chapterId: number, chapterPosition: string | undefined },
) {
  const router = useRouter();

  const handleChapterChange = async (targetChapterId: number) => {
    const { textId } = await AzureTextService.fetchChapter(targetChapterId);
    router.push(`/reader?bookId=${textId}&chapterId=${targetChapterId}`);
  };

  return (
    <Stack
      direction={chapterPosition === 'first' ? 'row-reverse' : 'row'}
      justifyContent="space-between"
      sx={{ m: 4, mt: 0 }}
    >
      {chapterPosition !== 'first'
        ? (
          <Fab
            color="primary"
            aria-label="navigate-back"
            onClick={() => handleChapterChange(chapterId - 1)}
          >
            <ChevronLeftIcon />
          </Fab>
        )
        : ''}
      {chapterPosition !== 'last'
        ? (
          <Fab
            color="primary"
            aria-label="navigate-back"
            onClick={() => handleChapterChange(chapterId + 1)}
          >
            <ChevronRightIcon />
          </Fab>
        )
        : ''}
    </Stack>
  );
}

'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import * as AzureTextService from '../services/AzureTextService';

export default function TextSelectionControls(
  {
    selections,
    text,
  } : {
    selections: { texts: any[], chapters: any[] },
    text: { bookId: number, chapterId: number },
  },
) {
  const router = useRouter();

  const handleTextChange = async (event: SelectChangeEvent) => {
    const targetTextId = parseInt(event.target.value, 10);
    const chapters = await AzureTextService.fetchChaptersByText(targetTextId);
    router.push(`/reader/${event.target.value}/${chapters[0].chapterId}`);
  };

  const handleChapterChange = async (event: SelectChangeEvent) => {
    const targetChapterId = parseInt(event.target.value, 10);
    if (!targetChapterId) {
      return;
    }

    const { textId } = await AzureTextService.fetchChapter(targetChapterId);
    router.push(`/reader/${textId}/${targetChapterId}`);
  };

  return (
    <>
      <FormControl size="small">
        <InputLabel id="text-select-book-label">Text</InputLabel>
        <Select
          labelId="text-select-book-label"
          id="text-select-book"
          value={`${text.bookId}`}
          label="Text"
          onChange={handleTextChange}
          sx={{ width: 180 }}
        >
          {
            selections.texts.map(({ textId, title }) => (
              <MenuItem value={textId} key={`text-${textId}`}>{title}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="text-select-book-label">Chapter</InputLabel>
        <Select
          labelId="text-select-chapter-label"
          id="text-select-chapter"
          value={`${text.chapterId}`}
          label="Chapter"
          onChange={handleChapterChange}
          sx={{ width: 80 }}
        >
          {
            selections.chapters.map(({ chapterId, chapterNumber }) => (
              <MenuItem value={chapterId} key={`chapter-${chapterId}`}>{chapterNumber}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  );
}

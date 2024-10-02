'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as AzureTextService from '../../services/AzureTextService';

export default function ReaderPageSelect({
  children,
  id,
  labelId,
  label,
  reference,
  page,
} : {
  children: ReactNode,
  id: string
  labelId: string
  label: string
  reference: string,
  page: { bookId: number, chapterId: number },
}) {
  const router = useRouter();

  const handleChange = async (event: SelectChangeEvent) => {
    let targetBook = page.bookId;
    let targetChapter;

    if (reference === 'book') {
      targetBook = parseInt(event.target.value, 10);
      const chapters = await AzureTextService.fetchChaptersByText(targetBook);
      targetChapter = chapters[0].chapterId;
    } else {
      targetChapter = parseInt(event.target.value, 10);
    }
    router.push(`/reader/${targetBook}/${targetChapter}`);
  };

  return (
    <Select
      id={id}
      value={`${reference === 'book' ? page.bookId : page.chapterId}`}
      labelId={labelId}
      label={label}
      onChange={handleChange}
      sx={{ width: 180 }}
    >
      {children}
    </Select>
  );
}

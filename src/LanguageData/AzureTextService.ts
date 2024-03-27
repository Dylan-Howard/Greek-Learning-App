const fetchData = async (resource: string) => {
  const apiUrl = 'http://localhost:7071/api';
  try {
    const response = await fetch(`${apiUrl}/${resource}`);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    return '[]';
  }
};

export async function fetchLessons() {
  const lessons = await fetchData('lessons');

  return JSON.parse(lessons);
}

export async function fetchTexts() {
  const texts = await fetchData('texts');

  return JSON.parse(texts);
}

export async function fetchVocabulary() {
  const words = await fetchData('words');

  return JSON.parse(words);
}

export async function fetchChapter(chapterId: number) {
  const chapter = await fetchData(`chapters/${chapterId}`);

  return JSON.parse(chapter)[0];
}

export async function fetchChaptersByText(textId: number) {
  const chapters = await fetchData(`texts/${textId}/chapters`);

  return JSON.parse(chapters);
}

export async function fetchTextSelectionOptions(currTextId: number) {
  const texts = await fetchData('texts');
  const chapters = await fetchData(`texts/${currTextId}/chapters`);

  return {
    texts: JSON.parse(texts),
    chapters: JSON.parse(chapters),
  };
}

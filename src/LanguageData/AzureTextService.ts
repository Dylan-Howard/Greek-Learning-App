const fetchData = async (resource: string) => {
  const apiUrl = 'http://localhost:7072/api';
  // const apiUrl = 'https://koinetext.azurewebsites.net/api';
  try {
    const response = await fetch(`${apiUrl}/${resource}`);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    return '{}';
  }
};

export async function fetchLessons() {
  const lessons = await fetchData('lessons');

  return JSON.parse(lessons);
}

export async function fetchLessonByForm(grammarId: number) {
  const lessons = await fetchData(`grammaticalForms/${grammarId}/lessons`);

  return JSON.parse(lessons);
}

export async function fetchTexts() {
  const texts = await fetchData('texts');

  return JSON.parse(texts);
}

export async function fetchText(textId: number) {
  const text = await fetchData(`texts/${textId}`);

  return JSON.parse(text);
}

export async function fetchVocabulary() {
  const words = await fetchData('words');

  return JSON.parse(words);
}

export async function fetchVocabularyByChapter(chapterId: number) {
  const words = await fetchData(`chapters/${chapterId}/words`);

  return JSON.parse(words);
}

export async function fetchUnitsByChapter(chapterId: number) {
  const units = await fetchData(`chapters/${chapterId}/units`);

  return JSON.parse(units);
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
  const selections = await fetchData(`selections/${currTextId}`);

  return JSON.parse(selections);
}

export async function fetchMorphology(morphologyId: number) {
  const morphology = await fetchData(`morphologies/${morphologyId}`);

  return JSON.parse(morphology);
}

export async function fetchMorphologyDetails(morphologyId: number) {
  const details = await fetchData(`morphologies/${morphologyId}/details`);

  return JSON.parse(details);
}

export async function fetchMorphologyAbbreviation(morphologyId: number) {
  const abbreviation = await fetchData(`morphologies/${morphologyId}/abbreviation`);

  return JSON.parse(abbreviation);
}

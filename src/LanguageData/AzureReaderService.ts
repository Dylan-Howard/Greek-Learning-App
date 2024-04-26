const postData = async (resource: string, data: Object) => {
  const apiUrl = 'http://localhost:7074/api';
  // const apiUrl = 'https://koinereader.azurewebsites.net/api';
  try {
    const response = await fetch(
      `${apiUrl}/${resource}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    return 'false';
  }
};

export async function fetchPage(chapterId: number, userId: string) {
  const page = await postData('reader', { chapterId, userId });

  return JSON.parse(page);
}

export default fetchPage;

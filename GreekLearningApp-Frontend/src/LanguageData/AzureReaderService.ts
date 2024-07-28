const API_URL = 'https://koine.azure-api.net/api';

const postData = async (resource: string, data: Object) => {
  try {
    const response = await fetch(
      `${API_URL}/${resource}`,
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

const { API_URL } = process.env;

const postData = async (resource: string, data: Object) => {
  try {
    console.log(API_URL);
    console.log(process.env);
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

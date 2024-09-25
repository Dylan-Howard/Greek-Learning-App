import users from './data/userData.json';
import { User } from './User';

const API_URL = 'https://koine.azure-api.net/api';

// function wait(delay: number) {
//   return new Promise((resolve) => { setTimeout(resolve, delay); });
// }

// function fetchRetry(url, delay, tries, fetchOptions = {}) {
//   async function onError(err) {
//     const triesLeft = tries - 1;
//     if (!triesLeft) {
//       throw err;
//     }
//     await wait(delay);
//     fetchRetry(url, delay, triesLeft, fetchOptions);
//   }
//   return fetch(url, fetchOptions).catch(onError);
// }

const fetchData = async (resource: string) => {
  try {
    const response = await fetch(`${API_URL}/${resource}`);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const responseData = await response.text();

    console.log(responseData);

    return responseData;
  } catch (error) {
    return undefined;
  }
};

const sendData = async (resource: string, method: string, data: Object) => {
  try {
    const response = await fetch(
      `${API_URL}/${resource}`,
      {
        method,
        cache: 'force-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return undefined;
  }
};

export const getDefaultUserState = () => ({
  id: 'guest',
  name: 'Guest',
  progress: {
    lessons: [],
    vocabulary: [],
  },
  settings: {
    prefersDarkMode: false,
    translation: 'esv',
  },
});

export async function createUser(id: string, name: string, userLevel: number) {
  let progressTemplate = {
    lessons: [{}],
    vocabulary: [{}],
  };
  if (userLevel === 1) {
    progressTemplate = users.users[1].progress;
  }
  if (userLevel === 2) {
    progressTemplate = users.users[2].progress;
  }

  const user = await sendData('users', 'POST', { id, name, progress: progressTemplate });

  return user || undefined;
}

export async function fetchUser(id: string) {
  if (id === 'guest') {
    return undefined;
  }
  const user = await fetchData(`users/${id}`);

  return user ? JSON.parse(user) : undefined;
}

export async function fetchUserLessons(id: string) {
  if (id === 'guest') {
    return undefined;
  }
  const lessons = await fetchData(`users/${id}/lessons`);

  return lessons || undefined;
}

export async function updateUser(userData: User) {
  if (userData.id === 'guest') {
    return undefined;
  }
  const user = await sendData(`users/${userData.id}`, 'PATCH', userData);

  return user || undefined;
}

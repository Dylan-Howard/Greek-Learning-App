import { graphConfig } from '../authConfig';
import users from '../data/userData.json';
import { User } from './User';

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

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
  const apiUrl = 'http://localhost:7071/api';
  // const apiUrl = 'https://koinetext.azurewebsites.net/api';
  try {
    const response = await fetch(`${apiUrl}/${resource}`);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    return undefined;
  }
};

const postData = async (resource: string, data: Object) => {
  const apiUrl = 'http://localhost:7071/api';
  // const apiUrl = 'https://koinetext.azurewebsites.net/api';
  try {
    const response = await fetch(
      `${apiUrl}/${resource}`,
      {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
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

  const user = await postData('users', { id, name, progress: progressTemplate });

  return user || undefined;
}

export async function fetchUser(id: string) {
  const user = await fetchData(`users/${id}`);

  return user ? JSON.parse(user) : undefined;
}

export async function fetchUserLessons(id: string) {
  const lessons = await fetchData(`users/${id}/lessons`);

  return lessons || undefined;
}

export async function updateUser(userData: User) {
  const user = await postData(`users/${userData.id}`, userData);

  return user ? JSON.parse(user) : undefined;
}

export default callMsGraph;

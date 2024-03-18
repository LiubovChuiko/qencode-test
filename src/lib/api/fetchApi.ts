import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const fetchWithoutAuth = async (uri: string, options?: object) => {
  let response;
  let error;

  const optionsWithoutAuth = {
    headers: {
      'Content-Type': 'application/json',
      Origin: '',
    },
    ...options,
  };

  try {
    const res = await fetch(uri, optionsWithoutAuth);
    if (!res) error = new Error('No response');
    response = res.json();
  } catch (err) {
    error = new Error(String(err));
  }

  return {response, error};
};

export const fetchWithAuth = async (uri: string, options?: object) => {
  let response;
  let error;
  const authToken = cookies.get('access_token');

  const optionsWithAuth = {
    headers: {
      'Content-Type': 'application/json',
      Origin: '',
      Authorization: 'Bearer ' + authToken,
    },
    ...options,
  };

  if (!!authToken) {
    try {
      const res = await fetch(uri, optionsWithAuth);
      if (res.ok) {
        response = res.json();
      } else {
        error = new Error(res.statusText);
      }
    } catch (err) {
      error = new Error(String(err));
    }
  } else {
    console.error('Missed access_token');
    error = new Error('Auth error')
  }

  return {response, error}
};

export const checkWithAuth = async (uri: string) => {
  const authToken = cookies.get('access_token');
  const optionsWithAuth = {
    headers: {
      'Content-Type': 'application/json',
      Origin: '',
      Authorization: 'Bearer ' + authToken,
    },
    body: null,
  };

  if (!!authToken) {
    try {
      const response = await fetch(uri, optionsWithAuth);
      if (response.status === 200) return true;
      return false;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

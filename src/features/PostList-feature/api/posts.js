import { RequestError } from '../errors/errors';

const URS_BASE = 'https://blog.kata.academy/api';
const LIMIT = 5;

export async function getPosts(page = 1) {
  const skippedPostsCount = page === 1 ? 0 : (page - 1) * 5;

  const params = { limit: LIMIT, offset: skippedPostsCount };
  try {
    const response = await fetch('https://blog.kata.academy/api/articles?' + new URLSearchParams(params), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
    });

    if (!response.ok) {
      throw new RequestError('Request failed', response.status);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function addFavorite(slug) {
  try {
    const request = await fetch(`${URS_BASE}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
    });

    if (request.status === 422) {
      return null;
    }

    if (request.status === 401) {
      return null;
    }

    if (!request.ok) {
      throw new Error();
    }
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteFavorite(slug) {
  try {
    const request = await fetch(`${URS_BASE}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
    });

    if (request.status === 422) {
      return null;
    }

    if (request.status === 401) {
      return null;
    }

    if (!request.ok) {
      throw new Error();
    }
  } catch (err) {
    throw new Error(err);
  }
}

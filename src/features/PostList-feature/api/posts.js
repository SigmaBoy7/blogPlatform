import { RequestError } from '../errors/errors';

const LIMIT = 5;

export async function getPosts(page = 1) {
  const skippedPostsCount = page === 1 ? 0 : (page - 1) * 5;

  const params = { limit: LIMIT, offset: skippedPostsCount };
  try {
    const response = await fetch('https://blog.kata.academy/api/articles?' + new URLSearchParams(params));

    if (!response.ok) {
      throw new RequestError('Request failed', response.status);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

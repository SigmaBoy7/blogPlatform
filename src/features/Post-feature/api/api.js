const URS_BASE = 'https://blog.kata.academy/api';

export async function getArticle(slug) {
  try {
    const request = await fetch(`${URS_BASE}/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
    });

    if (request.status === 422) {
      return null;
    }

    if (!request.ok) {
      throw new Error();
    }
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

export async function createArticle(data) {
  const articleData = {
    article: { title: data.title, description: data.shortDescription, body: data.text, tagList: data.tags },
  };
  try {
    const request = await fetch(`${URS_BASE}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
      body: JSON.stringify(articleData),
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
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateArticle(data, slug) {
  const articleData = {
    article: { title: data.title, description: data.shortDescription, body: data.text, tagList: data.tags },
  };
  try {
    const request = await fetch(`${URS_BASE}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
      body: JSON.stringify(articleData),
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
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteArticle(slug) {
  try {
    const request = await fetch(`${URS_BASE}/articles/${slug}`, {
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

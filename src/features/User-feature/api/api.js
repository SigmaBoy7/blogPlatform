const URS_BASE = 'https://blog.kata.academy/api';

export async function createUser(data) {
  const userData = { user: { username: data.username, email: data.email, password: data.password } };
  try {
    const request = await fetch(`${URS_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (request.status === 422) {
      throw new Error();
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

export async function loginUser(data) {
  const userData = { user: { email: data.email, password: data.password } };
  try {
    const request = await fetch(`${URS_BASE}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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

export async function getUser() {
  try {
    const request = await fetch(`${URS_BASE}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
    });

    if (request.status === 422 || request.status === 401) {
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

export async function updateUser(data) {
  const userData = {
    user: { username: data.username, email: data.email, password: data.password, image: data.avatarImage },
  };
  try {
    const request = await fetch(`${URS_BASE}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('login')}`,
      },
      body: JSON.stringify(userData),
    });

    if (request.status === 422) {
      const error = await request.json();
      const inValidInputs = Object.keys(error.errors);
      throw (new Error().message = `${inValidInputs.join('and')} is already taken`);
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

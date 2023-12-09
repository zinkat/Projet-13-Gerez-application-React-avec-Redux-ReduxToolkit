// api.js
const BASE_URL = 'http://localhost:3001/api/v1';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error during login:', errorData);
      throw new Error('Login failed');
    }

    const responseData = await response.json();
    const token = responseData.body.token; // Assurez-vous que la propriété du token est correcte

    console.log('Token stored in local storage:', token);
    localStorage.setItem('token', token);

    return responseData; // Retournez l'ensemble des données, y compris le token
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const fetchUserProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching user profile:', errorData);
      throw new Error(errorData.message || 'Failed to fetch user profile');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

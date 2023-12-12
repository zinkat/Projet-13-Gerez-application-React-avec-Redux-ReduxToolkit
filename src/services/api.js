import { createAsyncThunk } from '@reduxjs/toolkit';

// Définition de l'URL de base pour les requêtes API
const BASE_URL = 'http://localhost:3001/api/v1';

// Fonction pour effectuer la requête de connexion (login)
export const loginUser = async (credentials) => {

  try {
     // Envoi de la requête POST au endpoint /user/login
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    // Vérification si la requête a réussi (status 200)
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error during login:', errorData);
      throw new Error('Login failed');
    }
   // Extraction du token de la réponse JSON
    const responseData = await response.json();
    const token = responseData.body.token; // Assurez-vous que la propriété du token est correcte

    console.log('Token stocké in local storage:', token);
    localStorage.setItem('token', token);

    return responseData; // Retournez l'ensemble des données, y compris le token
  } catch (error) {
    // Gestion des erreurs lors de la requête de connexion
    console.error('Error during login:', error);
    throw error;
  }
};

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      // Logique pour récupérer le profil utilisateur depuis l'API
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching user profile:', errorData);
        throw new Error('Failed to fetch user profile');
      }

      const profileData = await response.json();

      const userProfile = {
        id: profileData.body.id,
        email: profileData.body.email,
        firstName: profileData.body.firstName,
        lastName: profileData.body.lastName,
      };

      return userProfile;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfile = async (token, profileData) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating user profile:', errorData);
      throw new Error('Failed to update user profile');
    }

    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
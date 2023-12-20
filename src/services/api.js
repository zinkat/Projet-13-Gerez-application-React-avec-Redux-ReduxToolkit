
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:3001/api/v1';

// Fonction pour la requête de connexion utilisateur
/**
 * Fonction pour effectuer une requête de connexion utilisateur.
 * @function
 * @async
 * @param {Object} credentials - Informations d'identification de l'utilisateur.
 * @param {string} credentials.email - Adresse e-mail de l'utilisateur.
 * @param {string} credentials.password - Mot de passe de l'utilisateur.
 * @throws {Error} Lance une erreur si la connexion échoue.
 * @returns {Promise<Object>} Les données de réponse de la requête.
 */
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
    const token = responseData.body.token;
    localStorage.setItem('token', token);

    return responseData;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Création d'une action asynchrone pour récupérer le profil utilisateur
/**
 * Action asynchrone pour récupérer le profil utilisateur.
 * @function
 * @async
 * @param {string} token - Token d'authentification de l'utilisateur.
 * @param {Object} thunkAPI - Objet fourni par Redux Toolkit pour la gestion des actions asynchrones.
 * @param {Function} thunkAPI.rejectWithValue - Fonction pour rejeter la promesse avec une valeur.
 * @throws {Error} Rejette la promesse avec une erreur en cas d'échec de la requête.
 * @returns {Promise<Object>} Le profil utilisateur.
 */
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
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
  },
);

// Création d'une action asynchrone pour mettre à jour le profil utilisateur
/**
 * Action asynchrone pour mettre à jour le profil utilisateur.
 * @function
 * @async
 * @param {Object} params - Paramètres de la requête.
 * @param {string} params.token - Token d'authentification de l'utilisateur.
 * @param {Object} params.updatedProfile - Profil utilisateur mis à jour.
 * @param {Function} thunkAPI - Objet fourni par Redux Toolkit pour la gestion des actions asynchrones.
 * @param {Function} thunkAPI.rejectWithValue - Fonction pour rejeter la promesse avec une valeur.
 * @throws {Error} Rejette la promesse avec une erreur en cas d'échec de la requête.
 * @returns {Promise<Object>} Les données de réponse de la requête.
 */
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ token, updatedProfile }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating user profile:', errorData);
        throw new Error('Failed to update user profile');
      }

      const updatedProfileData = await response.json();
      return updatedProfileData;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

/**
 * Fonction pour récupérer le token d'authentification depuis le stockage local.
 * @function
 * @returns {string|null} Le token d'authentification ou null s'il n'est pas présent.
 */

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

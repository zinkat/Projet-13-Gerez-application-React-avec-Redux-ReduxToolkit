import { createAsyncThunk } from '@reduxjs/toolkit'

// Définition de l'URL de base pour les requêtes API
const BASE_URL = 'http://localhost:3001/api/v1'


// Fonction pour la requête de connexion utilisateur
export const loginUser = async (credentials) => {
  try {
       // Envoi de la requête POST pour la connexion
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
   // Gestion des erreurs en cas de réponse non réussie
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error during login:', errorData)
      throw new Error('Login failed')
    }
    // Traitement de la réponse réussie
    const responseData = await response.json()
    const token = responseData.body.token
    // Stockage du token dans le stockage local
    console.log('Token stored in local storage:', token)
    localStorage.setItem('token', token)
 // Retourne les données de réponse
    return responseData
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

// Création d'une action asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      // Envoi de la requête POST pour récupérer le profil utilisateur
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
 // Gestion des erreurs en cas de réponse non réussie
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error fetching user profile:', errorData)
        throw new Error('Failed to fetch user profile')
      }
   // Traitement de la réponse réussie pour créer un objet userProfile
      const profileData = await response.json()

      const userProfile = {
        id: profileData.body.id,
        email: profileData.body.email,
        firstName: profileData.body.firstName,
        lastName: profileData.body.lastName,
      }
// Retourne le profil utilisateur
      return userProfile
    } catch (error) {
       // Rejet de la promesse avec l'erreur
      return rejectWithValue(error)
    }
  },
)

// Création d'une action asynchrone pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ token, updatedProfile }, { rejectWithValue }) => {
    try {
      // Envoi de la requête PUT pour mettre à jour le profil utilisateur
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      })
 // Gestion des erreurs en cas de réponse non réussie
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error updating user profile:', errorData)
        throw new Error('Failed to update user profile')
      }
 // Traitement de la réponse réussie
      const updatedProfileData = await response.json()
      return updatedProfileData
    } catch (error) {
       // Rejet de la promesse avec l'erreur
      return rejectWithValue(error)
    }
  },
)
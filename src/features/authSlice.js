import { createSlice } from '@reduxjs/toolkit';

// Initialisation de l'état initial du slice
const initialState = {
  token: localStorage.getItem('token') || null, // Récupération du token depuis le localStorage
  user: null,
  isAuthenticated: false,
};

// Création d'un slice et la configuration initiale
const authSlice = createSlice({
  name: 'auth',
  initialState,  // Utilisation de l'état initial déja défini 
  reducers: {
      // Action pour définir le token d'authentification
    setAuthToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);  // Stocker le token dans localStorage
    },
     // Action pour définir le profil utilisateur
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
        // Action pour gérer l'échec de la récupération du profil
    profileFetchFailed: (state) => {
      state.profileFetchError = true;  // Ajout d'une propriété pour indiquer l'échec

    },
  },
});

// Exportation des actions définies dans le slice
export const { setAuthToken, setUserProfile, profileFetchFailed } = authSlice.actions;

// Action asynchrone pour récupérer le profil utilisateur en fonction du token
export const fetchUserProfile = (token) => async (dispatch) => {
  try {
     // Envoi de la requête POST pour récupérer le profil utilisateur
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
 // Vérification si la requête a réussi (status 200)
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching user profile:', errorData);
      throw new Error('Failed to fetch user profile');
    }
 // Extraction des données JSON de la réponse
    const profileData = await response.json();

// Création d'un objet userProfile à partir des données du profil
    const userProfile = {
      id: profileData.body.id,
      email: profileData.body.email,
      firstName: profileData.body.firstName,
      lastName: profileData.body.lastName,
    };

    console.log('User profile received:', userProfile);
    // Dispatch de l'action setUserProfile avec le profil récupéré
    dispatch(setUserProfile(userProfile));
  } catch (error) {
    console.error('Error fetching user profile:', error);
     // Dispatch de l'action profileFetchFailed en cas d'échec
    dispatch(profileFetchFailed());
  }
};

export default authSlice.reducer;

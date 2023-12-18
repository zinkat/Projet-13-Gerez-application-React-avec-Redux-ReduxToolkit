import { createSlice } from '@reduxjs/toolkit'
import * as api from '../services/api' // Importer toutes les fonctions API définies dans le fichier 'api.js'

// Créer un slice pour la gestion de l'authentification dans Redux
const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState: {
    token: localStorage.getItem('token') || null, // Récupérer le token depuis le stockage local ou définir à null
    user: null, // Données utilisateur
    isAuthenticated: false, // Indicateur d'authentification
    status: 'idle', // État actuel du chargement des données(inactif)
    error: null, // Erreur en cas de problème
  },
  reducers: {
    // Action pour définir le token d'authentification
    setAuthToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload)
    },
    // Action pour définir les données utilisateur
    setUserProfile: (state, action) => {
      state.user = action.payload
    },
    
    // Action pour gérer l'échec de la récupération du profil utilisateur
    // profileFetchFailed: (state) => {
    //   state.profileFetchError = true;  // Ajout d'une propriété pour indiquer l'échec
    // },
  },
  extraReducers: (builder) => {
    // Gestion des cas extra (autres que les reducers définis ci-dessus) pour les appels asynchrones à l'API
    builder
      // En cas de chargement en cours pour la récupération du profil utilisateur
      .addCase(api.fetchUserProfile.pending, (state) => {
        state.status = 'loading'
      })
      // En cas de réussite de la récupération du profil utilisateur
      .addCase(api.fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      // En cas d'échec de la récupération du profil utilisateur
      .addCase(api.fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})
// Exporter les actions créées pour être utilisées dans l'application
export const { setAuthToken, setUserProfile, profileFetchFailed } =
  authSlice.actions
// Exporter le réducteur créé pour être utilisé dans le store Redux
export default authSlice.reducer

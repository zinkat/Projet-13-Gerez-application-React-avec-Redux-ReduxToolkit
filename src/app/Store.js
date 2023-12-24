import { configureStore } from '@reduxjs/toolkit' // configureStore pour créer le store Redux de l'application.
import authReducer from '../features/authSlice'

/**
 * Fonction pour configurer le store Redux de l'application.
 * @function
 * @returns {Object} Le store configuré.
 */

export const store = configureStore({
  //définition des reducers utilisés dans l application
  reducer: {
    auth: authReducer,
  },
})

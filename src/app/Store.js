import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authSlice';


//utilisez configureStore pour créer le store Redux de l'application.
export const store = configureStore({
  //définition des reducers utilisés dans l application
  reducer: {
    auth: authReducer,
 
  },

});



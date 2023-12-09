import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);  // Stocker le token dans localStorage
    },
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
    profileFetchFailed: (state) => {
      // Gérer l'échec de la récupération du profil
    },
  },
});

export const { setAuthToken, setUserProfile, profileFetchFailed } = authSlice.actions;

export const fetchUserProfile = (token) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
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
    console.log('User profile received:', userProfile);
    dispatch(setUserProfile(userProfile));
  } catch (error) {
    console.error('Error fetching user profile:', error);
    dispatch(profileFetchFailed());
  }
};

export default authSlice.reducer;

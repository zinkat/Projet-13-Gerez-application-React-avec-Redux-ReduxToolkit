import { createSlice } from '@reduxjs/toolkit'
import * as api from '../services/api'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload)
    },
    setUserProfile: (state, action) => {
      state.user = action.payload
    },

    profileFetchFailed: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(api.fetchUserProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(api.fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(api.fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { setAuthToken, setUserProfile, profileFetchFailed } =
  authSlice.actions

export default authSlice.reducer


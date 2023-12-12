import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3001/api/v1'

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error during login:', errorData)
      throw new Error('Login failed')
    }

    const responseData = await response.json()
    const token = responseData.body.token

    console.log('Token stored in local storage:', token)
    localStorage.setItem('token', token)

    return responseData
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error fetching user profile:', errorData)
        throw new Error('Failed to fetch user profile')
      }

      const profileData = await response.json()

      const userProfile = {
        id: profileData.body.id,
        email: profileData.body.email,
        firstName: profileData.body.firstName,
        lastName: profileData.body.lastName,
      }

      return userProfile
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

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
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error updating user profile:', errorData)
        throw new Error('Failed to update user profile')
      }

      const updatedProfileData = await response.json()
      return updatedProfileData
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

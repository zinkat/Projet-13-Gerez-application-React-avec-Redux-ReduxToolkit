import './signOut.css'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/argentBankLogo.png'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserProfile, profileFetchFailed } from '../../features/authSlice'

function SignOut() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Récupérez le token depuis le local storage
        const token = localStorage.getItem('token')

        const response = await fetch(
          'http://localhost:3001/api/v1/user/profile',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Error fetching user profile:', errorData)
          throw new Error('Failed to fetch user profile')
        }

        const profileData = await response.json()

        // Assurez-vous que le corps de la réponse contient les propriétés correctes du profil
        const userProfile = {
          id: profileData.body.id,
          email: profileData.body.email,
          firstName: profileData.body.firstName,
          lastName: profileData.body.lastName,
          // Ajoutez d'autres propriétés si nécessaire
        }

        dispatch(setUserProfile(userProfile))
      } catch (error) {
        console.error('Error fetching user profile:', error)
        dispatch(profileFetchFailed())
      }
    }

    fetchProfile()
  }, [dispatch])

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </NavLink>
      <div></div>
      <div>
        <NavLink className="main-nav-item" to="./user.html">
          <i className="fa fa-user-circle"></i>
          {user.firstName}
        </NavLink>
        <NavLink to="/Logout" className="main-nav-item">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
      </div>
    </nav>
  )
}

export default SignOut

import './Header.css'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/argentBankLogo.png'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserProfile, profileFetchFailed } from '../../features/authSlice'
import { fetchUserProfile } from '../../services/api'

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Récupérez le token depuis le local storage
        //const token = localStorage.getItem('token')
        // Vérifiez si un token est présent avant de faire la requête de profil
        if (token) {
          const token = localStorage.getItem('token')
          const userProfile = await dispatch(fetchUserProfile(token))
          dispatch(setUserProfile(userProfile.payload))
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        dispatch(profileFetchFailed())
      }
    }

    fetchProfile()
  }, [dispatch, token])

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
        {user && token ? (
          <>
            <NavLink className="main-nav-item" to="./profile">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </NavLink>
            <NavLink to="/Logout" className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  )
}
export default Header

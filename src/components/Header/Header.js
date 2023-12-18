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
  // Utilisation de useEffect pour effectuer des opérations après le rendu du composant
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Vérifiez si un token est présent avant de faire la requête de profil
        if (token) {
          // Récupérez le profil utilisateur en utilisant le token
          const token = localStorage.getItem('token')
          const userProfile = await dispatch(fetchUserProfile(token))
           // Mettez à jour le profil utilisateur dans le store Redux
          dispatch(setUserProfile(userProfile.payload))
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        // En cas d'erreur lors de la récupération du profil, déclenchez l'action pour indiquer un échec
        dispatch(profileFetchFailed())
      }
    }
// Exécutez la fonction pour récupérer le profil lors du montage du composant
    fetchProfile()
  }, [dispatch, token])

  return (
    <nav className="main-nav">
        {/* Logo Argent Bank avec lien vers la page d'accueil */}
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </NavLink>
      <div></div>
      <div>
         {/* Condition pour afficher des liens en fonction de la connexion de l'utilisateur */}
        {user && token ? (
          <>
          {/* Lien vers la page de profil avec le nom de l'utilisateur */}
            <NavLink className="main-nav-item" to="./profile">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </NavLink>
             {/* Lien de déconnexion */}
            <NavLink to="/Logout" className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          // Lien de connexion pour les utilisateurs non connectés
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
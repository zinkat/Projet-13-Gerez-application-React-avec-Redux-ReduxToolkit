import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAuthToken, setUserProfile } from '../../features/authSlice'
import { Navigate } from 'react-router-dom'

/**
 * Composant de déconnexion utilisateur.
 * @component
 * @returns {JSX.Element} Composant Logout
 */
function Logout() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Supprimer le token du stockage local
    localStorage.removeItem('token')

    // Mettre à jour le store Redux avec un token vide et un profil vide
    dispatch(setAuthToken(''))
    dispatch(setUserProfile(''))
  }, [dispatch])

  // Redirection
  return <Navigate to="/" />
}

export default Logout

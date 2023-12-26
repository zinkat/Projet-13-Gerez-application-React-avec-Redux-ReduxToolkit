/**
 * Login component handles user authentication.
 * @module Login
 */

import './Login.css'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthToken } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { loginUser, fetchUserProfile } from '../../services/api'

/**
 * Login component.
 * @function Login
 * @returns {JSX.Element} - Rendered Login component.
 */

function Login() {
  const dispatch = useDispatch() //Envoie une action au store qui déclenche des mises à jour de l'état
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Vérifier le statut "Remember me" au chargement de la page
    const rememberMeStatus = localStorage.getItem('rememberMe') === 'true'
    setRememberMe(rememberMeStatus)
  }, [])

  /**
   * Fonction pour gérer le processus de connexion
   * @function
   * @async
   */
  const handleLogin = async () => {
    try {
      // Récupérer les informations d'identification depuis les états locaux
      const credentials = {
        email,
        password,
      }
      // Appeler la fonction loginUser du service API pour effectuer la requête de connexion
      const data = await loginUser(credentials)
  
      console.log('Retour requet', data)
  
      // Mettre à jour le token d'authentification dans le store Redux
      dispatch(setAuthToken(data.body.token))
      // Effectuer une requête pour récupérer le profil de l'utilisateur avec le nouveau token
      dispatch(fetchUserProfile(data.body.token))
      // Enregistrer le statut "Remember me" dans localStorage
      localStorage.setItem('rememberMe', rememberMe.toString())
  
      // Rediriger l'utilisateur vers la page de profil après une connexion réussie
      navigate('/profile')
    } catch (error) {
      // Gérer les erreurs lors de la connexion
      console.error('Error during login:', error)
  
      // Ajouter une gestion des erreurs pour afficher un message à l'utilisateur
      if (error.response && error.response.status !== 200) {
        // Si le statut de la réponse n'est pas 200 
        alert('Invalid email or password. Please try again.')
      } else {
      
        alert('Invalid email or password. Please try again.')
      }
    }
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="button"
            className="sign-in-button"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login

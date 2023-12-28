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
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  // Effet secondaire pour gérer le statut "Remember me" au chargement de la page
  useEffect(() => {
    const rememberMeStatus = localStorage.getItem('rememberMe') === 'true'
    setRememberMe(rememberMeStatus)

    // Si "Remember me" est activé, charger les identifiants depuis le localStorage
    if (rememberMeStatus) {
      const storedEmail = localStorage.getItem('email') || ''
      const storedPassword = localStorage.getItem('password') || ''
      setEmail(storedEmail)
      setPassword(storedPassword)
    }
  }, [])

  // Fonction pour gérer le processus de connexion
  const handleLogin = async () => {
    try {
      // Récupérer les informations d'identification depuis les états locaux
      const credentials = {
        email,
        password,
      }

      // Appeler la fonction loginUser du service API pour effectuer la requête de connexion
      const data = await loginUser(credentials)

      // Mettre à jour le token d'authentification dans le store Redux
      dispatch(setAuthToken(data.body.token))

      // Appeler la fonction fetchUserProfile pour récupérer le profil de l'utilisateur avec le nouveau token
      dispatch(fetchUserProfile(data.body.token))

      // Enregistrer le statut "Remember me" et les identifiants dans localStorage
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
      } else {
        // Si "Remember me" n'est pas coché, supprimer les données du localStorage
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
      }

      // Rediriger l'utilisateur vers la page de profil après une connexion réussie
      navigate('/profile')
    } catch (error) {
      // Gérer les erreurs lors de la connexion
      console.error('Error during login:', error)

      // Afficher un message d'erreur à l'utilisateur
      alert('Invalid email or password. Please try again.')
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

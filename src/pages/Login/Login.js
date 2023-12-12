import "./Login.css";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser, fetchUserProfile } from "../../services/api";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Fonction pour gérer le processus de connexion
  const handleLogin = async () => {
    try {
      // Récupérer les informations d'identification depuis les états locaux
      const credentials = {
        email,
        password,
      };
  // Appeler la fonction loginUser du service API pour effectuer la requête de connexion
      const data = await loginUser(credentials);

      console.log('Retour requet', data);

      // Mettre à jour le token d'authentification dans le store Redux
      dispatch(setAuthToken(data.body.token));
      // Effectuer une requête pour récupérer le profil de l'utilisateur avec le nouveau token
      dispatch(fetchUserProfile(data.body.token));
  // Rediriger l'utilisateur vers la page de profil après une connexion réussie
      navigate('/profile');
    } catch (error) {
       // Gérer les erreurs lors de la connexion
      console.error('Error during login:', error);
    }
  };




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
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"   >Remember me</label>
            </div>
            <button type="button" className="sign-in-button" onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </section>
      </main>
  
  );
}

export default Login;

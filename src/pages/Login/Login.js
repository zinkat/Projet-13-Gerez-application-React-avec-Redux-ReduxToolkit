import "./Login.css";
import Header from "../../components/Header/Header";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken, fetchUserProfile } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../services/api";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const credentials = {
        email,
        password,
      };
  
      const data = await loginUser(credentials);
      console.log('Retour requet', data);
      dispatch(setAuthToken(data.body.token));
      dispatch(fetchUserProfile(data.body.token));
  
      navigate('/profile');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <Header />
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
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="button" className="sign-in-button" onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;

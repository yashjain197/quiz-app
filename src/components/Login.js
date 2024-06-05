import React, { useState } from 'react';
import axios from '../api/axios';
import './css/Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithGoogle = (ev) => {
    ev.preventDefault();
    const BackendURL = process.env.REACT_APP_BACKEND_URL;
    window.open(`${BackendURL}/auth/google`, "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/auth/login', { email, password });
    await localStorage.setItem('token', response.data.token);
    window.location.href = '/dashboard';
  };

  const handelSignup = async (e) => {
    window.location.href = '/signup';
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="alternative-login">
          <span>or</span>
          <button className="google-login-button" onClick={loginWithGoogle}>
            <img src="https://i.ibb.co/LdFn0Hy/google-icon.png" alt="Google icon" className="google-icon" />
            Login with Google
          </button>
          <span>or</span>
          <a className="signup-link" onClick={handelSignup}>Signup</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

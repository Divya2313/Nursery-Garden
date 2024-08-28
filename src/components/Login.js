import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', loginData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., show notification)
    }
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/google-login', { tokenId: response.credential });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Google login failed:', error);
      // Handle error (e.g., show notification)
    }
  };

  const handleFailure = (response) => {
    console.log('Google login failed:', response);
    // Handle failure (e.g., show notification)
  };

  return (
    <GoogleOAuthProvider clientId="102090055112-9g695smm9tjht6vumecvt36dreja5vsk.apps.googleusercontent.com">
      <div className="login-container">
        <form onSubmit={login}>
          <h1>Login</h1>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <GoogleLogin
          onSuccess={responseGoogle}
          onFailure={handleFailure}
          buttonText="Login with Google"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
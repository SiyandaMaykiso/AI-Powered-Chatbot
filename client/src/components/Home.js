// /client/src/components/Home.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for loading indicator
import './Home.css'; // Import the CSS file

const Home = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state
  const [isLoggedOut, setIsLoggedOut] = useState(false); // Track if user is logged out
  const navigate = useNavigate();

  // Handle login success, navigate to /chat
  const handleLoginSuccess = () => {
    onLoginSuccess(); // Trigger the login success callback from App.js
    navigate('/chat'); // Navigate to the chat window
  };

  // Handle registration success, navigate to /chat
  const handleRegisterSuccess = () => {
    onLoginSuccess(); // This can be used to automatically log in after registration
    navigate('/chat'); // Navigate to the chat window
  };

  // Control the loading state for login/register actions
  const handleLoading = (isLoading) => {
    setLoading(isLoading); // Show or hide loading spinner
  };

  // Handle user logout
  const handleLogout = () => {
    setLoading(true); // Show loading spinner
    setTimeout(() => {
      localStorage.removeItem('token'); // Remove token to log out
      setIsLoggedOut(true); // Set logged out state
      setLoading(false); // Hide spinner
    }, 2000); // Simulate a 2-second delay for the logout process
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the AI-Powered Chatbot</h1>
      
      <div className="button-container">
        <button 
          className={`toggle-button ${isLogin ? 'active' : ''}`} 
          onClick={() => setIsLogin(true)}
          style={{ backgroundColor: 'green' }}
        >
          Login
        </button>
        <button 
          className={`toggle-button ${!isLogin ? 'active' : ''}`} 
          onClick={() => setIsLogin(false)}
          style={{ backgroundColor: 'blue' }}
        >
          Register
        </button>
        <button
          className="toggle-button"
          onClick={handleLogout}
          style={{ backgroundColor: 'red' }}
        >
          Logout
        </button>
      </div>

      <div className="form-container">
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {isLoggedOut && <p style={{ color: 'green' }}>You have successfully logged out!</p>}
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {isLogin ? (
              <Login onLoginSuccess={handleLoginSuccess} onLoading={handleLoading} /> 
            ) : (
              <Register onLoginSuccess={handleRegisterSuccess} onLoading={handleLoading} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
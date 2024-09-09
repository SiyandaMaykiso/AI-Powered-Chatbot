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
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    onLoginSuccess();
    navigate('/chat');
  };

  const handleRegisterSuccess = () => {
    navigate('/chat');
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading); // Control the loading state
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the AI-Powered Chatbot</h1>
      
      <div className="button-container">
        <button 
          className={`toggle-button ${isLogin ? 'active' : ''}`} 
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button 
          className={`toggle-button ${!isLogin ? 'active' : ''}`} 
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        
        {/* Show loading spinner when either login or register is processing */}
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          isLogin ? (
            <Login onLoginSuccess={handleLoginSuccess} onLoading={handleLoading} /> // Pass loading handler to Login
          ) : (
            <Register onRegisterSuccess={handleRegisterSuccess} onLoading={handleLoading} /> // Pass loading handler to Register
          )
        )}
      </div>
    </div>
  );
};

export default Home;

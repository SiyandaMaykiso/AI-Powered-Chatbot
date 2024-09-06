// /client/src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Login from './Login';
import Register from './Register';
import './Home.css'; // Import the CSS file

const Home = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginSuccess = () => {
    onLoginSuccess();  // Call the parent function to mark user as logged in
    navigate('/chat'); // Redirect to the chat page
  };

  const handleRegisterSuccess = () => {
    navigate('/chat'); // Navigate to chat after successful registration
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
        {isLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Register onRegisterSuccess={handleRegisterSuccess} /> 
        )}
      </div>
    </div>
  );
};

export default Home;

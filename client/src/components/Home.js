// /client/src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Login from './Login';
import Register from './Register';

const Home = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginSuccess = () => {
    onLoginSuccess();  // Call the parent function to mark user as logged in
    navigate('/chat'); // Redirect to the chat page
  };

  return (
    <div>
      <h1>Welcome to the AI-Powered Chatbot</h1>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>
      {isLogin ? <Login onLoginSuccess={handleLoginSuccess} /> : <Register />}
    </div>
  );
};

export default Home;

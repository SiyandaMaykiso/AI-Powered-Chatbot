// /client/src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress from Material-UI

const Login = ({ onLoginSuccess, onLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner
    onLoading(true);  // Optionally call onLoading to handle globally
    setError('');
    try {
      const response = await axios.post('/login', {  // Use relative URL
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess(); // Call onLoginSuccess after successfully saving the token
      navigate('/chat'); // Redirect to /chat after successful login
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false); // Hide loading spinner
      onLoading(false);  // Optionally call onLoading to stop globally
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress} // Handle Enter key
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress} // Handle Enter key
        required
        autocomplete="current-password"  // Add this attribute
      />
      <button type="submit" disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Login'}
      </button>
    </form>
  );
};

export default Login;